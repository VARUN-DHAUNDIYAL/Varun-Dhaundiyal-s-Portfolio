import { useEffect, useState, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

// Components
import FluidBackground from './components/FluidBackground';
import ProgressBar from './components/ProgressBar';
import Navbar from './components/Navbar';
// import { NavigationPill } from './components/ProgressBar';
import LoadingScreen from './components/LoadingScreen';
import ParticleCursor from './components/ParticleCursor';

// Sections
import Hero from './sections/Hero';
import About from './sections/About';
import Experience from './sections/Experience';
import Projects from './sections/Projects';
import Skills from './sections/Skills';
import Contact from './sections/Contact';

// Pages
import CodeSmithPage from './pages/CodeSmith';
import ElenEmberPage from './pages/ElenEmber';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

function HomePage() {
  const [isLoading, setIsLoading] = useState(true);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (isLoading) return;

    // Detect mobile for optimized settings
    const isMobile = window.innerWidth < 768;

    const lenis = new Lenis({
      duration: isMobile ? 0.8 : 1.2, // Faster on mobile
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: isMobile ? 1.5 : 2, // Less sensitive on mobile
    });

    lenisRef.current = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
    };
  }, [isLoading]);

  useEffect(() => {
    if (!isLoading) {
      ScrollTrigger.refresh();
    }
  }, [isLoading]);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}
      <Navbar />
      <FluidBackground />
      <ProgressBar />
      {/* <NavigationPill /> Removed in favor of Navbar */}
      <ParticleCursor />

      <main className="relative z-10">
        <section id="hero">
          <Hero />
        </section>
        <div id="about"><About /></div>
        <div id="experience"><Experience /></div>
        <div id="projects"><Projects /></div>
        <div id="skills"><Skills /></div>
        <div id="contact"><Contact /></div>
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects/code-smith" element={<CodeSmithPage />} />
        <Route path="/projects/elen-ember" element={<ElenEmberPage />} />
      </Routes>
    </Router>
  );
}

export default App;
