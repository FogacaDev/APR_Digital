import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "type"> {
  onCheckedChange?: (checked: boolean) => void;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, checked, onCheckedChange, ...props }, ref) => {
    return (
      <span className="inline-flex items-center justify-center relative">
        <input
          ref={ref}
          type="checkbox"
          className="peer sr-only"
          checked={checked}
          onChange={(e) => onCheckedChange?.(e.target.checked)}
          {...props}
        />
        <span
          aria-hidden="true"
          className={cn(
            "h-5 w-5 rounded border border-input bg-background flex items-center justify-center transition",
            "peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2",
            checked && "bg-primary border-primary text-primary-foreground",
            className
          )}
        >
          {checked && <Check className="h-3.5 w-3.5" />}
        </span>
      </span>
    );
  }
);
Checkbox.displayName = "Checkbox";
