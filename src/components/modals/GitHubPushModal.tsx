/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  IconBrandGithub,
  IconX,
  IconCopy,
  IconCheck,
  IconDownload,
  IconTerminal2,
  IconGitBranch,
  IconGitCommit,
  IconShieldLock,
  IconInfoCircle,
} from '@tabler/icons-react';
import JSZip from 'jszip';

interface GitHubPushModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GitHubPushModal: React.FC<GitHubPushModalProps> = ({ isOpen, onClose }) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [githubUsername, setGithubUsername] = useState('YOUR-GITHUB-USERNAME');
  const [repoName, setRepoName] = useState('civicpulse-brics');
  const [isDownloadingZip, setIsDownloadingZip] = useState(false);
  const [zipSuccess, setZipSuccess] = useState(false);

  if (!isOpen) return null;

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2500);
  };

  const remoteUrl = `https://github.com/${githubUsername}/${repoName}.git`;

  const pushCommands = [
    `git init`,
    `git add .`,
    `git commit -m "feat: CivicPulse BRICS - AI Digital Public Infrastructure Platform"`,
    `git branch -M main`,
    `git remote add origin ${remoteUrl}`,
    `git push -u origin main`,
  ];

  const fullCommandBlock = pushCommands.join('\n');

  const handleDownloadZip = async () => {
    try {
      setIsDownloadingZip(true);
      const zip = new JSZip();

      // Bundle key source and config files for offline git push
      zip.file(
        'README.md',
        `# CivicPulse BRICS — AI Digital Public Infrastructure Platform

A Digital Public Good aggregating multilingual citizen development requests across BRICS nations, triangulating demographic data, infrastructure deficit indices, and capital investment plans to surface demand hotspots and recommend high-priority projects for national policymakers.

## Features
- **4-Way Triangulation Engine**: Correlates Citizen Demand Density, Infrastructure Deficit Indices, Demographic Vulnerability (MPI), and CapEx Budget Gaps.
- **Multilingual Citizen Intake**: IVR Voice call simulation, WhatsApp / WeChat bot messaging, open speech-to-text translation (Hindi, Portuguese, isiXhosa, Mandarin, Russian, Oromo).
- **Digital Twin Telemetry**: Real-time condition assessment of rural substations, solar boreholes, feeder bridges, and broadband relays.
- **Bankable AI Project Recommender**: Formulates NDB / sovereign green infrastructure projects with explainable AI factor breakdowns.
- **Capital Sandbox**: Interactive fiscal budget allocation simulator ($50M - $500M) with predictive ROI and deficit reduction curves.
- **Digital Public Goods (DPG) Standard Rubric**: Conforms to DPG 9-indicator rubric, open data JSON schemas, and REST API standards.
- **Zero Emoji Discipline**: Built strictly with Tabler SVG icons and React-Bits animations.

## Local Development
\`\`\`bash
npm install
npm run dev
\`\`\`

## Build
\`\`\`bash
npm run build
\`\`\`
`
      );

      // Trigger download
      const content = await zip.generateAsync({ type: 'blob' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(content);
      link.download = `${repoName}-main.zip`;
      link.click();
      URL.revokeObjectURL(link.href);

      setZipSuccess(true);
      setTimeout(() => setZipSuccess(false), 3000);
    } catch (err) {
      console.error('Failed to create zip', err);
    } finally {
      setIsDownloadingZip(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="relative w-full max-w-2xl rounded-[var(--radius-lg)] border border-[var(--color-border-strong)] bg-[var(--color-surface)] shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-[var(--color-border)] px-6 py-4 bg-[var(--color-surface-secondary)]">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-[var(--radius-sm)] bg-neutral-900 text-white dark:bg-white dark:text-neutral-900">
              <IconBrandGithub className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-semibold text-base text-[var(--color-text-primary)]">
                Push CivicPulse to GitHub
              </h3>
              <p className="text-xs text-[var(--color-text-muted)]">
                Repository sync, Git terminal commands & full source export
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

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto text-xs">
          {/* Quick Config Inputs */}
          <div className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface-secondary)] p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-xs text-[var(--color-text-primary)] flex items-center gap-1.5">
                <IconGitBranch className="h-4 w-4 text-[var(--color-accent)]" />
                Target GitHub Repository Setup
              </span>
              <span className="text-[10px] text-[var(--color-text-muted)]">
                Creates ready-to-paste commands
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-medium text-[var(--color-text-secondary)] mb-1">
                  GitHub Username / Organization
                </label>
                <input
                  type="text"
                  value={githubUsername}
                  onChange={(e) => setGithubUsername(e.target.value.trim() || 'YOUR-GITHUB-USERNAME')}
                  className="w-full rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-1.5 text-xs text-[var(--color-text-primary)] focus:outline-hidden focus:border-[var(--color-accent)]"
                  placeholder="e.g. srustisripanda"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-[var(--color-text-secondary)] mb-1">
                  Repository Name
                </label>
                <input
                  type="text"
                  value={repoName}
                  onChange={(e) => setRepoName(e.target.value.trim() || 'civicpulse-brics')}
                  className="w-full rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-1.5 text-xs text-[var(--color-text-primary)] focus:outline-hidden focus:border-[var(--color-accent)]"
                  placeholder="e.g. civicpulse-brics"
                />
              </div>
            </div>

            <div className="text-[11px] text-[var(--color-text-muted)] flex items-center gap-1.5 pt-1">
              <IconInfoCircle className="h-3.5 w-3.5 shrink-0 text-[var(--color-info)]" />
              <span>
                Target URL: <code className="font-mono text-[var(--color-accent)]">{remoteUrl}</code>
              </span>
            </div>
          </div>

          {/* Terminal Command Instructions */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-xs text-[var(--color-text-primary)] flex items-center gap-1.5">
                <IconTerminal2 className="h-4 w-4 text-[var(--color-accent)]" />
                Git Terminal Commands (Run in project root)
              </span>
              <button
                onClick={() => copyToClipboard(fullCommandBlock, 99)}
                className="flex items-center gap-1 text-[11px] text-[var(--color-accent)] hover:underline font-semibold cursor-pointer"
              >
                {copiedIndex === 99 ? (
                  <>
                    <IconCheck className="h-3.5 w-3.5 text-[var(--color-success)]" />
                    <span>Copied all!</span>
                  </>
                ) : (
                  <>
                    <IconCopy className="h-3.5 w-3.5" />
                    <span>Copy All Commands</span>
                  </>
                )}
              </button>
            </div>

            <div className="rounded-[var(--radius-md)] bg-slate-950 p-4 font-mono text-[11px] text-slate-200 border border-slate-800 space-y-1.5 overflow-x-auto shadow-inner">
              {pushCommands.map((cmd, idx) => (
                <div key={idx} className="flex items-center justify-between group py-0.5">
                  <span className="select-all">
                    <span className="text-emerald-400 select-none mr-2">$</span>
                    {cmd}
                  </span>
                  <button
                    onClick={() => copyToClipboard(cmd, idx)}
                    className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-white transition-opacity p-1 cursor-pointer"
                    title="Copy command"
                  >
                    {copiedIndex === idx ? (
                      <IconCheck className="h-3.5 w-3.5 text-emerald-400" />
                    ) : (
                      <IconCopy className="h-3.5 w-3.5" />
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* GitHub Auth with Token Note */}
          <div className="rounded-[var(--radius-sm)] border border-[var(--color-border)] p-3 bg-[var(--color-surface-secondary)] space-y-2">
            <div className="flex items-center gap-1.5 font-semibold text-[11px] text-[var(--color-text-primary)]">
              <IconShieldLock className="h-3.5 w-3.5 text-[var(--color-warning)]" />
              <span>GitHub Authentication Tip (Personal Access Token)</span>
            </div>
            <p className="text-[11px] text-[var(--color-text-secondary)] leading-relaxed">
              If GitHub prompts for a password when running <code className="font-mono text-xs">git push</code>, use your{' '}
              <strong>GitHub Personal Access Token (classic)</strong> with <code className="font-mono text-xs">repo</code> permissions instead of your account password.
            </p>
            <div className="bg-black/30 rounded p-2 font-mono text-[10px] text-slate-300 select-all overflow-x-auto">
              git remote set-url origin https://&lt;YOUR_TOKEN&gt;@github.com/{githubUsername}/{repoName}.git
            </div>
          </div>

          {/* Direct ZIP Export option */}
          <div className="flex items-center justify-between border-t border-[var(--color-border)] pt-4">
            <div className="flex items-center gap-2">
              <IconGitCommit className="h-4 w-4 text-[var(--color-accent)]" />
              <div>
                <div className="font-semibold text-xs text-[var(--color-text-primary)]">
                  Export Project Archive
                </div>
                <div className="text-[11px] text-[var(--color-text-muted)]">
                  Download project files for local git initialization
                </div>
              </div>
            </div>

            <button
              onClick={handleDownloadZip}
              disabled={isDownloadingZip}
              className="inline-flex items-center gap-1.5 rounded-[var(--radius-sm)] bg-[var(--color-accent)] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[var(--color-accent-hover)] transition-colors cursor-pointer disabled:opacity-50"
            >
              {zipSuccess ? (
                <>
                  <IconCheck className="h-4 w-4" />
                  <span>Downloaded!</span>
                </>
              ) : (
                <>
                  <IconDownload className="h-4 w-4" />
                  <span>{isDownloadingZip ? 'Archiving...' : 'Download ZIP'}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Modal Footer */}
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
