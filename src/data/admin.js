/**
 * Admin Metrics & Analytics Mock Data - AI Car Recommendation Chatbot
 */

export const mockAdminStats = {
  totalUsers: 14820,
  totalRecommendations: 38450,
  activeUsersToday: 1240,
  totalCatalogCars: 16,
  recommendationsThisWeek: 4210,
  conversionRate: "28.4%", // percentage of users who save or compare a recommended car
  popularBrands: [
    { brand: "Hyundai", count: 11200, percentage: 29.1 },
    { brand: "Tata", count: 9850, percentage: 25.6 },
    { brand: "Toyota", count: 6400, percentage: 16.6 },
    { brand: "Mahindra", count: 5200, percentage: 13.5 },
    { brand: "Honda", count: 3200, percentage: 8.3 },
    { brand: "Skoda / Others", count: 2600, percentage: 6.9 }
  ],
  popularBodyTypes: [
    { type: "SUV", percentage: 52.4 },
    { type: "Sedan", percentage: 23.8 },
    { type: "Hatchback", percentage: 14.1 },
    { type: "MPV", percentage: 6.7 },
    { type: "Coupe", percentage: 3.0 }
  ],
  budgetDistribution: [
    { bracket: "₹5L – ₹10L", percentage: 18.5 },
    { bracket: "₹10L – ₹15L", percentage: 31.2 },
    { bracket: "₹15L – ₹25L", percentage: 34.8 },
    { bracket: "₹25L – ₹50L", percentage: 11.4 },
    { bracket: "₹50L+", percentage: 4.1 }
  ],
  monthlyTrend: [
    { month: "Apr", recommendations: 2900, users: 1100 },
    { month: "May", recommendations: 3400, users: 1350 },
    { month: "Jun", recommendations: 4100, users: 1600 },
    { month: "Jul", recommendations: 5200, users: 2050 },
    { month: "Aug", recommendations: 6400, users: 2500 },
    { month: "Sep", recommendations: 7800, users: 3100 }
  ],
  recentEvents: [
    { id: "evt-1", type: "recommendation", user: "Arjun Sharma", detail: "Generated recommendations for ₹15L-₹25L SUV", time: "5 mins ago" },
    { id: "evt-2", type: "compare", user: "Neha Kapoor", detail: "Compared Creta vs Seltos vs Slavia", time: "18 mins ago" },
    { id: "evt-3", type: "save", user: "Rohit Varma", detail: "Saved Honda City e:HEV to Wishlist", time: "42 mins ago" },
    { id: "evt-4", type: "signup", user: "Vikram Singhania", detail: "New registered user from New Delhi", time: "1 hour ago" },
    { id: "evt-5", type: "recommendation", user: "Meera Sen", detail: "Generated recommendations for Electric Hatchback", time: "2 hours ago" }
  ]
};
