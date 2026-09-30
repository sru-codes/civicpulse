/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  IconAward,
  IconCheck,
  IconClock,
  IconTrendingDown,
  IconBuildingBank,
  IconMessageCircle,
  IconStar,
  IconShieldCheck,
} from '@tabler/icons-react';
import { ImpactAudit } from '../../types';
import { SvgFlag } from '../common/SvgFlag';

interface ImpactAuditViewProps {
  impacts: ImpactAudit[];
}

export const ImpactAuditView: React.FC<ImpactAuditViewProps> = ({ impacts }) => {
  const [selectedImpactId, setSelectedImpactId] = useState<string>(impacts[0]?.id || '');
  const selectedImpact = impacts.find((i) => i.id === selectedImpactId) || impacts[0];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] font-bold text-[var(--color-accent)] bg-[var(--color-accent-subtle)] px-2 py-0.5 rounded-xs border border-[var(--color-accent)]/20 uppercase">
              Post-Implementation Audit Ledger
            </span>
            <span className="text-xs text-[var(--color-text-muted)]">
              DPG Interoperability Protocol 5.0
            </span>
          </div>
          <h1 className="font-editorial text-2xl font-medium text-[var(--color-text-primary)] mt-1">
            Impact Verification & Citizen Accountability
          </h1>
          <p className="text-xs text-[var(--color-text-muted)] max-w-2xl">
            Independent before-and-after audit validating whether completed NDB infrastructure projects measurably reduced citizen grievances and improved rural service reliability.
          </p>
        </div>
      </div>

      {/* Split View: Completed Projects List (4 cols) vs Detailed Audit (8 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Completed Projects List (4 cols) */}
        <div className="lg:col-span-4 space-y-3">
          <div className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider px-1">
            Verified Completed Works ({impacts.length})
          </div>

          {impacts.map((item) => {
            const isSelected = item.id === selectedImpact.id;
            const flagCode =
              item.country === 'India'
                ? 'IN'
                : item.country === 'Brazil'
                ? 'BR'
                : item.country === 'Russia'
                ? 'RU'
                : 'ET';

            return (
              <div
                key={item.id}
                onClick={() => setSelectedImpactId(item.id)}
                className={`p-4 rounded-[var(--radius-md)] border cursor-pointer transition-all ${
                  isSelected
                    ? 'border-[var(--color-accent)] bg-[var(--color-accent-subtle)] shadow-xs'
                    : 'border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-border-strong)]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <SvgFlag countryCode={flagCode} />
                    <span className="font-mono text-[10px] font-bold text-[var(--color-accent)]">
                      {item.projectId}
                    </span>
                  </div>
                  <span className="text-[10px] text-[var(--color-text-muted)] font-mono">
                    Completed: {item.completedDate}
                  </span>
                </div>

                <div className="font-semibold text-xs text-[var(--color-text-primary)] mt-2 line-clamp-1">
                  {item.projectTitle}
                </div>

                <div className="mt-2 pt-2 border-t border-[var(--color-border)] flex items-center justify-between text-[10px]">
                  <span className="text-[var(--color-text-muted)]">{item.region}</span>
                  <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                    -{Math.round(((item.complaintsBefore - item.complaintsAfter) / item.complaintsBefore) * 100)}% Grievances
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Detailed Audit Ledger (8 cols) */}
        <div className="lg:col-span-8 space-y-5">
          <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-6 shadow-xs">
            {/* Header info */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-[var(--color-border)] pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-[var(--color-accent)] bg-[var(--color-accent-subtle)] px-2 py-0.5 rounded-xs border border-[var(--color-accent)]/20">
                    {selectedImpact.projectId}
                  </span>
                  <span className="text-xs text-[var(--color-text-secondary)] font-medium">
                    {selectedImpact.region} ({selectedImpact.country})
                  </span>
                </div>
                <h2 className="font-editorial text-xl font-medium text-[var(--color-text-primary)] mt-1">
                  {selectedImpact.projectTitle}
                </h2>
              </div>

              <span className="text-xs font-semibold px-2.5 py-1 rounded-xs bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                <IconShieldCheck className="h-4 w-4" />
                <span>Audited & Signed Off</span>
              </span>
            </div>

            {/* Before vs After Comparison Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              {/* Complaints reduction */}
              <div className="p-3.5 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface-secondary)] space-y-1">
                <div className="text-[10px] text-[var(--color-text-muted)] uppercase font-semibold">
                  Monthly Citizen Complaints
                </div>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="font-mono text-lg font-bold text-[var(--color-danger-text)] line-through">
                    {selectedImpact.complaintsBefore.toLocaleString()}
                  </span>
                  <span className="font-mono text-xl font-bold text-emerald-600 dark:text-emerald-400">
                    {selectedImpact.complaintsAfter.toLocaleString()}
                  </span>
                </div>
                <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">
                  -{Math.round(((selectedImpact.complaintsBefore - selectedImpact.complaintsAfter) / selectedImpact.complaintsBefore) * 100)}% verified reduction
                </div>
              </div>

              {/* Response Time */}
              <div className="p-3.5 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface-secondary)] space-y-1">
                <div className="text-[10px] text-[var(--color-text-muted)] uppercase font-semibold">
                  Avg SLA Repair Response
                </div>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="font-mono text-lg font-bold text-[var(--color-text-muted)] line-through">
                    {selectedImpact.responseTimeDaysBefore} days
                  </span>
                  <span className="font-mono text-xl font-bold text-[var(--color-accent)]">
                    {selectedImpact.responseTimeDaysAfter} days
                  </span>
                </div>
                <div className="text-[10px] text-[var(--color-accent)] font-semibold">
                  3x faster emergency resolution
                </div>
              </div>

              {/* Citizen Satisfaction */}
              <div className="p-3.5 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface-secondary)] space-y-1">
                <div className="text-[10px] text-[var(--color-text-muted)] uppercase font-semibold">
                  Citizen Approval Rating
                </div>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="font-mono text-lg font-bold text-[var(--color-text-muted)] line-through">
                    {selectedImpact.citizenSatisfactionBeforePct}%
                  </span>
                  <span className="font-mono text-xl font-bold text-cyan-600 dark:text-cyan-400">
                    {selectedImpact.citizenSatisfactionAfterPct}%
                  </span>
                </div>
                <div className="text-[10px] text-cyan-600 dark:text-cyan-400 font-semibold">
                  +{selectedImpact.citizenSatisfactionAfterPct - selectedImpact.citizenSatisfactionBeforePct}% satisfaction surge
                </div>
              </div>
            </div>

            {/* Verified Technical Outcome */}
            <div className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface-secondary)] p-4 space-y-2">
              <h4 className="font-semibold text-xs text-[var(--color-text-primary)]">
                Field Telemetry Verification Summary
              </h4>
              <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                {selectedImpact.verifiedOutcomeSummary}
              </p>
              <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-[var(--color-text-muted)] border-t border-[var(--color-border)]">
                <div>
                  Prior Baseline: <strong className="text-[var(--color-text-primary)]">{selectedImpact.infrastructureReliabilityBefore}</strong>
                </div>
                <div>
                  Post Delivery: <strong className="text-emerald-600 dark:text-emerald-400">{selectedImpact.infrastructureReliabilityAfter}</strong>
                </div>
              </div>
            </div>

            {/* Citizen Feedback Samples */}
            <div className="space-y-3">
              <h4 className="font-semibold text-xs text-[var(--color-text-primary)] uppercase tracking-wider">
                Audited Resident Feedback & Star Ratings
              </h4>
              <div className="space-y-2.5">
                {selectedImpact.citizenFeedbackSample.map((fb, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-surface)] text-xs space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-amber-500">
                        {Array.from({ length: fb.stars }).map((_, s) => (
                          <IconStar key={s} className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
                        ))}
                      </div>
                      <span className="font-mono text-[10px] text-[var(--color-text-muted)]">{fb.date}</span>
                    </div>
                    <p className="text-[11px] text-[var(--color-text-primary)] italic font-serif leading-relaxed">
                      "{fb.quote}"
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
