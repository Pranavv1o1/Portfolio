import { useRef, useState } from 'react';
import { useScroll, useTransform, useMotionValueEvent, type MotionValue } from 'framer-motion';
import { AnimatedBackground } from '@/components/AnimatedBackground';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Skills } from '@/components/Skills';
import { CodeFactoryExperience } from '@/components/CodeFactoryExperience';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';
import { navLinks } from '@/data/portfolio';

function App() {
  const [active, setActive] = useState('home');
  const mainRef = useRef<HTMLElement>(null);

  // Atmosphere: 0 at the top (light hero), peaks at 1 around Code Factory,
  // then settles back toward 0 at the contact ending.
  const { scrollYProgress } = useScroll();
  const atmosphere: MotionValue<number> = useTransform(
    scrollYProgress,
    [0, 0.35, 0.6, 0.85, 1],
    [0, 0.2, 1, 0.8, 0.3]
  );

  // Track the active section for navigation highlighting.
  useMotionValueEvent(scrollYProgress, 'change', () => {
    const sections = navLinks
      .map((l) => document.getElementById(l.id))
      .filter((el): el is HTMLElement => el !== null);
    const center = window.innerHeight * 0.4;
    let best: { id: string; dist: number } = { id: active, dist: Infinity };
    for (const s of sections) {
      const rect = s.getBoundingClientRect();
      if (rect.top <= center && rect.bottom >= center) {
        best = { id: s.id, dist: 0 };
        break;
      }
      const dist = Math.min(Math.abs(rect.top - center), Math.abs(rect.bottom - center));
      if (dist < best.dist) best = { id: s.id, dist };
    }
    setActive(best.id);
  });

  const handleNavigate = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="relative min-h-screen">
      <AnimatedBackground atmosphere={atmosphere} />
      <Navbar active={active} onNavigate={handleNavigate} />

      <main ref={mainRef}>
        <Hero onNavigate={handleNavigate} />
        <About />
        <Skills />
        <CodeFactoryExperience />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}

export default App;
