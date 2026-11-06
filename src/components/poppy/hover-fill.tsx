/**
 * Adapted from https://github.com/magicuidesign/magicui/blob/85f97fd27b053339af74ba9dd4ca428ee25989fb/apps/www/registry/magicui/interactive-hover-button.tsx
 * via the Subframe Motion Library ("interactive-hover-button").
 * Retains the upstream expanding dot, translated/faded first label and overlaid arrow label.
 * Turned into a Next.js link, recoloured for Poppy Joy (purple pill flooding to green),
 * with CSS moved to a module and instant keyboard/reduced-motion feedback kept.
 *
 * MIT License
 *
 * Copyright (c) Magic UI
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

import styles from "./hover-fill.module.css";

function actionClassName(className?: string) {
  return className ? `${styles.action} ${className}` : styles.action;
}

function HoverFillContent({ children }: { children: ReactNode }) {
  return (
    <>
      <span className={styles.first}>
        <span className={styles.dot} aria-hidden="true" />
        <span className={styles.firstText}>{children}</span>
      </span>
      <span className={styles.second} aria-hidden="true">
        {children}
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
          <path
            d="M3 8h10m-4-4 4 4-4 4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </>
  );
}

type HoverFillLinkProps = Omit<ComponentProps<typeof Link>, "children"> & {
  children: ReactNode;
  /** Sizing, padding and typography; colours and motion come from the module. */
  className?: string;
};

/** Purple pill link whose dot floods it with green on hover. */
export function HoverFillLink({
  children,
  className,
  ...props
}: HoverFillLinkProps) {
  return (
    <Link {...props} className={actionClassName(className)}>
      <HoverFillContent>{children}</HoverFillContent>
    </Link>
  );
}

type HoverFillButtonProps = ComponentProps<"button">;

/** Button version of HoverFillLink, e.g. for add-to-cart submits. */
export function HoverFillButton({
  children,
  className,
  type = "button",
  ...props
}: HoverFillButtonProps) {
  return (
    <button {...props} type={type} className={actionClassName(className)}>
      <HoverFillContent>{children}</HoverFillContent>
    </button>
  );
}
