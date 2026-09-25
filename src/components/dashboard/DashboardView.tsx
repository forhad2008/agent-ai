import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  Zap,
  CheckCircle2,
  LayoutGrid,
  MessageSquare,
  CheckSquare,
  ShieldCheck,
  Settings,
  ChevronRight,
  Bell,
  Plus,
  Trash2,
  Clock,
  Cpu,
  Play,
  Users,
  Terminal,
  Layers,
  AlertTriangle,
} from 'lucide-react';
import { useAgent } from '../../context/AgentContext';
import { CosmicPlanetArt, CosmicWavesArt, RadarOrbIcon } from '../common/CosmicGraphics';
import { ContextStoreAnalyticsChart } from './ContextStoreAnalyticsChart';
import { sound } from '../../services/sound';

export const DashboardView: React.FC = () => {
  const {
    tasks,
    approvals,
    setActiveView,
    currentLanguage,
    setIsLanguageModalOpen,
    userProfile,
    alarms,
    addAlarm,
    toggleAlarm,
    deleteAlarm,
  } = useAgent();

  const [newAlarmTime, setNewAlarmTime] = useState('');
  const [newAlarmLabel, setNewAlarmLabel] = useState('');
  const [showQuickAlarmInput, setShowQuickAlarmInput] = useState(false);

  // CrewAI Pre-set Multi-Agent Templates
  const CREWAI_TEMPLATES = [
    {
      id: 'seo_crew',
      name: 'SEO & Content Optimizers',
      agents: ['🔍 SEO Specialist', '🌐 Web Scraper', '✍️ Copywriter'],
      description: 'Audits website URLs, crawls page structure, and generates high-converting content recommendations.',
      kickoffPrompt: 'Analyze the SEO of abdullah-services.com and write custom landing page recommendations.',
      steps: [
        { agent: 'SEO Specialist', message: 'Scanning abdullah-services.com... Core Web Vitals score evaluated: 94/100.', delay: 1200 },
        { agent: 'Web Scraper', message: 'Extracting heading hierarchies, anchor link depth, and missing open graph tags...', delay: 2800 },
        { agent: 'Copywriter', message: 'Synthesizing high-converting copy targeting "Autonomous Workflow AI" and "Enterprise Agent".', delay: 4500 },
        { agent: 'System Engine', message: 'Workflow Complete! Custom markdown report "website-seo-audit.md" saved to local workspace.', delay: 6000 }
      ]
    },
    {
      id: 'support_crew',
      name: 'Customer Success Crew',
      agents: ['🤝 Support Lead', '📊 Sentiment Analyst', '🛡️ Quality Gatekeeper'],
      description: 'Scans user feedback, categorizes satisfaction ratings, and drafts standard auto-approved email responses.',
      kickoffPrompt: 'Identify dissatisfied clients in feedback log and draft prioritized refund/apology replies.',
      steps: [
        { agent: 'Sentiment Analyst', message: 'Processing feedback rows... Identified Customer ID CUST-103 Tanvir Hasan (Rating: 3.2).', delay: 1200 },
        { agent: 'Support Lead', message: 'Drafting highly empathetic, tailored apology email and offering courtesy credit refund...', delay: 2800 },
        { agent: 'Quality Gatekeeper', message: 'Verifying response format... Passed compliance constraints. Triggering human approval check.', delay: 4500 },
        { agent: 'System Engine', message: 'Success! New verification request "Send Customer Reply" added to your Approvals panel.', delay: 6000 }
      ]
    },
    {
      id: 'dev_crew',
      name: 'Full-Stack Engineering Crew',
      agents: ['💻 Lead Architect', '🕵️ Security Analyst', '🧪 QA Test Engineer'],
      description: 'Performs static AST code audits, alerts on race conditions/unhandled failures, and structures Jest test suites.',
      kickoffPrompt: 'Audit workspace file order-processing.js for safety and write mock unit tests.',
      steps: [
        { agent: 'Security Analyst', message: 'Inspecting order-processing.js... Flagged missing try-catch block & unhandled inventory rejections.', delay: 1200 },
        { agent: 'Lead Architect', message: 'Creating transaction rollback logic and validating customer emails with strict regex rules.', delay: 2800 },
        { agent: 'QA Test Engineer', message: 'Synthesizing 4 Jest unit test assertions covering successful checkouts and rollback fallbacks...', delay: 4500 },
        { agent: 'System Engine', message: 'Audit complete! Re-routing refactored code and unit testing files to the local file explorer.', delay: 6000 }
      ]
    }
  ];

  const [activeSim, setActiveSim] = useState<typeof CREWAI_TEMPLATES[0] | null>(null);
  const [isSimRunning, setIsSimRunning] = useState(false);
  const [simStep, setSimStep] = useState(-1);
  const [simLogs, setSimLogs] = useState<{ id: string; agent: string; text: string; time: string; status: 'pending' | 'running' | 'success' }[]>([]);

  const handleLaunchSim = (template: typeof CREWAI_TEMPLATES[0]) => {
    setActiveSim(template);
    setSimStep(0);
    setIsSimRunning(true);
    sound.playReceiveSound();
    
    // Set initial system log
    const initialLog = {
      id: `log_0`,
      agent: 'System Kickoff',
      text: `Initializing Multi-Agent Crew: "${template.name}"... Routing prompt: "${template.kickoffPrompt}"`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      status: 'success' as const
    };
    setSimLogs([initialLog]);

    // Program step timers
    template.steps.forEach((step, idx) => {
      setTimeout(() => {
        setSimStep(prevStep => {
          const nextStep = prevStep + 1;
          
          // Generate new log entries
          const newLog = {
            id: `log_${idx + 1}`,
            agent: step.agent,
            text: step.message,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
            status: idx === template.steps.length - 1 ? 'success' as const : 'running' as const
          };

          setSimLogs(prevLogs => {
            const updatedPrev = prevLogs.map(l => ({ ...l, status: 'success' as const }));
            return [...updatedPrev, newLog];
          });

          // Play synthesis swoosh sound
          sound.playSendSound();

          if (idx === template.steps.length - 1) {
            setIsSimRunning(false);
          }

          return nextStep;
        });
      }, step.delay);
    });
  };

  const handleCreateAlarm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAlarmTime) return;

    // Convert e.g. "16:00" to localized string & set accurate scheduled timestamp
    const [hrsStr, minsStr] = newAlarmTime.split(':');
    const hrs = parseInt(hrsStr);
    const mins = parseInt(minsStr);

    const targetDate = new Date();
    targetDate.setHours(hrs, mins, 0, 0);
    if (targetDate.getTime() < Date.now()) {
      targetDate.setDate(targetDate.getDate() + 1);
    }

    const isBangla = currentLanguage.id === 'bn';
    const ampm = hrs >= 12 ? 'PM' : 'AM';
    const displayHrs = hrs % 12 || 12;
    const formattedTimeStr = `${displayHrs}:${mins.toString().padStart(2, '0')} ${ampm}`;

    const label = newAlarmLabel.trim() || (isBangla ? 'আমার কাস্টম অ্যালার্ম' : 'My Custom Alarm');
    addAlarm(formattedTimeStr, label, targetDate.getTime());

    // Reset fields
    setNewAlarmTime('');
    setNewAlarmLabel('');
    setShowQuickAlarmInput(false);
  };

  const addQuickTestAlarm = (seconds: number) => {
    const isBangla = currentLanguage.id === 'bn';
    const targetTs = Date.now() + seconds * 1000;
    const targetDate = new Date(targetTs);
    const timeStr = targetDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const label = isBangla ? `${seconds} সেকেন্ডের ইনস্ট্যান্ট টেস্ট অ্যালার্ম` : `${seconds}s Instant Test Alarm`;
    addAlarm(timeStr, label, targetTs);
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return 'Good morning,';
    if (hour >= 12 && hour < 17) return 'Good afternoon,';
    if (hour >= 17 && hour < 22) return 'Good evening,';
    return 'Good night,';
  };

  const getTimeIcon = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 17) return '☀️';
    if (hour >= 17 && hour < 20) return '🌅';
    return '🌙';
  };

  const activeTasks = tasks.filter((t) => t.status === 'Running' || t.status === 'Waiting for Approval');
  const completedTasks = tasks.filter((t) => t.status === 'Completed');
  const pendingApprovals = approvals.filter((a) => a.status === 'pending');

  return (
    <div
      id="dashboard_view"
      className="flex-1 overflow-y-auto p-2.5 xs:p-3.5 sm:p-6 lg:p-8 space-y-3.5 sm:space-y-6 max-w-6xl mx-auto w-full animate-fadeIn"
    >
      {/* ======================================================== */}
      {/* 1. TOP HERO CARD (Cosmic Planet + Status + Chat CTA)     */}
      {/* ======================================================== */}
      <div
        id="hero_agent_card"
        className="
          relative
          overflow-hidden
          rounded-2xl
          sm:rounded-3xl
          p-4
          xs:p-5
          sm:p-7
          lg:p-9
          premium-liquid-glass
          premium-liquid-glass-hover
        "
      >
        {/* Futuristic Cybernetic Grid Background Layer */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:28px_28px] opacity-80" />

        {/* Laser Glow Lines at Top and Bottom Edges */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#E879F9]/80 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#00D9A5]/60 to-transparent" />

        {/* Ambient Pulsing Spotlights */}
        <div className="pointer-events-none absolute -bottom-10 left-1/4 h-52 sm:h-64 w-52 sm:w-64 rounded-full bg-[#00D9A5]/12 blur-3xl animate-pulse" />
        <div className="absolute top-0 right-1/4 h-52 sm:h-64 w-52 sm:w-64 rounded-full bg-[#9333EA]/25 blur-3xl pointer-events-none" />

        {/* User uploaded bg2.png image spanning full width with subtle balanced dark effect */}
        <div className="absolute inset-0 w-full h-full pointer-events-none select-none z-0 overflow-hidden rounded-2xl sm:rounded-3xl">
          <img
            src={`${import.meta.env.BASE_URL}bg2.png`}
            alt="Hero Background Artwork"
            className="w-full h-full object-cover object-right opacity-88"
            style={{ filter: 'brightness(0.75) contrast(108%)' }}
            onError={(e) => {
              // Fallback to relative path if BASE_URL differs
              (e.target as HTMLImageElement).src = './bg2.png';
            }}
          />
          {/* Subtle light-dark gradient overlay for balanced readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#03020A]/40 via-[#03020A]/15 to-[#03020A]/20 pointer-events-none" />
        </div>

        {/* Content Box (Z-10 to stay above cosmic planet) */}
        <div className="relative z-10 flex flex-col space-y-3.5 sm:space-y-5 max-w-xl">
          {/* Small Heading: ● PERSONAL AI AGENT OS */}
          <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
            <span className="h-2 w-2 rounded-full bg-[#00D9A5] shadow-[0_0_10px_#00D9A5] animate-pulse" />
            <span className="text-[10px] xs:text-[11px] sm:text-xs font-black uppercase tracking-widest text-[#00D9A5] drop-shadow-[0_0_8px_rgba(0,217,165,0.4)]">
              PERSONAL AI AGENT OS
            </span>
          </div>

          {/* Below: US United States Mode pill */}
          <div className="flex items-center">
            <button
              id="btn_hero_country_mode"
              onClick={() => setIsLanguageModalOpen(true)}
              className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full glass-button px-2.5 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs font-medium text-[#C084FC] transition-all group"
              title="Click to switch country language mode"
            >
              <span className="rounded bg-[#7C3AED]/25 px-1 sm:px-1.5 py-0.5 text-[9px] sm:text-[10px] font-bold text-[#C084FC] font-mono border border-white/10">
                {currentLanguage.id === 'en' ? 'US' : currentLanguage.id.toUpperCase()}
              </span>
              <span className="text-[#F8FAFC] group-hover:text-[#C084FC] transition-colors">
                {currentLanguage.id === 'en' ? 'United States Mode' : `${currentLanguage.country} Mode`}
              </span>
              <ChevronRight className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-[#A855F7] group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Main Greeting: "Good evening, Abdullah" (Abdullah in purple gradient) */}
          <div className="space-y-0.5">
            <h1 className="flex items-center gap-2 text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#F8FAFC] leading-tight">
              <span>{getGreeting()}</span>
              <span className="text-xl sm:text-3xl animate-bounce-subtle">{getTimeIcon()}</span>
            </h1>
            <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#C084FC] via-[#A855F7] to-[#7C3AED] drop-shadow-[0_0_20px_rgba(192,132,252,0.3)]">
              {userProfile.name || 'User'}
            </h2>
          </div>

          {/* Subtitle description */}
          <p className="text-[11px] xs:text-xs sm:text-sm text-[#94A3B8] leading-relaxed max-w-lg">
            Your personal AI agent is armed and ready. Provide natural instructions to read customer
            messages, audit data, research topics, debug code, and orchestrate verified outcomes.
          </p>

          {/* Agent Status Card + Ready to assist container */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 sm:gap-3 pt-1">
            {/* Left box: AGENT STATUS */}
            <div className="flex items-center gap-2.5 sm:gap-3.5 rounded-xl sm:rounded-2xl transparent-light-glass p-2.5 sm:p-3.5">
              <div className="shrink-0 animate-orb-glow">
                <RadarOrbIcon className="h-8 w-8 xs:h-9 xs:w-9 sm:h-11 sm:w-11" />
              </div>
              <div className="min-w-0">
                <span className="block text-[9px] sm:text-[10px] font-mono font-bold tracking-widest text-[#A5B4FC] uppercase">
                  AGENT STATUS
                </span>
                <span className="text-[11px] xs:text-xs sm:text-sm font-bold text-[#00E5A3] flex items-center gap-1.5 mt-0.5">
                  <span className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-[#00E5A3] shadow-[0_0_8px_#00E5A3]" />
                  Agent Ready &amp; Active
                </span>
                <span className="text-[10px] sm:text-[11px] text-[#94A3B8] font-mono block truncate mt-0.5">
                  Model: Gemini 3.8 Flash
                </span>
              </div>
            </div>

            {/* Right card: Ready to assist */}
            <div
              onClick={() => setActiveView('chat')}
              className="cursor-pointer flex items-center justify-between rounded-xl sm:rounded-2xl transparent-light-glass p-2.5 sm:p-3.5 group"
            >
              <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
                <div className="flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-lg sm:rounded-xl bg-gradient-to-tr from-[#2563EB]/30 to-[#7E17F8]/30 text-[#C084FC] border border-white/20">
                  <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#C084FC] group-hover:scale-110 transition-transform" />
                </div>
                <span className="text-[11px] xs:text-xs font-semibold text-[#F8FAFC] leading-snug truncate">
                  Ready to assist<br />your next task
                </span>
              </div>
              <div className="flex h-6 w-6 sm:h-7 sm:w-7 shrink-0 items-center justify-center rounded-full glass-button text-[#C084FC] group-hover:bg-[#7E17F8] group-hover:text-white transition-colors ml-1">
                <ArrowRight className="h-3 w-3 sm:h-3.5 sm:w-3.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          </div>

          {/* Full-width Wide Action Button: Open AI Chat → */}
          <button
            id="hero_open_chat_cta_btn"
            onClick={() => setActiveView('chat')}
            className="w-full flex items-center justify-center gap-2 sm:gap-2.5 rounded-xl sm:rounded-2xl transparent-light-glass text-[#F8FAFC] font-bold py-2.5 xs:py-3 sm:py-4 px-4 sm:px-6 text-xs xs:text-sm sm:text-base group mt-1"
          >
            <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#C084FC] group-hover:scale-110 transition-transform" />
            <span>Open AI Chat</span>
            <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#C084FC] group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 2. TWO METRIC CARDS (Active Tasks + Completed Tasks)      */}
      {/* 2-column grid on all screens                            */}
      {/* ======================================================== */}
      <div className="grid grid-cols-2 gap-2.5 xs:gap-3.5 sm:gap-5">
        {/* Left: ACTIVE TASKS */}
        <div
          id="card_metric_active_tasks"
          onClick={() => setActiveView('tasks')}
          className="cursor-pointer rounded-xl sm:rounded-3xl transparent-light-glass p-3 sm:p-5 group"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 sm:gap-3 min-w-0">
              <div className="flex h-7 w-7 xs:h-8 xs:w-8 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-full bg-[#4C1D95]/40 text-[#C084FC] border border-[#7C3AED]/40 shadow-inner">
                <Zap className="h-3.5 w-3.5 sm:h-5 sm:w-5 fill-[#A855F7]/20 text-[#C084FC]" />
              </div>
              <span className="text-[9px] xs:text-[10px] sm:text-xs font-bold tracking-wider uppercase text-[#94A3B8] truncate">
                ACTIVE TASKS
              </span>
            </div>

            <div className="flex h-6 w-6 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-full glass-button text-[#94A3B8] group-hover:text-white group-hover:bg-[#7C3AED] transition-colors ml-1">
              <ArrowRight className="h-3 w-3 sm:h-3.5 sm:w-3.5 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>

          <div className="mt-2 sm:mt-4 flex items-baseline gap-1.5 sm:gap-2">
            <span className="text-xl xs:text-2xl sm:text-4xl font-extrabold text-[#F8FAFC] font-mono">
              {activeTasks.length}
            </span>
            <span className="text-[10px] xs:text-xs sm:text-sm text-[#94A3B8] font-medium">in execution</span>
          </div>

          {/* Glowing Purple Progress Bar */}
          <div className="mt-2 sm:mt-4 h-1.5 sm:h-2 w-full rounded-full bg-white/5 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#7C3AED] to-[#C084FC] shadow-[0_0_12px_rgba(168,85,247,0.8)] transition-all duration-700"
              style={{ width: activeTasks.length > 0 ? '48%' : '12%' }}
            />
          </div>
        </div>

        {/* Right: COMPLETED TASKS */}
        <div
          id="card_metric_completed_tasks"
          onClick={() => setActiveView('tasks')}
          className="cursor-pointer rounded-xl sm:rounded-3xl transparent-light-glass p-3 sm:p-5 group"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 sm:gap-3 min-w-0">
              <div className="flex h-7 w-7 xs:h-8 xs:w-8 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-full bg-[#00D9A5]/10 text-[#00D9A5] border border-[#00D9A5]/40 shadow-inner">
                <CheckCircle2 className="h-3.5 w-3.5 sm:h-5 sm:w-5 text-[#00D9A5]" />
              </div>
              <span className="text-[9px] xs:text-[10px] sm:text-xs font-bold tracking-wider uppercase text-[#94A3B8] truncate">
                COMPLETED TASKS
              </span>
            </div>

            <div className="flex h-6 w-6 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-full glass-button text-[#94A3B8] group-hover:text-white group-hover:bg-[#00D9A5] group-hover:text-slate-950 transition-colors ml-1">
              <ArrowRight className="h-3 w-3 sm:h-3.5 sm:w-3.5 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>

          <div className="mt-2 sm:mt-4 flex items-baseline gap-1.5 sm:gap-2">
            <span className="text-xl xs:text-2xl sm:text-4xl font-extrabold text-[#F8FAFC] font-mono">
              {completedTasks.length}
            </span>
            <span className="text-[10px] xs:text-xs sm:text-sm text-[#94A3B8] font-medium">verified</span>
          </div>

          {/* Glowing Cyan/Green Progress Bar */}
          <div className="mt-2 sm:mt-4 h-1.5 sm:h-2 w-full rounded-full bg-white/5 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#00D9A5] to-[#34D399] shadow-[0_0_12px_rgba(0,217,165,0.8)] transition-all duration-700"
              style={{ width: completedTasks.length > 0 ? '60%' : '12%' }}
            />
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 3. QUICK ACTIONS SECTION (4 Interactive Cards)           */}
      {/* 2-column on mobile, 4-column on desktop                  */}
      {/* ======================================================== */}
      <div
        id="section_quick_actions"
        className="rounded-2xl sm:rounded-3xl transparent-light-glass p-3.5 sm:p-6 space-y-3 sm:space-y-4"
      >
        {/* Section Header */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-lg sm:rounded-xl bg-gradient-to-tr from-[#2563EB]/30 to-[#7E17F8]/30 text-[#C084FC] border border-[#3B82F6]/30">
            <LayoutGrid className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#C084FC]" />
          </div>
          <div>
            <h3 className="text-sm sm:text-lg font-bold text-[#F8FAFC] tracking-tight">
              Quick Actions
            </h3>
            <p className="text-[11px] sm:text-xs text-[#94A3B8]">
              Access your most important tools
            </p>
          </div>
        </div>

        {/* 4 Cards Grid: 2-col on mobile, 4-col on desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
          {/* Card 1: AI Chat */}
          <div
            id="qa_card_chat"
            onClick={() => setActiveView('chat')}
            className="cursor-pointer flex flex-col justify-between rounded-xl sm:rounded-2xl blue-purple-glass-card p-2.5 xs:p-3 sm:p-4 group min-h-[115px] sm:min-h-[145px]"
          >
            <div>
              <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg sm:rounded-xl bg-gradient-to-tr from-[#2563EB]/30 to-[#7E17F8]/30 text-[#C084FC] border border-[#3B82F6]/30 mb-2 sm:mb-3 group-hover:scale-105 transition-transform">
                <MessageSquare className="h-3.5 w-3.5 sm:h-5 sm:w-5 text-[#C084FC]" />
              </div>
              <h4 className="text-xs sm:text-sm font-bold text-[#F8FAFC] group-hover:text-[#C084FC] transition-colors">
                AI Chat
              </h4>
              <p className="text-[10px] sm:text-xs text-[#94A3B8] mt-0.5 leading-snug line-clamp-2">
                Ask anything, get real results
              </p>
            </div>
            <div className="flex justify-end pt-1.5 sm:pt-3">
              <div className="flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-full glass-button text-[#C084FC] group-hover:bg-[#7E17F8] group-hover:text-white transition-colors">
                <ArrowRight className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
              </div>
            </div>
          </div>

          {/* Card 2: Tasks */}
          <div
            id="qa_card_tasks"
            onClick={() => setActiveView('tasks')}
            className="cursor-pointer flex flex-col justify-between rounded-xl sm:rounded-2xl blue-purple-glass-card p-2.5 xs:p-3 sm:p-4 group min-h-[115px] sm:min-h-[145px]"
          >
            <div>
              <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg sm:rounded-xl bg-gradient-to-tr from-[#2563EB]/30 to-[#7E17F8]/30 text-[#C084FC] border border-[#3B82F6]/30 mb-2 sm:mb-3 group-hover:scale-105 transition-transform">
                <CheckSquare className="h-3.5 w-3.5 sm:h-5 sm:w-5 text-[#C084FC]" />
              </div>
              <h4 className="text-xs sm:text-sm font-bold text-[#F8FAFC] group-hover:text-[#C084FC] transition-colors">
                Tasks
              </h4>
              <p className="text-[10px] sm:text-xs text-[#94A3B8] mt-0.5 leading-snug line-clamp-2">
                Manage &amp; track your work
              </p>
            </div>
            <div className="flex justify-end pt-1.5 sm:pt-3">
              <div className="flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-full glass-button text-[#C084FC] group-hover:bg-[#7E17F8] group-hover:text-white transition-colors">
                <ArrowRight className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
              </div>
            </div>
          </div>

          {/* Card 3: Approvals (with Orange "1" badge) */}
          <div
            id="qa_card_approvals"
            onClick={() => setActiveView('approvals')}
            className="cursor-pointer flex flex-col justify-between rounded-xl sm:rounded-2xl blue-purple-glass-card p-2.5 xs:p-3 sm:p-4 group min-h-[115px] sm:min-h-[145px]"
          >
            <div>
              <div className="relative inline-block mb-2 sm:mb-3">
                <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg sm:rounded-xl bg-gradient-to-tr from-[#2563EB]/30 to-[#7E17F8]/30 text-[#C084FC] border border-[#3B82F6]/30 group-hover:scale-105 transition-transform">
                  <ShieldCheck className="h-3.5 w-3.5 sm:h-5 sm:w-5 text-[#C084FC]" />
                </div>
                {/* Orange Badge "1" */}
                {pendingApprovals.length > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-3.5 min-w-[14px] sm:h-4 sm:min-w-[16px] items-center justify-center rounded-full bg-[#F59E0B] px-1 text-[8px] sm:text-[9px] font-bold text-slate-950 font-mono shadow-md">
                    {pendingApprovals.length}
                  </span>
                )}
              </div>
              <h4 className="text-xs sm:text-sm font-bold text-[#F8FAFC] group-hover:text-[#C084FC] transition-colors">
                Approvals
              </h4>
              <p className="text-[10px] sm:text-xs text-[#94A3B8] mt-0.5 leading-snug line-clamp-2">
                Review and confirm actions
              </p>
            </div>
            <div className="flex justify-end pt-1.5 sm:pt-3">
              <div className="flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-full glass-button text-[#C084FC] group-hover:bg-[#7E17F8] group-hover:text-white transition-colors">
                <ArrowRight className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
              </div>
            </div>
          </div>

          {/* Card 4: Settings */}
          <div
            id="qa_card_settings"
            onClick={() => setActiveView('settings')}
            className="cursor-pointer flex flex-col justify-between rounded-xl sm:rounded-2xl blue-purple-glass-card p-2.5 xs:p-3 sm:p-4 group min-h-[115px] sm:min-h-[145px]"
          >
            <div>
              <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg sm:rounded-xl bg-gradient-to-tr from-[#2563EB]/30 to-[#7E17F8]/30 text-[#C084FC] border border-[#3B82F6]/30 mb-2 sm:mb-3 group-hover:scale-105 transition-transform">
                <Settings className="h-3.5 w-3.5 sm:h-5 sm:w-5 text-[#C084FC]" />
              </div>
              <h4 className="text-xs sm:text-sm font-bold text-[#F8FAFC] group-hover:text-[#C084FC] transition-colors">
                Settings
              </h4>
              <p className="text-[10px] sm:text-xs text-[#94A3B8] mt-0.5 leading-snug line-clamp-2">
                Customize your experience
              </p>
            </div>
            <div className="flex justify-end pt-1.5 sm:pt-3">
              <div className="flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-full glass-button text-[#C084FC] group-hover:bg-[#7E17F8] group-hover:text-white transition-colors">
                <ArrowRight className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* CREWAI MULTI-AGENT WORKFLOW SIMULATION HUB               */}
      {/* ======================================================== */}
      <div
        id="crew_agent_simulation_hub"
        className="rounded-2xl sm:rounded-3xl p-4 sm:p-6 space-y-5 shadow-2xl relative overflow-hidden border border-[rgba(139,92,246,0.3)] bg-gradient-to-br from-[#070518] via-[#090822] to-[#030619]"
      >
        {/* Background glow animations */}
        <div className="absolute top-0 right-1/4 h-32 w-32 bg-purple-600/10 rounded-full blur-3xl pointer-events-none animate-pulse" />
        <div className="absolute -bottom-10 left-10 h-32 w-32 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-[rgba(139,92,246,0.18)] pb-3 relative z-10 gap-3">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-lg sm:rounded-xl bg-gradient-to-tr from-purple-600/30 to-blue-600/30 text-purple-300 border border-purple-500/30">
              <Layers className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-purple-400" />
            </div>
            <div>
              <h3 className="text-sm sm:text-lg font-bold text-[#F8FAFC] tracking-tight flex items-center gap-1.5">
                <span>CrewAI Multi-Agent Simulation Hub</span>
                <span className="text-[10px] bg-purple-500/15 text-purple-300 border border-purple-500/30 rounded px-1.5 py-0.5 font-bold uppercase tracking-wide">
                  Local Simulator
                </span>
              </h3>
              <p className="text-[11px] sm:text-xs text-[#94A3B8]">
                Kick off simulated multi-agent team workflows to experience autonomous delegation in real-time
              </p>
            </div>
          </div>
          {activeSim && (
            <button
              onClick={() => {
                setActiveSim(null);
                setIsSimRunning(false);
              }}
              className="text-xs text-purple-400 hover:text-purple-300 underline font-semibold transition-colors cursor-pointer text-left"
            >
              ← Back to Templates
            </button>
          )}
        </div>

        {activeSim ? (
          /* ACTIVE SIMULATION INTERACTIVE DISPLAY */
          <div className="space-y-4 animate-fadeIn relative z-10">
            <div className="p-4 rounded-2xl bg-[#03020A]/90 border border-purple-500/20 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-purple-500 animate-ping" />
                  <h4 className="text-sm font-extrabold text-[#F8FAFC]">{activeSim.name}</h4>
                </div>
                <div className="text-[10px] font-mono text-purple-400 bg-purple-950/40 border border-purple-500/30 px-2 py-0.5 rounded-full font-bold">
                  {isSimRunning ? 'RUNNING AUTOMATION' : 'SIMULATION COMPLETED'}
                </div>
              </div>

              <div className="text-xs text-[#94A3B8] bg-[#050512] rounded-xl p-3 font-mono border border-white/5 space-y-1">
                <span className="text-purple-400 font-bold">Prompt:</span> {activeSim.kickoffPrompt}
              </div>

              {/* Progress Bar */}
              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-purple-600 to-blue-500 transition-all duration-500 rounded-full" 
                  style={{ width: `${((simStep + 1) / (activeSim.steps.length + 1)) * 100}%` }}
                />
              </div>
            </div>

            {/* Simulated Live Console logs */}
            <div className="rounded-2xl border border-[rgba(139,92,246,0.2)] bg-[#03020a] p-4 font-mono text-xs overflow-hidden h-64 flex flex-col justify-between">
              <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-3">
                <span className="text-[10px] font-bold text-[#64748B] tracking-wider uppercase flex items-center gap-1">
                  <Terminal className="h-3 w-3" />
                  Agent Execution Pipeline Logs
                </span>
                <span className="text-[10px] font-bold text-purple-400">
                  {simLogs.length} active logs
                </span>
              </div>

              <div className="flex-1 overflow-y-auto space-y-3.5 pr-2 custom-scrollbar">
                {simLogs.map((log, index) => (
                  <div key={log.id} className="space-y-1 animate-slideUp">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-slate-500 font-bold">{log.time}</span>
                      <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/25">
                        {log.agent}
                      </span>
                      {log.status === 'running' && (
                        <span className="h-1.5 w-1.5 rounded-full bg-blue-400 animate-ping" />
                      )}
                      {log.status === 'success' && (
                        <CheckCircle2 className="h-3 w-3 text-green-400" />
                      )}
                    </div>
                    <p className="text-[#E2E8F0] pl-1 font-mono leading-relaxed">{log.text}</p>
                  </div>
                ))}
              </div>

              {!isSimRunning && (
                <div className="mt-3 pt-2.5 border-t border-white/5 flex flex-col sm:flex-row gap-3 items-center justify-between">
                  <span className="text-[11px] text-[#00D9A5] flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-[#00D9A5] animate-pulse" />
                    Outputs synchronized with system files & alerts!
                  </span>
                  <div className="flex gap-2 w-full sm:w-auto">
                    <button
                      onClick={() => handleLaunchSim(activeSim)}
                      className="flex-1 sm:flex-initial rounded-xl bg-purple-950/40 hover:bg-purple-900/30 text-purple-300 border border-purple-500/25 px-4 py-2 font-bold text-xs transform active:scale-95 transition-all cursor-pointer"
                    >
                      Re-run Simulation
                    </button>
                    <button
                      onClick={() => {
                        setActiveSim(null);
                        setActiveView('chat');
                      }}
                      className="flex-1 sm:flex-initial rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white px-4 py-2 font-bold text-xs shadow-lg shadow-purple-950/20 transform active:scale-95 transition-all cursor-pointer"
                    >
                      Analyze in AI Chat
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* LIST TEMPLATES CARDS */
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative z-10 animate-fadeIn">
            {CREWAI_TEMPLATES.map((tpl) => (
              <div
                key={tpl.id}
                className="rounded-2xl border border-purple-500/15 hover:border-purple-500/40 bg-[#080817]/60 p-4 flex flex-col justify-between space-y-4 hover:shadow-xl hover:shadow-purple-950/10 transition-all group"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
                      <Cpu className="h-4 w-4" />
                    </div>
                    <h4 className="text-xs sm:text-sm font-extrabold text-[#F8FAFC] group-hover:text-purple-300 transition-colors">
                      {tpl.name}
                    </h4>
                  </div>

                  <p className="text-[11px] text-[#94A3B8] leading-relaxed line-clamp-3">
                    {tpl.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {tpl.agents.map((ag) => (
                      <span
                        key={ag}
                        className="text-[9px] font-black text-[#A78BFA] bg-purple-500/5 px-2 py-0.5 rounded-full border border-purple-500/10"
                      >
                        {ag}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleLaunchSim(tpl)}
                  className="w-full flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-purple-600/20 to-blue-600/20 hover:from-purple-600/30 hover:to-blue-600/30 text-purple-300 hover:text-white border border-purple-500/25 py-2 text-xs font-black transition-all transform active:scale-95 cursor-pointer"
                >
                  <Play className="h-3 w-3 fill-current" />
                  <span>Launch Simulation</span>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ======================================================== */}
      {/* REAL-TIME ALARMS & REMINDERS SCHEDULER WIDGET (PURPLE & BLUE GRADIENT SYSTEM) */}
      {/* ======================================================== */}
      <div 
        id="section_alarms_scheduler"
        className="rounded-2xl sm:rounded-3xl p-4 sm:p-6 space-y-4 shadow-2xl relative overflow-hidden border border-purple-500/30 bg-gradient-to-br from-[#09071b] via-[#090924] to-[#04081c]"
      >
        {/* Decorative background gradient glow */}
        <div className="absolute top-0 right-0 h-40 w-40 bg-gradient-to-br from-purple-600/10 to-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-center justify-between border-b border-[rgba(139,92,246,0.18)] pb-3 relative z-10">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-lg sm:rounded-xl bg-gradient-to-tr from-purple-600/30 to-blue-600/30 text-purple-300 border border-purple-500/30">
              <Bell className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-purple-400" />
            </div>
            <div>
              <h3 className="text-sm sm:text-lg font-bold text-[#F8FAFC] tracking-tight">
                Alarms &amp; Active Reminders
              </h3>
              <p className="text-[11px] sm:text-xs text-[#94A3B8]">
                Real-time synchronized device alerts and scheduled timers
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowQuickAlarmInput(!showQuickAlarmInput)}
            className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 px-3.5 py-1.5 text-xs font-bold text-white border border-purple-400/30 shadow-lg shadow-purple-950/20 transition-all transform active:scale-95 cursor-pointer"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>New Alarm</span>
          </button>
        </div>

        {/* Quick Instant Testing presets */}
        <div className="flex flex-wrap items-center gap-2 rounded-xl bg-[#080817]/80 p-2.5 border border-purple-500/15 relative z-10">
          <span className="text-[10px] font-bold text-[#A78BFA] uppercase tracking-wider mr-1.5 flex items-center gap-1">
            <Clock className="h-3.5 w-3.5 text-purple-400 animate-pulse" />
            Instant Liveness Tests:
          </span>
          <button
            type="button"
            onClick={() => addQuickTestAlarm(5)}
            className="rounded-lg bg-gradient-to-r from-purple-600/20 to-blue-600/20 hover:from-purple-600/30 hover:to-blue-600/30 px-3 py-1 text-[10px] font-black text-purple-300 border border-purple-500/25 transition-all transform active:scale-95"
          >
            ⚡ Test in 5 Secs
          </button>
          <button
            type="button"
            onClick={() => addQuickTestAlarm(10)}
            className="rounded-lg bg-gradient-to-r from-purple-600/20 to-blue-600/20 hover:from-purple-600/30 hover:to-blue-600/30 px-3 py-1 text-[10px] font-black text-blue-300 border border-blue-500/25 transition-all transform active:scale-95"
          >
            ⚡ Test in 10 Secs
          </button>
          <span className="text-[10px] text-[#94A3B8]/80 italic hidden md:inline ml-auto">
            (Add a test alarm, wait for the chime and popup alert!)
          </span>
        </div>

        {/* New Alarm Form Input overlay */}
        {showQuickAlarmInput && (
          <form onSubmit={handleCreateAlarm} className="bg-[#050512]/90 rounded-2xl p-4 border border-purple-500/25 grid grid-cols-1 sm:grid-cols-3 gap-3 items-end animate-fadeIn relative z-10">
            <div>
              <label className="block text-[10px] font-bold text-[#A78BFA] uppercase tracking-wider mb-1">Time (24h standard)</label>
              <input
                type="time"
                required
                value={newAlarmTime}
                onChange={(e) => setNewAlarmTime(e.target.value)}
                className="w-full rounded-xl bg-[#080817] px-3 py-2 text-xs text-white border border-purple-500/20 focus:outline-none focus:border-purple-400"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-[#A78BFA] uppercase tracking-wider mb-1">Alarm Title / Label</label>
              <input
                type="text"
                placeholder="Standup sync, Workout..."
                value={newAlarmLabel}
                onChange={(e) => setNewAlarmLabel(e.target.value)}
                className="w-full rounded-xl bg-[#080817] px-3 py-2 text-xs text-white border border-purple-500/20 focus:outline-none focus:border-purple-400"
              />
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                className="flex-1 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 py-2 text-xs font-bold text-white transition-all transform active:scale-95 cursor-pointer shadow-md"
              >
                Add Alert
              </button>
              <button
                type="button"
                onClick={() => setShowQuickAlarmInput(false)}
                className="rounded-xl bg-[#0D0D20] px-3 py-2 text-xs text-[#94A3B8] border border-white/5"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {/* Alarms active list */}
        {alarms.length === 0 ? (
          <div className="h-20 flex flex-col items-center justify-center text-xs text-[#64748B] italic relative z-10">
            No active alarms configured. Use chat or form above to set.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 relative z-10">
            {alarms.map((alarm) => (
              <div 
                key={alarm.id} 
                className={`relative overflow-hidden rounded-xl p-3.5 border transition-all ${alarm.enabled ? 'border-purple-500/25 bg-gradient-to-r from-purple-950/15 via-blue-950/10 to-[#080817]/60' : 'border-white/5 bg-[#080817]/40 opacity-60'}`}
              >
                <div className="flex items-center gap-3">
                  <div className={`flex h-9 w-9 items-center justify-center rounded-full ${alarm.enabled ? 'bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-purple-400 animate-pulse' : 'bg-white/5 text-[#94A3B8]'}`}>
                    <Clock className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="block text-sm font-black font-mono text-[#F8FAFC]">
                      {alarm.time}
                    </span>
                    <span className="block text-[10px] text-[#A78BFA] truncate max-w-[160px] font-bold mt-0.5">
                      {alarm.label}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[9px] text-[#00D9A5] bg-[#00D9A5]/10 px-1.5 py-0.5 rounded border border-[#00D9A5]/20 mt-1 font-semibold">
                      🎵 Ringtone: Pirates of the Caribbean
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 z-10 absolute right-3.5 top-1/2 -translate-y-1/2">
                  {/* Status toggle */}
                  <button
                    type="button"
                    onClick={() => toggleAlarm(alarm.id)}
                    className={`rounded-lg px-2.5 py-1 text-[9px] font-bold uppercase transition-all ${alarm.enabled ? 'bg-gradient-to-r from-purple-600/20 to-blue-600/20 text-purple-300 border border-purple-500/35 shadow-md shadow-purple-950/30' : 'bg-white/5 text-[#64748B] border border-transparent'}`}
                  >
                    {alarm.enabled ? 'Enabled' : 'Disabled'}
                  </button>

                  {/* Delete button */}
                  <button
                    type="button"
                    onClick={() => deleteAlarm(alarm.id)}
                    className="p-1.5 rounded-lg hover:bg-purple-500/10 text-[#64748B] hover:text-purple-400 transition-colors"
                    title="Delete Alarm"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ======================================================== */}
      {/* CONTEXT STORE ANALYTICS & GOALS RANKING DASHBOARD          */}
      {/* ======================================================== */}
      <ContextStoreAnalyticsChart />

      {/* ======================================================== */}
      {/* 4. BOTTOM BANNER (Smarter Tasks. Greater Results.)       */}
      {/* ======================================================== */}
      <div
        id="banner_smarter_tasks"
        onClick={() => setActiveView('tasks')}
        className="cursor-pointer relative overflow-hidden rounded-xl sm:rounded-2xl bg-[#0D0D20] p-3 sm:p-5 border border-[rgba(139,92,246,0.25)] hover:border-[#A855F7]/50 transition-all group shadow-[0_0_30px_rgba(124,58,237,0.1)] flex items-center justify-between gap-3 sm:gap-4"
      >
        {/* Left Side: Lightning Icon + Slogan */}
        <div className="relative z-10 flex items-center gap-2.5 sm:gap-4 min-w-0">
          <div className="flex h-8 w-8 xs:h-9 xs:w-9 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-full bg-[#4C1D95]/40 text-[#C084FC] border border-[#7C3AED]/40 shadow-inner group-hover:scale-105 transition-transform">
            <Zap className="h-4 w-4 sm:h-5 sm:w-5 fill-[#A855F7]/20 text-[#C084FC]" />
          </div>

          <div className="min-w-0">
            <h4 className="text-xs xs:text-sm sm:text-base font-bold text-[#F8FAFC] truncate">
              <span>Smarter </span>
              <span className="text-[#C084FC] font-extrabold">Tasks</span>
              <span>. Greater Results.</span>
            </h4>
            <p className="text-[10px] xs:text-xs text-[#94A3B8] truncate mt-0.5">
              Let your AI agent handle the heavy lifting.
            </p>
          </div>
        </div>

        {/* Right Side: Ethereal Cosmic Purple Flowing Waves + Arrow */}
        <div className="relative z-10 flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Cosmic waves graphic */}
          <div className="hidden sm:block w-36 md:w-48 h-10 sm:h-12 overflow-hidden pointer-events-none select-none">
            <CosmicWavesArt className="w-full h-full opacity-70" />
          </div>

          {/* Circle arrow button */}
          <div className="flex h-7 w-7 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-[#080817] text-[#C084FC] group-hover:bg-[#7C3AED] group-hover:text-white transition-colors shadow-md border border-[rgba(139,92,246,0.2)]">
            <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>

        {/* Subtle background glow */}
        <div className="absolute right-0 inset-y-0 w-1/2 bg-gradient-to-l from-[#7C3AED]/15 to-transparent pointer-events-none" />
      </div>
    </div>
  );
};
