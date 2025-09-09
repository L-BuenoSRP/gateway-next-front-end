import * as React from "react"
import { cn } from "@/lib/utils"
import { Check } from "lucide-react"

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(({ className, ...props }, ref) => {
  return (
    <div className="relative flex items-center">
      <input type="checkbox" className="peer sr-only" ref={ref} {...props} />
      <div
        className={cn(
          "h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 peer-checked:bg-primary peer-checked:text-primary-foreground",
          className,
        )}
      >
        <Check className="h-3 w-3 text-white peer-checked:opacity-100 opacity-0 transition-opacity" />
      </div>
    </div>
  )
})
Checkbox.displayName = "Checkbox"

export { Checkbox }
