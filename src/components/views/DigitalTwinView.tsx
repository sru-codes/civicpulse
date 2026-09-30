/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  IconDeviceTv,
  IconTools,
  IconAlertTriangle,
  IconCheck,
  IconSearch,
  IconActivity,
  IconHistory,
  IconCalendar,
  IconUsers,
  IconSend,
} from '@tabler/icons-react';
import { InfrastructureAsset } from '../../types';
import { SvgFlag } from '../common/SvgFlag';

interface DigitalTwinViewProps {
  assets: InfrastructureAsset[];
  onOpenIntake: () => void;
}

export const DigitalTwinView: React.FC<DigitalTwinViewProps> = ({ assets, onOpenIntake }) => {
  const [selectedAssetId, setSelectedAssetId] = useState<string>(assets[0]?.id || '');
  const [sectorFilter, setSectorFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [dispatchLogged, setDispatchLogged] = useState(false);

  const selectedAsset = assets.find((a) => a.id === selectedAssetId) || assets[0];

  const filteredAssets = assets.filter((a) => {
    if (sectorFilter !== 'All' && a.sector !== sectorFilter) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      if (!a.name.toLowerCase().includes(q) && !a.id.toLowerCase().includes(q)) return false;
    }
    return true;
  });

  const handleDispatchEngineer = () => {
    setDispatchLogged(true);
    setTimeout(() => setDispatchLogged(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] font-bold text-[var(--color-accent)] bg-[var(--color-accent-subtle)] px-2 py-0.5 rounded-xs border border-[var(--color-accent)]/20 uppercase">
              Field Telemetry & SCADA Grid
            </span>
            <span className="text-xs text-[var(--color-text-muted)]">
              DPG Interoperability Protocol 2.1
            </span>
          </div>
          <h1 className="font-editorial text-2xl font-medium text-[var(--color-text-primary)] mt-1">
            Physical Digital Twin Telemetry Grid
          </h1>
          <p className="text-xs text-[var(--color-text-muted)] max-w-2xl">
            Real-time condition monitoring of vulnerable municipal pumping stations, rural distribution transformers, flood culverts, and microwave towers.
          </p>
        </div>

        <button
          onClick={onOpenIntake}
          className="inline-flex items-center gap-1.5 rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-1.5 text-xs font-semibold text-[var(--color-text-primary)] hover:bg-[var(--color-surface-secondary)] cursor-pointer"
        >
          <IconTools className="h-4 w-4 text-[var(--color-accent)]" />
          <span>Report Asset Fault</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-wrap items-center gap-3 p-3 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] text-xs">
        <div className="flex-1 min-w-[200px] flex items-center gap-2 px-3 py-1.5 rounded-[var(--radius-sm)] bg-[var(--color-surface-secondary)] border border-[var(--color-border)]">
          <IconSearch className="h-4 w-4 text-[var(--color-text-muted)]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search assets by name or ID..."
            className="w-full bg-transparent text-xs text-[var(--color-text-primary)] focus:outline-hidden"
          />
        </div>

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
      </div>

      {/* Split View: Asset List (4 cols) vs Digital Twin telemetry (8 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Asset List (4 cols) */}
        <div className="lg:col-span-4 space-y-3">
          <div className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider px-1">
            Monitored Public Assets ({filteredAssets.length})
          </div>

          {filteredAssets.map((asset) => {
            const isSelected = asset.id === selectedAsset.id;
            const flagCode =
              asset.country === 'India'
                ? 'IN'
                : asset.country === 'Brazil'
                ? 'BR'
                : asset.country === 'South Africa'
                ? 'ZA'
                : asset.country === 'China'
                ? 'CN'
                : asset.country === 'Russia'
                ? 'RU'
                : 'ET';

            return (
              <div
                key={asset.id}
                onClick={() => setSelectedAssetId(asset.id)}
                className={`p-3.5 rounded-[var(--radius-md)] border cursor-pointer transition-all ${
                  isSelected
                    ? 'border-[var(--color-accent)] bg-[var(--color-accent-subtle)] shadow-xs'
                    : 'border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-border-strong)]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <SvgFlag countryCode={flagCode} />
                    <span className="font-mono text-[10px] font-bold text-[var(--color-accent)]">
                      {asset.id}
                    </span>
                  </div>
                  <span
                    className={`text-[9px] font-bold px-1.5 py-0.5 rounded-xs ${
                      asset.condition === 'Critical'
                        ? 'bg-[var(--color-danger-bg)] text-[var(--color-danger-text)]'
                        : asset.condition === 'Degraded'
                        ? 'bg-[var(--color-warning-bg)] text-[var(--color-warning-text)]'
                        : 'bg-emerald-500/10 text-emerald-600'
                    }`}
                  >
                    {asset.condition} ({asset.riskScore}/100)
                  </span>
                </div>

                <div className="font-semibold text-xs text-[var(--color-text-primary)] mt-1.5 line-clamp-1">
                  {asset.name}
                </div>

                <div className="flex items-center justify-between text-[10px] text-[var(--color-text-muted)] mt-2 pt-2 border-t border-[var(--color-border)]">
                  <span>{asset.sector}</span>
                  <span>{asset.reportedProblemsCount} Grievances</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Asset Telemetry (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-6 shadow-xs">
            {/* Top Info */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-[var(--color-border)] pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-[var(--color-accent)] bg-[var(--color-accent-subtle)] px-2 py-0.5 rounded-xs border border-[var(--color-accent)]/20">
                    {selectedAsset.id}
                  </span>
                  <span className="text-xs text-[var(--color-text-secondary)]">
                    {selectedAsset.region}, {selectedAsset.country}
                  </span>
                </div>
                <h2 className="font-editorial text-xl font-medium text-[var(--color-text-primary)] mt-1">
                  {selectedAsset.name}
                </h2>
              </div>

              <div className="text-right">
                <div className="text-[10px] text-[var(--color-text-muted)] uppercase font-semibold">
                  Failure Risk Score
                </div>
                <div className="font-mono text-xl font-bold text-[var(--color-danger-text)]">
                  {selectedAsset.riskScore}/100
                </div>
              </div>
            </div>

            {/* Telemetry Gauge Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface-secondary)]">
                <div className="text-[10px] text-[var(--color-text-muted)] uppercase font-semibold">
                  Operating Capacity
                </div>
                <div className="font-mono text-xs font-bold text-[var(--color-text-primary)] mt-1">
                  {selectedAsset.capacity}
                </div>
              </div>

              <div className="p-3 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface-secondary)]">
                <div className="text-[10px] text-[var(--color-text-muted)] uppercase font-semibold">
                  Population Served
                </div>
                <div className="font-mono text-xs font-bold text-[var(--color-text-primary)] mt-1">
                  {selectedAsset.populationServed.toLocaleString()}
                </div>
              </div>

              <div className="p-3 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface-secondary)]">
                <div className="text-[10px] text-[var(--color-text-muted)] uppercase font-semibold">
                  Asset Age
                </div>
                <div className="font-mono text-xs font-bold text-[var(--color-text-primary)] mt-1">
                  {selectedAsset.ageYears} Years
                </div>
              </div>

              <div className="p-3 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface-secondary)]">
                <div className="text-[10px] text-[var(--color-text-muted)] uppercase font-semibold">
                  Last Inspection
                </div>
                <div className="font-mono text-xs font-bold text-[var(--color-text-primary)] mt-1">
                  {selectedAsset.lastInspectionDate}
                </div>
              </div>
            </div>

            {/* Maintenance History Audit Log */}
            <div className="space-y-2">
              <div className="flex items-center gap-1.5 font-semibold text-xs text-[var(--color-text-primary)]">
                <IconHistory className="h-4 w-4 text-[var(--color-accent)]" />
                <span>Field Engineer Maintenance & Audit Trail</span>
              </div>

              <div className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface-secondary)] p-3 space-y-2 text-xs">
                {selectedAsset.maintenanceHistory.map((log, i) => (
                  <div key={i} className="flex items-center gap-2 text-[11px] text-[var(--color-text-secondary)]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
                    <span>{log}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Field Action Dispatcher */}
            <div className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface-secondary)] p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-xs text-[var(--color-text-primary)]">
                    Field Engineer Work Order Dispatch
                  </h4>
                  <p className="text-[11px] text-[var(--color-text-muted)]">
                    Assigned Agency: {selectedAsset.assignedDepartment}
                  </p>
                </div>

                <button
                  onClick={handleDispatchEngineer}
                  className="inline-flex items-center gap-1.5 rounded-[var(--radius-sm)] bg-[var(--color-accent)] px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-[var(--color-accent-hover)] cursor-pointer"
                >
                  {dispatchLogged ? (
                    <>
                      <IconCheck className="h-4 w-4" />
                      <span>Order Dispatched!</span>
                    </>
                  ) : (
                    <>
                      <IconSend className="h-4 w-4" />
                      <span>Issue Priority Dispatch</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
