import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { RevealText } from '../components/TextScramble';
import { MapPin, GraduationCap, Briefcase } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !contentRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 80 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'top 30%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-32 md:py-48 z-20"
    >
      <div
        ref={contentRef}
        className="max-w-[1400px] mx-auto px-6 md:px-12"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left Column - Title */}
          <div>
            <RevealText
              text="ABOUT ME"
              as="h2"
              className="text-section font-bold tracking-tight mb-8"
            />
            <div className="w-24 h-1 bg-primary/50 rounded-full mb-8" />

            {/* College Image */}
            <div className="relative rounded-2xl overflow-hidden border border-white/10 group">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
              <img
                src="/images/iiit-kota.png"
                alt="IIIT Kota Campus"
                className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute bottom-4 left-4 z-20">
                <p className="text-white font-medium text-sm">IIIT Kota</p>
                <p className="text-muted-foreground text-xs">Campus</p>
              </div>
            </div>
          </div>

          {/* Right Column - Content */}
          <div className="space-y-8">
            <p className="text-lg md:text-xl text-foreground leading-relaxed">
              I'm a <span className="text-white font-medium">4th year B.Tech student</span> at{' '}
              <span className="text-white font-medium">IIIT Kota</span>, currently working as a{' '}
              <span className="text-white font-medium">Product Analyst Intern</span> at{' '}
              <span className="text-white font-medium">Shipsy</span> — but don't let titles fool you.
              I'm on a mission to become <span className="text-primary font-semibold">the best Product Manager there is</span>.
            </p>

            <p className="text-base text-muted-foreground leading-relaxed">
              <span className="text-white font-semibold">Don't judge me by my experience.</span> Judge me by my <span className="text-primary font-medium">eye for what matters</span> — and my ability to leave the rest for dust. I build products that obliterate the competition before their brains can even process what hit them. Surgically precise. Relentlessly cutting-edge. <span className="text-white font-semibold">Absolutely uncompromising.</span>
            </p>

            {/* Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8">
              <div className="p-6 rounded-xl bg-card border border-border hover:border-primary/30 transition-all duration-300 group">
                <div className="p-3 rounded-lg bg-primary/10 w-fit mb-4 group-hover:bg-primary/20 transition-colors">
                  <GraduationCap className="w-6 h-6 text-primary" />
                </div>
                <div className="text-sm text-muted-foreground mb-1">Education</div>
                <div className="text-white font-medium">IIIT Kota</div>
                <div className="text-xs text-muted-foreground">B.Tech ECE</div>
              </div>

              <div className="p-6 rounded-xl bg-card border border-border hover:border-primary/30 transition-all duration-300 group">
                <div className="p-3 rounded-lg bg-primary/10 w-fit mb-4 group-hover:bg-primary/20 transition-colors">
                  <Briefcase className="w-6 h-6 text-primary" />
                </div>
                <div className="text-sm text-muted-foreground mb-1">Experience</div>
                <div className="text-white font-medium">8 Months</div>
                <div className="text-xs text-muted-foreground">Product Management</div>
              </div>

              <div className="p-6 rounded-xl bg-card border border-border hover:border-primary/30 transition-all duration-300 group">
                <div className="p-3 rounded-lg bg-primary/10 w-fit mb-4 group-hover:bg-primary/20 transition-colors">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div className="text-sm text-muted-foreground mb-1">Location</div>
                <div className="text-white font-medium">Gurugram</div>
                <div className="text-xs text-muted-foreground">India</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
