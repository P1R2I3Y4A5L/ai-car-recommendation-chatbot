/**
 * Landing Page Component
 * Premium Automotive Technology Homepage
 */

import { Icons } from "../components/common/Icons.js";
import { renderNavbar } from "../components/layout/Navbar.js";
import { renderFooter } from "../components/layout/Footer.js";
import { renderCarCard } from "../components/cars/CarCard.js";
import { carService } from "../services/carService.js";

export async function renderLandingPage() {
  const featuredCars = await carService.getFeaturedCars();

  return `
    <div class="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      ${renderNavbar("#/")}

      <main class="flex-1">
        <!-- Hero Section -->
        <section class="relative pt-12 pb-24 md:pt-20 md:pb-32 overflow-hidden">
          <!-- Background Glow Elements -->
          <div class="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-tr from-blue-600/15 via-cyan-500/15 to-indigo-600/10 blur-[130px] rounded-full pointer-events-none -z-10"></div>
          <div class="absolute -top-24 right-0 w-96 h-96 bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none -z-10"></div>

          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center max-w-3xl mx-auto space-y-6 mb-12">
              <!-- Eyebrow Badge -->
              <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-950/40 text-cyan-300 text-xs font-bold tracking-wide shadow-inner backdrop-blur-md animate-fade-in">
                ${Icons.sparkles("w-4 h-4 text-cyan-400")}
                <span>Next-Gen Automotive Recommendation Engine</span>
              </div>

              <!-- Main Headline -->
              <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white font-heading leading-tight">
                Find the Car That <br class="hidden sm:inline" />
                <span class="bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400 bg-clip-text text-transparent">
                  Fits Your Life.
                </span>
              </h1>

              <!-- Supporting Text -->
              <p class="text-base sm:text-lg text-slate-400 leading-relaxed font-normal max-w-2xl mx-auto">
                No more confusing brochures or biased dealership sales pitches. Our conversational AI analyzes your daily commute, family dimensions, safety standards, and exact budget to match the ideal vehicle.
              </p>

              <!-- CTA Buttons -->
              <div class="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <a
                  href="#/chat"
                  class="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-base shadow-xl shadow-blue-600/25 active:scale-95 transition-all group"
                >
                  ${Icons.sparkles("w-5 h-5 text-cyan-200 group-hover:rotate-12 transition-transform")}
                  <span>Find My Car</span>
                  <span class="group-hover:translate-x-1 transition-transform">${Icons.arrowRight("w-4 h-4")}</span>
                </a>

                <a
                  href="#/results"
                  class="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700/80 hover:border-slate-600 font-semibold text-base backdrop-blur-md transition-all"
                >
                  ${Icons.car("w-5 h-5 text-slate-400")}
                  <span>Explore Cars</span>
                </a>
              </div>

              <!-- Trust Indicators -->
              <div class="pt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto border-t border-slate-800/80 text-left">
                <div class="p-3 rounded-xl bg-slate-900/40 border border-slate-800/60">
                  <div class="text-xl font-extrabold text-white font-mono">100%</div>
                  <div class="text-[11px] text-slate-400 font-medium">Unbiased AI Matching</div>
                </div>
                <div class="p-3 rounded-xl bg-slate-900/40 border border-slate-800/60">
                  <div class="text-xl font-extrabold text-white font-mono">5-Star</div>
                  <div class="text-[11px] text-slate-400 font-medium">Bharat NCAP Focus</div>
                </div>
                <div class="p-3 rounded-xl bg-slate-900/40 border border-slate-800/60">
                  <div class="text-xl font-extrabold text-white font-mono">30+</div>
                  <div class="text-[11px] text-slate-400 font-medium">Dimensions Scored</div>
                </div>
                <div class="p-3 rounded-xl bg-slate-900/40 border border-slate-800/60">
                  <div class="text-xl font-extrabold text-white font-mono">₹5L–₹70L+</div>
                  <div class="text-[11px] text-slate-400 font-medium">Full Budget Coverage</div>
                </div>
              </div>
            </div>

            <!-- Hero Automotive Visual Showcase -->
            <div class="relative mx-auto max-w-5xl rounded-3xl p-2 bg-gradient-to-b from-slate-700/40 to-slate-900/60 border border-slate-700/60 shadow-2xl shadow-cyan-950/30">
              <div class="relative rounded-[22px] overflow-hidden bg-slate-950 aspect-[16/9] sm:aspect-[21/9]">
                <img
                  src="https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1600&q=85"
                  alt="Modern Automotive Fleet Preview"
                  class="w-full h-full object-cover"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent"></div>

                <!-- Floating AI Match Card Overlay -->
                <div class="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl bg-slate-900/90 border border-slate-700/80 backdrop-blur-xl shadow-2xl">
                  <div class="flex items-center gap-4">
                    <div class="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center font-bold text-white shadow-lg text-lg">
                      96%
                    </div>
                    <div>
                      <div class="flex items-center gap-2">
                        <span class="text-sm font-bold text-white">Hyundai Creta SX (O) Turbo</span>
                        <span class="px-2 py-0.5 text-[10px] font-bold rounded bg-emerald-500/20 text-emerald-400">Match of the Day</span>
                      </div>
                      <p class="text-xs text-slate-300">Perfect balance of Level 2 ADAS safety, 18.4 km/l efficiency, and family luggage space.</p>
                    </div>
                  </div>

                  <a href="#/chat" class="shrink-0 px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold transition-all">
                    Start Your Search →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- How It Works Section (3 Steps) -->
        <section class="py-20 border-t border-slate-800/80 bg-slate-900/30">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center max-w-2xl mx-auto mb-16">
              <span class="text-xs font-bold uppercase tracking-wider text-cyan-400">Effortless Journey</span>
              <h2 class="text-3xl font-extrabold text-white tracking-tight font-heading mt-2">
                How AutoMind AI Works
              </h2>
              <p class="text-sm text-slate-400 mt-3">
                Experience an automotive concierge that listens to your real life, not sales quotas.
              </p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
              <!-- Step 1 -->
              <div class="p-8 rounded-3xl border border-slate-800 bg-slate-900/60 relative group hover:border-cyan-500/50 transition-all duration-300 shadow-xl">
                <div class="w-12 h-12 rounded-2xl bg-blue-600/20 border border-blue-500/40 text-cyan-400 flex items-center justify-center mb-6 font-mono font-bold text-lg">
                  01
                </div>
                <h3 class="text-xl font-bold text-white mb-3">Tell us what you need</h3>
                <p class="text-sm text-slate-400 leading-relaxed">
                  Chat naturally about your budget bracket, daily commute distance, passenger count, preferred fuel type, and must-have safety tech.
                </p>
              </div>

              <!-- Step 2 -->
              <div class="p-8 rounded-3xl border border-slate-800 bg-slate-900/60 relative group hover:border-cyan-500/50 transition-all duration-300 shadow-xl">
                <div class="w-12 h-12 rounded-2xl bg-indigo-600/20 border border-indigo-500/40 text-indigo-400 flex items-center justify-center mb-6 font-mono font-bold text-lg">
                  02
                </div>
                <h3 class="text-xl font-bold text-white mb-3">AI understands your preferences</h3>
                <p class="text-sm text-slate-400 leading-relaxed">
                  Our algorithm processes 30+ vehicle attributes against your criteria: maintenance cost, crash safety ratings, real fuel economy, and cabin comfort.
                </p>
              </div>

              <!-- Step 3 -->
              <div class="p-8 rounded-3xl border border-slate-800 bg-slate-900/60 relative group hover:border-cyan-500/50 transition-all duration-300 shadow-xl">
                <div class="w-12 h-12 rounded-2xl bg-cyan-600/20 border border-cyan-500/40 text-cyan-300 flex items-center justify-center mb-6 font-mono font-bold text-lg">
                  03
                </div>
                <h3 class="text-xl font-bold text-white mb-3">Get personalized car recommendations</h3>
                <p class="text-sm text-slate-400 leading-relaxed">
                  Review ranked candidate cars with transparent AI score breakdowns, side-by-side spec comparison, pros & cons, and save favorites to your garage.
                </p>
              </div>
            </div>
          </div>
        </section>

        <!-- Platform Features Section -->
        <section class="py-20 border-t border-slate-800/80">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center max-w-2xl mx-auto mb-16">
              <span class="text-xs font-bold uppercase tracking-wider text-cyan-400">Core Capabilities</span>
              <h2 class="text-3xl font-extrabold text-white tracking-tight font-heading mt-2">
                Engineered for Modern Car Buyers
              </h2>
              <p class="text-sm text-slate-400 mt-3">
                Everything you need to make an informed, confident automotive purchase.
              </p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <!-- Feature 1 -->
              <div class="p-6 rounded-3xl border border-slate-800 bg-slate-900/50 hover:bg-slate-900/80 hover:border-slate-700 transition-all shadow-lg">
                <div class="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center mb-4">
                  ${Icons.bot("w-5 h-5")}
                </div>
                <h3 class="text-base font-bold text-white mb-2">AI Car Recommendations</h3>
                <p class="text-xs text-slate-400 leading-relaxed">
                  Multi-variable AI model weights safety, running cost, seating ergonomics, and highway dynamics tailored to your profile.
                </p>
              </div>

              <!-- Feature 2 -->
              <div class="p-6 rounded-3xl border border-slate-800 bg-slate-900/50 hover:bg-slate-900/80 hover:border-slate-700 transition-all shadow-lg">
                <div class="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center mb-4">
                  ${Icons.compare("w-5 h-5")}
                </div>
                <h3 class="text-base font-bold text-white mb-2">Smart Car Comparison</h3>
                <p class="text-xs text-slate-400 leading-relaxed">
                  Compare 2 to 4 vehicles side-by-side with automatic difference highlighting and responsive mobile scrolling.
                </p>
              </div>

              <!-- Feature 3 -->
              <div class="p-6 rounded-3xl border border-slate-800 bg-slate-900/50 hover:bg-slate-900/80 hover:border-slate-700 transition-all shadow-lg">
                <div class="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-4">
                  ${Icons.gauge("w-5 h-5")}
                </div>
                <h3 class="text-base font-bold text-white mb-2">Budget-Based Recommendations</h3>
                <p class="text-xs text-slate-400 leading-relaxed">
                  Search across verified ex-showroom price tiers from ₹5 Lakh hatchbacks to ₹60 Lakh executive luxury limousines.
                </p>
              </div>

              <!-- Feature 4 -->
              <div class="p-6 rounded-3xl border border-slate-800 bg-slate-900/50 hover:bg-slate-900/80 hover:border-slate-700 transition-all shadow-lg">
                <div class="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center mb-4">
                  ${Icons.sparkles("w-5 h-5")}
                </div>
                <h3 class="text-base font-bold text-white mb-2">Personalized Results</h3>
                <p class="text-xs text-slate-400 leading-relaxed">
                  Detailed match percentages and qualitative reasoning explaining exactly why a vehicle was shortlisted for you.
                </p>
              </div>

              <!-- Feature 5 -->
              <div class="p-6 rounded-3xl border border-slate-800 bg-slate-900/50 hover:bg-slate-900/80 hover:border-slate-700 transition-all shadow-lg">
                <div class="w-10 h-10 rounded-xl bg-red-500/10 text-red-400 flex items-center justify-center mb-4">
                  ${Icons.heart("w-5 h-5", true)}
                </div>
                <h3 class="text-base font-bold text-white mb-2">Saved Cars Garage</h3>
                <p class="text-xs text-slate-400 leading-relaxed">
                  Bookmark candidate cars in your personal wishlist and easily pull them into comparisons anytime.
                </p>
              </div>

              <!-- Feature 6 -->
              <div class="p-6 rounded-3xl border border-slate-800 bg-slate-900/50 hover:bg-slate-900/80 hover:border-slate-700 transition-all shadow-lg">
                <div class="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-4">
                  ${Icons.history("w-5 h-5")}
                </div>
                <h3 class="text-base font-bold text-white mb-2">Recommendation History</h3>
                <p class="text-xs text-slate-400 leading-relaxed">
                  Every AI query session is logged with time, parameters, and results for revisiting or sharing.
                </p>
              </div>
            </div>
          </div>
        </section>

        <!-- Featured Recommendations Showcase -->
        <section class="py-20 border-t border-slate-800/80 bg-slate-900/20">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12 gap-4">
              <div>
                <span class="text-xs font-bold uppercase tracking-wider text-cyan-400">Catalog Preview</span>
                <h2 class="text-3xl font-extrabold text-white tracking-tight font-heading mt-1">
                  Popular AI Shortlists
                </h2>
                <p class="text-sm text-slate-400 mt-1">High compatibility models across India's fastest-growing segments.</p>
              </div>

              <a href="#/results" class="inline-flex items-center gap-2 text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition-colors">
                <span>View All 16+ Models</span>
                ${Icons.arrowRight("w-4 h-4")}
              </a>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              ${featuredCars.slice(0, 3).map((car) => renderCarCard({ car, matchScore: car.isPopular ? 94 : 89 })).join("")}
            </div>
          </div>
        </section>

        <!-- Final CTA Banner -->
        <section class="py-20 border-t border-slate-800/80">
          <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="rounded-3xl p-8 sm:p-12 bg-gradient-to-r from-blue-900/40 via-indigo-900/40 to-cyan-900/40 border border-cyan-500/30 text-center relative overflow-hidden shadow-2xl">
              <div class="absolute -right-20 -bottom-20 w-80 h-80 bg-cyan-500/20 blur-[90px] rounded-full pointer-events-none"></div>

              <h2 class="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-heading mb-4">
                Ready to Meet Your Next Car?
              </h2>
              <p class="text-sm sm:text-base text-slate-300 max-w-xl mx-auto mb-8 leading-relaxed">
                Take 2 minutes to chat with our AI advisor and unlock personalized recommendations with comprehensive spec comparisons.
              </p>

              <div class="flex flex-wrap items-center justify-center gap-4">
                <a
                  href="#/chat"
                  class="px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-base shadow-xl shadow-blue-600/30 transition-all"
                >
                  Start Recommendation Chatbot
                </a>
                <a
                  href="#/dashboard"
                  class="px-8 py-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-semibold text-base transition-all"
                >
                  Go to Dashboard
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      ${renderFooter()}
    </div>
  `;
}
