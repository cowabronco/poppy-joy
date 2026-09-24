"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

import type { MediaAsset } from "@/lib/media";
import { cn } from "@/lib/utils";

type ProductGalleryProps = {
  media: MediaAsset[];
  productName: string;
  className?: string;
  topLeftSlot?: ReactNode;
  topRightSlot?: ReactNode;
};

export function ProductGallery({
  media,
  productName,
  className,
  topLeftSlot,
  topRightSlot,
}: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const thumbnailStripRef = useRef<HTMLDivElement>(null);
  const thumbnailButtonRefs = useRef<Array<HTMLButtonElement | null>>([]);
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

  useEffect(() => {
    const strip = thumbnailStripRef.current;
    const activeButton = thumbnailButtonRefs.current[activeIndex];

    if (!strip || !activeButton) {
      return;
    }

    const buttonLeft = activeButton.offsetLeft;
    const buttonRight = buttonLeft + activeButton.offsetWidth;
    const visibleLeft = strip.scrollLeft;
    const visibleRight = visibleLeft + strip.clientWidth;
    const isFullyVisible =
      buttonLeft >= visibleLeft - 1 && buttonRight <= visibleRight + 1;

    if (isFullyVisible) {
      return;
    }

    const nextScrollLeft =
      buttonLeft - (strip.clientWidth - activeButton.offsetWidth) / 2;

    strip.scrollTo({
      left: nextScrollLeft,
      behavior: "smooth",
    });
  }, [activeIndex]);

  return (
    <div
      className={cn(
        "group relative mx-auto aspect-square h-full min-h-0 w-full max-w-[min(100%,calc(100svh-12.5rem))] overflow-hidden rounded-[2rem] border border-border bg-brand-beige lg:mx-0 lg:aspect-auto lg:max-w-none",
        className
      )}
    >
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
            sizes="(min-width: 1280px) 58vw, (min-width: 1024px) 52vw, 100vw"
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

      {topLeftSlot ? (
        <div className="absolute left-3 top-3 z-20 hidden lg:block lg:left-4 lg:top-4">
          <div className="rounded-full border border-border bg-brand-off-white/90 px-3 py-1.5 shadow-sm backdrop-blur-sm">
            {topLeftSlot}
          </div>
        </div>
      ) : null}

      {topRightSlot ? (
        <div className="absolute right-3 top-3 z-20 lg:right-4 lg:top-4">
          <div className="rounded-full bg-brand-green px-3 py-1.5 text-brand-off-white">
            {topRightSlot}
          </div>
        </div>
      ) : null}

      {hasMultipleImages ? (
        <>
          <button
            type="button"
            aria-label="Vorige afbeelding"
            onClick={goToPrevious}
            className="absolute left-3 top-1/2 z-20 flex size-8 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-brand-off-white/90 text-brand-black shadow-sm backdrop-blur-sm transition duration-300 hover:border-brand-purple hover:text-brand-purple focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple/30 lg:left-4 lg:size-11 lg:opacity-0 lg:group-hover:opacity-100 lg:group-focus-within:opacity-100 lg:focus-visible:opacity-100"
          >
            <ChevronLeft className="h-4 w-4 lg:h-5 lg:w-5" aria-hidden />
          </button>
          <button
            type="button"
            aria-label="Volgende afbeelding"
            onClick={goToNext}
            className="absolute right-3 top-1/2 z-20 flex size-8 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-brand-off-white/90 text-brand-black shadow-sm backdrop-blur-sm transition duration-300 hover:border-brand-purple hover:text-brand-purple focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple/30 lg:right-4 lg:size-11 lg:opacity-0 lg:group-hover:opacity-100 lg:group-focus-within:opacity-100 lg:focus-visible:opacity-100"
          >
            <ChevronRight className="h-4 w-4 lg:h-5 lg:w-5" aria-hidden />
          </button>
          <div
            ref={thumbnailStripRef}
            className="absolute inset-x-3 bottom-3 z-20 flex gap-2 overflow-x-auto scroll-smooth rounded-2xl bg-brand-off-white/80 p-2 shadow-sm backdrop-blur-md sm:gap-2.5"
            aria-label={`${productName} afbeeldingen`}
          >
            {media.map((item, index) => {
              const isActive = activeIndex === index;

              return (
                <button
                  key={`${item.alt}-${index}`}
                  ref={(node) => {
                    thumbnailButtonRefs.current[index] = node;
                  }}
                  type="button"
                  aria-label={`Toon afbeelding ${index + 1} van ${productName}`}
                  aria-current={isActive ? "true" : undefined}
                  onClick={() => setActiveIndex(index)}
                  className={cn(
                    "relative size-14 shrink-0 overflow-hidden rounded-xl border-2 bg-brand-beige transition duration-300 sm:size-16",
                    isActive
                      ? "border-brand-purple opacity-100"
                      : "border-transparent opacity-70 hover:border-brand-purple/40 hover:opacity-95"
                  )}
                >
                  {item.src ? (
                    <Image
                      src={item.src}
                      alt=""
                      fill
                      sizes="64px"
                      className={cn(
                        "object-cover transition duration-300",
                        isActive ? "scale-100" : "scale-105"
                      )}
                    />
                  ) : (
                    <span className="absolute inset-0 bg-[linear-gradient(135deg,var(--brand-beige),var(--brand-off-white))]" />
                  )}
                </button>
              );
            })}
          </div>
        </>
      ) : null}
    </div>
  );
}
