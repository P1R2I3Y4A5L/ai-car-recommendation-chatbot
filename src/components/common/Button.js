/**
 * Reusable Button Component
 */

export function renderButton({
  text = "",
  variant = "primary", // 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'gradient'
  size = "md",         // 'sm' | 'md' | 'lg'
  icon = "",
  iconPosition = "left",
  className = "",
  type = "button",
  disabled = false,
  id = "",
  onClick = ""
}) {
  const baseClasses =
    "inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none rounded-xl select-none";

  const sizeClasses = {
    sm: "px-3 py-1.5 text-xs gap-1.5",
    md: "px-4 py-2.5 text-sm gap-2",
    lg: "px-6 py-3.5 text-base gap-2.5 shadow-lg"
  }[size] || "px-4 py-2.5 text-sm gap-2";

  const variantClasses = {
    primary:
      "bg-primary-600 hover:bg-primary-500 text-white shadow-primary-600/25 focus:ring-primary-500 active:scale-[0.98]",
    gradient:
      "bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white shadow-blue-500/20 active:scale-[0.98]",
    secondary:
      "bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700 focus:ring-slate-500 active:scale-[0.98]",
    outline:
      "border border-slate-700 hover:border-slate-500 text-slate-200 hover:bg-slate-800/60 focus:ring-slate-400",
    ghost:
      "text-slate-400 hover:text-slate-100 hover:bg-slate-800/50 focus:ring-slate-400",
    danger:
      "bg-red-600/90 hover:bg-red-500 text-white shadow-red-600/20 focus:ring-red-500"
  }[variant] || "bg-primary-600 text-white";

  const idAttr = id ? `id="${id}"` : "";
  const onClickAttr = onClick ? `onclick="${onClick}"` : "";
  const disabledAttr = disabled ? "disabled" : "";

  const content =
    iconPosition === "left"
      ? `${icon} <span>${text}</span>`
      : `<span>${text}</span> ${icon}`;

  return `
    <button type="${type}" ${idAttr} ${onClickAttr} ${disabledAttr} class="${baseClasses} ${sizeClasses} ${variantClasses} ${className}">
      ${content}
    </button>
  `;
}
