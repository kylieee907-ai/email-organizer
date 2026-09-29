import { NextResponse } from "next/server";

export function GET() {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const redirectUri = process.env.GOOGLE_REDIRECT_URI ?? "http://localhost:3000/api/auth/callback/google";

  if (!clientId) {
    return NextResponse.json({ error: "Missing GOOGLE_CLIENT_ID. Copy .env.example to .env.local." }, { status: 500 });
  }

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: "code",
    access_type: "offline",
    prompt: "consent",
    scope: "https://www.googleapis.com/auth/gmail.modify",
  });

  return NextResponse.redirect(`https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`);
}
