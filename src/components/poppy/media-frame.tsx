import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";

type MediaFrameProps = ComponentPropsWithoutRef<"div"> & {
  label?: string;
};

export function MediaFrame({ label, className, children, ...props }: MediaFrameProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[2rem] border border-border bg-brand-beige",
        className
      )}
      {...props}
    >
      {children ?? (
        <div className="flex aspect-[4/5] items-center justify-center bg-[linear-gradient(135deg,var(--brand-beige),var(--brand-off-white))] text-xs uppercase tracking-[0.24em] text-brand-black/45">
          {label ?? "Media"}
        </div>
      )}
    </div>
  );
}
