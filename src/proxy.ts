import { NextResponse, type NextRequest } from "next/server";
import { getLocaleFromPathname, LOCALE_HEADER } from "@/lib/seo";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/zh" || pathname.startsWith("/zh/")) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.replace(/^\/zh(?=\/|$)/, "/zh-Hans");
    return NextResponse.redirect(url, 301);
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set(LOCALE_HEADER, getLocaleFromPathname(pathname));

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
