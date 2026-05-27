import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";

type EditorialHeadingProps = ComponentPropsWithoutRef<"div"> & {
  eyebrow?: string;
  eyebrowTone?: "purple" | "butter";
  title: string;
  description?: string;
};

const eyebrowToneClasses = {
  purple: "text-brand-purple",
  butter:
    "inline-block w-fit rounded-full bg-brand-butter px-3 py-1.5 text-brand-black/65",
};

export function EditorialHeading({
  eyebrow,
  eyebrowTone = "purple",
  title,
  description,
  className,
  ...props
}: EditorialHeadingProps) {
  return (
    <div className={cn("max-w-3xl", className)} {...props}>
      {eyebrow ? (
        <p
          className={cn(
            "mb-5 text-xs uppercase tracking-[0.34em]",
            eyebrowToneClasses[eyebrowTone]
          )}
        >
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
