"use client";

type HeroVideoProps = {
  src: string;
  poster?: string;
};

export function HeroVideo({ src, poster }: HeroVideoProps) {
  return (
    <video
      className="hero-video-rotated"
      autoPlay
      muted
      loop
      playsInline
      poster={poster}
      aria-label="Poppy Joy hero video"
      onLoadedMetadata={(event) => {
        event.currentTarget.playbackRate = 0.75;
      }}
      style={{ filter: "url(#hero-red-to-purple) brightness(0.74) contrast(1.08)" }}
    >
      <source src={src} />
    </video>
  );
}
