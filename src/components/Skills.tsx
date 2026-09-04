import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { skillCategories } from '@/data/portfolio';
import { Reveal } from '@/components/Reveal';

// Skills as a discovered workspace within the same world.
// Selecting a category subtly shifts the surrounding atmosphere.
export function Skills() {
  const shouldReduce = useReducedMotion();
  const [active, setActive] = useState(skillCategories[0].name);
  const current =
    skillCategories.find((c) => c.name === active) ?? skillCategories[0];

  return (
    <section id="skills" className="relative px-6 py-28 sm:py-36">
      {/* Atmospheric wash that shifts with the active category */}
      <AnimatePresence>
        <motion.div
          key={active}
          className="pointer-events-none absolute inset-0 -z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: shouldReduce ? 0.5 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
          style={{
            background:
              'radial-gradient(60% 50% at 70% 50%, rgba(235,94,40,0.05) 0%, transparent 70%)',
          }}
        />
      </AnimatePresence>

      <div className="mx-auto max-w-6xl">
        <Reveal className="mb-16 flex items-center gap-4">
          <span className="label-tech text-coffee">/ 02 — Skills</span>
          <span className="h-px flex-1 bg-gradient-to-r from-ember/30 to-transparent" />
        </Reveal>

        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          {/* Category selector */}
          <div>
            <Reveal>
              <h2 className="font-display text-3xl font-normal leading-tight text-coffee sm:text-4xl">
                Technical
                <br />
                <span className="text-ink-mid">toolkit</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-5 max-w-xs text-sm leading-relaxed text-ink-mid">
                Technologies I reach for, grouped by where they fit in the
                build process.
              </p>
            </Reveal>

            <div className="mt-10 flex flex-col gap-1">
              {skillCategories.map((cat, i) => {
                const isActive = active === cat.name;
                return (
                  <Reveal key={cat.name} delay={0.15 + i * 0.06}>
                    <button
                      onClick={() => setActive(cat.name)}
                      className="group relative flex w-full items-center justify-between rounded-lg px-4 py-3.5 text-left transition-colors duration-300"
                      style={{
                        background: isActive ? 'rgba(235,94,40,0.1)' : 'transparent',
                        color: isActive ? 'var(--coffee)' : 'var(--ink-mid)',
                      }}
                    >
                      <span className="flex items-center gap-3">
                        <span
                          className="h-1.5 w-1.5 rounded-full transition-colors duration-300"
                          style={{
                            background: isActive
                              ? 'var(--ember)'
                              : 'rgba(64,61,57,0.3)',
                          }}
                        />
                        <span className="font-display text-base font-medium">
                          {cat.label}
                        </span>
                      </span>
                      <span className="label-tech">{cat.items.length}</span>
                    </button>
                  </Reveal>
                );
              })}
            </div>
          </div>

          {/* Active category panel — the workspace surface */}
          <div className="relative min-h-[18rem]">
            <div className="absolute -inset-2 rounded-2xl border border-coffee/10" />
            <div className="relative h-full rounded-2xl light-panel p-7 sm:p-9">
              <div className="mb-7 flex items-center justify-between">
                <span className="label-tech text-coffee">
                  {current.label}
                </span>
                <span className="label-tech">module · {current.name}</span>
              </div>

              <div className="flex flex-wrap gap-2.5">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={current.name}
                    initial={shouldReduce ? false : { opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={shouldReduce ? {} : { opacity: 0, y: -12 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="flex flex-wrap gap-2.5"
                  >
                    {current.items.map((item, i) => (
                      <motion.span
                        key={item}
                        initial={
                          shouldReduce ? false : { opacity: 0, scale: 0.94 }
                        }
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.06, duration: 0.4 }}
                        className="group relative inline-flex cursor-default items-center rounded-lg border border-coffee/15 bg-paper/50 px-4 py-2.5 font-mono text-sm text-ink-mid transition-all duration-300 hover:border-ember/40 hover:bg-ember/10 hover:text-coffee"
                      >
                        <span className="mr-2 text-ember/60">{'>'}</span>
                        {item}
                      </motion.span>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="mt-10 flex items-center gap-2 border-t border-coffee/12 pt-5">
                <span className="h-1.5 w-1.5 rounded-full bg-ember/70 animate-pulse-soft" />
                <span className="label-tech text-coffee">toolkit · live</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
