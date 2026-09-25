import React, { useState, useEffect } from 'react';
import {
  Settings as SettingsIcon,
  Shield,
  Globe,
  Cpu,
  RefreshCw,
  Download,
  AlertTriangle,
  Check,
  Save,
  MapPin,
  Sparkles,
  MessageSquare,
  Clock,
  Smartphone,
  Play,
  ArrowRight,
  Mail,
  Calendar,
  FolderGit,
  Database,
} from 'lucide-react';
import { useAgent } from '../../context/AgentContext';
import { TECH_LANGUAGES, getLanguage } from '../../data/languages';
import {
  loginWithGoogleOAuth,
  logoutGoogleOAuth,
  getSavedGoogleAccessToken,
  getSavedGoogleUser,
} from '../../services/googleOAuthFlow';

export const SettingsView: React.FC = () => {
  const {
    settings,
    updateSettings,
    tasks,
    files,
    activities,
    approvals,
    currentLanguage,
    setLanguageMode,
    setIsLanguageModalOpen,
    t,
  } = useAgent();

  const [formData, setFormData] = useState({ ...settings });
  const [saveSuccess, setSaveSuccess] = useState(false);

  const [googleUser, setGoogleUser] = useState<any>(null);
  const [googleToken, setGoogleToken] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  useEffect(() => {
    // Check if user is already logged in on mount
    const loadGoogleStatus = () => {
      const token = getSavedGoogleAccessToken();
      const user = getSavedGoogleUser();
      if (token && user) {
        setGoogleToken(token);
        setGoogleUser(user);
      }
    };
    loadGoogleStatus();
  }, []);

  const handleGoogleConnect = async () => {
    setIsLoggingIn(true);
    try {
      const result = await loginWithGoogleOAuth();
      if (result) {
        setGoogleUser(result.user);
        setGoogleToken(result.accessToken);
      }
    } catch (err) {
      console.error("Google connect failed:", err);
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleGoogleDisconnect = () => {
    try {
      logoutGoogleOAuth();
      setGoogleUser(null);
      setGoogleToken(null);
    } catch (err) {
      console.error("Google disconnect failed:", err);
    }
  };

  // WhatsApp Auto-Responder States
  const [waEnabled, setWaEnabled] = useState(true);
  const [waDelay, setWaDelay] = useState(20);
  const [waLanguageMatching, setWaLanguageMatching] = useState(true);
  const [waTone, setWaTone] = useState<'professional' | 'friendly' | 'casual'>('friendly');
  
  // Interactive Simulation States
  const [simStatus, setSimStatus] = useState<'idle' | 'waiting' | 'generating' | 'dispatched'>('idle');
  const [simScenario, setSimScenario] = useState<'inquiry_bn' | 'support_en' | 'deal_de'>('inquiry_bn');
  const [simProgress, setSimProgress] = useState(0);
  const [simLog, setSimLog] = useState<string[]>([]);
  const [simDraft, setSimDraft] = useState('');

  const runSimulation = () => {
    setSimStatus('waiting');
    setSimProgress(0);
    setSimLog([`[12:00 PM] 📥 New WhatsApp Message Received.`]);
    setSimDraft('');

    const scenarioTexts = {
      inquiry_bn: {
        from: '+880 1712-345678',
        text: 'আসসালামু আলাইকুম, আপনাদের সফটওয়্যার ডেভেলপমেন্ট সেবার দাম কত? এবং ডেলিভারি দিতে কতদিন সময় লাগবে?',
        detectedLang: 'Bangla (Bengali)',
        detectedType: 'Service Pricing Inquiry',
        draft: `আসসালামু আলাইকুম ওয়া রহমতুল্লাহ! আব্দুল্লাহ ভাইয়ের পক্ষ থেকে আমি উনার এআই অ্যাসিস্ট্যান্ট বলছি। উনি বর্তমানে একটি গুরুত্বপূর্ণ মিটিংয়ে ব্যস্ত আছেন। আপনি যেহেতু আমাদের সফটওয়্যার ডেভেলপমেন্ট সেবার মূল্য সম্পর্কে জানতে চেয়েছেন, আমাদের প্রজেক্ট সাধারণত কাজের পরিধি অনুযায়ী $১,০০০ থেকে শুরু হয় এবং সময় লাগে ২-৪ সপ্তাহ। উনি ফ্রি হওয়া মাত্রই (২০ মিনিটের মধ্যে রিপ্লাই না পাওয়ায় আমি ড্রাফটটি পাঠালাম) আপনাকে সরাসরি মেসেজ করবেন। ধন্যবাদ!`
      },
      support_en: {
        from: '+1 (555) 019-2834',
        text: 'Hi there, I am having trouble logging into my work dashboard. It says authentication failed.',
        detectedLang: 'English (US)',
        detectedType: 'Technical Support',
        draft: `Hello! I am Abdullah's AI Assistant. As Abdullah hasn't been able to respond in the last 20 minutes, I wanted to help you right away. For dashboard login issues, please try clearing your browser cache or reset your session. I have already flagged this for Abdullah, and he will check in on you as soon as he is back! Thank you for your patience.`
      },
      deal_de: {
        from: '+49 89 201934',
        text: 'Hallo, wir möchten das neue Angebot besprechen. Wann haben Sie Zeit für einen kurzen Anruf?',
        detectedLang: 'German (Deutsch)',
        detectedType: 'Business Meeting Inquiry',
        draft: `Hallo! Ich bin der KI-Assistent von Abdullah. Da Abdullah in den letzten 20 Minuten nicht antworten konnte, helfe ich Ihnen gerne weiter. Er ist diese Woche für einen kurzen Anruf verfügbar. Ich habe dies für ihn notiert, und er wird sich direkt mit Ihnen in Verbindung setzen, sobald er wieder online ist!`
      }
    };

    const scenario = scenarioTexts[simScenario];

    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep += 1;
      setSimProgress(currentStep * 10);
      
      if (currentStep === 2) {
        setSimLog(prev => [...prev, `[12:05 PM] ⏱️ 5 mins elapsed... Waiting for manual reply from Abdullah.`]);
      } else if (currentStep === 4) {
        setSimLog(prev => [...prev, `[12:10 PM] ⏱️ 10 mins elapsed... No manual reply registered.`]);
      } else if (currentStep === 7) {
        setSimLog(prev => [...prev, `[12:15 PM] ⏱️ 15 mins elapsed... Still waiting.`]);
      } else if (currentStep === 10) {
        clearInterval(interval);
        setSimLog(prev => [
          ...prev, 
          `[12:20 PM] 🚨 20-minute threshold reached without reply. Triggering AI Auto-Responder.`,
          `🔍 Analyzing incoming message...`,
          `🗣️ Detected Language: ${scenario.detectedLang}`,
          `📋 Message Type: ${scenario.detectedType}`,
          `🧠 Generating contextual response matched to Abdullah's professional persona with ${waTone} tone...`
        ]);
        
        setSimStatus('generating');
        
        setTimeout(() => {
          setSimDraft(scenario.draft);
          setSimStatus('dispatched');
          setSimLog(prev => [
            ...prev, 
            `✨ Professional reply drafted successfully.`,
            `🚀 Dispatched via WhatsApp Business API successfully to ${scenario.from}!`
          ]);
        }, 1500);
      }
    }, 400);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(formData);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleLanguageSelect = (langId: string) => {
    setFormData((prev) => ({ ...prev, language: langId }));
    setLanguageMode(langId);
  };

  const handleExportWorkspace = () => {
    const backup = {
      exportedAt: new Date().toISOString(),
      settings: formData,
      tasks,
      files,
      approvals,
      activities,
    };
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `abdullah-ai-workspace-backup-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleResetMemory = () => {
    if (window.confirm('Are you sure you want to reset conversation memory? Tasks and files will be preserved.')) {
      window.location.reload();
    }
  };

  const activeLangDetails = getLanguage(formData.language);

  return (
    <div id="settings_view" className="flex-1 overflow-y-auto p-3.5 sm:p-6 lg:p-8 space-y-6 max-w-4xl mx-auto w-full text-[#F8FAFC]">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[rgba(139,92,246,0.2)] pb-4 sm:pb-5">
        <div>
          <h1 className="text-lg sm:text-xl font-bold tracking-tight text-[#F8FAFC] flex items-center gap-2.5">
            <SettingsIcon className="h-5 w-5 sm:h-6 sm:w-6 text-[#C084FC]" />
            <span>{currentLanguage.labels.settingsTitle}</span>
          </h1>
          <p className="mt-1 text-xs text-[#94A3B8]">
            {t.settingsSubtitle}
          </p>
        </div>

        {saveSuccess && (
          <span className="flex items-center gap-1.5 rounded-xl bg-[#00D9A5]/20 px-3.5 py-1.5 text-xs font-semibold text-[#00D9A5] border border-[#00D9A5]/40 shadow-[0_0_12px_rgba(0,217,165,0.3)]">
            <Check className="h-3.5 w-3.5" />
            {t.savedSuccessBadge}
          </span>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-6 text-xs">
        {/* ======================================================== */}
        {/* 30 COUNTRY TECHNOLOGY LANGUAGE MODE SECTION              */}
        {/* ======================================================== */}
        <div className="rounded-2xl bg-[#0D0D20] p-4 sm:p-6 border border-[rgba(139,92,246,0.25)] space-y-4 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[rgba(139,92,246,0.2)]">
            <h2 className="text-sm font-bold text-[#F8FAFC] uppercase tracking-wider flex items-center gap-2">
              <Globe className="h-4 w-4 text-[#C084FC]" />
              <span>{t.langModeSectionTitle}</span>
            </h2>

            <button
              type="button"
              id="btn_open_language_modal_from_settings"
              onClick={() => setIsLanguageModalOpen(true)}
              className="flex items-center gap-1.5 rounded-xl bg-[#7C3AED]/20 hover:bg-[#7C3AED]/30 px-3 py-1.5 text-xs font-semibold text-[#C084FC] border border-[#7C3AED]/40 transition-all self-start sm:self-auto shadow-sm"
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>{t.openModalBtn}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[#94A3B8] font-medium mb-1.5">
                Active Technology Country Language
              </label>
              <select
                id="select_settings_language"
                value={formData.language}
                onChange={(e) => handleLanguageSelect(e.target.value)}
                className="w-full rounded-xl bg-[#080817] px-3.5 py-2.5 text-xs sm:text-sm text-[#F8FAFC] border border-[rgba(139,92,246,0.25)] focus:outline-none focus:border-[#A855F7]"
              >
                {TECH_LANGUAGES.map((lang, idx) => (
                  <option key={lang.id} value={lang.id}>
                    {lang.flag} {lang.country} — {lang.name} ({lang.englishName}) {idx === 0 ? '★ #1 FIRST' : ''} {lang.id === 'en' ? '★ DEFAULT' : ''}
                  </option>
                ))}
              </select>
              <p className="mt-1.5 text-[11px] text-[#94A3B8]">
                Bangladesh is placed #1 in the list. When not configured by the user, the default active language is English.
              </p>
            </div>

            {/* Live Country Card Preview */}
            <div className="rounded-xl bg-[#080817] p-3.5 border border-[rgba(139,92,246,0.2)] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#94A3B8]">
                    Selected Tech Hub
                  </span>
                  <span className="text-[10px] font-mono text-[#00D9A5] bg-[#00D9A5]/15 px-2 py-0.5 rounded-lg border border-[#00D9A5]/30">
                    {activeLangDetails.region}
                  </span>
                </div>
                <div className="flex items-center gap-2.5 mt-2">
                  <span className="text-2xl select-none">{activeLangDetails.flag}</span>
                  <div>
                    <div className="text-sm font-bold text-[#F8FAFC]">
                      {activeLangDetails.country} ({activeLangDetails.name})
                    </div>
                    <div className="text-xs text-[#94A3B8]">
                      Standard: {activeLangDetails.englishName}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-2.5 pt-2 border-t border-[rgba(139,92,246,0.15)] flex items-center justify-between text-[11px] text-[#94A3B8]">
                <span className="flex items-center gap-1 text-[#00D9A5] font-mono">
                  <MapPin className="h-3 w-3" />
                  {activeLangDetails.techHub}
                </span>
                <span className="truncate max-w-[150px]">{activeLangDetails.techDomain}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Agent Profile & Identity */}
        <div className="rounded-2xl bg-[#0D0D20] p-4 sm:p-6 border border-[rgba(139,92,246,0.25)] space-y-4 shadow-xl">
          <h2 className="text-sm font-bold text-[#F8FAFC] uppercase tracking-wider flex items-center gap-2">
            <Cpu className="h-4 w-4 text-[#C084FC]" />
            <span>Agent Identity & Autonomous Profile</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[#94A3B8] font-medium mb-1">Agent Name</label>
              <input
                type="text"
                value={formData.agentName}
                onChange={(e) => setFormData({ ...formData, agentName: e.target.value })}
                className="w-full rounded-xl bg-[#080817] px-3.5 py-2.5 text-[#F8FAFC] border border-[rgba(139,92,246,0.25)] focus:outline-none focus:border-[#A855F7]"
              />
            </div>

            <div>
              <label className="block text-[#94A3B8] font-medium mb-1">Authorized User</label>
              <input
                type="text"
                disabled
                value="Abdullah (Owner & Principal)"
                className="w-full rounded-xl bg-[#080817]/60 px-3.5 py-2.5 text-[#94A3B8] border border-[rgba(139,92,246,0.2)] cursor-not-allowed"
              />
            </div>
          </div>
        </div>

        {/* Permissions & Safety */}
        <div className="rounded-2xl bg-[#0D0D20] p-4 sm:p-6 border border-[rgba(139,92,246,0.25)] space-y-4 shadow-xl">
          <h2 className="text-sm font-bold text-[#F8FAFC] uppercase tracking-wider flex items-center gap-2">
            <Shield className="h-4 w-4 text-[#D946EF]" />
            <span>Safety & Security Guardrails</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[#94A3B8] font-medium mb-1">Permission Sensitivity</label>
              <select
                value={formData.permissionSensitivity}
                onChange={(e) =>
                  setFormData({ ...formData, permissionSensitivity: e.target.value as any })
                }
                className="w-full rounded-xl bg-[#080817] px-3.5 py-2.5 text-[#F8FAFC] border border-[rgba(139,92,246,0.25)] focus:outline-none"
              >
                <option value="High">High (Strict Gate: All external actions require approval)</option>
                <option value="Medium">Medium (Balanced: External communication & deletes gated)</option>
                <option value="Low">Low (Permissive: Only sensitive deletions gated)</option>
              </select>
            </div>

            <div>
              <label className="block text-[#94A3B8] font-medium mb-1">Autonomous Plan Execution</label>
              <select
                value={formData.aiBehavior}
                onChange={(e) => setFormData({ ...formData, aiBehavior: e.target.value as any })}
                className="w-full rounded-xl bg-[#080817] px-3.5 py-2.5 text-[#F8FAFC] border border-[rgba(139,92,246,0.25)] focus:outline-none"
              >
                <option value="semi-autonomous">Semi-Autonomous (Confirm before critical tools)</option>
                <option value="autonomous">Fully Autonomous (Auto-approve non-destructive tasks)</option>
                <option value="strict-approval">Strict Approval (Human in the loop on all actions)</option>
              </select>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <label className="flex items-center justify-between p-3 rounded-xl bg-[#080817] border border-[rgba(139,92,246,0.2)] cursor-pointer">
              <div>
                <span className="font-semibold text-[#F8FAFC] block">Safe Execution Mode</span>
                <span className="text-[11px] text-[#94A3B8]">
                  Pre-screens code modifications, verifies syntax, and prevents unintended overwrites.
                </span>
              </div>
              <input
                type="checkbox"
                checked={formData.safeMode}
                onChange={(e) => setFormData({ ...formData, safeMode: e.target.checked })}
                className="h-4 w-4 rounded accent-[#7C3AED]"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-xl bg-[#080817] border border-[rgba(139,92,246,0.2)] cursor-pointer">
              <div>
                <span className="font-semibold text-[#F8FAFC] block">In-App Notifications</span>
                <span className="text-[11px] text-[#94A3B8]">
                  Display immediate alerts when tasks complete or approvals are required.
                </span>
              </div>
              <input
                type="checkbox"
                checked={formData.notifications}
                onChange={(e) => setFormData({ ...formData, notifications: e.target.checked })}
                className="h-4 w-4 rounded accent-[#7C3AED]"
              />
            </label>

            <div className="pt-3 border-t border-[rgba(139,92,246,0.15)] space-y-3">
              <span className="text-[11px] font-bold tracking-wider text-[#C084FC] uppercase block">
                Delegated Authority & Autopilot Settings
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label className="flex items-center justify-between p-3 rounded-xl bg-[#080817] border border-[rgba(139,92,246,0.18)] cursor-pointer">
                  <div>
                    <span className="font-semibold text-[#F8FAFC] block text-xs">Auto-Dispatch Communications</span>
                    <span className="text-[10px] text-[#94A3B8] block mt-0.5">
                      Allow agent to draft and send outbound emails/replies directly.
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={formData.autoApproveEmail}
                    onChange={(e) => setFormData({ ...formData, autoApproveEmail: e.target.checked })}
                    className="h-3.5 w-3.5 rounded accent-[#7C3AED] shrink-0 ml-2"
                  />
                </label>

                <label className="flex items-center justify-between p-3 rounded-xl bg-[#080817] border border-[rgba(139,92,246,0.18)] cursor-pointer">
                  <div>
                    <span className="font-semibold text-[#F8FAFC] block text-xs">Auto-Schedule Meetings</span>
                    <span className="text-[10px] text-[#94A3B8] block mt-0.5">
                      Authorize agent to book events and suggest calendar slots.
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={formData.autoApproveCalendar}
                    onChange={(e) => setFormData({ ...formData, autoApproveCalendar: e.target.checked })}
                    className="h-3.5 w-3.5 rounded accent-[#7C3AED] shrink-0 ml-2"
                  />
                </label>

                <label className="flex items-center justify-between p-3 rounded-xl bg-[#080817] border border-[rgba(139,92,246,0.18)] cursor-pointer">
                  <div>
                    <span className="font-semibold text-[#F8FAFC] block text-xs">Autonomous File Syncing</span>
                    <span className="text-[10px] text-[#94A3B8] block mt-0.5">
                      Permit agent to rewrite, backup, or clean localized work-files.
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={formData.autoApproveFiles}
                    onChange={(e) => setFormData({ ...formData, autoApproveFiles: e.target.checked })}
                    className="h-3.5 w-3.5 rounded accent-[#7C3AED] shrink-0 ml-2"
                  />
                </label>

                <label className="flex items-center justify-between p-3 rounded-xl bg-[#080817] border border-[rgba(139,92,246,0.18)] cursor-pointer">
                  <div>
                    <span className="font-semibold text-[#F8FAFC] block text-xs">Automated Market Sourcing</span>
                    <span className="text-[10px] text-[#94A3B8] block mt-0.5">
                      Query APIs and scrape live search metrics without approval gate.
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={formData.autoApproveResearch}
                    onChange={(e) => setFormData({ ...formData, autoApproveResearch: e.target.checked })}
                    className="h-3.5 w-3.5 rounded accent-[#7C3AED] shrink-0 ml-2"
                  />
                </label>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#080817] border border-[rgba(139,92,246,0.2)] flex items-center justify-between">
              <div>
                <span className="font-semibold text-[#F8FAFC] block">Server-Side Gemini 3.8 Integration</span>
                <span className="text-[11px] text-[#94A3B8]">
                  API Key is securely isolated on the backend server (`server.ts`).
                </span>
              </div>
              <span className="rounded-lg bg-[#00D9A5]/15 px-2.5 py-1 text-[10px] font-mono font-semibold text-[#00D9A5] border border-[#00D9A5]/30">
                Connected & Armed
              </span>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* CREWAI ENTERPRISE INTEGRATION                            */}
        {/* ======================================================== */}
        <div className="rounded-2xl bg-[#0D0D20] p-4 sm:p-6 border border-[rgba(139,92,246,0.25)] space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-[rgba(139,92,246,0.2)] pb-3">
            <h2 className="text-sm font-bold text-[#F8FAFC] uppercase tracking-wider flex items-center gap-2">
              <Cpu className="h-4 w-4 text-[#C084FC]" />
              <span>CrewAI Studio & Enterprise Integration</span>
            </h2>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={formData.crewAiEnabled || false} 
                onChange={(e) => setFormData({ ...formData, crewAiEnabled: e.target.checked })}
                className="sr-only peer" 
              />
              <div className="w-9 h-5 bg-[#080817] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-[#94A3B8] peer-checked:after:bg-[#A855F7] after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-purple-950/40 border border-purple-500/20"></div>
              <span className="ml-2 text-[10px] font-bold text-[#94A3B8] uppercase">
                {formData.crewAiEnabled ? 'Active' : 'Disabled'}
              </span>
            </label>
          </div>

          <p className="text-[11px] text-[#94A3B8] leading-relaxed">
            Connect your autonomous Agent-alpha08 directly to your deployed **CrewAI Studio / CrewAI Enterprise API**. When enabled, your chat messages are routed to CrewAI to orchestrate your custom workflows, agents, and multi-agent tasks. If the endpoint is offline, it gracefully falls back to your direct Gemini connection.
          </p>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-[#94A3B8] font-medium mb-1.5">CrewAI API Endpoint URL</label>
                <input
                  type="text"
                  placeholder="https://api.crewai.com/v1/crews/crew_1234/kickoff"
                  value={formData.crewAiUrl || ''}
                  onChange={(e) => setFormData({ ...formData, crewAiUrl: e.target.value })}
                  disabled={!formData.crewAiEnabled}
                  className="w-full rounded-xl bg-[#080817] px-3.5 py-2.5 text-[#F8FAFC] border border-[rgba(139,92,246,0.25)] focus:outline-none focus:border-[#A855F7] disabled:opacity-50 disabled:cursor-not-allowed text-xs font-mono"
                />
                <span className="text-[10px] text-[#64748B] block mt-1.5">
                  Enter your custom kickoff webhook or self-hosted FastAPI endpoint.
                </span>
              </div>

              <div>
                <label className="block text-[#94A3B8] font-medium mb-1.5">Bearer Authorization Token</label>
                <input
                  type="password"
                  placeholder="••••••••••••••••••••••••••••••••"
                  value={formData.crewAiToken || ''}
                  onChange={(e) => setFormData({ ...formData, crewAiToken: e.target.value })}
                  disabled={!formData.crewAiEnabled}
                  className="w-full rounded-xl bg-[#080817] px-3.5 py-2.5 text-[#F8FAFC] border border-[rgba(139,92,246,0.25)] focus:outline-none focus:border-[#A855F7] disabled:opacity-50 disabled:cursor-not-allowed text-xs font-mono"
                />
                <span className="text-[10px] text-[#64748B] block mt-1.5">
                  The API token is securely transmitted to the target URL to authorize executions.
                </span>
              </div>

              <div>
                <label className="block text-[#94A3B8] font-medium mb-1.5">Organization ID</label>
                <input
                  type="text"
                  placeholder="e.g. 2a3f7cbb-32b7-456c-a123-f0462033293c"
                  value={formData.crewAiOrgId || ''}
                  onChange={(e) => setFormData({ ...formData, crewAiOrgId: e.target.value })}
                  disabled={!formData.crewAiEnabled}
                  className="w-full rounded-xl bg-[#080817] px-3.5 py-2.5 text-[#F8FAFC] border border-[rgba(139,92,246,0.25)] focus:outline-none focus:border-[#A855F7] disabled:opacity-50 disabled:cursor-not-allowed text-xs font-mono"
                />
                <span className="text-[10px] text-[#64748B] block mt-1.5">
                  X-Crewai-Organization-Id security header used during API communication.
                </span>
              </div>
            </div>

            {formData.crewAiEnabled && (!formData.crewAiUrl) && (
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-[11px] text-amber-300 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-amber-400 shrink-0" />
                <span>Please configure a valid API Endpoint URL to enable routing. Empty configurations will trigger standard Gemini fallbacks.</span>
              </div>
            )}
          </div>
        </div>

        {/* ======================================================== */}
        {/* GOOGLE WORKSPACE LIVE DATA INTEGRATION                   */}
        {/* ======================================================== */}
        <div className="rounded-2xl bg-[#0D0D20] p-4 sm:p-6 border border-emerald-500/25 space-y-4 shadow-xl premium-liquid-glass">
          <div className="flex items-center justify-between border-b border-emerald-500/20 pb-3">
            <h2 className="text-sm font-bold text-[#F8FAFC] uppercase tracking-wider flex items-center gap-2">
              <Database className="h-4 w-4 text-[#10B981]" />
              <span>Google Workspace Live Data Connection</span>
            </h2>
            <div className="flex items-center gap-2">
              <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider border ${
                googleToken 
                  ? 'bg-emerald-500/10 text-[#10B981] border-emerald-500/25' 
                  : 'bg-slate-500/10 text-slate-400 border-slate-500/25'
              }`}>
                <span className={`h-1.5 w-1.5 rounded-full ${googleToken ? 'bg-emerald-400 animate-pulse' : 'bg-slate-500'}`} />
                {googleToken ? 'Connected' : 'Offline'}
              </span>
            </div>
          </div>

          <p className="text-[11px] text-[#94A3B8] leading-relaxed">
            Unleash the full capability of your agent! Connect your Google Workspace to grant secure **Read-Only** access. Your agent will dynamically scan Gmail threads, calendar meet times, Drive files, and spreadsheet data on-demand during chat queries, keeping everything local and private.
          </p>

          <div className="rounded-xl bg-[#080817]/60 p-4 border border-emerald-500/10 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-1">
                <span className="text-xs font-semibold text-white">Authorized Access Gateways:</span>
                <div className="flex flex-wrap gap-2 pt-1.5">
                  <span className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-medium border ${googleToken ? 'bg-emerald-500/5 text-emerald-400 border-emerald-500/20' : 'bg-slate-500/5 text-slate-400 border-white/5'}`}>
                    <Mail className="h-3 w-3 shrink-0" />
                    <span>Gmail Read-Only</span>
                  </span>
                  <span className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-medium border ${googleToken ? 'bg-emerald-500/5 text-emerald-400 border-emerald-500/20' : 'bg-slate-500/5 text-slate-400 border-white/5'}`}>
                    <Calendar className="h-3 w-3 shrink-0" />
                    <span>Google Calendar</span>
                  </span>
                  <span className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-medium border ${googleToken ? 'bg-emerald-500/5 text-emerald-400 border-emerald-500/20' : 'bg-slate-500/5 text-slate-400 border-white/5'}`}>
                    <FolderGit className="h-3 w-3 shrink-0" />
                    <span>Google Drive</span>
                  </span>
                  <span className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-medium border ${googleToken ? 'bg-emerald-500/5 text-emerald-400 border-emerald-500/20' : 'bg-slate-500/5 text-slate-400 border-white/5'}`}>
                    <Sparkles className="h-3 w-3 shrink-0" />
                    <span>Google Sheets</span>
                  </span>
                </div>
              </div>

              <div className="flex shrink-0 items-center justify-end">
                {googleToken ? (
                  <div className="flex flex-col items-end gap-2">
                    <span className="text-[10px] font-mono text-[#94A3B8] max-w-[150px] truncate">
                      {googleUser?.email || "Connected Account"}
                    </span>
                    <button
                      type="button"
                      onClick={handleGoogleDisconnect}
                      className="rounded-xl border border-red-500/30 bg-red-500/10 hover:bg-red-500/20 px-3.5 py-2 text-[10px] font-bold text-red-400 tracking-wider uppercase transition-all"
                    >
                      Disconnect Workspace
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    disabled={isLoggingIn}
                    onClick={handleGoogleConnect}
                    className="relative flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#10B981] to-[#059669] hover:from-[#34D399] hover:to-[#10B981] text-white px-4 py-2.5 text-xs font-bold tracking-wide uppercase transition-all shadow-lg shadow-emerald-950/30 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoggingIn ? (
                      <>
                        <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                        <span>Connecting...</span>
                      </>
                    ) : (
                      <>
                        <svg className="h-4 w-4 fill-current shrink-0" viewBox="0 0 24 24">
                          <path d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.113-6.887 4.113-4.716 0-8.58-3.77-8.58-8.514 0-4.743 3.864-8.514 8.58-8.514 2.242 0 4.113.8 5.561 2.143l3.225-3.225C18.667 1.486 15.68 0 12.24 0 5.867 0 0 5.37 0 12s5.867 12 12.24 12c6.205 0 12.24-4.22 12.24-12 0-.82-.077-1.605-.2-2.315H12.24z" />
                        </svg>
                        <span>Connect Google Workspace</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* INTERACTIVE WHATSAPP AUTO-RESPONDER PANEL WITH SIMULATOR */}
        {/* ======================================================== */}
        <div className="rounded-2xl bg-[#0D0D20] p-4 sm:p-6 border border-blue-500/35 space-y-5 shadow-xl premium-liquid-glass">
          <div className="flex items-center justify-between border-b border-blue-500/20 pb-3">
            <h2 className="text-sm font-bold text-[#F8FAFC] uppercase tracking-wider flex items-center gap-2">
              <Smartphone className="h-4 w-4 text-blue-400" />
              <span>WhatsApp Autonomous Auto-Responder</span>
            </h2>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={waEnabled} 
                onChange={(e) => setWaEnabled(e.target.checked)}
                className="sr-only peer" 
              />
              <div className="w-9 h-5 bg-[#080817] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-[#94A3B8] peer-checked:after:bg-blue-400 after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-950 border border-blue-500/20"></div>
              <span className="ml-2 text-[10px] font-bold text-[#94A3B8] uppercase">
                {waEnabled ? 'Active' : 'Disabled'}
              </span>
            </label>
          </div>

          <p className="text-[11px] text-[#94A3B8] leading-relaxed">
            When enabled, the Work OS agent monitors incoming WhatsApp Business API webhooks. If you don't manually respond to an incoming chat within your configured window, the agent automatically drafts and dispatches an contextually accurate reply in the matching client language.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
            <div className="rounded-xl bg-[#080817]/80 p-3.5 border border-blue-500/15">
              <span className="block text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider mb-2 flex items-center gap-1">
                <Clock className="h-3.5 w-3.5 text-blue-400" />
                Response Threshold
              </span>
              <div className="flex items-center gap-2">
                <input 
                  type="number" 
                  value={waDelay}
                  onChange={(e) => setWaDelay(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-16 rounded-lg bg-[#0D0D20] px-2.5 py-1.5 text-xs text-[#F8FAFC] border border-blue-500/20 focus:outline-none focus:border-blue-400 font-mono text-center"
                />
                <span className="text-xs text-[#F8FAFC] font-semibold">Minutes</span>
              </div>
              <span className="text-[9px] text-[#64748B] block mt-1.5">
                Recommended: 20 minutes to allow human response priority.
              </span>
            </div>

            <div className="rounded-xl bg-[#080817]/80 p-3.5 border border-blue-500/15">
              <span className="block text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider mb-2 flex items-center gap-1">
                <Globe className="h-3.5 w-3.5 text-blue-400" />
                Language Engine
              </span>
              <label className="flex items-center gap-2 cursor-pointer mt-1">
                <input 
                  type="checkbox" 
                  checked={waLanguageMatching}
                  onChange={(e) => setWaLanguageMatching(e.target.checked)}
                  className="h-4 w-4 rounded accent-blue-500"
                />
                <span className="text-xs text-[#F8FAFC] font-semibold">Dynamic Auto-Detect</span>
              </label>
              <span className="text-[9px] text-[#64748B] block mt-2">
                Replies directly in Bangla, English, German, or matching client tongue.
              </span>
            </div>

            <div className="rounded-xl bg-[#080817]/80 p-3.5 border border-blue-500/15">
              <span className="block text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider mb-2 flex items-center gap-1">
                <MessageSquare className="h-3.5 w-3.5 text-blue-400" />
                Brand Persona Tone
              </span>
              <select
                value={waTone}
                onChange={(e) => setWaTone(e.target.value as any)}
                className="w-full rounded-lg bg-[#0D0D20] px-2.5 py-1.5 text-xs text-[#F8FAFC] border border-blue-500/20 focus:outline-none"
              >
                <option value="friendly">Friendly &amp; Helpful</option>
                <option value="professional">Strictly Professional</option>
                <option value="casual">Casual &amp; Fast</option>
              </select>
              <span className="text-[9px] text-[#64748B] block mt-1.5">
                Adapts vocabulary to matched corporate standards.
              </span>
            </div>
          </div>

          {/* REAL-TIME INTERACTIVE SIMULATOR */}
          <div className="rounded-xl bg-[#080817]/50 p-4 border border-blue-500/20 space-y-3.5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-blue-500/10 pb-2.5">
              <div>
                <span className="text-xs font-bold text-[#F8FAFC] block flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-blue-400 animate-pulse" />
                  Live WhatsApp Flow Simulator
                </span>
                <span className="text-[10px] text-[#94A3B8]">
                  Test how the 20-minute waiting gate triggers dynamic language auto-replies.
                </span>
              </div>

              <div className="flex items-center gap-2">
                <select
                  value={simScenario}
                  onChange={(e) => setSimScenario(e.target.value as any)}
                  disabled={simStatus === 'waiting' || simStatus === 'generating'}
                  className="rounded-lg bg-[#0D0D20] px-2.5 py-1 text-xs text-[#F8FAFC] border border-blue-500/20 focus:outline-none font-medium"
                >
                  <option value="inquiry_bn">🇧🇩 Bangla Pricing Inquiry</option>
                  <option value="support_en">🇺🇸 English Support Ticket</option>
                  <option value="deal_de">🇩🇪 German Call Request</option>
                </select>

                <button
                  type="button"
                  onClick={runSimulation}
                  disabled={simStatus === 'waiting' || simStatus === 'generating' || !waEnabled}
                  className="flex items-center gap-1 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:opacity-50 px-3 py-1 text-xs font-bold text-white cursor-pointer transition-colors"
                >
                  <Play className="h-3.5 w-3.5" />
                  <span>Simulate</span>
                </button>
              </div>
            </div>

            {/* Simulation Log Window */}
            {simStatus !== 'idle' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3.5">
                {/* Left: Progression log */}
                <div className="rounded-lg bg-[#050512] p-3 border border-blue-500/15 font-mono text-[10px] space-y-1.5 max-h-48 overflow-y-auto">
                  <div className="flex items-center justify-between text-[#94A3B8] border-b border-blue-500/10 pb-1 mb-1.5 font-sans">
                    <span>TIMELINE LOGS</span>
                    <span className="text-[9px] font-mono text-blue-400">SPEEDED x100</span>
                  </div>
                  {simLog.map((log, i) => (
                    <div key={i} className={`leading-relaxed ${log.includes('🚨') ? 'text-amber-400 font-semibold' : log.includes('🚀') || log.includes('✨') ? 'text-[#00D9A5] font-semibold' : 'text-[#94A3B8]'}`}>
                      {log}
                    </div>
                  ))}
                  
                  {simStatus === 'waiting' && (
                    <div className="space-y-1.5 font-sans pt-1">
                      <div className="flex items-center justify-between text-[9px] text-[#64748B]">
                        <span>Waiting window elapsed ({waDelay}m gate):</span>
                        <span className="font-mono text-blue-400 font-bold">{simProgress}%</span>
                      </div>
                      <div className="w-full bg-[#080817] rounded-full h-1.5 overflow-hidden">
                        <div className="bg-gradient-to-r from-blue-600 to-cyan-400 h-1.5 transition-all duration-300" style={{ width: `${simProgress}%` }} />
                      </div>
                    </div>
                  )}

                  {simStatus === 'generating' && (
                    <div className="flex items-center gap-1.5 text-blue-400 font-sans font-bold animate-pulse py-1">
                      <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                      <span>Agent-alpha08 drafting response...</span>
                    </div>
                  )}
                </div>

                {/* Right: Output message bubble */}
                <div className="rounded-lg bg-[#050512] p-3 border border-blue-500/15 flex flex-col justify-between">
                  <div>
                    <div className="text-[9px] font-bold text-[#94A3B8] tracking-wider uppercase mb-1.5">
                      DISPATCHED OUTBOX RESPONSE
                    </div>
                    {simDraft ? (
                      <p className="text-xs text-[#F8FAFC] leading-relaxed bg-blue-950/20 p-2.5 rounded-xl border border-blue-500/10 whitespace-pre-wrap">
                        {simDraft}
                      </p>
                    ) : (
                      <div className="h-28 flex items-center justify-center text-[10px] text-[#64748B] italic">
                        Awaiting auto-response trigger...
                      </div>
                    )}
                  </div>

                  {simStatus === 'dispatched' && (
                    <div className="mt-2 text-[10px] font-sans font-bold text-[#00D9A5] bg-[#00D9A5]/10 border border-[#00D9A5]/30 rounded-lg p-1.5 text-center flex items-center justify-center gap-1">
                      <Check className="h-3.5 w-3.5" />
                      Auto-responder safely completed and message pushed to client device!
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Save Bar */}
        <div className="flex justify-end">
          <button
            type="submit"
            id="btn_save_settings"
            className="flex items-center gap-2 rounded-2xl btn-blue-purple px-6 py-2.5 text-xs font-bold text-white transition-all cursor-pointer"
          >
            <Save className="h-4 w-4" />
            <span>{t.saveSettingsBtn}</span>
          </button>
        </div>

        {/* Data & Memory Management */}
        <div className="rounded-2xl bg-[#0D0D20] p-4 sm:p-6 border border-rose-500/30 space-y-4 shadow-xl">
          <h2 className="text-sm font-bold text-rose-300 uppercase tracking-wider flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-rose-400" />
            <span>{t.workspaceDataSectionTitle}</span>
          </h2>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={handleExportWorkspace}
              className="flex items-center justify-center gap-1.5 rounded-xl bg-[#080817] px-4 py-2.5 text-xs font-semibold text-[#F8FAFC] border border-[rgba(139,92,246,0.25)] hover:bg-[#12122b] transition-colors"
            >
              <Download className="h-4 w-4" />
              <span>{t.exportBackupBtn}</span>
            </button>

            <button
              type="button"
              onClick={handleResetMemory}
              className="flex items-center justify-center gap-1.5 rounded-xl bg-rose-500/15 px-4 py-2.5 text-xs font-semibold text-rose-300 border border-rose-500/40 hover:bg-rose-500/25 transition-colors"
            >
              <RefreshCw className="h-4 w-4" />
              <span>{t.resetMemoryBtn}</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
