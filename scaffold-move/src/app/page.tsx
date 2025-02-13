'use client';

import { useEffect, useState } from 'react';
import { NavBar } from "@/components/NavBar";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Code2, FileSearch, Shield } from "lucide-react";
import { OnboardingModal } from '@/components/onboarding/OnboardingModal';
import { Loading } from '@/components/ui/loading';
import { supabase } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

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
    <div className="min-h-screen bg-background">
      <NavBar />
      <main className="container mx-auto px-4">
        <div className="py-20">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">
              AI-Powered Smart Contract{" "}
              <span className="text-primary">Security Analysis</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Secure your blockchain applications with advanced AI analysis.
              Detect vulnerabilities, optimize gas usage, and generate
              comprehensive audit reports.
            </p>
            {!account?.address ? (
              <Button size="lg" className="gap-2">
                Connect Wallet to Get Started
                <ArrowRight className="w-5 h-5" />
              </Button>
            ) : (
              <Button size="lg" className="gap-2" onClick={() => setShowOnboarding(true)}>
                Start Your Security Journey
                <ArrowRight className="w-5 h-5" />
              </Button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20">
            <Card>
              <CardHeader>
                <Shield className="w-12 h-12 text-primary mb-4" />
                <CardTitle>Advanced Security Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Detect vulnerabilities and security issues in your smart contracts using state-of-the-art AI
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Code2 className="w-12 h-12 text-primary mb-4" />
                <CardTitle>Gas Optimization</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Get detailed suggestions for optimizing your contract's gas usage
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <FileSearch className="w-12 h-12 text-primary mb-4" />
                <CardTitle>Comprehensive Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Generate detailed audit reports with actionable insights
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <OnboardingModal
        isOpen={showOnboarding}
        onClose={() => setShowOnboarding(false)}
      />
    </div>
  );
}