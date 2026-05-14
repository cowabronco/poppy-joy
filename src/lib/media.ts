export type MediaAspectRatio = "1:1" | "3:2" | "4:5" | "16:9";

export type MediaAsset = {
  type: "image" | "video" | "placeholder";
  src?: string;
  poster?: string;
  alt: string;
  caption?: string;
  aspectRatio?: MediaAspectRatio;
};

export const aspectRatioClassName: Record<MediaAspectRatio, string> = {
  "1:1": "aspect-square",
  "3:2": "aspect-[3/2]",
  "4:5": "aspect-[4/5]",
  "16:9": "aspect-video",
};
