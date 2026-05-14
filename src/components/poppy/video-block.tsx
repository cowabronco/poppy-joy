"use client";

import { useState } from "react";

import { MediaFrame } from "@/components/poppy/media-frame";
import type { MediaAsset } from "@/lib/media";
import { cn } from "@/lib/utils";

type VideoBlockProps = {
  media: MediaAsset;
  autoPlay?: boolean;
};

export function VideoBlock({ media, autoPlay = true }: VideoBlockProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  if (!media.src) {
    return (
      <MediaFrame
        aspectRatio={media.aspectRatio ?? "16:9"}
        label={media.alt || "Video coming soon"}
      />
    );
  }

  return (
    <MediaFrame aspectRatio={media.aspectRatio ?? "16:9"}>
      {!isLoaded ? <div aria-hidden className="loading-sheen absolute inset-0" /> : null}
      <video
        className={cn(
          "h-full w-full object-cover transition duration-700",
          isLoaded ? "scale-100 opacity-100" : "scale-[1.02] opacity-0"
        )}
        poster={media.poster}
        aria-label={media.alt}
        autoPlay={autoPlay}
        muted={autoPlay}
        loop={autoPlay}
        playsInline
        controls={!autoPlay}
        onLoadedData={() => setIsLoaded(true)}
      >
        <source src={media.src} />
      </video>
    </MediaFrame>
  );
}
