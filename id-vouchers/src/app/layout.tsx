'use client'
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "./providers";
import { WalletProvider } from "@/_context/WalletContext";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode,
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <WalletProvider>{children}</WalletProvider>
        </Providers>
      </body>
    </html>
  );
}