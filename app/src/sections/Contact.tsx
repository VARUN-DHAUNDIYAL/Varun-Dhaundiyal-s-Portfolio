import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Linkedin, Github, Mail, ArrowUpRight, Send } from 'lucide-react';
import MagneticButton, { SocialLink } from '../components/MagneticButton';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');

  useEffect(() => {
    if (!sectionRef.current || !contentRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 100 },
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: '8937fcac-ccde-4245-8bd4-39d8682a3510',
          name: formData.name,
          email: formData.email,
          message: formData.message,
          subject: `Portfolio Contact: ${formData.name}`,
          from_name: 'Varun Portfolio',
        })
      });

      const result = await response.json();

      if (result.success) {
        setSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        throw new Error(result.message || 'Failed to send message');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitError('Failed to send message. Please try emailing directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-32 md:py-48 z-60"
    >
      <div
        ref={contentRef}
        className="max-w-[1400px] mx-auto px-6 md:px-12"
      >
        {/* Main CTA */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            LET'S BUILD
            <br />
            <span className="text-primary">SOMETHING GREAT</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Open to opportunities and collaborations. Whether you have a project in mind
            or just want to connect, I'd love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Contact Form */}
          <div className="order-2 lg:order-1">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-muted-foreground mb-2"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent border-b border-border py-4 text-white text-lg focus:outline-none focus:border-primary transition-colors placeholder:text-muted-foreground/50"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-muted-foreground mb-2"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent border-b border-border py-4 text-white text-lg focus:outline-none focus:border-primary transition-colors placeholder:text-muted-foreground/50"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-muted-foreground mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full bg-transparent border-b border-border py-4 text-white text-lg focus:outline-none focus:border-primary transition-colors resize-none placeholder:text-muted-foreground/50"
                  placeholder="Tell me about your project..."
                />
              </div>

              {/* Error Message */}
              {submitError && (
                <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                  {submitError}
                </div>
              )}

              <MagneticButton
                onClick={() => { }}
                className="w-full md:w-auto"
                strength={0.2}
              >
                <button
                  type="submit"
                  disabled={isSubmitting || submitted}
                  className="flex items-center justify-center gap-3 w-full"
                >
                  {submitted ? (
                    <>
                      Message Sent!
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </>
                  ) : isSubmitting ? (
                    <>
                      Sending...
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="w-5 h-5" />
                    </>
                  )}
                </button>
              </MagneticButton>
            </form>
          </div>

          {/* Contact Info */}
          <div className="order-1 lg:order-2 space-y-12">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-6">
                Connect With Me
              </h3>
              <div className="space-y-4">
                <SocialLink
                  href="https://linkedin.com/in/varun-dhaundiyal"
                  icon={<Linkedin className="w-5 h-5" />}
                  label="LinkedIn"
                />
                <SocialLink
                  href="https://github.com/VARUN-DHAUNDIYAL"
                  icon={<Github className="w-5 h-5" />}
                  label="GitHub"
                />
                <SocialLink
                  href="mailto:varundhaundiyal1@gmail.com"
                  icon={<Mail className="w-5 h-5" />}
                  label="varundhaundiyal1@gmail.com"
                />
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-6">
                Quick Links
              </h3>
              <div className="space-y-3">
                <a
                  href="https://drive.google.com/file/d/13rHBvTRVHikcJG7J113nK719woQjvr_v/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 text-foreground hover:text-primary transition-colors"
                >
                  <span>Varun's Resume</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </a>
                <a
                  href="https://sequoia-boat-6eb.notion.site/Code-Smith-The-AI-Powered-Collaborative-Coding-Platform-244d0c26064080e3be06d094c66291f4"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 text-foreground hover:text-primary transition-colors"
                >
                  <span>View Code-Smith PRD</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </a>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-card border border-border">
              <p className="text-sm text-muted-foreground mb-2">Based in</p>
              <p className="text-lg font-medium text-white">Gurugram, India</p>
              <p className="text-sm text-muted-foreground mt-1">
                Open to relocation & remote opportunities
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-32 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Varun Dhaundiyal. All rights reserved.
            </p>
            <p className="text-sm text-muted-foreground text-center md:text-right">
              This portfolio website was made using <span className="text-primary">Kimi</span> and <span className="text-primary">Antigravity</span>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
