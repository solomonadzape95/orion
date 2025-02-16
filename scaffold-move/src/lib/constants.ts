export const testimonials = [
  // Column 1
  [
    {
      id: 1,
      author: "John D.",
      role: "Security Researcher",
      company: "DeFi Protocol",
      comment:
        "The most comprehensive security analysis I've seen. Caught several critical vulnerabilities that other tools missed.",
      rating: 5,
      date: "2 days ago",
    },
    {
      id: 4,
      author: "Mike R.",
      role: "CTO",
      company: "NFT Marketplace",
      comment:
        "Reduced our audit costs by 40% while improving coverage. The competitive model really works.",
      rating: 5,
      date: "3 days ago",
    },
    {
      id: 7,
      author: "Lisa T.",
      role: "Blockchain Developer",
      company: "DEX Platform",
      comment:
        "The AI-powered suggestions helped us optimize gas costs significantly during development.",
      rating: 5,
      date: "1 week ago",
    },
  ],
  // Column 2
  [
    {
      id: 2,
      author: "Sarah M.",
      role: "Lead Engineer",
      company: "Web3 Studio",
      comment:
        "Incredible attention to detail. Automated analysis + expert review gives us deployment confidence.",
      rating: 5,
      date: "1 week ago",
    },
    {
      id: 5,
      author: "David K.",
      role: "Smart Contract Auditor",
      company: "Security Firm",
      comment:
        "The bug bounty system creates healthy competition while maintaining collaboration.",
      rating: 5,
      date: "4 days ago",
    },
    {
      id: 8,
      author: "Emma W.",
      role: "Product Manager",
      company: "DAO Platform",
      comment:
        "Cut our audit timeline in half without compromising on quality. Will definitely use again.",
      rating: 5,
      date: "2 weeks ago",
    },
  ],
  // Column 3
  [
    {
      id: 3,
      author: "Alex P.",
      role: "Founder",
      company: "DeFi Startup",
      comment:
        "Critical vulnerabilities found in our first audit saved us from potential disaster. Worth every penny.",
      rating: 5,
      date: "5 days ago",
    },
    {
      id: 6,
      author: "Sophia L.",
      role: "Security Lead",
      company: "Crypto Wallet",
      comment:
        "Continuous monitoring feature caught a regression issue before it reached production.",
      rating: 5,
      date: "6 days ago",
    },
    {
      id: 9,
      author: "Ryan G.",
      role: "DevOps Engineer",
      company: "L1 Blockchain",
      comment:
        "Integration with our CI/CD pipeline was seamless. Security became part of our workflow naturally.",
      rating: 5,
      date: "3 days ago",
    },
  ],
].map((column) => [...column, ...column]); // Duplicate for infinite effect
