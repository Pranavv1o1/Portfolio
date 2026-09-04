import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { codeFactory } from '@/data/portfolio';

gsap.registerPlugin(ScrollTrigger);

// Pinned verification pipeline: INPUT → ANALYSIS → VERIFICATION → RESULT.
// As the user scrolls, each stage activates in sequence, connection lines
// draw between stages, and node dots light up.
export function VerificationPipeline() {
  const shouldReduce = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const stageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const lineRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const dotRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    if (shouldReduce) {
      stageRefs.current.forEach((el) => el && gsap.set(el, { opacity: 1, y: 0 }));
      lineRefs.current.forEach((el) => el && gsap.set(el, { scaleX: 1, opacity: 1 }));
      dotRefs.current.forEach((el) => el && gsap.set(el, { scale: 1, opacity: 1 }));
      return;
    }

    const ctx = gsap.context(() => {
      const stages = stageRefs.current.filter(Boolean) as HTMLDivElement[];
      const lines = lineRefs.current.filter(Boolean) as HTMLSpanElement[];
      const dots = dotRefs.current.filter(Boolean) as HTMLSpanElement[];

      stages.forEach((el) => gsap.set(el, { opacity: 0.25, y: 24 }));
      lines.forEach((el) => gsap.set(el, { scaleX: 0, opacity: 0.3, transformOrigin: 'left center' }));
      dots.forEach((el) => gsap.set(el, { scale: 0.4, opacity: 0.3 }));

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 65%',
          end: 'bottom 75%',
          toggleActions: 'play none none reverse',
        },
      });

      const n = codeFactory.pipeline.length;
      codeFactory.pipeline.forEach((_, i) => {
        const pos = i * (1 / n);
        tl.to(stages[i], { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, pos);
        tl.to(dots[i], { scale: 1, opacity: 1, duration: 0.4, ease: 'power2.out' }, pos + 0.05);
        if (i < lines.length) {
          tl.to(lines[i], { scaleX: 1, opacity: 1, duration: 0.5, ease: 'power2.inOut' }, pos + 0.1);
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [shouldReduce]);

  return (
    <section ref={sectionRef} className="relative py-16" aria-label="Verification pipeline">
      <div className="relative mx-auto max-w-5xl">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
          {codeFactory.pipeline.map((stage, i) => (
            <div key={stage.stage} className="relative">
              {/* Node dot + stage label */}
              <div className="mb-4 flex items-center gap-3 lg:mb-6">
                <span
                  ref={(el) => { dotRefs.current[i] = el; }}
                  className="flex h-3 w-3 items-center justify-center rounded-full bg-ember/50 ring-4 ring-ember/10"
                />
                <span className="label-tech text-ink-low">Stage 0{i + 1}</span>
              </div>

              {/* Connector line to next stage (desktop) */}
              {i < codeFactory.pipeline.length - 1 && (
                <span
                  ref={(el) => { lineRefs.current[i] = el; }}
                  className="absolute left-[60%] top-[1.05rem] hidden h-px w-[30%] bg-ember/40 lg:block"
                  aria-hidden
                />
              )}

              {/* Stage card */}
              <div
                ref={(el) => { stageRefs.current[i] = el; }}
                className="rounded-xl border border-coffee/15 bg-stone/20 p-5 backdrop-blur-sm transition-colors duration-300"
              >
                <h3 className="font-mono text-sm font-semibold tracking-wide text-espresso">
                  {stage.stage}
                </h3>
                <p className="mt-2 text-sm font-medium text-coffee">{stage.description}</p>
                <p className="mt-2 text-xs leading-relaxed text-ink-mid">{stage.detail}</p>
              </div>

              {/* Mobile connector arrow */}
              {i < codeFactory.pipeline.length - 1 && (
                <div className="my-3 flex justify-center lg:hidden">
                  <svg width="14" height="20" viewBox="0 0 14 20" aria-hidden>
                    <path d="M7 0 L7 16 M2 11 L7 16 L12 11" stroke="var(--ember)" strokeWidth="1.2" fill="none" opacity={0.4} />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
