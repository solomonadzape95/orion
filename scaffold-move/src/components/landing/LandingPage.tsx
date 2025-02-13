'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { ArrowRight, Github, Twitter, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function LandingPage() {
  const { account } = useWallet();

  const testimonials = [
    {
      id: 1,
      author: "John D.",
      role: "Security Researcher",
      company: "DeFi Protocol",
      comment: "The most comprehensive security analysis I've seen. Caught several critical vulnerabilities that other tools missed.",
      rating: 5,
      date: "2 days ago"
    },
    {
      id: 2,
      author: "Sarah M.",
      role: "Lead Engineer",
      company: "Web3 Studio",
      comment: "Incredible attention to detail. The automated analysis combined with expert review gives us confidence in our deployments.",
      rating: 5,
      date: "1 week ago"
    }
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden hero-gradient">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-indigo-500/20 to-purple-500/20 animate-gradient"></div>
        <div className="max-w-7xl mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center rounded-full border border-blue-500/20 px-4 py-1.5 text-sm font-medium bg-blue-500/10">
                <span className="relative flex h-2 w-2 mr-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                Now in Beta
              </div>
              <h1 className="text-6xl font-bold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-600">
                Secure your smart contracts.
              </h1>
              <p className="text-xl text-blue-100/80 max-w-2xl mx-auto">
                Top auditors compete to keep high-security bugs out of production.
              </p>
            </div>
            <div className="flex justify-center gap-4">
              {account?.address ? (
                <Link href="/dashboard">
                  <Button size="lg" className="bg-blue-500 hover:bg-blue-600 text-white shadow-lg hover:shadow-blue-500/50 transition-all">
                    Go to Dashboard
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              ) : (
                <Button size="lg" className="bg-blue-500 hover:bg-blue-600 text-white shadow-lg hover:shadow-blue-500/50 transition-all">
                  Connect Wallet
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              )}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-8 mt-16">
              <div className="text-center animate-float">
                <div className="text-3xl font-bold text-blue-400">$12M</div>
                <div className="text-sm text-blue-200/70">Total Paid</div>
              </div>
              <div className="text-center animate-float-delayed">
                <div className="text-3xl font-bold text-blue-400">20.3K</div>
                <div className="text-sm text-blue-200/70">Audits Done</div>
              </div>
              <div className="text-center animate-float">
                <div className="text-3xl font-bold text-blue-400">14.2K+</div>
                <div className="text-sm text-blue-200/70">Bugs Found</div>
              </div>
              <div className="text-center animate-float-delayed">
                <div className="text-3xl font-bold text-blue-400">400+</div>
                <div className="text-sm text-blue-200/70">Active Auditors</div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative mt-16">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/30 to-indigo-500/30 rounded-lg blur-lg opacity-75 animate-pulse"></div>
              <div className="relative rounded-lg overflow-hidden shadow-2xl border border-blue-500/20">
                <Image
                  src="/assets/hero.jpg"
                  alt="Hero"
                  width={1200}
                  height={600}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-blue-950/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-blue-100">
              Your security partners across the development lifecycle
            </h2>
            <p className="text-blue-200/70">
              From the beginning of development through post-deployment monitoring, we help
              you ship secure code faster.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-blue-900/20 border-blue-500/20 hover:border-blue-500/40 transition-all">
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-2 text-blue-100">Competitive audit</h3>
                <p className="text-blue-200/70">
                  Get your code reviewed by multiple auditors competing to find vulnerabilities
                </p>
              </CardContent>
            </Card>

            <Card className="bg-blue-900/20 border-blue-500/20 hover:border-blue-500/40 transition-all">
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-2 text-blue-100">Private audit</h3>
                <p className="text-blue-200/70">
                  Work directly with a trusted auditor for a comprehensive security review
                </p>
              </CardContent>
            </Card>

            <Card className="bg-blue-900/20 border-blue-500/20 hover:border-blue-500/40 transition-all">
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-2 text-blue-100">Diligence</h3>
                <p className="text-blue-200/70">
                  Continuous security monitoring and automated vulnerability detection
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-blue-100">
            What Users Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={testimonial.id} className={`bg-blue-900/20 border-blue-500/20 hover:border-blue-500/40 transition-all ${index % 2 === 0 ? 'animate-float' : 'animate-float-delayed'}`}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                        <span className="text-blue-400 font-semibold">{testimonial.author[0]}</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-blue-100">{testimonial.author}</h4>
                        <p className="text-sm text-blue-200/70">{testimonial.role} @ {testimonial.company}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-blue-400" fill="currentColor" />
                      ))}
                    </div>
                  </div>
                  <p className="text-blue-200/70 mb-2">{testimonial.comment}</p>
                  <p className="text-sm text-blue-300/50">{testimonial.date}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-indigo-500/10 to-purple-500/10 animate-gradient"></div>
        <div className="max-w-7xl mx-auto px-4 text-center relative">
          <h2 className="text-3xl font-bold mb-4 text-blue-100">
            Ready to Secure Your Smart Contracts?
          </h2>
          <p className="text-xl mb-8 text-blue-200/70 max-w-2xl mx-auto">
            Start your first audit today and ensure your contracts are secure and
            optimized.
          </p>
          {account?.address ? (
            <Link href="/dashboard">
              <Button size="lg" className="bg-blue-500 hover:bg-blue-600 text-white shadow-lg hover:shadow-blue-500/50 transition-all">
                Go to Dashboard
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          ) : (
            <Button size="lg" className="bg-blue-500 hover:bg-blue-600 text-white shadow-lg hover:shadow-blue-500/50 transition-all">
              Connect Wallet
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-blue-500/20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <h3 className="font-bold text-lg text-blue-100">Orion</h3>
              <p className="text-sm text-blue-200/70">
                AI-powered smart contract security analysis platform
              </p>
              <div className="flex space-x-4">
                <Link href="https://github.com" target="_blank">
                  <Button variant="ghost" size="icon" className="text-blue-400 hover:text-blue-300">
                    <Github className="h-5 w-5" />
                  </Button>
                </Link>
                <Link href="https://twitter.com" target="_blank">
                  <Button variant="ghost" size="icon" className="text-blue-400 hover:text-blue-300">
                    <Twitter className="h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-blue-100">Product</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/features" className="text-sm text-blue-200/70 hover:text-blue-400 transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="text-sm text-blue-200/70 hover:text-blue-400 transition-colors">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="/docs" className="text-sm text-blue-200/70 hover:text-blue-400 transition-colors">
                    Documentation
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-blue-100">Company</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/about" className="text-sm text-blue-200/70 hover:text-blue-400 transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-sm text-blue-200/70 hover:text-blue-400 transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="text-sm text-blue-200/70 hover:text-blue-400 transition-colors">
                    Careers
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-blue-100">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/privacy" className="text-sm text-blue-200/70 hover:text-blue-400 transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-sm text-blue-200/70 hover:text-blue-400 transition-colors">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-blue-500/20 text-center text-sm text-blue-200/70">
            &copy; {new Date().getFullYear()} Orion. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
