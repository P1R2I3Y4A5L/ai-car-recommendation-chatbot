/**
 * About / How It Works Page
 */

import { Icons } from "../components/common/Icons.js";
import { renderNavbar } from "../components/layout/Navbar.js";
import { renderFooter } from "../components/layout/Footer.js";

export function renderAboutPage() {
  const faqs = [
    {
      q: "How does the AI calculate car compatibility scores?",
      a: "Our algorithm creates a dynamic preference vector across budget boundaries, usage patterns (city stop-and-go vs long highway touring), fuel priorities, safety crash ratings, and feature checklists. Each car in our verified catalog is scored across these 7 dimensions to compute an overall compatibility percentage."
    },
    {
      q: "Are the vehicle prices and specifications real?",
      a: "Yes! All mock catalog data mirrors real-world OEM specifications, Bharat NCAP / Global NCAP safety ratings, ex-showroom pricing in INR, certified fuel mileage, and real feature packages."
    },
    {
      q: "Is this connected to real dealership commissions?",
      a: "No. The system is designed to provide 100% objective recommendations based purely on mathematical match scoring rather than dealer sales quotas."
    },
    {
      q: "How will this frontend connect to a backend later?",
      a: "The frontend is built with dedicated service abstractions (carService, recommendationService, userService, chatService). In Phase 2 & 5, these service methods will simply be wired to live REST/GraphQL backend endpoints without rewriting the UI."
    }
  ];

  return `
    <div class="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      ${renderNavbar("#/about")}

      <main class="flex-1 py-16">
        <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <!-- Header -->
          <div class="text-center space-y-4">
            <span class="text-xs font-bold uppercase tracking-wider text-cyan-400">Architecture & Methodology</span>
            <h1 class="text-4xl sm:text-5xl font-extrabold text-white tracking-tight font-heading">
              How AutoMind AI Works
            </h1>
            <p class="text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Demystifying car buying through transparent, multi-dimensional decision modeling and intelligent conversational interfaces.
            </p>
          </div>

          <!-- Architecture Flow Diagram Card -->
          <div class="p-8 rounded-3xl border border-slate-800 bg-slate-900/60 shadow-2xl backdrop-blur-xl">
            <h2 class="text-xl font-bold text-white mb-6 flex items-center gap-2.5">
              ${Icons.bot("w-6 h-6 text-cyan-400")}
              <span>Phase 1 to Phase 5 Engineering Architecture</span>
            </h2>

            <div class="grid grid-cols-1 md:grid-cols-5 gap-4 text-center">
              <div class="p-4 rounded-2xl bg-slate-950/70 border border-slate-800">
                <div class="w-8 h-8 rounded-xl bg-blue-600/20 text-cyan-400 font-bold mx-auto flex items-center justify-center mb-2 text-xs">1</div>
                <div class="text-xs font-bold text-white mb-1">User Input</div>
                <p class="text-[11px] text-slate-400">Chat conversation & quick chips</p>
              </div>

              <div class="hidden md:flex items-center justify-center text-slate-600">
                ${Icons.arrowRight("w-5 h-5")}
              </div>

              <div class="p-4 rounded-2xl bg-slate-950/70 border border-slate-800">
                <div class="w-8 h-8 rounded-xl bg-indigo-600/20 text-indigo-400 font-bold mx-auto flex items-center justify-center mb-2 text-xs">2</div>
                <div class="text-xs font-bold text-white mb-1">Service Layer</div>
                <p class="text-[11px] text-slate-400">recommendationService abstraction</p>
              </div>

              <div class="hidden md:flex items-center justify-center text-slate-600">
                ${Icons.arrowRight("w-5 h-5")}
              </div>

              <div class="p-4 rounded-2xl bg-slate-950/70 border border-slate-800">
                <div class="w-8 h-8 rounded-xl bg-cyan-600/20 text-cyan-400 font-bold mx-auto flex items-center justify-center mb-2 text-xs">3</div>
                <div class="text-xs font-bold text-white mb-1">Scoring Matrix</div>
                <p class="text-[11px] text-slate-400">Multi-factor match & ranking</p>
              </div>
            </div>
          </div>

          <!-- FAQ Accordion -->
          <div class="space-y-6">
            <div class="text-center max-w-xl mx-auto">
              <h2 class="text-2xl font-bold text-white">Frequently Asked Questions</h2>
              <p class="text-xs text-slate-400 mt-1">Common inquiries about our recommendation methodology.</p>
            </div>

            <div class="space-y-4">
              ${faqs
                .map(
                  (f) => `
                <div class="p-6 rounded-3xl border border-slate-800 bg-slate-900/50 hover:border-slate-700 transition-colors">
                  <h3 class="text-base font-bold text-white mb-2 flex items-start gap-2">
                    <span class="text-cyan-400 font-mono text-sm shrink-0">Q.</span>
                    <span>${f.q}</span>
                  </h3>
                  <p class="text-sm text-slate-400 leading-relaxed pl-6">
                    ${f.a}
                  </p>
                </div>
              `
                )
                .join("")}
            </div>
          </div>

          <!-- Call to Action -->
          <div class="text-center pt-8">
            <a href="#/chat" class="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-base shadow-xl shadow-blue-600/20 transition-all">
              ${Icons.sparkles("w-5 h-5")}
              <span>Launch AI Recommendation Experience</span>
            </a>
          </div>
        </div>
      </main>

      ${renderFooter()}
    </div>
  `;
}
