"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import { MediaFrame } from "@/components/poppy/media-frame";
import type { MediaAsset } from "@/lib/media";
import { cn } from "@/lib/utils";

type ResponsiveImageProps = {
  media: MediaAsset;
  sizes?: string;
  priority?: boolean;
  frameClassName?: string;
};

export function ResponsiveImage({
  media,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  priority = false,
  frameClassName,
}: ResponsiveImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(false);
  }, [media.src]);

  if (!media.src) {
    return (
      <MediaFrame
        aspectRatio={media.aspectRatio}
        label={media.alt || "Image coming soon"}
        className={frameClassName}
      />
    );
  }

  return (
    <MediaFrame aspectRatio={media.aspectRatio} className={frameClassName}>
      {!isLoaded ? <div aria-hidden className="loading-sheen absolute inset-0" /> : null}
      <Image
        src={media.src}
        alt={media.alt}
        fill
        priority={priority}
        sizes={sizes}
        onLoad={(event) => {
          if (event.currentTarget.complete) {
            setIsLoaded(true);
          }
        }}
        className={cn(
          "object-cover transition duration-700",
          isLoaded ? "scale-100 opacity-100 blur-0" : "scale-[1.03] opacity-0 blur-sm"
        )}
      />
    </MediaFrame>
  );
}
