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
      "border-transparent bg-muted text-muted-foreground hover:bg-muted/80",
    destructive:
      "border-transparent bg-red-500 text-white shadow hover:bg-red-600",
    outline: "text-foreground border-border bg-transparent",
    success:
      "border-transparent bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 hover:bg-emerald-500/30",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2",
        variants[variant],
        className,
      )}
      {...props}
    />
  );
}

export { Badge };
