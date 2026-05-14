"use client";

import { useState } from "react";
import Image from "next/image";

import type { MediaAsset } from "@/lib/media";
import { cn } from "@/lib/utils";

type ProductGalleryProps = {
  media: MediaAsset[];
  productName: string;
};

export function ProductGallery({ media, productName }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeMedia = media[activeIndex] ?? media[0];

  return (
    <div className="space-y-4">
      <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-border bg-brand-beige">
        {activeMedia?.src ? (
          <Image
            src={activeMedia.src}
            alt={activeMedia.alt}
            fill
            priority
            sizes="(min-width: 1024px) 48vw, 100vw"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-[linear-gradient(135deg,var(--brand-beige),var(--brand-off-white))] px-8 text-center text-xs uppercase tracking-[0.28em] text-brand-black/45">
            Productbeeld binnenkort beschikbaar
          </div>
        )}
      </div>

      <div
        className="grid grid-cols-4 gap-3"
        aria-label={`${productName} afbeeldingen`}
      >
        {media.slice(0, 4).map((item, index) => (
          <button
            key={`${item.alt}-${index}`}
            type="button"
            aria-label={`Toon afbeelding ${index + 1} van ${productName}`}
            aria-pressed={activeIndex === index}
            onClick={() => setActiveIndex(index)}
            className={cn(
              "relative aspect-square overflow-hidden rounded-2xl border bg-brand-beige transition",
              activeIndex === index
                ? "border-brand-purple ring-2 ring-brand-purple/20"
                : "border-border hover:border-brand-purple/50"
            )}
          >
            {item.src ? (
              <Image
                src={item.src}
                alt=""
                fill
                sizes="96px"
                className="object-cover"
              />
            ) : (
              <span className="absolute inset-0 bg-[linear-gradient(135deg,var(--brand-beige),var(--brand-off-white))]" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
