/**
 * Login Page Component (Frontend Simulation)
 */

import { Icons } from "../components/common/Icons.js";
import { renderNavbar } from "../components/layout/Navbar.js";
import { renderFooter } from "../components/layout/Footer.js";

export function renderLoginPage() {
  return `
    <div class="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      ${renderNavbar("#/login")}

      <main class="flex-1 flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8 relative">
        <div class="absolute w-[500px] h-[300px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none -z-10"></div>

        <div class="w-full max-w-md space-y-8">
          <!-- Card Container -->
          <div class="p-8 sm:p-10 rounded-3xl border border-slate-800 bg-slate-900/80 shadow-2xl backdrop-blur-xl">
            <!-- Header -->
            <div class="text-center mb-8">
              <div class="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-400 p-0.5 shadow-lg shadow-blue-500/20 mx-auto mb-4">
                <div class="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center text-cyan-400">
                  ${Icons.car("w-6 h-6 text-cyan-400")}
                </div>
              </div>
              <h2 class="text-2xl font-extrabold text-white tracking-tight font-heading">Welcome Back</h2>
              <p class="text-xs text-slate-400 mt-1">Sign in to access your saved garage and recommendation history</p>
            </div>

            <!-- Demo Quick Fill Pill -->
            <div class="mb-6 p-3 rounded-2xl bg-cyan-950/40 border border-cyan-500/30 flex items-center justify-between text-xs">
              <span class="text-slate-300">Quick Test Credentials:</span>
              <button
                type="button"
                onclick="window.quickFillDemoLogin()"
                class="px-2.5 py-1 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold transition-all text-[11px]"
              >
                Auto-Fill Demo
              </button>
            </div>

            <!-- Form -->
            <form id="login-form" onsubmit="window.handleLoginSubmit(event)" class="space-y-4">
              <div>
                <label for="login-email" class="block text-xs font-semibold text-slate-300 mb-1.5">Email Address</label>
                <input
                  type="email"
                  id="login-email"
                  required
                  placeholder="name@example.com"
                  class="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                />
              </div>

              <div>
                <div class="flex items-center justify-between mb-1.5">
                  <label for="login-password" class="text-xs font-semibold text-slate-300">Password</label>
                  <a href="#/login" onclick="alert('Demo reset instructions sent to test email.')" class="text-[11px] text-cyan-400 hover:text-cyan-300">Forgot password?</a>
                </div>
                <input
                  type="password"
                  id="login-password"
                  required
                  placeholder="••••••••"
                  class="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                />
              </div>

              <div class="flex items-center justify-between text-xs">
                <label class="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" id="login-remember" checked class="rounded bg-slate-800 border-slate-700 text-cyan-500 focus:ring-cyan-500 w-4 h-4" />
                  <span class="text-slate-300">Remember me</span>
                </label>
                <span class="text-slate-400 font-mono text-[10px]">Frontend UI Mock</span>
              </div>

              <button
                type="submit"
                id="login-btn"
                class="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-sm shadow-xl shadow-blue-600/25 active:scale-95 transition-all mt-2"
              >
                Sign In
              </button>
            </form>

            <!-- Social Divider -->
            <div class="relative my-6 text-center">
              <div class="absolute inset-0 flex items-center"><div class="w-full border-t border-slate-800"></div></div>
              <span class="relative px-3 bg-slate-900 text-slate-400 text-xs">or continue with</span>
            </div>

            <!-- Google OAuth Placeholder -->
            <button
              type="button"
              onclick="window.quickFillDemoLogin(); window.handleLoginSubmit(new Event('submit'))"
              class="w-full py-3 px-4 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-3 transition-colors"
            >
              <svg class="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#EA4335" d="M12 5c1.6 0 3 .6 4.1 1.7l3.1-3.1C17.3 1.8 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.4 9 5 12 5z"/>
                <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.7-.2-2.3H12v4.6h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.9z"/>
                <path fill="#FBBC05" d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.8s.2-2.1.4-2.8L1.9 6.3C.7 8.7 0 10.3 0 12s.7 3.3 1.9 5.7l3.7-2.9z"/>
                <path fill="#34A853" d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.4-6.4-5.2L1.9 16C3.7 19.7 7.5 23 12 23z"/>
              </svg>
              <span>Continue with Google</span>
            </button>

            <!-- Signup Footer Link -->
            <div class="mt-6 text-center text-xs text-slate-400">
              Don't have an account yet?
              <a href="#/signup" class="text-cyan-400 hover:text-cyan-300 font-semibold ml-1">Create an account</a>
            </div>
          </div>
        </div>
      </main>

      ${renderFooter()}
    </div>
  `;
}
