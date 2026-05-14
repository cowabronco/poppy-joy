import type { MediaAsset } from "@/lib/media";

import { ResponsiveImage } from "./responsive-image";
import { VideoBlock } from "./video-block";

type MediaGalleryProps = {
  items: MediaAsset[];
};

export function MediaGallery({ items }: MediaGalleryProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {items.map((item, index) => (
        <figure key={`${item.alt}-${index}`} className="space-y-3">
          {item.type === "video" ? (
            <VideoBlock media={item} />
          ) : (
            <ResponsiveImage media={item} />
          )}
          {item.caption ? (
            <figcaption className="text-xs leading-5 text-brand-black/55">
              {item.caption}
            </figcaption>
          ) : null}
        </figure>
      ))}
    </div>
  );
}
