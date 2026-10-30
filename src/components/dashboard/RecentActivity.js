/**
 * Recent Activity & Insights Component for Dashboard
 */

import { Icons } from "../common/Icons.js";

export function renderRecentActivity(events = []) {
  const defaultEvents = [
    {
      title: "Recommendation Generated",
      desc: "Matched Hyundai Creta SX(O) with 94% compatibility for Family & Commute.",
      time: "25 mins ago",
      icon: Icons.sparkles("w-4 h-4 text-cyan-400"),
      bg: "bg-cyan-500/10 border-cyan-500/20"
    },
    {
      title: "Comparison Updated",
      desc: "Compared Mahindra XUV700 vs Tata Safari vs Toyota Innova HyCross.",
      time: "3 hours ago",
      icon: Icons.compare("w-4 h-4 text-blue-400"),
      bg: "bg-blue-500/10 border-blue-500/20"
    },
    {
      title: "Saved Vehicle to Wishlist",
      desc: "Added Honda City e:HEV Strong Hybrid to your saved garage.",
      time: "Yesterday",
      icon: Icons.heart("w-4 h-4 text-red-400", true),
      bg: "bg-red-500/10 border-red-500/20"
    }
  ];

  const items = events.length > 0 ? events : defaultEvents;

  return `
    <div class="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-xl shadow-xl">
      <div class="flex items-center justify-between pb-4 border-b border-slate-800 mb-5">
        <h3 class="text-base font-bold text-white tracking-tight flex items-center gap-2">
          ${Icons.history("w-5 h-5 text-cyan-400")}
          <span>Recent Activity & Insights</span>
        </h3>
        <a href="#/history" class="text-xs text-cyan-400 hover:text-cyan-300 font-semibold">View All</a>
      </div>

      <div class="space-y-4">
        ${items
          .map(
            (item) => `
          <div class="flex items-start gap-3.5 p-3 rounded-2xl hover:bg-slate-800/40 transition-colors">
            <div class="w-9 h-9 rounded-xl ${item.bg || "bg-slate-800 border-slate-700"} border flex items-center justify-center shrink-0 mt-0.5">
              ${item.icon}
            </div>
            <div class="flex-1 min-w-0">
              <div class="flex items-center justify-between mb-0.5">
                <h4 class="text-xs font-bold text-white truncate">${item.title}</h4>
                <span class="text-[10px] text-slate-400 font-mono">${item.time}</span>
              </div>
              <p class="text-xs text-slate-400 leading-relaxed">${item.desc}</p>
            </div>
          </div>
        `
          )
          .join("")}
      </div>
    </div>
  `;
}
