import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowDownRight, Download } from 'lucide-react';
import { profile } from '@/data/portfolio';

type Props = {
  onNavigate: (id: string) => void;
};

// Cinematic hero: portrait on the left as a large editorial photograph,
// typography and content on the right. Layered parallax, camera-like scale
// and drift as the user scrolls.
export function Hero({ onNavigate }: Props) {
  const shouldReduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const yContent = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const yLabel = useTransform(scrollYProgress, [0, 1], ['0%', '-30%']);

  // Portrait parallax — subtle vertical drift only, no opacity fade
  const yPortrait = useTransform(scrollYProgress, [0, 1], ['0%', '-8%']);

  const nameWords = profile.name.split(' ');
  const container = {
    hidden: {},
    show: {
      transition: { staggerChildren: shouldReduce ? 0 : 0.15, delayChildren: 0.2 },
    },
  };
  const word = {
    hidden: { opacity: 0, y: shouldReduce ? 0 : 40, filter: 'blur(8px)' },
    show: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 1, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  return (
    <section
      ref={ref}
      id="home"
      className="relative flex min-h-[100svh] items-center overflow-hidden px-6"
    >
      {/* Foreground decorative contour layer — moves slower (depth) */}
      <motion.div
        className="topo-lines pointer-events-none absolute inset-0 opacity-[0.4]"
        style={{
          y: shouldReduce ? 0 : yLabel,
          maskImage:
            'radial-gradient(80% 70% at 50% 50%, black 10%, transparent 80%)',
          WebkitMaskImage:
            'radial-gradient(80% 70% at 50% 50%, black 10%, transparent 80%)',
        }}
      />

      {/* Two-column layout: portrait left, content right */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center gap-8 lg:flex-row lg:items-center lg:gap-16">
        {/* LEFT — Portrait */}
        <motion.div
          className="pointer-events-none relative w-full max-w-sm shrink-0 lg:w-[40%] lg:max-w-md"
          style={{ y: shouldReduce ? 0 : yPortrait }}
        >
          {/* Subtle ember glow behind portrait */}
          <div
            className="absolute inset-0 -z-10"
            style={{
              background:
                'radial-gradient(circle at 50% 50%, rgba(235,94,40,0.05) 0%, transparent 70%)',
            }}
          />

          {/* Mobile portrait — stacked above text, face clearly visible */}
          <motion.div
            initial={shouldReduce ? false : { opacity: 0, scale: 1.04, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.4, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto aspect-[3/4] w-full max-w-[280px] overflow-hidden rounded-sm lg:hidden"
            style={{
              maskImage:
                'linear-gradient(to bottom, black 85%, transparent 100%)',
              WebkitMaskImage:
                'linear-gradient(to bottom, black 85%, transparent 100%)',
            }}
          >
            <img
              src={`${import.meta.env.BASE_URL}images/me_in_suit.jpeg`}
              alt={profile.name}
              className="h-full w-full object-cover object-top"
            />
          </motion.div>

          {/* Desktop portrait — large, left side, fully opaque */}
          <motion.div
            initial={shouldReduce ? false : { opacity: 0, scale: 1.04, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.4, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative hidden aspect-[3/4] w-full overflow-hidden rounded-sm lg:block"
            style={{
              maskImage:
                'linear-gradient(to right, black 80%, transparent 100%), linear-gradient(to bottom, black 90%, transparent 100%)',
              WebkitMaskImage:
                'linear-gradient(to right, black 80%, transparent 100%), linear-gradient(to bottom, black 90%, transparent 100%)',
              maskComposite: 'intersect',
              WebkitMaskComposite: 'source-in',
            }}
          >
            <img
              src={`${import.meta.env.BASE_URL}images/me_in_suit.jpeg`}
              alt={profile.name}
              className="h-full w-full object-cover object-top"
            />
          </motion.div>
        </motion.div>

        {/* RIGHT — Content (scales and drifts as camera moves forward) */}
        <motion.div
          style={{ scale: shouldReduce ? 1 : scale, y: shouldReduce ? 0 : yContent, opacity }}
          className="flex flex-1 flex-col items-center text-center lg:items-start lg:text-left"
        >
          {/* Metadata strip */}
          <motion.div
            initial={shouldReduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.05 }}
            className="mb-10 flex items-center gap-3"
          >
            <span className="h-px w-8 bg-ember/30" />
            <span className="label-tech text-coffee">Portfolio · 2026</span>
            <span className="h-px w-8 bg-ember/30" />
          </motion.div>

          {/* Name — word by word reveal */}
          <motion.h1
            variants={container}
            initial="hidden"
            animate="show"
            className="font-display font-medium text-coffee leading-[0.9] tracking-tight"
            style={{ fontSize: 'clamp(2.75rem, 9vw, 7rem)' }}
          >
            {nameWords.map((w, i) => (
              <motion.span key={i} variants={word} className="inline-block">
                {w}
                {i < nameWords.length - 1 ? '\u00A0' : ''}
              </motion.span>
            ))}
          </motion.h1>

          {/* Role */}
          <motion.div
            initial={shouldReduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6"
          >
            <span className="label-tech text-coffee">{profile.role}</span>
          </motion.div>

          {/* Intro */}
          <motion.p
            initial={shouldReduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 max-w-xl text-balance text-base leading-relaxed text-ink-mid sm:text-lg"
          >
            {profile.intro}
          </motion.p>

          {/* CTA Group */}
          <motion.div
            initial={shouldReduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.25, ease: [0.22, 1, 0.36, 1] }}
            className="mt-12 flex flex-wrap items-center justify-center gap-4 lg:justify-start"
          >
            <a
              href={`${import.meta.env.BASE_URL}Pranav_Saraswat_CV.pdf`}
              download="Pranav_Saraswat_CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Download Pranav Saraswat's CV as PDF"
              className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-xl border border-ember/40 bg-ember px-6 py-3.5 text-sm font-medium text-paper shadow-sm transition-all duration-300 hover:bg-ember/90 hover:border-ember/60 hover:shadow-md hover:shadow-ember/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember focus-visible:ring-offset-2"
            >
              <Download
                size={16}
                className="relative z-10 transition-transform duration-300 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
              <span className="relative z-10">Download CV</span>
              <span className="absolute inset-0 translate-y-full bg-espresso/15 transition-transform duration-500 group-hover:translate-y-0" />
            </a>

            <button
              onClick={() => onNavigate('code-factory')}
              className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-xl border border-ember/30 bg-ember/8 px-6 py-3.5 text-sm font-medium text-coffee transition-all duration-300 hover:border-ember/50 hover:bg-ember/12 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember focus-visible:ring-offset-2"
            >
              <span className="relative z-10">{profile.heroCta}</span>
              <ArrowDownRight
                size={16}
                className="relative z-10 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5"
                aria-hidden="true"
              />
              <span className="absolute inset-0 translate-y-full bg-ember/15 transition-transform duration-500 group-hover:translate-y-0" />
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={shouldReduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        style={{ opacity: shouldReduce ? 1 : opacity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="label-tech">Scroll</span>
        <motion.span
          animate={shouldReduce ? {} : { y: [0, 6, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          className="h-6 w-px bg-gradient-to-b from-ember/40 to-transparent"
        />
      </motion.div>
    </section>
  );
}
