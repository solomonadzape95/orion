// import "@aptos-labs/wallet-adapter-ant-design/dist/index.css";
import "./globals.css";

import { ThemeProvider } from "@/components/ThemeProvider";
import { WalletProvider } from "@/components/WalletProvider";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";

import { PropsWithChildren } from "react";
import { ReactQueryClientProvider } from "@/components/ReactQueryClientProvider";

export const metadata: Metadata = {
  title: "Orion - AI-Powered Smart Contract Auditor",
  description:
    "Secure your blockchain applications with advanced AI analysis. Detect vulnerabilities, optimize gas usage, and generate comprehensive audit reports.",
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "flex justify-center min-h-screen bg-background font-sans antialiased",
          GeistMono.variable,
          GeistSans.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ReactQueryClientProvider>
            <WalletProvider>
              {children}
              <Toaster />
            </WalletProvider>
          </ReactQueryClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
