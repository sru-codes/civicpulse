/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  IconPalette,
  IconSun,
  IconMoon,
  IconEye,
  IconTypography,
  IconCheck,
  IconShieldCheck,
  IconBox,
} from '@tabler/icons-react';
import { ThemeMode } from '../../types';
import { ShinyText } from '../animations/ShinyText';
import { TrueFocus } from '../animations/TrueFocus';
import { SpotlightCard } from '../animations/SpotlightCard';

interface DesignTokensViewProps {
  currentTheme: ThemeMode;
  onChangeTheme: (theme: ThemeMode) => void;
}

export const DesignTokensView: React.FC<DesignTokensViewProps> = ({
  currentTheme,
  onChangeTheme,
}) => {
  const colorTokens = [
    { name: '--color-accent', label: 'BRICS Emerald Accent', value: '#0f5c5c', desc: 'Primary brand and action color' },
    { name: '--color-surface', label: 'Primary Surface', value: '#ffffff', desc: 'Main card and container fill' },
    { name: '--color-surface-secondary', label: 'Secondary Surface', value: '#f4f4f1', desc: 'Nested blocks and inputs' },
    { name: '--color-success', label: 'Verified Status', value: '#236b43', desc: 'Resolved issues & positive ROI' },
    { name: '--color-warning', label: 'Capex Misalignment', value: '#8f590a', desc: 'Moderate funding deficits' },
    { name: '--color-danger', label: 'Severe Deficit Gap', value: '#9e2a2b', desc: 'Emergency outages & acute crises' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] font-bold text-[var(--color-accent)] bg-[var(--color-accent-subtle)] px-2 py-0.5 rounded-xs border border-[var(--color-accent)]/20 uppercase">
              Design System & Tokens
            </span>
            <span className="text-xs text-[var(--color-text-muted)]">
              WCAG AAA Accessible Civic System
            </span>
          </div>
          <h1 className="font-editorial text-2xl font-medium text-[var(--color-text-primary)] mt-1">
            Design Tokens & Typography Standards
          </h1>
          <p className="text-xs text-[var(--color-text-muted)] max-w-2xl">
            Strict token architecture adhering to zero-emoji discipline, Tabler vector iconography, and React-Bits micro-animations.
          </p>
        </div>

        {/* Theme mode buttons */}
        <div className="flex rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-surface)] p-1 text-xs font-medium">
          <button
            onClick={() => onChangeTheme('light')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-xs cursor-pointer ${
              currentTheme === 'light'
                ? 'bg-[var(--color-accent)] text-white font-semibold'
                : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
            }`}
          >
            <IconSun className="h-3.5 w-3.5" />
            <span>Light</span>
          </button>
          <button
            onClick={() => onChangeTheme('dark')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-xs cursor-pointer ${
              currentTheme === 'dark'
                ? 'bg-[var(--color-accent)] text-white font-semibold'
                : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
            }`}
          >
            <IconMoon className="h-3.5 w-3.5" />
            <span>Dark</span>
          </button>
          <button
            onClick={() => onChangeTheme('high-contrast')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-xs cursor-pointer ${
              currentTheme === 'high-contrast'
                ? 'bg-[var(--color-accent)] text-white font-semibold'
                : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
            }`}
          >
            <IconEye className="h-3.5 w-3.5" />
            <span>High Contrast</span>
          </button>
        </div>
      </div>

      {/* Swatches Grid */}
      <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4 shadow-xs">
        <div className="flex items-center gap-2">
          <IconPalette className="h-5 w-5 text-[var(--color-accent)]" />
          <h3 className="font-semibold text-sm text-[var(--color-text-primary)]">
            Core Semantic Color Tokens
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
          {colorTokens.map((token, i) => (
            <div
              key={i}
              className="p-3 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface-secondary)] space-y-2"
            >
              <div
                className="h-10 rounded-[var(--radius-xs)] border border-black/10 shadow-inner flex items-center px-3"
                style={{ backgroundColor: `var(${token.name})` }}
              >
                <span className="font-mono text-[10px] text-white font-semibold drop-shadow-xs">
                  {token.name}
                </span>
              </div>
              <div>
                <div className="font-semibold text-xs text-[var(--color-text-primary)]">{token.label}</div>
                <div className="text-[11px] text-[var(--color-text-muted)]">{token.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Typography Triad */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SpotlightCard className="p-6 space-y-3">
          <div className="flex items-center justify-between text-xs text-[var(--color-text-muted)]">
            <span className="font-mono text-[10px] uppercase font-bold">Editorial Serif</span>
            <IconTypography className="h-4 w-4" />
          </div>
          <div className="font-editorial text-2xl text-[var(--color-text-primary)]">
            Newsreader Variable
          </div>
          <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
            Used for institutional titles, citizen testimonials, and policy briefs. Gives authoritative editorial gravitas.
          </p>
        </SpotlightCard>

        <SpotlightCard className="p-6 space-y-3">
          <div className="flex items-center justify-between text-xs text-[var(--color-text-muted)]">
            <span className="font-mono text-[10px] uppercase font-bold">Modern Sans</span>
            <IconBox className="h-4 w-4" />
          </div>
          <div className="font-sans text-2xl font-semibold text-[var(--color-text-primary)]">
            Inter Display
          </div>
          <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
            Ultra-crisp UI sans-serif engineered for high data-density dashboards, filters, and forms.
          </p>
        </SpotlightCard>

        <SpotlightCard className="p-6 space-y-3">
          <div className="flex items-center justify-between text-xs text-[var(--color-text-muted)]">
            <span className="font-mono text-[10px] uppercase font-bold">Monospace Code</span>
            <IconShieldCheck className="h-4 w-4" />
          </div>
          <div className="font-mono text-xl font-bold text-[var(--color-accent)]">
            JetBrains Mono
          </div>
          <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
            Tabular numbers, GPS coordinates, tracking hashes (CIT-IN-84920), and API payloads.
          </p>
        </SpotlightCard>
      </div>

      {/* React-Bits Showcase Section */}
      <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4 shadow-xs">
        <h3 className="font-semibold text-sm text-[var(--color-text-primary)]">
          React-Bits Animation Showcase
        </h3>
        <div className="p-4 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface-secondary)] space-y-4 text-xs">
          <div>
            <span className="text-[10px] text-[var(--color-text-muted)] uppercase font-semibold block mb-1">
              TrueFocus Word Hover Focus
            </span>
            <TrueFocus
              sentence="Transforming multilingual citizen signals into bankable sovereign infrastructure"
              borderColor="var(--color-accent)"
            />
          </div>

          <div className="pt-2 border-t border-[var(--color-border)]">
            <span className="text-[10px] text-[var(--color-text-muted)] uppercase font-semibold block mb-1">
              ShinyText Dynamic Shimmer
            </span>
            <div className="p-3 bg-neutral-900 rounded-[var(--radius-sm)]">
              <ShinyText
                text="CivicPulse BRICS — Verified Digital Public Good for Infrastructure Justice"
                className="text-sm font-semibold"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
