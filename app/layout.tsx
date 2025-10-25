import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inder",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "Deepseek Clone",
  description: "Full stack AI search engine built with Next.js and Deepseek API.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
