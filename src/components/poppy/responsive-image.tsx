import Image from "next/image";

import { MediaFrame } from "@/components/poppy/media-frame";
import type { MediaAsset } from "@/lib/media";

type ResponsiveImageProps = {
  media: MediaAsset;
  sizes?: string;
  priority?: boolean;
  quality?: number;
  frameClassName?: string;
};

/**
 * The loading sheen sits *behind* the image, and the image is never hidden by
 * JS-controlled state. It paints over the sheen as soon as the browser has it,
 * even before (or without) hydration. Gating visibility on onLoad left photos
 * invisible whenever the load event was missed (cached / pre-hydration loads).
 */
export function ResponsiveImage({
  media,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  priority = false,
  quality,
  frameClassName,
}: ResponsiveImageProps) {
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
      <div aria-hidden className="loading-sheen absolute inset-0" />
      <Image
        src={media.src}
        alt={media.alt}
        fill
        priority={priority}
        quality={quality}
        sizes={sizes}
        className="object-cover"
      />
    </MediaFrame>
  );
}
