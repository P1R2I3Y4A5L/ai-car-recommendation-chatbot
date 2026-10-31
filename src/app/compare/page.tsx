"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { GitCompare, Plus, X, ArrowUp } from "lucide-react";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import type { CarSummary, ComparisonData } from "@/types";
import { formatPrice, getBodyTypeEmoji } from "@/lib/utils";

function CompareContent() {
  const searchParams = useSearchParams();
  const initialIds = searchParams.get("ids")?.split(",").filter(Boolean) ?? [];

  const [selectedCars, setSelectedCars] = useState<CarSummary[]>([]);
  const [comparison, setComparison] = useState<ComparisonData | null>(null);
  const [compareLoading, setCompareLoading] = useState(false);
  const [compareError, setCompareError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [allCars, setAllCars] = useState<CarSummary[]>([]);

  useEffect(() => {
    async function loadCatalog() {
      try {
        const res = await fetch("/api/cars?limit=50");
        const json = await res.json();
        if (json.success) {
          setAllCars(json.data.cars);
          if (initialIds.length > 0) {
            const matched = json.data.cars.filter((c: CarSummary) => initialIds.includes(c.id));
            if (matched.length > 0) {
              setSelectedCars(matched);
            }
          }
        }
      } catch (err) {
        console.error("Failed to load catalog:", err);
      }
    }
    loadCatalog();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addCar = (car: CarSummary) => {
    if (selectedCars.length >= 4) return;
    if (selectedCars.some((c) => c.id === car.id)) return;
    setSelectedCars((prev) => [...prev, car]);
    setSearchQuery("");
    setComparison(null);
  };

  const removeCar = (id: string) => {
    setSelectedCars((prev) => prev.filter((c) => c.id !== id));
    setComparison(null);
  };

  const compareNow = useCallback(async () => {
    if (selectedCars.length < 2) return;
    setCompareLoading(true);
    setCompareError(null);
    try {
      const res = await fetch("/api/compare", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids: selectedCars.map((c) => c.id) }),
      });
      const json = await res.json();
      if (json.success) {
        setComparison(json.data);
      } else {
        setCompareError(json.error);
      }
    } catch {
      setCompareError("Failed to generate car comparison.");
    } finally {
      setCompareLoading(false);
    }
  }, [selectedCars]);

  const searchResults = searchQuery.trim()
    ? allCars.filter(
        (c) =>
          c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.brand.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  function getBestIndex(field: ComparisonData["fields"][0]): number | null {
    if (!field.higherIsBetter && !field.lowerIsBetter) return null;
    const numeric = field.values.map((v) => {
      const parsed = parseFloat(String(v));
      return isNaN(parsed) ? null : parsed;
    });
    const valid = numeric.filter((n): n is number => n !== null);
    if (valid.length < 2) return null;
    const target = field.higherIsBetter ? Math.max(...valid) : Math.min(...valid);
    return numeric.indexOf(target);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
            <GitCompare className="w-5 h-5 text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Side-by-Side Car Comparison</h1>
        </div>
        <p className="text-slate-500 text-sm">Select 2 to 4 cars to compare verified technical specifications</p>
      </div>

      {/* Selected Slot Deck */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {Array.from({ length: 4 }).map((_, i) => {
          const car = selectedCars[i];
          return (
            <div
              key={i}
              className={`rounded-2xl border-2 border-dashed p-4 min-h-[110px] flex items-center justify-center transition-all ${
                car ? "border-orange-300 bg-orange-50/50" : "border-slate-200 bg-slate-50"
              }`}
            >
              {car ? (
                <div className="text-center w-full">
                  <p className="text-2xl mb-1">{getBodyTypeEmoji(car.bodyType)}</p>
                  <p className="text-xs font-bold text-slate-900 truncate">{car.name}</p>
                  <p className="text-xs text-orange-600 font-semibold mt-0.5">
                    {formatPrice(car.priceMin, car.priceMax, car.priceUnit, car.currency)}
                  </p>
                  <button
                    onClick={() => removeCar(car.id)}
                    className="mt-2 text-xs text-slate-400 hover:text-red-600 flex items-center gap-1 mx-auto transition-colors"
                  >
                    <X className="w-3 h-3" /> Remove
                  </button>
                </div>
              ) : (
                <div className="text-center text-slate-400">
                  <Plus className="w-5 h-5 mx-auto mb-1" />
                  <p className="text-xs font-medium">Slot {i + 1}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Search Input for Adding Car */}
      {selectedCars.length < 4 && (
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Type brand or car name to add to comparison..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="vroomy-input text-sm"
          />
          {searchResults.length > 0 && (
            <div className="absolute top-full left-0 right-0 bg-white border border-slate-200 rounded-xl shadow-lg mt-1 z-20 overflow-hidden max-h-64 overflow-y-auto">
              {searchResults.map((car) => {
                const isAdded = selectedCars.some((c) => c.id === car.id);
                return (
                  <button
                    key={car.id}
                    onClick={() => addCar(car)}
                    disabled={isAdded}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-50 text-left border-b border-slate-50 last:border-0 disabled:opacity-40"
                  >
                    <span className="text-xl">{getBodyTypeEmoji(car.bodyType)}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-slate-900 truncate">{car.name}</p>
                      <p className="text-xs text-slate-500">
                        {car.brand} · {car.fuelType} · {formatPrice(car.priceMin, car.priceMax, car.priceUnit, car.currency)}
                      </p>
                    </div>
                    {isAdded && <span className="text-xs text-orange-500 font-medium">Added</span>}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Action Bar */}
      <div className="flex items-center gap-3 mb-8">
        <button
          onClick={compareNow}
          disabled={selectedCars.length < 2 || compareLoading}
          className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold px-6 py-3 rounded-xl transition-colors disabled:opacity-40 disabled:cursor-not-allowed text-sm"
        >
          {compareLoading ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <GitCompare className="w-4 h-4" />
          )}
          {compareLoading ? "Analyzing..." : "Compare Selected Vehicles"}
        </button>
        {selectedCars.length < 2 && (
          <p className="text-xs text-slate-500">Select at least 2 cars to activate comparison.</p>
        )}
        {compareError && <p className="text-xs text-red-600 font-medium">{compareError}</p>}
      </div>

      {/* Comparison Presentation */}
      {comparison && (
        <div className="space-y-6 animate-fade-in">
          {/* Analysis Summary */}
          <div className="bg-blue-50/80 border border-blue-100 rounded-2xl p-5 shadow-sm">
            <h2 className="text-xs font-bold text-blue-900 uppercase tracking-wide mb-1.5">
              Synthesis & Highlights
            </h2>
            <p className="text-sm text-blue-950 leading-relaxed">{comparison.summary}</p>
          </div>

          {/* Data Table */}
          <div className="vroomy-card overflow-x-auto shadow-sm">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50">
                  <th className="text-left p-4 text-xs font-bold text-slate-500 uppercase tracking-wider w-48">Parameter</th>
                  {comparison.cars.map((car) => (
                    <th key={car.id} className="p-4 text-center">
                      <div className="flex flex-col items-center gap-1">
                        <span className="text-2xl">{getBodyTypeEmoji(car.bodyType)}</span>
                        <span className="text-sm font-bold text-slate-900">{car.name}</span>
                        <span className="text-xs text-orange-600 font-bold">
                          {formatPrice(car.priceMin, car.priceMax, car.priceUnit, car.currency)}
                        </span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparison.fields.map((field) => {
                  const bestIdx = getBestIndex(field);
                  return (
                    <tr key={field.key} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                      <td className="p-4 text-sm font-semibold text-slate-600">{field.label}</td>
                      {field.values.map((val, idx) => {
                        const isBest = bestIdx === idx;
                        return (
                          <td key={idx} className="p-4 text-center">
                            <span
                              className={`inline-flex items-center gap-1 text-sm px-2.5 py-1 rounded-lg ${
                                isBest ? "bg-green-100 text-green-800 font-bold" : "text-slate-700"
                              }`}
                            >
                              {isBest && <ArrowUp className="w-3.5 h-3.5" />}
                              {String(val)}
                            </span>
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Zero State */}
      {!comparison && selectedCars.length === 0 && (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-100 shadow-sm">
          <GitCompare className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <p className="text-slate-700 font-semibold">Comparison Matrix Empty</p>
          <p className="text-slate-400 text-xs mt-1">
            Search and add cars using the search box above.
          </p>
        </div>
      )}
    </div>
  );
}

export default function ComparePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-8">
        <Suspense fallback={<div className="max-w-7xl mx-auto px-4 py-8 text-center text-slate-400">Loading comparison...</div>}>
          <CompareContent />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
