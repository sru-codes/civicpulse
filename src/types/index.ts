/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Role = 'policymaker' | 'department_officer' | 'field_officer' | 'citizen';

export type AppView =
  | 'command'
  | 'lifecycle'
  | 'triangulation'
  | 'intake'
  | 'digitaltwin'
  | 'recommender'
  | 'simulator'
  | 'impact'
  | 'dpg'
  | 'styleguide';

export type ThemeMode = 'light' | 'dark' | 'high-contrast';

export interface CountryInfo {
  code: string;
  name: string;
  currency: string;
  currencySymbol: string;
  officialLanguages: string[];
  nationalDpiStack: string;
  totalPopulation: string;
}

export interface CitizenConfidence {
  location: number;
  category: number;
  urgency: number;
  affectedInfra: number;
}

export interface CitizenRequest {
  id: string;
  trackingCode: string;
  country: string;
  region: string;
  district: string;
  coordinates: [number, number];
  language: string;
  languageCode: string;
  originalText: string;
  englishTranslation: string;
  channel: 'Voice Call / IVR' | 'WhatsApp / Messaging' | 'WeChat' | 'Web Portal' | 'Telegram';
  sector: 'Water & Sanitation' | 'Clean Energy & Grid' | 'Rural Transport & Roads' | 'Digital Public Infrastructure' | 'Healthcare Facilities';
  urgency: 'Critical' | 'High' | 'Medium' | 'Low';
  urgencyScore: number;
  urgencyRationale: string;
  confidence: CitizenConfidence;
  timestamp: string;
  affectedPopulationEstimate: string;
  audioDurationSeconds?: number;
  assignedDepartment: string;
  dpgStandardCode: string;
  status: 'Verified' | 'Department Assigned' | 'Work Planned' | 'In Progress' | 'Resolved';
  feedbackRating?: number;
}

export interface HotspotDemographics {
  totalPopulation: number;
  vulnerableHouseholdsPct: number;
  multidimensionalPovertyIndex: number;
  youthRatioPct: number;
  urbanRuralSplit: {
    urbanPct: number;
    ruralPct: number;
  };
}

export interface HotspotInfrastructure {
  waterAccessPct: number;
  gridReliabilityHours: number;
  allWeatherRoadConnectivityPct: number;
  digitalBroadbandPenetrationPct: number;
  healthcareFacilityDistanceKm: number;
  overallDeficitScore: number;
}

export interface HotspotInvestment {
  allocatedCapexUsd: number;
  plannedProjectsCount: number;
  unfundedDeficitGapUsd: number;
  fiscalYear: string;
  primaryFocusSector: string;
  budgetAlignmentScore: number;
}

export interface Hotspot {
  id: string;
  country: string;
  name: string;
  code: string;
  latitude: number;
  longitude: number;
  citizenRequestCount: number;
  topSector: string;
  demographics: HotspotDemographics;
  infrastructure: HotspotInfrastructure;
  investment: HotspotInvestment;
  hotspotDiscrepancyIndex: number;
  statusTag: 'Severe Funding Gap' | 'Misaligned Capex' | 'Moderately Balanced' | 'Critical Intervention Needed';
  recentQuotes: string[];
}

export interface InfrastructureAsset {
  id: string;
  name: string;
  sector: string;
  country: string;
  region: string;
  coordinates: [number, number];
  condition: 'Critical' | 'Degraded' | 'Fair' | 'Good';
  ageYears: number;
  capacity: string;
  populationServed: number;
  reportedProblemsCount: number;
  riskScore: number;
  lastInspectionDate: string;
  maintenanceHistory: string[];
  assignedDepartment: string;
}

export interface CollectiveCluster {
  id: string;
  title: string;
  sector: string;
  country: string;
  region: string;
  reportsCount: number;
  firstReportedDate: string;
  lastReportedDate: string;
  status: 'Under Investigation' | 'Project Formulated' | 'Dispatched' | 'Completed';
  urgency: 'Critical' | 'High' | 'Medium';
  urgencyScore: number;
  assignedDepartment: string;
  estimatedAffectedPopulation: string;
  sampleQuotes: string[];
  isSpamSuppressed: boolean;
}

export interface ProjectScenario {
  id: string;
  name: string;
  costUsd: number;
  timelineMonths: number;
  populationServed: number;
  coveragePct: number;
  deficitReductionPct: number;
  pros: string[];
  cons: string[];
}

export interface ExplainableFactor {
  factor: string;
  contributionPct: number;
  score: number;
  detail: string;
}

export interface ExplainableScore {
  priorityScore: number;
  factors: ExplainableFactor[];
  dataSources: { source: string; timestamp: string }[];
  evidenceSummary: string;
}

export interface BankableProject {
  id: string;
  title: string;
  sector: string;
  country: string;
  region: string;
  coordinates: [number, number];
  budgetUsd: number;
  budgetLocalCurrency: string;
  timelineMonths: number;
  beneficiariesCount: number;
  deficitGapAddressed: string;
  citizenSupportRate: number;
  primaryCitizenComplaintsAggregated: number;
  executiveSummary: string;
  dpiComponents: string[];
  ndbFinancingModel: string;
  sdgAlignment: string[];
  priorityRank: number;
  imageKey: 'water' | 'energy' | 'road' | 'digital';
  carbonOffsetTonsAnnual: number;
  assignedDepartment: string;
  approvalStatus: 'Approved by Official' | 'Pending Ministerial Review' | 'Draft Formulation';
  officialReviewNotes: string;
  explainableScore: ExplainableScore;
  scenarios: ProjectScenario[];
}

export interface ImpactAudit {
  id: string;
  projectId: string;
  projectTitle: string;
  country: string;
  region: string;
  sector: string;
  completedDate: string;
  complaintsBefore: number;
  complaintsAfter: number;
  responseTimeDaysBefore: number;
  responseTimeDaysAfter: number;
  citizenSatisfactionBeforePct: number;
  citizenSatisfactionAfterPct: number;
  infrastructureReliabilityBefore: string;
  infrastructureReliabilityAfter: string;
  verifiedOutcomeSummary: string;
  citizenFeedbackSample: { quote: string; stars: number; date: string }[];
}

export interface EmergencyIncident {
  id: string;
  type: string;
  country: string;
  region: string;
  severity: 'CRITICAL EMERGENCY' | 'HIGH ALERT' | 'ADVISORY';
  reportedTimestamp: string;
  populationAtRisk: number;
  incomingGrievanceVelocityPerHour: number;
  criticalInfraAtRisk: string[];
  responseUnitsDeployed: string[];
  emergencyActionRequired: string;
}

export interface VoiceSample {
  id: string;
  language: string;
  country: string;
  speaker: string;
  snippetText: string;
  fullText: string;
  sector: string;
  channel: string;
  urgencyScore: number;
}
