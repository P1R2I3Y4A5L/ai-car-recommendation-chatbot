import type { CarSummary } from "@/types";
import CarCard from "./CarCard";

interface CarGridProps {
  cars: CarSummary[];
  showCompareButton?: boolean;
  selectedIds?: string[];
  onToggleCompare?: (car: CarSummary) => void;
  emptyMessage?: string;
}

export default function CarGrid({
  cars,
  showCompareButton = false,
  selectedIds = [],
  onToggleCompare,
  emptyMessage = "No cars found. Try adjusting your filters.",
}: CarGridProps) {
  if (cars.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-4xl mb-3">🚗</p>
        <p className="text-slate-500 text-sm">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {cars.map((car) => (
        <CarCard
          key={car.id}
          car={car}
          showCompareButton={showCompareButton}
          isSelected={selectedIds.includes(car.id)}
          onToggleCompare={onToggleCompare}
        />
      ))}
    </div>
  );
}
