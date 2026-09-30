/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  IconSearch,
  IconFilter,
  IconVolume,
  IconMicrophone,
  IconMessageCircle2,
  IconCheck,
  IconAlertCircle,
  IconSend,
  IconBuildingStore,
  IconShieldCheck,
  IconPlayerPlay,
  IconPlayerPause,
} from '@tabler/icons-react';
import { CitizenRequest } from '../../types';
import { INITIAL_REQUESTS } from '../../data/mockData';
import { SvgFlag } from '../common/SvgFlag';

interface TriageQueueViewProps {
  initialSelectedId?: string | null;
  onClearSelectedId?: () => void;
}

export const TriageQueueView: React.FC<TriageQueueViewProps> = ({
  initialSelectedId,
  onClearSelectedId,
}) => {
  const [requests, setRequests] = useState<CitizenRequest[]>(INITIAL_REQUESTS);
  const [selectedId, setSelectedId] = useState<string>(initialSelectedId || requests[0].id);
  const [sectorFilter, setSectorFilter] = useState<string>('all');
  const [countryFilter, setCountryFilter] = useState<string>('all');
  const [urgencyFilter, setUrgencyFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);
  const [actionSuccessMessage, setActionSuccessMessage] = useState<string | null>(null);

  const selectedRequest = requests.find((r) => r.id === selectedId) || requests[0];

  const filteredRequests = requests.filter((r) => {
    if (sectorFilter !== 'all' && r.sector !== sectorFilter) return false;
    if (countryFilter !== 'all' && r.country !== countryFilter) return false;
    if (urgencyFilter !== 'all' && r.urgency !== urgencyFilter) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const match =
        r.englishTranslation.toLowerCase().includes(q) ||
        r.originalText.toLowerCase().includes(q) ||
        r.trackingCode.toLowerCase().includes(q) ||
        r.district.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  const toggleAudio = (id: string) => {
    if (playingAudioId === id) {
      setPlayingAudioId(null);
    } else {
      setPlayingAudioId(id);
    }
  };

  const handleUpdateStatus = (newStatus: CitizenRequest['status']) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === selectedRequest.id ? { ...r, status: newStatus } : r))
    );
    setActionSuccessMessage(`Status updated to "${newStatus}" and recorded in DPG ledger.`);
    setTimeout(() => setActionSuccessMessage(null), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h1 className="font-editorial text-2xl font-medium text-[var(--color-text-primary)]">
            Collective Triage & SLA Queue
          </h1>
          <p className="text-xs text-[var(--color-text-muted)]">
            Multilingual citizen reports categorized and verified via Bhashini voice rails and open AI classification
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-mono text-xs font-semibold px-2 py-1 rounded-[var(--radius-xs)] bg-[var(--color-surface-secondary)] text-[var(--color-text-secondary)] border border-[var(--color-border)]">
            Showing {filteredRequests.length} of {requests.length} Grievances
          </span>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center gap-3 p-3 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] text-xs">
        {/* Search */}
        <div className="flex-1 min-w-[200px] flex items-center gap-2 px-3 py-1.5 rounded-[var(--radius-sm)] bg-[var(--color-surface-secondary)] border border-[var(--color-border)]">
          <IconSearch className="h-4 w-4 text-[var(--color-text-muted)]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search grievances by text, tracking code, or district..."
            className="w-full bg-transparent text-xs text-[var(--color-text-primary)] focus:outline-hidden"
          />
        </div>

        {/* Sector filter */}
        <select
          value={sectorFilter}
          onChange={(e) => setSectorFilter(e.target.value)}
          className="rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-surface-secondary)] px-2.5 py-1.5 text-xs text-[var(--color-text-primary)] focus:outline-hidden"
        >
          <option value="all">All Sectors</option>
          <option value="Water & Sanitation">Water & Sanitation</option>
          <option value="Clean Energy & Grid">Clean Energy & Grid</option>
          <option value="Rural Transport & Roads">Rural Transport & Roads</option>
          <option value="Digital Public Infrastructure">Digital Public Infrastructure</option>
        </select>

        {/* Country filter */}
        <select
          value={countryFilter}
          onChange={(e) => setCountryFilter(e.target.value)}
          className="rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-surface-secondary)] px-2.5 py-1.5 text-xs text-[var(--color-text-primary)] focus:outline-hidden"
        >
          <option value="all">All Nations</option>
          <option value="India">India</option>
          <option value="Brazil">Brazil</option>
          <option value="South Africa">South Africa</option>
          <option value="China">China</option>
          <option value="Russia">Russia</option>
          <option value="Ethiopia">Ethiopia</option>
        </select>

        {/* Urgency filter */}
        <select
          value={urgencyFilter}
          onChange={(e) => setUrgencyFilter(e.target.value)}
          className="rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-surface-secondary)] px-2.5 py-1.5 text-xs text-[var(--color-text-primary)] focus:outline-hidden"
        >
          <option value="all">All Urgency</option>
          <option value="Critical">Critical Only</option>
          <option value="High">High Urgency</option>
        </select>
      </div>

      {/* Main Split Layout: List on Left, Detail & Actions on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* List (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          {filteredRequests.map((req) => {
            const isSelected = req.id === selectedRequest.id;
            const flagCode =
              req.country === 'India'
                ? 'IN'
                : req.country === 'Brazil'
                ? 'BR'
                : req.country === 'South Africa'
                ? 'ZA'
                : req.country === 'China'
                ? 'CN'
                : req.country === 'Russia'
                ? 'RU'
                : 'ET';

            return (
              <div
                key={req.id}
                onClick={() => setSelectedId(req.id)}
                className={`p-4 rounded-[var(--radius-md)] border cursor-pointer transition-all ${
                  isSelected
                    ? 'border-[var(--color-accent)] bg-[var(--color-accent-subtle)] shadow-xs'
                    : 'border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-border-strong)]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <SvgFlag countryCode={flagCode} />
                    <span className="font-mono text-[10px] font-bold text-[var(--color-text-muted)]">
                      {req.trackingCode}
                    </span>
                    <span className="rounded-xs bg-[var(--color-surface)] border border-[var(--color-border)] px-1 py-0.2 text-[9px] font-medium text-[var(--color-text-secondary)]">
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
                    {req.urgency} ({req.urgencyScore})
                  </span>
                </div>

                <div className="mt-2 text-xs font-medium text-[var(--color-text-primary)] line-clamp-2">
                  {req.englishTranslation}
                </div>

                <div className="mt-2.5 pt-2 border-t border-[var(--color-border)] flex items-center justify-between text-[10px] text-[var(--color-text-muted)]">
                  <span>{req.sector}</span>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-[var(--color-text-primary)]">{req.status}</span>
                    <span>·</span>
                    <span>{req.timestamp}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Request Detail (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-5 shadow-xs">
            {/* Top Bar */}
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-[var(--color-accent)] bg-[var(--color-accent-subtle)] px-2 py-0.5 rounded-xs border border-[var(--color-accent)]/20">
                    {selectedRequest.trackingCode}
                  </span>
                  <span className="text-xs font-medium text-[var(--color-text-secondary)]">
                    {selectedRequest.district}, {selectedRequest.region} ({selectedRequest.country})
                  </span>
                </div>
                <h3 className="font-semibold text-base text-[var(--color-text-primary)] mt-1.5">
                  {selectedRequest.sector} Disruption
                </h3>
              </div>

              <div className="text-right">
                <span className="inline-block text-xs font-semibold px-2 py-0.5 rounded-xs bg-[var(--color-surface-secondary)] border border-[var(--color-border)] text-[var(--color-text-primary)]">
                  Status: {selectedRequest.status}
                </span>
                <div className="text-[10px] text-[var(--color-text-muted)] mt-1">
                  DPG Standard Code: {selectedRequest.dpgStandardCode}
                </div>
              </div>
            </div>

            {/* Translation Box */}
            <div className="space-y-3">
              <div className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface-secondary)] p-4 space-y-2">
                <div className="flex items-center justify-between text-[10px] text-[var(--color-text-muted)] font-semibold uppercase tracking-wider">
                  <span className="flex items-center gap-1.5">
                    {selectedRequest.channel.includes('Voice') ? (
                      <IconMicrophone className="h-3.5 w-3.5 text-[var(--color-accent)]" />
                    ) : (
                      <IconMessageCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                    )}
                    <span>Original Citizen Inflow ({selectedRequest.language})</span>
                  </span>

                  {selectedRequest.audioDurationSeconds && (
                    <button
                      onClick={() => toggleAudio(selectedRequest.id)}
                      className="inline-flex items-center gap-1 text-[var(--color-accent)] hover:underline font-mono cursor-pointer"
                    >
                      {playingAudioId === selectedRequest.id ? (
                        <>
                          <IconPlayerPause className="h-3 w-3" />
                          <span>Pause Audio (0:{selectedRequest.audioDurationSeconds})</span>
                        </>
                      ) : (
                        <>
                          <IconPlayerPlay className="h-3 w-3" />
                          <span>Play Citizen Voice (0:{selectedRequest.audioDurationSeconds})</span>
                        </>
                      )}
                    </button>
                  )}
                </div>

                {playingAudioId === selectedRequest.id && (
                  <div className="p-2 rounded bg-black/5 dark:bg-white/5 flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    <div className="flex-1 flex items-center gap-1 h-3">
                      {[40, 70, 30, 90, 60, 40, 80, 50, 100, 30, 60, 85, 45, 95, 30].map(
                        (h, i) => (
                          <div
                            key={i}
                            className="flex-1 bg-[var(--color-accent)] rounded-xs animate-pulse"
                            style={{ height: `${h}%` }}
                          />
                        )
                      )}
                    </div>
                    <span className="text-[10px] font-mono text-[var(--color-text-muted)]">Live Playback</span>
                  </div>
                )}

                <p className="text-xs text-[var(--color-text-primary)] font-serif leading-relaxed italic">
                  "{selectedRequest.originalText}"
                </p>
              </div>

              {/* English Certified Translation */}
              <div className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] p-4 space-y-1">
                <span className="text-[10px] font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">
                  Bhashini Multi-lingual Neural Translation (English)
                </span>
                <p className="text-xs text-[var(--color-text-primary)] leading-relaxed">
                  {selectedRequest.englishTranslation}
                </p>
              </div>
            </div>

            {/* AI Triangulation Confidence Gauges */}
            <div className="space-y-2">
              <span className="text-[11px] font-semibold text-[var(--color-text-primary)] uppercase tracking-wider flex items-center gap-1.5">
                <IconShieldCheck className="h-4 w-4 text-[var(--color-accent)]" />
                <span>AI Triangulation Verification Indices</span>
              </span>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                <div className="p-2.5 rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-surface-secondary)] text-center">
                  <div className="text-[10px] text-[var(--color-text-muted)]">Location Confidence</div>
                  <div className="font-mono text-sm font-bold text-[var(--color-text-primary)] mt-0.5">
                    {selectedRequest.confidence.location}%
                  </div>
                </div>

                <div className="p-2.5 rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-surface-secondary)] text-center">
                  <div className="text-[10px] text-[var(--color-text-muted)]">Category Confidence</div>
                  <div className="font-mono text-sm font-bold text-[var(--color-text-primary)] mt-0.5">
                    {selectedRequest.confidence.category}%
                  </div>
                </div>

                <div className="p-2.5 rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-surface-secondary)] text-center">
                  <div className="text-[10px] text-[var(--color-text-muted)]">Urgency Confidence</div>
                  <div className="font-mono text-sm font-bold text-[var(--color-text-primary)] mt-0.5">
                    {selectedRequest.confidence.urgency}%
                  </div>
                </div>

                <div className="p-2.5 rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-surface-secondary)] text-center">
                  <div className="text-[10px] text-[var(--color-text-muted)]">Affected Infra</div>
                  <div className="font-mono text-sm font-bold text-[var(--color-text-primary)] mt-0.5">
                    {selectedRequest.confidence.affectedInfra}%
                  </div>
                </div>
              </div>
            </div>

            {/* Impact & Department Assignee */}
            <div className="rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-surface-secondary)] p-3 text-[11px] text-[var(--color-text-secondary)] space-y-1">
              <div>
                <strong>Urgency Rationale:</strong> {selectedRequest.urgencyRationale}
              </div>
              <div className="flex items-center justify-between pt-1 border-t border-[var(--color-border)]">
                <span>
                  Estimated Impact: <strong className="text-[var(--color-text-primary)]">{selectedRequest.affectedPopulationEstimate}</strong>
                </span>
                <span>
                  Assigned Authority: <strong className="text-[var(--color-text-primary)]">{selectedRequest.assignedDepartment}</strong>
                </span>
              </div>
            </div>

            {/* Success notification */}
            {actionSuccessMessage && (
              <div className="rounded-[var(--radius-sm)] bg-emerald-500/10 border border-emerald-500/30 p-2.5 text-xs text-emerald-700 dark:text-emerald-300 flex items-center gap-2">
                <IconCheck className="h-4 w-4 shrink-0" />
                <span>{actionSuccessMessage}</span>
              </div>
            )}

            {/* Official Action Controls */}
            <div className="pt-2 border-t border-[var(--color-border)] flex flex-wrap items-center justify-between gap-2">
              <span className="text-[11px] text-[var(--color-text-muted)]">
                Official Department Director Actions:
              </span>

              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => handleUpdateStatus('Verified')}
                  className="rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-1.5 text-xs font-semibold text-[var(--color-text-primary)] hover:bg-[var(--color-surface-secondary)] cursor-pointer"
                >
                  Verify Grievance
                </button>
                <button
                  onClick={() => handleUpdateStatus('Department Assigned')}
                  className="rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-1.5 text-xs font-semibold text-[var(--color-accent)] hover:bg-[var(--color-accent-subtle)] cursor-pointer"
                >
                  Assign to Department
                </button>
                <button
                  onClick={() => handleUpdateStatus('Work Planned')}
                  className="rounded-[var(--radius-sm)] bg-[var(--color-accent)] px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-[var(--color-accent-hover)] cursor-pointer"
                >
                  Plan Work Order
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
