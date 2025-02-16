'use client';

import { LandingPage } from "@/components/landing/LandingPage";
import { OnboardingModal } from "@/components/onboarding/OnboardingModal";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Dashboard } from "@/components/dashboard/Dashboard";

export default function Home() {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const { account } = useWallet();
  const router = useRouter();

  useEffect(() => {
    if (account?.address) {
      router.push('/dashboard');
    }
  }, [account?.address, router]);

  return (
    <div className="">
      <LandingPage />
      <OnboardingModal
        isOpen={showOnboarding}
        onClose={() => setShowOnboarding(false)}
      />
    </div>
  );
}