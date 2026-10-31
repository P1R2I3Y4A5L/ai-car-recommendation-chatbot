import Link from "next/link";
import { Users, Gauge, Shield, TrendingUp } from "lucide-react";
import type { CarSummary } from "@/types";
import { formatPrice, formatEfficiency, getFuelTypeColor, getBodyTypeEmoji } from "@/lib/utils";

interface CarCardProps {
  car: CarSummary;
  showCompareButton?: boolean;
  isSelected?: boolean;
  onToggleCompare?: (car: CarSummary) => void;
}

export default function CarCard({
  car,
  showCompareButton = false,
  isSelected = false,
  onToggleCompare,
}: CarCardProps) {
  const priceStr = formatPrice(car.priceMin, car.priceMax, car.priceUnit, car.currency);
  const efficiency = formatEfficiency(car.mileageKmpl, car.electricRangeKm, car.fuelType);
  const emoji = getBodyTypeEmoji(car.bodyType);
  const fuelColor = getFuelTypeColor(car.fuelType);

  return (
    <div className={`vroomy-card overflow-hidden flex flex-col group ${isSelected ? "ring-2 ring-orange-500" : ""}`}>
      {/* Vehicle Image Header */}
      <div className="h-44 bg-slate-100 relative overflow-hidden flex items-center justify-center">
        {car.imageUrl ? (
          <img
            src={car.imageUrl}
            alt={car.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        ) : (
          <span className="text-6xl">{emoji}</span>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent pointer-events-none" />

        {car.isDemo && (
          <span className="absolute top-2 right-2 text-xs bg-black/60 text-amber-300 backdrop-blur-xs px-2 py-0.5 rounded-full font-medium">
            Demo Data
          </span>
        )}
        <span className={`absolute top-2 left-2 vroomy-badge shadow-xs ${fuelColor}`}>
          {car.fuelType.toUpperCase()}
        </span>

        <span className="absolute bottom-2 left-2 text-white text-xs font-semibold drop-shadow-sm flex items-center gap-1">
          {emoji} {car.bodyType.toUpperCase()}
        </span>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1 gap-3">
        <div>
          <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">{car.brand}</p>
          <h3 className="text-base font-bold text-slate-900 leading-tight group-hover:text-orange-600 transition-colors">
            {car.name}
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">{car.year} Model</p>
        </div>

        {/* Price Tag */}
        <p className="text-lg font-bold text-orange-600">{priceStr}</p>

        {/* Specs Highlights */}
        <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 bg-slate-50/70 p-2.5 rounded-xl border border-slate-100">
          {car.seatingCapacity && (
            <div className="flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-slate-400" />
              <span>{car.seatingCapacity} Seats</span>
            </div>
          )}
          {efficiency !== "—" && (
            <div className="flex items-center gap-1.5">
              <Gauge className="w-3.5 h-3.5 text-slate-400" />
              <span>{efficiency}</span>
            </div>
          )}
          {car.ncapRating && (
            <div className="flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-green-600" />
              <span>{car.ncapRating}★ Safety</span>
            </div>
          )}
          <div className="flex items-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5 text-slate-400" />
            <span className="capitalize">{car.transmission}</span>
          </div>
        </div>

        {/* Short Summary */}
        <p className="text-xs text-slate-500 line-clamp-2 flex-1 leading-relaxed">{car.description}</p>

        {/* Call to Actions */}
        <div className="flex gap-2 mt-auto pt-2">
          <Link
            href={`/cars/${car.slug}`}
            className="flex-1 text-center text-sm font-semibold bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-xl transition-all shadow-xs"
          >
            View Specs
          </Link>
          {showCompareButton && onToggleCompare && (
            <button
              onClick={() => onToggleCompare(car)}
              className={`px-3 py-2 rounded-xl text-sm font-semibold border transition-all ${
                isSelected
                  ? "bg-orange-50 border-orange-500 text-orange-600"
                  : "bg-white border-slate-200 text-slate-600 hover:border-orange-300"
              }`}
              title={isSelected ? "Remove from comparison" : "Add to comparison"}
            >
              {isSelected ? "✓" : "+"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
