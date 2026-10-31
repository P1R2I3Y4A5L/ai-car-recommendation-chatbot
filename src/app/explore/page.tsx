"use client";

import { useState, useCallback, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { SlidersHorizontal, X, ChevronLeft, ChevronRight } from "lucide-react";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import CarGrid from "@/components/cars/CarGrid";
import type { CarSummary } from "@/types";

const BODY_TYPES = ["suv", "sedan", "hatchback", "mpv", "coupe", "crossover", "pickup"];
const FUEL_TYPES = ["petrol", "diesel", "electric", "hybrid", "cng"];
const TRANSMISSIONS = ["manual", "automatic", "amt", "cvt", "dct"];

function ExploreContent() {
  const searchParams = useSearchParams();

  const [cars, setCars] = useState<CarSummary[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const [filters, setFilters] = useState({
    brand: searchParams.get("brand") ?? "",
    bodyType: searchParams.get("bodyType") ?? "",
    fuelType: searchParams.get("fuelType") ?? "",
    transmission: searchParams.get("transmission") ?? "",
    budgetMax: searchParams.get("budgetMax") ?? "",
    seatingCapacity: searchParams.get("seatingCapacity") ?? "",
    sortBy: searchParams.get("sortBy") ?? "name_asc",
  });

  const fetchCars = useCallback(async (currentFilters: typeof filters, currentPage: number) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (currentFilters.brand) params.set("brand", currentFilters.brand);
      if (currentFilters.bodyType) params.set("bodyType", currentFilters.bodyType);
      if (currentFilters.fuelType) params.set("fuelType", currentFilters.fuelType);
      if (currentFilters.transmission) params.set("transmission", currentFilters.transmission);
      if (currentFilters.budgetMax) params.set("budgetMax", currentFilters.budgetMax);
      if (currentFilters.seatingCapacity) params.set("seatingCapacity", currentFilters.seatingCapacity);
      if (currentFilters.sortBy) params.set("sortBy", currentFilters.sortBy);
      params.set("page", String(currentPage));
      params.set("limit", "12");

      const res = await fetch(`/api/cars?${params.toString()}`);
      const json = await res.json();

      if (json.success) {
        setCars(json.data.cars);
        setTotal(json.data.total);
        setTotalPages(json.data.totalPages);
      }
    } catch (err) {
      console.error("Failed to fetch cars:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCars(filters, page);
  }, [filters, page, fetchCars]);

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPage(1);
  };

  const clearFilters = () => {
    setFilters({
      brand: "",
      bodyType: "",
      fuelType: "",
      transmission: "",
      budgetMax: "",
      seatingCapacity: "",
      sortBy: "name_asc",
    });
    setPage(1);
  };

  const hasActiveFilters = Object.entries(filters).some(
    ([k, v]) => k !== "sortBy" && v !== ""
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Explore Vehicles</h1>
          <p className="text-slate-500 text-sm mt-1">
            {loading ? "Searching..." : `${total} vehicle${total !== 1 ? "s" : ""} available`}
          </p>
        </div>
        <div className="flex items-center gap-3">
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700"
            >
              <X className="w-4 h-4" /> Reset
            </button>
          )}
          <button
            onClick={() => setFiltersOpen(!filtersOpen)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
              filtersOpen || hasActiveFilters
                ? "bg-orange-50 border-orange-300 text-orange-600"
                : "bg-white border-slate-200 text-slate-700"
            }`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters {hasActiveFilters && "(Active)"}
          </button>
        </div>
      </div>

      {/* Filter Matrix */}
      {filtersOpen && (
        <div className="bg-white rounded-2xl border border-slate-200 p-5 mb-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 animate-fade-in shadow-sm">
          <div>
            <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1.5 block">Body Type</label>
            <select
              value={filters.bodyType}
              onChange={(e) => handleFilterChange("bodyType", e.target.value)}
              className="vroomy-input text-sm py-2"
            >
              <option value="">All Types</option>
              {BODY_TYPES.map((t) => (
                <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1.5 block">Fuel Type</label>
            <select
              value={filters.fuelType}
              onChange={(e) => handleFilterChange("fuelType", e.target.value)}
              className="vroomy-input text-sm py-2"
            >
              <option value="">All Fuels</option>
              {FUEL_TYPES.map((t) => (
                <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1.5 block">Transmission</label>
            <select
              value={filters.transmission}
              onChange={(e) => handleFilterChange("transmission", e.target.value)}
              className="vroomy-input text-sm py-2"
            >
              <option value="">Any</option>
              {TRANSMISSIONS.map((t) => (
                <option key={t} value={t}>{t.toUpperCase()}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1.5 block">Max Budget (₹ Lakh)</label>
            <input
              type="number"
              placeholder="e.g. 15"
              value={filters.budgetMax}
              onChange={(e) => handleFilterChange("budgetMax", e.target.value)}
              className="vroomy-input text-sm py-2"
              min="0"
              max="500"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1.5 block">Min Seats</label>
            <select
              value={filters.seatingCapacity}
              onChange={(e) => handleFilterChange("seatingCapacity", e.target.value)}
              className="vroomy-input text-sm py-2"
            >
              <option value="">Any</option>
              {[2, 4, 5, 6, 7, 8].map((n) => (
                <option key={n} value={n}>{n}+ Seats</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1.5 block">Sort By</label>
            <select
              value={filters.sortBy}
              onChange={(e) => handleFilterChange("sortBy", e.target.value)}
              className="vroomy-input text-sm py-2"
            >
              <option value="name_asc">Name (A–Z)</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
            </select>
          </div>
        </div>
      )}

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="vroomy-card h-72 animate-pulse bg-slate-200" />
          ))}
        </div>
      ) : (
        <CarGrid cars={cars} />
      )}

      {/* Pagination */}
      {!loading && totalPages > 1 && (
        <div className="flex items-center justify-center gap-3 mt-10">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page <= 1}
            className="flex items-center gap-1 px-4 py-2 rounded-lg border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-4 h-4" /> Prev
          </button>
          <span className="text-sm text-slate-500">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page >= totalPages}
            className="flex items-center gap-1 px-4 py-2 rounded-lg border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Next <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}

export default function ExplorePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-8">
        <Suspense fallback={<div className="max-w-7xl mx-auto px-4 py-8 text-center text-slate-400">Loading cars...</div>}>
          <ExploreContent />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
