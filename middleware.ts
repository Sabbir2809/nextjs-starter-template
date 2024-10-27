import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const authKey = process.env.NEXT_PUBLIC_AUTH_USER_KEY || "_auth";
  const authData = request.cookies.get(authKey)?.value;
  const isAuthenticated = Boolean(
    authData && JSON.parse(authData)?.state?.auth
  );

  // Define conditions for route types
  const isPrivateRoute = pathname.startsWith("/private");
  const isAuthPage = pathname === "/login" || pathname === "/registration";

  // Redirects based on authentication state
  if (isPrivateRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isAuthenticated && isAuthPage) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

// Apply middleware to specific paths
export const config = {
  matcher: ["/private/:path*", "/login", "/registration"],
};
