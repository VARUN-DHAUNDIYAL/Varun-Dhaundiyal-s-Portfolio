import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Calendar,
  MapPin,
  BarChart3,
  Shield,
  Users,
  Target,
  Sparkles,
  ArrowRight
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Hero reveal
      gsap.fromTo(
        heroRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Content reveal
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 80 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          delay: 0.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Stats counter animation
      if (statsRef.current) {
        const statItems = statsRef.current.querySelectorAll('.stat-item');
        gsap.fromTo(
          statItems,
          { opacity: 0, y: 40, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: statsRef.current,
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
      id="experience"
      className="relative py-32 md:py-48 z-30 overflow-hidden"
    >
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />

      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-primary/5 rounded-full blur-[80px] animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
        {/* Hero Section with Shipsy Branding */}
        <div ref={heroRef} className="mb-20">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/20 text-primary">
                  Current Role
                </span>
                <span className="text-sm text-muted-foreground">Analytics</span>
              </div>
              <div className="flex items-center gap-6">
                <h2 className="text-section font-bold tracking-tight">
                  PRODUCT ANALYST
                </h2>
                {/* Shipsy Logo */}
                <a
                  href="https://shipsy.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 px-4 py-2 rounded-xl bg-white/5 border border-border hover:border-primary/50 hover:bg-primary/5 transition-all duration-500"
                >
                  <img
                    src="/images/shipsy-logo.png"
                    alt="Shipsy"
                    className="w-6 h-6 object-contain"
                  />
                  <div>
                    <div className="text-white text-sm font-semibold group-hover:text-primary transition-colors">Shipsy</div>
                  </div>
                </a>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary" />
                <span>Aug 2025 – Present</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                <span>Gurugram, India</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div ref={contentRef} className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Left Column - Role Description */}
          <div className="lg:col-span-2 space-y-8">
            <div className="p-8 rounded-2xl bg-card border border-border relative overflow-hidden group hover:border-primary/30 transition-all duration-500">
              {/* Glow effect */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/20 rounded-full blur-[60px] group-hover:bg-primary/30 transition-colors" />

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 rounded-xl bg-primary/10">
                    <Sparkles className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Shipsy Business Intelligence</h3>
                </div>

                <p className="text-muted-foreground leading-relaxed mb-6">
                  As one of the current <span className="text-white font-medium">Product Analysts</span> of the
                  Shipsy BI platform, I drive the evolution of enterprise-grade analytics that powers
                  logistics decisions for Fortune 500 companies across 30+ countries.
                </p>

                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 rounded-xl bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Users className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-1">Client & Internal Support</h4>
                      <p className="text-sm text-muted-foreground">
                        First point of contact for external clients and internal teams when customer support
                        needs escalation. I provide deep technical guidance and product expertise to resolve
                        complex analytics challenges.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 rounded-xl bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Target className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-1">Roadmap & Strategy</h4>
                      <p className="text-sm text-muted-foreground">
                        Actively contribute to roadmap items by identifying scope for improvements,
                        suggesting feature enhancements, and prioritizing based on business impact
                        and user needs.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 rounded-xl bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Shield className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-1">UAT & Quality Assurance</h4>
                      <p className="text-sm text-muted-foreground">
                        Conduct final UAT testing for newly developed features, providing recursive
                        feedback until functionality is perfect and working as intended. Zero post-release
                        issues on features I've certified.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 rounded-xl bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <BarChart3 className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-1">Enterprise Dashboards</h4>
                      <p className="text-sm text-muted-foreground">
                        Responsible for building the most challenging business-centric dashboards on the
                        platform, enabling clients to get the real point of truth and overall abstract
                        business operation visibility for critical decision-making.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - My Personal Impact Stats */}
          <div ref={statsRef} className="space-y-4">
            <div className="stat-item p-6 rounded-xl bg-card border border-border hover:border-primary/30 transition-all duration-300">
              <div className="flex items-center gap-3 mb-3">
                <Shield className="w-5 h-5 text-primary" />
                <span className="text-sm text-muted-foreground">UAT Quality Score</span>
              </div>
              <div className="text-3xl font-bold text-white mb-1">39/40</div>
              <div className="text-sm text-muted-foreground">Features Passed First Review</div>
            </div>

            <div className="stat-item p-6 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
              <div className="flex items-center gap-3 mb-3">
                <BarChart3 className="w-5 h-5 text-primary" />
                <span className="text-sm text-primary">Dashboard Impact</span>
              </div>
              <div className="text-3xl font-bold text-white mb-1">20+</div>
              <div className="text-sm text-muted-foreground">Enterprise Dashboards Built</div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <a
            href="https://shipsy.io/products/shipsy-bi/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors group"
          >
            Explore Shipsy BI Platform
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
}
