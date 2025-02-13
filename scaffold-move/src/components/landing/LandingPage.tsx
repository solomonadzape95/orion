'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { ArrowRight, Code2, FileSearch, LineChart, Shield, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function LandingPage() {
  const { account } = useWallet();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="lg:w-1/2 space-y-8">
              <h1 className="text-5xl font-bold leading-tight">
                AI-Powered Smart Contract{" "}
                <span className="text-primary">Security Analysis</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Secure your blockchain applications with advanced AI analysis.
                Detect vulnerabilities, optimize gas usage, and generate
                comprehensive audit reports.
              </p>
              <div className="flex gap-4">
                {account?.address ? (
                  <Link href="/dashboard">
                    <Button size="lg">
                      Go to Dashboard
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                ) : (
                  <Button size="lg">
                    Connect Wallet
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                )}
                <Link href="https://docs.movementlabs.xyz/" target="_blank">
                  <Button variant="outline" size="lg">
                    View Documentation
                  </Button>
                </Link>
              </div>
            </div>
            <div className="lg:w-1/2">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-lg blur opacity-25"></div>
                <div className="relative bg-background rounded-lg p-6">
                  {/* Add a code preview or animation here */}
                  <pre className="language-move">
                    <code>{`module contract::audit {
    use std::signer;
    use aptos_framework::coin;

    struct AuditReport has key {
        score: u64,
        findings: vector<Finding>,
        timestamp: u64,
    }

    public entry fun create_audit(
        account: &signer,
        contract_addr: address
    ) acquires AuditReport {
        // AI analysis happens here
    }
}`}</code>
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Comprehensive Security Analysis
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <Shield className="w-12 h-12 text-primary mb-4" />
                <CardTitle>Vulnerability Detection</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Advanced AI analysis to identify security vulnerabilities and
                  potential exploits in your smart contracts.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Zap className="w-12 h-12 text-primary mb-4" />
                <CardTitle>Gas Optimization</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Get detailed suggestions for optimizing your contract's gas usage
                  and improving efficiency.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <FileSearch className="w-12 h-12 text-primary mb-4" />
                <CardTitle>Detailed Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Generate comprehensive audit reports with actionable insights and
                  recommendations.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Code2 className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">1. Submit Contract</h3>
              <p className="text-muted-foreground">
                Upload your Move smart contract code through our intuitive
                interface.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">2. AI Analysis</h3>
              <p className="text-muted-foreground">
                Our AI engine performs deep analysis of your contract's security and
                efficiency.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <LineChart className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">3. Get Results</h3>
              <p className="text-muted-foreground">
                Receive detailed reports with actionable insights and
                recommendations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Secure Your Smart Contracts?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Start your first audit today and ensure your contracts are secure and
            optimized.
          </p>
          {account?.address ? (
            <Link href="/dashboard">
              <Button size="lg" variant="secondary">
                Go to Dashboard
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          ) : (
            <Button size="lg" variant="secondary">
              Connect Wallet
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          )}
        </div>
      </section>
    </div>
  );
}
