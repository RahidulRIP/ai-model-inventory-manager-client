import React from "react";

const PrimaryButton = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  className = "",
  disabled = false,
  isLoading = false, // Added for professional feedback
  icon: Icon, // Optional icon prop
}) => {
  // 1. Core structural styles
  const baseStyles =
    "relative isolate overflow-hidden inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-bold text-xs uppercase tracking-[0.15em] transition-all duration-300 active:scale-[0.96] focus:outline-none focus:ring-2 focus:ring-offset-2";

  // 2. High-end variants
  const variants = {
    // Primary: Deep indigo with a slight gradient and focus ring
    primary:
      "bg-indigo-600 text-white shadow-[0_10px_20px_-5px_rgba(79,70,229,0.3)] hover:bg-indigo-700 hover:shadow-[0_15px_25px_-5px_rgba(79,70,229,0.4)] focus:ring-indigo-500",

    // Secondary: Bordered with a subtle background lift
    secondary:
      "bg-white border border-slate-200 text-slate-700 hover:border-indigo-600 hover:text-indigo-600 hover:bg-slate-50 focus:ring-slate-200",

    // Danger: Red tinted for destructive actions
    danger:
      "bg-red-50 border border-red-100 text-red-600 hover:bg-red-600 hover:text-white focus:ring-red-500",

    // Ghost: Cleanest look for low-priority
    ghost:
      "bg-transparent text-slate-500 hover:bg-slate-100 focus:ring-slate-100",
  };

  const variantStyles = variants[variant] || variants.primary;
  const disabledStyles =
    "bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed opacity-80 shadow-none scale-100";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`${baseStyles} ${
        disabled || isLoading ? disabledStyles : variantStyles
      } ${className}`}
    >
      {/* Subtle Shine Effect (on hover of primary button) */}
      {!disabled && !isLoading && variant === "primary" && (
        <span className="absolute inset-0 z-[-1] bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] transition-transform" />
      )}

      {/* Loading Spinner */}
      {isLoading ? (
        <svg
          className="animate-spin h-4 w-4 text-current"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      ) : (
        <>
          {Icon && <Icon className="text-lg" />}
          {children}
        </>
      )}
    </button>
  );
};

export default PrimaryButton;
