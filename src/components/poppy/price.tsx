import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";

export function Price({
  className,
  ...props
}: ComponentPropsWithoutRef<"p">) {
  return (
    <p
      className={cn("text-base font-semibold text-brand-green", className)}
      {...props}
    />
  );
}
