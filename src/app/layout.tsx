import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mailroom | A calmer inbox",
  description: "Organize Gmail with thoughtful, reviewable rules.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
