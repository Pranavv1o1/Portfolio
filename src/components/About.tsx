import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { aboutContent } from '@/data/portfolio';
import { Reveal } from '@/components/Reveal';

// About: the scene settles into a more intimate editorial space.
// A large panel rises into view as the camera settles from the hero.
export function About() {
  const shouldReduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'start 20%'],
  });

  const panelY = useTransform(scrollYProgress, [0, 1], [60, 0]);
  const panelOpacity = useTransform(scrollYProgress, [0, 1], [0.4, 1]);

  return (
    <section ref={ref} id="about" className="relative px-6 py-28 sm:py-36">
      <div className="mx-auto max-w-6xl">
        {/* Section header */}
        <Reveal className="mb-16 flex items-center gap-4">
          <span className="label-tech text-coffee">/ 01 — About</span>
          <span className="h-px flex-1 bg-gradient-to-r from-ember/30 to-transparent" />
        </Reveal>

        <div className="grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          {/* Left: editorial introduction */}
          <div>
            <Reveal>
              <h2 className="font-display text-3xl font-normal leading-tight text-coffee sm:text-4xl md:text-5xl">
                {aboutContent.lead.split(',').map((part, i, arr) => (
                  <span key={i}>
                    {part}
                    {i < arr.length - 1 ? ',' : ''}
                    {i < arr.length - 1 ? ' ' : ''}
                  </span>
                ))}
              </h2>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mt-7 max-w-lg text-base leading-relaxed text-ink-mid">
                {aboutContent.body}
              </p>
            </Reveal>

            {/* Traits as editorial metadata panels */}
            <div className="mt-12 space-y-px overflow-hidden rounded-xl border border-coffee/12">
              {aboutContent.traits.map((trait, i) => (
                <Reveal key={trait.label} delay={0.15 + i * 0.08}>
                  <div className="group flex items-start gap-5 bg-paper/60 px-5 py-5 transition-colors duration-300 hover:bg-ember/5">
                    <span className="label-tech mt-1 w-20 shrink-0 text-coffee">
                      {trait.label}
                    </span>
                    <div className="min-0">
                      <p className="font-display text-base font-medium text-coffee">
                        {trait.value}
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-ink-mid">
                        {trait.detail}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Right: journey — panel rises into the scene */}
          <motion.div
            style={{ y: shouldReduce ? 0 : panelY, opacity: shouldReduce ? 1 : panelOpacity }}
          >
            <Reveal delay={0.1}>
              <div className="mb-8 flex items-center gap-3">
                <span className="label-tech text-coffee">Journey</span>
                <span className="h-px flex-1 bg-ember/25" />
              </div>
            </Reveal>

            <div className="relative pl-8">
              <span className="absolute left-2 top-1 h-full w-px bg-gradient-to-b from-ember/40 via-ember/20 to-transparent" />

              {aboutContent.journey.map((step, i) => (
                <Reveal key={step.phase} delay={0.15 + i * 0.12}>
                  <div className="relative pb-12 last:pb-0">
                    <span className="absolute -left-[1.95rem] top-1.5 flex h-4 w-4 items-center justify-center">
                      <span className="h-4 w-4 rounded-full border border-ember/40 bg-paper" />
                      <motion.span
                        animate={
                          shouldReduce
                            ? {}
                            : { scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }
                        }
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          delay: i * 0.6,
                          ease: 'easeInOut',
                        }}
                        className="absolute h-4 w-4 rounded-full bg-ember/30"
                      />
                    </span>

                    <p className="label-tech mb-2 text-coffee">0{i + 1}</p>
                    <h3 className="font-display text-xl font-medium text-coffee">
                      {step.phase}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-mid">
                      {step.description}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
