/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';

interface CountUpProps {
  to: number;
  from?: number;
  direction?: 'up' | 'down';
  delay?: number;
  duration?: number;
  className?: string;
  startWhen?: boolean;
  separator?: string;
  decimals?: number;
  prefix?: string;
  suffix?: string;
}

export const CountUp: React.FC<CountUpProps> = ({
  to,
  from = 0,
  delay = 0,
  duration = 2,
  className = '',
  startWhen = true,
  separator = ',',
  decimals = 0,
  prefix = '',
  suffix = '',
}) => {
  const [value, setValue] = useState(from);
  const startTimeRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!startWhen) return;

    let timeoutId: number;

    const startAnimation = () => {
      const animate = (timestamp: number) => {
        if (!startTimeRef.current) startTimeRef.current = timestamp;
        const progress = Math.min((timestamp - startTimeRef.current) / (duration * 1000), 1);
        
        // easeOutQuart
        const ease = 1 - Math.pow(1 - progress, 4);
        const current = from + (to - from) * ease;
        setValue(current);

        if (progress < 1) {
          rafRef.current = requestAnimationFrame(animate);
        } else {
          setValue(to);
        }
      };

      rafRef.current = requestAnimationFrame(animate);
    };

    timeoutId = window.setTimeout(startAnimation, delay * 1000);

    return () => {
      clearTimeout(timeoutId);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [to, from, delay, duration, startWhen]);

  const formatted = value.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return (
    <span className={`inline-block tabular-nums font-medium ${className}`}>
      {prefix}
      {separator ? formatted : value.toFixed(decimals)}
      {suffix}
    </span>
  );
};
