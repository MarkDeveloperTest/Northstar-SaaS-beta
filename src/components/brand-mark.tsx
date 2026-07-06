import { Sparkle } from "lucide-react";
import { cn } from "@/lib/utils";

export function BrandMark({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <span className="grid size-8 place-items-center rounded-lg border border-blue-100 bg-blue-50 text-blue-600">
        <Sparkle className="size-4" strokeWidth={2.2} />
      </span>
      <span className="text-[15px] font-semibold tracking-[-0.01em] text-slate-950">
        Northstar
      </span>
    </div>
  );
}
