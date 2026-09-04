import { useRef } from 'react';
import {
  useReducedMotion,
  useScroll,
  useTransform,
  useMotionValue,
  motion,
  type MotionValue,
} from 'framer-motion';

type Props = {
  // 0 = hero (light, spacious), 1 = code factory (deeper, technical)
  atmosphere?: MotionValue<number>;
};

// Full-screen cinematic background with layered depth.
// Paper base, controlled ember lighting, espresso depth, topographic texture.
export function AnimatedBackground({ atmosphere }: Props) {
  const shouldReduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const fallback = useMotionValue(0);
  const atmosphereValue = atmosphere ?? fallback;

  const { scrollYProgress } = useScroll();
  const yFar = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const yMid = useTransform(scrollYProgress, [0, 1], ['0%', '8%']);
  const yNear = useTransform(scrollYProgress, [0, 1], ['0%', '-5%']);

  // Atmosphere shift: deeper espresso as we move toward Code Factory.
  const depth = useTransform(atmosphereValue, [0, 1], [0, 1]);

  return (
    <div
      ref={ref}
      aria-hidden
      className="fixed inset-0 -z-10 overflow-hidden"
      style={{ background: 'var(--paper)' }}
    >
      {/* Far layer — paper to soft stone gradient */}
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(140% 100% at 50% 10%, #FFFCF2 0%, #FFFCF2 30%, #f5f2ec 65%, #e8e4dc 100%)',
          y: shouldReduce ? 0 : yFar,
        }}
      />

      {/* Atmosphere deepening — espresso tint grows toward Code Factory */}
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(120% 90% at 50% 60%, rgba(37,36,34,0) 0%, rgba(37,36,34,0.10) 100%)',
          opacity: shouldReduce ? 0 : depth,
        }}
      />

      {/* Mid layer — topographic contour lines */}
      <motion.div
        className="topo-lines absolute inset-0 opacity-[0.6]"
        style={{
          y: shouldReduce ? 0 : yMid,
          maskImage:
            'radial-gradient(100% 80% at 50% 40%, black 20%, transparent 85%)',
          WebkitMaskImage:
            'radial-gradient(100% 80% at 50% 40%, black 20%, transparent 85%)',
        }}
      />

      {/* Near layer — soft ember light blooms */}
      {!shouldReduce && (
        <>
          <motion.div
            className="absolute -top-24 left-1/4 h-[50vw] w-[50vw] rounded-full blur-[100px]"
            style={{
              background:
                'radial-gradient(circle, rgba(235,94,40,0.08) 0%, rgba(235,94,40,0) 70%)',
              y: yNear,
            }}
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute top-1/3 -right-20 h-[40vw] w-[40vw] rounded-full blur-[120px]"
            style={{
              background:
                'radial-gradient(circle, rgba(204,197,185,0.20) 0%, rgba(204,197,185,0) 70%)',
              y: yMid,
            }}
            animate={{ scale: [1.04, 1, 1.04] }}
            transition={{ duration: 32, repeat: Infinity, ease: 'easeInOut' }}
          />
        </>
      )}

      {/* Grain texture */}
      <div className="grain-paper absolute inset-0 opacity-[0.04] mix-blend-multiply" />

      {/* Soft vignette for depth */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(130% 100% at 50% 50%, transparent 55%, rgba(37,36,34,0.08) 100%)',
        }}
      />
    </div>
  );
}
