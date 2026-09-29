import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  if (!code) {
    return NextResponse.redirect(new URL("/?error=google_auth_cancelled", request.url));
  }

  // Exchange `code` for tokens here, then store the refresh token server-side.
  // The UI intentionally stays review-first until Gmail labels are fetched.
  return NextResponse.redirect(new URL("/?connected=true", request.url));
}
