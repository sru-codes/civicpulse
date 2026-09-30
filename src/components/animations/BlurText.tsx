/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';

interface BlurTextProps {
  text: string;
  delay?: number;
  className?: string;
  animateBy?: 'words' | 'letters';
  direction?: 'top' | 'bottom';
}

export const BlurText: React.FC<BlurTextProps> = ({
  text,
  delay = 50,
  className = '',
  animateBy = 'words',
  direction = 'top',
}) => {
  const elements = animateBy === 'words' ? text.split(' ') : text.split('');

  return (
    <span className={`inline-block ${className}`}>
      {elements.map((segment, index) => (
        <motion.span
          key={index}
          initial={{
            filter: 'blur(10px)',
            opacity: 0,
            y: direction === 'top' ? -12 : 12,
          }}
          animate={{
            filter: 'blur(0px)',
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.35,
            delay: (index * delay) / 1000,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="inline-block"
        >
          {segment}
          {animateBy === 'words' && index < elements.length - 1 && '\u00A0'}
        </motion.span>
      ))}
    </span>
  );
};
