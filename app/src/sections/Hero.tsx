import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { SplitText } from '../components/TextScramble';
import { ScrollArrow } from '../components/MagneticButton';

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Trigger entrance animations after loading
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!sectionRef.current || !contentRef.current) return;

    const ctx = gsap.context(() => {
      // Exit animation on scroll
      gsap.to(contentRef.current, {
        opacity: 0,
        y: -100,
        filter: 'blur(10px)',
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[75vh] md:min-h-screen flex items-center justify-center z-10 pt-24 md:pt-0"
    >
      <div
        ref={contentRef}
        className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12"
      >
        {/* Label */}
        <div className="mb-4 overflow-hidden">
          {isLoaded && (
            <h2 className="text-xl md:text-2xl font-bold tracking-widest text-primary mb-2">
              AI PRODUCT MANAGER
            </h2>
          )}
        </div>

        {/* Main Name */}
        <div className="mb-8 overflow-hidden">
          <h1 className="text-hero font-bold tracking-tight leading-none">
            {isLoaded && (
              <SplitText
                text="VARUN"
                delay={0.5}
                stagger={0.05}
              />
            )}
          </h1>
          <h1 className="text-hero font-bold tracking-tight leading-none text-white/90">
            {isLoaded && (
              <SplitText
                text="DHAUNDIYAL"
                delay={0.8}
                stagger={0.05}
              />
            )}
          </h1>
        </div>

        {/* Subheadline */}
        <div className="mb-16 max-w-xl overflow-hidden">
          <p
            className={`text-lg md:text-xl text-muted-foreground leading-relaxed transition-all duration-700 delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
          >
            Crafting digital experiences with data, empathy, and code.
            Currently building products at{' '}
            <span className="text-white font-medium">Shipsy</span>.
          </p>
        </div>

        {/* CTA Buttons */}
        <div
          className={`flex flex-wrap gap-4 transition-all duration-700 delay-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
        >
          <a
            href="#projects"
            className="group inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-medium rounded-full hover:bg-white/90 transition-all duration-300 hover:scale-105"
          >
            View Projects
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 border border-white/20 text-white font-medium rounded-full hover:bg-white/5 hover:border-white/40 transition-all duration-300"
          >
            Get in Touch
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        className={`absolute bottom-12 left-1/2 -translate-x-1/2 transition-all duration-700 delay-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
      >
        <ScrollArrow />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/4 right-12 w-px h-32 bg-gradient-to-b from-transparent via-white/20 to-transparent hidden lg:block" />
      <div className="absolute bottom-1/4 left-12 w-px h-32 bg-gradient-to-b from-transparent via-white/20 to-transparent hidden lg:block" />
    </section>
  );
}
