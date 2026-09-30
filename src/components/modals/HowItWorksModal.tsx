/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  IconX,
  IconMicrophone,
  IconBinaryTree,
  IconChartInfographic,
  IconBuildingBank,
  IconCircleCheck,
  IconArrowRight,
  IconWorld,
  IconShieldLock,
} from '@tabler/icons-react';

interface HowItWorksModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExploreHotspots: () => void;
  onViewProjects: () => void;
}

export const HowItWorksModal: React.FC<HowItWorksModalProps> = ({
  isOpen,
  onClose,
  onExploreHotspots,
  onViewProjects,
}) => {
  if (!isOpen) return null;

  const steps = [
    {
      num: '01',
      title: 'Multilingual Citizen Intake',
      icon: IconMicrophone,
      desc: 'Residents in remote districts report infrastructure breakdowns via toll-free IVR voice calls, WhatsApp, WeChat, or SMS in local languages (Hindi, isiXhosa, Portuguese, Amharic, Russian).',
      detail: 'Open speech-to-text models translate dialects, extract GPS coordinates, categorize sectors, and assign DPG standard tracking codes.',
    },
    {
      num: '02',
      title: 'Collective Triangulation Engine',
      icon: IconBinaryTree,
      desc: 'The platform aggregates individual reports into collective demand clusters, suppressing spam and verifying local severity.',
      detail: 'Cross-references real-time citizen voice density with Census multidimensional poverty indices, telemetry asset health, and municipal budget lines.',
    },
    {
      num: '03',
      title: 'AI Hotspot Discrepancy Index',
      icon: IconChartInfographic,
      desc: 'Calculates the Discrepancy Index (0-100) identifying areas where citizen suffering is acute yet government capital allocation is absent.',
      detail: 'Surfaces misallocated CapEx and severe funding gaps, enabling ministers to adjust fiscal envelopes before project procurement.',
    },
    {
      num: '04',
      title: 'Bankable Infrastructure Packaging',
      icon: IconBuildingBank,
      desc: 'Translates validated civic demand into bankable infrastructure project proposals conforming to New Development Bank (NDB) standards.',
      detail: 'Generates blended finance options, carbon offset estimates, and procurement-ready policy dossiers with 1-click official approval.',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="relative w-full max-w-3xl rounded-[var(--radius-lg)] border border-[var(--color-border-strong)] bg-[var(--color-surface)] shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[var(--color-border)] px-6 py-4 bg-[var(--color-surface-secondary)]">
          <div className="flex items-center gap-2">
            <IconWorld className="h-5 w-5 text-[var(--color-accent)]" />
            <h3 className="font-semibold text-base text-[var(--color-text-primary)]">
              How CivicPulse BRICS Transforms Citizen Voice into Infrastructure
            </h3>
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
          <div className="rounded-[var(--radius-md)] bg-[var(--color-accent-subtle)] border border-[var(--color-accent)]/20 p-4">
            <p className="text-xs text-[var(--color-text-primary)] leading-relaxed font-medium">
              CivicPulse BRICS operates as a Digital Public Good (DPG) bridging the historical divide between bottom-up citizen hardship and top-down sovereign multilateral capital allocation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.num}
                  className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] p-4 flex flex-col justify-between hover:border-[var(--color-accent)] transition-colors"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-[var(--color-accent)]">
                        {step.num}
                      </span>
                      <div className="flex h-7 w-7 items-center justify-center rounded-[var(--radius-sm)] bg-[var(--color-surface-secondary)] text-[var(--color-accent)]">
                        <Icon className="h-4 w-4" />
                      </div>
                    </div>
                    <h4 className="font-semibold text-xs text-[var(--color-text-primary)]">
                      {step.title}
                    </h4>
                    <p className="text-[11px] text-[var(--color-text-secondary)] leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                  <div className="mt-3 pt-3 border-t border-[var(--color-border)] text-[10px] text-[var(--color-text-muted)] flex items-start gap-1.5">
                    <IconCircleCheck className="h-3.5 w-3.5 text-[var(--color-success)] shrink-0 mt-0.5" />
                    <span>{step.detail}</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-surface-secondary)] p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <IconShieldLock className="h-4 w-4 text-[var(--color-accent)]" />
              <span className="text-[11px] font-medium text-[var(--color-text-secondary)]">
                Compliant with Digital Public Goods Standard, Open Data Schema & NDB Green Finance
              </span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  onClose();
                  onExploreHotspots();
                }}
                className="inline-flex items-center gap-1 rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-surface)] px-2.5 py-1 text-xs font-medium text-[var(--color-text-primary)] hover:bg-[var(--color-surface-secondary)] cursor-pointer"
              >
                <span>View Heatmap</span>
                <IconArrowRight className="h-3 w-3" />
              </button>
              <button
                onClick={() => {
                  onClose();
                  onViewProjects();
                }}
                className="inline-flex items-center gap-1 rounded-[var(--radius-sm)] bg-[var(--color-accent)] px-2.5 py-1 text-xs font-medium text-white hover:bg-[var(--color-accent-hover)] cursor-pointer"
              >
                <span>View Bankable Projects</span>
                <IconArrowRight className="h-3 w-3" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
