'use client';

import { Dashboard } from "@/components/dashboard/Dashboard";
import { NavBar } from "@/components/NavBar";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { redirect } from "next/navigation";

export default function DashboardPage() {
  const { account } = useWallet();



  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      <main className="container mx-auto px-4 py-8">
        <Dashboard />
      </main>
    </div>
  );
}
