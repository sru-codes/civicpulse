/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  AppView,
  Role,
  ThemeMode,
  Hotspot,
  CitizenRequest,
  BankableProject,
  InfrastructureAsset,
  CollectiveCluster,
  EmergencyIncident,
} from './types';
import {
  HOTSPOTS,
  INITIAL_REQUESTS,
  BANKABLE_PROJECTS,
  INFRASTRUCTURE_ASSETS,
  COLLECTIVE_CLUSTERS,
  EMERGENCY_INCIDENTS,
  IMPACT_AUDITS,
} from './data/mockData';

import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { CommandPalette } from './components/common/CommandPalette';
import { HowItWorksModal } from './components/modals/HowItWorksModal';
import { GitHubPushModal } from './components/modals/GitHubPushModal';
import { ProjectDetailModal } from './components/modals/ProjectDetailModal';
import { WhyProjectModal } from './components/modals/WhyProjectModal';

import { CommandCenterView } from './components/views/CommandCenterView';
import { TriageQueueView } from './components/views/TriageQueueView';
import { TriangulationView } from './components/views/TriangulationView';
import { CitizenHubView } from './components/views/CitizenHubView';
import { DigitalTwinView } from './components/views/DigitalTwinView';
import { AiProjectsView } from './components/views/AiProjectsView';
import { CapitalSandboxView } from './components/views/CapitalSandboxView';
import { ImpactAuditView } from './components/views/ImpactAuditView';
import { DpgStandardView } from './components/views/DpgStandardView';
import { DesignTokensView } from './components/views/DesignTokensView';

export default function App() {
  const [activeView, setActiveView] = useState<AppView>('command');
  const [currentRole, setCurrentRole] = useState<Role>('policymaker');
  const [theme, setTheme] = useState<ThemeMode>('light');
  const [isEmergencyActive, setIsEmergencyActive] = useState<boolean>(true);

  // Data states
  const [hotspots] = useState<Hotspot[]>(HOTSPOTS);
  const [requests, setRequests] = useState<CitizenRequest[]>(INITIAL_REQUESTS);
  const [projects, setProjects] = useState<BankableProject[]>(BANKABLE_PROJECTS);
  const [assets] = useState<InfrastructureAsset[]>(INFRASTRUCTURE_ASSETS);
  const [clusters] = useState<CollectiveCluster[]>(COLLECTIVE_CLUSTERS);
  const [emergencyIncidents] = useState<EmergencyIncident[]>(EMERGENCY_INCIDENTS);
  const [impacts] = useState(IMPACT_AUDITS);

  // Modal / Navigation selections
  const [selectedComplaintId, setSelectedComplaintId] = useState<string | null>(null);
  const [selectedProjectForDetail, setSelectedProjectForDetail] = useState<BankableProject | null>(null);
  const [selectedProjectForWhy, setSelectedProjectForWhy] = useState<BankableProject | null>(null);
  const [isHowItWorksOpen, setIsHowItWorksOpen] = useState(false);
  const [isGitHubPushOpen, setIsGitHubPushOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  // Sync theme with DOM document element
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('dark', 'high-contrast');
    if (theme === 'dark') {
      root.classList.add('dark');
    } else if (theme === 'high-contrast') {
      root.classList.add('high-contrast');
    }
  }, [theme]);

  // Global Cmd+K keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleAddRequest = (newReq: CitizenRequest) => {
    setRequests((prev) => [newReq, ...prev]);
  };

  const handleApproveProject = (projectId: string, notes: string) => {
    setProjects((prev) =>
      prev.map((p) =>
        p.id === projectId
          ? {
              ...p,
              approvalStatus: 'Approved by Official',
              officialReviewNotes: notes || 'Formally approved for NDB Sovereign Pipeline inclusion.',
            }
          : p
      )
    );
  };

  const handleExportPolicyDossier = (proj: BankableProject) => {
    const text = `
CIVIC PULSE BRICS — OFFICIAL POLICY DOSSIER
===========================================
Project ID: ${proj.id}
Title: ${proj.title}
Country: ${proj.country} | Region: ${proj.region}
Sector: ${proj.sector}
Budget: $${(proj.budgetUsd / 1e6).toFixed(1)}M (${proj.budgetLocalCurrency})
Timeline: ${proj.timelineMonths} Months
Beneficiaries: ${(proj.beneficiariesCount / 1e3).toLocaleString()}k residents
Citizen Support Rate: ${proj.citizenSupportRate}%
Aggregated Grievances: ${proj.primaryCitizenComplaintsAggregated}

EXECUTIVE SUMMARY:
${proj.executiveSummary}

FINANCING FRAMEWORK:
${proj.ndbFinancingModel}

EXPLAINABLE AI PRIORITY SCORE: ${proj.explainableScore.priorityScore}/100
Evidence Summary: ${proj.explainableScore.evidenceSummary}

DPI COMPONENTS:
${proj.dpiComponents.map((d) => '- ' + d).join('\n')}

Approval Status: ${proj.approvalStatus}
Notes: ${proj.officialReviewNotes}
    `.trim();

    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `POLICY-DOSSIER-${proj.id}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-bg)] text-[var(--color-text-primary)] transition-colors">
      {/* Top Header */}
      <Header
        activeView={activeView}
        setActiveView={setActiveView}
        currentRole={currentRole}
        setCurrentRole={setCurrentRole}
        theme={theme}
        setTheme={setTheme}
        isEmergencyActive={isEmergencyActive}
        onOpenHowItWorks={() => setIsHowItWorksOpen(true)}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        onOpenGitHubPush={() => setIsGitHubPushOpen(true)}
      />

      {/* Main Viewport */}
      <main className="flex-1 mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeView}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
          >
            {activeView === 'command' && (
              <CommandCenterView
                hotspots={hotspots}
                recentRequests={requests}
                projects={projects}
                collectiveClusters={clusters}
                emergencyIncidents={emergencyIncidents}
                isEmergencyActive={isEmergencyActive}
                onToggleEmergency={() => setIsEmergencyActive(!isEmergencyActive)}
                onNavigateToHotspots={() => setActiveView('triangulation')}
                onNavigateToProjects={() => setActiveView('recommender')}
                onNavigateToIntake={() => setActiveView('intake')}
                onSelectComplaint={(reqId) => {
                  setSelectedComplaintId(reqId);
                  setActiveView('lifecycle');
                }}
                onSelectClusterForProject={(cluster) => {
                  setActiveView('recommender');
                }}
              />
            )}

            {activeView === 'lifecycle' && (
              <TriageQueueView
                initialSelectedId={selectedComplaintId}
                onClearSelectedId={() => setSelectedComplaintId(null)}
              />
            )}

            {activeView === 'triangulation' && (
              <TriangulationView
                hotspots={hotspots}
                onSelectHotspotForProject={() => setActiveView('recommender')}
                onOpenCitizenIntake={() => setActiveView('intake')}
              />
            )}

            {activeView === 'intake' && (
              <CitizenHubView
                requests={requests}
                onAddRequest={handleAddRequest}
              />
            )}

            {activeView === 'digitaltwin' && (
              <DigitalTwinView
                assets={assets}
                onOpenIntake={() => setActiveView('intake')}
              />
            )}

            {activeView === 'recommender' && (
              <AiProjectsView
                projects={projects}
                onOpenProjectDetail={(proj) => setSelectedProjectForDetail(proj)}
                onOpenWhyProject={(proj) => setSelectedProjectForWhy(proj)}
                onNavigateToSimulator={() => setActiveView('simulator')}
              />
            )}

            {activeView === 'simulator' && <CapitalSandboxView />}

            {activeView === 'impact' && <ImpactAuditView impacts={impacts} />}

            {activeView === 'dpg' && <DpgStandardView />}

            {activeView === 'styleguide' && (
              <DesignTokensView
                currentTheme={theme}
                onChangeTheme={setTheme}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Global Footer */}
      <Footer
        onNavigate={setActiveView}
        onOpenHowItWorks={() => setIsHowItWorksOpen(true)}
        onOpenGitHubPush={() => setIsGitHubPushOpen(true)}
        onOpenPolicyDossier={() => {
          if (projects[0]) setSelectedProjectForDetail(projects[0]);
        }}
      />

      {/* Modals & Dialogs */}
      <HowItWorksModal
        isOpen={isHowItWorksOpen}
        onClose={() => setIsHowItWorksOpen(false)}
        onExploreHotspots={() => setActiveView('triangulation')}
        onViewProjects={() => setActiveView('recommender')}
      />

      <GitHubPushModal
        isOpen={isGitHubPushOpen}
        onClose={() => setIsGitHubPushOpen(false)}
      />

      <ProjectDetailModal
        project={selectedProjectForDetail}
        onClose={() => setSelectedProjectForDetail(null)}
        onExportProjectDossier={handleExportPolicyDossier}
      />

      <WhyProjectModal
        project={selectedProjectForWhy}
        onClose={() => setSelectedProjectForWhy(null)}
        onApproveProject={handleApproveProject}
        onOpenSimulator={() => setActiveView('simulator')}
      />

      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onNavigate={(view) => setActiveView(view)}
        onOpenGitHubPush={() => setIsGitHubPushOpen(true)}
        onToggleEmergency={() => setIsEmergencyActive(!isEmergencyActive)}
      />
    </div>
  );
}
