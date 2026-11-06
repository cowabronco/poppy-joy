"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Container } from "./container";
import { CartNavLink } from "./cart-nav-link";
import { HoverFillLink } from "./hover-fill";

const primaryNavLinks = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Story", href: "/story" },
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

  const iconButtonClassName = useSolidHeader
    ? "text-brand-black/70 hover:text-brand-black"
    : "text-brand-off-white/80 hover:text-brand-off-white";

  const mobileLogoHeight = useSolidHeader ? "max-h-14" : "max-h-16";
  const desktopLogoHeight = useSolidHeader
    ? "max-h-[5.25rem]"
    : "max-h-[6.75rem]";

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ease-out ${
        useSolidHeader
          ? "bg-brand-off-white/95 shadow-lg backdrop-blur-md"
          : "bg-gradient-to-b from-black/60 via-black/25 to-transparent"
      }`}
    >
      <Container
        className={`transition-all duration-500 ease-out ${
          useSolidHeader ? "py-2" : "py-4"
        }`}
      >
        <div className="grid grid-cols-[2.75rem_1fr_2.75rem] items-center lg:hidden">
          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger asChild>
              <button
                type="button"
                className={`inline-flex h-11 w-11 items-center justify-center rounded-full transition-colors duration-300 ${iconButtonClassName}`}
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

          <Link
            href="/"
            className="flex min-w-0 items-center justify-center px-2"
            aria-label="Poppy Joy home"
          >
            <Image
              src="/brand/logo.png"
              alt="Poppy Joy"
              width={120}
              height={120}
              className={`h-auto w-auto shrink-0 object-contain transition-all duration-500 ease-out ${mobileLogoHeight}`}
              priority
            />
          </Link>

          <CartNavLink className={`justify-self-end ${iconButtonClassName}`} />
        </div>

        <div className="relative hidden items-center justify-center lg:flex">
          <nav className="flex items-center justify-center gap-6 text-[0.975rem] uppercase tracking-[0.28em]">
            <HoverFillLink
              className="py-1.5 pl-5 pr-[calc(1.25rem-0.28em)] font-semibold shadow-md shadow-black/20"
              href="/shop"
            >
              Shop
            </HoverFillLink>
            <Link href="/" className="mx-3">
              <Image
                src="/brand/logo.png"
                alt="Poppy Joy"
                width={210}
                height={210}
                className={`h-auto w-auto object-contain transition-all duration-500 ease-out ${desktopLogoHeight}`}
                priority
              />
            </Link>
            <Link
              className={`rounded-full border bg-transparent py-[calc(0.375rem-1px)] pl-[calc(1.25rem-1px)] pr-[calc(1.25rem-0.28em-1px)] font-semibold transition-colors duration-300 ${
                useSolidHeader
                  ? "border-brand-black/30 text-brand-black/70 hover:border-brand-black/60 hover:text-brand-black"
                  : "border-white text-brand-off-white hover:bg-white/10"
              }`}
              href="/story"
            >
              Story
            </Link>
          </nav>

          <CartNavLink className={`absolute right-0 ${iconButtonClassName}`} />
        </div>
      </Container>
    </header>
  );
}
