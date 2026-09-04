import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { codeFactory } from '@/data/portfolio';

// Animated terminal that types out the pipeline output when scrolled into view.
export function TerminalOutput() {
  const shouldReduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [lineCount, setLineCount] = useState(0);
  const [typed, setTyped] = useState(0);

  const lines = codeFactory.terminalLines;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!visible || lineCount >= lines.length) return;
    const line = lines[lineCount];
    const delay = line.type === 'cmd' ? 420 : line.text.length * 14 + 220;
    const t = setTimeout(() => setLineCount((c) => c + 1), delay);
    return () => clearTimeout(t);
  }, [visible, lineCount, lines]);

  useEffect(() => {
    if (!visible || lineCount === 0) return;
    const line = lines[lineCount - 1];
    if (typed >= line.text.length) return;
    const t = setTimeout(() => setTyped((t) => t + 1), 18);
    return () => clearTimeout(t);
  }, [visible, lineCount, typed, lines]);

  useEffect(() => setTyped(0), [lineCount]);

  const colorFor = (type: string) => {
    switch (type) {
      case 'cmd':
        return 'text-paper';
      case 'ok':
        return 'text-ember';
      case 'warn':
        return 'text-stone';
      default:
        return 'text-stone/80';
    }
  };

  return (
    <div
      ref={ref}
      className="relative overflow-hidden rounded-xl border border-espresso/30 bg-espresso/95 backdrop-blur-sm"
    >
      {/* Title bar */}
      <div className="flex items-center justify-between border-b border-paper/10 px-4 py-2.5">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-ember/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-stone/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-coffee/70" />
        </div>
        <span className="font-mono text-[0.6875rem] tracking-widest text-paper/50 uppercase">
          code-factory — run
        </span>
        <span className="h-2.5 w-2.5" />
      </div>

      {/* Terminal body */}
      <div className="h-72 overflow-hidden p-4 font-mono text-xs leading-relaxed sm:text-sm">
        {lines.slice(0, lineCount).map((line, i) => {
          const isCurrent = i === lineCount - 1;
          const shown = isCurrent ? line.text.slice(0, typed) : line.text;
          return (
            <motion.div
              key={i}
              initial={shouldReduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.15 }}
              className={colorFor(line.type)}
            >
              {shown}
              {isCurrent && (
                <span className="ml-0.5 inline-block h-3.5 w-1.5 animate-pulse bg-ember align-middle" />
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
