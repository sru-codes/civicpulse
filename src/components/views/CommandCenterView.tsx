/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  IconFlame,
  IconUsers,
  IconCoins,
  IconBolt,
  IconAlertTriangle,
  IconArrowUpRight,
  IconBuildingBank,
  IconBuildingStore,
  IconMicrophone,
  IconMessageCircle2,
  IconChevronRight,
  IconShieldCheck,
  IconSparkles,
} from '@tabler/icons-react';
import {
  Hotspot,
  CitizenRequest,
  BankableProject,
  CollectiveCluster,
  EmergencyIncident,
} from '../../types';
import { SpotlightCard } from '../animations/SpotlightCard';
import { CountUp } from '../animations/CountUp';
import { ShinyText } from '../animations/ShinyText';
import { SvgFlag } from '../common/SvgFlag';

interface CommandCenterViewProps {
  hotspots: Hotspot[];
  recentRequests: CitizenRequest[];
  projects: BankableProject[];
  collectiveClusters: CollectiveCluster[];
  emergencyIncidents: EmergencyIncident[];
  isEmergencyActive: boolean;
  onToggleEmergency: () => void;
  onNavigateToHotspots: () => void;
  onNavigateToProjects: () => void;
  onNavigateToIntake: () => void;
  onSelectComplaint: (reqId: string) => void;
  onSelectClusterForProject: (cluster: CollectiveCluster) => void;
}

export const CommandCenterView: React.FC<CommandCenterViewProps> = ({
  hotspots,
  recentRequests,
  projects,
  collectiveClusters,
  emergencyIncidents,
  isEmergencyActive,
  onToggleEmergency,
  onNavigateToHotspots,
  onNavigateToProjects,
  onNavigateToIntake,
  onSelectComplaint,
  onSelectClusterForProject,
}) => {
  const totalRequests = hotspots.reduce((acc, h) => acc + h.citizenRequestCount, 0);
  const totalUnfundedGap = hotspots.reduce((acc, h) => acc + h.investment.unfundedDeficitGapUsd, 0);

  return (
    <div className="space-y-6">
      {/* Top Banner / Callout */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-xs">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] font-bold text-[var(--color-accent)] uppercase tracking-wider bg-[var(--color-accent-subtle)] px-2 py-0.5 rounded-xs border border-[var(--color-accent)]/20">
              NDB Cross-Border DPI Rail
            </span>
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[11px] text-[var(--color-text-muted)]">Live Telemetry Synchronized</span>
          </div>
          <h1 className="font-editorial text-2xl sm:text-3xl font-medium tracking-tight text-[var(--color-text-primary)]">
            National Infrastructure Decision Matrix
          </h1>
          <p className="text-xs text-[var(--color-text-secondary)] max-w-2xl leading-relaxed">
            Triangulating 64,530+ multilingual citizen development signals across BRICS partner nations with physical infrastructure health and municipal capital budgets.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={onToggleEmergency}
            className={`inline-flex items-center gap-1.5 rounded-[var(--radius-sm)] border px-3 py-1.5 text-xs font-semibold cursor-pointer transition-colors ${
              isEmergencyActive
                ? 'border-[var(--color-danger-border)] bg-[var(--color-danger-bg)] text-[var(--color-danger-text)]'
                : 'border-[var(--color-border)] bg-[var(--color-surface-secondary)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
            }`}
          >
            <IconAlertTriangle className="h-4 w-4" />
            <span>{isEmergencyActive ? 'Emergency Protocol Active' : 'Enable Emergency Mode'}</span>
          </button>

          <button
            onClick={onNavigateToIntake}
            className="inline-flex items-center gap-1.5 rounded-[var(--radius-sm)] bg-[var(--color-accent)] px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-[var(--color-accent-hover)] transition-all cursor-pointer shadow-xs"
          >
            <IconMicrophone className="h-4 w-4" />
            <span>Simulate Citizen Intake</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Row with React-Bits CountUp */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <SpotlightCard className="p-4 space-y-2">
          <div className="flex items-center justify-between text-[var(--color-text-muted)]">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Critical Hotspots</span>
            <IconFlame className="h-4 w-4 text-rose-500" />
          </div>
          <div className="text-2xl font-bold font-mono text-[var(--color-text-primary)]">
            <CountUp to={hotspots.length} />
            <span className="text-xs font-normal text-[var(--color-text-muted)] ml-1.5">regions</span>
          </div>
          <div className="text-[11px] text-[var(--color-text-muted)] flex items-center justify-between pt-1 border-t border-[var(--color-border)]">
            <span>Severe discrepancy index</span>
            <span className="font-semibold text-rose-600 dark:text-rose-400">Avg 87.2</span>
          </div>
        </SpotlightCard>

        <SpotlightCard className="p-4 space-y-2">
          <div className="flex items-center justify-between text-[var(--color-text-muted)]">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Citizen Voice Density</span>
            <IconUsers className="h-4 w-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-bold font-mono text-[var(--color-text-primary)]">
            <CountUp to={totalRequests} separator="," />
          </div>
          <div className="text-[11px] text-[var(--color-text-muted)] flex items-center justify-between pt-1 border-t border-[var(--color-border)]">
            <span>Multilingual IVR & Messaging</span>
            <span className="font-semibold text-emerald-600 dark:text-emerald-400">96.8% verified</span>
          </div>
        </SpotlightCard>

        <SpotlightCard className="p-4 space-y-2">
          <div className="flex items-center justify-between text-[var(--color-text-muted)]">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Unfunded Deficit Gap</span>
            <IconCoins className="h-4 w-4 text-amber-500" />
          </div>
          <div className="text-2xl font-bold font-mono text-[var(--color-text-primary)]">
            $<CountUp to={totalUnfundedGap / 1e6} decimals={0} />M
          </div>
          <div className="text-[11px] text-[var(--color-text-muted)] flex items-center justify-between pt-1 border-t border-[var(--color-border)]">
            <span>Capital budget shortfall</span>
            <span className="font-semibold text-amber-600 dark:text-amber-400">6 Key Basins</span>
          </div>
        </SpotlightCard>

        <SpotlightCard className="p-4 space-y-2">
          <div className="flex items-center justify-between text-[var(--color-text-muted)]">
            <span className="text-[11px] font-semibold uppercase tracking-wider">AI Bankable Projects</span>
            <IconBolt className="h-4 w-4 text-[var(--color-accent)]" />
          </div>
          <div className="text-2xl font-bold font-mono text-[var(--color-text-primary)]">
            <CountUp to={projects.length} />
            <span className="text-xs font-normal text-[var(--color-text-muted)] ml-1.5">formulated</span>
          </div>
          <div className="text-[11px] text-[var(--color-text-muted)] flex items-center justify-between pt-1 border-t border-[var(--color-border)]">
            <span>NDB blended financing</span>
            <span className="font-semibold text-[var(--color-accent)]">Ready to Fund</span>
          </div>
        </SpotlightCard>
      </div>

      {/* Emergency Incidents Callout if active */}
      {isEmergencyActive && (
        <div className="rounded-[var(--radius-lg)] border border-[var(--color-danger-border)] bg-[var(--color-danger-bg)] p-4 sm:p-5 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <IconAlertTriangle className="h-5 w-5 text-[var(--color-danger)]" />
              <h3 className="font-semibold text-sm text-[var(--color-danger-text)]">
                Active Civic Emergency Incidents ({emergencyIncidents.length})
              </h3>
            </div>
            <span className="text-[11px] font-mono text-[var(--color-danger-text)] font-medium">
              SLA Priority Level 1
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            {emergencyIncidents.map((inc) => (
              <div
                key={inc.id}
                className="rounded-[var(--radius-md)] border border-[var(--color-danger-border)] bg-[var(--color-surface)] p-3 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[10px] text-white bg-[var(--color-danger)] px-1.5 py-0.5 rounded-xs">
                      {inc.severity}
                    </span>
                    <span className="font-semibold text-[var(--color-text-primary)]">{inc.region}</span>
                  </div>
                  <span className="text-[10px] text-[var(--color-text-muted)]">{inc.reportedTimestamp}</span>
                </div>
                <p className="text-[11px] text-[var(--color-danger-text)] font-medium">
                  {inc.emergencyActionRequired}
                </p>
                <div className="flex items-center justify-between text-[10px] text-[var(--color-text-muted)] pt-1 border-t border-[var(--color-border)]">
                  <span>At Risk: {inc.populationAtRisk.toLocaleString()} residents</span>
                  <span>Velocity: +{inc.incomingGrievanceVelocityPerHour} reports/hr</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Two-Column Core: Hotspot Discrepancy & Collective Clusters */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Hotspots Overview Column (2 cols) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="font-semibold text-sm text-[var(--color-text-primary)]">
                Demographic & Infrastructure Deficit Hotspots
              </h2>
              <span className="text-[10px] text-[var(--color-text-muted)] font-mono">
                Sorted by Discrepancy Index
              </span>
            </div>
            <button
              onClick={onNavigateToHotspots}
              className="flex items-center gap-1 text-xs text-[var(--color-accent)] font-semibold hover:underline cursor-pointer"
            >
              <span>Explore Demand Heatmap</span>
              <IconArrowUpRight className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            {hotspots.map((hotspot) => {
              const flagCode =
                hotspot.country === 'India'
                  ? 'IN'
                  : hotspot.country === 'Brazil'
                  ? 'BR'
                  : hotspot.country === 'South Africa'
                  ? 'ZA'
                  : hotspot.country === 'China'
                  ? 'CN'
                  : hotspot.country === 'Russia'
                  ? 'RU'
                  : 'ET';

              return (
                <div
                  key={hotspot.id}
                  className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] p-4 flex flex-col justify-between hover:border-[var(--color-border-strong)] transition-all shadow-xs"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <SvgFlag countryCode={flagCode} />
                        <span className="font-semibold text-xs text-[var(--color-text-primary)]">
                          {hotspot.name}
                        </span>
                      </div>
                      <span
                        className={`text-[10px] font-bold px-1.5 py-0.5 rounded-xs ${
                          hotspot.hotspotDiscrepancyIndex >= 90
                            ? 'bg-[var(--color-danger-bg)] text-[var(--color-danger-text)] border border-[var(--color-danger-border)]'
                            : 'bg-[var(--color-warning-bg)] text-[var(--color-warning-text)] border border-[var(--color-warning-border)]'
                        }`}
                      >
                        Idx {hotspot.hotspotDiscrepancyIndex}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-[10px] text-[var(--color-text-muted)] bg-[var(--color-surface-secondary)] p-2 rounded-[var(--radius-xs)]">
                      <div>
                        Grievances: <strong className="text-[var(--color-text-primary)]">{hotspot.citizenRequestCount.toLocaleString()}</strong>
                      </div>
                      <div>
                        Top Sector: <strong className="text-[var(--color-text-primary)]">{hotspot.topSector}</strong>
                      </div>
                      <div>
                        Deficit Score: <strong className="text-[var(--color-text-primary)]">{hotspot.infrastructure.overallDeficitScore.toFixed(0)}/100</strong>
                      </div>
                      <div>
                        Funding Gap: <strong className="text-[var(--color-text-primary)]">${(hotspot.investment.unfundedDeficitGapUsd / 1e6).toFixed(0)}M</strong>
                      </div>
                    </div>

                    <p className="text-[11px] text-[var(--color-text-secondary)] italic leading-tight">
                      "{hotspot.recentQuotes[0]}"
                    </p>
                  </div>

                  <div className="mt-3 pt-2 border-t border-[var(--color-border)] flex items-center justify-between text-[10px]">
                    <span className="text-[var(--color-text-muted)] font-mono">{hotspot.code}</span>
                    <button
                      onClick={onNavigateToHotspots}
                      className="text-[var(--color-accent)] font-semibold hover:underline flex items-center gap-0.5 cursor-pointer"
                    >
                      <span>Analyze Node</span>
                      <IconChevronRight className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Collective Clusters Column (1 col) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-sm text-[var(--color-text-primary)] flex items-center gap-1.5">
              <IconBuildingStore className="h-4 w-4 text-[var(--color-accent)]" />
              <span>Collective Issue Clusters</span>
            </h2>
            <span className="text-[10px] text-[var(--color-text-muted)]">Verified</span>
          </div>

          <div className="space-y-3">
            {collectiveClusters.map((cluster) => (
              <div
                key={cluster.id}
                className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] p-3.5 space-y-2 hover:border-[var(--color-accent)] transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-xs text-[var(--color-text-primary)] line-clamp-1">
                    {cluster.title}
                  </span>
                  <span className="font-mono text-[10px] font-bold text-[var(--color-accent)] shrink-0 ml-2">
                    {cluster.reportsCount} rpts
                  </span>
                </div>

                <div className="text-[11px] text-[var(--color-text-secondary)] line-clamp-2">
                  {cluster.sampleQuotes[0]}
                </div>

                <div className="flex items-center justify-between text-[10px] text-[var(--color-text-muted)] pt-1 border-t border-[var(--color-border)]">
                  <span>{cluster.region}</span>
                  <button
                    onClick={() => onSelectClusterForProject(cluster)}
                    className="text-[var(--color-accent)] font-semibold hover:underline cursor-pointer flex items-center gap-0.5"
                  >
                    <span>Formulate Project</span>
                    <IconChevronRight className="h-3 w-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Bankable Recommender Teaser */}
          <div className="rounded-[var(--radius-md)] border border-[var(--color-accent)]/30 bg-[var(--color-accent-subtle)] p-4 space-y-2">
            <div className="flex items-center gap-2">
              <IconSparkles className="h-4 w-4 text-[var(--color-accent)]" />
              <span className="font-semibold text-xs text-[var(--color-text-primary)]">
                AI Bankable Pipeline Ready
              </span>
            </div>
            <p className="text-[11px] text-[var(--color-text-secondary)] leading-relaxed">
              4 high-priority infrastructure packages formulated with New Development Bank financing frameworks.
            </p>
            <button
              onClick={onNavigateToProjects}
              className="w-full mt-1 rounded-[var(--radius-sm)] bg-[var(--color-accent)] py-1.5 text-xs font-semibold text-white hover:bg-[var(--color-accent-hover)] transition-colors cursor-pointer text-center"
            >
              Review Bankable Projects →
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Section: Recent Multilingual Citizen Requests Feed */}
      <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <h3 className="font-semibold text-sm text-[var(--color-text-primary)] flex items-center gap-2">
              <IconShieldCheck className="h-4 w-4 text-[var(--color-accent)]" />
              <span>Incoming Multilingual Grievances Stream (Bhashini & DPI Rails)</span>
            </h3>
            <p className="text-xs text-[var(--color-text-muted)]">
              Raw audio recordings and WhatsApp text translated into English with auto-extracted confidence scores
            </p>
          </div>

          <button
            onClick={onNavigateToIntake}
            className="text-xs text-[var(--color-accent)] font-semibold hover:underline cursor-pointer"
          >
            Submit New Report →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {recentRequests.slice(0, 3).map((req) => (
            <div
              key={req.id}
              onClick={() => onSelectComplaint(req.id)}
              className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface-secondary)] p-4 space-y-2 cursor-pointer hover:border-[var(--color-accent)] transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="font-mono text-[10px] font-bold text-[var(--color-text-muted)]">
                    {req.trackingCode}
                  </span>
                  <span className="rounded-xs bg-[var(--color-surface)] border border-[var(--color-border)] px-1 py-0.5 text-[9px] font-medium text-[var(--color-text-secondary)]">
                    {req.language}
                  </span>
                </div>
                <span
                  className={`text-[9px] font-bold px-1.5 py-0.5 rounded-xs ${
                    req.urgency === 'Critical'
                      ? 'bg-[var(--color-danger-bg)] text-[var(--color-danger-text)]'
                      : 'bg-[var(--color-warning-bg)] text-[var(--color-warning-text)]'
                  }`}
                >
                  {req.urgency}
                </span>
              </div>

              <div className="text-[11px] text-[var(--color-text-primary)] font-medium line-clamp-2">
                {req.englishTranslation}
              </div>

              <div className="flex items-center justify-between text-[10px] text-[var(--color-text-muted)] pt-2 border-t border-[var(--color-border)]">
                <span className="flex items-center gap-1">
                  {req.channel.includes('Voice') ? (
                    <IconMicrophone className="h-3 w-3 text-[var(--color-accent)]" />
                  ) : (
                    <IconMessageCircle2 className="h-3 w-3 text-emerald-500" />
                  )}
                  <span>{req.channel}</span>
                </span>
                <span>{req.timestamp}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
