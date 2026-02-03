import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Database,
  BarChart3,
  Users,
  Code2,
  GitBranch,
  LineChart,
  Lightbulb,
  Target,
  Workflow,
  FileCode,
  Server,
  Sparkles,
  MessageCircle,
  MessagesSquare,
  Palette,
  BotMessageSquare,
  Search,
  Gem,
  Terminal,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface SkillCategory {
  name: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  skills: string[];
  color: string;
}

const skillCategories: SkillCategory[] = [
  {
    name: 'Data & Analytics',
    icon: Database,
    skills: ['SQL', 'Amazon Redshift', 'Python', 'Shipsy BI', 'Data Pipelines', 'Funnel Analysis'],
    color: '#3b82f6',
  },
  {
    name: 'Product Management',
    icon: Target,
    skills: ['Roadmap Planning', 'UAT', 'User Stories', 'Agile', 'Scrum', 'Prioritization'],
    color: '#a855f7',
  },
  {
    name: 'Technical Literacy',
    icon: Code2,
    skills: ['Web Architecture', 'JSON', 'REST APIs', 'Observability', 'Elastic Search'],
    color: '#22c55e',
  },
  {
    name: 'Collaboration',
    icon: Users,
    skills: ['Cross-Functional Teams', 'Stakeholder Management', 'Communication', 'Leadership'],
    color: '#f97316',
  },
];

const tools = [
  { name: 'SQL', icon: Database },
  { name: 'Python', icon: FileCode },
  { name: 'Git', icon: GitBranch },
  { name: 'REST APIs', icon: Server },
  { name: 'Analytics', icon: BarChart3 },
  { name: 'Data Viz', icon: LineChart },
  { name: 'Agile', icon: Workflow },
  { name: 'Problem Solving', icon: Lightbulb },
];

const aiTools = [
  { name: 'Cursor', icon: Terminal, color: '#00D1B2' },      // Cursor teal/cyan
  { name: 'Junie', icon: Sparkles, color: '#FF6B6B' },       // JetBrains red/coral
  { name: 'Kimi', icon: MessageCircle, color: '#667EEA' },   // Purple/indigo
  { name: 'Claude', icon: MessagesSquare, color: '#D97706' }, // Claude orange/amber
  { name: 'Lovable', icon: Palette, color: '#EC4899' },      // Pink/magenta
  { name: 'ChatGPT', icon: BotMessageSquare, color: '#10B981' }, // OpenAI green
  { name: 'Perplexity', icon: Search, color: '#8B5CF6' },    // Perplexity purple
  { name: 'Gemini', icon: Gem, color: '#4285F4' },           // Google blue
];

// Mobile-safe styles
const mobileStyles = {
  section: {
    padding: '48px 16px',
    position: 'relative' as const,
    zIndex: 50,
  },
  container: {
    maxWidth: '1400px',
    margin: '0 auto',
  },
  header: {
    textAlign: 'center' as const,
    marginBottom: '32px',
  },
  title: {
    fontSize: '24px',
    fontWeight: 700,
    color: '#ffffff',
    marginBottom: '12px',
  },
  subtitle: {
    fontSize: '14px',
    color: '#9ca3af',
    maxWidth: '400px',
    margin: '0 auto',
    lineHeight: 1.6,
  },
  skillCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '16px',
    padding: '20px',
    marginBottom: '16px',
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '16px',
  },
  iconBox: {
    width: '40px',
    height: '40px',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  categoryName: {
    fontSize: '16px',
    fontWeight: 600,
    color: '#ffffff',
  },
  tagsContainer: {
    display: 'flex',
    flexWrap: 'wrap' as const,
    gap: '8px',
  },
  skillTag: {
    padding: '6px 12px',
    fontSize: '12px',
    fontWeight: 500,
    borderRadius: '20px',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    color: '#d1d5db',
  },
  aiSection: {
    marginTop: '40px',
    marginBottom: '40px',
  },
  aiHeader: {
    textAlign: 'center' as const,
    marginBottom: '24px',
  },
  aiBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 16px',
    borderRadius: '20px',
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    marginBottom: '12px',
  },
  aiTitle: {
    fontSize: '20px',
    fontWeight: 700,
    color: '#ffffff',
    marginBottom: '8px',
  },
  aiSubtitle: {
    fontSize: '14px',
    color: '#9ca3af',
  },
  aiGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '12px',
  },
  aiToolCard: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    gap: '8px',
    padding: '12px 8px',
    borderRadius: '12px',
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
  },
  aiToolName: {
    fontSize: '10px',
    fontWeight: 500,
    color: '#e5e7eb',
    textAlign: 'center' as const,
  },
  techStackSection: {
    marginTop: '40px',
    marginBottom: '40px',
  },
  techStackTitle: {
    fontSize: '12px',
    fontWeight: 500,
    color: '#6b7280',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.1em',
    textAlign: 'center' as const,
    marginBottom: '20px',
  },
  techGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '12px',
  },
  techItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '12px 16px',
    borderRadius: '24px',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
  },
  techName: {
    fontSize: '13px',
    fontWeight: 500,
    color: '#e5e7eb',
  },
  attributesSection: {
    padding: '24px',
    borderRadius: '16px',
    background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, transparent 100%)',
    border: '1px solid rgba(59, 130, 246, 0.2)',
  },
  attributesTitle: {
    fontSize: '18px',
    fontWeight: 700,
    color: '#ffffff',
    textAlign: 'center' as const,
    marginBottom: '24px',
  },
  attributeItem: {
    textAlign: 'center' as const,
    marginBottom: '24px',
  },
  attributeIcon: {
    width: '48px',
    height: '48px',
    margin: '0 auto 12px',
    borderRadius: '50%',
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  attributeName: {
    fontSize: '14px',
    fontWeight: 600,
    color: '#ffffff',
    marginBottom: '8px',
  },
  attributeDesc: {
    fontSize: '12px',
    color: '#9ca3af',
    lineHeight: 1.5,
  },
};

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);
  const toolsRef = useRef<HTMLDivElement>(null);
  const aiToolsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Only run animations on desktop
    if (window.innerWidth < 768) return;

    const ctx = gsap.context(() => {
      // Categories reveal with 3D effect
      if (categoriesRef.current) {
        const cards = categoriesRef.current.querySelectorAll('.skill-category');
        gsap.fromTo(
          cards,
          { opacity: 0, y: 60, rotateY: -15 },
          {
            opacity: 1,
            y: 0,
            rotateY: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: categoriesRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Tools float in
      if (toolsRef.current) {
        const toolItems = toolsRef.current.querySelectorAll('.tool-item');
        gsap.fromTo(
          toolItems,
          { opacity: 0, scale: 0 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.6,
            stagger: 0.05,
            ease: 'elastic.out(1, 0.5)',
            scrollTrigger: {
              trigger: toolsRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // AI Tools reveal
      if (aiToolsRef.current) {
        const aiItems = aiToolsRef.current.querySelectorAll('.ai-tool-item');
        gsap.fromTo(
          aiItems,
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            stagger: 0.08,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: aiToolsRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Check if mobile
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <section
      ref={sectionRef}
      id="skills"
      style={isMobile ? mobileStyles.section : undefined}
      className={!isMobile ? "relative py-32 md:py-48 z-50" : undefined}
    >
      <div style={isMobile ? mobileStyles.container : undefined} className={!isMobile ? "max-w-[1400px] mx-auto px-6 md:px-12" : undefined}>
        {/* Section Title */}
        <div style={isMobile ? mobileStyles.header : undefined} className={!isMobile ? "mb-16 text-center" : undefined}>
          <h2 style={isMobile ? mobileStyles.title : undefined} className={!isMobile ? "text-section font-bold tracking-tight mb-4" : undefined}>
            SKILLS & EXPERTISE
          </h2>
          <p style={isMobile ? mobileStyles.subtitle : undefined} className={!isMobile ? "text-muted-foreground max-w-xl mx-auto" : undefined}>
            A blend of technical proficiency and product thinking, honed through
            real-world experience.
          </p>
        </div>

        {/* Skill Categories */}
        <div
          ref={categoriesRef}
          className={!isMobile ? "grid grid-cols-1 md:grid-cols-2 gap-6 mb-20" : undefined}
          style={isMobile ? { marginBottom: '32px' } : { perspective: '1000px' }}
        >
          {skillCategories.map((category) => (
            <div
              key={category.name}
              className={!isMobile ? "skill-category group p-4 md:p-8 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-500 relative overflow-hidden" : "skill-category"}
              style={isMobile ? {
                ...mobileStyles.skillCard,
                borderLeft: `3px solid ${category.color}`,
              } : { transformStyle: 'preserve-3d' }}
            >
              {/* Gradient background on hover - only on desktop */}
              {!isMobile && (
                <div className={`absolute inset-0 bg-gradient-to-br from-${category.color.split('-')[1]}-500 to-${category.color.split('-')[3]}-500 opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
              )}

              <div style={isMobile ? undefined : { position: 'relative', zIndex: 10 }}>
                <div style={isMobile ? mobileStyles.cardHeader : undefined} className={!isMobile ? "flex items-center gap-3 md:gap-4 mb-4 md:mb-6" : undefined}>
                  <div
                    style={isMobile ? {
                      ...mobileStyles.iconBox,
                      backgroundColor: `${category.color}20`,
                    } : undefined}
                    className={!isMobile ? "p-2 md:p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors group-hover:scale-110 transform duration-300 flex-shrink-0" : undefined}
                  >
                    <category.icon
                      style={isMobile ? { width: 20, height: 20, color: category.color } : undefined}
                      className={!isMobile ? "w-5 h-5 md:w-6 md:h-6 text-primary" : undefined}
                    />
                  </div>
                  <h3 style={isMobile ? mobileStyles.categoryName : undefined} className={!isMobile ? "text-base md:text-xl font-bold text-white" : undefined}>
                    {category.name}
                  </h3>
                </div>

                <div style={isMobile ? mobileStyles.tagsContainer : undefined} className={!isMobile ? "flex flex-wrap gap-1.5 md:gap-2" : undefined}>
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      style={isMobile ? mobileStyles.skillTag : undefined}
                      className={!isMobile ? "skill-tag px-2.5 py-1 md:px-4 md:py-2 text-xs md:text-sm font-medium rounded-full bg-white/5 text-muted-foreground border border-border cursor-default hover:bg-primary/10 hover:border-primary/30 hover:text-white transition-all duration-300" : undefined}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* AI Tools Section */}
        <div style={isMobile ? mobileStyles.aiSection : undefined} className={!isMobile ? "mb-16" : undefined}>
          <div style={isMobile ? mobileStyles.aiHeader : undefined} className={!isMobile ? "text-center mb-8" : undefined}>
            <div style={isMobile ? mobileStyles.aiBadge : undefined} className={!isMobile ? "inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 mb-4" : undefined}>
              <Sparkles style={isMobile ? { width: 14, height: 14, color: '#3b82f6' } : undefined} className={!isMobile ? "w-4 h-4 text-primary" : undefined} />
              <span style={isMobile ? { fontSize: '12px', fontWeight: 500, color: '#3b82f6' } : undefined} className={!isMobile ? "text-sm font-medium text-primary" : undefined}>
                AI-Powered Workflow
              </span>
            </div>
            <h3 style={isMobile ? mobileStyles.aiTitle : undefined} className={!isMobile ? "text-2xl font-bold text-white mb-2" : undefined}>
              AI Tools I Use Daily
            </h3>
            <p style={isMobile ? mobileStyles.aiSubtitle : undefined} className={!isMobile ? "text-muted-foreground" : undefined}>
              Leveraging cutting-edge AI to supercharge productivity
            </p>
          </div>

          <div
            ref={aiToolsRef}
            style={isMobile ? mobileStyles.aiGrid : undefined}
            className={!isMobile ? "grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4" : undefined}
          >
            {aiTools.map((tool) => (
              <div
                key={tool.name}
                style={isMobile ? mobileStyles.aiToolCard : undefined}
                className={!isMobile ? "ai-tool-item group flex flex-col items-center gap-2 sm:gap-3 p-2 sm:p-4 rounded-xl bg-card border border-border hover:border-primary/30 hover:bg-primary/5 transition-all duration-300 cursor-default" : "ai-tool-item"}
              >
                <div
                  style={{
                    padding: isMobile ? '8px' : '12px',
                    borderRadius: isMobile ? '8px' : '12px',
                    backgroundColor: `${tool.color}15`
                  }}
                  className={!isMobile ? "group-hover:scale-110 transition-transform duration-300" : undefined}
                >
                  <tool.icon style={{ width: isMobile ? 18 : 24, height: isMobile ? 18 : 24, color: tool.color }} />
                </div>
                <span style={isMobile ? mobileStyles.aiToolName : undefined} className={!isMobile ? "text-[10px] sm:text-sm font-medium text-foreground group-hover:text-white transition-colors text-center leading-tight" : undefined}>
                  {tool.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Tools Cloud */}
        <div style={isMobile ? mobileStyles.techStackSection : undefined} className={!isMobile ? "mb-16" : undefined}>
          <h3 style={isMobile ? mobileStyles.techStackTitle : undefined} className={!isMobile ? "text-lg font-medium text-muted-foreground uppercase tracking-wider text-center mb-8" : undefined}>
            Technical Stack
          </h3>

          <div
            ref={toolsRef}
            style={isMobile ? mobileStyles.techGrid : undefined}
            className={!isMobile ? "grid grid-cols-2 md:flex md:flex-wrap md:justify-center gap-3 md:gap-4" : undefined}
          >
            {tools.map((tool) => (
              <div
                key={tool.name}
                style={isMobile ? mobileStyles.techItem : undefined}
                className={!isMobile ? "tool-item group flex items-center gap-3 px-6 py-4 rounded-full bg-white/5 border border-border hover:border-primary/30 hover:bg-primary/5 transition-all duration-300 cursor-default" : "tool-item"}
              >
                <tool.icon style={isMobile ? { width: 16, height: 16, color: '#9ca3af' } : undefined} className={!isMobile ? "w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" : undefined} />
                <span style={isMobile ? mobileStyles.techName : undefined} className={!isMobile ? "text-sm font-medium text-foreground" : undefined}>
                  {tool.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Core Attributes */}
        <div style={isMobile ? mobileStyles.attributesSection : undefined} className={!isMobile ? "p-8 md:p-12 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent border border-primary/20" : undefined}>
          <h3 style={isMobile ? mobileStyles.attributesTitle : undefined} className={!isMobile ? "text-xl font-bold text-white mb-8 text-center" : undefined}>
            Core Attributes
          </h3>
          <div className={!isMobile ? "grid grid-cols-1 md:grid-cols-3 gap-8" : undefined}>
            <div style={isMobile ? mobileStyles.attributeItem : undefined} className={!isMobile ? "text-center group" : undefined}>
              <div style={isMobile ? mobileStyles.attributeIcon : undefined} className={!isMobile ? "w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300" : undefined}>
                <Users style={isMobile ? { width: 24, height: 24, color: '#3b82f6' } : undefined} className={!isMobile ? "w-8 h-8 text-primary" : undefined} />
              </div>
              <h4 style={isMobile ? mobileStyles.attributeName : undefined} className={!isMobile ? "text-lg font-semibold text-white mb-2" : undefined}>
                Cross-Functional Collaboration
              </h4>
              <p style={isMobile ? mobileStyles.attributeDesc : undefined} className={!isMobile ? "text-sm text-muted-foreground" : undefined}>
                Bridging gaps between engineering, design, and business teams
              </p>
            </div>
            <div style={isMobile ? mobileStyles.attributeItem : undefined} className={!isMobile ? "text-center group" : undefined}>
              <div style={isMobile ? mobileStyles.attributeIcon : undefined} className={!isMobile ? "w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300" : undefined}>
                <LineChart style={isMobile ? { width: 24, height: 24, color: '#3b82f6' } : undefined} className={!isMobile ? "w-8 h-8 text-primary" : undefined} />
              </div>
              <h4 style={isMobile ? mobileStyles.attributeName : undefined} className={!isMobile ? "text-lg font-semibold text-white mb-2" : undefined}>
                Analytical Thinking
              </h4>
              <p style={isMobile ? mobileStyles.attributeDesc : undefined} className={!isMobile ? "text-sm text-muted-foreground" : undefined}>
                Data-driven decision making with strong problem-solving skills
              </p>
            </div>
            <div style={isMobile ? { ...mobileStyles.attributeItem, marginBottom: 0 } : undefined} className={!isMobile ? "text-center group" : undefined}>
              <div style={isMobile ? mobileStyles.attributeIcon : undefined} className={!isMobile ? "w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300" : undefined}>
                <Target style={isMobile ? { width: 24, height: 24, color: '#3b82f6' } : undefined} className={!isMobile ? "w-8 h-8 text-primary" : undefined} />
              </div>
              <h4 style={isMobile ? mobileStyles.attributeName : undefined} className={!isMobile ? "text-lg font-semibold text-white mb-2" : undefined}>
                Ownership Mindset
              </h4>
              <p style={isMobile ? mobileStyles.attributeDesc : undefined} className={!isMobile ? "text-sm text-muted-foreground" : undefined}>
                Taking end-to-end responsibility for product outcomes
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

