"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag } from "lucide-react";

import { Container } from "./container";

export function SiteHeader() {
  const pathname = usePathname();
  const [isFloating, setIsFloating] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsFloating(window.scrollY > 100);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const isHome = pathname === "/";
  const useSolidHeader = !isHome || isFloating;

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ease-out ${
        useSolidHeader
          ? "bg-brand-off-white/95 shadow-lg backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <Container
        className={`flex items-center justify-center transition-all duration-500 ease-out ${
          useSolidHeader ? "py-2" : "py-5"
        }`}
      >
        <nav className="flex items-center justify-center gap-6 text-xs uppercase tracking-[0.28em]">
          <Link
            className={`relative font-medium transition-colors duration-300 after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-full after:origin-left after:scale-x-0 after:transition-transform after:duration-300 after:ease-out hover:after:scale-x-100 ${
              useSolidHeader
                ? "text-brand-black/70 hover:text-brand-black after:bg-brand-black"
                : "text-brand-off-white/80 hover:text-brand-off-white after:bg-brand-off-white"
            }`}
            href="/story"
          >
            Story
          </Link>
          <Link href="/" className="mx-3">
            <Image
              src="/brand/logo.png"
              alt="Poppy Joy"
              width={140}
              height={140}
              className={`h-auto object-contain transition-all duration-500 ease-out ${
                useSolidHeader ? "max-h-14" : "max-h-[4.5rem]"
              }`}
              style={{ width: "auto" }}
              priority
            />
          </Link>
          <Link
            className={`relative font-medium transition-colors duration-300 after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-full after:origin-left after:scale-x-0 after:transition-transform after:duration-300 after:ease-out hover:after:scale-x-100 ${
              useSolidHeader
                ? "text-brand-black/70 hover:text-brand-black after:bg-brand-black"
                : "text-brand-off-white/80 hover:text-brand-off-white after:bg-brand-off-white"
            }`}
            href="/shop"
          >
            Shop
          </Link>
        </nav>
        <Link
          href="#"
          className={`absolute right-12 transition-colors duration-300 ${
            useSolidHeader
              ? "text-brand-black/70 hover:text-brand-black"
              : "text-brand-off-white/80 hover:text-brand-off-white"
          }`}
          aria-label="Winkelwagen"
        >
          <ShoppingBag size={22} />
        </Link>
      </Container>
    </header>
  );
}
