import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "NestQuest | Find your next rental",
  description:
    "Browse rental listings with live search, filters, and map views. A full-stack Next.js portfolio project.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="flex min-h-full flex-col bg-slate-50 text-slate-900 antialiased">
        <header className="border-b border-slate-200 bg-white">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
            <Link href="/" className="text-xl font-bold text-blue-700">
              NestQuest
            </Link>
            <nav className="flex gap-6 text-sm font-medium">
              <Link href="/" className="text-slate-600 hover:text-blue-700">
                Browse
              </Link>
              <Link
                href="/listings/new"
                className="text-slate-600 hover:text-blue-700"
              >
                Add Listing
              </Link>
            </nav>
          </div>
        </header>
        <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8">
          {children}
        </main>
        <footer className="border-t border-slate-200 bg-white">
          <div className="mx-auto max-w-6xl px-4 py-6 text-sm text-slate-500">
            NestQuest is a portfolio project built with Next.js, TypeScript,
            Prisma, and Tailwind CSS.
          </div>
        </footer>
      </body>
    </html>
  );
}
