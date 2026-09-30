/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  IconBrandGithub,
  IconCode,
  IconPalette,
  IconFileText,
  IconChecklist,
  IconWorldShare,
} from '@tabler/icons-react';
import { AppView } from '../../types';

interface FooterProps {
  onNavigate: (view: AppView) => void;
  onOpenHowItWorks: () => void;
  onOpenGitHubPush: () => void;
  onOpenPolicyDossier: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenHowItWorks,
  onOpenGitHubPush,
  onOpenPolicyDossier,
}) => {
  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-surface)] py-8 text-xs text-[var(--color-text-muted)] transition-colors mt-auto">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <span className="font-semibold text-[var(--color-text-primary)]">
              CivicPulse BRICS — Public Infrastructure Decision System
            </span>
            <span className="rounded-xs bg-[var(--color-accent-subtle)] text-[var(--color-accent)] px-1.5 py-0.5 text-[10px] font-bold border border-[var(--color-accent)]/20">
              DPG NOMINEE
            </span>
          </div>
          <p className="mt-1 text-[11px] text-[var(--color-text-muted)]">
            Conforming to Digital Public Goods Standard · New Development Bank (NDB) Interoperability Framework
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 text-[var(--color-text-secondary)]">
          <button
            onClick={() => onNavigate('styleguide')}
            className="flex items-center gap-1.5 hover:text-[var(--color-accent)] font-medium transition-colors cursor-pointer"
          >
            <IconPalette className="h-3.5 w-3.5" />
            <span>Design Tokens</span>
          </button>

          <button
            onClick={onOpenHowItWorks}
            className="flex items-center gap-1.5 hover:text-[var(--color-text-primary)] transition-colors cursor-pointer"
          >
            <IconChecklist className="h-3.5 w-3.5" />
            <span>How it Works</span>
          </button>

          <button
            onClick={() => onNavigate('dpg')}
            className="flex items-center gap-1.5 hover:text-[var(--color-text-primary)] transition-colors cursor-pointer"
          >
            <IconCode className="h-3.5 w-3.5" />
            <span>Open API Schema</span>
          </button>

          <button
            onClick={onOpenPolicyDossier}
            className="flex items-center gap-1.5 hover:text-[var(--color-text-primary)] transition-colors cursor-pointer"
          >
            <IconFileText className="h-3.5 w-3.5" />
            <span>Policy Dossier</span>
          </button>

          <button
            onClick={onOpenGitHubPush}
            className="flex items-center gap-1.5 rounded-[var(--radius-sm)] bg-[var(--color-surface-secondary)] border border-[var(--color-border)] px-2.5 py-1 text-[var(--color-accent)] font-semibold hover:border-[var(--color-accent)] transition-all cursor-pointer"
          >
            <IconBrandGithub className="h-3.5 w-3.5" />
            <span>GitHub Sync</span>
          </button>

          <div className="flex items-center gap-1 text-[11px] text-[var(--color-text-muted)] border-l border-[var(--color-border)] pl-4">
            <IconWorldShare className="h-3.5 w-3.5" />
            <span>BRICS Digital Infrastructure Track</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
