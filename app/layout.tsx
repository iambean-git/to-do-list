import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from 'next/font/local';
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
  title: "To Do List",
  description: "To Do List",
};

const NanumSquare = localFont({
  src: [
    {
      path: "./fonts/NanumSquareR.otf",
      weight: '400',
      style: 'normal'
    },
    {
      path: "./fonts/NanumSquareB.otf",
      weight: '700',
      style: 'normal'
    },
    {
      path: "./fonts/NanumSquareEB.otf",
      weight: '800',
      style: 'normal'
    },
  ]
})
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${NanumSquare.className} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
