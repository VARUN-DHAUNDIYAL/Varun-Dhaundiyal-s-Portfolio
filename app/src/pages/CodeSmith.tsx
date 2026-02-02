import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  ArrowLeft, 
  Github, 
  ExternalLink, 
  Zap, 
  Shield, 
  BarChart3, 
  Layers,
  Terminal,
  Sparkles,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const screenshots = [
  { src: '/images/codesmith-1.png', caption: 'Landing Page - AI-Powered Development' },
  { src: '/images/codesmith-2.png', caption: 'Enhanced AI Assistant Interface' },
  { src: '/images/codesmith-3.png', caption: 'Project Dashboard & GitHub Integration' },
  { src: '/images/codesmith-4.png', caption: 'Analytics Dashboard - Code Metrics' },
  { src: '/images/codesmith-5.png', caption: 'Live Code Editor with WebContainer' },
];

const features = [
  {
    icon: Zap,
    title: 'Real-time Code Execution',
    description: 'Browser-based WebContainer technology enables instant code execution without local setup. Write, run, and preview code in milliseconds.',
  },
  {
    icon: Sparkles,
    title: 'AI-Powered Suggestions',
    description: 'Integrated with local LLMs via Ollama for intelligent code completion, explanations, and refactoring suggestions with >60% acceptance rate.',
  },
  {
    icon: BarChart3,
    title: 'LLM Performance Analytics',
    description: 'Unique analytics dashboard tracking AI suggestion acceptance rates, coding patterns, and productivity metrics for data-driven improvements.',
  },
  {
    icon: Layers,
    title: 'Multi-Framework Support',
    description: 'Support for React, Vue, Angular, and vanilla JavaScript with automatic dependency installation and live preview.',
  },
  {
    icon: Shield,
    title: 'Secure Execution Environment',
    description: 'Isolated WebContainers ensure code runs safely in the browser, protecting the host system from malicious commands.',
  },
  {
    icon: Terminal,
    title: 'Integrated Terminal',
    description: 'Full terminal access within the browser for running npm commands, git operations, and shell scripts.',
  },
];

const techStack = [
  { name: 'Next.js', category: 'Framework' },
  { name: 'TypeScript', category: 'Language' },
  { name: 'WebContainers', category: 'Runtime' },
  { name: 'Ollama', category: 'AI Engine' },
  { name: 'Prisma', category: 'ORM' },
  { name: 'Clerk Auth', category: 'Authentication' },
  { name: 'Tailwind CSS', category: 'Styling' },
  { name: 'MongoDB', category: 'Database' },
];

export default function CodeSmithPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (!pageRef.current) return;

    const ctx = gsap.context(() => {
      // Hero animation
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

      // Scroll-triggered animations
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
            <span className="px-3 py-1 text-xs font-medium rounded-full bg-cyan-500/20 text-cyan-400">
              Featured Project
            </span>
            <span className="px-3 py-1 text-xs font-medium rounded-full bg-white/5 text-muted-foreground">
              Open Source
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Code-Smith
          </h1>
          <p className="text-xl md:text-2xl text-cyan-400 font-medium mb-8">
            AI-Powered Collaborative Coding Platform
          </p>
          <p className="text-lg text-muted-foreground max-w-2xl mb-8">
            A next-generation, browser-based development environment that seamlessly integrates 
            AI capabilities into the developer workflow. Built for the modern development team, 
            it eliminates the friction between coding and AI assistance.
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href="https://github.com/VARUN-DHAUNDIYAL/Code-Smith2"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-medium hover:bg-white/90 transition-colors"
            >
              <Github className="w-5 h-5" />
              View on GitHub
            </a>
            <a
              href="https://sequoia-boat-6eb.notion.site/Code-Smith-The-AI-Powered-Collaborative-Coding-Platform-244d0c26064080e3be06d094c66291f4"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-border text-white hover:bg-white/10 transition-colors"
            >
              <ExternalLink className="w-5 h-5" />
              View PRD
            </a>
          </div>
        </div>
      </div>

      {/* Screenshot Gallery */}
      <div className="reveal-section py-20 px-6 md:px-12 bg-card/50">
        <div className="max-w-[1400px] mx-auto">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Platform Showcase</h2>
          
          <div className="relative">
            {/* Main Image */}
            <div className="relative rounded-2xl overflow-hidden border border-border bg-black">
              <img
                src={screenshots[currentSlide].src}
                alt={screenshots[currentSlide].caption}
                className="w-full h-auto max-h-[600px] object-contain"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                <p className="text-white font-medium">{screenshots[currentSlide].caption}</p>
              </div>
            </div>

            {/* Navigation */}
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

            {/* Indicators */}
            <div className="flex justify-center gap-2 mt-6">
              {screenshots.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentSlide ? 'bg-cyan-400 w-8' : 'bg-white/20'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Metrics */}
      <div className="reveal-section py-20 px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="p-8 rounded-2xl bg-card border border-border text-center">
              <div className="text-4xl font-bold text-cyan-400 mb-2">&gt;60%</div>
              <div className="text-sm text-muted-foreground">AI Acceptance Rate</div>
            </div>
            <div className="p-8 rounded-2xl bg-card border border-border text-center">
              <div className="text-4xl font-bold text-cyan-400 mb-2">&lt;30s</div>
              <div className="text-sm text-muted-foreground">Setup Time</div>
            </div>
            <div className="p-8 rounded-2xl bg-card border border-border text-center">
              <div className="text-4xl font-bold text-cyan-400 mb-2">0</div>
              <div className="text-sm text-muted-foreground">Security Incidents</div>
            </div>
            <div className="p-8 rounded-2xl bg-card border border-border text-center">
              <div className="text-4xl font-bold text-cyan-400 mb-2">15+</div>
              <div className="text-sm text-muted-foreground">Language Support</div>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="reveal-section py-20 px-6 md:px-12 bg-card/30">
        <div className="max-w-[1400px] mx-auto">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="p-6 rounded-xl bg-card border border-border hover:border-cyan-500/30 transition-all duration-300 group"
              >
                <div className="p-3 rounded-lg bg-cyan-500/10 w-fit mb-4 group-hover:bg-cyan-500/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-cyan-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tech Stack */}
      <div className="reveal-section py-20 px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Technology Stack</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {techStack.map((tech) => (
              <div
                key={tech.name}
                className="flex flex-col items-center p-6 rounded-xl bg-card border border-border hover:border-cyan-500/30 transition-all duration-300 min-w-[120px]"
              >
                <span className="text-lg font-bold text-white mb-1">{tech.name}</span>
                <span className="text-xs text-muted-foreground">{tech.category}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Problem & Solution */}
      <div className="reveal-section py-20 px-6 md:px-12 bg-gradient-to-b from-cyan-500/5 to-transparent">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">The Problem</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Setting up a development environment shouldn't feel like solving a Rubik's Cube. 
                  For many developers, especially beginners, students, or folks on constrained devices 
                  like Chromebooks—getting started with coding can be harder than coding itself.
                </p>
                <p>
                  You install a local server. It crashes. You try configuring VS Code. It freezes. 
                  And then there's LLM integration? Forget it.
                </p>
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">The Solution</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Code-Smith exists to eliminate that friction. A browser-based, AI-enhanced coding 
                  platform that just works.
                </p>
                <p>
                  Write and preview code instantly—no setup required. Get AI help that actually helps 
                  without the threat of getting sensitive data exposed. Analyze your LLM performance 
                  in one clean dashboard.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-12 px-6 md:px-12 border-t border-border">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground">
            © {new Date().getFullYear()} Code-Smith. Built by Varun Dhaundiyal.
          </p>
          <div className="flex gap-4">
            <a
              href="https://github.com/VARUN-DHAUNDIYAL/Code-Smith2"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-white transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
