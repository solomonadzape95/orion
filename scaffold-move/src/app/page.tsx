"use client";

import { useEffect, useState } from "react";
import { NavBar } from "@/components/NavBar";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { OnboardingModal } from "@/components/onboarding/OnboardingModal";
import { Loading } from "@/components/ui/loading";
import { supabase } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { LandingPage } from "@/components/landing/LandingPage";

export default function Home() {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const { account } = useWallet();
  const router = useRouter();

  useEffect(() => {
    const checkProfile = async () => {
      if (!account?.address) {
        setIsCheckingProfile(false);
        return;
      }

      try {
        const { data: profile } = await supabase
          .from("profiles")
          .select("*")
          .eq("wallet_address", account.address)
          .single();

        if (profile) {
          router.push("/dashboard");
        } else {
          setShowOnboarding(true);
        }
      } catch (error) {
        console.error("Error checking profile:", error);
      } finally {
        setIsCheckingProfile(false);
      }
    };

    checkProfile();
  }, [account?.address, router]);

  return (
    <div className="                                            w-full relative">
      <NavBar />
      {/* <button onClick={() => setShowOnboarding(true)}>click</button> */}
      <LandingPage />
      <OnboardingModal
        isOpen={showOnboarding}
        onClose={() => setShowOnboarding(false)}
      />
    </div>
  );
}
