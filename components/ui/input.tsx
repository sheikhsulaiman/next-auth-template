import * as React from "react";

import { cn } from "@/lib/utils";
import { EyeIcon, EyeOffIcon } from "lucide-react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    const [passwordType, setPasswordType] = React.useState(type);
    const togglePasswordVisibility = () => {
      setPasswordType(passwordType === "password" ? "text" : "password");
    };
    return (
      <div className="relative flex items-center">
        <input
          type={passwordType}
          className={cn(
            "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
          {...props}
        />
        {type === "password" && (
          <button
            type="button"
            className="absolute right-2"
            onClick={togglePasswordVisibility}
          >
            {passwordType === "password" ? <EyeIcon /> : <EyeOffIcon />}
          </button>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
