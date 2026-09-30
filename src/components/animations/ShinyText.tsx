/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface ShinyTextProps {
  text: string;
  disabled?: boolean;
  speed?: number;
  className?: string;
}

export const ShinyText: React.FC<ShinyTextProps> = ({
  text,
  disabled = false,
  speed = 5,
  className = '',
}) => {
  const animationDuration = `${speed}s`;

  return (
    <span
      className={`inline-block bg-clip-text text-transparent bg-gradient-to-r from-neutral-200 via-white to-neutral-400 dark:from-neutral-400 dark:via-white dark:to-neutral-500 animate-shine ${
        disabled ? '' : 'bg-[length:200%_auto]'
      } ${className}`}
      style={{
        animationDuration,
        backgroundImage: disabled
          ? undefined
          : 'linear-gradient(120deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 1) 50%, rgba(255, 255, 255, 0.4) 100%)',
      }}
    >
      {text}
    </span>
  );
};
