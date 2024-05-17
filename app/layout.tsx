import type { Metadata } from "next";

import SessionProvider from "@/components/SessionProvider";

import "./globals.css";

export const metadata: Metadata = {
  title: "NextJs Auth Prisma Boilerplate",
  description:
    "A boilerplate for Next.js with authentication, Prisma, and a PostgreSQL database.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <nav>
          <a href="/">Home</a>
          <a href="/dashboard">Dashboard</a>
        </nav>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
