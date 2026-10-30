/**
 * Mock Users Dataset - AI Car Recommendation Chatbot
 */

export const mockCurrentUser = {
  id: "usr-arjun-941",
  name: "Arjun Sharma",
  email: "arjun.sharma@example.com",
  phone: "+91 98765 43210",
  avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80",
  location: "Bengaluru, Karnataka, India",
  role: "user",
  joinedDate: "January 2024",
  preferences: {
    budgetMin: 1500000,
    budgetMax: 2500000,
    budgetFormatted: "₹15L – ₹25L",
    usage: "Family",
    fuelPreferences: ["Petrol", "Hybrid", "Electric"],
    bodyTypes: ["SUV", "Sedan"],
    transmission: "Automatic",
    seatingCapacity: 5,
    brandPreferences: ["Hyundai", "Tata", "Honda", "Skoda"],
    priorityFeatures: [
      "Level 2 ADAS",
      "Panoramic Sunroof",
      "5-Star Safety Rating",
      "Ventilated Seats"
    ],
    location: "Bengaluru"
  },
  savedCarIds: ["car-creta-2024", "car-xuv700-2024", "car-city-hev-2024"],
  comparisonCarIds: ["car-creta-2024", "car-city-hev-2024"]
};

export const mockAdminUser = {
  id: "adm-priya-001",
  name: "Priya Nair",
  email: "admin@aicarfinder.tech",
  phone: "+91 98111 22334",
  avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80",
  location: "Mumbai, Maharashtra",
  role: "admin",
  joinedDate: "November 2023"
};

export const mockUserList = [
  {
    id: "usr-arjun-941",
    name: "Arjun Sharma",
    email: "arjun.sharma@example.com",
    role: "User",
    location: "Bengaluru, Karnataka",
    recommendationsCount: 14,
    savedCount: 3,
    status: "Active",
    lastActive: "10 mins ago"
  },
  {
    id: "usr-neha-112",
    name: "Neha Kapoor",
    email: "neha.k@cloudworks.io",
    role: "User",
    location: "Gurugram, Haryana",
    recommendationsCount: 22,
    savedCount: 5,
    status: "Active",
    lastActive: "1 hour ago"
  },
  {
    id: "usr-rohit-305",
    name: "Rohit Varma",
    email: "rohit.varma@fintech.co",
    role: "User",
    location: "Pune, Maharashtra",
    recommendationsCount: 6,
    savedCount: 2,
    status: "Active",
    lastActive: "Yesterday"
  },
  {
    id: "usr-meera-819",
    name: "Meera Sen",
    email: "meera.sen@designlab.in",
    role: "User",
    location: "Hyderabad, Telangana",
    recommendationsCount: 31,
    savedCount: 8,
    status: "Active",
    lastActive: "3 days ago"
  },
  {
    id: "usr-vikram-521",
    name: "Vikram Singhania",
    email: "vikram.s@mobilityventures.com",
    role: "User",
    location: "New Delhi",
    recommendationsCount: 9,
    savedCount: 1,
    status: "Inactive",
    lastActive: "2 weeks ago"
  }
];
