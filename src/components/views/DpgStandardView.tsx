/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  IconCode,
  IconCheck,
  IconCopy,
  IconShieldCheck,
  IconServer,
  IconFileCode,
  IconExternalLink,
} from '@tabler/icons-react';

export const DpgStandardView: React.FC = () => {
  const [copiedCode, setCopiedCode] = useState(false);
  const [activeSchemaTab, setActiveSchemaTab] = useState<'request' | 'hotspot' | 'project'>('request');

  const dpgaIndicators = [
    { num: 1, title: 'Relevance to SDGs', status: 'Passed', detail: 'Directly advances SDG 6 (Clean Water), SDG 7 (Energy), SDG 9 (Infrastructure), and SDG 10 (Inequalities).' },
    { num: 2, title: 'Approved Open License', status: 'Passed', detail: 'Licensed under Apache 2.0 open source repository terms without proprietary vendor lock-in.' },
    { num: 3, title: 'Clear Ownership & Attribution', status: 'Passed', detail: 'Maintained as open collaborative public infrastructure by BRICS digital governance tracks.' },
    { num: 4, title: 'Platform Independence', status: 'Passed', detail: 'Deployable on generic Linux bare-metal, Cloud Run, Kubernetes, or sovereign offline data centers.' },
    { num: 5, title: 'Comprehensive Documentation', status: 'Passed', detail: 'Full OpenAPI v3 specification and architectural schemas available for municipal integration.' },
    { num: 6, title: 'Non-Proprietary Data Extraction', status: 'Passed', detail: 'All citizen telemetry is exportable in standardized JSON-LD and GeoJSON formats.' },
    { num: 7, title: 'Privacy & Personal Data Protection', status: 'Passed', detail: 'Personal citizen identifiers anonymized at edge; voice audio stripped of biometric markers.' },
    { num: 8, title: 'Adherence to Standards', status: 'Passed', detail: 'Conforms to Open Geospatial Consortium (OGC) and W3C Web Accessibility Guidelines (WCAG AAA).' },
    { num: 9, title: 'Do No Harm by Design', status: 'Passed', detail: 'Spam suppression safeguards protect against coordinated municipal resource gaming.' },
  ];

  const jsonSchemas = {
    request: {
      $schema: 'https://json-schema.org/draft/2020-12/schema',
      title: 'BricsDpiCitizenRequest',
      description: 'Digital Public Good specification for multilingual citizen development requests',
      type: 'object',
      properties: {
        dpgStandardCode: { type: 'string', example: 'DPG-WTR-2026-081' },
        countryCode: { type: 'string', enum: ['IN', 'BR', 'ZA', 'CN', 'RU', 'EG', 'ET'] },
        sector: { type: 'string', enum: ['water', 'energy', 'transport', 'dpi', 'healthcare'] },
        urgencyScore: { type: 'integer', minimum: 0, maximum: 100 },
        coordinates: {
          type: 'array',
          items: { type: 'number' },
          minItems: 2,
          maxItems: 2,
        },
        originalLanguage: { type: 'string', example: 'hi' },
        bhashiniCertifiedEnglishTranslation: { type: 'string' },
      },
      required: ['dpgStandardCode', 'countryCode', 'sector', 'urgencyScore', 'coordinates'],
    },
    hotspot: {
      $schema: 'https://json-schema.org/draft/2020-12/schema',
      title: 'CivicPulseHotspotNode',
      description: 'Spatial 4-way triangulation intelligence node',
      type: 'object',
      properties: {
        hotspotId: { type: 'string' },
        discrepancyIndex: { type: 'number', minimum: 0, maximum: 100 },
        citizenRequestDensityPerSqKm: { type: 'number' },
        infrastructureDeficitScore: { type: 'number' },
        multidimensionalPovertyIndex: { type: 'number' },
        unfundedCapexGapUsd: { type: 'number' },
      },
      required: ['hotspotId', 'discrepancyIndex', 'unfundedCapexGapUsd'],
    },
    project: {
      $schema: 'https://json-schema.org/draft/2020-12/schema',
      title: 'NdbBankablePipelinePackage',
      description: 'New Development Bank infrastructure loan package schema',
      type: 'object',
      properties: {
        projectId: { type: 'string' },
        title: { type: 'string' },
        capitalBudgetUsd: { type: 'number' },
        ndbFinancingFacility: { type: 'string' },
        explainableAiPriorityScore: { type: 'number' },
        dpiComponents: { type: 'array', items: { type: 'string' } },
      },
    },
  };

  const currentSchemaString = JSON.stringify(jsonSchemas[activeSchemaTab], null, 2);

  const copySchema = () => {
    navigator.clipboard.writeText(currentSchemaString);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] font-bold text-[var(--color-accent)] bg-[var(--color-accent-subtle)] px-2 py-0.5 rounded-xs border border-[var(--color-accent)]/20 uppercase">
              Digital Public Goods Alliance (DPGA)
            </span>
            <span className="text-xs text-[var(--color-text-muted)]">
              DPG Nominee Specification
            </span>
          </div>
          <h1 className="font-editorial text-2xl font-medium text-[var(--color-text-primary)] mt-1">
            Open Standards & Interoperability Architecture
          </h1>
          <p className="text-xs text-[var(--color-text-muted)] max-w-2xl">
            Conforming with the 9-indicator Digital Public Goods rubric, open schema specifications, and RESTful APIs for sovereign national deployments.
          </p>
        </div>
      </div>

      {/* DPGA 9-Indicator Rubric Grid */}
      <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4 shadow-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <IconShieldCheck className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            <h3 className="font-semibold text-sm text-[var(--color-text-primary)]">
              DPGA 9-Indicator Conformance Rubric
            </h3>
          </div>
          <span className="text-xs font-mono font-bold text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded-xs border border-emerald-500/20">
            9 of 9 Indicators Passed
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          {dpgaIndicators.map((ind) => (
            <div
              key={ind.num}
              className="p-3.5 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface-secondary)] space-y-1.5"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] font-bold text-[var(--color-text-muted)]">
                  Indicator #{ind.num}
                </span>
                <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <IconCheck className="h-3 w-3" />
                  <span>{ind.status}</span>
                </span>
              </div>
              <div className="font-semibold text-xs text-[var(--color-text-primary)]">{ind.title}</div>
              <p className="text-[11px] text-[var(--color-text-secondary)] leading-relaxed">
                {ind.detail}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Open JSON Schemas & API Endpoints */}
      <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-4 shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <h3 className="font-semibold text-sm text-[var(--color-text-primary)] flex items-center gap-2">
              <IconCode className="h-5 w-5 text-[var(--color-accent)]" />
              <span>Standardized Open JSON Schemas</span>
            </h3>
            <p className="text-xs text-[var(--color-text-muted)]">
              Machine-readable schemas for cross-border multilateral data exchange
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-surface-secondary)] p-0.5 text-xs">
              <button
                onClick={() => setActiveSchemaTab('request')}
                className={`px-2.5 py-1 rounded-xs cursor-pointer ${
                  activeSchemaTab === 'request'
                    ? 'bg-[var(--color-surface)] font-semibold text-[var(--color-accent)] shadow-xs'
                    : 'text-[var(--color-text-muted)]'
                }`}
              >
                CitizenRequest
              </button>
              <button
                onClick={() => setActiveSchemaTab('hotspot')}
                className={`px-2.5 py-1 rounded-xs cursor-pointer ${
                  activeSchemaTab === 'hotspot'
                    ? 'bg-[var(--color-surface)] font-semibold text-[var(--color-accent)] shadow-xs'
                    : 'text-[var(--color-text-muted)]'
                }`}
              >
                HotspotNode
              </button>
              <button
                onClick={() => setActiveSchemaTab('project')}
                className={`px-2.5 py-1 rounded-xs cursor-pointer ${
                  activeSchemaTab === 'project'
                    ? 'bg-[var(--color-surface)] font-semibold text-[var(--color-accent)] shadow-xs'
                    : 'text-[var(--color-text-muted)]'
                }`}
              >
                BankablePackage
              </button>
            </div>

            <button
              onClick={copySchema}
              className="inline-flex items-center gap-1.5 rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-surface)] px-2.5 py-1 text-xs font-medium text-[var(--color-text-primary)] hover:bg-[var(--color-surface-secondary)] cursor-pointer"
            >
              {copiedCode ? (
                <>
                  <IconCheck className="h-3.5 w-3.5 text-emerald-500" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <IconCopy className="h-3.5 w-3.5" />
                  <span>Copy JSON</span>
                </>
              )}
            </button>
          </div>
        </div>

        <pre className="rounded-[var(--radius-md)] bg-slate-950 p-4 font-mono text-[11px] text-slate-200 border border-slate-800 overflow-x-auto max-h-96 shadow-inner">
          {currentSchemaString}
        </pre>
      </div>
    </div>
  );
};
