/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface SvgFlagProps {
  countryCode: string;
  className?: string;
}

export const SvgFlag: React.FC<SvgFlagProps> = ({ countryCode, className = 'h-4 w-5' }) => {
  const code = countryCode.toUpperCase();

  switch (code) {
    case 'IN': // India
      return (
        <svg viewBox="0 0 24 16" className={`inline-block rounded-xs overflow-hidden shadow-xs ${className}`}>
          <rect width="24" height="5.33" fill="#FF9933" />
          <rect y="5.33" width="24" height="5.33" fill="#FFFFFF" />
          <rect y="10.66" width="24" height="5.34" fill="#138808" />
          <circle cx="12" cy="8" r="2" fill="none" stroke="#000080" strokeWidth="0.6" />
        </svg>
      );
    case 'BR': // Brazil
      return (
        <svg viewBox="0 0 24 16" className={`inline-block rounded-xs overflow-hidden shadow-xs ${className}`}>
          <rect width="24" height="16" fill="#009739" />
          <polygon points="12,1.5 22,8 12,14.5 2,8" fill="#FEDD00" />
          <circle cx="12" cy="8" r="3.2" fill="#012169" />
        </svg>
      );
    case 'ZA': // South Africa
      return (
        <svg viewBox="0 0 24 16" className={`inline-block rounded-xs overflow-hidden shadow-xs ${className}`}>
          <rect width="24" height="8" fill="#E03C31" />
          <rect y="8" width="24" height="8" fill="#001489" />
          <polygon points="0,0 10,8 0,16" fill="#000000" />
          <polygon points="0,0 2,0 11,7.2 24,7.2 24,8.8 11,8.8 2,16 0,16 9,8" fill="#007749" stroke="#FFB612" strokeWidth="0.8" />
        </svg>
      );
    case 'CN': // China
      return (
        <svg viewBox="0 0 24 16" className={`inline-block rounded-xs overflow-hidden shadow-xs ${className}`}>
          <rect width="24" height="16" fill="#DE2910" />
          <polygon points="4,2.5 4.8,5 2.8,3.5 5.2,3.5 3.2,5" fill="#FFDE00" />
          <circle cx="8" cy="2.5" r="0.8" fill="#FFDE00" />
          <circle cx="9.5" cy="4" r="0.8" fill="#FFDE00" />
          <circle cx="9.5" cy="6" r="0.8" fill="#FFDE00" />
          <circle cx="8" cy="7.5" r="0.8" fill="#FFDE00" />
        </svg>
      );
    case 'RU': // Russia
      return (
        <svg viewBox="0 0 24 16" className={`inline-block rounded-xs overflow-hidden shadow-xs ${className}`}>
          <rect width="24" height="5.33" fill="#FFFFFF" />
          <rect y="5.33" width="24" height="5.33" fill="#0039A6" />
          <rect y="10.66" width="24" height="5.34" fill="#D52B1E" />
        </svg>
      );
    case 'EG': // Egypt
      return (
        <svg viewBox="0 0 24 16" className={`inline-block rounded-xs overflow-hidden shadow-xs ${className}`}>
          <rect width="24" height="5.33" fill="#CE1126" />
          <rect y="5.33" width="24" height="5.33" fill="#FFFFFF" />
          <rect y="10.66" width="24" height="5.34" fill="#000000" />
          <circle cx="12" cy="8" r="1.4" fill="#C09300" />
        </svg>
      );
    case 'ET': // Ethiopia
      return (
        <svg viewBox="0 0 24 16" className={`inline-block rounded-xs overflow-hidden shadow-xs ${className}`}>
          <rect width="24" height="5.33" fill="#078930" />
          <rect y="5.33" width="24" height="5.33" fill="#FCDD09" />
          <rect y="10.66" width="24" height="5.34" fill="#DA121A" />
          <circle cx="12" cy="8" r="2.4" fill="#0F47AF" />
        </svg>
      );
    default:
      return (
        <span className="inline-flex items-center justify-center h-4 px-1 rounded-xs bg-slate-700 text-[10px] font-bold text-white uppercase tracking-wider">
          {code.slice(0, 2)}
        </span>
      );
  }
};
