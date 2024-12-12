import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const isAuthenticated = !!token;
  const isAuthPage =
    req.nextUrl.pathname.startsWith("/login") ||
    req.nextUrl.pathname.startsWith("/register");

  // Protect all routes except public routes
  const publicRoutes = ["/", "/login", "/register"];
  const isPublicRoute = publicRoutes.some(
    (route) =>
      req.nextUrl.pathname === route ||
      req.nextUrl.pathname.startsWith(`${route}/`),
  );

  if (isAuthPage) {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
    return NextResponse.next();
  }

  if (!isAuthenticated && !isPublicRoute) {
    const redirectUrl = new URL("/login", req.url);

    redirectUrl.searchParams.set(
      "from",
      encodeURIComponent(req.nextUrl.pathname + req.nextUrl.search),
    );

    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|images|favicon.ico).*)"],
};
