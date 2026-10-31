import Link from "next/link";
import { MessageCircle, Search, GitCompare, ChevronRight, Zap } from "lucide-react";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import { listCars } from "@/lib/car-queries";
import CarCard from "@/components/cars/CarCard";

const bodyTypes = [
  { label: "SUV", emoji: "🚙", value: "suv", color: "bg-blue-50 hover:bg-blue-100 border-blue-200" },
  { label: "Sedan", emoji: "🚗", value: "sedan", color: "bg-purple-50 hover:bg-purple-100 border-purple-200" },
  { label: "Hatchback", emoji: "🚘", value: "hatchback", color: "bg-green-50 hover:bg-green-100 border-green-200" },
  { label: "Electric", emoji: "⚡", value: "electric", color: "bg-teal-50 hover:bg-teal-100 border-teal-200" },
  { label: "MPV", emoji: "🚐", value: "mpv", color: "bg-orange-50 hover:bg-orange-100 border-orange-200" },
];

const suggestedPrompts = [
  "Find me an SUV under ₹15 lakh",
  "Best electric cars for city driving",
  "Compare Tata Nexon and Hyundai Creta",
  "7-seater family car under ₹25 lakh",
  "Cars with best mileage under ₹10 lakh",
];

const stats = [
  { label: "Cars in Database", value: "18+", icon: "🚗" },
  { label: "Brands Covered", value: "8+", icon: "🏷️" },
  { label: "Markets", value: "India & Global", icon: "🌍" },
  { label: "AI-Powered", value: "Gemini 1.5", icon: "✨" },
];

export default async function HomePage() {
  let featuredCars: Awaited<ReturnType<typeof listCars>>["cars"] = [];
  try {
    const result = await listCars({ limit: 4, sortBy: "name_asc" });
    featuredCars = result.cars;
  } catch {
    // Database might not be initialized yet
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-orange-950 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-orange-500/20 border border-orange-500/30 rounded-full px-4 py-1.5 mb-6 text-sm font-medium text-orange-300">
                <Zap className="w-4 h-4" />
                AI-Powered Car Recommendations & Comparison
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight mb-6">
                Find your perfect car<br />
                <span className="text-orange-400">with Vroomy AI</span>
              </h1>

              <p className="text-lg sm:text-xl text-slate-300 mb-10 leading-relaxed">
                Tell us what you need in natural language. Our AI evaluates verified car specifications, pricing, and safety ratings to find your ideal match.
              </p>

              <Link
                href="/chat"
                className="inline-flex items-center gap-3 bg-orange-500 hover:bg-orange-400 text-white font-bold px-8 py-4 rounded-2xl text-lg transition-all duration-200 shadow-lg hover:shadow-orange-500/25 hover:-translate-y-0.5"
              >
                <MessageCircle className="w-5 h-5" />
                Ask the AI Assistant
                <ChevronRight className="w-5 h-5" />
              </Link>

              <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
                <span className="text-slate-400 text-xs sm:text-sm">Try asking:</span>
                {suggestedPrompts.slice(0, 3).map((prompt) => (
                  <Link
                    key={prompt}
                    href={`/chat?q=${encodeURIComponent(prompt)}`}
                    className="text-xs bg-white/10 hover:bg-white/20 border border-white/20 rounded-full px-3 py-1.5 text-slate-300 transition-colors"
                  >
                    &ldquo;{prompt}&rdquo;
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Quick Body Type Filters */}
        <section className="py-10 bg-white border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-sm font-semibold text-slate-500 mb-5 text-center uppercase tracking-wider">
              Browse by Category
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              {bodyTypes.map(({ label, emoji, value, color }) => (
                <Link
                  key={value}
                  href={value === "electric" ? `/explore?fuelType=electric` : `/explore?bodyType=${value}`}
                  className={`flex items-center gap-2 px-5 py-3 rounded-xl border font-medium text-sm transition-all ${color}`}
                >
                  <span className="text-xl">{emoji}</span>
                  {label}
                </Link>
              ))}
              <Link
                href="/explore"
                className="flex items-center gap-2 px-5 py-3 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 font-medium text-sm text-slate-700 transition-all"
              >
                <Search className="w-4 h-4" />
                All Cars
              </Link>
            </div>
          </div>
        </section>

        {/* Featured Cars */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Featured Vehicles</h2>
                <p className="text-slate-500 text-sm mt-1">Popular models from our verified dataset</p>
              </div>
              <Link
                href="/explore"
                className="flex items-center gap-1 text-sm font-semibold text-orange-600 hover:text-orange-700"
              >
                Explore all cars <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            {featuredCars.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {featuredCars.map((car) => (
                  <CarCard key={car.id} car={car} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-2xl border border-slate-100">
                <p className="text-4xl mb-3">🚗</p>
                <p className="text-slate-600 font-medium">Database ready for initialization</p>
                <p className="text-slate-400 text-sm mt-1">
                  Run <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs font-mono">npm run db:seed</code> to populate vehicle records
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Features Showcase */}
        <section className="py-16 bg-white border-y border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Designed for Car Buyers</h2>
              <p className="text-slate-500 text-sm">Deterministic technical filters combined with Gemini AI intelligence</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                {
                  icon: MessageCircle,
                  title: "Natural Language Chat",
                  desc: "Say 'I need an SUV under 15 lakh with 5 star safety'. The AI parses requirements and matches verified models.",
                  href: "/chat",
                  color: "text-orange-500",
                  bg: "bg-orange-50",
                },
                {
                  icon: GitCompare,
                  title: "Head-to-Head Comparison",
                  desc: "Compare up to 4 cars side-by-side with clear indicators of best specs, power, boot space, and mileage.",
                  href: "/compare",
                  color: "text-blue-500",
                  bg: "bg-blue-50",
                },
                {
                  icon: Search,
                  title: "Exploration Matrix",
                  desc: "Filter by budget, brand, seating, fuel, and transmission with instant database search and pagination.",
                  href: "/explore",
                  color: "text-green-500",
                  bg: "bg-green-50",
                },
              ].map(({ icon: Icon, title, desc, href, color, bg }) => (
                <Link
                  key={title}
                  href={href}
                  className="vroomy-card p-6 flex flex-col gap-4 group"
                >
                  <div className={`w-12 h-12 ${bg} rounded-xl flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 ${color}`} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1 group-hover:text-orange-600 transition-colors">
                      {title}
                    </h3>
                    <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
                  </div>
                  <div className={`flex items-center gap-1 text-sm font-semibold ${color} mt-auto`}>
                    Try feature <ChevronRight className="w-4 h-4" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-12 bg-slate-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
              {stats.map(({ label, value, icon }) => (
                <div key={label}>
                  <p className="text-3xl mb-1">{icon}</p>
                  <p className="text-2xl font-bold text-white">{value}</p>
                  <p className="text-sm text-slate-400 mt-1">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Demo Notice */}
        <section className="py-5 bg-amber-50 border-t border-amber-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-xs text-amber-800">
              📌 <strong>Demo Data Notice:</strong> All prices, variants, and specifications are illustrative demo data. Always check with manufacturer dealerships before purchasing.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
