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
  icon: React.ComponentType<{ className?: string }>;
  skills: string[];
  color: string;
}

const skillCategories: SkillCategory[] = [
  {
    name: 'Data & Analytics',
    icon: Database,
    skills: ['SQL', 'Amazon Redshift', 'Python', 'Shipsy BI', 'Data Pipelines', 'Funnel Analysis'],
    color: 'from-blue-500 to-cyan-500',
  },
  {
    name: 'Product Management',
    icon: Target,
    skills: ['Roadmap Planning', 'UAT', 'User Stories', 'Agile', 'Scrum', 'Prioritization'],
    color: 'from-purple-500 to-pink-500',
  },
  {
    name: 'Technical Literacy',
    icon: Code2,
    skills: ['Web Architecture', 'JSON', 'REST APIs', 'Observability', 'Elastic Search'],
    color: 'from-green-500 to-emerald-500',
  },
  {
    name: 'Collaboration',
    icon: Users,
    skills: ['Cross-Functional Teams', 'Stakeholder Management', 'Communication', 'Leadership'],
    color: 'from-orange-500 to-amber-500',
  },
];

const tools = [
  { name: 'SQL', icon: Database },
  { name: 'Python', icon: FileCode },
  { name: 'Git', icon: GitBranch },
  { name: 'Analytics', icon: BarChart3 },
  { name: 'REST APIs', icon: Server },
  { name: 'Data Viz', icon: LineChart },
  { name: 'Problem Solving', icon: Lightbulb },
  { name: 'Agile', icon: Workflow },
];

const aiTools = [
  { name: 'Cursor', icon: Code2, color: 'text-emerald-400' },
  { name: 'Junie JetBrains', icon: Terminal, color: 'text-blue-400' },
  { name: 'Kimi', icon: MessageCircle, color: 'text-cyan-400' },
  { name: 'Claude', icon: MessagesSquare, color: 'text-orange-400' },
  { name: 'Lovable', icon: Palette, color: 'text-pink-400' },
  { name: 'ChatGPT', icon: BotMessageSquare, color: 'text-green-400' },
  { name: 'Perplexity', icon: Search, color: 'text-purple-400' },
  { name: 'Gemini', icon: Gem, color: 'text-indigo-400' },
];

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);
  const toolsRef = useRef<HTMLDivElement>(null);
  const aiToolsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

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

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative py-32 md:py-48 z-50"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Section Title */}
        <div className="mb-16 text-center">
          <h2 className="text-section font-bold tracking-tight mb-4">
            SKILLS & EXPERTISE
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            A blend of technical proficiency and product thinking, honed through
            real-world experience.
          </p>
        </div>

        {/* Skill Categories */}
        <div
          ref={categoriesRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20"
          style={{ perspective: '1000px' }}
        >
          {skillCategories.map((category) => (
            <div
              key={category.name}
              className="skill-category group p-8 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-500 relative overflow-hidden"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Gradient background on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors group-hover:scale-110 transform duration-300">
                    <category.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-white">{category.name}</h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="skill-tag px-4 py-2 text-sm font-medium rounded-full bg-white/5 text-muted-foreground border border-border cursor-default hover:bg-primary/10 hover:border-primary/30 hover:text-white transition-all duration-300"
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
        <div className="mb-16">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 mb-4">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">AI-Powered Workflow</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">AI Tools I Use Daily</h3>
            <p className="text-muted-foreground">Leveraging cutting-edge AI to supercharge productivity</p>
          </div>

          <div
            ref={aiToolsRef}
            className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4"
          >
            {aiTools.map((tool) => (
              <div
                key={tool.name}
                className="ai-tool-item group flex flex-col items-center gap-2 sm:gap-3 p-2 sm:p-4 rounded-xl bg-card border border-border hover:border-primary/30 hover:bg-primary/5 transition-all duration-300 cursor-default"
              >
                <div className={`p-2 sm:p-3 rounded-lg bg-white/5 group-hover:scale-110 transition-transform duration-300`}>
                  <tool.icon className={`w-4 h-4 sm:w-6 sm:h-6 ${tool.color}`} />
                </div>
                <span className="text-[10px] sm:text-sm font-medium text-foreground group-hover:text-white transition-colors text-center leading-tight">
                  {tool.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Tools Cloud */}
        <div className="mb-16">
          <h3 className="text-lg font-medium text-muted-foreground uppercase tracking-wider text-center mb-8">
            Technical Stack
          </h3>

          <div
            ref={toolsRef}
            className="flex flex-wrap justify-center gap-4"
          >
            {tools.map((tool) => (
              <div
                key={tool.name}
                className="tool-item group flex items-center gap-3 px-6 py-4 rounded-full bg-white/5 border border-border hover:border-primary/30 hover:bg-primary/5 transition-all duration-300 cursor-default"
              >
                <tool.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                <span className="text-sm font-medium text-foreground">{tool.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Core Attributes */}
        <div className="p-8 md:p-12 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent border border-primary/20">
          <h3 className="text-xl font-bold text-white mb-8 text-center">
            Core Attributes
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">
                Cross-Functional Collaboration
              </h4>
              <p className="text-sm text-muted-foreground">
                Bridging gaps between engineering, design, and business teams
              </p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                <LineChart className="w-8 h-8 text-primary" />
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">
                Analytical Thinking
              </h4>
              <p className="text-sm text-muted-foreground">
                Data-driven decision making with strong problem-solving skills
              </p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                <Target className="w-8 h-8 text-primary" />
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">
                Ownership Mindset
              </h4>
              <p className="text-sm text-muted-foreground">
                Taking end-to-end responsibility for product outcomes
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
