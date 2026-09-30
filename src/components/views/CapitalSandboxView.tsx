/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  IconCoins,
  IconChartBar,
  IconUsers,
  IconTarget,
  IconShieldCheck,
  IconTrendingUp,
  IconRefresh,
} from '@tabler/icons-react';
import { SvgFlag } from '../common/SvgFlag';

export const CapitalSandboxView: React.FC = () => {
  const [selectedCountry, setSelectedCountry] = useState('India');
  const [totalBudgetUsdM, setTotalBudgetUsdM] = useState(250);

  // Sector allocation percentages (must sum near 100)
  const [waterPct, setWaterPct] = useState(35);
  const [energyPct, setEnergyPct] = useState(25);
  const [transportPct, setTransportPct] = useState(20);
  const [dpiPct, setDpiPct] = useState(15);
  const [healthPct, setHealthPct] = useState(5);

  const totalPct = waterPct + energyPct + transportPct + dpiPct + healthPct;

  // Predictive calculations
  const projectedDeficitReduction = Math.min(92, (totalBudgetUsdM / 400) * 85);
  const projectedBeneficiariesM = ((totalBudgetUsdM / 250) * 14.8).toFixed(1);
  const projectedEsgRoi = (1.4 + (totalBudgetUsdM / 300) * 0.8).toFixed(2);
  const projectedDiscrepancyDrop = Math.min(48, (totalBudgetUsdM / 300) * 42).toFixed(1);

  const resetDefaults = () => {
    setTotalBudgetUsdM(250);
    setWaterPct(35);
    setEnergyPct(25);
    setTransportPct(20);
    setDpiPct(15);
    setHealthPct(5);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] font-bold text-[var(--color-accent)] bg-[var(--color-accent-subtle)] px-2 py-0.5 rounded-xs border border-[var(--color-accent)]/20 uppercase">
              Multilateral Fiscal Sandbox
            </span>
            <span className="text-xs text-[var(--color-text-muted)]">
              DPG Model Standard 4.2
            </span>
          </div>
          <h1 className="font-editorial text-2xl font-medium text-[var(--color-text-primary)] mt-1">
            Capital Allocation & Deficit Sandbox
          </h1>
          <p className="text-xs text-[var(--color-text-muted)] max-w-2xl">
            Model sovereign CapEx investments against citizen demand density to forecast poverty reduction, deficit alleviation, and multilateral ESG ROI.
          </p>
        </div>

        <button
          onClick={resetDefaults}
          className="inline-flex items-center gap-1.5 rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-1.5 text-xs font-semibold text-[var(--color-text-primary)] hover:bg-[var(--color-surface-secondary)] cursor-pointer"
        >
          <IconRefresh className="h-4 w-4" />
          <span>Reset Default Envelope</span>
        </button>
      </div>

      {/* Main Grid: Controls on Left, Projections on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Sliders Control Panel (7 cols) */}
        <div className="lg:col-span-7 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-6 shadow-xs">
          <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-4">
            <div className="flex items-center gap-2">
              <IconCoins className="h-5 w-5 text-[var(--color-accent)]" />
              <h3 className="font-semibold text-sm text-[var(--color-text-primary)]">
                Fiscal Capital Envelope Configuration
              </h3>
            </div>

            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-surface-secondary)] px-2.5 py-1 text-xs text-[var(--color-text-primary)]"
            >
              <option value="India">India Sovereign Facility</option>
              <option value="Brazil">Brazil BNDES Facility</option>
              <option value="South Africa">South Africa Transversal</option>
              <option value="China">China Western Development</option>
              <option value="Ethiopia">Ethiopia Fayda Facility</option>
            </select>
          </div>

          {/* Total Budget Slider */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-[var(--color-text-primary)]">
                Total Sovereign Infrastructure Allocation
              </span>
              <span className="font-mono text-base font-bold text-[var(--color-accent)]">
                ${totalBudgetUsdM} Million USD
              </span>
            </div>
            <input
              type="range"
              min="50"
              max="600"
              step="10"
              value={totalBudgetUsdM}
              onChange={(e) => setTotalBudgetUsdM(Number(e.target.value))}
              className="w-full accent-[var(--color-accent)] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-[var(--color-text-muted)] font-mono">
              <span>$50M Concessional Floor</span>
              <span>$600M Multi-State Facility</span>
            </div>
          </div>

          {/* Sector Allocation Sliders */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-[var(--color-text-primary)]">
                Cross-Sector Budget Distribution
              </span>
              <span
                className={`font-mono text-xs font-bold px-2 py-0.5 rounded-xs ${
                  totalPct === 100
                    ? 'bg-emerald-500/10 text-emerald-600'
                    : 'bg-amber-500/10 text-amber-600'
                }`}
              >
                Sum: {totalPct}% {totalPct === 100 ? '(Balanced)' : `(${100 - totalPct}% delta)`}
              </span>
            </div>

            {/* Water & Sanitation */}
            <div className="space-y-1 text-xs">
              <div className="flex justify-between text-[11px]">
                <span className="text-[var(--color-text-primary)] font-medium">Water & Sanitation</span>
                <span className="font-mono text-[var(--color-accent)] font-semibold">
                  {waterPct}% (${((totalBudgetUsdM * waterPct) / 100).toFixed(1)}M)
                </span>
              </div>
              <input
                type="range"
                min="5"
                max="60"
                value={waterPct}
                onChange={(e) => setWaterPct(Number(e.target.value))}
                className="w-full accent-[var(--color-accent)] cursor-pointer"
              />
            </div>

            {/* Clean Energy */}
            <div className="space-y-1 text-xs">
              <div className="flex justify-between text-[11px]">
                <span className="text-[var(--color-text-primary)] font-medium">Clean Energy & Grid</span>
                <span className="font-mono text-[var(--color-accent)] font-semibold">
                  {energyPct}% (${((totalBudgetUsdM * energyPct) / 100).toFixed(1)}M)
                </span>
              </div>
              <input
                type="range"
                min="5"
                max="60"
                value={energyPct}
                onChange={(e) => setEnergyPct(Number(e.target.value))}
                className="w-full accent-[var(--color-accent)] cursor-pointer"
              />
            </div>

            {/* Rural Transport */}
            <div className="space-y-1 text-xs">
              <div className="flex justify-between text-[11px]">
                <span className="text-[var(--color-text-primary)] font-medium">Rural Transport & Roads</span>
                <span className="font-mono text-[var(--color-accent)] font-semibold">
                  {transportPct}% (${((totalBudgetUsdM * transportPct) / 100).toFixed(1)}M)
                </span>
              </div>
              <input
                type="range"
                min="5"
                max="50"
                value={transportPct}
                onChange={(e) => setTransportPct(Number(e.target.value))}
                className="w-full accent-[var(--color-accent)] cursor-pointer"
              />
            </div>

            {/* DPI */}
            <div className="space-y-1 text-xs">
              <div className="flex justify-between text-[11px]">
                <span className="text-[var(--color-text-primary)] font-medium">Digital Public Infrastructure</span>
                <span className="font-mono text-[var(--color-accent)] font-semibold">
                  {dpiPct}% (${((totalBudgetUsdM * dpiPct) / 100).toFixed(1)}M)
                </span>
              </div>
              <input
                type="range"
                min="5"
                max="40"
                value={dpiPct}
                onChange={(e) => setDpiPct(Number(e.target.value))}
                className="w-full accent-[var(--color-accent)] cursor-pointer"
              />
            </div>

            {/* Healthcare */}
            <div className="space-y-1 text-xs">
              <div className="flex justify-between text-[11px]">
                <span className="text-[var(--color-text-primary)] font-medium">Healthcare Facilities</span>
                <span className="font-mono text-[var(--color-accent)] font-semibold">
                  {healthPct}% (${((totalBudgetUsdM * healthPct) / 100).toFixed(1)}M)
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="30"
                value={healthPct}
                onChange={(e) => setHealthPct(Number(e.target.value))}
                className="w-full accent-[var(--color-accent)] cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Projection Results Panel (5 cols) */}
        <div className="lg:col-span-5 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-6 shadow-xs">
          <div className="border-b border-[var(--color-border)] pb-4">
            <h3 className="font-semibold text-sm text-[var(--color-text-primary)] flex items-center gap-2">
              <IconTrendingUp className="h-4 w-4 text-[var(--color-accent)]" />
              <span>Projected Policy & Socioeconomic Outcomes</span>
            </h3>
            <p className="text-[11px] text-[var(--color-text-muted)] mt-0.5">
              Simulated across {selectedCountry} census demographic cohorts
            </p>
          </div>

          <div className="space-y-3">
            <div className="p-4 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface-secondary)] space-y-1">
              <div className="text-[10px] text-[var(--color-text-muted)] uppercase font-semibold">
                Deficit Gap Alleviation
              </div>
              <div className="font-mono text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                {projectedDeficitReduction.toFixed(1)}%
              </div>
              <div className="text-[11px] text-[var(--color-text-muted)]">
                Closes ${(totalBudgetUsdM * 0.88).toFixed(0)}M of historical deficit
              </div>
            </div>

            <div className="p-4 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface-secondary)] space-y-1">
              <div className="text-[10px] text-[var(--color-text-muted)] uppercase font-semibold">
                Beneficiaries Reached
              </div>
              <div className="font-mono text-2xl font-bold text-[var(--color-text-primary)]">
                {projectedBeneficiariesM} Million
              </div>
              <div className="text-[11px] text-[var(--color-text-muted)]">
                In rural and semiárido poverty districts
              </div>
            </div>

            <div className="p-4 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface-secondary)] space-y-1">
              <div className="text-[10px] text-[var(--color-text-muted)] uppercase font-semibold">
                Hotspot Discrepancy Alleviation
              </div>
              <div className="font-mono text-2xl font-bold text-[var(--color-accent)]">
                -{projectedDiscrepancyDrop} Pts
              </div>
              <div className="text-[11px] text-[var(--color-text-muted)]">
                Cuts critical citizen hardship cluster index
              </div>
            </div>

            <div className="p-4 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface-secondary)] space-y-1">
              <div className="text-[10px] text-[var(--color-text-muted)] uppercase font-semibold">
                NDB Sovereign ESG Co-Financing Multiplier
              </div>
              <div className="font-mono text-2xl font-bold text-cyan-600 dark:text-cyan-400">
                {projectedEsgRoi}x
              </div>
              <div className="text-[11px] text-[var(--color-text-muted)]">
                Attracts ${(totalBudgetUsdM * Number(projectedEsgRoi)).toFixed(0)}M in matching commercial green bonds
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
