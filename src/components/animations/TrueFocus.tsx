/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';

interface TrueFocusProps {
  sentence: string;
  manualMode?: boolean;
  blurAmount?: number;
  borderColor?: string;
  glowColor?: string;
  animationDuration?: number;
  pauseBetweenAnimations?: number;
  className?: string;
}

export const TrueFocus: React.FC<TrueFocusProps> = ({
  sentence,
  manualMode = false,
  blurAmount = 4,
  borderColor = 'var(--color-accent)',
  glowColor = 'rgba(15, 92, 92, 0.4)',
  className = '',
}) => {
  const words = sentence.split(' ');
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div className={`relative inline-flex flex-wrap items-center gap-2 ${className}`}>
      {words.map((word, index) => {
        const isCurrent = index === currentIndex;
        return (
          <span
            key={index}
            onClick={() => manualMode && setCurrentIndex(index)}
            onMouseEnter={() => !manualMode && setCurrentIndex(index)}
            className="relative cursor-pointer px-1 py-0.5 transition-all duration-200"
            style={{
              filter: isCurrent ? 'none' : `blur(${blurAmount}px)`,
              opacity: isCurrent ? 1 : 0.6,
            }}
          >
            {word}
            {isCurrent && (
              <motion.span
                layoutId="focus-box"
                className="absolute inset-0 rounded-[var(--radius-sm)] border-2 pointer-events-none"
                style={{
                  borderColor,
                  boxShadow: `0 0 12px ${glowColor}`,
                }}
                transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              />
            )}
          </span>
        );
      })}
    </div>
  );
};
