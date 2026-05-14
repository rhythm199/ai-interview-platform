import { forwardRef } from "react";

const Input = forwardRef(({ label, hint, icon, error, className = "", ...rest }, ref) => {
  return (
    <label className="block">
      {label && (
        <span className="mb-1.5 block text-xs font-medium text-[var(--ink)]">{label}</span>
      )}
      <div className="relative">
        {icon && (
          <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted)]">
            {icon}
          </div>
        )}
        <input
          ref={ref}
          className={`w-full rounded-xl border border-[var(--border)] bg-[var(--panel)] px-3.5 py-2.5 text-sm text-[var(--ink)] placeholder:text-[var(--muted)] focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 transition ${
            icon ? "pl-10" : ""
          } ${error ? "border-red-400" : ""} ${className}`}
          {...rest}
        />
      </div>
      {hint && !error && <span className="mt-1 block text-xs text-[var(--muted)]">{hint}</span>}
      {error && <span className="mt-1 block text-xs text-red-500">{error}</span>}
    </label>
  );
});
Input.displayName = "Input";
export default Input;

export function Select({ label, options, className = "", ...rest }) {
  return (
    <label className="block">
      {label && <span className="mb-1.5 block text-xs font-medium">{label}</span>}
      <select
        className={`w-full appearance-none rounded-xl border border-[var(--border)] bg-[var(--panel)] px-3.5 py-2.5 text-sm text-[var(--ink)] focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 ${className}`}
        {...rest}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </label>
  );
}
