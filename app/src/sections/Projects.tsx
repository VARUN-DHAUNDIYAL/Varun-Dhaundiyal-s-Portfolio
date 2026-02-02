import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Github, ArrowRight, Cpu } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Project {
  name: string;
  tagline: string;
  description: string;
  image: string;
  tech: string[];
  metrics: { label: string; value: string }[];
  link: string;
  featured: boolean;
  color: string;
}

const featuredProjects: Project[] = [
  {
    name: 'Code-Smith',
    tagline: 'AI-Powered Collaborative Coding Platform',
    description: 'A next-generation, browser-based development environment that seamlessly integrates AI capabilities into the developer workflow. Built for the modern development team.',
    image: '/images/codesmith-1.png',
    tech: ['Next.js', 'TypeScript', 'WebContainers', 'Ollama', 'Prisma'],
    metrics: [
      { label: 'AI Acceptance', value: '>60%' },
      { label: 'Setup Time', value: '<30s' },
    ],
    link: '/projects/code-smith',
    featured: true,
    color: 'from-cyan-500 to-blue-500',
  },
  {
    name: 'Elen & Ember Securities',
    tagline: 'The Operating System for Capital Efficiency',
    description: 'An AI-native Financial Operating System architected for institutional-grade treasury management. Real-time liquidity intelligence powered by Advanced Agentic AI.',
    image: '/images/elen-2.png',
    tech: ['Next.js', 'AI/ML', 'Financial Analytics', 'Risk Engine', 'Monte Carlo'],
    metrics: [
      { label: 'VaR Accuracy', value: '99%' },
      { label: 'Simulations', value: '10K+' },
    ],
    link: '/projects/elen-ember',
    featured: true,
    color: 'from-amber-500 to-orange-500',
  },
];

const otherProject = {
  name: 'MNIST CUDA MLP',
  tagline: 'GPU-Accelerated Neural Network',
  description: 'Multi-Layer Perceptron implementation with CUDA for handwritten digit classification, achieving 10x speedup over CPU training.',
  tech: ['Python', 'CUDA', 'PyTorch'],
  metrics: [
    { label: 'Accuracy', value: '98.5%' },
    { label: 'Speedup', value: '10x' },
  ],
  github: 'https://github.com/VARUN-DHAUNDIYAL/MNSIT_CUDA_MLP_PROJECT',
};

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const niceSideRef = useRef<HTMLDivElement>(null);
  const otherRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Featured cards reveal
      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll('.project-card');
        gsap.fromTo(
          cards,
          { opacity: 0, y: 100, rotateX: 15 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.7,
            stagger: 0.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Nice Side Project Reveal
      if (niceSideRef.current) {
        gsap.fromTo(
          niceSideRef.current,
          { opacity: 0, y: 100 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: {
              trigger: niceSideRef.current,
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Other project reveal
      if (otherRef.current) {
        gsap.fromTo(
          otherRef.current,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: otherRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative py-32 md:py-48 z-40"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Section Title */}
        <div className="mb-16 text-center">
          <h2 className="text-section font-bold tracking-tight mb-4">
            FEATURED PROJECTS
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Deep dives into my most ambitious projects — built from the ground up
            with cutting-edge technology and product thinking.
          </p>
        </div>

        {/* Featured Projects Grid */}
        <div ref={cardsRef} className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {featuredProjects.map((project) => (
            <a
              key={project.name}
              href={project.link}
              className="project-card group relative rounded-3xl overflow-hidden bg-card border border-border hover:border-primary/30 transition-all duration-500"
              style={{ perspective: '1000px' }}
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-20`} />
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />

                {/* Floating badge */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="px-3 py-1 text-xs font-medium rounded-full bg-black/50 backdrop-blur-sm text-white border border-white/10">
                    Featured Project
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
                      {project.name}
                    </h3>
                    <p className="text-primary font-medium">{project.tagline}</p>
                  </div>
                  <div className="p-3 rounded-full bg-white/5 group-hover:bg-primary/10 transition-colors">
                    <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </div>
                </div>

                <p className="text-muted-foreground mb-6 line-clamp-2">
                  {project.description}
                </p>

                {/* Metrics */}
                <div className="flex gap-6 mb-6">
                  {project.metrics.map((metric) => (
                    <div key={metric.label}>
                      <div className="text-xl font-bold text-white">{metric.value}</div>
                      <div className="text-xs text-muted-foreground">{metric.label}</div>
                    </div>
                  ))}
                </div>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-xs font-medium rounded-full bg-white/5 text-muted-foreground border border-border"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* The Nice Side Project Section */}
        <div ref={niceSideRef} className="mb-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Text Content */}
            <div className="order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-500 text-xs font-medium mb-6">
                <span>✨ New Innovation</span>
              </div>
              <h3 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-400 to-rose-500 bg-clip-text text-transparent mb-6">
                The Nice Side
              </h3>
              <p className="text-xl text-primary font-medium mb-8">
                Sun Seat Recommendation Web App
              </p>

              <div className="space-y-8">
                <div className="bg-card/50 border border-border/50 rounded-2xl p-6 backdrop-blur-sm">
                  <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                    <span className="w-1 h-6 bg-red-500 rounded-full" />
                    The Problem
                  </h4>
                  <p className="text-muted-foreground leading-relaxed">
                    In an era of hyper-optimized travel, the passenger experience remains static. Travelers surrender their in-flight views to chance, disconnected from the geographical and astronomical context of their journey. Existing tools are fragmented, relying on heavy backend dependencies that compromise user privacy and real-time responsiveness.
                  </p>
                </div>

                <div className="bg-card/50 border border-border/50 rounded-2xl p-6 backdrop-blur-sm">
                  <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                    <span className="w-1 h-6 bg-emerald-500 rounded-full" />
                    The Solution
                  </h4>
                  <p className="text-muted-foreground leading-relaxed">
                    The Nice Side reimagines the pre-flight experience through a zero-latency, client-side architecture. By leveraging the browser's native computational capabilities to process complex geodesic and astronomical data, we deliver instant, privacy-preserving seat recommendations. This democratizes aerial views, transforming a seat selection into a calculated aesthetic decision without a single byte leaving the user's device.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mt-8">
                {['React', 'Leaflet', 'SunCalc', 'Nominatim API', 'Client-Side Architecture'].map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 text-xs font-medium rounded-full bg-white/5 text-muted-foreground border border-border hover:border-orange-500/30 transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Tablet Frame Demo (Horizontal) - Hidden on small mobile */}
            <div className="order-1 lg:order-2 flex justify-center">
              {/* Tablet Frame - visible on md and up */}
              <div className="hidden sm:block relative mx-auto border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[400px] w-[680px] shadow-2xl hover:scale-[1.02] transition-transform duration-700 tablet-frame">
                {/* Top Camera */}
                <div className="w-[10px] h-[10px] bg-gray-700 rounded-full absolute top-[5px] left-1/2 -translate-x-1/2 z-10"></div>
                {/* Side Buttons */}
                <div className="h-[46px] w-[3px] bg-gray-700 absolute -end-[17px] top-[80px] rounded-e-lg"></div>
                <div className="h-[46px] w-[3px] bg-gray-700 absolute -end-[17px] top-[140px] rounded-e-lg"></div>
                {/* Screen */}
                <div className="rounded-[1.5rem] overflow-hidden w-[652px] h-[372px] bg-black relative">
                  <iframe
                    src="https://the-nice-side.vercel.app/"
                    className="border-0 bg-white origin-top-left"
                    style={{
                      width: '1024px',
                      height: '600px',
                      transform: 'scale(0.637)',
                      transformOrigin: 'top left',
                    }}
                    title="The Nice Side Demo"
                    loading="lazy"
                  />
                  {/* Reflection/Glare effect */}
                  <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-white/5 to-transparent opacity-30 rounded-[1.5rem]"></div>
                </div>
              </div>

              {/* Mobile Fallback - CTA button to open app */}
              <a
                href="https://the-nice-side.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="sm:hidden w-full p-6 rounded-2xl bg-gradient-to-br from-orange-500/20 to-rose-500/20 border border-orange-500/30 flex flex-col items-center gap-4 group hover:from-orange-500/30 hover:to-rose-500/30 transition-all"
              >
                <div className="p-4 rounded-full bg-gradient-to-br from-orange-500 to-rose-500">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="text-white font-semibold text-lg">Try The Nice Side App</span>
                <span className="text-muted-foreground text-sm">Tap to open in new tab</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Other Project */}
      <div ref={otherRef}>
        <h3 className="text-xl font-bold text-white mb-6">Other Projects</h3>
        <div className="p-8 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-300 group">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-primary/10">
                <Cpu className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-white mb-1 group-hover:text-primary transition-colors">
                  {otherProject.name}
                </h4>
                <p className="text-sm text-muted-foreground mb-3">{otherProject.tagline}</p>
                <div className="flex flex-wrap gap-2">
                  {otherProject.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 text-xs rounded-full bg-white/5 text-muted-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex gap-4">
                {otherProject.metrics.map((metric) => (
                  <div key={metric.label} className="text-center">
                    <div className="text-lg font-bold text-white">{metric.value}</div>
                    <div className="text-xs text-muted-foreground">{metric.label}</div>
                  </div>
                ))}
              </div>
              <a
                href={otherProject.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
