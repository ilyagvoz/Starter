import * as React from "react";
import { Button as BaseButton } from "@base-ui/react/button";
import { cn } from "../../lib/utils";

export type ButtonProps = BaseButton.Props & {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg" | "icon";
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    const variants = {
      primary:
        "bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm shadow-indigo-500/20",
      secondary:
        "bg-muted text-foreground hover:bg-muted/80 border border-border",
      outline:
        "border border-border bg-transparent hover:bg-muted text-foreground",
      ghost: "hover:bg-muted text-muted-foreground hover:text-foreground",
      danger: "bg-red-500 text-white hover:bg-red-600",
    };

    const sizes = {
      sm: "h-8 px-3 text-xs",
      md: "h-10 px-4 py-2",
      lg: "h-12 px-8 text-lg",
      icon: "h-10 w-10 p-0 flex items-center justify-center",
    };

    return (
      <BaseButton
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
          variants[variant as keyof typeof variants],
          sizes[size as keyof typeof sizes],
          className as string,
        )}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";
