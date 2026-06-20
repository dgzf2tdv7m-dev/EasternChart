import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { headers } from "next/headers";
import { alternateLanguages, buildLocaleMetadata, coerceLocale, LOCALE_HEADER } from "@/lib/seo";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = buildLocaleMetadata("en");

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = coerceLocale((await headers()).get(LOCALE_HEADER));

  return (
    <html lang={locale} className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <head>
        <meta name="google-site-verification" content="tW30uxwrIxHeoXM5In2PjCP9xvCTQODDPuBU8jKP-rg" />
        {Object.entries(alternateLanguages).map(([hrefLang, href]) => (
          <link key={hrefLang} rel="alternate" hrefLang={hrefLang} href={href} />
        ))}
      </head>
      <body className="grain min-h-dvh">
        {children}
      </body>
    </html>
  );
}
