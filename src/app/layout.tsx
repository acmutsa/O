/*
This is the root of the project. 
The command to run the project is: pnpm run dev 
Ensure that you have the most recent version of the project by runnning "git fetch" then "git merge origin/main"
IMPORTANT: PLEASE ENSURE THE PORT YOU ARE RUNNING THIS ON IS 3000 DUE TO GOOGLE AUTH CONFIGURATION
*/
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const calsans = localFont({
  src: "./fonts/calsans-semi.woff2",
  variable: "--font-calsans",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${calsans.variable} antialiased`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
