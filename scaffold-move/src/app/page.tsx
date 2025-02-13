'use client';

import { useEffect, useState } from 'react';
import { NavBar } from "@/components/NavBar";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { OnboardingModal } from '@/components/onboarding/OnboardingModal';
import { Loading } from '@/components/ui/loading';
import { supabase } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { LandingPage } from '@/components/landing/LandingPage';

export default function Home() {
  const { account } = useWallet();
  const router = useRouter();
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [isCheckingProfile, setIsCheckingProfile] = useState(true);

  useEffect(() => {
    const checkProfile = async () => {
      if (!account?.address) {
        setIsCheckingProfile(false);
        return;
      }

      try {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('wallet_address', account.address)
          .single();

        if (profile) {
          router.push('/dashboard');
        } else {
          setShowOnboarding(true);
        }
      } catch (error) {
        console.error('Error checking profile:', error);
      } finally {
        setIsCheckingProfile(false);
      }
    };

    checkProfile();
  }, [account?.address, router]);

  if (isCheckingProfile) {
    return <Loading message="Checking profile..." />;
  }

  return (
    <div className="white w-full relative">
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