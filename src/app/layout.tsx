import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { seo } from "@/utils/seo";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = seo.home;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <link
        rel="icon"
        href="/images/logo/keetlo-logo.png"
        sizes="any"
      />
      <link 
        rel="apple-touch-icon" 
        sizes="any" 
        href="/images/logo/keetlo-logo.png" 
      />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
