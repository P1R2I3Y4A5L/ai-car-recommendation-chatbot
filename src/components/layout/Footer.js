/**
 * Application & Landing Footer Component
 */

import { Icons } from "../common/Icons.js";

export function renderFooter() {
  return `
    <footer class="border-t border-slate-800/80 bg-slate-950 text-slate-400 py-16 px-4 sm:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
        <!-- Brand Info -->
        <div class="lg:col-span-2 space-y-4">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-400 p-0.5 shadow-md">
              <div class="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center text-cyan-400">
                ${Icons.car("w-5 h-5 text-cyan-400")}
              </div>
            </div>
            <div class="flex items-center gap-2">
              <span class="text-xl font-extrabold text-white">AutoMind</span>
              <span class="px-2 py-0.5 text-[10px] font-bold uppercase rounded bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">AI</span>
            </div>
          </div>
          <p class="text-sm text-slate-400 max-w-sm leading-relaxed">
            The next-generation automotive recommendation engine. We leverage multi-factor AI scoring to analyze your driving habits, budget, and family needs to deliver unbiased vehicle choices.
          </p>
          <div class="flex items-center gap-2 text-xs text-slate-400 pt-2">
            <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>AI Match Engine v2.4 Active • 100% Client-Side Architecture (Phase 1)</span>
          </div>
        </div>

        <!-- Col 1: Platform -->
        <div>
          <h4 class="text-xs font-bold text-white uppercase tracking-wider mb-4">Platform</h4>
          <ul class="space-y-2.5 text-sm">
            <li><a href="#/chat" class="hover:text-cyan-400 transition-colors">AI Car Finder</a></li>
            <li><a href="#/results" class="hover:text-cyan-400 transition-colors">Recommendation Results</a></li>
            <li><a href="#/compare" class="hover:text-cyan-400 transition-colors">Smart Comparison Matrix</a></li>
            <li><a href="#/saved" class="hover:text-cyan-400 transition-colors">Saved Wishlist</a></li>
            <li><a href="#/history" class="hover:text-cyan-400 transition-colors">Recommendation History</a></li>
          </ul>
        </div>

        <!-- Col 2: Categories -->
        <div>
          <h4 class="text-xs font-bold text-white uppercase tracking-wider mb-4">Popular Segments</h4>
          <ul class="space-y-2.5 text-sm">
            <li><a href="#/results?bodyType=suv" class="hover:text-cyan-400 transition-colors">Compact & Mid-Size SUVs</a></li>
            <li><a href="#/results?fuel=electric" class="hover:text-cyan-400 transition-colors">Long-Range Electric Vehicles</a></li>
            <li><a href="#/results?fuel=hybrid" class="hover:text-cyan-400 transition-colors">Strong Hybrid Sedans</a></li>
            <li><a href="#/results?seating=7" class="hover:text-cyan-400 transition-colors">7-Seater Family MPVs</a></li>
            <li><a href="#/results?budgetMax=1000000" class="hover:text-cyan-400 transition-colors">Cars Under ₹10 Lakhs</a></li>
          </ul>
        </div>

        <!-- Col 3: Architecture & Admin -->
        <div>
          <h4 class="text-xs font-bold text-white uppercase tracking-wider mb-4">Architecture & Admin</h4>
          <ul class="space-y-2.5 text-sm">
            <li><a href="#/about" class="hover:text-cyan-400 transition-colors">System Architecture</a></li>
            <li><a href="#/admin" class="text-amber-400 hover:text-amber-300 transition-colors font-medium">Admin Dashboard</a></li>
            <li><a href="#/admin/cars" class="hover:text-slate-200 transition-colors">Car Management UI</a></li>
            <li><a href="#/admin/analytics" class="hover:text-slate-200 transition-colors">Recommendation Analytics</a></li>
            <li><a href="#/login" class="hover:text-slate-200 transition-colors">Demo Auth Gate</a></li>
          </ul>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="max-w-7xl mx-auto pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
        <div>
          © 2026 AutoMind AI Technologies Inc. All rights reserved. Phase 1 Frontend Architecture.
        </div>
        <div class="flex items-center gap-6">
          <a href="#/about" class="hover:text-slate-300">Privacy Policy</a>
          <a href="#/about" class="hover:text-slate-300">Terms of Service</a>
          <a href="#/about" class="hover:text-slate-300">API Documentation (Phase 2)</a>
        </div>
      </div>
    </footer>
  `;
}
