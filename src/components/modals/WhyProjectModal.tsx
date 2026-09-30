/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  IconX,
  IconBrain,
  IconCheck,
  IconDatabase,
  IconBuildingBank,
  IconChecklist,
  IconReportAnalytics,
} from '@tabler/icons-react';
import { BankableProject } from '../../types';

interface WhyProjectModalProps {
  project: BankableProject | null;
  onClose: () => void;
  onApproveProject: (projectId: string, notes: string) => void;
  onOpenSimulator: () => void;
}

export const WhyProjectModal: React.FC<WhyProjectModalProps> = ({
  project,
  onClose,
  onApproveProject,
  onOpenSimulator,
}) => {
  const [activeTab, setActiveTab] = useState<'factors' | 'sources' | 'approval'>('factors');
  const [approvalNotes, setApprovalNotes] = useState('');
  const [isApproved, setIsApproved] = useState(false);

  if (!project) return null;

  const { explainableScore } = project;

  const handleApprove = () => {
    onApproveProject(project.id, approvalNotes || 'Approved by National Policymaker.');
    setIsApproved(true);
    setTimeout(() => {
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="relative w-full max-w-3xl rounded-[var(--radius-lg)] border border-[var(--color-border-strong)] bg-[var(--color-surface)] shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[var(--color-border)] px-6 py-4 bg-[var(--color-surface-secondary)]">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-[var(--radius-sm)] bg-[var(--color-accent-subtle)] text-[var(--color-accent)] border border-[var(--color-accent)]/30">
              <IconBrain className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-base text-[var(--color-text-primary)]">
                  Explainable AI Formulation Rubric
                </h3>
                <span className="font-mono text-xs font-bold text-white bg-[var(--color-accent)] px-2 py-0.5 rounded-xs">
                  Score: {explainableScore.priorityScore}/100
                </span>
              </div>
              <p className="text-xs text-[var(--color-text-muted)] truncate max-w-lg">
                {project.title}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-[var(--radius-sm)] p-1 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface)] transition-colors cursor-pointer"
          >
            <IconX className="h-5 w-5" />
          </button>
        </div>

        {/* Tab switch */}
        <div className="flex border-b border-[var(--color-border)] px-6 text-xs font-medium">
          <button
            onClick={() => setActiveTab('factors')}
            className={`py-3 px-3 border-b-2 cursor-pointer transition-colors ${
              activeTab === 'factors'
                ? 'border-[var(--color-accent)] text-[var(--color-accent)] font-semibold'
                : 'border-transparent text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
            }`}
          >
            Weighted Scoring Factors
          </button>
          <button
            onClick={() => setActiveTab('sources')}
            className={`py-3 px-3 border-b-2 cursor-pointer transition-colors ${
              activeTab === 'sources'
                ? 'border-[var(--color-accent)] text-[var(--color-accent)] font-semibold'
                : 'border-transparent text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
            }`}
          >
            Auditable Data Provenance
          </button>
          <button
            onClick={() => setActiveTab('approval')}
            className={`py-3 px-3 border-b-2 cursor-pointer transition-colors ${
              activeTab === 'approval'
                ? 'border-[var(--color-accent)] text-[var(--color-accent)] font-semibold'
                : 'border-transparent text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
            }`}
          >
            Ministerial Approval Workflow
          </button>
        </div>

        {/* Body */}
        <div className="p-6 max-h-[70vh] overflow-y-auto text-xs space-y-4">
          {activeTab === 'factors' && (
            <div className="space-y-3">
              <div className="rounded-[var(--radius-sm)] bg-[var(--color-surface-secondary)] border border-[var(--color-border)] p-3 text-[11px] text-[var(--color-text-secondary)]">
                The CivicPulse algorithm determines priority using a non-opaque mathematical rubric combining 5 grounded dimensions.
              </div>

              <div className="space-y-2.5">
                {explainableScore.factors.map((f, i) => (
                  <div
                    key={i}
                    className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] p-3.5 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-xs text-[var(--color-text-primary)]">
                          {f.factor}
                        </span>
                        <span className="rounded-xs bg-[var(--color-surface-secondary)] border border-[var(--color-border)] px-1.5 py-0.5 text-[10px] font-mono text-[var(--color-text-muted)]">
                          Weight: {f.contributionPct}%
                        </span>
                      </div>
                      <div className="font-mono text-xs font-bold text-[var(--color-accent)]">
                        Sub-Score: {f.score}/100
                      </div>
                    </div>

                    <div className="w-full bg-[var(--color-surface-secondary)] rounded-full h-1.5 overflow-hidden">
                      <div
                        className="bg-[var(--color-accent)] h-1.5 rounded-full"
                        style={{ width: `${f.score}%` }}
                      />
                    </div>

                    <p className="text-[11px] text-[var(--color-text-secondary)] leading-relaxed">
                      {f.detail}
                    </p>
                  </div>
                ))}
              </div>

              <div className="rounded-[var(--radius-md)] border border-[var(--color-accent)]/20 bg-[var(--color-accent-subtle)] p-3 text-[11px] text-[var(--color-text-primary)] flex items-start gap-2">
                <IconReportAnalytics className="h-4 w-4 text-[var(--color-accent)] shrink-0 mt-0.5" />
                <span>
                  <strong>Evidence Summary:</strong> {explainableScore.evidenceSummary}
                </span>
              </div>
            </div>
          )}

          {activeTab === 'sources' && (
            <div className="space-y-4">
              <div className="text-[11px] text-[var(--color-text-muted)]">
                Every metric used to rank this project is tethered to verifiable, cryptographically timestamped public data registries conforming to DPG standards.
              </div>

              <div className="space-y-2">
                {explainableScore.dataSources.map((src, i) => (
                  <div
                    key={i}
                    className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] p-3 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <IconDatabase className="h-4 w-4 text-[var(--color-accent)]" />
                      <span className="font-medium text-xs text-[var(--color-text-primary)]">
                        {src.source}
                      </span>
                    </div>
                    <span className="font-mono text-[10px] text-[var(--color-text-muted)] bg-[var(--color-surface-secondary)] px-2 py-0.5 rounded-xs border border-[var(--color-border)]">
                      {src.timestamp}
                    </span>
                  </div>
                ))}
              </div>

              <div className="rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-surface-secondary)] p-3 text-[11px] text-[var(--color-text-secondary)] space-y-1">
                <div className="font-semibold text-[var(--color-text-primary)]">
                  Cryptographic Nonce & Hash
                </div>
                <div className="font-mono text-[10px] text-[var(--color-accent)] select-all break-all">
                  SHA256: 8a4c8491d9b01934c9f1394e3a8904df9021b34a1795c62817d23a4918ef9b01
                </div>
              </div>
            </div>
          )}

          {activeTab === 'approval' && (
            <div className="space-y-4">
              <div className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface-secondary)] p-4 space-y-2">
                <div className="flex items-center gap-1.5 font-semibold text-xs text-[var(--color-text-primary)]">
                  <IconBuildingBank className="h-4 w-4 text-[var(--color-accent)]" />
                  <span>National Sovereign Authorization</span>
                </div>
                <p className="text-[11px] text-[var(--color-text-secondary)] leading-relaxed">
                  Authorizing this project elevates it from AI formulation status into the official BRICS New Development Bank (NDB) Country Pipeline for immediate concessional co-financing.
                </p>
              </div>

              <div className="space-y-1.5">
                <label className="block font-medium text-[11px] text-[var(--color-text-secondary)]">
                  Ministerial Notes & Board Conditions (Optional)
                </label>
                <textarea
                  rows={3}
                  value={approvalNotes}
                  onChange={(e) => setApprovalNotes(e.target.value)}
                  placeholder="e.g. Approved with condition of prioritizing local female technician employment for solar pump maintenance."
                  className="w-full rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-surface)] p-2.5 text-xs text-[var(--color-text-primary)] focus:outline-hidden focus:border-[var(--color-accent)]"
                />
              </div>

              <div className="pt-2 flex items-center justify-between">
                <button
                  onClick={() => {
                    onClose();
                    onOpenSimulator();
                  }}
                  className="text-xs text-[var(--color-accent)] hover:underline font-semibold cursor-pointer"
                >
                  Test in Capital Sandbox first →
                </button>

                <button
                  onClick={handleApprove}
                  disabled={isApproved}
                  className="inline-flex items-center gap-1.5 rounded-[var(--radius-sm)] bg-emerald-600 px-4 py-2 text-xs font-semibold text-white hover:bg-emerald-700 transition-colors cursor-pointer"
                >
                  {isApproved ? (
                    <>
                      <IconCheck className="h-4 w-4" />
                      <span>Approved & Notified!</span>
                    </>
                  ) : (
                    <>
                      <IconChecklist className="h-4 w-4" />
                      <span>Grant Ministerial Approval</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-[var(--color-border)] px-6 py-3 bg-[var(--color-surface-secondary)] flex justify-end">
          <button
            onClick={onClose}
            className="rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-1.5 text-xs font-medium text-[var(--color-text-primary)] hover:bg-[var(--color-surface-secondary)] transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
