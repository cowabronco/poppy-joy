import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { buildFbc, isValidFbclid } from "@/lib/meta/attribution";
import {
  ATTRIBUTION_COOKIE_MAX_AGE,
  FBC_COOKIE_NAME,
  FBCLID_COOKIE_NAME,
} from "@/lib/meta/constants";

function attributionCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    maxAge: ATTRIBUTION_COOKIE_MAX_AGE,
    path: "/",
  };
}

export function proxy(request: NextRequest) {
  const response = NextResponse.next();
  const fbclid = request.nextUrl.searchParams.get("fbclid");

  if (!isValidFbclid(fbclid)) {
    return response;
  }

  const options = attributionCookieOptions();
  response.cookies.set(FBCLID_COOKIE_NAME, fbclid, options);

  if (!request.cookies.get(FBC_COOKIE_NAME)?.value) {
    response.cookies.set(FBC_COOKIE_NAME, buildFbc(fbclid), options);
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|txt|xml)$).*)",
  ],
};
