/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  IconSearch,
  IconX,
  IconBuildingBank,
  IconActivity,
  IconBinaryTree,
  IconMicrophone,
  IconDeviceTv,
  IconSparkles,
  IconCoins,
  IconAward,
  IconCode,
  IconPalette,
  IconBrandGithub,
} from '@tabler/icons-react';
import { AppView } from '../../types';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (view: AppView) => void;
  onOpenGitHubPush: () => void;
  onToggleEmergency: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onNavigate,
  onOpenGitHubPush,
  onToggleEmergency,
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const actions = [
    { id: 'command', label: 'Command Center — Global Triage & Executive Map', icon: IconActivity, view: 'command' },
    { id: 'lifecycle', label: 'Triage Queue — Collective Grievance Lifecycle', icon: IconBinaryTree, view: 'lifecycle' },
    { id: 'triangulation', label: 'Demand Heatmap — 4-Way Triangulation Engine', icon: IconBuildingBank, view: 'triangulation' },
    { id: 'intake', label: 'Citizen Hub — Multilingual Voice & WhatsApp Intake', icon: IconMicrophone, view: 'intake' },
    { id: 'digitaltwin', label: 'Digital Twin — Critical Asset Telemetry Grid', icon: IconDeviceTv, view: 'digitaltwin' },
    { id: 'recommender', label: 'AI Projects — Bankable NDB Infrastructure Pipeline', icon: IconSparkles, view: 'recommender' },
    { id: 'simulator', label: 'Capital Sandbox — Fiscal Capex Allocation Simulator', icon: IconCoins, view: 'simulator' },
    { id: 'impact', label: 'Impact & Audit — Post-Implementation Verification', icon: IconAward, view: 'impact' },
    { id: 'dpg', label: 'DPG Standard — Open API & 9-Indicator Rubric', icon: IconCode, view: 'dpg' },
    { id: 'styleguide', label: 'Design System — Style Tokens & Palette Guide', icon: IconPalette, view: 'styleguide' },
  ];

  const filteredActions = actions.filter((a) =>
    a.label.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 backdrop-blur-xs p-4 pt-20 overflow-y-auto">
      <div className="relative w-full max-w-xl rounded-[var(--radius-lg)] border border-[var(--color-border-strong)] bg-[var(--color-surface)] shadow-2xl overflow-hidden">
        {/* Input */}
        <div className="flex items-center gap-2 border-b border-[var(--color-border)] px-4 py-3 bg-[var(--color-surface)]">
          <IconSearch className="h-4 w-4 text-[var(--color-text-muted)]" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or jump to view..."
            className="flex-1 bg-transparent text-xs text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-hidden"
          />
          <button
            onClick={onClose}
            className="rounded p-1 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] cursor-pointer"
          >
            <IconX className="h-4 w-4" />
          </button>
        </div>

        {/* Results */}
        <div className="p-2 max-h-80 overflow-y-auto text-xs space-y-1">
          <div className="px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
            Navigation & Views
          </div>
          {filteredActions.map((action) => {
            const Icon = action.icon;
            return (
              <button
                key={action.id}
                onClick={() => {
                  onNavigate(action.view as AppView);
                  onClose();
                }}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-[var(--radius-sm)] text-left text-[var(--color-text-primary)] hover:bg-[var(--color-surface-secondary)] hover:text-[var(--color-accent)] transition-colors cursor-pointer"
              >
                <Icon className="h-4 w-4 text-[var(--color-accent)] shrink-0" />
                <span className="font-medium">{action.label}</span>
              </button>
            );
          })}

          <div className="px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-[var(--color-text-muted)] pt-2 border-t border-[var(--color-border)]">
            Quick Actions
          </div>
          <button
            onClick={() => {
              onOpenGitHubPush();
              onClose();
            }}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-[var(--radius-sm)] text-left text-[var(--color-text-primary)] hover:bg-emerald-500/10 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors cursor-pointer"
          >
            <IconBrandGithub className="h-4 w-4 text-emerald-600 shrink-0" />
            <span className="font-semibold">Push CivicPulse to GitHub Repository</span>
          </button>

          <button
            onClick={() => {
              onToggleEmergency();
              onClose();
            }}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-[var(--radius-sm)] text-left text-[var(--color-text-primary)] hover:bg-[var(--color-danger-bg)] hover:text-[var(--color-danger)] transition-colors cursor-pointer"
          >
            <span className="h-2 w-2 rounded-full bg-[var(--color-danger)] shrink-0" />
            <span className="font-medium">Toggle Civic Emergency Protocol</span>
          </button>
        </div>

        <div className="border-t border-[var(--color-border)] px-4 py-2 bg-[var(--color-surface-secondary)] text-[10px] text-[var(--color-text-muted)] flex items-center justify-between">
          <span>Navigate with mouse or keyboard</span>
          <span>ESC to close</span>
        </div>
      </div>
    </div>
  );
};
