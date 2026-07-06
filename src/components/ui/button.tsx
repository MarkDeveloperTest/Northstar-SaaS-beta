import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex h-9 shrink-0 items-center justify-center gap-2 rounded-lg px-3.5 text-sm font-medium outline-none transition duration-200 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-blue-600 text-white shadow-sm shadow-blue-600/20 hover:bg-blue-700 active:scale-[0.98]",
        secondary:
          "border border-slate-200 bg-white text-slate-900 hover:border-slate-300 hover:bg-slate-50 active:scale-[0.98]",
        ghost:
          "text-slate-600 hover:bg-slate-100 hover:text-slate-950 active:scale-[0.98]",
        subtle:
          "bg-slate-100 text-slate-900 hover:bg-slate-200 active:scale-[0.98]",
        danger:
          "bg-red-50 text-red-700 hover:bg-red-100 active:scale-[0.98]",
      },
      size: {
        sm: "h-8 rounded-md px-2.5 text-xs",
        md: "h-9",
        lg: "h-11 rounded-xl px-5",
        icon: "size-9 p-0",
      },
    },
    defaultVariants: {
      variant: "secondary",
      size: "md",
    },
  },
);

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";
