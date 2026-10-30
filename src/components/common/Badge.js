/**
 * Badge & Tag Component
 */

export function renderBadge({
  text = "",
  variant = "slate", // 'slate' | 'blue' | 'green' | 'amber' | 'purple' | 'red' | 'cyan'
  size = "md",       // 'sm' | 'md'
  icon = "",
  className = ""
}) {
  const sizeClasses = {
    sm: "px-2 py-0.5 text-xs gap-1",
    md: "px-2.5 py-1 text-xs gap-1.5"
  }[size] || "px-2.5 py-1 text-xs gap-1.5";

  const variantClasses = {
    slate: "bg-slate-800 text-slate-300 border border-slate-700/60",
    blue: "bg-blue-950/70 text-blue-300 border border-blue-800/50",
    cyan: "bg-cyan-950/70 text-cyan-300 border border-cyan-800/50",
    green: "bg-emerald-950/70 text-emerald-300 border border-emerald-800/50",
    amber: "bg-amber-950/70 text-amber-300 border border-amber-800/50",
    purple: "bg-purple-950/70 text-purple-300 border border-purple-800/50",
    red: "bg-red-950/70 text-red-300 border border-red-800/50"
  }[variant] || "bg-slate-800 text-slate-300 border border-slate-700/60";

  return `
    <span class="inline-flex items-center font-medium rounded-full ${sizeClasses} ${variantClasses} ${className}">
      ${icon ? `<span class="shrink-0">${icon}</span>` : ""}
      <span>${text}</span>
    </span>
  `;
}
