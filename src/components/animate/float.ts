import type { MotionProps } from 'framer-motion';

// ----------------------------------------------------------------------
// Slow bobbing used by decorative elements that "float" on a page, such as
// the tool logos and the hero cards. Pass the item's index so neighbours
// drift out of step with each other.
//
// Usage: <m.div {...varFloat(index)}> — skip it when reduced motion is on.

export function varFloat(index = 0): MotionProps {
  return {
    animate: { y: [0, -10, 0] },
    transition: {
      duration: 4 + (index % 4),
      delay: (index % 5) * 0.4,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  };
}
