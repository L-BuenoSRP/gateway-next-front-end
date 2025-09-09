import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const apiKey = request.cookies.get("x-api-key")?.value;

  if (!apiKey) {
    // return apiKey

    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/MainOffice",
    "/MainOffice/:path*",
    "/Account",
    "/Account/:path*",
    "/Invoices",
    "/Invoices/:path*",
  ],
};
