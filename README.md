# Mailroom

A review-first Gmail organizer built with Next.js.

## Run locally

1. Install Node.js 20 or newer.
2. Run `npm install`.
3. Copy `.env.example` to `.env.local` and add Google OAuth credentials.
4. Run `npm run dev`.

A Gmail API key alone cannot read a private inbox. The production connection flow should use Google OAuth with the Gmail read/modify scopes, then apply labels only after the user reviews suggested actions.
