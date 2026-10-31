import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ChevronLeft, Users, Gauge, Shield, Zap, GitCompare,
  CheckCircle2, Info, Calendar, Globe, AlertTriangle
} from "lucide-react";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import { getCarByIdOrSlug } from "@/lib/car-queries";
import { formatPrice, formatEfficiency, getFuelTypeColor, getBodyTypeEmoji } from "@/lib/utils";

interface Props {
  params: Promise<{ id: string }>;
}

function SpecRow({ label, value }: { label: string; value: string | null | undefined }) {
  if (!value || value === "null") return null;
  return (
    <div className="flex items-start justify-between py-3 border-b border-slate-50 last:border-0">
      <span className="text-sm text-slate-500 font-medium">{label}</span>
      <span className="text-sm text-slate-900 text-right max-w-[60%] font-medium">{value}</span>
    </div>
  );
}

export default async function CarDetailPage({ params }: Props) {
  const { id } = await params;
  const car = await getCarByIdOrSlug(id).catch(() => null);

  if (!car) notFound();

  const priceStr = formatPrice(car.priceMin, car.priceMax, car.priceUnit, car.currency);
  const efficiency = formatEfficiency(
    car.specs?.mileageKmpl ?? null,
    car.specs?.electricRangeKm ?? null,
    car.fuelType
  );
  const emoji = getBodyTypeEmoji(car.bodyType);
  const fuelColor = getFuelTypeColor(car.fuelType);

  const featuresByCategory = car.features.reduce<Record<string, typeof car.features>>(
    (acc, f) => {
      acc[f.category] = acc[f.category] ?? [];
      acc[f.category].push(f);
      return acc;
    },
    {}
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 py-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-slate-500 mb-6">
            <Link href="/explore" className="flex items-center gap-1 hover:text-orange-600 transition-colors">
              <ChevronLeft className="w-4 h-4" /> All Cars
            </Link>
            <span>/</span>
            <span className="text-slate-800 font-medium">{car.name}</span>
          </div>

          {/* Demo Disclaimer */}
          {car.isDemo && (
            <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
              <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-amber-800">
                <strong>Demo Information:</strong> Specifications and pricing are illustrative demo values. Confirm exact details with authorised dealerships.
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Specs */}
            <div className="lg:col-span-2 space-y-6">
              {/* Profile Card */}
              <div className="vroomy-card p-6">
                <div className="flex flex-col sm:flex-row items-start gap-6">
                  <div className="w-full sm:w-48 h-40 bg-slate-100 rounded-2xl overflow-hidden flex items-center justify-center flex-shrink-0 shadow-inner">
                    {car.imageUrl ? (
                      <img
                        src={car.imageUrl}
                        alt={car.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-5xl">{emoji}</span>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 flex-wrap">
                      <div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{car.brand}</p>
                        <h1 className="text-2xl font-bold text-slate-900 mt-0.5">{car.name}</h1>
                        <div className="flex items-center gap-2 mt-2 flex-wrap">
                          <span className={`vroomy-badge ${fuelColor}`}>{car.fuelType.toUpperCase()}</span>
                          <span className="vroomy-badge bg-slate-100 text-slate-700 capitalize">{car.bodyType}</span>
                          <span className="vroomy-badge bg-slate-100 text-slate-700 uppercase">{car.transmission}</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-2xl font-bold text-orange-600 mt-3">{priceStr}</p>
                    <div className="flex items-center gap-3 mt-2 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" /> Year: {car.year}
                      </span>
                      <span className="flex items-center gap-1">
                        <Globe className="w-3.5 h-3.5" /> Market: {car.market.toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="mt-4 text-slate-600 text-sm leading-relaxed">{car.description}</p>

                {/* Key Metrics */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5 pt-5 border-t border-slate-100">
                  {car.specs?.seatingCapacity && (
                    <div className="text-center p-2 rounded-xl bg-slate-50">
                      <Users className="w-5 h-5 text-slate-400 mx-auto mb-1" />
                      <p className="text-base font-bold text-slate-900">{car.specs.seatingCapacity}</p>
                      <p className="text-xs text-slate-500">Seating</p>
                    </div>
                  )}
                  {efficiency !== "—" && (
                    <div className="text-center p-2 rounded-xl bg-slate-50">
                      <Gauge className="w-5 h-5 text-slate-400 mx-auto mb-1" />
                      <p className="text-base font-bold text-slate-900">{efficiency}</p>
                      <p className="text-xs text-slate-500">{car.fuelType === "electric" ? "Range" : "Efficiency"}</p>
                    </div>
                  )}
                  {car.specs?.powerBhp && (
                    <div className="text-center p-2 rounded-xl bg-slate-50">
                      <Zap className="w-5 h-5 text-slate-400 mx-auto mb-1" />
                      <p className="text-base font-bold text-slate-900">{car.specs.powerBhp} bhp</p>
                      <p className="text-xs text-slate-500">Max Power</p>
                    </div>
                  )}
                  {car.specs?.ncapRating !== null && car.specs?.ncapRating !== undefined && (
                    <div className="text-center p-2 rounded-xl bg-slate-50">
                      <Shield className="w-5 h-5 text-slate-400 mx-auto mb-1" />
                      <p className="text-base font-bold text-slate-900">{car.specs.ncapRating}★</p>
                      <p className="text-xs text-slate-500">NCAP Rating</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Technical Specifications */}
              {car.specs && (
                <div className="vroomy-card p-6">
                  <h2 className="text-lg font-bold text-slate-900 mb-4">Detailed Specifications</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
                    <div>
                      <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-400 mb-2">Powertrain</h3>
                      <SpecRow label="Engine" value={car.specs.engineCC ? `${car.specs.engineCC} cc` : "Electric Motor"} />
                      <SpecRow label="Power Output" value={car.specs.powerBhp ? `${car.specs.powerBhp} bhp` : null} />
                      <SpecRow label="Max Torque" value={car.specs.torqueNm ? `${car.specs.torqueNm} Nm` : null} />
                      <SpecRow label="Cylinder Layout" value={car.specs.cylinderCount ? `${car.specs.cylinderCount} Cylinders` : null} />
                      <SpecRow label="Top Speed" value={car.specs.topSpeedKmph ? `${car.specs.topSpeedKmph} km/h` : null} />
                      <SpecRow label="Acceleration (0–100)" value={car.specs.zeroToHundredSec ? `${car.specs.zeroToHundredSec} s` : null} />
                    </div>
                    <div>
                      <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-400 mb-2">Dimensions & Range</h3>
                      <SpecRow label="Fuel Type" value={car.fuelType.toUpperCase()} />
                      {car.fuelType === "electric" ? (
                        <>
                          <SpecRow label="Battery Capacity" value={car.specs.batteryKwh ? `${car.specs.batteryKwh} kWh` : null} />
                          <SpecRow label="Electric Range" value={car.specs.electricRangeKm ? `${car.specs.electricRangeKm} km` : null} />
                        </>
                      ) : (
                        <>
                          <SpecRow label="Certified Mileage" value={efficiency !== "—" ? efficiency : null} />
                          <SpecRow label="Fuel Capacity" value={car.specs.fuelTankLitres ? `${car.specs.fuelTankLitres} Litres` : null} />
                        </>
                      )}
                      <SpecRow label="Seating" value={car.specs.seatingCapacity ? `${car.specs.seatingCapacity} Passengers` : null} />
                      <SpecRow label="Luggage Volume" value={car.specs.bootLitres ? `${car.specs.bootLitres} Litres` : null} />
                      <SpecRow label="Ground Clearance" value={car.specs.groundClearanceMm ? `${car.specs.groundClearanceMm} mm` : null} />
                    </div>
                  </div>

                  {(car.specs.ncapRating !== null || car.specs.warrantyYears) && (
                    <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-x-8">
                      <div>
                        <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-400 mb-2">Safety Evaluation</h3>
                        <SpecRow
                          label="Safety Standard"
                          value={car.specs.ncapRating !== null && car.specs.ncapRating !== undefined
                            ? `${car.specs.ncapRating}/5 Stars (${car.specs.ncapSource ?? "Global NCAP"})`
                            : "Not Evaluated"}
                        />
                      </div>
                      <div>
                        <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-400 mb-2">Warranty Support</h3>
                        <SpecRow
                          label="Manufacturer Warranty"
                          value={car.specs.warrantyYears
                            ? `${car.specs.warrantyYears} Years${car.specs.warrantyKm ? ` / ${car.specs.warrantyKm.toLocaleString()} km` : ""}`
                            : "Standard terms"}
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Feature Matrix */}
              {Object.keys(featuresByCategory).length > 0 && (
                <div className="vroomy-card p-6">
                  <h2 className="text-lg font-bold text-slate-900 mb-4">Equipped Features</h2>
                  <div className="space-y-5">
                    {Object.entries(featuresByCategory).map(([category, features]) => (
                      <div key={category}>
                        <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-400 mb-3 capitalize">
                          {category}
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {features.map((f) => (
                            <div key={f.id} className="flex items-center gap-2">
                              <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                              <span className="text-sm text-slate-700">{f.name}</span>
                              {!f.standard && f.optional && (
                                <span className="text-xs text-slate-400 italic">(optional)</span>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar Trims and Actions */}
            <div className="space-y-4">
              {car.variants.length > 0 && (
                <div className="vroomy-card p-5">
                  <h2 className="text-base font-bold text-slate-900 mb-3">Trims & Variants</h2>
                  <div className="space-y-2">
                    {car.variants.map((v) => (
                      <div
                        key={v.id}
                        className={`p-3 rounded-lg border text-sm ${v.isBaseVariant ? "border-orange-200 bg-orange-50/50" : "border-slate-100 bg-slate-50/50"}`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-slate-800">{v.name}</span>
                          {v.isBaseVariant && (
                            <span className="text-xs text-orange-600 font-medium bg-orange-100 px-2 py-0.5 rounded">Base</span>
                          )}
                        </div>
                        {v.priceMin && (
                          <p className="text-orange-600 font-bold mt-1">
                            {car.currency === "INR" ? "₹" : "$"}
                            {v.priceMin}
                            {v.priceMax && v.priceMax !== v.priceMin ? `–${v.priceMax}` : ""}{" "}
                            {car.priceUnit}
                          </p>
                        )}
                        {v.transmission && (
                          <p className="text-xs text-slate-500 mt-0.5 uppercase">{v.transmission}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="vroomy-card p-5 space-y-3">
                <h2 className="text-base font-bold text-slate-900">Next Steps</h2>
                <Link
                  href={`/compare?ids=${car.id}`}
                  className="flex items-center justify-center gap-2 w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3 rounded-xl transition-colors text-sm shadow-sm"
                >
                  <GitCompare className="w-4 h-4" />
                  Compare this vehicle
                </Link>
                <Link
                  href={`/chat?q=${encodeURIComponent(`Tell me about the strengths and weaknesses of ${car.name}`)}`}
                  className="flex items-center justify-center gap-2 w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-xl transition-colors text-sm shadow-sm"
                >
                  Ask AI About {car.model}
                </Link>
              </div>

              {/* Verified Source */}
              {car.specs?.lastVerified && (
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs text-slate-500">
                  <div className="flex items-start gap-2">
                    <Info className="w-4 h-4 mt-0.5 text-slate-400 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-slate-700">Verification Source</p>
                      <p className="mt-1">
                        Verified: {new Date(car.specs.lastVerified).toLocaleDateString()}
                      </p>
                      {car.specs.sourceUrl && (
                        <a href={car.specs.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:underline mt-1 block">
                          Official Reference
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const car = await getCarByIdOrSlug(id).catch(() => null);
  if (!car) return { title: "Car Not Found" };
  return {
    title: `${car.name} Specifications & Pricing`,
    description: car.description,
  };
}
