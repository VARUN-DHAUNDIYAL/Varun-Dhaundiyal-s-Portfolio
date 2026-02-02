import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

interface TextScrambleProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  onComplete?: () => void;
}

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

export default function TextScramble({
  text,
  className = '',
  delay = 0,
  duration = 0.8,
  onComplete,
}: TextScrambleProps) {
  const elementRef = useRef<HTMLSpanElement>(null);
  const [displayText, setDisplayText] = useState('');
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (hasAnimated.current) return;
    hasAnimated.current = true;

    const finalText = text;
    const length = finalText.length;
    
    const timeout = setTimeout(() => {
      let frame = 0;
      const totalFrames = Math.floor(duration * 60);
      
      const animate = () => {
        frame++;
        const progress = frame / totalFrames;
        
        let result = '';
        for (let i = 0; i < length; i++) {
          const charProgress = Math.max(0, Math.min(1, (progress * length - i) / 3));
          
          if (finalText[i] === ' ') {
            result += ' ';
          } else if (charProgress >= 1) {
            result += finalText[i];
          } else if (charProgress > 0) {
            result += chars[Math.floor(Math.random() * chars.length)];
          } else {
            result += chars[Math.floor(Math.random() * chars.length)];
          }
        }
        
        setDisplayText(result);
        
        if (frame < totalFrames) {
          requestAnimationFrame(animate);
        } else {
          setDisplayText(finalText);
          onComplete?.();
        }
      };
      
      animate();
    }, delay * 1000);

    return () => clearTimeout(timeout);
  }, [text, delay, duration, onComplete]);

  return (
    <span ref={elementRef} className={className}>
      {displayText || text.split('').map(() => ' ').join('')}
    </span>
  );
}

// Split text animation component
interface SplitTextProps {
  text: string;
  className?: string;
  charClassName?: string;
  delay?: number;
  stagger?: number;
}

export function SplitText({
  text,
  className = '',
  charClassName = '',
  delay = 0,
  stagger = 0.03,
}: SplitTextProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (hasAnimated.current || !containerRef.current) return;
    hasAnimated.current = true;

    const chars = containerRef.current.querySelectorAll('.char');
    
    gsap.set(chars, { opacity: 0, y: 50 });
    
    gsap.to(chars, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: stagger,
      delay: delay,
      ease: 'power3.out',
    });
  }, [delay, stagger]);

  return (
    <span ref={containerRef} className={`inline-block ${className}`}>
      {text.split('').map((char, i) => (
        <span
          key={i}
          className={`char inline-block ${char === ' ' ? 'w-[0.3em]' : ''} ${charClassName}`}
          style={{ whiteSpace: 'pre' }}
        >
          {char}
        </span>
      ))}
    </span>
  );
}

// Reveal text on scroll
interface RevealTextProps {
  text: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
}

export function RevealText({ text, className = '', as: Component = 'span' }: RevealTextProps) {
  const ref = useRef<HTMLElement>(null);
  const hasRevealed = useRef(false);

  useEffect(() => {
    if (!ref.current || hasRevealed.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasRevealed.current) {
            hasRevealed.current = true;
            gsap.to(entry.target, {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: 'power2.out',
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -10% 0px' }
    );

    gsap.set(ref.current, { opacity: 0, y: 40 });
    observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  return (
    <Component
      ref={ref as React.RefObject<HTMLHeadingElement & HTMLParagraphElement & HTMLSpanElement>}
      className={className}
    >
      {text}
    </Component>
  );
}
