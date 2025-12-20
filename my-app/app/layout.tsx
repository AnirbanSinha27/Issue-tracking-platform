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

export const metadata = {
  title: {
    default: "ApniSec | Cybersecurity Simplified",
    template: "%s | ApniSec",
  },
  description:
    "ApniSec helps teams track and manage Cloud Security, Red Team, and VAPT issues securely.",
  keywords: [
    "Cybersecurity",
    "Cloud Security",
    "VAPT",
    "Red Team Assessment",
    "Issue Tracking",
  ],
  openGraph: {
    title: "ApniSec",
    description:
      "Secure your infrastructure with ApniSec's unified security issue platform.",
    url: "https://apnisec.com",
    siteName: "ApniSec",
    locale: "en_US",
    type: "website",
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
