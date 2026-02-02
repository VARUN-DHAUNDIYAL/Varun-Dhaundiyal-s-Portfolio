import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowLeft,
  TrendingUp,
  Shield,
  Brain,
  Zap,
  BarChart3,
  Activity,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const screenshots = [
  { src: '/images/elen-1.png', caption: 'Secure Authentication Portal' },
  { src: '/images/elen-2.png', caption: 'Executive Dashboard - Real-time Liquidity Intelligence' },
  { src: '/images/elen-3.png', caption: 'AI-Powered Risk Analysis' },
  { src: '/images/elen-4.png', caption: 'VaR Comparison & Risk Metrics' },
  { src: '/images/elen-5.png', caption: 'Portfolio Value & VaR Over Time' },
  { src: '/images/elen-6.png', caption: 'Asset Correlation Matrix' },
];

const features = [
  {
    icon: TrendingUp,
    title: 'Real-Time Global Liquidity',
    description: 'Sub-second visibility powered by Vercel Edge connectors. Stream data from SWIFT, APIs, and ERPs instantly with a self-healing ledger.',
  },
  {
    icon: Shield,
    title: 'Institutional Risk Engine',
    description: 'Monte Carlo Variance with 10,000 future scenarios. Stress test against Black Swan events with real-time VaR calculations at 95% and 99% confidence.',
  },
  {
    icon: Brain,
    title: 'Generative Financial Analyst',
    description: 'Context-aware AI that understands your business logic, covenants, and risk tolerance. Proactive alerting when thresholds are breached.',
  },
  {
    icon: Zap,
    title: 'Predictive Intelligence',
    description: 'While competitors report yesterday\'s balance, we forecast tomorrow\'s liquidity gap using advanced Monte Carlo simulations.',
  },
  {
    icon: BarChart3,
    title: 'Unified Truth',
    description: 'A single, immutable ledger that aggregates every bank, every region, and every currency in real-time.',
  },
  {
    icon: Activity,
    title: 'Autonomous Optimization',
    description: 'The system proactively identifies inefficiencies—"You have $45M idle in JPY. Move to a Money Market Fund to gain 15bps."',
  },
];

const competitiveAdvantages = [
  { feature: 'Deployment Time', legacy: '12-18 Months', niche: '6-9 Months', elen: '< 4 Weeks' },
  { feature: 'User Interface', legacy: '1990s Forms', niche: 'Complex Menus', elen: 'Natural Language' },
  { feature: 'Risk Modeling', legacy: 'Static / Batch', niche: 'Limited', elen: 'Real-Time Monte Carlo' },
  { feature: 'Intelligence', legacy: 'None', niche: 'Trend Lines', elen: 'Generative AI Analyst' },
];

export default function ElenEmberPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (!pageRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        heroRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power2.out',
        }
      );

      gsap.utils.toArray<HTMLElement>('.reveal-section').forEach((section) => {
        gsap.fromTo(
          section,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % screenshots.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + screenshots.length) % screenshots.length);
  };

  return (
    <div ref={pageRef} className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Portfolio
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div ref={heroRef} className="pt-32 pb-20 px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <span className="px-3 py-1 text-xs font-medium rounded-full bg-amber-500/20 text-amber-400">
              Featured Project
            </span>
            <span className="px-3 py-1 text-xs font-medium rounded-full bg-white/5 text-muted-foreground">
              FinTech
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Elen & Ember
          </h1>
          <p className="text-xl md:text-2xl text-amber-400 font-medium mb-4">
            The Operating System for Capital Efficiency
          </p>
          <p className="text-lg text-muted-foreground italic mb-8 max-w-2xl">
            "Money sleeps in Excel. It multiplies in Elen and Ember."
          </p>
          <p className="text-lg text-muted-foreground max-w-2xl mb-8">
            An AI-native Financial Operating System architected for institutional-grade treasury
            management. Real-time liquidity intelligence powered by Advanced Agentic AI.
          </p>
        </div>
      </div>

      {/* Screenshot Gallery */}
      <div className="reveal-section py-20 px-6 md:px-12 bg-card/50">
        <div className="max-w-[1400px] mx-auto">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Platform Interface</h2>

          <div className="relative">
            {/* Fixed height container for consistent sizing */}
            <div className="relative rounded-2xl overflow-hidden border border-border bg-white" style={{ height: '500px' }}>
              <img
                src={screenshots[currentSlide].src}
                alt={screenshots[currentSlide].caption}
                className="w-full h-full object-contain object-center"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                <p className="text-white font-medium">{screenshots[currentSlide].caption}</p>
              </div>
            </div>

            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 backdrop-blur-sm text-white hover:bg-black/70 transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 backdrop-blur-sm text-white hover:bg-black/70 transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <div className="flex justify-center gap-1.5 sm:gap-2 mt-4 sm:mt-6">
              {screenshots.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all ${index === currentSlide ? 'bg-amber-400 w-6 sm:w-8' : 'bg-white/20'
                    }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* The Crisis */}
      <div className="reveal-section py-20 px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <AlertTriangle className="w-6 h-6 text-red-400" />
            <h2 className="text-3xl font-bold text-white">The Absolute Truth: The Liquidity Crisis</h2>
          </div>

          <p className="text-xl text-muted-foreground mb-12">
            The Financial World Runs on 1980s Infrastructure. The modern Treasurer manages
            billion-dollar responsibilities using tools designed for the calculator era.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-8 rounded-2xl bg-red-500/5 border border-red-500/20">
              <div className="text-4xl font-bold text-red-400 mb-2">60%</div>
              <p className="text-muted-foreground">of corporate cash sits idle because visibility is fragmented across 50+ banking portals</p>
            </div>
            <div className="p-8 rounded-2xl bg-red-500/5 border border-red-500/20">
              <div className="text-4xl font-bold text-red-400 mb-2">2 Days</div>
              <p className="text-muted-foreground">average time to determine a global cash position. In a volatile market, 2 days is an eternity</p>
            </div>
            <div className="p-8 rounded-2xl bg-red-500/5 border border-red-500/20">
              <div className="text-4xl font-bold text-red-400 mb-2">$2.5T</div>
              <p className="text-muted-foreground">in value eroded annually by unhedged FX exposure and inefficient capital allocation</p>
            </div>
          </div>
        </div>
      </div>

      {/* The Solution */}
      <div className="reveal-section py-20 px-6 md:px-12 bg-gradient-to-b from-amber-500/5 to-transparent">
        <div className="max-w-[1400px] mx-auto">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">The Solution: Elen and Ember Securities</h2>
          <p className="text-xl text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
            Institutional Intelligence. Zero Latency. The first Financial Operating System
            architected natively by Advanced Agentic AI.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="p-6 rounded-xl bg-card border border-border hover:border-amber-500/30 transition-all duration-300 group"
              >
                <div className="p-3 rounded-lg bg-amber-500/10 w-fit mb-4 group-hover:bg-amber-500/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-amber-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Market Opportunity */}
      <div className="reveal-section py-20 px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Market Opportunity</h2>
          <p className="text-xl text-center text-muted-foreground mb-12">
            The $2.5 Trillion Optimization Gap
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8">
              <div className="text-5xl font-bold text-amber-400 mb-4">$4.8B</div>
              <div className="text-white font-medium mb-2">TAM</div>
              <div className="text-sm text-muted-foreground">Global Treasury Management Systems market (11% CAGR)</div>
            </div>
            <div className="text-center p-8">
              <div className="text-5xl font-bold text-amber-400 mb-4">$2.5T</div>
              <div className="text-white font-medium mb-2">Hidden Value</div>
              <div className="text-sm text-muted-foreground">Corporate cash sitting on balance sheets globally</div>
            </div>
            <div className="text-center p-8">
              <div className="text-5xl font-bold text-amber-400 mb-4">0.1%</div>
              <div className="text-white font-medium mb-2">Impact</div>
              <div className="text-sm text-muted-foreground">Improvement creates $2.5B in instant value</div>
            </div>
          </div>
        </div>
      </div>

      {/* Competitive Landscape */}
      <div className="reveal-section py-20 px-6 md:px-12 bg-card/30">
        <div className="max-w-[1400px] mx-auto">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Competitive Landscape</h2>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-4 px-6 text-muted-foreground font-medium">Feature</th>
                  <th className="text-left py-4 px-6 text-muted-foreground font-medium">Legacy ERPs</th>
                  <th className="text-left py-4 px-6 text-muted-foreground font-medium">Niche Fintech</th>
                  <th className="text-left py-4 px-6 text-amber-400 font-medium">Elen & Ember</th>
                </tr>
              </thead>
              <tbody>
                {competitiveAdvantages.map((row, index) => (
                  <tr key={index} className="border-b border-border/50">
                    <td className="py-4 px-6 text-white">{row.feature}</td>
                    <td className="py-4 px-6 text-muted-foreground">{row.legacy}</td>
                    <td className="py-4 px-6 text-muted-foreground">{row.niche}</td>
                    <td className="py-4 px-6 text-amber-400 font-medium">{row.elen}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Roadmap */}
      <div className="reveal-section py-20 px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Roadmap to Autonomy</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-8 rounded-2xl bg-card border border-border relative">
              <div className="absolute -top-4 left-8 px-4 py-1 rounded-full bg-amber-500 text-black text-sm font-bold">Now</div>
              <h3 className="text-xl font-bold text-white mb-4 mt-2">Phase 1: Visibility</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Real-time dashboards</li>
                <li>• Historical data analytics</li>
                <li>• Seamless bank connectivity</li>
              </ul>
            </div>
            <div className="p-8 rounded-2xl bg-card border border-border relative">
              <div className="absolute -top-4 left-8 px-4 py-1 rounded-full bg-amber-500/50 text-amber-400 text-sm font-bold">Q3 2026</div>
              <h3 className="text-xl font-bold text-white mb-4 mt-2">Phase 2: Intelligence</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Predictive forecasting</li>
                <li>• VaR engines</li>
                <li>• Generative Analyst</li>
              </ul>
            </div>
            <div className="p-8 rounded-2xl bg-card border border-border relative">
              <div className="absolute -top-4 left-8 px-4 py-1 rounded-full bg-amber-500/30 text-amber-400/70 text-sm font-bold">2027</div>
              <h3 className="text-xl font-bold text-white mb-4 mt-2">Phase 3: Autonomy</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Automated execution</li>
                <li>• AI-driven trades</li>
                <li>• Human approval workflow</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Conclusion */}
      <div className="reveal-section py-20 px-6 md:px-12 bg-gradient-to-b from-amber-500/10 to-transparent">
        <div className="max-w-[1400px] mx-auto text-center">
          <Sparkles className="w-12 h-12 text-amber-400 mx-auto mb-6" />
          <h2 className="text-4xl font-bold text-white mb-6">The End of the Manual Treasury</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            We are not building a better spreadsheet. We are building the Central Nervous System of Capital.
            Every day a company waits to adopt Elen and Ember is a day of lost capital, unmanaged risk,
            and wasted human potential.
          </p>
          <div className="text-2xl font-bold text-amber-400">
            Precision. Velocity. Truth.
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-12 px-6 md:px-12 border-t border-border">
        <div className="max-w-[1400px] mx-auto text-center">
          <p className="text-muted-foreground">
            © {new Date().getFullYear()} Elen & Ember Securities. Built by Varun Dhaundiyal.
          </p>
        </div>
      </footer>
    </div>
  );
}
