import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "../@/shad/ui/toaster";
import { Providers } from "@/provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Wallet",
  description: "Simple wallet app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <>
      <html lang="en">
        <Providers>
          <body className={inter.className}>
            <main>{children}</main>
            <Toaster />
          </body>
        </Providers>
      </html>
    </>
  );
}
