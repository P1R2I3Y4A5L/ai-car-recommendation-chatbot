import { db } from "@/lib/db";
import type { Car, CarSummary, CarFilters, PaginatedCars } from "@/types";
import { Prisma } from "@prisma/client";

// Helper to build Prisma where clause from filters
function buildWhereClause(filters: CarFilters): Prisma.CarWhereInput {
  const where: Prisma.CarWhereInput = {};

  if (filters.brand) {
    where.brand = { equals: filters.brand };
  }
  if (filters.bodyType) {
    where.bodyType = { equals: filters.bodyType };
  }
  if (filters.fuelType) {
    where.fuelType = { equals: filters.fuelType };
  }
  if (filters.transmission) {
    where.transmission = { equals: filters.transmission };
  }
  if (filters.market) {
    where.market = { equals: filters.market };
  }
  if (filters.currency) {
    where.currency = filters.currency;
  }
  if (filters.budgetMin !== undefined || filters.budgetMax !== undefined) {
    where.AND = [
      ...(Array.isArray(where.AND) ? where.AND : []),
      ...(filters.budgetMin !== undefined
        ? [{ priceMax: { gte: filters.budgetMin } }]
        : []),
      ...(filters.budgetMax !== undefined
        ? [{ priceMin: { lte: filters.budgetMax } }]
        : []),
    ];
  }
  if (filters.seatingCapacity) {
    where.specs = {
      seatingCapacity: { gte: filters.seatingCapacity },
    };
  }

  return where;
}

// Build Prisma orderBy from sortBy string
function buildOrderBy(
  sortBy?: string
): Prisma.CarOrderByWithRelationInput {
  switch (sortBy) {
    case "price_asc":
      return { priceMin: "asc" };
    case "price_desc":
      return { priceMin: "desc" };
    case "name_asc":
      return { name: "asc" };
    default:
      return { name: "asc" };
  }
}

// Convert a full Prisma Car record to our CarSummary type
function toCarSummary(car: {
  id: string;
  slug: string;
  name: string;
  brand: string;
  model: string;
  year: number;
  bodyType: string;
  fuelType: string;
  transmission: string;
  market: string;
  currency: string;
  priceMin: number;
  priceMax: number;
  priceUnit: string;
  imageUrl: string | null;
  description: string;
  specs: { seatingCapacity: number; mileageKmpl: number | null; electricRangeKm: number | null; ncapRating: number | null } | null;
}): CarSummary {
  return {
    id: car.id,
    slug: car.slug,
    name: car.name,
    brand: car.brand,
    model: car.model,
    year: car.year,
    bodyType: car.bodyType,
    fuelType: car.fuelType,
    transmission: car.transmission,
    market: car.market,
    currency: car.currency,
    priceMin: car.priceMin,
    priceMax: car.priceMax,
    priceUnit: car.priceUnit,
    imageUrl: car.imageUrl,
    description: car.description,
    seatingCapacity: car.specs?.seatingCapacity ?? null,
    mileageKmpl: car.specs?.mileageKmpl ?? null,
    electricRangeKm: car.specs?.electricRangeKm ?? null,
    ncapRating: car.specs?.ncapRating ?? null,
  };
}

const SUMMARY_INCLUDE = {
  specs: {
    select: {
      seatingCapacity: true,
      mileageKmpl: true,
      electricRangeKm: true,
      ncapRating: true,
    },
  },
} as const;

// List cars with pagination and filtering
export async function listCars(filters: CarFilters = {}): Promise<PaginatedCars> {
  const page = Math.max(1, filters.page ?? 1);
  const limit = Math.min(50, Math.max(1, filters.limit ?? 12));
  const skip = (page - 1) * limit;

  const where = buildWhereClause(filters);
  const orderBy = buildOrderBy(filters.sortBy);

  const [rawCars, total] = await Promise.all([
    db.car.findMany({
      where,
      include: SUMMARY_INCLUDE,
      orderBy,
      skip,
      take: limit,
    }),
    db.car.count({ where }),
  ]);

  // Post-filter by mileage if needed (SQLite doesn't support relation filtering well)
  let cars = rawCars;
  if (filters.minMileage) {
    const min = filters.minMileage;
    cars = cars.filter((c) => (c.specs?.mileageKmpl ?? 0) >= min);
  }
  if (filters.minElectricRange) {
    const minRange = filters.minElectricRange;
    cars = cars.filter((c) => (c.specs?.electricRangeKm ?? 0) >= minRange);
  }

  const totalPages = Math.ceil(total / limit);

  return {
    cars: cars.map(toCarSummary),
    total,
    page,
    totalPages,
    hasNextPage: page < totalPages,
    hasPrevPage: page > 1,
  };
}

// Get a single car by ID or slug (full details)
export async function getCarByIdOrSlug(idOrSlug: string): Promise<Car | null> {
  const car = await db.car.findFirst({
    where: {
      OR: [{ id: idOrSlug }, { slug: idOrSlug }],
    },
    include: {
      specs: true,
      variants: { orderBy: { isBaseVariant: "desc" } },
      features: { orderBy: [{ category: "asc" }, { name: "asc" }] },
      markets: true,
    },
  });

  if (!car) return null;

  return {
    ...car,
    specs: car.specs
      ? {
          ...car.specs,
          lastVerified: car.specs.lastVerified.toISOString(),
        }
      : null,
    features: car.features.map((f) => ({
      ...f,
      category: f.category as import("@/types").FeatureCategory,
    })),
  };
}

// Get multiple cars by IDs or slugs (for comparison)
export async function getCarsByIds(ids: string[]): Promise<Car[]> {
  const cars = await Promise.all(ids.map(getCarByIdOrSlug));
  return cars.filter((c): c is Car => c !== null);
}

// Search cars by name/brand for AI-driven lookups
export async function searchCarsByName(names: string[]): Promise<CarSummary[]> {
  if (names.length === 0) return [];

  const results = await db.car.findMany({
    where: {
      OR: names.map((name) => ({
        OR: [
          { name: { contains: name } },
          { brand: { contains: name } },
          { model: { contains: name } },
        ],
      })),
    },
    include: SUMMARY_INCLUDE,
    take: 20,
  });

  return results.map(toCarSummary);
}

// Get all unique brands
export async function getAllBrands(): Promise<string[]> {
  const result = await db.car.findMany({
    select: { brand: true },
    distinct: ["brand"],
    orderBy: { brand: "asc" },
  });
  return result.map((r) => r.brand);
}

// Get count of cars in database
export async function getCarCount(): Promise<number> {
  return db.car.count();
}
