/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  IconX,
  IconBuildingBank,
  IconCalendar,
  IconUsers,
  IconCoin,
  IconCheck,
  IconDownload,
  IconLayersLinked,
  IconTarget,
  IconLeaf,
  IconBuildingCommunity,
} from '@tabler/icons-react';
import { BankableProject } from '../../types';
import { SvgFlag } from '../common/SvgFlag';

interface ProjectDetailModalProps {
  project: BankableProject | null;
  onClose: () => void;
  onExportProjectDossier: (project: BankableProject) => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose,
  onExportProjectDossier,
}) => {
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>('SCEN-A');
  const [dossierExported, setDossierExported] = useState(false);

  if (!project) return null;

  const handleExport = () => {
    onExportProjectDossier(project);
    setDossierExported(true);
    setTimeout(() => setDossierExported(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="relative w-full max-w-4xl rounded-[var(--radius-lg)] border border-[var(--color-border-strong)] bg-[var(--color-surface)] shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-[var(--color-border)] px-6 py-4 bg-[var(--color-surface-secondary)]">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] font-bold text-[var(--color-accent)] bg-[var(--color-accent-subtle)] px-2 py-0.5 rounded-xs border border-[var(--color-accent)]/20">
                {project.id}
              </span>
              <SvgFlag countryCode={project.country === 'India' ? 'IN' : project.country === 'Brazil' ? 'BR' : project.country === 'South Africa' ? 'ZA' : 'CN'} />
              <span className="text-xs text-[var(--color-text-secondary)] font-medium">
                {project.region} · {project.country}
              </span>
            </div>
            <h2 className="font-editorial text-lg sm:text-xl font-medium text-[var(--color-text-primary)]">
              {project.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="rounded-[var(--radius-sm)] p-1 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface)] transition-colors cursor-pointer"
          >
            <IconX className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto text-xs">
          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface-secondary)] p-3">
              <div className="flex items-center gap-1.5 text-[var(--color-text-muted)] text-[10px] uppercase font-semibold">
                <IconCoin className="h-3.5 w-3.5" />
                <span>Capital Budget</span>
              </div>
              <div className="mt-1 font-semibold text-sm sm:text-base text-[var(--color-text-primary)] font-mono">
                ${(project.budgetUsd / 1e6).toFixed(1)}M
              </div>
              <div className="text-[10px] text-[var(--color-text-muted)]">{project.budgetLocalCurrency}</div>
            </div>

            <div className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface-secondary)] p-3">
              <div className="flex items-center gap-1.5 text-[var(--color-text-muted)] text-[10px] uppercase font-semibold">
                <IconCalendar className="h-3.5 w-3.5" />
                <span>Timeline</span>
              </div>
              <div className="mt-1 font-semibold text-sm sm:text-base text-[var(--color-text-primary)]">
                {project.timelineMonths} Months
              </div>
              <div className="text-[10px] text-[var(--color-text-muted)]">Turnkey Delivery</div>
            </div>

            <div className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface-secondary)] p-3">
              <div className="flex items-center gap-1.5 text-[var(--color-text-muted)] text-[10px] uppercase font-semibold">
                <IconUsers className="h-3.5 w-3.5" />
                <span>Beneficiaries</span>
              </div>
              <div className="mt-1 font-semibold text-sm sm:text-base text-[var(--color-text-primary)]">
                {(project.beneficiariesCount / 1e3).toLocaleString()}k
              </div>
              <div className="text-[10px] text-[var(--color-text-muted)]">{project.citizenSupportRate}% Citizen Backing</div>
            </div>

            <div className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface-secondary)] p-3">
              <div className="flex items-center gap-1.5 text-[var(--color-text-muted)] text-[10px] uppercase font-semibold">
                <IconLeaf className="h-3.5 w-3.5 text-emerald-500" />
                <span>CO2 Offset</span>
              </div>
              <div className="mt-1 font-semibold text-sm sm:text-base text-emerald-600 dark:text-emerald-400">
                {(project.carbonOffsetTonsAnnual / 1e3).toFixed(1)}k t/yr
              </div>
              <div className="text-[10px] text-[var(--color-text-muted)]">Climate Benefit</div>
            </div>
          </div>

          {/* Executive Summary */}
          <div className="space-y-2">
            <h4 className="font-semibold text-xs text-[var(--color-text-primary)] uppercase tracking-wider">
              Executive Brief & Problem Statement
            </h4>
            <div className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] p-4 leading-relaxed text-[var(--color-text-secondary)]">
              <p>{project.executiveSummary}</p>
              <div className="mt-2.5 pt-2.5 border-t border-[var(--color-border)] flex items-center justify-between text-[11px]">
                <span className="text-[var(--color-text-muted)]">
                  Primary Deficit Addressed:{' '}
                  <strong className="text-[var(--color-text-primary)] font-medium">
                    {project.deficitGapAddressed}
                  </strong>
                </span>
                <span className="font-mono text-[var(--color-accent)] font-semibold">
                  {project.primaryCitizenComplaintsAggregated.toLocaleString()} Grievances Triangulated
                </span>
              </div>
            </div>
          </div>

          {/* DPI Stack & Multilateral Model */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] p-4 space-y-2">
              <div className="flex items-center gap-1.5 font-semibold text-xs text-[var(--color-text-primary)]">
                <IconLayersLinked className="h-4 w-4 text-[var(--color-accent)]" />
                <span>Digital Public Infrastructure (DPI) Components</span>
              </div>
              <ul className="space-y-1.5 text-[11px] text-[var(--color-text-secondary)]">
                {project.dpiComponents.map((dpi, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <IconCheck className="h-3.5 w-3.5 text-[var(--color-accent)] shrink-0 mt-0.5" />
                    <span>{dpi}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] p-4 space-y-2">
              <div className="flex items-center gap-1.5 font-semibold text-xs text-[var(--color-text-primary)]">
                <IconBuildingBank className="h-4 w-4 text-[var(--color-accent)]" />
                <span>Multilateral Financing Framework</span>
              </div>
              <p className="text-[11px] text-[var(--color-text-secondary)] leading-relaxed">
                {project.ndbFinancingModel}
              </p>
              <div className="pt-2 flex flex-wrap gap-1.5">
                {project.sdgAlignment.map((sdg, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1 rounded-xs bg-[var(--color-surface-secondary)] border border-[var(--color-border)] px-2 py-0.5 text-[10px] font-medium text-[var(--color-text-primary)]"
                  >
                    <IconTarget className="h-3 w-3 text-emerald-500" />
                    {sdg}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Scenario Comparison Table */}
          <div className="space-y-3">
            <h4 className="font-semibold text-xs text-[var(--color-text-primary)] uppercase tracking-wider">
              Engineering & Implementation Scenarios
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {project.scenarios.map((scen) => {
                const isSelected = selectedScenarioId === scen.id;
                return (
                  <div
                    key={scen.id}
                    onClick={() => setSelectedScenarioId(scen.id)}
                    className={`rounded-[var(--radius-md)] border p-4 cursor-pointer transition-all ${
                      isSelected
                        ? 'border-[var(--color-accent)] bg-[var(--color-accent-subtle)] shadow-xs'
                        : 'border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-border-strong)]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-xs text-[var(--color-text-primary)]">
                        {scen.name}
                      </span>
                      <span className="font-mono text-xs font-bold text-[var(--color-accent)]">
                        ${(scen.costUsd / 1e6).toFixed(1)}M
                      </span>
                    </div>

                    <div className="mt-2 grid grid-cols-3 gap-2 text-[10px] text-[var(--color-text-muted)] border-y border-[var(--color-border)] py-2">
                      <div>
                        Timeline: <strong className="text-[var(--color-text-primary)]">{scen.timelineMonths}m</strong>
                      </div>
                      <div>
                        Coverage: <strong className="text-[var(--color-text-primary)]">{scen.coveragePct}%</strong>
                      </div>
                      <div>
                        Deficit Cut: <strong className="text-[var(--color-text-primary)]">-{scen.deficitReductionPct}%</strong>
                      </div>
                    </div>

                    <div className="mt-2 space-y-1 text-[11px]">
                      <div className="text-[var(--color-success-text)]">
                        <strong>Pros:</strong> {scen.pros.join(', ')}
                      </div>
                      <div className="text-[var(--color-danger-text)]">
                        <strong>Cons:</strong> {scen.cons.join(', ')}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Official Review Note */}
          <div className="rounded-[var(--radius-md)] border border-emerald-600/30 bg-emerald-500/10 p-3.5 flex items-start gap-2.5">
            <IconBuildingCommunity className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold text-xs text-emerald-800 dark:text-emerald-300">
                Official Review Status: {project.approvalStatus}
              </div>
              <p className="text-[11px] text-emerald-900/80 dark:text-emerald-200/80 mt-0.5">
                {project.officialReviewNotes}
              </p>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="border-t border-[var(--color-border)] px-6 py-3 bg-[var(--color-surface-secondary)] flex items-center justify-between">
          <span className="text-[11px] text-[var(--color-text-muted)]">
            Assigned: {project.assignedDepartment}
          </span>
          <div className="flex gap-2">
            <button
              onClick={handleExport}
              className="inline-flex items-center gap-1.5 rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-1.5 text-xs font-semibold text-[var(--color-text-primary)] hover:bg-[var(--color-surface-secondary)] transition-colors cursor-pointer"
            >
              {dossierExported ? (
                <>
                  <IconCheck className="h-4 w-4 text-[var(--color-success)]" />
                  <span>Dossier Exported!</span>
                </>
              ) : (
                <>
                  <IconDownload className="h-4 w-4" />
                  <span>Export Policy Dossier</span>
                </>
              )}
            </button>
            <button
              onClick={onClose}
              className="rounded-[var(--radius-sm)] bg-[var(--color-accent)] px-4 py-1.5 text-xs font-semibold text-white hover:bg-[var(--color-accent-hover)] transition-colors cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
