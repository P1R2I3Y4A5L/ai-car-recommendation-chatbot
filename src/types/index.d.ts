/**
 * AI Car Recommendation Chatbot - TypeScript Definitions
 * Designed for seamless Phase 2 backend & API integration.
 */

export type FuelType = 'Petrol' | 'Diesel' | 'Electric' | 'Hybrid' | 'CNG';
export type TransmissionType = 'Automatic' | 'Manual' | 'Both';
export type BodyType = 'SUV' | 'Sedan' | 'Hatchback' | 'MPV' | 'Coupe' | 'Crossover';
export type CarUsage = 'Daily commute' | 'Family' | 'Long-distance travel' | 'Off-road' | 'Business' | 'Mixed';

export interface CarSpecs {
  engine: string;              // e.g., '1.5L Turbo Petrol'
  power: string;               // e.g., '158 bhp @ 5500 rpm'
  torque: string;              // e.g., '253 Nm @ 1500 rpm'
  mileage: string;             // e.g., '18.5 km/l' or '450 km/charge'
  acceleration: string;        // e.g., '8.9 sec (0-100 km/h)'
  bootSpace: string;           // e.g., '433 Litres'
  groundClearance: string;     // e.g., '190 mm'
  seating: number;             // e.g., 5 or 7
  fuelType: FuelType;
  transmission: TransmissionType;
  safetyRating: {
    stars: number;             // 1 to 5
    agency: string;            // 'Bharat NCAP' | 'Global NCAP' | 'Euro NCAP'
    airbags: number;
  };
}

export interface Car {
  id: string;
  brand: string;
  model: string;
  variant: string;
  year: number;
  price: number;               // Numeric price in INR (e.g. 1550000)
  priceFormatted: string;      // e.g. "₹15.50 Lakh"
  priceCategory: 'budget' | 'mid-range' | 'premium' | 'luxury';
  bodyType: BodyType;
  primaryImage: string;
  gallery: string[];
  specs: CarSpecs;
  keyFeatures: string[];
  overview: string;
  tagline: string;
  pros: string[];
  cons: string[];
  aiMatchScore?: number;       // 0 to 100
  aiMatchExplanation?: string;
  isPopular?: boolean;
  isTrending?: boolean;
}

export interface UserPreferences {
  budgetMin: number;
  budgetMax: number;
  budgetFormatted?: string;
  usage?: CarUsage;
  fuelPreferences: FuelType[];
  bodyTypes: BodyType[];
  transmission: TransmissionType | 'Any';
  seatingCapacity: number;
  brandPreferences: string[];
  priorityFeatures: string[];
  location?: string;
}

export interface QuickChipOption {
  label: string;
  value: any;
  category: keyof UserPreferences | 'action';
  icon?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'ai' | 'user' | 'system';
  text: string;
  timestamp: string;
  chips?: QuickChipOption[];
  isThinking?: boolean;
  recommendationReady?: boolean;
  carsPreview?: Array<Partial<Car>>;
}

export interface RecommendationMatchBreakdown {
  budgetAlignment: number;      // % score
  efficiencyScore: number;
  featureScore: number;
  safetyScore: number;
  lifestyleFit: number;
}

export interface RecommendationItem {
  car: Car;
  matchScore: number;
  breakdown: RecommendationMatchBreakdown;
  aiExplanation: string;
  keyHighlights: string[];
}

export interface RecommendationResult {
  id: string;
  createdAt: string;
  preferences: UserPreferences;
  totalMatches: number;
  items: RecommendationItem[];
  summaryText: string;
}

export interface SavedCarItem {
  carId: string;
  savedAt: string;
  note?: string;
}

export interface RecommendationHistoryItem {
  id: string;
  date: string;
  timestamp: string;
  budgetString: string;
  usage: string;
  fuelType: string;
  bodyType: string;
  matchCount: number;
  topCarNames: string[];
  topCarImages: string[];
  preferenceSummary: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  location: string;
  role: 'user' | 'admin';
  preferences: UserPreferences;
  savedCarIds: string[];
  comparisonCarIds: string[];
  joinedDate: string;
}

export interface AdminStats {
  totalUsers: number;
  totalRecommendations: number;
  activeUsersToday: number;
  totalCatalogCars: number;
  popularBrands: Array<{ brand: string; count: number; percentage: number }>;
  bodyTypeBreakdown: Array<{ type: string; percentage: number }>;
  budgetDistribution: Array<{ bracket: string; percentage: number }>;
  monthlyTrend: Array<{ month: string; recommendations: number; users: number }>;
}
