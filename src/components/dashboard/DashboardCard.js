/**
 * Dashboard Statistic KPI Card Component
 */

import { Icons } from "../common/Icons.js";

export function renderDashboardCard({
  title = "Metric",
  value = "0",
  change = "+0%",
  changeType = "positive", // 'positive' | 'neutral' | 'negative'
  icon = Icons.car("w-6 h-6 text-cyan-400"),
  subtitle = "Compared to last week",
  route = ""
}) {
  const isClickable = Boolean(route);

  return `
    <div
      ${isClickable ? `onclick="window.location.hash='${route}'"` : ""}
      class="p-6 rounded-3xl border border-slate-800 bg-slate-900/60 hover:bg-slate-900/90 hover:border-slate-700/80 transition-all duration-300 shadow-xl backdrop-blur-md flex flex-col justify-between group ${
        isClickable ? "cursor-pointer" : ""
      }"
    >
      <div class="flex items-center justify-between mb-4">
        <span class="text-xs font-bold uppercase tracking-wider text-slate-400">${title}</span>
        <div class="w-11 h-11 rounded-2xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-center group-hover:scale-105 transition-transform">
          ${icon}
        </div>
      </div>

      <div>
        <div class="text-3xl font-extrabold text-white font-mono tracking-tight mb-2">${value}</div>
        <div class="flex items-center gap-2 text-xs">
          <span class="inline-flex items-center font-bold px-2 py-0.5 rounded-full ${
            changeType === "positive"
              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
              : changeType === "negative"
              ? "bg-red-500/10 text-red-400 border border-red-500/20"
              : "bg-slate-800 text-slate-300"
          }">
            ${change}
          </span>
          <span class="text-slate-400 truncate">${subtitle}</span>
        </div>
      </div>
    </div>
  `;
}
