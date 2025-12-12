import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// call font Inter
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Live Multi-Step Form | React + Next.js Challenge",
  description:
    "A fully accessible multi-step form built with Next.js, React Hook Form, Zod, and enhanced UX patterns.",
  keywords: [
    "Next.js",
    "Multi Step Form",
    "React Hook Form",
    "Accessibility",
    "Zod",
    "UX",
  ],
  authors: [{ name: "Mohamed Elsanhouri" }],
  applicationName: "Live Multi-Step Form",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr">
      <body className={`${inter.variable} antialiased bg-gray-50`} aria-live="polite">
        {children}
      </body>
    </html>
  );
}
