/**
 * AI Match Score Component
 * Displays match percentage with automotive gradient accents.
 */

import { Icons } from "./Icons.js";

export function renderMatchScore(score = 85, size = "md") {
  let colorTheme = "from-emerald-500 to-teal-400 text-emerald-400 border-emerald-500/30 bg-emerald-950/40";
  let label = "Top Match";

  if (score >= 90) {
    colorTheme = "from-cyan-400 to-blue-500 text-cyan-300 border-cyan-500/40 bg-cyan-950/50";
    label = "90%+ Match";
  } else if (score >= 80) {
    colorTheme = "from-blue-500 to-indigo-500 text-blue-300 border-blue-500/40 bg-blue-950/40";
    label = "Great Fit";
  } else {
    colorTheme = "from-amber-500 to-orange-500 text-amber-300 border-amber-500/30 bg-amber-950/40";
    label = "Good Match";
  }

  if (size === "sm") {
    return `
      <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${colorTheme} backdrop-blur-sm shadow-sm">
        ${Icons.sparkles("w-3.5 h-3.5")}
        <span>${score}% AI Match</span>
      </span>
    `;
  }

  if (size === "lg") {
    return `
      <div class="inline-flex items-center gap-3 px-4 py-2.5 rounded-2xl border ${colorTheme} backdrop-blur-md shadow-lg">
        <div class="w-10 h-10 rounded-xl bg-gradient-to-br ${colorTheme} flex items-center justify-center font-bold text-white shadow-inner">
          ${score}%
        </div>
        <div class="text-left">
          <div class="text-xs uppercase tracking-wider font-semibold text-slate-400">AI Compatibility</div>
          <div class="text-sm font-bold text-white">${label}</div>
        </div>
      </div>
    `;
  }

  // Default md
  return `
    <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border ${colorTheme} backdrop-blur-md shadow-sm">
      ${Icons.sparkles("w-3.5 h-3.5")}
      <span>${score}% Match</span>
    </span>
  `;
}
