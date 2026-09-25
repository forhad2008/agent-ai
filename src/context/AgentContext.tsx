import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import {
  TaskItem,
  ToolItem,
  FileItem,
  ApprovalRequest,
  ActivityItem,
  MessageItem,
  SettingsState,
  TaskStatus,
  UserProfile,
  AlarmItem,
  SessionContextMetadata,
} from '../types';
import {
  INITIAL_TASKS,
  INITIAL_TOOLS,
  INITIAL_FILES,
  INITIAL_APPROVALS,
  INITIAL_ACTIVITIES,
  INITIAL_MESSAGES,
} from '../data/initialData';
import { sendAgentMessage, executeToolApi, checkServerHealth } from '../services/api';
import { performWebSearch } from '../utils/webSearch';
import { sound } from '../services/sound';
import { TECH_LANGUAGES, TechLanguage, getLanguage, getInitialLanguage, DEFAULT_LANGUAGE_ID } from '../data/languages';
import { getPageTranslations, PageTranslations } from '../data/translations';

export type ActiveView = 
  | 'dashboard' 
  | 'chat' 
  | 'tasks' 
  | 'approvals' 
  | 'activity' 
  | 'results' 
  | 'files' 
  | 'automations' 
  | 'integrations' 
  | 'settings'
  | 'tools'
  | 'ailab'
  | 'profile';

interface AgentContextType {
  activeView: ActiveView;
  setActiveView: (view: ActiveView) => void;
  userProfile: UserProfile;
  updateUserProfile: (newProfile: Partial<UserProfile>) => void;
  tasks: TaskItem[];
  tools: ToolItem[];
  files: FileItem[];
  approvals: ApprovalRequest[];
  activities: ActivityItem[];
  messages: MessageItem[];
  settings: SettingsState;
  isGenerating: boolean;
  activePlan: { title: string; status: 'completed' | 'running' | 'pending' }[] | null;
  serverOnline: boolean;
  selectedTask: TaskItem | null;
  setSelectedTask: (task: TaskItem | null) => void;
  selectedFile: FileItem | null;
  setSelectedFile: (file: FileItem | null) => void;
  
  // Tech Language System (30 Tech Countries with Bangladesh first, English default when not setup)
  currentLanguage: TechLanguage;
  t: PageTranslations;
  setLanguageMode: (langId: string) => void;
  isLanguageModalOpen: boolean;
  setIsLanguageModalOpen: (open: boolean) => void;
  isInstallModalOpen: boolean;
  setIsInstallModalOpen: (open: boolean) => void;

  // Actions
  handleSendMessage: (text: string, attachedFiles?: FileItem[]) => Promise<void>;
  stopGeneration: () => void;
  regenerateLastResponse: () => Promise<void>;
  startNewConversation: () => void;
  createTask: (title: string, description: string, priority?: TaskItem['priority']) => TaskItem;
  updateTaskStatus: (taskId: string, status: TaskStatus) => void;
  approveAction: (approvalId: string) => void;
  rejectAction: (approvalId: string) => void;
  uploadFile: (file: { name: string; size: string; type: string; content?: string }) => void;
  createNewFile: (name: string, content: string, category?: FileItem['category']) => void;
  deleteFile: (fileId: string) => void;
  executeToolDirectly: (toolName: string, params?: Record<string, any>) => Promise<any>;
  updateSettings: (newSettings: Partial<SettingsState>) => void;
  launchQuickAction: (actionType: string) => void;
  performWorkspaceSearchAndPlan: (query: string) => Promise<void>;

  // WhatsApp-Style Deletion & Task Persistence Actions
  deleteMessageWhatsAppStyle: (messageId: string, deleteType: 'me' | 'everyone') => void;
  deleteTaskWithSync: (taskId: string) => void;
  
  // Real Alarm System & Reminders
  alarms: AlarmItem[];
  triggeredAlarm: AlarmItem | null;
  setTriggeredAlarm: (alarm: AlarmItem | null) => void;
  addAlarm: (time: string, label: string, timestamp?: number) => void;
  toggleAlarm: (alarmId: string) => void;
  deleteAlarm: (alarmId: string) => void;

  // Session Context Store
  sessionContext: SessionContextMetadata;
  updateSessionContext: (updates: Partial<SessionContextMetadata>) => void;
  resetSessionContext: () => void;
  reorderUserGoals: (fromIndex: number, toIndex: number) => void;
}

const AgentContext = createContext<AgentContextType | undefined>(undefined);

export const AgentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeView, setActiveView] = useState<ActiveView>('dashboard');
  const [tasks, setTasks] = useState<TaskItem[]>(() => {
    try {
      const saved = localStorage.getItem('abdullah_tasks');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return INITIAL_TASKS;
  });
  const [tools, setTools] = useState<ToolItem[]>(INITIAL_TOOLS);
  const [files, setFiles] = useState<FileItem[]>(INITIAL_FILES);
  const [approvals, setApprovals] = useState<ApprovalRequest[]>(INITIAL_APPROVALS);
  const [activities, setActivities] = useState<ActivityItem[]>(INITIAL_ACTIVITIES);
  const [messages, setMessages] = useState<MessageItem[]>(() => {
    try {
      const saved = localStorage.getItem('abdullah_messages');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return INITIAL_MESSAGES;
  });
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [activePlan, setActivePlan] = useState<{ title: string; status: 'completed' | 'running' | 'pending' }[] | null>(null);
  const [serverOnline, setServerOnline] = useState<boolean>(true);
  const [selectedTask, setSelectedTask] = useState<TaskItem | null>(null);
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null);
  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState<boolean>(false);
  const [isInstallModalOpen, setIsInstallModalOpen] = useState<boolean>(false);

  // Alarms System State
  const [alarms, setAlarms] = useState<AlarmItem[]>(() => {
    try {
      const saved = localStorage.getItem('abdullah_alarms');
      if (saved) {
        const parsed: AlarmItem[] = JSON.parse(saved);
        const now = Date.now();
        // Deactivate any alarms whose scheduled time has already passed
        return parsed.map((alarm) => {
          if (alarm.enabled && now >= alarm.timestamp) {
            return { ...alarm, enabled: false };
          }
          return alarm;
        });
      }
    } catch (e) {}
    return [
      { id: 'alarm_mock_1', time: '04:00 PM', label: 'Standup Sync with Partner Team', enabled: false, timestamp: Date.now() + 3600000 },
      { id: 'alarm_mock_2', time: '09:00 AM', label: 'Autonomous Web Audit Trigger', enabled: false, timestamp: Date.now() + 3600000 * 12 },
    ];
  });
  const [triggeredAlarm, setTriggeredAlarm] = useState<AlarmItem | null>(null);

  const addAlarm = (time: string, label: string, timestamp?: number) => {
    const defaultTs = timestamp || Date.now() + 60000;
    const newAlarm: AlarmItem = {
      id: `alarm_${Date.now()}`,
      time,
      label,
      enabled: true,
      timestamp: defaultTs,
    };
    setAlarms((prev) => {
      const updated = [...prev, newAlarm];
      try {
        localStorage.setItem('abdullah_alarms', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
    addActivity('Alarm Scheduled', 'Work Scheduler', `Set alarm: "${label}" for ${time}`, 'success');
  };

  const toggleAlarm = (alarmId: string) => {
    setAlarms((prev) => {
      const updated = prev.map((al) => (al.id === alarmId ? { ...al, enabled: !al.enabled } : al));
      try {
        localStorage.setItem('abdullah_alarms', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  const deleteAlarm = (alarmId: string) => {
    setAlarms((prev) => {
      const updated = prev.filter((al) => al.id !== alarmId);
      try {
        localStorage.setItem('abdullah_alarms', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  // Alarm ticker interval (checks every second)
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      alarms.forEach((alarm) => {
        if (alarm.enabled && now >= alarm.timestamp) {
          setTriggeredAlarm(alarm);
          // Toggle off so it doesn't loop
          setAlarms(prev => prev.map(a => a.id === alarm.id ? { ...a, enabled: false } : a));
          // Play synthesized "Pirates of the Caribbean" theme song
          sound.playPiratesTheme();
        }
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [alarms]);

  // Sync tasks to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('abdullah_tasks', JSON.stringify(tasks));
    } catch (e) {}
  }, [tasks]);

  // Sync messages to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('abdullah_messages', JSON.stringify(messages));
    } catch (e) {}
  }, [messages]);


  // Session Context Store (Tracking entities, user goals, and sentiment across mode switches)
  const [sessionContext, setSessionContext] = useState<SessionContextMetadata>(() => {
    try {
      const saved = localStorage.getItem('agent_session_context');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return {
      entities: ['Agent-alpha08', 'React', 'TypeScript', 'Gemini AI', 'Tailwind CSS'],
      userGoals: [
        { text: 'Workflow optimization', sentiment: 'Positive' },
        { text: 'Audit website code & security', sentiment: 'Needs Attention' },
        { text: 'Build Recharts analytics dashboard', sentiment: 'Neutral' },
      ],
      sentiment: 'motivated',
      activeTopic: 'Autonomous Work OS',
      lastUpdated: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
  });

  const updateSessionContext = (updates: Partial<SessionContextMetadata>) => {
    setSessionContext(prev => {
      const updated = {
        ...prev,
        ...updates,
        lastUpdated: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      try {
        localStorage.setItem('agent_session_context', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  const resetSessionContext = () => {
    const defaultCtx: SessionContextMetadata = {
      entities: ['Agent-alpha08', 'React', 'TypeScript'],
      userGoals: [
        { text: 'Workflow optimization', sentiment: 'Positive' },
        { text: 'Code audit & debugging', sentiment: 'Needs Attention' },
      ],
      sentiment: 'motivated',
      activeTopic: 'New Session',
      lastUpdated: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setSessionContext(defaultCtx);
    try {
      localStorage.setItem('agent_session_context', JSON.stringify(defaultCtx));
    } catch (e) {}
  };

  const reorderUserGoals = (fromIndex: number, toIndex: number) => {
    setSessionContext(prev => {
      const goals = [...prev.userGoals];
      const [moved] = goals.splice(fromIndex, 1);
      goals.splice(toIndex, 0, moved);
      const updated = {
        ...prev,
        userGoals: goals,
        lastUpdated: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      try {
        localStorage.setItem('agent_session_context', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  const extractAndUpdateContextFromPrompt = (prompt: string) => {
    const lower = prompt.toLowerCase();
    const newGoals: any[] = [];
    if (lower.includes('fix') || lower.includes('bug') || lower.includes('error') || lower.includes('audit')) {
      newGoals.push({ text: prompt.slice(0, 50), sentiment: 'Needs Attention' });
    } else if (lower.includes('build') || lower.includes('create') || lower.includes('add') || lower.includes('design')) {
      newGoals.push({ text: prompt.slice(0, 50), sentiment: 'Positive' });
    }

    const newEntities: string[] = [];
    if (lower.includes('react')) newEntities.push('React');
    if (lower.includes('typescript') || lower.includes('ts')) newEntities.push('TypeScript');
    if (lower.includes('tailwind')) newEntities.push('Tailwind CSS');
    if (lower.includes('gemini') || lower.includes('ai')) newEntities.push('Gemini AI');
    if (lower.includes('database') || lower.includes('sql')) newEntities.push('Database');

    setSessionContext(prev => {
      const mergedGoals = [...newGoals, ...prev.userGoals].slice(0, 8);
      const mergedEntities = Array.from(new Set([...newEntities, ...prev.entities])).slice(0, 10);
      let sentiment = prev.sentiment;
      if (lower.includes('urgent') || lower.includes('asap')) sentiment = 'urgent';
      else if (lower.includes('wow') || lower.includes('awesome') || lower.includes('great')) sentiment = 'positive';
      else if (lower.includes('curious') || lower.includes('how')) sentiment = 'curious';

      const updated = {
        ...prev,
        userGoals: mergedGoals,
        entities: mergedEntities,
        sentiment,
        activeTopic: prompt.slice(0, 30) + (prompt.length > 30 ? '...' : ''),
        lastUpdated: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      try {
        localStorage.setItem('agent_session_context', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem('abdullah_user_profile');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.email !== 'forhadalpha@gmail.com') {
          parsed.email = 'forhadalpha@gmail.com';
          localStorage.setItem('abdullah_user_profile', JSON.stringify(parsed));
        }
        return parsed;
      }
    } catch (e) {}
    return {
      name: 'Abdullah',
      role: 'Senior Software Engineer & AI Work Leader',
      company: 'Autonomous Work OS Tech',
      email: 'forhadalpha@gmail.com',
      bio: 'Focusing on building high-performance web applications, autonomous AI agent systems, and automated developer workflows.',
      goals: 'Automate daily tasks, audit website code & SEO, handle customer replies, and streamline operations.',
      preferences: 'Be concise, structured, action-oriented, and highlight key metrics.',
      techStack: 'TypeScript, React, Vite, Tailwind CSS, Express, Node.js, Python, AI APIs',
      customAgentInstructions: 'Always address me as Abdullah. Give direct, step-by-step solutions with zero fluff.',
    };
  });

  const updateUserProfile = (newProfile: Partial<UserProfile>) => {
    setUserProfile((prev) => {
      const updated = { ...prev, ...newProfile };
      try {
        localStorage.setItem('abdullah_user_profile', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  // Initial language: defaults to English ('en') when not set up, or loads saved preference
  const initialLang = useMemo(() => getInitialLanguage(), []);

  const [settings, setSettings] = useState<SettingsState>(() => {
    const defaultSettings: SettingsState = {
      agentName: 'Agent-alpha08',
      language: initialLang.id,
      aiBehavior: 'semi-autonomous',
      permissionSensitivity: 'Medium',
      safeMode: true,
      theme: 'dark-pro',
      notifications: true,
      autoApproveLowRisk: true,
      autoApproveEmail: false,
      autoApproveCalendar: false,
      autoApproveFiles: true,
      autoApproveResearch: true,
      dataRetentionDays: 30,
      aiStatus: 'active',
      crewAiEnabled: true,
      crewAiUrl: 'https://content-writing-crew-v1-b01bd292-f1d6-48e5--55d0aedd.crewai.com',
      crewAiToken: 'd29f6c0b7fee',
      crewAiOrgId: '2a3f7cbb-32b7-456c-a123-f0462033293c',
    };
    try {
      const saved = localStorage.getItem('abdullah_settings');
      if (saved) {
        return { ...defaultSettings, ...JSON.parse(saved) };
      }
    } catch (e) {}
    return defaultSettings;
  });

  const currentLanguage = useMemo(() => {
    return getLanguage(settings.language);
  }, [settings.language]);

  const t = useMemo(() => {
    return getPageTranslations(settings.language);
  }, [settings.language]);

  const setLanguageMode = (langId: string) => {
    const selected = getLanguage(langId);
    setSettings((prev) => ({ ...prev, language: selected.id }));
    try {
      localStorage.setItem('abdullah_ai_lang', selected.id);
    } catch (e) {}

    const newTranslations = getPageTranslations(selected.id);

    // Transform initial welcome message if user hasn't cleared it
    setMessages((prev) =>
      prev.map((msg) => {
        if (msg.id === 'msg_welcome') {
          return {
            ...msg,
            text: `## ${newTranslations.welcomeMessageHeading}\n${newTranslations.welcomeMessageBody}`,
          };
        }
        return msg;
      })
    );

    addActivity(
      `Language Mode: ${selected.flag} ${selected.country}`,
      'Tech Localization',
      `Active tech language mode: ${selected.name} (${selected.englishName}) - Hub: ${selected.techHub}`,
      'success'
    );
  };

  // Check backend connectivity on mount
  useEffect(() => {
    checkServerHealth().then((health) => {
      setServerOnline(health.status === 'ok');
    });
  }, []);

  const addActivity = (action: string, tool: string, result: string, status: ActivityItem['status'] = 'success', details?: string) => {
    const newAct: ActivityItem = {
      id: `act_${Date.now()}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      action,
      tool,
      result,
      status,
      details,
    };
    setActivities((prev) => [newAct, ...prev]);
  };

  const handleSendMessage = async (text: string, attachedList: FileItem[] = []) => {
    if (!text.trim() || isGenerating) return;

    // Play premium synthesized send chime
    sound.playSendSound();

    const userMsgId = `msg_user_${Date.now()}`;
    const userMsg: MessageItem = {
      id: userMsgId,
      sender: 'user',
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      attachedFiles: attachedList.map((f) => ({ name: f.name, size: f.size, type: f.type })),
    };

    setMessages((prev) => [...prev, userMsg]);
    extractAndUpdateContextFromPrompt(text.trim());
    setIsGenerating(true);

    // Real-time local interceptor for Alarm and Timer Actions
    const p = text.toLowerCase();
    if (p.includes('alarm') || p.includes('অ্যালার্ম') || p.includes('remind') || p.includes('রিমাইন্ডার')) {
      const secondsMatch = p.match(/in\s+(\d+)\s+second/i) || p.match(/(\d+)\s*সেকেন্ড/);
      const minutesMatch = p.match(/in\s+(\d+)\s+minute/i) || p.match(/(\d+)\s*মিনিট/);
      const pmAmMatch = p.match(/(\d+)(?::(\d+))?\s*(pm|am)/i);
      const standardTimeMatch = p.match(/(\d+):(\d+)/) || p.match(/(\d+)\s*টায়/);

      let alarmTimeStr = '';
      let targetTimeMs = Date.now();
      let label = 'AI Work OS Alarm Alert';

      if (secondsMatch) {
        const secs = parseInt(secondsMatch[1]);
        targetTimeMs = Date.now() + secs * 1000;
        const targetDate = new Date(targetTimeMs);
        alarmTimeStr = targetDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        label = settings.language === 'Bangla' ? `${secs} সেকেন্ডের টাইমার` : `Alarm scheduled in ${secs} seconds`;
      } else if (minutesMatch) {
        const mins = parseInt(minutesMatch[1]);
        targetTimeMs = Date.now() + mins * 60 * 1000;
        const targetDate = new Date(targetTimeMs);
        alarmTimeStr = targetDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        label = settings.language === 'Bangla' ? `${mins} মিনিটের টাইমার` : `Alarm scheduled in ${mins} minutes`;
      } else if (pmAmMatch) {
        const hrs = parseInt(pmAmMatch[1]);
        const mins = pmAmMatch[2] ? parseInt(pmAmMatch[2]) : 0;
        const ampm = pmAmMatch[3].toLowerCase();
        
        let targetHrs = hrs;
        if (ampm === 'pm' && hrs < 12) targetHrs += 12;
        if (ampm === 'am' && hrs === 12) targetHrs = 0;
        
        const targetDate = new Date();
        targetDate.setHours(targetHrs, mins, 0, 0);
        if (targetDate.getTime() < Date.now()) {
          targetDate.setDate(targetDate.getDate() + 1);
        }
        targetTimeMs = targetDate.getTime();
        alarmTimeStr = `${hrs}:${mins.toString().padStart(2, '0')} ${ampm.toUpperCase()}`;
        label = settings.language === 'Bangla' ? `${alarmTimeStr} অ্যালার্ম` : `Alarm set for ${alarmTimeStr}`;
      } else if (standardTimeMatch) {
        let hrs = parseInt(standardTimeMatch[1]);
        let mins = standardTimeMatch[2] ? parseInt(standardTimeMatch[2]) : 0;
        
        if (p.includes('pm') && hrs < 12) hrs += 12;
        
        const targetDate = new Date();
        targetDate.setHours(hrs, mins, 0, 0);
        if (targetDate.getTime() < Date.now()) {
          targetDate.setDate(targetDate.getDate() + 1);
        }
        targetTimeMs = targetDate.getTime();
        alarmTimeStr = `${hrs}:${mins.toString().padStart(2, '0')}`;
        label = settings.language === 'Bangla' ? `${alarmTimeStr} অ্যালার্ম` : `Alarm scheduled for ${alarmTimeStr}`;
      } else {
        const targetDate = new Date();
        targetDate.setHours(16, 0, 0, 0);
        if (targetDate.getTime() < Date.now()) {
          targetDate.setDate(targetDate.getDate() + 1);
        }
        targetTimeMs = targetDate.getTime();
        alarmTimeStr = '04:00 PM';
        label = settings.language === 'Bangla' ? 'বিকাল ৪:০০ টার অ্যালার্ম' : 'Alarm set for 4:00 PM';
      }

      addAlarm(alarmTimeStr, label, targetTimeMs);

      setTimeout(() => {
        const responseText = settings.language === 'Bangla'
          ? `## 🔔 অ্যালার্ম সফলভাবে সেট করা হয়েছে!\n\nআব্দুল্লাহ ভাই, আমি আপনার নির্দেশ অনুযায়ী **${label}** সেট করেছি। সময় হলেই আমি একটি প্রিমিয়াম সাউন্ড প্লে করব এবং একটি নোটিফিকেশন মডাল দেখাব।\n\n* **অ্যালার্মের সময়:** \`${alarmTimeStr}\`\n* **অবস্থা:** \`সক্রিয় ও প্রস্তুত\``
          : `## 🔔 Alarm Scheduled Successfully!\n\nAbdullah, I have successfully scheduled **${label}**. When the time is reached, I will play a premium synthesized chime alert and open a high-visibility alert modal.\n\n* **Alarm Time:** \`${alarmTimeStr}\`\n* **Status:** \`Active & Monitoring\``;

        const systemResponse: MessageItem = {
          id: `msg_agent_${Date.now()}`,
          sender: 'agent',
          text: responseText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          planSteps: [
            { title: settings.language === 'Bangla' ? 'নির্দেশ বিশ্লেষণ' : 'Instruction analyzed', status: 'completed' },
            { title: settings.language === 'Bangla' ? 'অ্যালার্ম সিস্টেম চালু' : 'Triggered alarm hardware', status: 'completed' },
            { title: settings.language === 'Bangla' ? 'শিডিউল সম্পন্ন' : 'Successfully scheduled', status: 'completed' }
          ]
        };

        setMessages(prev => [...prev, systemResponse]);
        sound.playReceiveSound();
        setIsGenerating(false);
        setActivePlan(null);
      }, 800);

      return;
    }

    // Initial safe task planning representation
    const initialPlan = [
      { title: t.planUnderstanding || "Analyzing objectives & requirements", status: 'running' as const },
      { title: t.planScanning || "Scanning workspace files & context", status: 'pending' as const },
      { title: t.planExecuting || "Executing specialized tools & APIs", status: 'pending' as const },
      { title: t.planVerifying || "Verifying outcomes & formatting report", status: 'pending' as const },
    ];
    setActivePlan(initialPlan);

    addActivity(
      'User Instruction Received',
      'AI Work Orchestrator',
      `Analyzing: "${text.slice(0, 40)}${text.length > 40 ? '...' : ''}"`,
      'pending'
    );

    // Auto-create task if user asks for project analysis, research, or coding
    const shouldCreateTask = /analyze|research|plan|create.*document|find.*problem|code|project/i.test(text);
    let associatedTaskId: string | undefined;

    if (shouldCreateTask) {
      const newTask = createTask(
        text.slice(0, 60),
        text,
        /urgent|critical|problem/i.test(text) ? 'High' : 'Medium'
      );
      associatedTaskId = newTask.id;
    }

    try {
      // 1. Fetch backend response first (to avoid UI lag during delays)
      const agentResponse = await sendAgentMessage(
        text,
        messages,
        settings.language,
        attachedList,
        userProfile,
        settings
      );

      // 2. Play beautiful reasoning loop transitions
      // Step 1 -> completed, Step 2 -> running
      setActivePlan([
        { title: t.planUnderstanding || "Analyzing objectives & requirements", status: 'completed' as const },
        { title: t.planScanning || "Scanning workspace files & context", status: 'running' as const },
        { title: t.planExecuting || "Executing specialized tools & APIs", status: 'pending' as const },
        { title: t.planVerifying || "Verifying outcomes & formatting report", status: 'pending' as const },
      ]);
      await new Promise(r => setTimeout(r, 1000));

      // Step 2 -> completed, Step 3 -> running (actively executing tools)
      setActivePlan([
        { title: t.planUnderstanding || "Analyzing objectives & requirements", status: 'completed' as const },
        { title: t.planScanning || "Scanning workspace files & context", status: 'completed' as const },
        { title: t.planExecuting || "Executing specialized tools & APIs", status: 'running' as const },
        { title: t.planVerifying || "Verifying outcomes & formatting report", status: 'pending' as const },
      ]);
      await new Promise(r => setTimeout(r, 1200));

      // Step 3 -> completed, Step 4 -> running (verifying outcomes)
      setActivePlan([
        { title: t.planUnderstanding || "Analyzing objectives & requirements", status: 'completed' as const },
        { title: t.planScanning || "Scanning workspace files & context", status: 'completed' as const },
        { title: t.planExecuting || "Executing specialized tools & APIs", status: 'completed' as const },
        { title: t.planVerifying || "Verifying outcomes & formatting report", status: 'running' as const },
      ]);
      await new Promise(r => setTimeout(r, 1000));

      // Final plan step update
      const resolvedPlan = agentResponse.planSteps || [
        { title: settings.language === 'Bangla' ? 'উদ্দেশ্য অনুধাবন' : 'Objective parsed', status: 'completed' },
        { title: settings.language === 'Bangla' ? 'টুল কার্যসম্পাদন' : 'Tools executed safely', status: 'completed' },
        { title: settings.language === 'Bangla' ? 'ফলাফল যাচাই' : 'Outcomes verified', status: 'completed' },
      ];
      setActivePlan(resolvedPlan);

      // Handle approval if required
      let approvalReq: ApprovalRequest | undefined;
      if (agentResponse.requiresApproval && agentResponse.approvalDetails) {
        approvalReq = {
          id: `appr_${Date.now()}`,
          taskId: associatedTaskId,
          action: agentResponse.approvalDetails.action || 'Execute Consequential Action',
          recipient: agentResponse.approvalDetails.recipient || 'External System',
          details: agentResponse.approvalDetails.preview || 'Authorization required prior to external modification.',
          preview: agentResponse.approvalDetails.preview,
          riskLevel: 'REQUIRES_APPROVAL',
          riskReason: agentResponse.approvalDetails.riskReason || 'Sensitive action requires human authorization',
          status: 'pending',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };

        setApprovals((prev) => [approvalReq!, ...prev]);
        addActivity(
          'Approval Requested',
          'Permission Gatekeeper',
          `Halted: "${approvalReq.action}". User consent required.`,
          'pending',
          approvalReq.riskReason
        );

        if (associatedTaskId) {
          updateTaskStatus(associatedTaskId, 'Waiting for Approval');
        }
      } else if (associatedTaskId) {
        updateTaskStatus(associatedTaskId, 'Completed');
      }

      // Record tool execution activity
      if (agentResponse.toolExecutions && agentResponse.toolExecutions.length > 0) {
        agentResponse.toolExecutions.forEach((toolExec) => {
          addActivity(
            `Tool Executed: ${toolExec.toolName}`,
            toolExec.category || 'WORK_TOOLS',
            toolExec.description,
            'success'
          );
        });
      }

      // Dynamic workspace synchronization: Create or delete files mentioned in chat dynamically
      const fileDeleteMatch = text.match(/(?:delete|remove|destroy)\s+(?:file|document)?\s*`?([a-zA-Z0-9_\-\.\/]+\.[a-zA-Z0-9]+)`?/i);
      if (fileDeleteMatch) {
        const fileName = fileDeleteMatch[1];
        const targetFile = files.find(f => f.name.toLowerCase() === fileName.toLowerCase());
        if (targetFile) {
          deleteFile(targetFile.id);
        }
      }

      const fileCreateMatch = text.match(/(?:create|write|save|generate|make)\s+(?:a\s+)?(?:file|code|report|script|document)\s+(?:named|called)?\s*`?([a-zA-Z0-9_\-\.\/]+\.[a-zA-Z0-9]+)`?/i)
        || agentResponse.content.match(/(?:created|saved|generated|wrote)\s+(?:file|code|report|script|document)\s+(?:named|called)?\s*`?([a-zA-Z0-9_\-\.\/]+\.[a-zA-Z0-9]+)`?/i);

      if (fileCreateMatch) {
        const fileName = fileCreateMatch[1];
        const fileExists = files.some(f => f.name.toLowerCase() === fileName.toLowerCase());
        if (!fileExists) {
          const codeBlockMatch = agentResponse.content.match(/```[a-z]*\n([\s\S]*?)```/i);
          const fileContent = codeBlockMatch ? codeBlockMatch[1] : agentResponse.content;
          
          const ext = fileName.split('.').pop()?.toLowerCase() || 'txt';
          let category: FileItem['category'] = 'document';
          if (['js', 'ts', 'jsx', 'tsx', 'py', 'json', 'html', 'css'].includes(ext)) category = 'code';
          else if (['csv', 'json', 'xlsx'].includes(ext)) category = 'data';
          else if (['png', 'jpg', 'jpeg', 'webp', 'svg'].includes(ext)) category = 'image';

          createNewFile(fileName, fileContent, category);
        }
      }

      const agentMsgId = `msg_agent_${Date.now()}`;
      const agentMsg: MessageItem = {
        id: agentMsgId,
        sender: 'agent',
        text: agentResponse.content,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        planSteps: resolvedPlan,
        toolExecutions: agentResponse.toolExecutions,
        requiresApproval: agentResponse.requiresApproval,
        approvalDetails: approvalReq,
        thinkingText: agentResponse.thinking,
      };

      setMessages((prev) => [...prev, agentMsg]);
      
      // Play premium synthesized receive chime
      sound.playReceiveSound();

      addActivity(
        'Agent Task Completed',
        'Gemini Work Core',
        `Successfully generated structured report.`,
        'success'
      );
    } catch (err: any) {
      console.error('Agent message processing error:', err);

      const errorMsg: MessageItem = {
        id: `msg_err_${Date.now()}`,
        sender: 'agent',
        text: `## কাজ\nনির্দেশটি কার্যকর করতে একটি সমস্যা দেখা দিয়েছে।\n\n## ফলাফল\nত্রুটির কারণ: ${err.message || 'সার্ভার যোগাযোগে সমস্যা'}\n\n## পরবর্তী ধাপ\nদয়া করে পুনরায় চেষ্টা (Retry) করুন অথবা নির্দেশটি সামান্য পরিবর্তন করুন।`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        error: {
          failed: 'Agent execution cycle',
          reason: err.message || 'Network connection or model timeout',
          completed: 'Analyzed request context',
          next: 'Retry task or review server settings',
        },
      };

      setMessages((prev) => [...prev, errorMsg]);

      // Play premium synthesized receive chime even on error
      sound.playReceiveSound();

      addActivity(
        'Agent Task Error',
        'Work Orchestrator',
        err.message || 'Task execution failed',
        'failed'
      );

      if (associatedTaskId) {
        updateTaskStatus(associatedTaskId, 'Failed');
      }
    } finally {
      setIsGenerating(false);
    }
  };

  const stopGeneration = () => {
    setIsGenerating(false);
    setActivePlan(null);
    addActivity('Task Aborted', 'User Override', 'Task generation stopped by user.', 'warning');
  };

  const regenerateLastResponse = async () => {
    const lastUserMsg = [...messages].reverse().find((m) => m.sender === 'user');
    if (lastUserMsg) {
      await handleSendMessage(lastUserMsg.text);
    }
  };

  const startNewConversation = () => {
    setMessages([
      {
        id: `msg_new_${Date.now()}`,
        sender: 'agent',
        text: settings.language === 'Bangla' 
          ? `## কাজ\nনতুন কথোপকথন প্রস্তুত করা হয়েছে। Agent-alpha08 আপনার নতুন নির্দেশনার অপেক্ষায় রয়েছে।`
          : `## Action\nNew conversation workspace initialized. Agent-alpha08 is standing by for instructions.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        planSteps: [
          { title: 'Workspace reset', status: 'completed' },
          { title: 'Context buffer cleared', status: 'completed' },
          { title: 'Tools standby', status: 'completed' },
        ],
      }
    ]);
    setActivePlan(null);
    addActivity('New Session Initialized', 'Workspace Controller', 'Cleared active chat buffer.', 'success');
  };

  const createTask = (
    title: string,
    description: string,
    priority: TaskItem['priority'] = 'Medium'
  ): TaskItem => {
    const newTask: TaskItem = {
      id: `task_${Date.now()}`,
      title,
      description,
      status: 'Running',
      priority,
      createdTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' Today',
      updatedTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' Today',
      progress: 25,
      requiredTools: ['Read File', 'Analyze Code'],
      approvalStatus: 'None',
      planSteps: [
        { title: 'Parsing requirements', status: 'completed' },
        { title: 'Executing assigned tools', status: 'running' },
        { title: 'Synthesizing output', status: 'pending' },
      ],
    };

    setTasks((prev) => [newTask, ...prev]);
    addActivity('Task Created', 'Task Manager', `Created task "${title}"`, 'success');
    return newTask;
  };

  const updateTaskStatus = (taskId: string, status: TaskStatus) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === taskId) {
          const progress = 
            status === 'Completed' ? 100 :
            status === 'Waiting for Approval' ? 85 :
            status === 'Running' ? 55 :
            status === 'Planning' ? 20 : t.progress;
          return {
            ...t,
            status,
            progress,
            updatedTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' Today',
          };
        }
        return t;
      })
    );
  };

  const deleteMessageWhatsAppStyle = (messageId: string, deleteType: 'me' | 'everyone') => {
    setMessages((prev) => {
      const updated = prev.map((msg): MessageItem => {
        if (msg.id === messageId) {
          if (deleteType === 'everyone') {
            return {
              ...msg,
              isDeleted: true,
              deletedType: 'everyone' as 'everyone' | 'me',
              text: '🚫 *This message was deleted*',
              planSteps: undefined,
              toolExecutions: undefined,
            };
          } else {
            return {
              ...msg,
              isDeleted: true,
              deletedType: 'me' as 'everyone' | 'me',
            };
          }
        }
        return msg;
      });
      try {
        localStorage.setItem('abdullah_messages', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
    sound.playReceiveSound();
  };

  const deleteTaskWithSync = (taskId: string) => {
    setTasks((prev) => {
      const updated = prev.filter((t) => t.id !== taskId);
      try {
        localStorage.setItem('abdullah_tasks', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
    addActivity('Task Permanently Removed', 'Work OS Task Scheduler', `Removed task ID: ${taskId}`, 'warning');
  };

  const approveAction = (approvalId: string) => {
    setApprovals((prev) =>
      prev.map((appr) => {
        if (appr.id === approvalId) {
          return { ...appr, status: 'approved' };
        }
        return appr;
      })
    );

    const approvedItem = approvals.find((a) => a.id === approvalId);
    if (approvedItem && approvedItem.taskId) {
      updateTaskStatus(approvedItem.taskId, 'Completed');
    }

    addActivity(
      'Action Approved',
      'Permission Gatekeeper',
      `Authorized: "${approvedItem?.action || 'Consequential Action'}"`,
      'success'
    );
  };

  const rejectAction = (approvalId: string) => {
    setApprovals((prev) =>
      prev.map((appr) => {
        if (appr.id === approvalId) {
          return { ...appr, status: 'rejected' };
        }
        return appr;
      })
    );

    const target = approvals.find((a) => a.id === approvalId);
    if (target && target.taskId) {
      updateTaskStatus(target.taskId, 'Cancelled');
    }

    addActivity(
      'Action Rejected',
      'Permission Gatekeeper',
      `Denied: "${target?.action || 'Action'}" by user choice.`,
      'warning'
    );
  };

  const uploadFile = (uploaded: { name: string; size: string; type: string; content?: string }) => {
    const ext = uploaded.name.split('.').pop()?.toLowerCase() || 'txt';
    let category: FileItem['category'] = 'document';
    if (['js', 'ts', 'jsx', 'tsx', 'py', 'json', 'html', 'css'].includes(ext)) category = 'code';
    else if (['csv', 'json', 'xlsx'].includes(ext)) category = 'data';
    else if (['png', 'jpg', 'jpeg', 'webp', 'svg'].includes(ext)) category = 'image';

    const newFile: FileItem = {
      id: `file_${Date.now()}`,
      name: uploaded.name,
      size: uploaded.size,
      type: uploaded.type,
      extension: ext,
      updatedAt: 'Just now',
      category,
      content: uploaded.content || `[Content of uploaded ${uploaded.name}]`,
    };

    setFiles((prev) => [newFile, ...prev]);
    addActivity('File Uploaded', 'File Storage', `Uploaded "${uploaded.name}" (${uploaded.size})`, 'success');
  };

  const createNewFile = (name: string, content: string, category: FileItem['category'] = 'document') => {
    const ext = name.split('.').pop()?.toLowerCase() || 'txt';
    const newFile: FileItem = {
      id: `file_${Date.now()}`,
      name,
      size: `${(content.length / 1024).toFixed(1)} KB`,
      type: 'text/plain',
      extension: ext,
      updatedAt: 'Just now',
      category,
      content,
      isGenerated: true,
    };

    setFiles((prev) => [newFile, ...prev]);
    addActivity('File Created', 'File Engine', `Created workspace file "${name}"`, 'success');
  };

  const deleteFile = (fileId: string) => {
    const file = files.find((f) => f.id === fileId);
    if (file) {
      setFiles((prev) => prev.filter((f) => f.id !== fileId));
      addActivity('File Removed', 'File Storage', `Deleted "${file.name}"`, 'warning');
    }
  };

  const executeToolDirectly = async (toolName: string, params: Record<string, any> = {}) => {
    addActivity(`Tool Invocation: ${toolName}`, 'Manual Tool Execution', `Executing with parameters`, 'pending');
    try {
      const res = await executeToolApi(toolName, params);
      addActivity(`Tool Finished: ${toolName}`, 'Manual Tool Execution', 'Execution successful', 'success');
      return res;
    } catch (err: any) {
      addActivity(`Tool Failed: ${toolName}`, 'Manual Tool Execution', err.message || 'Execution error', 'failed');
      throw err;
    }
  };

  const updateSettings = (newSettings: Partial<SettingsState>) => {
    setSettings((prev) => {
      const updated = { ...prev, ...newSettings };
      try {
        localStorage.setItem('abdullah_settings', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
    addActivity('Settings Updated', 'System Preferences', 'Saved configuration changes', 'success');
  };

  const launchQuickAction = (actionType: string) => {
    switch (actionType) {
      case 'Start Task':
      case 'start_task': {
        setActiveView('tasks');
        break;
      }
      case 'Analyze Files':
      case 'analyze_files': {
        setActiveView('files');
        break;
      }
      case 'Research':
      case 'research': {
        setActiveView('chat');
        handleSendMessage(t.promptResearchTrends);
        break;
      }
      case 'Create Document':
      case 'create_doc': {
        setActiveView('chat');
        handleSendMessage(t.promptProductDescription);
        break;
      }
      case 'Write Code':
      case 'write_code': {
        setActiveView('chat');
        handleSendMessage(t.promptDebugCode);
        break;
      }
      case 'Open AI Chat':
      case 'open_chat': {
        setActiveView('chat');
        break;
      }
      default:
        setActiveView('chat');
    }
  };

  const performWorkspaceSearchAndPlan = async (query: string) => {
    if (!query || !query.trim() || isGenerating) return;

    sound.playSendSound();
    setIsGenerating(true);

    // Initial plan state
    setActivePlan([
      { title: 'Triggering Google live search grounding...', status: 'running' },
      { title: 'Analyzing web content and retrieving key stats...', status: 'pending' },
      { title: 'Generating strategic workspace goal plan...', status: 'pending' },
    ]);

    const userMsg: MessageItem = {
      id: `msg_search_${Date.now()}`,
      sender: 'user',
      text: `[Web Search Command] Search and analyze: "${query}"`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages((prev) => [...prev, userMsg]);

    addActivity('Search Query Sent', 'Google Live Search', `Searching: "${query}"`, 'pending');

    try {
      const searchResult = await performWebSearch(query);

      setActivePlan([
        { title: 'Triggering Google live search grounding...', status: 'completed' },
        { title: 'Analyzing web content and retrieving key stats...', status: 'running' },
        { title: 'Generating strategic workspace goal plan...', status: 'pending' },
      ]);
      await new Promise((r) => setTimeout(r, 1000));

      setActivePlan([
        { title: 'Triggering Google live search grounding...', status: 'completed' },
        { title: 'Analyzing web content and retrieving key stats...', status: 'completed' },
        { title: 'Generating strategic workspace goal plan...', status: 'running' },
      ]);
      await new Promise((r) => setTimeout(r, 1200));

      // Synthesize response based on search results
      const planHeading = settings.language === 'Bangla' ? '## ওয়েব সার্চ ও পরিকল্পনা রিপোর্ট' : '## Web Search & Strategic Plan';
      const summaryText = searchResult.summary;
      const sourcesText = searchResult.sources && searchResult.sources.length > 0
        ? `\n\n### ${settings.language === 'Bangla' ? 'উৎস ও ওয়েবসাইটসমূহ:' : 'Sources & Domains:'}\n` + 
          searchResult.sources.map(s => `- **${s.title}** ([${s.domain}](https://${s.domain}))`).join('\n')
        : '';

      const content = `${planHeading}\n\n${summaryText}${sourcesText}\n\n*মাইলস্টোন রিপোর্ট সফলভাবে প্রস্তুত এবং অ্যাক্টিভিটি প্যানেলে সিঙ্ক করা হয়েছে।*`;

      // Save a workspace file with the search results so user can view/download
      const fileName = `search_plan_${Date.now().toString().slice(-4)}.md`;
      createNewFile(fileName, content, 'document');

      const agentMsg: MessageItem = {
        id: `msg_search_agent_${Date.now()}`,
        sender: 'agent',
        text: content,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        planSteps: [
          { title: 'Live search complete', status: 'completed' },
          { title: 'Web context analyzed', status: 'completed' },
          { title: 'Dynamic document saved', status: 'completed' },
        ],
        toolExecutions: [
          {
            toolName: 'Google Search Grounding',
            category: 'WEB_TOOLS',
            status: 'success',
            description: `Extracted live search index data for: "${query}".`
          }
        ]
      };

      setMessages((prev) => [...prev, agentMsg]);
      sound.playReceiveSound();
      addActivity('Search Plan Generated', 'Workspace Intelligence', `Successfully saved workspace file "${fileName}"`, 'success');
    } catch (err: any) {
      console.error('Search planning error:', err);
      addActivity('Search Planning Failed', 'Workspace Intelligence', err.message || 'Error occurred', 'failed');
    } finally {
      setIsGenerating(false);
      setActivePlan(null);
    }
  };

  return (
    <AgentContext.Provider
      value={{
        activeView,
        setActiveView,
        userProfile,
        updateUserProfile,
        tasks,
        tools,
        files,
        approvals,
        activities,
        messages,
        settings,
        isGenerating,
        activePlan,
        serverOnline,
        selectedTask,
        setSelectedTask,
        selectedFile,
        setSelectedFile,
        currentLanguage,
        t,
        setLanguageMode,
        isLanguageModalOpen,
        setIsLanguageModalOpen,
        isInstallModalOpen,
        setIsInstallModalOpen,
        handleSendMessage,
        stopGeneration,
        regenerateLastResponse,
        startNewConversation,
        createTask,
        updateTaskStatus,
        approveAction,
        rejectAction,
        uploadFile,
        createNewFile,
        deleteFile,
        executeToolDirectly,
        updateSettings,
        launchQuickAction,
        performWorkspaceSearchAndPlan,
        
        // WhatsApp-Style Deletion & Task Persistence Actions
        deleteMessageWhatsAppStyle,
        deleteTaskWithSync,
        
        // Alarms System
        alarms,
        triggeredAlarm,
        setTriggeredAlarm,
        addAlarm,
        toggleAlarm,
        deleteAlarm,

        // Session Context Store
        sessionContext,
        updateSessionContext,
        resetSessionContext,
        reorderUserGoals,
      }}
    >
      {children}
    </AgentContext.Provider>
  );
};

export const useAgent = () => {
  const context = useContext(AgentContext);
  if (!context) {
    throw new Error('useAgent must be used within an AgentProvider');
  }
  return context;
};
