import * as React from "react";
import { cn } from "../../lib/utils";

export type InlineCodeProps = React.HTMLAttributes<HTMLElement>;

export const InlineCode = React.forwardRef<HTMLElement, InlineCodeProps>(
  ({ className, ...props }, ref) => {
    return (
      <code
        ref={ref}
        className={cn(
          "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold text-indigo-600 dark:text-indigo-400 border border-border/50 shadow-sm",
          className,
        )}
        {...props}
      />
    );
  },
);
InlineCode.displayName = "InlineCode";
