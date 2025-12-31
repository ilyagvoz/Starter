import * as React from "react";
import { cn } from "../../lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "destructive" | "outline" | "success";
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  const variants = {
    default:
      "border-transparent bg-indigo-600 text-white shadow hover:bg-indigo-700",
    secondary:
      "border-transparent bg-slate-800 text-slate-100 hover:bg-slate-700",
    destructive:
      "border-transparent bg-red-500 text-white shadow hover:bg-red-600",
    outline: "text-slate-100 border-slate-700",
    success: "border-transparent bg-emerald-500/15 text-emerald-500 hover:bg-emerald-500/25",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}

export { Badge };
