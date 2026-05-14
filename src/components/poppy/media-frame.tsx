import type { ComponentPropsWithoutRef } from "react";

import { aspectRatioClassName, type MediaAspectRatio } from "@/lib/media";
import { cn } from "@/lib/utils";

type MediaFrameProps = ComponentPropsWithoutRef<"div"> & {
  label?: string;
  aspectRatio?: MediaAspectRatio;
};

export function MediaFrame({
  label,
  aspectRatio = "4:5",
  className,
  children,
  ...props
}: MediaFrameProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[2rem] border border-border bg-brand-beige",
        className
      )}
      {...props}
    >
      {children ?? (
        <div
          className={cn(
            "flex items-center justify-center bg-[linear-gradient(135deg,var(--brand-beige),var(--brand-off-white))] text-xs uppercase tracking-[0.24em] text-brand-black/45",
            aspectRatioClassName[aspectRatio]
          )}
        >
          {label ?? "Media"}
        </div>
      )}
    </div>
  );
}
