/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  IconBuildingBank,
  IconChartInfographic,
  IconUsers,
  IconTools,
  IconCoins,
  IconArrowRight,
  IconSparkles,
  IconAlertTriangle,
  IconInfoCircle,
} from '@tabler/icons-react';
import { Hotspot } from '../../types';
import { SvgFlag } from '../common/SvgFlag';

interface TriangulationViewProps {
  hotspots: Hotspot[];
  onSelectHotspotForProject: (hotspot: Hotspot) => void;
  onOpenCitizenIntake: (hotspot: Hotspot) => void;
}

export const TriangulationView: React.FC<TriangulationViewProps> = ({
  hotspots,
  onSelectHotspotForProject,
  onOpenCitizenIntake,
}) => {
  const [selectedHotspotId, setSelectedHotspotId] = useState<string>(hotspots[0]?.id || '');
  const [sortKey, setSortKey] = useState<'discrepancy' | 'requests' | 'deficit'>('discrepancy');
  const [simulatedCapexBoost, setSimulatedCapexBoost] = useState<number>(0);

  const selectedHotspot = hotspots.find((h) => h.id === selectedHotspotId) || hotspots[0];

  const sortedHotspots = [...hotspots].sort((a, b) => {
    if (sortKey === 'discrepancy') return b.hotspotDiscrepancyIndex - a.hotspotDiscrepancyIndex;
    if (sortKey === 'requests') return b.citizenRequestCount - a.citizenRequestCount;
    return b.infrastructure.overallDeficitScore - a.infrastructure.overallDeficitScore;
  });

  // Calculate adjusted discrepancy when simulated capex boost is applied
  const simulatedDiscrepancy = Math.max(
    10,
    selectedHotspot.hotspotDiscrepancyIndex - simulatedCapexBoost * 0.45
  );

  return (
    <div className="space-y-6">
      {/* Top Description */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] font-bold text-[var(--color-accent)] bg-[var(--color-accent-subtle)] px-2 py-0.5 rounded-xs border border-[var(--color-accent)]/20 uppercase">
              Cross-Dimensional Triangulation
            </span>
            <span className="text-xs text-[var(--color-text-muted)]">
              DPG Interoperability Protocol 1.4
            </span>
          </div>
          <h1 className="font-editorial text-2xl font-medium text-[var(--color-text-primary)] mt-1">
            4-Way Demand & Deficit Triangulation Engine
          </h1>
          <p className="text-xs text-[var(--color-text-muted)] max-w-2xl">
            Surfacing spatial and fiscal mismatch between where vulnerable citizens face daily infrastructure failure versus where national municipal capex is allocated.
          </p>
        </div>

        {/* Sort Controls */}
        <div className="flex items-center gap-2 text-xs">
          <span className="text-[var(--color-text-muted)]">Sort by:</span>
          <select
            value={sortKey}
            onChange={(e) => setSortKey(e.target.value as any)}
            className="rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-surface)] px-2.5 py-1 text-xs text-[var(--color-text-primary)] focus:outline-hidden"
          >
            <option value="discrepancy">Discrepancy Index</option>
            <option value="requests">Citizen Demand Volume</option>
            <option value="deficit">Infrastructure Deficit</option>
          </select>
        </div>
      </div>

      {/* Main Grid: Hotspot Node Rail (Left 4 cols) vs 4-Way Analysis (Right 8 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Hotspots List (4 cols) */}
        <div className="lg:col-span-4 space-y-3">
          <div className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider px-1">
            Surfaced Regional Nodes ({sortedHotspots.length})
          </div>

          {sortedHotspots.map((h) => {
            const isSelected = h.id === selectedHotspot.id;
            const flagCode =
              h.country === 'India'
                ? 'IN'
                : h.country === 'Brazil'
                ? 'BR'
                : h.country === 'South Africa'
                ? 'ZA'
                : h.country === 'China'
                ? 'CN'
                : h.country === 'Russia'
                ? 'RU'
                : 'ET';

            return (
              <div
                key={h.id}
                onClick={() => {
                  setSelectedHotspotId(h.id);
                  setSimulatedCapexBoost(0);
                }}
                className={`p-4 rounded-[var(--radius-md)] border cursor-pointer transition-all ${
                  isSelected
                    ? 'border-[var(--color-accent)] bg-[var(--color-accent-subtle)] shadow-xs'
                    : 'border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-border-strong)]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <SvgFlag countryCode={flagCode} />
                    <span className="font-semibold text-xs text-[var(--color-text-primary)]">
                      {h.name}
                    </span>
                  </div>
                  <span
                    className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-xs ${
                      h.hotspotDiscrepancyIndex >= 90
                        ? 'bg-[var(--color-danger-bg)] text-[var(--color-danger-text)]'
                        : 'bg-[var(--color-warning-bg)] text-[var(--color-warning-text)]'
                    }`}
                  >
                    Index: {h.hotspotDiscrepancyIndex}
                  </span>
                </div>

                <div className="mt-2 grid grid-cols-2 gap-2 text-[10px] text-[var(--color-text-muted)]">
                  <div>Grievances: {h.citizenRequestCount.toLocaleString()}</div>
                  <div>Deficit Score: {h.infrastructure.overallDeficitScore.toFixed(0)}</div>
                  <div>Unfunded Gap: ${(h.investment.unfundedDeficitGapUsd / 1e6).toFixed(0)}M</div>
                  <div className="text-[var(--color-accent)] font-semibold">{h.topSector}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* 4-Way Analysis Dashboard (8 cols) */}
        <div className="lg:col-span-8 space-y-5">
          <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-6 shadow-xs">
            {/* Header info */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-[var(--color-border)] pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-editorial text-xl font-medium text-[var(--color-text-primary)]">
                    {selectedHotspot.name}
                  </h2>
                  <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded-xs bg-[var(--color-surface-secondary)] text-[var(--color-text-secondary)] border border-[var(--color-border)]">
                    {selectedHotspot.code}
                  </span>
                </div>
                <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
                  {selectedHotspot.country} · Coordinates [{selectedHotspot.latitude},{' '}
                  {selectedHotspot.longitude}]
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="text-[10px] text-[var(--color-text-muted)] uppercase font-semibold">
                    Discrepancy Index
                  </div>
                  <div className="font-mono text-xl font-bold text-[var(--color-danger-text)]">
                    {simulatedDiscrepancy.toFixed(1)}/100
                  </div>
                </div>
                <div className="h-8 w-px bg-[var(--color-border)]" />
                <span className="text-[11px] font-semibold text-[var(--color-danger-text)] bg-[var(--color-danger-bg)] border border-[var(--color-danger-border)] px-2.5 py-1 rounded-xs">
                  {selectedHotspot.statusTag}
                </span>
              </div>
            </div>

            {/* 4 Dimension Triangulation Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              {/* Dimension 1: Citizen Demand Density */}
              <div className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface-secondary)] p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-xs text-[var(--color-text-primary)] flex items-center gap-1.5">
                    <IconUsers className="h-4 w-4 text-[var(--color-accent)]" />
                    <span>1. Citizen Demand Density</span>
                  </span>
                  <span className="font-mono text-xs font-bold text-[var(--color-accent)]">
                    {selectedHotspot.citizenRequestCount.toLocaleString()}
                  </span>
                </div>
                <p className="text-[11px] text-[var(--color-text-secondary)] leading-relaxed">
                  Aggregated from multilingual IVR voice channels and WhatsApp bot grievances over the rolling 12 months.
                </p>
                <div className="pt-1 text-[10px] text-[var(--color-text-muted)] border-t border-[var(--color-border)]">
                  Top Pain Sector: <strong className="text-[var(--color-text-primary)]">{selectedHotspot.topSector}</strong>
                </div>
              </div>

              {/* Dimension 2: Infrastructure Deficit */}
              <div className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface-secondary)] p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-xs text-[var(--color-text-primary)] flex items-center gap-1.5">
                    <IconTools className="h-4 w-4 text-[var(--color-warning)]" />
                    <span>2. Physical Deficit Index</span>
                  </span>
                  <span className="font-mono text-xs font-bold text-[var(--color-warning-text)]">
                    {selectedHotspot.infrastructure.overallDeficitScore.toFixed(0)}/100
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-1.5 text-[10px] text-[var(--color-text-secondary)]">
                  <div>Tap Access: <strong>{selectedHotspot.infrastructure.waterAccessPct}%</strong></div>
                  <div>Grid Reliability: <strong>{selectedHotspot.infrastructure.gridReliabilityHours}h/day</strong></div>
                  <div>Paved Roads: <strong>{selectedHotspot.infrastructure.allWeatherRoadConnectivityPct}%</strong></div>
                  <div>Broadband: <strong>{selectedHotspot.infrastructure.digitalBroadbandPenetrationPct}%</strong></div>
                </div>
              </div>

              {/* Dimension 3: Demographic Vulnerability */}
              <div className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface-secondary)] p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-xs text-[var(--color-text-primary)] flex items-center gap-1.5">
                    <IconChartInfographic className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                    <span>3. Demographic Vulnerability</span>
                  </span>
                  <span className="font-mono text-xs font-bold text-purple-600 dark:text-purple-400">
                    MPI {selectedHotspot.demographics.multidimensionalPovertyIndex}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-1.5 text-[10px] text-[var(--color-text-secondary)]">
                  <div>Population: <strong>{(selectedHotspot.demographics.totalPopulation / 1e6).toFixed(1)}M</strong></div>
                  <div>Vulnerable HH: <strong>{selectedHotspot.demographics.vulnerableHouseholdsPct}%</strong></div>
                  <div>Youth Ratio: <strong>{selectedHotspot.demographics.youthRatioPct}%</strong></div>
                  <div>Rural Split: <strong>{selectedHotspot.demographics.urbanRuralSplit.ruralPct}% Rural</strong></div>
                </div>
              </div>

              {/* Dimension 4: Fiscal CapEx Alignment */}
              <div className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface-secondary)] p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-xs text-[var(--color-text-primary)] flex items-center gap-1.5">
                    <IconCoins className="h-4 w-4 text-emerald-600" />
                    <span>4. Capital Budget Alignment</span>
                  </span>
                  <span className="font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400">
                    Score {selectedHotspot.investment.budgetAlignmentScore}/100
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-1.5 text-[10px] text-[var(--color-text-secondary)]">
                  <div>Allocated CapEx: <strong>${(selectedHotspot.investment.allocatedCapexUsd / 1e6).toFixed(0)}M</strong></div>
                  <div>Unfunded Gap: <strong>${(selectedHotspot.investment.unfundedDeficitGapUsd / 1e6).toFixed(0)}M</strong></div>
                  <div>Fiscal Year: <strong>{selectedHotspot.investment.fiscalYear}</strong></div>
                  <div>Focus Sector: <strong>{selectedHotspot.investment.primaryFocusSector}</strong></div>
                </div>
              </div>
            </div>

            {/* Simulation Slider: What if CapEx is boosted? */}
            <div className="rounded-[var(--radius-md)] border border-[var(--color-accent)]/30 bg-[var(--color-accent-subtle)] p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <IconSparkles className="h-4 w-4 text-[var(--color-accent)]" />
                  <span className="font-semibold text-xs text-[var(--color-text-primary)]">
                    Capital Intervention Sandbox Simulation
                  </span>
                </div>
                <span className="font-mono text-xs font-bold text-[var(--color-accent)]">
                  +${simulatedCapexBoost}M CapEx Boost
                </span>
              </div>

              <input
                type="range"
                min="0"
                max="100"
                step="5"
                value={simulatedCapexBoost}
                onChange={(e) => setSimulatedCapexBoost(Number(e.target.value))}
                className="w-full accent-[var(--color-accent)] cursor-pointer"
              />

              <div className="flex items-center justify-between text-[11px] text-[var(--color-text-secondary)]">
                <span>Current Discrepancy: {selectedHotspot.hotspotDiscrepancyIndex}</span>
                <span className="font-semibold text-[var(--color-accent)]">
                  Projected Index with +${simulatedCapexBoost}M:{' '}
                  <strong>{simulatedDiscrepancy.toFixed(1)}</strong> (
                  -{(selectedHotspot.hotspotDiscrepancyIndex - simulatedDiscrepancy).toFixed(1)} drop)
                </span>
              </div>
            </div>

            {/* Action Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[var(--color-border)]">
              <div className="flex items-center gap-1.5 text-xs text-[var(--color-text-muted)]">
                <IconInfoCircle className="h-4 w-4" />
                <span>Ready for NDB packaging & concession financing</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onOpenCitizenIntake(selectedHotspot)}
                  className="rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-1.5 text-xs font-semibold text-[var(--color-text-primary)] hover:bg-[var(--color-surface-secondary)] cursor-pointer"
                >
                  Log Citizen Grievance Here
                </button>
                <button
                  onClick={() => onSelectHotspotForProject(selectedHotspot)}
                  className="inline-flex items-center gap-1.5 rounded-[var(--radius-sm)] bg-[var(--color-accent)] px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-[var(--color-accent-hover)] cursor-pointer"
                >
                  <span>Formulate Bankable Project</span>
                  <IconArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
