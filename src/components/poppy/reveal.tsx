"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delayMs?: number;
};

/**
 * Server-renders its children visible. After mount, only elements that start
 * below the fold are hidden and then faded in on scroll, so content never
 * depends on JS (slow hydration, missed observer callbacks) to appear.
 */
export function Reveal({ children, className, delayMs = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") return;

    // Already on screen: leave it visible, no animation.
    if (node.getBoundingClientRect().top < window.innerHeight) return;

    setIsPending(true);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setIsPending(false);
        observer.disconnect();
      },
      { threshold: 0.15 }
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      setIsPending(false);
    };
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delayMs}ms` }}
      className={cn("reveal", isPending && "reveal-pending", className)}
    >
      {children}
    </div>
  );
}
