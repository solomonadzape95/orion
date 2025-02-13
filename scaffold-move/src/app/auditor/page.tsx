'use client';

import { AuditorInterface } from "@/components/auditor/AuditorInterface";
import { NavBar } from "@/components/NavBar";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { redirect } from "next/navigation";

export default function AuditorPage() {
  const { account } = useWallet();

  if (!account?.address) {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      <main className="container mx-auto px-4 py-8">
        <AuditorInterface />
      </main>
    </div>
  );
}
