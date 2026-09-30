/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  IconMicrophone,
  IconPlayerPlay,
  IconPlayerPause,
  IconMessageCircle2,
  IconSearch,
  IconCheck,
  IconSend,
  IconMapPin,
  IconShieldCheck,
  IconLanguage,
  IconHeadset,
  IconSparkles,
} from '@tabler/icons-react';
import { CitizenRequest } from '../../types';
import { VOICE_SAMPLES } from '../../data/mockData';
import { SvgFlag } from '../common/SvgFlag';

interface CitizenHubViewProps {
  requests: CitizenRequest[];
  onAddRequest: (req: CitizenRequest) => void;
  initialRegion?: string;
  initialCountry?: string;
}

export const CitizenHubView: React.FC<CitizenHubViewProps> = ({
  requests,
  onAddRequest,
  initialRegion,
  initialCountry,
}) => {
  const [activeTab, setActiveTab] = useState<'voice' | 'whatsapp' | 'tracker' | 'form'>('voice');

  // Voice simulator state
  const [selectedSample, setSelectedSample] = useState(VOICE_SAMPLES[0]);
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [transcribedText, setTranscribedText] = useState(selectedSample.fullText);
  const [voiceSubmitted, setVoiceSubmitted] = useState(false);

  // WhatsApp bot chat simulator state
  const [chatMessages, setChatMessages] = useState<
    { sender: 'bot' | 'user'; text: string; time: string }[]
  >([
    {
      sender: 'bot',
      text: 'Olá! Sou o assistente cidadão CivicPulse BRICS. Como posso registrar sua solicitação de infraestrutura pública hoje?',
      time: '10:41',
    },
    {
      sender: 'user',
      text: 'A ponte vicinal de Juazeiro desmoronou com as chuvas e não passa caminhão nem ambulância!',
      time: '10:42',
    },
    {
      sender: 'bot',
      text: 'Obrigado. Localização detectada: Juazeiro, Bahia. Prioridade: Alta (Estradas e Transporte Rural). Protocolo DPG gerado: CIT-BR-20481. Sua solicitação foi agrupada no cluster de obras emergenciais.',
      time: '10:42',
    },
  ]);
  const [chatInput, setChatInput] = useState('');

  // Ticket tracker state
  const [trackingCodeInput, setTrackingCodeInput] = useState('CIT-IN-84920');
  const [trackedRequest, setTrackedRequest] = useState<CitizenRequest | null>(
    requests.find((r) => r.trackingCode === 'CIT-IN-84920') || requests[0]
  );

  // Manual Form submission state
  const [formData, setFormData] = useState({
    country: initialCountry || 'India',
    region: initialRegion || 'Uttar Pradesh Eastern Basin',
    district: 'Varanasi Rural Ward 14',
    sector: 'Water & Sanitation' as CitizenRequest['sector'],
    urgency: 'Critical' as CitizenRequest['urgency'],
    language: 'Hindi',
    originalText: '',
    channel: 'Voice Call / IVR' as CitizenRequest['channel'],
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleVoiceSampleSelect = (sample: typeof VOICE_SAMPLES[0]) => {
    setSelectedSample(sample);
    setTranscribedText(sample.fullText);
    setIsPlaying(false);
    setIsRecording(false);
    setVoiceSubmitted(false);
  };

  const handleSendChat = () => {
    if (!chatInput.trim()) return;
    const userMsg = {
      sender: 'user' as const,
      text: chatInput,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    const botMsg = {
      sender: 'bot' as const,
      text: `Grievance registered. AI categorized as ${formData.sector}. Verified and dispatched to Municipal Director with standard SLA: 48 hours. Tracking code: CIT-LIVE-${Math.floor(
        10000 + Math.random() * 90000
      )}.`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setChatMessages((prev) => [...prev, userMsg, botMsg]);
    setChatInput('');
  };

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const found = requests.find(
      (r) => r.trackingCode.toLowerCase() === trackingCodeInput.trim().toLowerCase()
    );
    if (found) {
      setTrackedRequest(found);
    } else {
      setTrackedRequest(null);
    }
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.originalText.trim()) return;

    const newReq: CitizenRequest = {
      id: `REQ-NEW-${Date.now()}`,
      trackingCode: `CIT-${formData.country.slice(0, 2).toUpperCase()}-${Math.floor(
        10000 + Math.random() * 90000
      )}`,
      country: formData.country,
      region: formData.region,
      district: formData.district,
      coordinates: [26.85, 80.95],
      language: formData.language,
      languageCode: 'auto',
      originalText: formData.originalText,
      englishTranslation: formData.originalText,
      channel: formData.channel,
      sector: formData.sector,
      urgency: formData.urgency,
      urgencyScore: formData.urgency === 'Critical' ? 95 : 82,
      urgencyRationale: 'Direct citizen hardship logged through CivicPulse citizen intake rail.',
      confidence: { location: 96, category: 95, urgency: 92, affectedInfra: 90 },
      timestamp: 'Just now',
      affectedPopulationEstimate: 'Local hamlet community',
      assignedDepartment: 'Public Works Directorate',
      dpgStandardCode: `DPG-CIT-2026-${Math.floor(100 + Math.random() * 900)}`,
      status: 'Verified',
    };

    onAddRequest(newReq);
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData((prev) => ({ ...prev, originalText: '' }));
    }, 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] font-bold text-[var(--color-accent)] bg-[var(--color-accent-subtle)] px-2 py-0.5 rounded-xs border border-[var(--color-accent)]/20 uppercase">
              Decentralized Citizen Rail
            </span>
            <span className="text-xs text-[var(--color-text-muted)]">
              DPG Standard 5: Open Grievance Ingestion
            </span>
          </div>
          <h1 className="font-editorial text-2xl font-medium text-[var(--color-text-primary)] mt-1">
            Multilingual Citizen Hub & Ingestion Rails
          </h1>
          <p className="text-xs text-[var(--color-text-muted)] max-w-2xl">
            Simulate how residents in remote rural wards submit spoken IVR voice messages or WhatsApp reports in native languages without digital literacy barriers.
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-surface)] p-1 text-xs font-medium">
          <button
            onClick={() => setActiveTab('voice')}
            className={`px-3 py-1.5 rounded-xs cursor-pointer transition-colors ${
              activeTab === 'voice'
                ? 'bg-[var(--color-accent)] text-white font-semibold'
                : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
            }`}
          >
            Voice / IVR Rail
          </button>
          <button
            onClick={() => setActiveTab('whatsapp')}
            className={`px-3 py-1.5 rounded-xs cursor-pointer transition-colors ${
              activeTab === 'whatsapp'
                ? 'bg-[var(--color-accent)] text-white font-semibold'
                : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
            }`}
          >
            WhatsApp / Messaging
          </button>
          <button
            onClick={() => setActiveTab('tracker')}
            className={`px-3 py-1.5 rounded-xs cursor-pointer transition-colors ${
              activeTab === 'tracker'
                ? 'bg-[var(--color-accent)] text-white font-semibold'
                : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
            }`}
          >
            Track Status
          </button>
          <button
            onClick={() => setActiveTab('form')}
            className={`px-3 py-1.5 rounded-xs cursor-pointer transition-colors ${
              activeTab === 'form'
                ? 'bg-[var(--color-accent)] text-white font-semibold'
                : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
            }`}
          >
            Submit Report
          </button>
        </div>
      </div>

      {/* Tab 1: Voice / IVR Recorder Simulation */}
      {activeTab === 'voice' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Sample Select (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <span className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">
              Multilingual Spoken Dialects
            </span>
            {VOICE_SAMPLES.map((sample) => {
              const isSelected = sample.id === selectedSample.id;
              const flagCode =
                sample.country === 'India'
                  ? 'IN'
                  : sample.country === 'Brazil'
                  ? 'BR'
                  : sample.country === 'South Africa'
                  ? 'ZA'
                  : 'CN';

              return (
                <div
                  key={sample.id}
                  onClick={() => handleVoiceSampleSelect(sample)}
                  className={`p-3.5 rounded-[var(--radius-md)] border cursor-pointer transition-all ${
                    isSelected
                      ? 'border-[var(--color-accent)] bg-[var(--color-accent-subtle)] shadow-xs'
                      : 'border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-border-strong)]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <SvgFlag countryCode={flagCode} />
                      <span className="font-semibold text-xs text-[var(--color-text-primary)]">
                        {sample.language}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-[var(--color-accent)] font-bold">
                      {sample.channel}
                    </span>
                  </div>
                  <div className="text-[11px] text-[var(--color-text-muted)] mt-1">{sample.speaker}</div>
                  <div className="text-[11px] text-[var(--color-text-secondary)] mt-1 italic font-serif line-clamp-1">
                    "{sample.snippetText}"
                  </div>
                </div>
              );
            })}
          </div>

          {/* Voice Interface Simulator (8 cols) */}
          <div className="lg:col-span-8 space-y-4">
            <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-5 shadow-xs">
              <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-4">
                <div className="flex items-center gap-2">
                  <IconHeadset className="h-5 w-5 text-[var(--color-accent)]" />
                  <div>
                    <h3 className="font-semibold text-sm text-[var(--color-text-primary)]">
                      Toll-Free IVR Interactive Voice Response Rail
                    </h3>
                    <p className="text-[11px] text-[var(--color-text-muted)]">
                      Bhashini AI Speech Engine & Whisper Multilingual Open Model
                    </p>
                  </div>
                </div>

                <span className="font-mono text-xs text-[var(--color-success-text)] bg-[var(--color-success-bg)] px-2 py-0.5 rounded-xs border border-[var(--color-success-border)]">
                  Carrier Line: Connected
                </span>
              </div>

              {/* Spoken Audio Player / Recorder Box */}
              <div className="rounded-[var(--radius-md)] bg-neutral-900 text-white p-5 space-y-4">
                <div className="flex items-center justify-between text-xs text-neutral-400">
                  <span>Selected Speaker: {selectedSample.speaker}</span>
                  <span className="font-mono text-emerald-400">Sample Duration: 0:28s</span>
                </div>

                {/* Animated Waveform */}
                <div className="flex items-center justify-center gap-1.5 h-16 py-2">
                  {[25, 45, 80, 50, 95, 60, 30, 75, 90, 40, 60, 85, 30, 95, 70, 45, 80, 55, 30, 65, 85, 40, 70, 95, 50].map(
                    (h, i) => (
                      <div
                        key={i}
                        className={`w-1 rounded-full transition-all duration-300 ${
                          isPlaying || isRecording
                            ? 'bg-cyan-400 animate-pulse'
                            : 'bg-neutral-600'
                        }`}
                        style={{ height: isPlaying || isRecording ? `${h}%` : '20%' }}
                      />
                    )
                  )}
                </div>

                {/* Play / Record controls */}
                <div className="flex items-center justify-center gap-3">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="flex items-center gap-2 px-4 py-2 rounded-[var(--radius-sm)] bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-semibold cursor-pointer transition-colors"
                  >
                    {isPlaying ? (
                      <>
                        <IconPlayerPause className="h-4 w-4" />
                        <span>Pause Spoken Audio</span>
                      </>
                    ) : (
                      <>
                        <IconPlayerPlay className="h-4 w-4" />
                        <span>Listen to Native Dialect</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => setIsRecording(!isRecording)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-[var(--radius-sm)] text-xs font-semibold cursor-pointer transition-colors ${
                      isRecording
                        ? 'bg-rose-600 text-white animate-pulse'
                        : 'bg-neutral-800 text-neutral-200 hover:bg-neutral-700'
                    }`}
                  >
                    <IconMicrophone className="h-4 w-4" />
                    <span>{isRecording ? 'Recording Mic...' : 'Record Custom Voice'}</span>
                  </button>
                </div>
              </div>

              {/* Real-time Transcription Stream */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold text-[var(--color-text-primary)]">
                  <span>Automated Speech-to-Text Transcription ({selectedSample.language})</span>
                  <span className="text-[10px] text-[var(--color-accent)] font-mono">
                    Accuracy: 98.4%
                  </span>
                </div>

                <div className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface-secondary)] p-4 text-xs font-serif italic text-[var(--color-text-primary)] leading-relaxed">
                  "{transcribedText}"
                </div>
              </div>

              {/* Confirmation Action */}
              <div className="flex items-center justify-between pt-2">
                <span className="text-[11px] text-[var(--color-text-muted)]">
                  Triage Urgency Assessed:{' '}
                  <strong className="text-[var(--color-danger-text)] font-mono">
                    Score {selectedSample.urgencyScore}/100
                  </strong>
                </span>

                <button
                  onClick={() => {
                    setVoiceSubmitted(true);
                    setTimeout(() => setVoiceSubmitted(false), 3000);
                  }}
                  className="inline-flex items-center gap-1.5 rounded-[var(--radius-sm)] bg-[var(--color-accent)] px-4 py-2 text-xs font-semibold text-white hover:bg-[var(--color-accent-hover)] cursor-pointer"
                >
                  {voiceSubmitted ? (
                    <>
                      <IconCheck className="h-4 w-4" />
                      <span>Ingested into Triangulation Pipeline!</span>
                    </>
                  ) : (
                    <>
                      <IconSparkles className="h-4 w-4" />
                      <span>Submit Voice to Triage Queue</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: WhatsApp / WeChat Bot Chat Simulator */}
      {activeTab === 'whatsapp' && (
        <div className="max-w-2xl mx-auto rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] overflow-hidden shadow-xs">
          {/* Chat Header */}
          <div className="bg-[#075e54] text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center font-bold text-sm">
                CP
              </div>
              <div>
                <div className="font-semibold text-sm">CivicPulse Official Grievance Bot</div>
                <div className="text-[10px] text-white/80">Digital Public Good Automated Citizen Rail</div>
              </div>
            </div>
            <IconShieldCheck className="h-5 w-5 text-emerald-300" />
          </div>

          {/* Chat Messages */}
          <div className="p-4 space-y-3 bg-[#e5ddd5] dark:bg-neutral-900 min-h-[340px] max-h-[440px] overflow-y-auto text-xs">
            {chatMessages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-[var(--radius-md)] p-3 shadow-xs ${
                    msg.sender === 'user'
                      ? 'bg-[#dcf8c6] dark:bg-emerald-800 text-neutral-900 dark:text-white rounded-tr-none'
                      : 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white rounded-tl-none'
                  }`}
                >
                  <p className="leading-relaxed">{msg.text}</p>
                  <div className="text-[9px] text-neutral-500 dark:text-neutral-400 text-right mt-1 font-mono">
                    {msg.time}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Chat Input */}
          <div className="p-3 bg-[var(--color-surface)] border-t border-[var(--color-border)] flex items-center gap-2">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendChat()}
              placeholder="Digite sua mensagem sobre estrada, água, energia... (Type message)"
              className="flex-1 rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-surface-secondary)] px-3 py-2 text-xs text-[var(--color-text-primary)] focus:outline-hidden"
            />
            <button
              onClick={handleSendChat}
              className="rounded-[var(--radius-sm)] bg-[#075e54] text-white p-2 hover:bg-[#128c7e] cursor-pointer"
            >
              <IconSend className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* Tab 3: Track Status */}
      {activeTab === 'tracker' && (
        <div className="max-w-2xl mx-auto rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-6 shadow-xs">
          <div>
            <h3 className="font-semibold text-base text-[var(--color-text-primary)]">
              DPG Standard Grievance Resolution Tracker
            </h3>
            <p className="text-xs text-[var(--color-text-muted)]">
              Enter your tracking code to view live SLA milestones, dispatch logs, and contractor work orders
            </p>
          </div>

          <form onSubmit={handleTrackSubmit} className="flex gap-2">
            <input
              type="text"
              value={trackingCodeInput}
              onChange={(e) => setTrackingCodeInput(e.target.value)}
              placeholder="e.g. CIT-IN-84920"
              className="flex-1 rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-surface-secondary)] px-3 py-2 text-xs font-mono text-[var(--color-text-primary)] uppercase focus:outline-hidden focus:border-[var(--color-accent)]"
            />
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 rounded-[var(--radius-sm)] bg-[var(--color-accent)] px-4 py-2 text-xs font-semibold text-white hover:bg-[var(--color-accent-hover)] cursor-pointer"
            >
              <IconSearch className="h-4 w-4" />
              <span>Lookup</span>
            </button>
          </form>

          {trackedRequest ? (
            <div className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface-secondary)] p-4 space-y-4 text-xs">
              <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-3">
                <div>
                  <span className="font-mono text-xs font-bold text-[var(--color-accent)]">
                    {trackedRequest.trackingCode}
                  </span>
                  <div className="text-[11px] text-[var(--color-text-muted)]">
                    {trackedRequest.district}, {trackedRequest.region} ({trackedRequest.country})
                  </div>
                </div>
                <span className="rounded-xs bg-[var(--color-accent-subtle)] text-[var(--color-accent)] px-2.5 py-1 text-xs font-semibold border border-[var(--color-accent)]/20">
                  {trackedRequest.status}
                </span>
              </div>

              {/* Progress Milestones */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-[11px] text-[var(--color-text-muted)]">
                  <span className="font-medium text-[var(--color-text-primary)]">
                    Stage: Verified & Triangulated
                  </span>
                  <span className="font-mono text-[var(--color-accent)]">SLA: 48h Remaining</span>
                </div>

                <div className="grid grid-cols-4 gap-2 text-center text-[10px]">
                  <div className="p-2 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300 font-semibold">
                    1. Voice Ingested
                  </div>
                  <div className="p-2 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300 font-semibold">
                    2. AI Triaged
                  </div>
                  <div className="p-2 rounded bg-cyan-500/10 border border-cyan-500/30 text-cyan-800 dark:text-cyan-300 font-semibold">
                    3. Dept Assigned
                  </div>
                  <div className="p-2 rounded bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-muted)]">
                    4. Work Completed
                  </div>
                </div>
              </div>

              <div className="pt-2 text-[11px] text-[var(--color-text-secondary)]">
                <strong>Assigned To:</strong> {trackedRequest.assignedDepartment}
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-[var(--radius-md)] border border-dashed border-[var(--color-border)] text-center text-xs text-[var(--color-text-muted)]">
              No record found for code "{trackingCodeInput}". Please verify code syntax.
            </div>
          )}
        </div>
      )}

      {/* Tab 4: Manual Grievance Submission Form */}
      {activeTab === 'form' && (
        <div className="max-w-2xl mx-auto rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-5 shadow-xs">
          <div>
            <h3 className="font-semibold text-base text-[var(--color-text-primary)]">
              Direct Citizen Grievance Portal
            </h3>
            <p className="text-xs text-[var(--color-text-muted)]">
              Submit a public infrastructure defect or water/power outage directly to the open DPI ledger
            </p>
          </div>

          <form onSubmit={handleManualSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-medium text-[var(--color-text-secondary)] mb-1">
                  Country
                </label>
                <select
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  className="w-full rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-1.5 text-xs text-[var(--color-text-primary)]"
                >
                  <option value="India">India</option>
                  <option value="Brazil">Brazil</option>
                  <option value="South Africa">South Africa</option>
                  <option value="China">China</option>
                  <option value="Russia">Russia</option>
                  <option value="Ethiopia">Ethiopia</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-medium text-[var(--color-text-secondary)] mb-1">
                  Infrastructure Sector
                </label>
                <select
                  value={formData.sector}
                  onChange={(e) => setFormData({ ...formData, sector: e.target.value as any })}
                  className="w-full rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-1.5 text-xs text-[var(--color-text-primary)]"
                >
                  <option value="Water & Sanitation">Water & Sanitation</option>
                  <option value="Clean Energy & Grid">Clean Energy & Grid</option>
                  <option value="Rural Transport & Roads">Rural Transport & Roads</option>
                  <option value="Digital Public Infrastructure">Digital Public Infrastructure</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-medium text-[var(--color-text-secondary)] mb-1">
                  District / Rural Ward
                </label>
                <input
                  type="text"
                  value={formData.district}
                  onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                  className="w-full rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-1.5 text-xs text-[var(--color-text-primary)]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-[var(--color-text-secondary)] mb-1">
                  Urgency Level
                </label>
                <select
                  value={formData.urgency}
                  onChange={(e) => setFormData({ ...formData, urgency: e.target.value as any })}
                  className="w-full rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-1.5 text-xs text-[var(--color-text-primary)]"
                >
                  <option value="Critical">Critical (Immediate Hazard)</option>
                  <option value="High">High (Severe Disruption)</option>
                  <option value="Medium">Medium (Routine Repair)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-medium text-[var(--color-text-secondary)] mb-1">
                Detailed Problem Description (Original Language)
              </label>
              <textarea
                rows={3}
                required
                value={formData.originalText}
                onChange={(e) => setFormData({ ...formData, originalText: e.target.value })}
                placeholder="Describe broken solar pump, power transformer outage, or impassable muddy road..."
                className="w-full rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-surface)] p-2.5 text-xs text-[var(--color-text-primary)] focus:outline-hidden focus:border-[var(--color-accent)]"
              />
            </div>

            {formSubmitted && (
              <div className="rounded-[var(--radius-sm)] bg-emerald-500/10 border border-emerald-500/30 p-2.5 text-xs text-emerald-700 dark:text-emerald-300 flex items-center gap-2">
                <IconCheck className="h-4 w-4 shrink-0" />
                <span>Grievance registered and assigned DPG tracking code!</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full rounded-[var(--radius-sm)] bg-[var(--color-accent)] py-2 text-xs font-semibold text-white hover:bg-[var(--color-accent-hover)] transition-colors cursor-pointer"
            >
              Submit Grievance to Queue
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
