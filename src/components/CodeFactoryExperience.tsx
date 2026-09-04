import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { Check, GitBranch, Link2, ShieldCheck } from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import { VerificationPipeline } from '@/components/VerificationPipeline';
import { TerminalOutput } from '@/components/TerminalOutput';
import { TechnicalInfoPanel } from '@/components/TechnicalInfoPanel';
import { codeFactory } from '@/data/portfolio';

// Code Factory: the main event. The portfolio environment gradually shifts
// into a more structured technical workspace.
export function CodeFactoryExperience() {
  const shouldReduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Scene deepens: a subtle espresso wash grows as we enter Code Factory.
  const deepening = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 0.6, 0.6, 0]);
  const titleY = useTransform(scrollYProgress, [0, 0.4], ['20%', '0%']);

  return (
    <section ref={ref} id="code-factory" className="relative px-6 py-28 sm:py-36">
      {/* Scene transition wash — entering the technical workspace */}
      <motion.div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(80% 60% at 50% 50%, rgba(37,36,34,0.08) 0%, transparent 70%)',
          opacity: shouldReduce ? 0 : deepening,
        }}
      />

      <div className="mx-auto max-w-6xl">
        {/* Section header */}
        <Reveal className="mb-12 flex items-center gap-4">
          <span className="label-tech text-coffee">/ 03 — Featured Work</span>
          <span className="h-px flex-1 bg-gradient-to-r from-ember/30 to-transparent" />
        </Reveal>

        {/* Project label */}
        <Reveal>
          <div className="mb-4">
            <span className="label-tech text-coffee">{codeFactory.label}</span>
          </div>
        </Reveal>

        {/* Title — moves into place as camera approaches */}
        <motion.div style={{ y: shouldReduce ? 0 : titleY }}>
          <Reveal delay={0.05}>
            <h2
              className="font-display font-medium leading-[0.95] tracking-tight text-espresso"
              style={{ fontSize: 'clamp(2.75rem, 9vw, 6.5rem)' }}
            >
              {codeFactory.title}
            </h2>
          </Reveal>
        </motion.div>

        <Reveal delay={0.1}>
          <p className="mt-4 font-mono text-sm text-ember">{codeFactory.tagline}</p>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-mid sm:text-lg">
            {codeFactory.description}
          </p>
        </Reveal>

        {/* Verification pipeline */}
        <div className="mt-20">
          <Reveal>
            <div className="mb-8 flex items-center gap-3">
              <span className="label-tech text-coffee">Pipeline</span>
              <span className="h-px flex-1 bg-ember/25" />
              <span className="label-tech text-ink-low">flow</span>
            </div>
          </Reveal>
          <VerificationPipeline />
        </div>

        {/* Terminal + highlights */}
        <div className="mt-20 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
          <Reveal>
            <div className="mb-4 flex items-center gap-3">
              <span className="label-tech text-coffee">Live Run</span>
              <span className="h-px flex-1 bg-ember/25" />
            </div>
            <TerminalOutput />
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mb-4 flex items-center gap-3">
              <span className="label-tech text-coffee">Verified Progress</span>
              <span className="h-px flex-1 bg-ember/25" />
            </div>
            <ul className="space-y-px overflow-hidden rounded-xl border border-coffee/15">
              {codeFactory.highlights.map((h, i) => (
                <motion.li
                  key={h.title}
                  initial={shouldReduce ? false : { opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="group flex items-start gap-3.5 bg-stone/20 px-5 py-4 transition-colors duration-300 hover:bg-stone/35"
                >
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-ember/30 bg-ember/10">
                    <Check size={12} className="text-ember" />
                  </span>
                  <div>
                    <p className="font-display text-sm font-medium text-espresso">{h.title}</p>
                    <p className="mt-1 text-xs leading-relaxed text-ink-mid">{h.detail}</p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* Architecture + status */}
        <div className="mt-10 grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:gap-8">
          <Reveal>
            <TechnicalInfoPanel />
          </Reveal>

          <Reveal delay={0.1}>
            <div className="flex h-full flex-col justify-between rounded-xl border border-coffee/15 bg-stone/20 p-6 backdrop-blur-sm">
              <div>
                <div className="mb-4 flex items-center gap-2.5">
                  <ShieldCheck size={16} className="text-ember" />
                  <span className="label-tech text-coffee">Status</span>
                </div>
                <div className="space-y-3 font-mono text-xs">
                  <div className="flex justify-between">
                    <span className="text-ink-mid">pipeline</span>
                    <span className="text-ember">end-to-end · live</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-ink-mid">regression</span>
                    <span className="text-ember">vulnerable + secure</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-ink-mid">generalization</span>
                    <span className="text-ember">AST-based</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-ink-mid">regeneration</span>
                    <span className="text-ember">clean · each run</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex gap-3 border-t border-coffee/15 pt-5">
                <button
                  disabled={!codeFactory.links.repository}
                  className="inline-flex items-center gap-2 rounded-lg border border-coffee/20 px-3.5 py-2 text-xs text-ink-mid transition-colors enabled:hover:border-ember/45 enabled:hover:text-espresso disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <GitBranch size={13} />
                  Repository
                </button>
                <button
                  disabled={!codeFactory.links.live}
                  className="inline-flex items-center gap-2 rounded-lg border border-coffee/20 px-3.5 py-2 text-xs text-ink-mid transition-colors enabled:hover:border-ember/45 enabled:hover:text-espresso disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <Link2 size={13} />
                  Live
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
