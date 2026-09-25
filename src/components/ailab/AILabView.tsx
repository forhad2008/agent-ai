import React, { useState, useEffect, useRef } from 'react';
import {
  Sparkles,
  Play,
  Pause,
  RotateCcw,
  ShieldCheck,
  Zap,
  Terminal,
  Database,
  Search,
  Mail,
  FileCode,
  Github,
  Globe,
  Plus,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Code,
  Layers,
  Settings,
  HelpCircle,
  Eye,
  RefreshCw,
  Info
} from 'lucide-react';
import { useAgent } from '../../context/AgentContext';
import { sound } from '../../services/sound';

interface PlanStep {
  id: string;
  title: string;
  titleBn: string;
  desc: string;
  descBn: string;
  tool: 'web_search' | 'file_system' | 'code_executor' | 'github' | 'email' | 'database' | 'none';
  risk: 'safe' | 'sensitive' | 'dangerous';
  status: 'pending' | 'running' | 'completed' | 'failed' | 'skipped';
}

interface SimulatedLog {
  timestamp: string;
  type: 'info' | 'success' | 'warn' | 'error' | 'thinking';
  text: string;
  textBn: string;
}

interface AgentMemory {
  shortTerm: string[];
  shortTermBn: string[];
  working: {
    entities: string[];
    activeTopic: string;
    activeTopicBn: string;
    userGoals: string[];
    userGoalsBn: string[];
  };
  longTerm: {
    userName: string;
    role: string;
    preferences: string;
    theme: string;
  };
}

export const AILabView: React.FC = () => {
  const { settings, t } = useAgent();
  const isBangla = settings.language === 'Bangla';

  // State Management for Simulator
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(-1);
  const [agentStatus, setAgentStatus] = useState<'idle' | 'understanding' | 'planning' | 'permission_pending' | 'executing' | 'observing' | 'verifying' | 'recovering' | 'completed' | 'failed'>('idle');
  
  // Controls
  const [injectError, setInjectError] = useState(false);
  const [errorType, setErrorType] = useState<'dependency' | 'timeout' | 'rate_limit'>('dependency');
  const [autoApproveSafe, setAutoApproveSafe] = useState(true);
  const [retryCount, setRetryCount] = useState(0);
  const [activeTab, setActiveTab] = useState<'simulator' | 'pseudocode' | 'diagram'>('simulator');
  const [selectedInstruction, setSelectedInstruction] = useState<string>('portfolio');
  const [customPrompt, setCustomPrompt] = useState('');

  // Agent State Data
  const [plan, setPlan] = useState<PlanStep[]>([]);
  const [logs, setLogs] = useState<SimulatedLog[]>([]);
  const [memory, setMemory] = useState<AgentMemory>({
    shortTerm: [],
    shortTermBn: [],
    working: {
      entities: [],
      activeTopic: 'Idle Workspace',
      activeTopicBn: 'অপ্রস্তুত কর্মক্ষেত্র',
      userGoals: [],
      userGoalsBn: []
    },
    longTerm: {
      userName: 'Abdullah',
      role: 'Senior Software Engineer',
      preferences: 'Concise, action-oriented, deployment to GitHub Pages',
      theme: 'Dark-Pro'
    }
  });

  // Reference for log scrolling
  const logEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (logEndRef.current) {
      logEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs]);

  // Preset Instructions & corresponding plans
  const presetInstructions = {
    portfolio: {
      title: 'Deploy Glassmorphic Portfolio Website',
      titleBn: 'গ্লাস মরফিক পোর্টফোলিও ওয়েবসাইট ডিপ্লয়',
      prompt: 'Build a premium responsive portfolio website with deep tailwind styles, check code linting, and deploy to GitHub Pages.',
      promptBn: 'ডিপ টেইলউইন্ড স্টাইলসহ একটি প্রিমিয়াম রেসপনসিভ পোর্টফোলিও ওয়েবসাইট তৈরি করুন, কোড লিন্টিং চেক করুন এবং গিটহাব পেজেসে ডিপ্লয় করুন।',
      plan: [
        {
          id: 'step_1',
          title: 'Analyze Intent & Requirements',
          titleBn: 'উদ্দেশ্য এবং প্রয়োজনীয়তা বিশ্লেষণ',
          desc: 'Parse user prompt and extract framework specifications (React, Tailwind CSS, GitHub Pages).',
          descBn: 'ব্যবহারকারীর প্রম্পট বিশ্লেষণ করুন এবং ফ্রেমওয়ার্কের স্পেসিফিকেশন সংগ্রহ করুন।',
          tool: 'none',
          risk: 'safe',
          status: 'pending'
        },
        {
          id: 'step_2',
          title: 'Scaffold Project Structure',
          titleBn: 'প্রজেক্ট স্ট্রাকচার তৈরি',
          desc: 'Generate files like components/Portfolio.tsx, index.html, and tailwind.config.ts.',
          descBn: 'কম্পোনেন্টস, ইনডেক্স ফাইল এবং টেইলউইন্ড কনফিগ ফাইল তৈরি করুন।',
          tool: 'file_system',
          risk: 'safe',
          status: 'pending'
        },
        {
          id: 'step_3',
          title: 'Verify & Run Lint Compilation',
          titleBn: 'লিন্ট এবং কোড কম্পাইলেশন ভেরিফিকেশন',
          desc: 'Compile files and check for syntactic errors or missing type declarations.',
          descBn: 'ফাইলগুলো কম্পাইল করুন এবং টাইপ বা সিনট্যাক্স এরর চেক করুন।',
          tool: 'code_executor',
          risk: 'safe',
          status: 'pending'
        },
        {
          id: 'step_4',
          title: 'Commit Code to Local Git',
          titleBn: 'লোকাল গিটহাবে কোড কমিট',
          desc: 'Stage all modified files and commit change log with target version metadata.',
          descBn: 'সব ফাইল স্টেজ করুন এবং ভার্সন মেটাডেটা সহ লোকাল গিটহাবে কমিট করুন।',
          tool: 'github',
          risk: 'sensitive',
          status: 'pending'
        },
        {
          id: 'step_5',
          title: 'Push & Activate GitHub Pages Deployment',
          titleBn: 'গিটহাব পেজেস ডিপ্লয়মেন্ট চালু',
          desc: 'Push code and execute the production actions runner pipeline to release online.',
          descBn: 'কোড পুশ করুন এবং অনলাইন রিলিজের জন্য অ্যাকশন রানার পাইপলাইন চালু করুন।',
          tool: 'github',
          risk: 'dangerous',
          status: 'pending'
        }
      ] as PlanStep[]
    },
    security: {
      title: 'SQL Vulnerability Audit & Patch',
      titleBn: 'এসকিউএল সিকিউরিটি অডিট এবং প্যাচ',
      prompt: 'Scan our database schema and server controller for potential vulnerability patches, test updates, and run migration schemas.',
      promptBn: 'কোনো দুর্বলতা প্যাচ করার জন্য ডাটাবেস স্কিমা এবং সার্ভার কন্ট্রোলার স্ক্যান করুন, আপডেট টেস্ট করুন এবং মাইগ্রেশন সম্পন্ন করুন।',
      plan: [
        {
          id: 'step_1',
          title: 'Scan Server API Code',
          titleBn: 'সার্ভার এপিআই কোড স্ক্যান',
          desc: 'Audit Express controller route queries looking for direct concatenated strings in SQL blocks.',
          descBn: 'এসকিউএল ব্লকে সরাসরি যুক্ত থাকা স্ট্রিং অনুসন্ধানের জন্য এক্সপ্রেস কন্ট্রোলার অডিট করুন।',
          tool: 'file_system',
          risk: 'safe',
          status: 'pending'
        },
        {
          id: 'step_2',
          title: 'Run Automated Security Scanner',
          titleBn: 'স্বয়ংক্রিয় সিকিউরিটি স্ক্যানার চালু',
          desc: 'Leverage static security scan on drizzle.config.ts and database routing folders.',
          descBn: 'ডাটাবেস রাউটিং এবং কনফিগারেশনে স্ট্যাটিক সিকিউরিটি স্ক্যান সম্পন্ন করুন।',
          tool: 'code_executor',
          risk: 'safe',
          status: 'pending'
        },
        {
          id: 'step_3',
          title: 'Apply Schema Patch Migration',
          titleBn: 'ডাটাবেস প্যাচ মাইগ্রেশন প্রয়োগ',
          desc: 'Modify schema.ts to enforce fully parameterized SQL bindings and drizzle transactions.',
          descBn: 'সম্পূর্ণ প্যারামিটারাইজড এসকিউএল বাইন্ডিং নিশ্চিত করতে স্কিমা ফাইল আপডেট করুন।',
          tool: 'database',
          risk: 'sensitive',
          status: 'pending'
        },
        {
          id: 'step_4',
          title: 'Execute Production Database Alter',
          titleBn: 'প্রোডাকশন ডাটাবেস পরিবর্তন',
          desc: 'Execute DDL migrations directly to the live Cloud SQL cluster.',
          descBn: 'লাইভ ক্লাউড এসকিউএল ডাটাবেসে সরাসরি মাইগ্রেশন স্ক্রিপ্ট নির্বাহ করুন।',
          tool: 'database',
          risk: 'dangerous',
          status: 'pending'
        }
      ] as PlanStep[]
    },
    researcher: {
      title: 'AI Agent Trends Weekly Newsletter',
      titleBn: 'এআই এজেন্ট ট্রেন্ডস সাপ্তাহিক নিউজলেটার',
      prompt: 'Research the latest 2026 reasoning agent model benchmarks, synthesize a markdown report, and email it to stakeholders.',
      promptBn: 'সর্বশেষ ২০২৬ এআই রিজনিং মডেলের বেঞ্চমার্ক নিয়ে গবেষণা করুন, একটি আকর্ষণীয় রিপোর্ট তৈরি করুন এবং ইমেইল করুন।',
      plan: [
        {
          id: 'step_1',
          title: 'Query Modern Tech Benchmarks',
          titleBn: 'আধুনিক টেক বেঞ্চমার্ক কোয়েরি',
          desc: 'Search google with grounding queries to extract benchmarks from reliable sources.',
          descBn: 'নির্ভরযোগ্য সোর্স থেকে বেঞ্চমার্ক ডেটা উদ্ধারের জন্য গুগল সার্চ করুন।',
          tool: 'web_search',
          risk: 'safe',
          status: 'pending'
        },
        {
          id: 'step_2',
          title: 'Analyze & Formulate Report',
          titleBn: 'বিশ্লেষণ এবং রিপোর্ট তৈরি',
          desc: 'Synthesize raw benchmarks and model capabilities into a cohesive Markdown newsletter.',
          descBn: 'প্রাপ্ত তথ্য সাজিয়ে নিউজলেটার ফরমেটে একটি সুন্দর রিপোর্ট তৈরি করুন।',
          tool: 'file_system',
          risk: 'safe',
          status: 'pending'
        },
        {
          id: 'step_3',
          title: 'Review Email Recipients Directory',
          titleBn: 'ইমেইল প্রাপক তালিকা যাচাই',
          desc: 'Validate user contacts and retrieve primary email addresses.',
          descBn: 'ব্যবহারকারীর কন্টাক্ট ইনফো থেকে মূল ইমেইল অ্যাড্রেসগুলো যাচাই করুন।',
          tool: 'database',
          risk: 'safe',
          status: 'pending'
        },
        {
          id: 'step_4',
          title: 'Send Mass HTML Newsletter Email',
          titleBn: 'এইচটিএমএল নিউজলেটার ইমেইল প্রেরণ',
          desc: 'Deliver HTML formatted email reports using the production Mail Server relay.',
          descBn: 'উৎপাদিত এইচটিএমএল রিপোর্টটি মেইল সার্ভারের মাধ্যমে প্রাপকদের কাছে পাঠান।',
          tool: 'email',
          risk: 'dangerous',
          status: 'pending'
        }
      ] as PlanStep[]
    }
  };

  // Reset the state to clean
  const resetWorkspace = () => {
    setIsPlaying(false);
    setCurrentStepIndex(-1);
    setAgentStatus('idle');
    setRetryCount(0);
    setLogs([]);
    setPlan([]);
    setMemory({
      shortTerm: [],
      shortTermBn: [],
      working: {
        entities: [],
        activeTopic: 'Idle Workspace',
        activeTopicBn: 'অপ্রস্তুত কর্মক্ষেত্র',
        userGoals: [],
        userGoalsBn: []
      },
      longTerm: {
        userName: 'Abdullah',
        role: 'Senior Software Engineer',
        preferences: 'Concise, action-oriented, deployment to GitHub Pages',
        theme: 'Dark-Pro'
      }
    });
  };

  // Start executing the agent loop
  const startAgentLoop = () => {
    resetWorkspace();
    setIsPlaying(true);
    setAgentStatus('understanding');
    
    // Play transition chime
    sound.playSendSound();

    const selectedPreset = presetInstructions[selectedInstruction as keyof typeof presetInstructions];
    const targetPrompt = selectedInstruction === 'custom' ? (customPrompt || 'Perform custom tasks') : selectedPreset.prompt;
    const targetPromptBn = selectedInstruction === 'custom' ? (customPrompt || 'কাস্টম কাজ সম্পাদন করুন') : selectedPreset.promptBn;

    addLog('info', `[START] Received Instruction: "${targetPrompt}"`, `[শুরু] ব্যবহারকারীর নির্দেশ: "${targetPromptBn}"`);
    
    // Populate Initial Plan
    let initialPlan: PlanStep[] = [];
    if (selectedInstruction === 'custom') {
      initialPlan = [
        {
          id: 'custom_1',
          title: 'Understand Intent',
          titleBn: 'উদ্দেশ্য অনুধাবন',
          desc: 'Analyze custom request parameters and verify framework specifications.',
          descBn: 'ব্যবহারকারীর অনুরোধের প্যারামিটার এবং সিস্টেমের প্রয়োজনীয়তা বিশ্লেষণ।',
          tool: 'none',
          risk: 'safe',
          status: 'pending'
        },
        {
          id: 'custom_2',
          title: 'Scan Local Environment',
          titleBn: 'লোকাল এনভায়রনমেন্ট স্ক্যান',
          desc: 'Check files, packages and configurations.',
          descBn: 'প্রয়োজনীয় ফাইল, প্যাকেজ এবং কনফিগারেশন চেক করা।',
          tool: 'file_system',
          risk: 'safe',
          status: 'pending'
        },
        {
          id: 'custom_3',
          title: 'Execute Custom Execution Block',
          titleBn: 'কাস্টম এক্সিকিউশন ব্লক নির্বাহ',
          desc: 'Run custom shell or API processes as requested.',
          descBn: 'অনুরোধ অনুযায়ী কাস্টম কোড বা এপিআই প্রসেস নির্বাহ করা।',
          tool: 'code_executor',
          risk: 'sensitive',
          status: 'pending'
        },
        {
          id: 'custom_4',
          title: 'Publish Results & Verify',
          titleBn: 'ফলাফল প্রকাশ এবং ভেরিফিকেশন',
          desc: 'Compile final reports and update long-term user memory state.',
          descBn: 'চূড়ান্ত রিপোর্ট তৈরি এবং মেমরি আপডেট সম্পন্ন করা।',
          tool: 'github',
          risk: 'dangerous',
          status: 'pending'
        }
      ];
    } else {
      initialPlan = JSON.parse(JSON.stringify(selectedPreset.plan));
    }

    setPlan(initialPlan);

    // Populate Working Memory
    setMemory(prev => ({
      ...prev,
      working: {
        entities: selectedInstruction === 'portfolio' ? ['React', 'Tailwind', 'GitHub Pages', 'Vite'] :
                  selectedInstruction === 'security' ? ['PostgreSQL', 'SQL Injection', 'Express', 'Drizzle'] : ['AI Benchmarks', 'Gemini API', 'Markdown', 'SMTP'],
        activeTopic: selectedInstruction === 'custom' ? 'Custom Pipeline' : selectedPreset.title,
        activeTopicBn: selectedInstruction === 'custom' ? 'কাস্টম পাইপলাইন' : selectedPreset.titleBn,
        userGoals: [targetPrompt],
        userGoalsBn: [targetPromptBn]
      }
    }));
  };

  const addLog = (type: SimulatedLog['type'], text: string, textBn: string) => {
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    setLogs(prev => [...prev, { timestamp, type, text, textBn }]);
  };

  // Run the sequential states of our loop simulation
  useEffect(() => {
    if (!isPlaying) return;

    let timer: NodeJS.Timeout;

    const runStep = () => {
      // 1. UNDERSTANDING STATE
      if (agentStatus === 'understanding') {
        addLog('thinking', '🧠 Core Reasoner: Analyzing semantic syntax to extract actionable goals...', '🧠 কোর রিজনার: লক্ষ্যগুলো নির্ধারণ করার জন্য ব্যবহারকারীর কথার ব্যাকরণ বিশ্লেষণ করা হচ্ছে...');
        timer = setTimeout(() => {
          addLog('success', '✅ User intent identified: "Sequential Task Execution Plan required".', '✅ ব্যবহারকারীর উদ্দেশ্য সনাক্ত হয়েছে: "সিকুয়েন্সিয়াল টাস্ক এক্সিকিউশন প্ল্যান প্রয়োজন"।');
          setAgentStatus('planning');
        }, 1500);
      }

      // 2. PLANNING STATE
      else if (agentStatus === 'planning') {
        addLog('thinking', '📋 Task Planner: Dividing user goal into micro-steps and checking tool coverage...', '📋 টাস্ক প্ল্যানার: মূল লক্ষ্যকে ক্ষুদ্রাতিক্ষুদ্র ধাপে ভাগ করে প্রয়োজনীয় টুল খোঁজা হচ্ছে...');
        timer = setTimeout(() => {
          addLog('success', `📋 Successfully generated execution plan containing ${plan.length} steps.`, `📋 সফলভাবে ${plan.length}টি ধাপ সম্বলিত পরিকল্পনা তৈরি করা হয়েছে।`);
          // Load memory entries
          setMemory(prev => ({
            ...prev,
            shortTerm: ['Goal: ' + prev.working.activeTopic, 'Plan Scaffolding Complete'],
            shortTermBn: ['লক্ষ্য: ' + prev.working.activeTopicBn, 'পরিকল্পনা ম্যাপিং সম্পন্ন']
          }));
          setCurrentStepIndex(0);
          setAgentStatus('executing');
        }, 1800);
      }

      // 3. EXECUTING STATE (Looping through steps)
      else if (agentStatus === 'executing') {
        if (currentStepIndex < 0 || currentStepIndex >= plan.length) {
          setAgentStatus('verifying');
          return;
        }

        const activeStep = plan[currentStepIndex];

        // Highlight the current running step
        setPlan(prev => prev.map((s, idx) => idx === currentStepIndex ? { ...s, status: 'running' } : s));
        addLog('info', `🚀 Executing Step ${currentStepIndex + 1}/${plan.length}: "${activeStep.title}"`, `🚀 ${currentStepIndex + 1}/${plan.length} নম্বর ধাপ নির্বাহ করা হচ্ছে: "${activeStep.titleBn}"`);

        // PERMISSION GATEKEEPER CHECK
        const bypassPermission = autoApproveSafe && (activeStep.risk === 'safe');
        
        if (!bypassPermission) {
          addLog('warn', `⚠️ Security Gatekeeper: Step "${activeStep.title}" requires explicit validation [Risk: ${activeStep.risk.toUpperCase()}]. Waiting for approval...`, `⚠️ সিকিউরিটি গেটকিপার: "${activeStep.titleBn}" ধাপটির জন্য অনুমোদন প্রয়োজন [ঝুঁকি: ${activeStep.risk.toUpperCase()}]।`);
          setIsPlaying(false);
          setAgentStatus('permission_pending');
          sound.playReceiveSound();
          return;
        }

        proceedExecution();
      }

      // 4. OBSERVING & DIAGNOSING STATE
      else if (agentStatus === 'observing') {
        const activeStep = plan[currentStepIndex];

        // Simulate Potential injected error
        if (injectError && currentStepIndex === 2 && retryCount < 1) {
          // Trigger self-healing
          addLog('error', `❌ Step Error: Execution failed during tool call [${errorType.toUpperCase()}].`, `❌ নির্বাহ এরর: টুল ব্যবহারের সময় বাধা সৃষ্টি হয়েছে [${errorType.toUpperCase()}]।`);
          setAgentStatus('recovering');
        } else {
          // Success
          addLog('success', `✔ Step completed successfully. Results output buffered.`, `✔ ধাপটি সফলভাবে সম্পন্ন হয়েছে। ফলাফল মেমরিতে সংরক্ষণ করা হয়েছে।`);
          setPlan(prev => prev.map((s, idx) => idx === currentStepIndex ? { ...s, status: 'completed' } : s));
          
          timer = setTimeout(() => {
            setCurrentStepIndex(prev => prev + 1);
            setAgentStatus('executing');
          }, 1200);
        }
      }

      // 5. ERROR RECOVERY STATE
      else if (agentStatus === 'recovering') {
        const activeStep = plan[currentStepIndex];
        addLog('warn', `🛠 Self-Healing Mode: Error detected on "${activeStep.title}". Attempting diagnostic recovery (Retry ${retryCount + 1}/3)...`, `🛠 সেলফ-হিলিং মোড: ত্রুটি সনাক্ত হয়েছে। স্বয়ংক্রিয় সমাধান প্রয়োগ করা হচ্ছে (চেষ্টা নম্বর ${retryCount + 1}/3)...`);
        
        timer = setTimeout(() => {
          if (errorType === 'dependency') {
            addLog('info', '🛠 Diagnostic: Missing module. Installing dependency "react-is" dynamically...', '🛠 ডায়াগনস্টিক: প্রয়োজনীয় প্যাকেজ মিসিং। ডায়নামিকভাবে "react-is" ইনস্টল করা হচ্ছে...');
          } else if (errorType === 'timeout') {
            addLog('info', '🛠 Diagnostic: Host server timeout. Re-establishing secure WebSocket stream connection...', '🛠 ডায়াগনস্টিক: হোস্ট সার্ভার টাইমআউট। পুনরায় সুরক্ষিত কানেকশন তৈরি করা হচ্ছে...');
          } else {
            addLog('info', '🛠 Diagnostic: API Rate Limit exceeded. Backing off using exponential delay (Jitter 1500ms)...', '🛠 ডায়াগনস্টিক: রিকোয়েস্ট লিমিট শেষ। এক্সপোনেনশিয়াল ডিলে সহ ব্যাক অফ মেকানিজম প্রয়োগ করা হচ্ছে...');
          }

          setRetryCount(prev => prev + 1);
          
          timer = setTimeout(() => {
            addLog('success', '✅ Self-healing recovery solution applied successfully. Re-running step...', '✅ সেলফ-হিলিং সমাধান সফলভাবে প্রয়োগ হয়েছে। পুনরায় ধাপটি রান করা হচ্ছে...');
            setAgentStatus('observing');
          }, 1500);
        }, 1500);
      }

      // 6. VERIFYING STATE
      else if (agentStatus === 'verifying') {
        addLog('thinking', '🔬 Final Verifier: Reviewing output logs against target goals and schemas...', '🔬 ফাইনাল ভেরিফায়ার: মূল লক্ষ্য এবং স্কিমার সাথে চূড়ান্ত ফলাফল মিলিয়ে দেখা হচ্ছে...');
        timer = setTimeout(() => {
          addLog('success', '🔬 Compilation success. Live website verified at: https://forhad2008.github.io/agent-ai', '🔬 কোড কম্পাইলেশন সফল। লাইভ ওয়েবসাইট ভেরিফাই করা হয়েছে: https://forhad2008.github.io/agent-ai');
          
          // Complete
          setAgentStatus('completed');
          setIsPlaying(false);
          sound.playReceiveSound();
        }, 1800);
      }
    };

    runStep();

    return () => clearTimeout(timer);
  }, [isPlaying, agentStatus, currentStepIndex, retryCount]);

  const proceedExecution = () => {
    setIsPlaying(true);
    setAgentStatus('observing');
  };

  const handleApprove = () => {
    addLog('success', '👍 User Approved: Permission Granted. Resuming Agent Execution...', '👍 ব্যবহারকারীর অনুমতি প্রাপ্ত: কোড নির্বাহ পুনরায় চালু হচ্ছে...');
    proceedExecution();
  };

  const handleDeny = () => {
    addLog('error', '🛑 User Denied: Operation blocked by Security Policy. Aborting workflow.', '🛑 অনুমতি প্রত্যাখ্যান: নিরাপত্তা পলিসি অনুযায়ী অপারেশনটি স্থগিত করা হয়েছে।');
    setPlan(prev => prev.map((s, idx) => idx === currentStepIndex ? { ...s, status: 'failed' } : s));
    setAgentStatus('failed');
    setIsPlaying(false);
  };

  const getToolIcon = (tool: PlanStep['tool']) => {
    switch (tool) {
      case 'web_search': return <Search className="h-4 w-4 text-blue-400" />;
      case 'file_system': return <FileCode className="h-4 w-4 text-purple-400" />;
      case 'code_executor': return <Terminal className="h-4 w-4 text-green-400" />;
      case 'github': return <Github className="h-4 w-4 text-slate-300" />;
      case 'email': return <Mail className="h-4 w-4 text-rose-400" />;
      case 'database': return <Database className="h-4 w-4 text-amber-400" />;
      default: return <Code className="h-4 w-4 text-indigo-400" />;
    }
  };

  const getRiskColor = (risk: PlanStep['risk']) => {
    switch (risk) {
      case 'safe': return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
      case 'sensitive': return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
      case 'dangerous': return 'text-rose-400 bg-rose-500/10 border-rose-500/20';
    }
  };

  return (
    <div className="flex h-full flex-col bg-[#02020A] text-[#F8FAFC]">
      {/* Premium Gradient Header */}
      <div className="flex shrink-0 flex-col md:flex-row items-start md:items-center justify-between border-b border-[#7C3AED]/20 bg-[#060615] px-6 py-4 space-y-3 md:space-y-0">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-[#7C3AED] to-[#4F46E5] text-white shadow-[0_0_20px_rgba(124,58,237,0.35)] animate-pulse">
            <Zap className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-base font-black uppercase tracking-wider text-white flex items-center gap-2">
              <span>{isBangla ? 'এআই এজেন্ট কোর অ্যালগরিদম' : 'AI Agent Core Algorithm Laboratory'}</span>
              <span className="text-[10px] bg-indigo-500/10 text-indigo-300 px-2 py-0.5 rounded-full border border-indigo-500/20 font-mono">v2.5</span>
            </h1>
            <p className="text-[11px] text-[#94A3B8] font-sans">
              {isBangla 
                ? 'স্বয়ংক্রিয় এআই সিদ্ধান্ত গ্রহণ (Reasoning), পরিকল্পনা (Planning), টুল ম্যাপিং এবং সেলফ-হিলিং রিকভারি লুপ টেস্ট করুন' 
                : 'Simulate autonomous task planning, multi-stage tool router mapping, gatekeeper security approvals, and self-healing loop errors'}
            </p>
          </div>
        </div>

        {/* View switcher Tabs */}
        <div className="flex rounded-xl bg-[#03030F] p-1 border border-white/5">
          {[
            { id: 'simulator', label: isBangla ? 'লুপ সিমুলেটর' : 'Execution Loop', icon: Play },
            { id: 'diagram', label: isBangla ? 'ফ্লোচার্ট আর্কিটেকচার' : 'Architecture Model', icon: Layers },
            { id: 'pseudocode', label: isBangla ? 'অ্যালগরিদম কোড' : 'Agent Core Code', icon: Code }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-semibold whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] text-white shadow-md shadow-[#7C3AED]/15'
                    : 'text-[#94A3B8] hover:bg-[#12122b] hover:text-[#F8FAFC]'
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Interactive Container */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
        {activeTab === 'simulator' && (
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 h-full items-stretch max-w-7xl mx-auto">
            
            {/* Left Column: Preset Workspace Configurator (Col 4) */}
            <div className="xl:col-span-4 flex flex-col space-y-5">
              
              {/* Card 1: Pipeline Parameters */}
              <div className="rounded-2xl bg-[#0D0D24]/80 p-5 border border-[#7C3AED]/20 shadow-xl space-y-4">
                <div className="flex items-center gap-2 border-b border-white/5 pb-3">
                  <Settings className="h-4 w-4 text-[#7C3AED]" />
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                    {isBangla ? 'ওয়ার্কস্পেস কন্ট্রোল' : 'Workspace Controller'}
                  </h3>
                </div>

                {/* Instruction Preset Selector */}
                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-wider">
                    {isBangla ? 'উদ্দেশ্য / টাস্ক নির্বাচন' : 'Instruction Goal'}
                  </label>
                  <div className="space-y-2">
                    {Object.keys(presetInstructions).map((key) => {
                      const preset = presetInstructions[key as keyof typeof presetInstructions];
                      const isSelected = selectedInstruction === key;
                      return (
                        <button
                          key={key}
                          onClick={() => {
                            setSelectedInstruction(key);
                            resetWorkspace();
                          }}
                          className={`w-full text-left p-3 rounded-xl border text-xs transition-all flex flex-col space-y-1 ${
                            isSelected
                              ? 'bg-[#181242] border-[#7C3AED] text-[#C084FC] shadow-inner'
                              : 'bg-[#060614] border-white/5 text-[#94A3B8] hover:border-white/10 hover:bg-[#0c0926]'
                          }`}
                        >
                          <span className="font-bold">{isBangla ? preset.titleBn : preset.title}</span>
                          <span className="text-[10px] text-[#94A3B8] line-clamp-1">{isBangla ? preset.promptBn : preset.prompt}</span>
                        </button>
                      );
                    })}
                    <button
                      onClick={() => {
                        setSelectedInstruction('custom');
                        resetWorkspace();
                      }}
                      className={`w-full text-left p-3 rounded-xl border text-xs transition-all flex flex-col space-y-1 ${
                        selectedInstruction === 'custom'
                          ? 'bg-[#181242] border-[#7C3AED] text-[#C084FC] shadow-inner'
                          : 'bg-[#060614] border-white/5 text-[#94A3B8] hover:border-white/10 hover:bg-[#0c0926]'
                      }`}
                    >
                      <span className="font-bold">{isBangla ? '✍ কাস্টম প্রম্পট রানার' : '✍ Custom Prompt Builder'}</span>
                      <span className="text-[10px] text-[#94A3B8] line-clamp-1">
                        {isBangla ? 'আপনার নিজের নির্দেশ টাইপ করুন এবং এআই এজেন্টের লুপ দেখুন।' : 'Type your own target goals and watch the agent create custom execution logic.'}
                      </span>
                    </button>
                  </div>
                </div>

                {/* Custom input box */}
                {selectedInstruction === 'custom' && (
                  <div className="space-y-2 pt-2 border-t border-white/5">
                    <textarea
                      rows={2}
                      value={customPrompt}
                      onChange={(e) => setCustomPrompt(e.target.value)}
                      placeholder={isBangla ? 'যেমন: কাস্টম এক্সপ্রেস সার্ভার অডিট করুন এবং ডাটাবেস আপডেট করুন।' : 'e.g. Audit express routing file, write patched schema and run schema alteration.'}
                      className="w-full bg-[#050510] text-xs p-3 rounded-xl border border-[#7C3AED]/20 focus:outline-none focus:border-[#7C3AED] text-slate-200"
                    />
                  </div>
                )}

                {/* Error Injection Switch */}
                <div className="pt-4 border-t border-white/5 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-white flex items-center gap-1.5">
                        <AlertTriangle className="h-3.5 w-3.5 text-amber-500 animate-bounce-subtle" />
                        <span>{isBangla ? 'সিমুলেটেড এরর ইনজেকশন' : 'Simulate Loop Errors'}</span>
                      </span>
                      <span className="text-[10px] text-[#94A3B8]">
                        {isBangla ? 'এজেন্টের সেলফ-হিলিং ক্ষমতা পরীক্ষা করুন' : 'Test agentic self-healing recovery loops'}
                      </span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={injectError}
                        onChange={(e) => setInjectError(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-9 h-5 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#7C3AED]" />
                    </label>
                  </div>

                  {injectError && (
                    <div className="grid grid-cols-3 gap-2 bg-[#050510] p-2 rounded-xl border border-white/5">
                      {[
                        { id: 'dependency', label: isBangla ? 'লাইব্রেরি এরর' : 'Library Fail' },
                        { id: 'timeout', label: isBangla ? 'টাইমআউট' : 'Timeout' },
                        { id: 'rate_limit', label: isBangla ? 'রেট লিমিট' : 'Rate Limit' }
                      ].map((item) => (
                        <button
                          key={item.id}
                          onClick={() => setErrorType(item.id as any)}
                          className={`py-1 text-[10px] font-bold rounded-lg border text-center transition-all ${
                            errorType === item.id
                              ? 'bg-[#181242] border-[#7C3AED] text-[#C084FC]'
                              : 'bg-transparent border-transparent text-[#94A3B8] hover:bg-white/5'
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Gatekeeper Permission setting */}
                <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-white flex items-center gap-1.5">
                      <ShieldCheck className="h-3.5 w-3.5 text-[#00D9A5]" />
                      <span>{isBangla ? 'অটো-ভেরিফাই সেফ অ্যাকশন' : 'Auto-Pass Safe Actions'}</span>
                    </span>
                    <span className="text-[10px] text-[#94A3B8]">
                      {isBangla ? 'কম ঝুঁকির টাস্কগুলোতে অটো-অনুমোদন' : 'Skip confirmation for low-risk actions'}
                    </span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={autoApproveSafe}
                      onChange={(e) => setAutoApproveSafe(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#00D9A5]" />
                  </label>
                </div>

                {/* Simulation Control Triggers */}
                <div className="pt-4 flex gap-2">
                  <button
                    onClick={startAgentLoop}
                    disabled={isPlaying || (selectedInstruction === 'custom' && !customPrompt.trim())}
                    className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] py-3 text-xs font-bold text-white shadow-lg shadow-[#7C3AED]/20 disabled:opacity-40"
                  >
                    <Play className="h-3.5 w-3.5" />
                    <span>{isBangla ? 'এজেন্ট রান করুন' : 'Run Agent Loop'}</span>
                  </button>

                  <button
                    onClick={resetWorkspace}
                    className="px-4 py-3 rounded-xl border border-white/10 text-slate-300 hover:bg-white/5 transition-all text-xs"
                    title="Reset Workspace"
                  >
                    <RotateCcw className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Card 2: Interactive Memory Vault */}
              <div className="rounded-2xl bg-[#0D0D24]/80 p-5 border border-[#7C3AED]/20 shadow-xl space-y-4 flex-1">
                <div className="flex items-center gap-2 border-b border-white/5 pb-3 justify-between">
                  <div className="flex items-center gap-2">
                    <Database className="h-4 w-4 text-[#00D9A5]" />
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                      {isBangla ? 'এজেন্ট মেমরি ভল্ট' : 'Interactive Memory Vault'}
                    </h3>
                  </div>
                  <span className="text-[9px] bg-[#00D9A5]/10 text-[#00D9A5] px-2 py-0.5 rounded border border-[#00D9A5]/20 font-mono font-bold uppercase">Dynamic</span>
                </div>

                <div className="space-y-4 text-xs font-mono">
                  {/* Short-Term Memory */}
                  <div className="space-y-1">
                    <span className="text-[10px] text-[#94A3B8] uppercase font-bold block">🧠 Short-Term Memory (Context Buffers)</span>
                    <div className="bg-[#050510] p-2.5 rounded-xl border border-white/5 min-h-[50px] text-slate-300 leading-relaxed text-[11px] space-y-1">
                      {isBangla ? (
                        memory.shortTermBn.length > 0 ? (
                          memory.shortTermBn.map((m, idx) => <div key={idx}>• {m}</div>)
                        ) : <div className="text-slate-500 text-[10px]">অস্থায়ী বা শর্ট-টার্ম ডাটা খালি। লুপ রান করলে এটি ফিল হবে।</div>
                      ) : (
                        memory.shortTerm.length > 0 ? (
                          memory.shortTerm.map((m, idx) => <div key={idx}>• {m}</div>)
                        ) : <div className="text-slate-500 text-[10px]">No transient data loaded. Start the agent logic to buffer values.</div>
                      )}
                    </div>
                  </div>

                  {/* Working Memory */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] text-[#C084FC] uppercase font-bold block">💼 Working Memory (Current Active entities)</span>
                    <div className="bg-[#050510] p-3 rounded-xl border border-[#7C3AED]/10 space-y-2">
                      <div className="flex justify-between items-center text-[10px]">
                        <span className="text-slate-400">Active Topic:</span>
                        <span className="font-bold text-white truncate max-w-[150px]">{isBangla ? memory.working.activeTopicBn : memory.working.activeTopic}</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {memory.working.entities.map((ent, idx) => (
                          <span key={idx} className="bg-[#7C3AED]/10 text-[#C084FC] px-2 py-0.5 rounded border border-[#7C3AED]/20 text-[9px] font-bold">
                            {ent}
                          </span>
                        ))}
                        {memory.working.entities.length === 0 && (
                          <span className="text-slate-500 text-[10px]">No entities extracted yet.</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Long-Term Preferences */}
                  <div className="space-y-1">
                    <span className="text-[10px] text-indigo-400 uppercase font-bold block">👤 Long-Term Memory (User Profile)</span>
                    <div className="bg-[#050510] p-2.5 rounded-xl border border-white/5 text-[10px] text-slate-400 space-y-1">
                      <div>User: <span className="text-white font-bold">{memory.longTerm.userName}</span></div>
                      <div>Role: <span className="text-slate-300">{memory.longTerm.role}</span></div>
                      <div className="truncate">Prefs: <span className="text-slate-300 text-[9px]">{memory.longTerm.preferences}</span></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Execution Workspace & Terminal Console (Col 8) */}
            <div className="xl:col-span-8 flex flex-col space-y-5 h-full">
              
              {/* Box 1: Dynamic Plan Execution visualizer */}
              <div className="rounded-2xl bg-[#0D0D24]/80 p-5 border border-[#7C3AED]/20 shadow-xl space-y-4">
                <div className="flex items-center justify-between border-b border-white/5 pb-3">
                  <div className="flex items-center gap-2">
                    <Layers className="h-4 w-4 text-[#C084FC]" />
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                      {isBangla ? 'পরিকল্পনা নির্বাহ পর্যবেক্ষণ' : 'Task Execution Strategy'}
                    </h3>
                  </div>
                  <span className="text-[11px] text-[#94A3B8]">
                    {isBangla ? `ধাপ: ${currentStepIndex + 1}/${plan.length || 0}` : `Step: ${currentStepIndex + 1}/${plan.length || 0}`}
                  </span>
                </div>

                {/* Plan Steps list */}
                <div className="space-y-2.5">
                  {plan.map((step, idx) => {
                    const isActive = idx === currentStepIndex;
                    const isCompleted = step.status === 'completed';
                    const isRunning = step.status === 'running';
                    const isFailed = step.status === 'failed';

                    return (
                      <div
                        key={step.id}
                        className={`flex items-start justify-between p-3.5 rounded-xl border transition-all ${
                          isRunning ? 'bg-[#181242]/70 border-[#7C3AED] shadow-[0_0_15px_rgba(124,58,237,0.15)] scale-[1.01]' :
                          isCompleted ? 'bg-[#061411]/50 border-emerald-500/30' :
                          isFailed ? 'bg-[#1A0914]/50 border-rose-500/30' :
                          'bg-[#050510]/50 border-white/5 opacity-50'
                        }`}
                      >
                        <div className="flex items-start gap-3 flex-1 min-w-0">
                          {/* Step number / icon */}
                          <div className={`mt-0.5 flex h-6 w-6 items-center justify-center rounded-lg font-bold font-mono text-xs shrink-0 ${
                            isCompleted ? 'bg-emerald-500/20 text-emerald-400' :
                            isRunning ? 'bg-[#7C3AED] text-white animate-pulse' :
                            isFailed ? 'bg-rose-500/20 text-rose-400' :
                            'bg-slate-800 text-slate-400'
                          }`}>
                            {isCompleted ? '✓' : isFailed ? '✕' : idx + 1}
                          </div>

                          <div className="space-y-0.5 min-w-0">
                            <h4 className="text-xs font-bold text-white truncate flex items-center gap-2">
                              <span>{isBangla ? step.titleBn : step.title}</span>
                              {step.tool !== 'none' && (
                                <span className="flex items-center gap-1 bg-slate-900 px-2 py-0.5 rounded text-[9px] border border-white/5 text-slate-400 font-mono font-bold uppercase">
                                  {getToolIcon(step.tool)}
                                  <span>{step.tool.replace('_', ' ')}</span>
                                </span>
                              )}
                            </h4>
                            <p className="text-[11px] text-[#94A3B8] leading-relaxed line-clamp-1">
                              {isBangla ? step.descBn : step.desc}
                            </p>
                          </div>
                        </div>

                        {/* Risk Factor */}
                        <div className="flex items-center gap-2 shrink-0">
                          <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase border ${getRiskColor(step.risk)}`}>
                            {step.risk}
                          </span>
                        </div>
                      </div>
                    );
                  })}

                  {plan.length === 0 && (
                    <div className="flex flex-col items-center justify-center text-center py-10 space-y-2">
                      <HelpCircle className="h-8 w-8 text-slate-600 opacity-40 animate-pulse" />
                      <div className="text-xs font-bold text-slate-400">
                        {isBangla ? 'কোনো রানিং প্ল্যান বা সিকুয়েন্স নেই।' : 'Plan Execution Slate Empty'}
                      </div>
                      <p className="text-[10px] text-[#94A3B8] max-w-xs">
                        {isBangla ? 'বামপাশ থেকে একটি টাস্ক নির্বাচন করে "এজেন্ট রান করুন" চাপুন।' : 'Select an instruction preset from the left panel and trigger the core engine loop.'}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Dynamic Interactive Gatekeeper prompt (visible only when paused on confirmation) */}
              {agentStatus === 'permission_pending' && currentStepIndex >= 0 && (
                <div className="rounded-2xl border-2 border-dashed border-amber-500/40 bg-[#16120D] p-5 shadow-[0_0_25px_rgba(245,158,11,0.1)] space-y-4 animate-luxury-pulse">
                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-500/10 text-amber-400 shrink-0">
                      <ShieldCheck className="h-5 w-5" />
                    </div>
                    <div className="space-y-1 flex-1 min-w-0">
                      <h4 className="text-xs font-black text-white uppercase tracking-wider">
                        {isBangla ? '🔒 এআই এজেন্ট সিকিউরিটি অনুমোদন গেট' : '🔒 AI Agent Security Authorization Gate'}
                      </h4>
                      <p className="text-xs text-slate-200">
                        {isBangla 
                          ? `এজেন্ট "${plan[currentStepIndex].titleBn}" নামক একটি কাজ করতে অনুমতি চাচ্ছে। এই ধাপটির রিস্ক লেভেল অত্যন্ত সংবেদনশীল।` 
                          : `The agent is requesting authorization to execute step "${plan[currentStepIndex].title}". This action possesses elevated system access rights.`}
                      </p>
                      
                      <div className="bg-[#050510] p-3 rounded-xl border border-amber-500/25 space-y-1.5 mt-3 text-xs font-mono">
                        <div className="text-amber-400 font-bold uppercase text-[10px]">Requesting Component access:</div>
                        <div className="text-white">• Component: <span className="text-[#C084FC]">{plan[currentStepIndex].tool.toUpperCase()} Agent Router</span></div>
                        <div className="text-slate-300 leading-relaxed">• Intended Operation: {isBangla ? plan[currentStepIndex].descBn : plan[currentStepIndex].desc}</div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-2">
                    <button
                      onClick={handleDeny}
                      className="px-4 py-2 rounded-xl border border-rose-500/30 text-rose-400 hover:bg-rose-500/10 text-xs font-bold transition-all"
                    >
                      {isBangla ? 'অনুমতি বাতিল (BLOCK)' : 'Deny & Block'}
                    </button>
                    <button
                      onClick={handleApprove}
                      className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-black tracking-tight shadow-md transition-all transform active:scale-95"
                    >
                      {isBangla ? 'অনুমোদন দিন (APPROVE)' : 'Approve & Resume'}
                    </button>
                  </div>
                </div>
              )}

              {/* Box 2: Premium Terminal Console Logs */}
              <div className="rounded-2xl bg-[#03030D] border border-white/5 flex flex-col flex-1 overflow-hidden min-h-[250px] shadow-inner">
                {/* Console Bar */}
                <div className="bg-[#09091A] px-4 py-2.5 border-b border-white/5 flex items-center justify-between font-mono text-[10px]">
                  <div className="flex items-center gap-2">
                    <Terminal className="h-3.5 w-3.5 text-[#00D9A5]" />
                    <span className="font-extrabold text-slate-300">CORE LOGSTREAM & THINKING TRACE</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1 text-[#00D9A5]">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#00D9A5] animate-ping" />
                      <span>ONLINE</span>
                    </span>
                    <button
                      onClick={() => setLogs([])}
                      className="text-slate-500 hover:text-white transition-all uppercase text-[9px] font-bold"
                    >
                      Clear
                    </button>
                  </div>
                </div>

                {/* Log Thread */}
                <div className="flex-1 overflow-y-auto p-4 space-y-2.5 font-mono text-[11px] max-h-[300px]">
                  {logs.map((log, idx) => (
                    <div key={idx} className="flex items-start gap-2 leading-relaxed">
                      <span className="text-slate-600 shrink-0 select-none">[{log.timestamp}]</span>
                      <span className={`shrink-0 select-none ${
                        log.type === 'error' ? 'text-rose-500' :
                        log.type === 'success' ? 'text-emerald-400' :
                        log.type === 'warn' ? 'text-amber-400' :
                        log.type === 'thinking' ? 'text-purple-400' :
                        'text-blue-400'
                      }`}>
                        {log.type === 'error' ? '[ERROR]' :
                         log.type === 'success' ? '[SUCCESS]' :
                         log.type === 'warn' ? '[SECURITY]' :
                         log.type === 'thinking' ? '[REASONER]' :
                         '[SYSTEM]'}
                      </span>
                      <span className="text-slate-200">
                        {isBangla ? log.textBn : log.text}
                      </span>
                    </div>
                  ))}

                  {/* Thinking animation loader */}
                  {isPlaying && (agentStatus === 'understanding' || agentStatus === 'planning' || agentStatus === 'recovering' || agentStatus === 'verifying') && (
                    <div className="flex items-center gap-2 text-purple-400 font-mono text-[11px] animate-pulse">
                      <RefreshCw className="h-3 w-3 animate-spin shrink-0 text-[#C084FC]" />
                      <span>{isBangla ? 'এআই এজেন্ট চিন্তা করছে ও পরবর্তী সিকুয়েন্স বিশ্লেষণ করছে...' : 'Agent Reasoner generating state transition graphs...'}</span>
                    </div>
                  )}

                  {logs.length === 0 && (
                    <div className="h-full flex items-center justify-center text-slate-600 italic text-[10px]">
                      Console streaming idle. Deploy any task program to initialize standard pipeline telemetry logs.
                    </div>
                  )}
                  <div ref={logEndRef} />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: DIAGRAM / FLOWCHART ARCHITECTURE */}
        {activeTab === 'diagram' && (
          <div className="max-w-5xl mx-auto space-y-6">
            <div className="rounded-2xl bg-[#0D0D24]/80 p-6 border border-[#7C3AED]/20 shadow-xl space-y-6">
              <div>
                <h3 className="text-base font-black text-white uppercase tracking-wider flex items-center gap-2">
                  <Layers className="h-5 w-5 text-[#C084FC]" />
                  <span>{isBangla ? 'রিজন-প্ল্যান-অ্যাক্ট স্বয়ংক্রিয় আর্কিটেকচার মডেল' : 'Reason-Plan-Act Autonomous Architecture Flow'}</span>
                </h3>
                <p className="text-xs text-[#94A3B8] mt-1">
                  {isBangla
                    ? 'আমাদের এআই এজেন্টের কাজ করার মূল আর্কিটেকচার ফ্লোচার্ট। প্রতিটি নোডে ক্লিক করে তার কাজের গভীর মেকানিজম জানুন।'
                    : 'The standard sequential state pipeline mapping how our AI agent processes incoming requests, evaluates tools, gains permissions, and self-heals.'}
                </p>
              </div>

              {/* High-fidelity CSS Flex Grid Nodes representing Flowchart */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
                {/* Node 1: User Instruction */}
                <div className="rounded-xl border border-[#7C3AED]/20 bg-[#050510] p-4 text-center space-y-2 hover:border-[#7C3AED] transition-all">
                  <div className="h-8 w-8 rounded-full bg-[#7C3AED]/15 text-[#C084FC] mx-auto flex items-center justify-center font-bold">1</div>
                  <h4 className="text-xs font-bold text-white uppercase">User Instruction</h4>
                  <p className="text-[10px] text-slate-400 leading-relaxed">Raw input triggers NLP parsing and user bio mapping.</p>
                </div>

                {/* Node 2: Core Reasoner & Intent */}
                <div className="rounded-xl border border-blue-500/20 bg-[#050510] p-4 text-center space-y-2 hover:border-blue-500 transition-all">
                  <div className="h-8 w-8 rounded-full bg-blue-500/15 text-blue-400 mx-auto flex items-center justify-center font-bold">2</div>
                  <h4 className="text-xs font-bold text-white uppercase">Core Reasoner</h4>
                  <p className="text-[10px] text-slate-400 leading-relaxed">Extracts structured objectives, intent analysis, and dependencies.</p>
                </div>

                {/* Node 3: Task Planner Scaffolding */}
                <div className="rounded-xl border border-purple-500/20 bg-[#050510] p-4 text-center space-y-2 hover:border-purple-500 transition-all">
                  <div className="h-8 w-8 rounded-full bg-purple-500/15 text-purple-400 mx-auto flex items-center justify-center font-bold">3</div>
                  <h4 className="text-xs font-bold text-white uppercase">Task Planner</h4>
                  <p className="text-[10px] text-slate-400 leading-relaxed">Slices complex requests into linear executable pipeline scripts.</p>
                </div>

                {/* Node 4: Gatekeeper Security */}
                <div className="rounded-xl border border-amber-500/20 bg-[#050510] p-4 text-center space-y-2 hover:border-amber-500 transition-all">
                  <div className="h-8 w-8 rounded-full bg-amber-500/15 text-amber-400 mx-auto flex items-center justify-center font-bold">4</div>
                  <h4 className="text-xs font-bold text-white uppercase">Gatekeeper Authorization</h4>
                  <p className="text-[10px] text-slate-400 leading-relaxed">Intercepts execution blocks of High Risk and halts for human approval.</p>
                </div>

                {/* Row 2 Nodes */}
                {/* Node 5: Tool Router Selector */}
                <div className="rounded-xl border border-[#00D9A5]/20 bg-[#050510] p-4 text-center space-y-2 hover:border-[#00D9A5] transition-all">
                  <div className="h-8 w-8 rounded-full bg-[#00D9A5]/15 text-[#00D9A5] mx-auto flex items-center justify-center font-bold">5</div>
                  <h4 className="text-xs font-bold text-white uppercase">Tool Router Agent</h4>
                  <p className="text-[10px] text-slate-400 leading-relaxed">Maps target steps to specific API integrations (GitHub, File System, SQL).</p>
                </div>

                {/* Node 6: Execution Sandbox */}
                <div className="rounded-xl border border-indigo-500/20 bg-[#050510] p-4 text-center space-y-2 hover:border-indigo-500 transition-all">
                  <div className="h-8 w-8 rounded-full bg-indigo-500/15 text-indigo-400 mx-auto flex items-center justify-center font-bold">6</div>
                  <h4 className="text-xs font-bold text-white uppercase">Execution Sandbox</h4>
                  <p className="text-[10px] text-slate-400 leading-relaxed">Dispatches operations securely and buffers stdout outputs.</p>
                </div>

                {/* Node 7: Self-Healing Recovery */}
                <div className="rounded-xl border border-rose-500/20 bg-[#050510] p-4 text-center space-y-2 hover:border-rose-500 transition-all">
                  <div className="h-8 w-8 rounded-full bg-rose-500/15 text-rose-400 mx-auto flex items-center justify-center font-bold">7</div>
                  <h4 className="text-xs font-bold text-white uppercase">Self-Healing Diagnostic</h4>
                  <p className="text-[10px] text-slate-400 leading-relaxed">Catches execution exceptions, analyzes tracebacks, and applies hot-patches up to 3 times.</p>
                </div>

                {/* Node 8: Final Verifier */}
                <div className="rounded-xl border border-emerald-500/20 bg-[#050510] p-4 text-center space-y-2 hover:border-emerald-500 transition-all">
                  <div className="h-8 w-8 rounded-full bg-emerald-500/15 text-emerald-400 mx-auto flex items-center justify-center font-bold">8</div>
                  <h4 className="text-xs font-bold text-white uppercase">Final Output Verifier</h4>
                  <p className="text-[10px] text-slate-400 leading-relaxed">Cross-checks built bundle schemas against user expectations for high reliability.</p>
                </div>
              </div>

              {/* Informative footer */}
              <div className="bg-[#050514] p-4 rounded-xl border border-[#7C3AED]/20 text-xs text-slate-300 leading-relaxed flex items-start gap-2.5">
                <Info className="h-4 w-4 text-[#C084FC] shrink-0 mt-0.5" />
                <p>
                  {isBangla
                    ? 'আর্কিটেকচার নোট: কোনো ধাপ ফেইল হলে এজেন্ট সরাসরি ক্র্যাশ করে না। এটি তার স্বয়ংক্রিয় "সেলফ-হিলিং ডায়াগনস্টিক" নোডের মাধ্যমে ত্রুটি বিশ্লেষণ করে, প্রয়োজনীয় কোড/প্যাকেজ প্যাচ ইন্সটল করে এবং পুনরায় নির্বাহ করার সর্বোচ্চ ৩টি চেষ্টা (Retry) সম্পন্ন করে।'
                    : 'Architecture Note: By coupling the gatekeeper safety layer prior to any database or external file modification, we create a secure operating boundaries ensuring dangerous code is blocked without human intervention.'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: CODE / PSEUDOCODE VIEWER */}
        {activeTab === 'pseudocode' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="rounded-2xl bg-[#0D0D24]/80 p-6 border border-[#7C3AED]/20 shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <div className="flex items-center gap-2">
                  <Code className="h-5 w-5 text-[#00D9A5]" />
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                    {isBangla ? 'এআই এজেন্টের কোর লুপ সিউডোকোড' : 'AI Agent Core Loop Pseudocode'}
                  </h3>
                </div>
                <span className="text-[10px] bg-slate-950 px-2 py-0.5 rounded text-slate-400 border border-white/5 font-mono font-bold">Python Engine Model</span>
              </div>

              {/* Syntax Highlighted Raw Code Frame */}
              <div className="bg-[#03030F] p-5 rounded-2xl border border-white/5 overflow-x-auto max-h-[500px]">
                <pre className="text-xs text-slate-300 font-mono leading-relaxed select-text">
{`# 🧠 CORE REASONING, PLANNING AND EXECUTION SYSTEM LOGIC
# DEFINED UNDER AUTONOMOUS WORKFLOWS (v2.5)

def run_agent_engine(user_instruction):
    # 1. UNDERSTAND STATE
    task_metadata = understand_intent(user_instruction)
    
    if task_metadata.type == "simple_question":
        return generate_direct_answer(task_metadata)
        
    # 2. PLANNING STATE
    execution_plan = generate_task_sequence(task_metadata)
    memory_manager.load_relevant_context(task_metadata)
    
    # 3. SEQUENCE EXECUTION LOOP
    for step_index, step in enumerate(execution_plan):
        
        # 4. GATEKEEPER SECURITY & PERMISSION SYSTEM
        if step.requires_permission or step.risk == "dangerous":
            is_authorized = gatekeeper.request_user_approval(step)
            if not is_authorized:
                return "Operation aborted by user choice."
                
        # 5. TOOL ROUTER DISPATCHING
        assigned_tool = tool_router.dispatch(step.tool_type)
        
        # 6. ACT & OBSERVE (SELF-HEALING RETRIES)
        success = False
        max_retries = 3
        
        for attempt in range(max_retries):
            execution_result = assigned_tool.execute(step.params)
            
            if execution_result.status == "success":
                success = True
                break
            else:
                # 7. ERROR RECOVERY DIAGNOSIS
                diagnosed_patch = exception_reasoner.diagnose(execution_result.traceback)
                assigned_tool.apply_patch(diagnosed_patch)
                
        if not success:
            return f"Fatal: Step failed after {max_retries} attempts."
            
    # 8. FINAL OUTPUT VERIFICATION
    is_verified = final_verifier.audit(execution_plan)
    if not is_verified:
        return recover_and_retry(execution_plan)
        
    # 9. COMMIT TO LONG TERM MEMORY
    memory_manager.save_to_profile(task_metadata, execution_plan)
    
    return generate_final_report(execution_plan)`}
                </pre>
              </div>

              <div className="text-xs text-slate-400 italic">
                {isBangla 
                  ? '💡 এই কোডটি একটি এআই এজেন্টের প্রকৃত কাজের ধারার সহজ প্রতিরূপ। এটি দেখায় কীভাবে থিঙ্কিং লুপ এবং গেটকিপার ইন্টিগ্রেশন একসাথে কাজ করে।'
                  : '💡 This represents the blueprint executable model on which agent-alpha08 runs. High fidelity compilation is handled through parallel microtask dispatch pipelines.'}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
