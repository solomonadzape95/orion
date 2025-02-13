'use client';

import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { FileSearch, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { WalletButton } from "./wallet/WalletButton";

export function NavBar() {
  const { account } = useWallet();
  const pathname = usePathname();

  return (
    <nav className="border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="font-bold text-xl">
            Orion
          </Link>
          {account?.address && (
            <div className="hidden md:flex items-center gap-4">
              <Link href="/dashboard">
                <Button
                  variant={pathname === "/dashboard" ? "default" : "ghost"}
                  className="gap-2"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  Dashboard
                </Button>
              </Link>
              <Link href="/auditor">
                <Button
                  variant={pathname === "/auditor" ? "default" : "ghost"}
                  className="gap-2"
                >
                  <FileSearch className="w-4 h-4" />
                  Auditor
                </Button>
              </Link>
            </div>
          )}
        </div>
        <div className="flex items-center gap-4">
          <WalletButton />
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
