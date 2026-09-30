/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  IconSparkles,
  IconBuildingBank,
  IconCoins,
  IconCalendar,
  IconUsers,
  IconBrain,
  IconArrowRight,
  IconTarget,
  IconChecklist,
  IconLayersLinked,
  IconLeaf,
} from '@tabler/icons-react';
import { BankableProject } from '../../types';
import { SvgFlag } from '../common/SvgFlag';

interface AiProjectsViewProps {
  projects: BankableProject[];
  onOpenProjectDetail: (project: BankableProject) => void;
  onOpenWhyProject: (project: BankableProject) => void;
  onNavigateToSimulator: () => void;
}

export const AiProjectsView: React.FC<AiProjectsViewProps> = ({
  projects,
  onOpenProjectDetail,
  onOpenWhyProject,
  onNavigateToSimulator,
}) => {
  const [sectorFilter, setSectorFilter] = useState('All');
  const [countryFilter, setCountryFilter] = useState('All');

  const filteredProjects = projects.filter((p) => {
    if (sectorFilter !== 'All' && p.sector !== sectorFilter) return false;
    if (countryFilter !== 'All' && p.country !== countryFilter) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] font-bold text-[var(--color-accent)] bg-[var(--color-accent-subtle)] px-2 py-0.5 rounded-xs border border-[var(--color-accent)]/20 uppercase">
              New Development Bank (NDB) Formulation Rail
            </span>
            <span className="text-xs text-[var(--color-text-muted)]">
              DPG Interoperability Protocol 3.0
            </span>
          </div>
          <h1 className="font-editorial text-2xl font-medium text-[var(--color-text-primary)] mt-1">
            AI-Formulated Bankable Infrastructure Pipeline
          </h1>
          <p className="text-xs text-[var(--color-text-muted)] max-w-2xl">
            Synthesizing thousands of multilingual citizen development grievances into procurement-ready, bankable capital proposals with explainable AI scores.
          </p>
        </div>

        <button
          onClick={onNavigateToSimulator}
          className="inline-flex items-center gap-1.5 rounded-[var(--radius-sm)] bg-[var(--color-accent)] px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-[var(--color-accent-hover)] cursor-pointer"
        >
          <IconCoins className="h-4 w-4" />
          <span>Launch Capital Sandbox</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center gap-3 p-3 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] text-xs">
        <select
          value={sectorFilter}
          onChange={(e) => setSectorFilter(e.target.value)}
          className="rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-surface-secondary)] px-2.5 py-1.5 text-xs text-[var(--color-text-primary)] focus:outline-hidden"
        >
          <option value="All">All Sectors</option>
          <option value="Water & Sanitation">Water & Sanitation</option>
          <option value="Clean Energy & Grid">Clean Energy & Grid</option>
          <option value="Rural Transport & Roads">Rural Transport & Roads</option>
          <option value="Digital Public Infrastructure">Digital Public Infrastructure</option>
        </select>

        <select
          value={countryFilter}
          onChange={(e) => setCountryFilter(e.target.value)}
          className="rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-surface-secondary)] px-2.5 py-1.5 text-xs text-[var(--color-text-primary)] focus:outline-hidden"
        >
          <option value="All">All BRICS Nations</option>
          <option value="India">India</option>
          <option value="Brazil">Brazil</option>
          <option value="South Africa">South Africa</option>
          <option value="China">China</option>
        </select>

        <span className="text-[11px] text-[var(--color-text-muted)] ml-auto">
          {filteredProjects.length} Pipeline Proposals Ready for Co-Financing
        </span>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredProjects.map((project) => {
          const flagCode =
            project.country === 'India'
              ? 'IN'
              : project.country === 'Brazil'
              ? 'BR'
              : project.country === 'South Africa'
              ? 'ZA'
              : 'CN';

          return (
            <div
              key={project.id}
              className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 flex flex-col justify-between hover:border-[var(--color-border-strong)] transition-all shadow-xs space-y-5"
            >
              <div className="space-y-3">
                {/* Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] font-bold text-[var(--color-accent)] bg-[var(--color-accent-subtle)] px-2 py-0.5 rounded-xs border border-[var(--color-accent)]/20">
                        Rank #{project.priorityRank}
                      </span>
                      <SvgFlag countryCode={flagCode} />
                      <span className="text-xs text-[var(--color-text-muted)] font-medium">
                        {project.region}
                      </span>
                    </div>
                    <h3 className="font-editorial text-lg font-medium text-[var(--color-text-primary)] leading-snug">
                      {project.title}
                    </h3>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="font-mono text-xs font-bold text-[var(--color-accent)] bg-[var(--color-accent-subtle)] px-2 py-0.5 rounded-xs border border-[var(--color-accent)]/20">
                      Score {project.explainableScore.priorityScore}/100
                    </span>
                  </div>
                </div>

                <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed line-clamp-3">
                  {project.executiveSummary}
                </p>

                {/* Key Metrics */}
                <div className="grid grid-cols-3 gap-2 text-center p-3 rounded-[var(--radius-md)] bg-[var(--color-surface-secondary)] border border-[var(--color-border)] text-xs">
                  <div>
                    <div className="text-[10px] text-[var(--color-text-muted)] uppercase font-semibold">
                      CapEx Budget
                    </div>
                    <div className="font-mono font-bold text-[var(--color-text-primary)] mt-0.5">
                      ${(project.budgetUsd / 1e6).toFixed(1)}M
                    </div>
                    <div className="text-[9px] text-[var(--color-text-muted)] truncate">
                      {project.budgetLocalCurrency}
                    </div>
                  </div>

                  <div>
                    <div className="text-[10px] text-[var(--color-text-muted)] uppercase font-semibold">
                      Timeline
                    </div>
                    <div className="font-semibold text-[var(--color-text-primary)] mt-0.5">
                      {project.timelineMonths} Mos
                    </div>
                    <div className="text-[9px] text-[var(--color-text-muted)]">Turnkey</div>
                  </div>

                  <div>
                    <div className="text-[10px] text-[var(--color-text-muted)] uppercase font-semibold">
                      Beneficiaries
                    </div>
                    <div className="font-semibold text-[var(--color-text-primary)] mt-0.5">
                      {(project.beneficiariesCount / 1e3).toLocaleString()}k
                    </div>
                    <div className="text-[9px] text-emerald-600 dark:text-emerald-400">
                      {project.citizenSupportRate}% Backing
                    </div>
                  </div>
                </div>

                {/* SDG & Financing badge */}
                <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-[11px]">
                  <span className="text-[var(--color-text-muted)] text-[10px]">
                    Financing: <strong className="text-[var(--color-text-primary)]">{project.ndbFinancingModel}</strong>
                  </span>
                  <div className="flex items-center gap-1 text-emerald-600 text-[10px]">
                    <IconLeaf className="h-3 w-3" />
                    <span>{(project.carbonOffsetTonsAnnual / 1e3).toFixed(0)}k t CO2 offset</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-[var(--color-border)] flex items-center justify-between gap-2">
                <button
                  onClick={() => onOpenWhyProject(project)}
                  className="flex items-center gap-1.5 text-xs text-[var(--color-accent)] font-semibold hover:underline cursor-pointer"
                >
                  <IconBrain className="h-4 w-4" />
                  <span>Why this Project?</span>
                </button>

                <button
                  onClick={() => onOpenProjectDetail(project)}
                  className="inline-flex items-center gap-1 rounded-[var(--radius-sm)] bg-[var(--color-surface-secondary)] border border-[var(--color-border)] px-3 py-1.5 text-xs font-semibold text-[var(--color-text-primary)] hover:bg-[var(--color-surface)] hover:border-[var(--color-accent)] transition-colors cursor-pointer"
                >
                  <span>Project Dossier</span>
                  <IconArrowRight className="h-3 w-3" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
