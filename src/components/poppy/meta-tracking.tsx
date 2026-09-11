import { hasMetaPixelId } from "@/lib/meta/consent";
import { getCookieConsent } from "@/lib/meta/cookies";

import { CookieConsent } from "./cookie-consent";
import { MetaClickIdCapture } from "./meta-click-id-capture";
import { MetaPixel } from "./meta-pixel";

export async function MetaTracking() {
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID?.trim();
  const initialConsent = hasMetaPixelId(pixelId)
    ? await getCookieConsent()
    : "unset";

  return (
    <>
      <MetaClickIdCapture />
      {hasMetaPixelId(pixelId) ? (
        <>
          <CookieConsent initialConsent={initialConsent} />
          <MetaPixel pixelId={pixelId} initialConsent={initialConsent} />
        </>
      ) : null}
    </>
  );
}
