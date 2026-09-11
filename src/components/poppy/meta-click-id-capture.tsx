"use client";

import { useEffect } from "react";

import { captureFbclidFromLocation } from "@/lib/meta/click-id";

export function MetaClickIdCapture() {
  useEffect(() => {
    captureFbclidFromLocation();
  }, []);

  return null;
}
