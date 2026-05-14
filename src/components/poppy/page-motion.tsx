"use client";

import { type ReactNode, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

type PageMotionProps = {
  children: ReactNode;
};

const AUTO_REVEAL_SELECTOR = "main section, main article, main [data-auto-animate]";

export function PageMotion({ children }: PageMotionProps) {
  const pathname = usePathname();
  const rootRef = useRef<HTMLDivElement>(null);
  const isFirstRunRef = useRef(true);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    root.classList.remove("page-enter-active");
    root.classList.add("page-enter");

    const rafId = requestAnimationFrame(() => {
      root.classList.add("page-enter-active");
    });

    let revealTargets: HTMLElement[] = [];
    let observer: IntersectionObserver | null = null;
    const revealTimeouts: number[] = [];

    const setupAutoReveal = () => {
      const allCandidates = Array.from(
        root.querySelectorAll<HTMLElement>(AUTO_REVEAL_SELECTOR)
      );

      revealTargets = allCandidates.filter((candidate) => {
        if (candidate.classList.contains("reveal")) return false;
        if (candidate.closest("[data-no-auto-animate]")) return false;
        if (candidate.querySelector(".reveal")) return false;

        return !allCandidates.some(
          (other) =>
            other !== candidate &&
            !other.classList.contains("reveal") &&
            other.contains(candidate)
        );
      });

      revealTargets.forEach((element, index) => {
        const stagger = Math.min(index * 40, 240);
        element.classList.add("auto-reveal");
        element.style.setProperty("--auto-reveal-delay", `${stagger}ms`);
      });

      const viewportHeight = window.innerHeight;
      const inViewTargets = revealTargets.filter((element) => {
        const rect = element.getBoundingClientRect();
        return rect.top < viewportHeight * 0.9;
      });

      inViewTargets.forEach((element, index) => {
        const timeoutId = window.setTimeout(() => {
          element.classList.add("auto-reveal-visible");
        }, 120 + index * 70);

        revealTimeouts.push(timeoutId);
      });

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            if (entry.target.classList.contains("auto-reveal-visible")) {
              observer?.unobserve(entry.target);
              return;
            }
            entry.target.classList.add("auto-reveal-visible");
            observer?.unobserve(entry.target);
          });
        },
        { threshold: 0.15 }
      );

      revealTargets.forEach((element) => {
        if (element.classList.contains("auto-reveal-visible")) return;
        observer?.observe(element);
      });
    };

    // Delay first run slightly so hydration can finish before class mutations.
    const setupDelay = isFirstRunRef.current ? 140 : 0;
    const setupTimeoutId = window.setTimeout(() => {
      setupAutoReveal();
      isFirstRunRef.current = false;
    }, setupDelay);

    return () => {
      cancelAnimationFrame(rafId);
      window.clearTimeout(setupTimeoutId);
      revealTimeouts.forEach((timeoutId) => window.clearTimeout(timeoutId));
      observer?.disconnect();
      revealTargets.forEach((element) => {
        element.classList.remove("auto-reveal", "auto-reveal-visible");
        element.style.removeProperty("--auto-reveal-delay");
      });
    };
  }, [pathname]);

  return <div ref={rootRef}>{children}</div>;
}
