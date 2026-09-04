import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ChevronDown, Layers } from 'lucide-react';
import { codeFactory } from '@/data/portfolio';

export function TechnicalInfoPanel() {
  const shouldReduce = useReducedMotion();
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-xl border border-coffee/15 bg-stone/20 backdrop-blur-sm">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between px-5 py-4 text-left transition-colors hover:bg-stone/30"
        aria-expanded={open}
      >
        <span className="flex items-center gap-3">
          <Layers size={16} className="text-ember" />
          <span className="font-display text-sm font-medium text-espresso">
            Technical Architecture
          </span>
        </span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-ink-mid"
        >
          <ChevronDown size={16} />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={shouldReduce ? false : { height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={shouldReduce ? {} : { height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="grid gap-px border-t border-coffee/15 sm:grid-cols-2">
              {codeFactory.architecture.map((node, i) => (
                <div key={node.label} className="bg-paper/40 px-5 py-4">
                  <div className="mb-1.5 flex items-center gap-2">
                    <span className="label-tech text-ink-low">0{i + 1}</span>
                    <span className="font-mono text-xs font-semibold text-ember">
                      {node.label}
                    </span>
                  </div>
                  <p className="text-xs leading-relaxed text-ink-mid">{node.note}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
