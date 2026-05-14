import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";

type EditorialHeadingProps = ComponentPropsWithoutRef<"div"> & {
  eyebrow?: string;
  title: string;
  description?: string;
};

export function EditorialHeading({
  eyebrow,
  title,
  description,
  className,
  ...props
}: EditorialHeadingProps) {
  return (
    <div className={cn("max-w-3xl", className)} {...props}>
      {eyebrow ? (
        <p className="mb-5 text-xs uppercase tracking-[0.34em] text-brand-purple">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="serif text-5xl font-semibold leading-none text-brand-black md:text-7xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-6 max-w-2xl text-base leading-7 text-brand-black/70">
          {description}
        </p>
      ) : null}
    </div>
  );
}
