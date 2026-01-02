import * as React from "react";
import { Input as BaseInput } from "@base-ui/react/input";
import { Field } from "@base-ui/react/field";
import { cn } from "../../lib/utils";

export type InputProps = BaseInput.Props & {
  label?: string;
  error?: string;
  description?: string;
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, description, ...props }, ref) => {
    return (
      <Field.Root className="flex flex-col gap-1.5 w-full">
        {label && (
          <Field.Label className="text-sm font-medium text-foreground">
            {label}
          </Field.Label>
        )}
        <BaseInput
          ref={ref}
          className={cn(
            "h-10 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50 data-[invalid]:border-red-500",
            className as string,
          )}
          {...props}
        />
        {description && (
          <Field.Description className="text-xs text-muted-foreground">
            {description}
          </Field.Description>
        )}
        {error && (
          <Field.Error className="text-xs text-red-500 font-medium">
            {error}
          </Field.Error>
        )}
      </Field.Root>
    );
  },
);
Input.displayName = "Input";
