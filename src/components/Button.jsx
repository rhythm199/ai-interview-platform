export default function Button({ variant = "primary", icon, children, className = "", ...rest }) {
  const base =
    "btn-lift inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[var(--bg)] disabled:opacity-50 disabled:cursor-not-allowed";
  const variants = {
    primary:
      "bg-gradient-to-r from-indigo-500 to-violet-500 text-white shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 focus:ring-indigo-500",
    secondary:
      "border border-[var(--border)] bg-[var(--panel)] text-[var(--ink)] hover:bg-[color-mix(in_srgb,var(--panel)_80%,var(--border))] focus:ring-indigo-500",
    ghost: "text-[var(--muted)] hover:text-[var(--ink)] hover:bg-[var(--border)]/50 focus:ring-indigo-500",
    danger: "bg-red-500 text-white hover:bg-red-600 focus:ring-red-500",
    success: "bg-emerald-500 text-white hover:bg-emerald-600 focus:ring-emerald-500",
  };

  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...rest}>
      {icon}
      {children}
    </button>
  );
}
