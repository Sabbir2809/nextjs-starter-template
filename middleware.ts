import { NextResponse, type NextRequest } from "next/server";
import { AUTH_USER_KEY } from "./constants";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const authCookie = request.cookies.get(AUTH_USER_KEY)?.value;

  let isAuthenticated = false;
  try {
    isAuthenticated = Boolean(authCookie && JSON.parse(authCookie));
  } catch {
    isAuthenticated = false;
  }

  // Define route types
  const isPrivateRoute = pathname.startsWith("/private");
  const isAuthPage = pathname === "/login" || pathname === "/registration";

  // Unauthenticated user trying to access a private page
  if (isPrivateRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Authenticated user trying to access login/registration
  if (isAuthenticated && isAuthPage) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

// Apply middleware only to matching routes
export const config = {
  matcher: ["/private/:path*", "/login", "/registration"],
};
