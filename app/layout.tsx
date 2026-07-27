import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Attention Protocol — The Moon Landing from Murderbot's POV",
  description:
    "A Murderbot fan experiment in programmable attention, using Apollo 11 as a routine client-monitoring problem.",
  openGraph: {
    title: "Attention Protocol",
    description: "The Moon landing, from Murderbot's point of view.",
    type: "website",
    images: [{ url: "/og.png", width: 1792, height: 922 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Attention Protocol",
    description: "The Moon landing, from Murderbot's point of view.",
    images: ["/og.png"],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
