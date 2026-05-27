"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, ShoppingBag } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Container } from "./container";

const primaryNavLinks = [
  { label: "Home", href: "/" },
  { label: "Story", href: "/story" },
  { label: "Shop", href: "/shop" },
] as const;

export function SiteHeader() {
  const pathname = usePathname();
  const [isFloating, setIsFloating] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsFloating(window.scrollY > 100);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const isHome = pathname === "/";
  const useSolidHeader = !isHome || isFloating;

  const navLinkClassName = (href: string) => {
    const isActive =
      href === "/" ? pathname === "/" : pathname.startsWith(href);

    return `relative font-medium transition-colors duration-300 after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-full after:origin-left after:transition-transform after:duration-300 after:ease-out hover:after:scale-x-100 ${
      isActive ? "after:scale-x-100" : "after:scale-x-0"
    } ${
      useSolidHeader
        ? "text-brand-black/70 hover:text-brand-black after:bg-brand-black"
        : "text-brand-off-white/80 hover:text-brand-off-white after:bg-brand-off-white"
    }`;
  };

  const iconButtonClassName = useSolidHeader
    ? "text-brand-black/70 hover:text-brand-black"
    : "text-brand-off-white/80 hover:text-brand-off-white";

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ease-out ${
        useSolidHeader
          ? "bg-brand-off-white/95 shadow-lg backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <Container
        className={`relative flex items-center justify-between transition-all duration-500 ease-out lg:justify-center ${
          useSolidHeader ? "py-2" : "py-4"
        }`}
      >
        <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
          <SheetTrigger asChild>
            <button
              type="button"
              className={`inline-flex h-11 w-11 items-center justify-center rounded-full transition-colors duration-300 lg:hidden ${iconButtonClassName}`}
              aria-label="Menu openen"
            >
              <Menu size={22} />
            </button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="w-[min(100%,20rem)] border-border bg-brand-off-white p-0"
          >
            <SheetHeader className="border-b border-border px-6 py-8">
              <SheetTitle className="sr-only">Navigatie</SheetTitle>
              <Link href="/" onClick={() => setMenuOpen(false)}>
                <Image
                  src="/brand/logo.png"
                  alt="Poppy Joy"
                  width={180}
                  height={180}
                  className="h-auto max-h-24 w-auto object-contain"
                />
              </Link>
            </SheetHeader>
            <nav className="flex flex-col gap-1 px-4 py-6">
              {primaryNavLinks.map((link) => {
                const isActive =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.href);

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={`rounded-2xl px-4 py-4 text-sm uppercase tracking-[0.28em] transition-colors ${
                      isActive
                        ? "bg-brand-purple/10 text-brand-purple"
                        : "text-brand-black/70 hover:bg-brand-beige hover:text-brand-black"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          </SheetContent>
        </Sheet>

        <nav className="hidden items-center justify-center gap-6 text-xs uppercase tracking-[0.28em] lg:flex">
          <Link className={navLinkClassName("/story")} href="/story">
            Story
          </Link>
          <Link href="/" className="mx-3">
            <Image
              src="/brand/logo.png"
              alt="Poppy Joy"
              width={210}
              height={210}
              className={`h-auto object-contain transition-all duration-500 ease-out ${
                useSolidHeader ? "max-h-[5.25rem]" : "max-h-[6.75rem]"
              }`}
              style={{ width: "auto" }}
              priority
            />
          </Link>
          <Link className={navLinkClassName("/shop")} href="/shop">
            Shop
          </Link>
        </nav>

        <Link
          href="/"
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 lg:hidden"
          aria-label="Poppy Joy home"
        >
          <Image
            src="/brand/logo.png"
            alt="Poppy Joy"
            width={160}
            height={160}
            className={`h-auto object-contain transition-all duration-500 ease-out ${
              useSolidHeader ? "max-h-[4.5rem]" : "max-h-[5.25rem]"
            }`}
            style={{ width: "auto" }}
            priority
          />
        </Link>

        <Link
          href="#"
          className={`inline-flex h-11 w-11 items-center justify-center rounded-full transition-colors duration-300 lg:absolute lg:right-12 ${iconButtonClassName}`}
          aria-label="Winkelwagen"
        >
          <ShoppingBag size={22} />
        </Link>
      </Container>
    </header>
  );
}
