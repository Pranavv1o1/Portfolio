import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { navLinks, profile } from '@/data/portfolio';

type Props = {
  active: string;
  onNavigate: (id: string) => void;
};

export function Navbar({ active, onNavigate }: Props) {
  const shouldReduce = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleClick = (id: string) => {
    onNavigate(id);
    setOpen(false);
  };

  return (
    <>
      <motion.header
        initial={shouldReduce ? false : { opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        className="fixed top-0 inset-x-0 z-50 flex justify-center px-4 pt-4 sm:pt-6"
      >
        <nav
          className={`flex items-center justify-between gap-6 rounded-xl px-4 py-2.5 transition-all duration-500 sm:px-5 ${
            scrolled
              ? 'light-panel shadow-[0_8px_30px_-12px_rgba(37,36,34,0.2)]'
              : 'border border-transparent bg-transparent'
          }`}
          style={{ width: 'min(100%, 46rem)' }}
        >
          {/* Brand — name only, no decorative icon */}
          <button
            onClick={() => handleClick('home')}
            className="font-display text-base font-medium tracking-wide text-coffee transition-opacity hover:opacity-70"
            aria-label={`${profile.name} — home`}
          >
            {profile.name}
          </button>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = active === link.id;
              return (
                <li key={link.id}>
                  <button
                    onClick={() => handleClick(link.id)}
                    className="relative px-3 py-1.5 text-sm tracking-wide transition-colors duration-300"
                    style={{
                      color: isActive ? 'var(--coffee)' : 'var(--ink-mid)',
                    }}
                  >
                    {link.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 -z-10 rounded-md bg-ember/12"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen((v) => !v)}
            className="md:hidden flex h-9 w-9 items-center justify-center rounded-lg text-ink-mid hover:text-coffee transition-colors"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </nav>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <div
              className="absolute inset-0 bg-paper/80 backdrop-blur-md"
              onClick={() => setOpen(false)}
            />
            <motion.ul
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="absolute top-20 inset-x-4 mx-auto rounded-2xl light-panel p-3"
              style={{ width: 'min(100%, 24rem)' }}
            >
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.id}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.3 }}
                >
                  <button
                    onClick={() => handleClick(link.id)}
                    className="flex w-full items-center justify-between rounded-xl px-4 py-3.5 text-left transition-colors"
                    style={{
                      color: active === link.id ? 'var(--coffee)' : 'var(--ink-mid)',
                      background:
                        active === link.id ? 'rgba(235,94,40,0.1)' : 'transparent',
                    }}
                  >
                    <span className="font-display text-base">{link.label}</span>
                    <span className="label-tech">0{i + 1}</span>
                  </button>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
