"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

import type { MediaAsset } from "@/lib/media";
import { cn } from "@/lib/utils";

type ProductGalleryProps = {
  media: MediaAsset[];
  productName: string;
};

export function ProductGallery({ media, productName }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const activeMedia = media[activeIndex] ?? media[0];
  const hasMultipleImages = media.length > 1;

  useEffect(() => {
    setIsImageLoaded(false);

    if (!activeMedia?.src) {
      return;
    }

    const preload = new window.Image();
    preload.src = activeMedia.src;

    if (preload.complete) {
      requestAnimationFrame(() => {
        setIsImageLoaded(true);
      });
    }
  }, [activeMedia?.src]);

  const goToPrevious = useCallback(() => {
    setActiveIndex((current) =>
      current === 0 ? media.length - 1 : current - 1
    );
  }, [media.length]);

  const goToNext = useCallback(() => {
    setActiveIndex((current) =>
      current === media.length - 1 ? 0 : current + 1
    );
  }, [media.length]);

  useEffect(() => {
    if (!hasMultipleImages) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        goToPrevious();
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        goToNext();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToNext, goToPrevious, hasMultipleImages]);

  return (
    <div className="space-y-4">
      <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-border bg-brand-beige">
        {activeMedia?.src ? (
          <>
            {!isImageLoaded ? (
              <div aria-hidden className="loading-sheen absolute inset-0 z-10" />
            ) : null}
            <Image
              src={activeMedia.src}
              alt={activeMedia.alt}
              fill
              priority={activeIndex === 0}
              sizes="(min-width: 1024px) 48vw, 100vw"
              onLoad={() => setIsImageLoaded(true)}
              className={cn(
                "object-cover transition duration-700 ease-out",
                isImageLoaded
                  ? "scale-100 opacity-100 blur-0"
                  : "scale-[1.03] opacity-0 blur-sm"
              )}
            />
          </>
        ) : (
          <div className="flex h-full items-center justify-center bg-[linear-gradient(135deg,var(--brand-beige),var(--brand-off-white))] px-8 text-center text-xs uppercase tracking-[0.28em] text-brand-black/45">
            Productbeeld binnenkort beschikbaar
          </div>
        )}

        {hasMultipleImages ? (
          <>
            <button
              type="button"
              aria-label="Vorige afbeelding"
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-brand-off-white/90 text-brand-black shadow-sm backdrop-blur-sm transition hover:border-brand-purple hover:text-brand-purple focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple/30"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden />
            </button>
            <button
              type="button"
              aria-label="Volgende afbeelding"
              onClick={goToNext}
              className="absolute right-4 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-brand-off-white/90 text-brand-black shadow-sm backdrop-blur-sm transition hover:border-brand-purple hover:text-brand-purple focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple/30"
            >
              <ChevronRight className="h-5 w-5" aria-hidden />
            </button>
            <p
              aria-live="polite"
              className="absolute bottom-4 left-1/2 z-20 -translate-x-1/2 rounded-full border border-border bg-brand-off-white/90 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-brand-black/65 backdrop-blur-sm transition duration-500"
            >
              {activeIndex + 1} / {media.length}
            </p>
          </>
        ) : null}
      </div>

      {hasMultipleImages ? (
        <div
          className="flex gap-3 overflow-x-auto pb-1"
          aria-label={`${productName} afbeeldingen`}
        >
          {media.map((item, index) => {
            const isActive = activeIndex === index;

            return (
              <button
                key={`${item.alt}-${index}`}
                type="button"
                aria-label={`Toon afbeelding ${index + 1} van ${productName}`}
                aria-current={isActive ? "true" : undefined}
                onClick={() => setActiveIndex(index)}
                className={cn(
                  "relative aspect-square w-[calc(25%-0.5625rem)] min-w-[4.5rem] shrink-0 overflow-hidden rounded-2xl border-2 bg-brand-beige transition duration-300",
                  isActive
                    ? "border-brand-purple opacity-100 ring-2 ring-brand-purple/25 ring-offset-2 ring-offset-brand-off-white"
                    : "border-transparent opacity-55 hover:border-brand-purple/40 hover:opacity-85"
                )}
              >
                {item.src ? (
                  <Image
                    src={item.src}
                    alt=""
                    fill
                    sizes="96px"
                    className={cn(
                      "object-cover transition duration-300",
                      isActive ? "scale-100" : "scale-105"
                    )}
                  />
                ) : (
                  <span className="absolute inset-0 bg-[linear-gradient(135deg,var(--brand-beige),var(--brand-off-white))]" />
                )}
                {isActive ? (
                  <span
                    aria-hidden
                    className="absolute inset-x-2 bottom-2 h-1 rounded-full bg-brand-purple transition duration-300"
                  />
                ) : null}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
