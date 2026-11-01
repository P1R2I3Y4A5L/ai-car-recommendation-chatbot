/**
 * Signup Page Component (Frontend Simulation)
 */

import { Icons } from "../components/common/Icons.js";
import { renderNavbar } from "../components/layout/Navbar.js";
import { renderFooter } from "../components/layout/Footer.js";

export function renderSignupPage() {
  return `
    <div class="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      ${renderNavbar("#/signup")}

      <main class="flex-1 flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8 relative">
        <div class="absolute w-[500px] h-[300px] bg-cyan-600/10 blur-[120px] rounded-full pointer-events-none -z-10"></div>

        <div class="w-full max-w-md space-y-8">
          <div class="p-8 sm:p-10 rounded-3xl border border-slate-800 bg-slate-900/80 shadow-2xl backdrop-blur-xl">
            <!-- Header -->
            <div class="text-center mb-8">
              <div class="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-400 to-blue-600 p-0.5 shadow-lg shadow-cyan-500/20 mx-auto mb-4">
                <div class="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center text-cyan-400">
                  ${Icons.car("w-6 h-6 text-cyan-400")}
                </div>
              </div>
              <h2 class="text-2xl font-extrabold text-white tracking-tight font-heading">Create Account</h2>
              <p class="text-xs text-slate-400 mt-1">Unlock AI vehicle matching, personalized garage, and history tracking</p>
            </div>

            <!-- Form -->
            <form id="signup-form" onsubmit="window.handleSignupSubmit(event)" class="space-y-4">
              <div>
                <label for="signup-name" class="block text-xs font-semibold text-slate-300 mb-1.5">Full Name</label>
                <input
                  type="text"
                  id="signup-name"
                  required
                  placeholder="e.g. Arjun Sharma"
                  class="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                />
              </div>

              <div>
                <label for="signup-email" class="block text-xs font-semibold text-slate-300 mb-1.5">Email Address</label>
                <input
                  type="email"
                  id="signup-email"
                  required
                  placeholder="name@example.com"
                  class="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                />
              </div>

              <div>
                <label for="signup-password" class="block text-xs font-semibold text-slate-300 mb-1.5">Create Password</label>
                <input
                  type="password"
                  id="signup-password"
                  required
                  placeholder="At least 8 characters"
                  class="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                />
              </div>

              <div>
                <label for="signup-confirm-password" class="block text-xs font-semibold text-slate-300 mb-1.5">Confirm Password</label>
                <input
                  type="password"
                  id="signup-confirm-password"
                  required
                  placeholder="Re-enter password"
                  class="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                />
              </div>

              <div class="text-xs text-slate-400 leading-normal pt-1">
                By creating an account, you agree to our Terms of Service and Privacy Policy.
              </div>

              <button
                type="submit"
                id="signup-btn"
                class="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-sm shadow-xl shadow-blue-600/25 active:scale-95 transition-all mt-3"
              >
                Create Account
              </button>
            </form>

            <!-- Login Link -->
            <div class="mt-6 text-center text-xs text-slate-400">
              Already have an account?
              <a href="#/login" class="text-cyan-400 hover:text-cyan-300 font-semibold ml-1">Sign in here</a>
            </div>
          </div>
        </div>
      </main>

      ${renderFooter()}
    </div>
  `;
}
