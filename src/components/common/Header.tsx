/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  IconBuildingBank,
  IconBuildingStore,
  IconUser,
  IconTools,
  IconSearch,
  IconChevronDown,
  IconSun,
  IconMoon,
  IconEye,
  IconBrandGithub,
  IconHelpCircle,
  IconAlertTriangle,
} from '@tabler/icons-react';
import { AppView, Role, ThemeMode } from '../../types';

interface HeaderProps {
  activeView: AppView;
  setActiveView: (view: AppView) => void;
  currentRole: Role;
  setCurrentRole: (role: Role) => void;
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  isEmergencyActive: boolean;
  onOpenHowItWorks: () => void;
  onOpenCommandPalette: () => void;
  onOpenGitHubPush: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeView,
  setActiveView,
  currentRole,
  setCurrentRole,
  theme,
  setTheme,
  isEmergencyActive,
  onOpenHowItWorks,
  onOpenCommandPalette,
  onOpenGitHubPush,
}) => {
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const rolesList: { role: Role; label: string; icon: typeof IconUser; desc: string }[] = [
    {
      role: 'policymaker',
      label: 'National Policymaker',
      icon: IconBuildingBank,
      desc: 'CapEx allocation, bankable pipelines & gap analysis',
    },
    {
      role: 'department_officer',
      label: 'Department Director',
      icon: IconBuildingStore,
      desc: 'Collective issue management, approvals & dispatch',
    },
    {
      role: 'field_officer',
      label: 'Field Engineer',
      icon: IconTools,
      desc: 'Digital twin telemetry, asset audits & inspections',
    },
    {
      role: 'citizen',
      label: 'Citizen User',
      icon: IconUser,
      desc: 'Multilingual reporting, status tracking & satisfaction',
    },
  ];

  const currentRoleInfo = rolesList.find((r) => r.role === currentRole) || rolesList[0];
  const CurrentRoleIcon = currentRoleInfo.icon;

  const navItems: { id: AppView; label: string }[] = [
    { id: 'command', label: 'Command Center' },
    { id: 'lifecycle', label: 'Triage Queue' },
    { id: 'triangulation', label: 'Demand Heatmap' },
    { id: 'intake', label: 'Citizen Hub' },
    { id: 'digitaltwin', label: 'Digital Twin' },
    { id: 'recommender', label: 'AI Projects' },
    { id: 'simulator', label: 'Capital Sandbox' },
    { id: 'impact', label: 'Impact & Audit' },
    { id: 'dpg', label: 'DPG Standard' },
    { id: 'styleguide', label: 'Design System' },
  ];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setRoleMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleTheme = () => {
    if (theme === 'light') setTheme('dark');
    else if (theme === 'dark') setTheme('high-contrast');
    else setTheme('light');
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[var(--color-border)] bg-[var(--color-surface)] shadow-xs transition-colors">
      {isEmergencyActive && (
        <div className="bg-[var(--color-danger-bg)] border-b border-[var(--color-danger-border)] px-4 py-1.5 text-center text-xs font-semibold text-[var(--color-danger-text)] flex items-center justify-center gap-2">
          <span className="flex h-2 w-2 rounded-full bg-[var(--color-danger)] animate-ping" />
          <IconAlertTriangle className="h-4 w-4 text-[var(--color-danger)]" />
          <span>
            CIVIC EMERGENCY PROTOCOL ACTIVE: Critical Flooding in São Francisco Basin & Power Disruption in Eastern Cape
          </span>
        </div>
      )}

      <div className="mx-auto flex h-14 sm:h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 gap-3">
        {/* Brand */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setActiveView('command')}
            className="flex items-center gap-2 text-left cursor-pointer group"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-[var(--radius-sm)] bg-[var(--color-accent)] font-semibold text-white shadow-xs group-hover:scale-105 transition-transform">
              CP
            </div>
            <div className="flex flex-col">
              <span className="font-editorial text-base sm:text-lg font-medium tracking-tight text-[var(--color-text-primary)]">
                CivicPulse{' '}
                <span className="text-[var(--color-accent)] font-sans text-xs font-bold tracking-wider px-1 py-0.5 rounded-xs bg-[var(--color-accent-subtle)] border border-[var(--color-accent)]/30">
                  BRICS
                </span>
              </span>
              <span className="text-[10px] text-[var(--color-text-muted)] -mt-0.5 hidden sm:inline font-sans">
                Public Infrastructure Decision System
              </span>
            </div>
          </button>
        </div>

        {/* Navigation tabs */}
        <nav className="hidden xl:flex items-center gap-1 text-xs font-medium text-[var(--color-text-secondary)] overflow-x-auto py-1">
          {navItems.map((item) => {
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveView(item.id)}
                className={`rounded-[var(--radius-sm)] px-2.5 py-1.5 transition-colors cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-[var(--color-accent-subtle)] text-[var(--color-accent)] font-semibold border border-[var(--color-accent)]/20'
                    : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-secondary)]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* GitHub Push button */}
          <button
            onClick={onOpenGitHubPush}
            className="inline-flex items-center gap-1.5 rounded-[var(--radius-sm)] border border-emerald-600/40 bg-emerald-600/10 px-2.5 py-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400 hover:bg-emerald-600/20 transition-colors cursor-pointer"
            title="Push CivicPulse to GitHub repository"
          >
            <IconBrandGithub className="h-4 w-4" />
            <span className="hidden sm:inline">Push to GitHub</span>
          </button>

          {/* Search / Command palette shortcut */}
          <button
            onClick={onOpenCommandPalette}
            className="hidden md:inline-flex items-center gap-1.5 rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-surface-secondary)] px-2.5 py-1.5 text-xs font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors cursor-pointer"
            title="Press Cmd+K to search"
          >
            <IconSearch className="h-3.5 w-3.5" />
            <span className="hidden lg:inline">Search</span>
            <kbd className="rounded-xs bg-[var(--color-surface)] border border-[var(--color-border-strong)] px-1 py-0.2 text-[9px] font-mono text-[var(--color-text-muted)]">
              ⌘K
            </kbd>
          </button>

          {/* How it works */}
          <button
            onClick={onOpenHowItWorks}
            className="hidden lg:inline-flex items-center gap-1.5 rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-surface)] px-2.5 py-1.5 text-xs font-medium text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-secondary)] hover:text-[var(--color-text-primary)] transition-colors cursor-pointer"
          >
            <IconHelpCircle className="h-3.5 w-3.5 text-[var(--color-accent)]" />
            <span>How it Works</span>
          </button>

          {/* Theme switcher */}
          <button
            onClick={toggleTheme}
            className="p-1.5 rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-secondary)] transition-colors cursor-pointer"
            title={`Current theme: ${theme}. Click to toggle.`}
          >
            {theme === 'light' && <IconSun className="h-4 w-4 text-amber-500" />}
            {theme === 'dark' && <IconMoon className="h-4 w-4 text-cyan-400" />}
            {theme === 'high-contrast' && <IconEye className="h-4 w-4 text-emerald-400" />}
          </button>

          {/* Persona / Role Selector */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setRoleMenuOpen(!roleMenuOpen)}
              className="inline-flex items-center gap-1.5 rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-surface)] px-2.5 py-1.5 text-xs font-medium text-[var(--color-text-primary)] hover:border-[var(--color-border-strong)] hover:bg-[var(--color-surface-secondary)] transition-colors cursor-pointer"
            >
              <CurrentRoleIcon className="h-3.5 w-3.5 text-[var(--color-accent)]" />
              <span className="hidden sm:inline font-medium">{currentRoleInfo.label}</span>
              <IconChevronDown className="h-3 w-3 text-[var(--color-text-muted)]" />
            </button>

            {roleMenuOpen && (
              <div className="absolute right-0 mt-2 w-72 rounded-[var(--radius-md)] border border-[var(--color-border-strong)] bg-[var(--color-surface-elevated)] p-1.5 shadow-lg z-50 text-xs">
                <div className="px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-[var(--color-text-muted)] border-b border-[var(--color-border)] mb-1">
                  Switch Operational Persona
                </div>
                {rolesList.map((r) => {
                  const Icon = r.icon;
                  const isCurrent = r.role === currentRole;
                  return (
                    <button
                      key={r.role}
                      onClick={() => {
                        setCurrentRole(r.role);
                        setRoleMenuOpen(false);
                      }}
                      className={`w-full flex items-start gap-2.5 p-2 rounded-[var(--radius-sm)] text-left transition-colors cursor-pointer ${
                        isCurrent
                          ? 'bg-[var(--color-accent-subtle)] text-[var(--color-accent)] font-semibold'
                          : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-secondary)] hover:text-[var(--color-text-primary)]'
                      }`}
                    >
                      <Icon className="h-4 w-4 mt-0.5 shrink-0 text-[var(--color-accent)]" />
                      <div>
                        <div className="font-medium text-xs text-[var(--color-text-primary)]">{r.label}</div>
                        <div className="text-[11px] text-[var(--color-text-muted)] leading-tight">{r.desc}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile nav bar */}
      <div className="xl:hidden flex items-center gap-1 px-4 py-2 border-t border-[var(--color-border)] bg-[var(--color-surface-secondary)] overflow-x-auto text-xs">
        {navItems.map((item) => {
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={`rounded-[var(--radius-sm)] px-2 py-1 shrink-0 cursor-pointer font-medium ${
                isActive
                  ? 'bg-[var(--color-accent)] text-white shadow-xs'
                  : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-surface)]'
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </header>
  );
};
