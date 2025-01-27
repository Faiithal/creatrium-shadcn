import * as React from "react"

import { cn } from "@/lib/utils"
import { cva } from "class-variance-authority";

// Original:   "flex h-9 w-full rounded-md border border-zinc-200 bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-zinc-950 placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:border-zinc-800 dark:file:text-zinc-50 dark:placeholder:text-zinc-400 dark:focus-visible:ring-zinc-300",


const InputVariants = cva(
  "flex h-9 w-full rounded-md border border-zinc-200 bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-zinc-950 placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:border-zinc-800 dark:file:text-zinc-50 dark:placeholder:text-zinc-400 dark:focus-visible:ring-zinc-300",
  {
    variants: {
      variant: {
        default: 
        "w-96 h-12 border-none bg-gray-300 drop-shadow-md"
      },
    }
    ,
    defaultVariant: {
      variant: 'default',
    }
  }
)

const Input = React.forwardRef(({ className, variant, type, ...props }, ref) => {
  return (
    (<input
      type={type}
      className={cn(
        InputVariants({variant, className}),
      )}
      ref={ref}
      {...props} />)
  );
})
Input.displayName = "Input"

export { Input }
