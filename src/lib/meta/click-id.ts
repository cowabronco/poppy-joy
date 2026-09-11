import { isValidFbclid } from "./attribution";
import { FBCLID_STORAGE_KEY } from "./constants";

export function persistClientFbclid(fbclid: string | null | undefined) {
  if (typeof window === "undefined" || !isValidFbclid(fbclid)) {
    return;
  }

  try {
    sessionStorage.setItem(FBCLID_STORAGE_KEY, fbclid);
  } catch {
    // Ignore private-mode or disabled storage.
  }
}

export function captureFbclidFromLocation() {
  if (typeof window === "undefined") {
    return null;
  }

  const fbclid = new URLSearchParams(window.location.search).get("fbclid");
  persistClientFbclid(fbclid);
  return isValidFbclid(fbclid) ? fbclid : readStoredFbclid();
}

export function readStoredFbclid() {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const stored = sessionStorage.getItem(FBCLID_STORAGE_KEY);
    return isValidFbclid(stored) ? stored : null;
  } catch {
    return null;
  }
}
