"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { testimonials } from "@/lib/constants";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { ArrowRight, Github, Twitter, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const features = [
  {
    title: "Competitive Audit",
    description:
      "Get your code reviewed by multiple auditors competing to find vulnerabilities",
    icon: (
      <svg
        className="w-6 h-6 text-cyan-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
    ),
  },
  {
    title: "Private Audit",
    description:
      "Work directly with a trusted auditor for comprehensive security review",
    icon: (
      <svg
        className="w-6 h-6 text-purple-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
        />
      </svg>
    ),
  },
  {
    title: "Continuous Diligence",
    description: "AI-powered monitoring and automated vulnerability detection",
    icon: (
      <svg
        className="w-6 h-6 text-green-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M16 12h6m-3-3v6"
        />
      </svg>
    ),
  },
];

export function LandingPage() {
  const { account } = useWallet();

  const scrollContainer = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (!scrollContainer.current) return;

    const container = scrollContainer.current;
    let animationFrame: number;
    let touchStartY = 0;
    let isTouching = false;

    const handleTouchStart = (e: TouchEvent) => {
      isTouching = true;
      touchStartY = e.touches[0].clientY;
      container.style.animationPlayState = "paused";
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isTouching) return;
      const deltaY = e.touches[0].clientY - touchStartY;
      container.scrollTop -= deltaY * 2;
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchEnd = () => {
      isTouching = false;
      container.style.animationPlayState = "running";
    };

    const animateScroll = () => {
      if (!isTouching && !isMobile) {
        container.scrollTop += 0.5;
        if (container.scrollTop >= container.scrollHeight / 2) {
          container.scrollTop = 0;
        }
      }
      animationFrame = requestAnimationFrame(animateScroll);
    };

    container.addEventListener("touchstart", handleTouchStart);
    container.addEventListener("touchmove", handleTouchMove);
    container.addEventListener("touchend", handleTouchEnd);
    animateScroll();

    return () => {
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchmove", handleTouchMove);
      container.removeEventListener("touchend", handleTouchEnd);
      cancelAnimationFrame(animationFrame);
    };
  }, [isMobile]);

  return (
    <div className="w-full bg-[#0A0B1A] relative overflow-hidden">
      <div className="absolute top-0 left-1/2 w-[1200px] h-[800px] bg-gradient-to-r from-violet-500/15 to-cyan-400/10 blur-[100px] -translate-x-1/2 -translate-y-1/2 animate-gradient-float" />
      <div className="absolute top-1/3 right-0 w-[600px] h-[600px] bg-indigo-600/10 blur-[100px] rounded-full animate-pulse" />
      <div className="absolute -top-52 -left-60 w-[600px] h-[600px] bg-[#412b92]/70 blur-[120px] rounded-full" />
      <div className="absolute -top-32 -right-48 w-[600px] h-[600px] bg-[#7531d8]/30 blur-[120px] rounded-full" />

      <div className="absolute top-48 -right-32 -z30 flex items-center rounded-full">
        <Image
          width={600}
          height={600}
          draggable={"false"}
          alt="lock"
          src="/assets/cloth.png"
        />
      </div>

      <section className="relative py-32 z-10 border-b border-white/5 backdrop-blur-md w-full max-w-7xl mx-auto">
        <div className="absolute top-40 md:top-48 left-12 md:left-20 animate-float flex items-center rounded-full">
          <Image
            width={100}
            height={100}
            draggable={"false"}
            className="w-6 h-6 md:w-32 md:h-32"
            alt="lock"
            src="/assets/lock.png"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 px-2 md:px-4 py-.5 md:py-1.5 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 mb-8">
              <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
              <span className="text-sm font-medium text-cyan-400">
                Now in Beta
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-gray-100 via-blue-200 to-cyan-300">
              Secure your smart contracts
              <span className="block mt-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-400">
                at web3 speed
              </span>
            </h1>

            <p className="mt-6 text-sm md:text-xl text-gray-300 max-w-2xl">
              Top auditors compete to keep high-security bugs out of production
            </p>

            <div className="mt-8 flex gap-4 flex-wrap justify-center">
              {account?.address ? (
                <Link href="/dashboard">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-cyan-600 to-violet-600 hover:from-cyan-500 hover:to-violet-500 rounded-xl font-semibold shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30 transition-all"
                  >
                    Go to Dashboard
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              ) : (
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-cyan-600 to-violet-600 hover:from-cyan-500 hover:to-violet-500 rounded-xl font-semibold shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30 transition-all"
                >
                  Connect Wallet
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              )}
              <Button
                variant="outline"
                size="lg"
                onClick={() => {
                  redirect("/docs");
                }}
              >
                Read Docs
              </Button>
            </div>

            <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-8 items-center md:divide-x divide-gray-800">
              {[
                { value: "$12M", label: "Total Paid" },
                { value: "20.3K", label: "Audits Done" },
                { value: "14.2K+", label: "Bugs Found" },
                { value: "400+", label: "Active Auditors" },
              ].map((stat, i) => (
                <div key={i} className="md:px-8 first:pl-0 last:pr-0">
                  <div className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-violet-400">
                    {stat.value}
                  </div>
                  <div className="mt-2 text-sm text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="mt-16 w-full max-w-6xl relative group hidden md:block">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-violet-500/20 blur-2xl opacity-30 animate-pulse" />
              <div className="relative rounded-2xl overflow-hidden border border-white/10 backdrop-blur-sm">
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

      <section className="relative py-32 z-10 border-b border-white/5">
        <div className="absolute -top-2 -left-60 w-[600px] h-[600px] bg-[#412b92]/40 blur-[120px] rounded-3xl" />
        <div className="absolute -top-2 -right-48 w-[600px] h-[600px] bg-[#7531d8]/30 blur-[120px] rounded-xl" />

        <div className="max-w-7xl mx-auto px-4">
          <div className="absolute top-52 right-16 animate-float flex items-center justify-center -z-20">
            <Image
              width={500}
              height={500}
              draggable={"false"}
              alt="lock"
              className="w-16 h-16 md:w-40 md:h-40"
              src="/assets/rocket.png"
            />
          </div>

          <div className="absolute bottom-10 left-12 flex items-center justify-center">
            <Image
              width={300}
              height={300}
              draggable={"false"}
              alt="lock"
              src="/assets/blob.png"
            />
          </div>

          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-100 mb-4">
              Your security partners across
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-400">
                {" "}
                the development lifecycle
              </span>
            </h2>
            <p className="text-lg text-gray-400">
              From the beginning of development through post-deployment
              monitoring
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard feature={feature} key={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-32 z-10">
        <div className="absolute top-0 left-1/2 w-[1200px] h-[800px] bg-gradient-to-r from-violet-500/15 to-cyan-400/10 blur-[100px] -translate-x-1/2 -translate-y-1/2 animate-gradient-float" />
        <div className="absolute top-1/3 right-0 w-[600px] h-[600px] bg-indigo-600/10 blur-[100px] rounded-full animate-pulse" />
        <div className="max-w-7xl mx-auto md:px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-100">
            Trusted by{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-400">
              Builders
            </span>
          </h2>

          <div className="relative w-full">
            <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-[#0A0B1A] to-transparent pointer-events-none z-20 hidden md:block" />
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#0A0B1A] to-transparent pointer-events-none z-20 hidden md:block" />
            <div className="absolute left-0 top-0 bottom-0 w-14 bg-gradient-to-r from-[#0A0B1A] to-transparent pointer-events-none z-20 md:hidden" />
            <div className="absolute right-0 top-0 bottom-0 w-14 bg-gradient-to-l from-[#0A0B1A] to-transparent pointer-events-none z-20 md:hidden" />

            <div
              ref={scrollContainer}
              className="hidden md:grid grid-cols-3 gap-8 h-[600px] overflow-y-hidden relative"
            >
              {testimonials.map((column, colIndex) => (
                <div
                  key={colIndex}
                  className="space-y-8"
                  style={{
                    animation: isMobile
                      ? "none"
                      : `infinite-scroll 40s linear infinite`,
                  }}
                >
                  {[...column, ...column].map((testimonial, index) => (
                    <TestimonialCard
                      key={`${colIndex}-${index}`}
                      testimonial={testimonial}
                    />
                  ))}
                </div>
              ))}
            </div>

            <div className="md:hidden overflow-x-auto pb-8 -mx-4 px-4 scrollbar-hide">
              <div className="flex gap-8 w-max px-4">
                {testimonials.flat().map((testimonial, index) => (
                  <div key={index} className="w-[300px]">
                    <TestimonialCard testimonial={testimonial} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-32 z-10">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="relative backdrop-blur-sm bg-white/5 rounded-3xl border border-white/10 p-12 shadow-2xl shadow-cyan-500/20">
            <div className="absolute inset-0 rounded-3xl border border-cyan-400/30 animate-pulse pointer-events-none" />
            <h2 className="text-4xl font-bold text-gray-100 mb-4">
              Ready to Secure Your
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-400">
                {" "}
                Smart Contracts?
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
              Start your first audit today and ensure your contracts are secure
              and optimized
            </p>
            {account?.address ? (
              <Link href="/dashboard">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-cyan-600 to-violet-600 hover:from-cyan-500 hover:to-violet-500 rounded-xl font-semibold shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30 transition-all"
                >
                  Go to Dashboard
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            ) : (
              <Button
                size="lg"
                className="bg-gradient-to-r from-cyan-600 to-violet-600 hover:from-cyan-500 hover:to-violet-500 rounded-xl font-semibold shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30 transition-all"
              >
                Connect Wallet
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function TestimonialCard({ testimonial }: { testimonial: any }) {
  return (
    <Card className="bg-white/5 backdrop-blur-sm border border-white/10 hover:border-cyan-400/30 transition-all">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-600 to-violet-600 flex items-center justify-center">
              <span className="font-semibold text-white">
                {testimonial.author[0]}
              </span>
            </div>
            <div>
              <h4 className="font-semibold text-gray-100">
                {testimonial.author}
              </h4>
              <p className="text-sm text-gray-400">
                {testimonial.role} @ {testimonial.company}
              </p>
            </div>
          </div>
          <div className="flex items-center">
            {[...Array(testimonial.rating)].map((_, i) => (
              <Star
                key={i}
                className="w-4 h-4 text-amber-400"
                fill="currentColor"
              />
            ))}
          </div>
        </div>
        <p className="text-gray-300 mb-2 italic">"{testimonial.comment}"</p>
        <p className="text-sm text-gray-500">{testimonial.date}</p>
      </CardContent>
    </Card>
  );
}

function FeatureCard({ feature }: { feature: any }) {
  return (
    <Card className="bg-white/5 backdrop-blur-sm border border-white/10 hover:border-cyan-400/30 transition-all group">
      <CardContent className="p-8">
        <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center mb-6 transition-transform group-hover:scale-110">
          {feature.icon}
        </div>
        <h3 className="text-xl font-semibold text-gray-100 mb-2">
          {feature.title}
        </h3>
        <p className="text-gray-400 leading-relaxed">{feature.description}</p>
      </CardContent>
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />
    </Card>
  );
}

function Footer() {
  return (
    <footer className="relative py-16 z-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4">
        <div>
          <div className="space-y-6">
            <Link href="/" className="w-32 relative block">
              <div className="absolute top-1/2 left-0 -translate-y-1/2 w-4/5 h-8 bg-gradient-to-tr from-[#7531d8]/70 to-[#412b92]/90 blur-[20px] border borde-white -z-10" />
              <Image
                src="/logo.png"
                alt="Orion"
                width={100}
                height={100}
                className="w-full h-full md:w-[100px]"
              />
            </Link>
            <p className="text-sm text-gray-400 max-w-[200px]">
              AI-powered smart contract security analysis platform
            </p>
            <div className="flex space-x-4">
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-400 hover:text-cyan-400"
              >
                <Github className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-400 hover:text-cyan-400"
              >
                <Twitter className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-white/5 text-center text-sm text-gray-400">
          &copy; {new Date().getFullYear()} Orion. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
