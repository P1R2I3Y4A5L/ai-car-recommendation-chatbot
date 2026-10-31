// ─── className utility ────────────────────────────────────────────────────────

export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}

// Format price for display
export function formatPrice(
  priceMin: number,
  priceMax: number,
  priceUnit: string,
  currency: string
): string {
  const symbol = currency === "USD" ? "$" : currency === "EUR" ? "€" : currency === "GBP" ? "£" : "₹";

  if (currency === "INR") {
    return `${symbol}${priceMin}${priceMax !== priceMin ? `–${priceMax}` : ""} ${priceUnit}`;
  }

  // For USD/EUR/GBP, priceMin/Max are in thousands
  const minStr = (priceMin * 1000).toLocaleString();
  const maxStr = (priceMax * 1000).toLocaleString();
  return priceMin === priceMax
    ? `${symbol}${minStr}`
    : `${symbol}${minStr}–${symbol}${maxStr}`;
}

// Format mileage/range for display
export function formatEfficiency(
  mileageKmpl: number | null,
  electricRangeKm: number | null,
  fuelType: string
): string {
  if (fuelType === "electric" && electricRangeKm) {
    return `${electricRangeKm} km range`;
  }
  if (fuelType === "cng") {
    return mileageKmpl ? `${mileageKmpl} km/kg` : "—";
  }
  return mileageKmpl ? `${mileageKmpl} km/l` : "—";
}

// Get fuel type color
export function getFuelTypeColor(fuelType: string): string {
  const colors: Record<string, string> = {
    petrol: "bg-orange-100 text-orange-800",
    diesel: "bg-blue-100 text-blue-800",
    electric: "bg-green-100 text-green-800",
    hybrid: "bg-teal-100 text-teal-800",
    cng: "bg-yellow-100 text-yellow-800",
    lpg: "bg-purple-100 text-purple-800",
  };
  return colors[fuelType.toLowerCase()] ?? "bg-gray-100 text-gray-800";
}

// Get body type icon (returns emoji for simplicity)
export function getBodyTypeEmoji(bodyType: string): string {
  const emojis: Record<string, string> = {
    sedan: "🚗",
    suv: "🚙",
    hatchback: "🚘",
    mpv: "🚐",
    coupe: "🏎️",
    convertible: "🚗",
    pickup: "🛻",
    crossover: "🚙",
  };
  return emojis[bodyType.toLowerCase()] ?? "🚗";
}

// Truncate text to a max length
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - 3) + "...";
}

// Generate a simple session ID
export function generateSessionId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

// Format number with Indian locale (lakhs/crores)
export function formatIndianNumber(n: number): string {
  return n.toLocaleString("en-IN");
}
