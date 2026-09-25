import React, { useState } from 'react';
import { 
  Compass, 
  MessageSquare, 
  Terminal, 
  Play, 
  Cpu, 
  Search, 
  CheckCircle, 
  Sliders, 
  ArrowRight, 
  Layers, 
  Sparkles,
  ShieldAlert,
  FolderTree,
  RotateCcw,
  Workflow,
  Code2,
  Database,
  Network
} from 'lucide-react';
import { useAgent } from '../../context/AgentContext';

type ActiveFlowTab = 'visual' | 'ascii';

export const AgentMapGuideView: React.FC = () => {
  const { 
    settings, 
    tasks, 
    approvals, 
    files, 
    activities, 
    addActivity 
  } = useAgent();

  const [activeTab, setActiveTab] = useState<ActiveFlowTab>('visual');
  const [selectedElement, setSelectedElement] = useState<string>('USER');
  const [testConsoleInput, setTestConsoleInput] = useState('');
  const [consoleLogs, setConsoleLogs] = useState<string[]>([
    '[system_init] Executive Assistant OS core initialized.',
    '[persona] Active Persona set to "🛡️ Executive Assistant".',
    '[idle] Awaiting Boss\'s command...'
  ]);
  const [isSimulating, setIsSimulating] = useState(false);

  // Workflow element details
  const workflowDetails: Record<string, {
    title: string;
    role: string;
    mechanism: string;
    state: string;
  }> = {
    'USER': {
      title: 'User Interface (Boss)',
      role: 'Issues commands, targets, or custom code requirements.',
      mechanism: 'Dispatched directly from the client chat box or API triggers in either Bangla or English.',
      state: 'Awaiting Command Input'
    },
    'INPUT_HANDLER': {
      title: 'Input Handler Protocol',
      role: 'Sanitizes and normalizes the incoming instruction payload.',
      mechanism: 'Strips malicious commands, evaluates system locale language, and prepares state tags.',
      state: 'Input Verified'
    },
    'INTENT_ANALYZER': {
      title: 'Intent Analyzer Engine',
      role: 'Decides if the prompt is a goal, command, file edit, or database query.',
      mechanism: 'Utilizes semantic parsing on keywords like "earn", "budget", "plan", and "create file".',
      state: 'Intent Scanned'
    },
    'TASK_PLANNER': {
      title: 'Task Planner & Compiler',
      role: 'Breaks down complex requirements into multiple manageable sub-tasks.',
      mechanism: 'Constructs an optimized execution tree mapping sequential steps needed to fulfill the main goal.',
      state: 'Task Pipeline Generated'
    },
    'PERMISSION_MANAGER': {
      title: 'Permission Manager Sentinel',
      role: 'Audits tasks requiring file writes, CLI commands, or critical configuration updates.',
      mechanism: 'Suspends execution and triggers visual approval modals in the UI if limits are exceeded.',
      state: `Active Pending Approvals: ${approvals.filter(a => a.status === 'pending').length}`
    },
    'MEMORY_MANAGER': {
      title: 'Memory Manager Context Loader',
      role: 'Loads vector context, history databases, and local workspace profile files.',
      mechanism: 'Performs semantic searches over past activities, keeping the agent contextually grounded.',
      state: `History Loaded (${activities.length} entries)`
    },
    'TOOL_ROUTER': {
      title: 'Intelligent Tool Router',
      role: 'Directs organized sub-tasks to correct system executables and external modules.',
      mechanism: 'Decides between browser lookup, workspace writing, shell compiler, or multi-agent crews.',
      state: 'Ready to Dispatch'
    },
    'TOOLS_BRANCH': {
      title: 'Executive Tool Suite (Browser, Files, Code, APIs, GitHub)',
      role: 'Executes actions on real files, web, and APIs.',
      mechanism: 'Browser: Web search engine. Files: Direct workspace access. Code: Compiler tests. APIs: Webhook integrations.',
      state: `${files.length} Files present inside Workspace`
    },
    'RESULT_OBSERVER': {
      title: 'Result Observer & Standard Error Capturer',
      role: 'Monitors the output logs and exit statuses of execution processes.',
      mechanism: 'Reads stdout, stderr, file write flags, and API status codes to detect any issues.',
      state: 'Observing Active Task Logs'
    },
    'VERIFY': {
      title: 'Verification & Safety Auditor',
      role: 'Evaluates the quality and correctness of results against constraints.',
      mechanism: 'Validates code syntax using linters and checks file existence or data formats.',
      state: 'Awaiting Audit Signature'
    },
    'RECOVERY': {
      title: 'Self-Healing & Recovery Loop',
      role: 'Executes fallback correction actions if a sub-task throws errors.',
      mechanism: 'Automated retry strategies with rewritten prompts or secondary tool routing paths.',
      state: 'Idle'
    },
    'FINAL_RESPONSE': {
      title: 'Final Executive Response Delivery',
      role: 'Constructs the formatted executive roadmap briefing for Boss Abdullah.',
      mechanism: 'Presents the transparent analytical trace and action tables in high-fidelity markdown.',
      state: 'Dispatched to Chat UI'
    }
  };

  const asciiWorkflow = `
                    ┌──────────────────┐
                    │      USER        │
                    └────────┬─────────┘
                             ↓
                    ┌──────────────────┐
                    │  INPUT HANDLER   │
                    └────────┬─────────┘
                             ↓
                    ┌──────────────────┐
                    │ INTENT ANALYZER  │
                    └────────┬─────────┘
                             ↓
                    ┌──────────────────┐
                    │  TASK PLANNER    │
                    └────────┬─────────┘
                             ↓
                 ┌───────────┴───────────┐
                 ↓                       ↓
        ┌─────────────────┐     ┌─────────────────┐
        │ PERMISSION      │     │ MEMORY MANAGER  │
        │ MANAGER         │     │                 │
        └────────┬────────┘     └────────┬────────┘
                 └───────────┬───────────┘
                             ↓
                    ┌──────────────────┐
                    │   TOOL ROUTER    │
                    └────────┬─────────┘
                             ↓
       ┌──────────┬──────────┼──────────┬──────────┐
       ↓          ↓          ↓          ↓          ↓
    Browser     Files      Code       GitHub     APIs
       │          │          │          │          │
       └──────────┴──────────┴──────────┴──────────┘
                             ↓
                    ┌──────────────────┐
                    │ RESULT OBSERVER  │
                    └────────┬─────────┘
                             ↓
                    ┌──────────────────┐
                    │     VERIFY       │
                    └────────┬─────────┘
                             ↓
                       ┌─────┴─────┐
                       │ SUCCESS?  │
                       └─────┬─────┘
                         NO  │  YES
                       ┌─────┘    └──────┐
                       ↓                 ↓
                  RECOVERY          FINAL RESPONSE
                       │                 │
                       └──────►──────────┘
  `;

  const handleSimulateCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!testConsoleInput.trim() || isSimulating) return;

    const input = testConsoleInput;
    setTestConsoleInput('');
    setIsSimulating(true);

    const steps = [
      { delay: 300, element: 'USER', text: `[user_command] Boss: "${input}"` },
      { delay: 800, element: 'INPUT_HANDLER', text: `[input_handler] Payload received, sanitized, and locale tags evaluated.` },
      { delay: 1400, element: 'INTENT_ANALYZER', text: `[intent_analyzer] Prompt parsed... Goal-oriented target detected.` },
      { delay: 2000, element: 'TASK_PLANNER', text: `[task_planner] Planning 3 execution steps. Synchronizing system requirements.` },
      { delay: 2600, element: 'MEMORY_MANAGER', text: `[memory_manager] Context loaded. Synchronized past targets and preferences.` },
      { delay: 3200, element: 'PERMISSION_MANAGER', text: `[permission_manager] Checking rules... Auto-approved search and local output parameters.` },
      { delay: 3800, element: 'TOOL_ROUTER', text: `[tool_router] Matching tool parameters... Dispatching query to forced web_search utility.` },
      { delay: 4400, element: 'TOOLS_BRANCH', text: `[browser_tool] Web Search: Triggering live search on Google indexes for real-time rates.` },
      { delay: 5000, element: 'RESULT_OBSERVER', text: `[result_observer] Search output collected. Parsing payload parameters into system engine...` },
      { delay: 5600, element: 'VERIFY', text: `[verify] Verifying JSON formats and logical parameters against mathematical target.` },
      { delay: 6200, element: 'FINAL_RESPONSE', text: `[success] Formulated detailed strategic roadmap. Presenting finalized briefing to chat UI.` }
    ];

    setConsoleLogs(prev => [...prev, `[client_dispatch] Dispatching sequence to Agent OS core...`]);

    steps.forEach((step) => {
      setTimeout(() => {
        setConsoleLogs(prev => [...prev, step.text]);
        setSelectedElement(step.element);
        if (step.element === 'FINAL_RESPONSE') {
          setIsSimulating(false);
          addActivity({
            id: `sim-${Date.now()}`,
            timestamp: new Date().toLocaleTimeString(),
            label: `Simulation: "${input}"`,
            type: 'tool',
            status: 'completed',
            details: 'Interactive guide flow routing test completed successfully.'
          });
        }
      }, step.delay);
    });
  };

  return (
    <div className="mx-auto max-w-[1400px] space-y-8 p-4 sm:p-6 lg:p-8 animate-fade-in pb-20">
      
      {/* Premium Header Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-purple-500/20 bg-[#070514]/80 p-6 sm:p-8 shadow-2xl">
        <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-gradient-to-br from-[#7C3AED]/25 to-transparent blur-3xl" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-purple-500/10 px-3 py-1 text-xs font-bold text-purple-300 border border-purple-500/20 uppercase tracking-widest">
              <Compass className="h-3 w-3 text-purple-400 animate-spin-slow" />
              <span>Interactive Navigation & Workflow Map</span>
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Work OS Agent Workflow Map
            </h1>
            <p className="text-xs sm:text-sm text-[#94A3B8] max-w-2xl leading-relaxed">
              Explore how your Executive Assistant processes your commands. Follow the complete pipeline from intent evaluation, safety audits, and live search tools, to logical outcome verification and self-healing recovery loops.
            </p>
          </div>
          
          {/* Tab Switcher for Visual / Retro ASCII */}
          <div className="flex bg-[#050512] p-1.5 rounded-2xl border border-white/5 shadow-inner shrink-0">
            <button
              onClick={() => setActiveTab('visual')}
              className={`px-4.5 py-2 rounded-xl text-xs font-bold transition-all ${activeTab === 'visual' ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md' : 'text-[#94A3B8] hover:text-white'}`}
            >
              Visual Schema
            </button>
            <button
              onClick={() => setActiveTab('ascii')}
              className={`px-4.5 py-2 rounded-xl text-xs font-bold transition-all font-mono ${activeTab === 'ascii' ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md' : 'text-[#94A3B8] hover:text-white'}`}
            >
              ASCII Retro
            </button>
          </div>
        </div>
      </div>

      {/* Main Workflow Sandbox Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Visual Map Layout Panel */}
        <div className="lg:col-span-2 rounded-2xl bg-[#09071B]/95 p-5 border border-white/5 shadow-2xl flex flex-col justify-between min-h-[500px]">
          <div className="flex items-center justify-between border-b border-white/5 pb-3.5">
            <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Layers className="h-4 w-4 text-purple-400" />
              <span>Live Interactive Pipeline View</span>
            </span>
            <span className="text-[10px] text-[#94A3B8] font-mono">
              Click elements to inspect workflow stage
            </span>
          </div>

          <div className="flex-1 py-6 overflow-y-auto max-h-[600px] scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/5">
            {activeTab === 'ascii' ? (
              /* ASCII RETRO ART SCHEMATIC MODE */
              <div className="flex items-center justify-center p-3 sm:p-5 bg-[#03020A] rounded-2xl border border-white/5">
                <pre className="font-mono text-[9px] xs:text-[10px] sm:text-xs leading-normal text-[#C084FC] select-all overflow-x-auto w-full">
                  {asciiWorkflow}
                </pre>
              </div>
            ) : (
              /* INTERACTIVE VISUAL BOX SCHEMATIC MODE */
              <div className="space-y-4 max-w-lg mx-auto py-2">
                {/* User Input */}
                <div className="flex flex-col items-center">
                  <button
                    onClick={() => setSelectedElement('USER')}
                    className={`px-6 py-2.5 rounded-xl font-bold text-xs border transition-all duration-200 outline-none
                      ${selectedElement === 'USER' ? 'bg-blue-600/20 border-blue-500 text-white shadow-[0_0_15px_rgba(59,130,246,0.3)]Scale-105' : 'bg-[#050512] border-white/10 text-[#94A3B8] hover:border-blue-500/50'}`}
                  >
                    👤 USER / BOSS ABDULLAH
                  </button>
                  <div className="h-6 w-[2px] bg-gradient-to-b from-blue-500 to-purple-500" />
                </div>

                {/* Input Handler */}
                <div className="flex flex-col items-center">
                  <button
                    onClick={() => setSelectedElement('INPUT_HANDLER')}
                    className={`px-6 py-2.5 rounded-xl font-bold text-xs border transition-all duration-200 outline-none
                      ${selectedElement === 'INPUT_HANDLER' ? 'bg-purple-600/20 border-purple-500 text-white shadow-[0_0_15px_rgba(139,92,246,0.3)]Scale-105' : 'bg-[#050512] border-white/10 text-[#94A3B8] hover:border-purple-500/50'}`}
                  >
                    📥 INPUT HANDLER
                  </button>
                  <div className="h-6 w-[2px] bg-gradient-to-b from-purple-500 to-indigo-500" />
                </div>

                {/* Intent Analyzer */}
                <div className="flex flex-col items-center">
                  <button
                    onClick={() => setSelectedElement('INTENT_ANALYZER')}
                    className={`px-6 py-2.5 rounded-xl font-bold text-xs border transition-all duration-200 outline-none
                      ${selectedElement === 'INTENT_ANALYZER' ? 'bg-indigo-600/20 border-indigo-500 text-white shadow-[0_0_15px_rgba(99,102,241,0.3)]Scale-105' : 'bg-[#050512] border-white/10 text-[#94A3B8] hover:border-indigo-500/50'}`}
                  >
                    🔍 INTENT ANALYZER
                  </button>
                  <div className="h-6 w-[2px] bg-gradient-to-b from-indigo-500 to-pink-500" />
                </div>

                {/* Task Planner */}
                <div className="flex flex-col items-center">
                  <button
                    onClick={() => setSelectedElement('TASK_PLANNER')}
                    className={`px-6 py-2.5 rounded-xl font-bold text-xs border transition-all duration-200 outline-none
                      ${selectedElement === 'TASK_PLANNER' ? 'bg-pink-600/20 border-pink-500 text-white shadow-[0_0_15px_rgba(236,72,153,0.3)]Scale-105' : 'bg-[#050512] border-white/10 text-[#94A3B8] hover:border-pink-500/50'}`}
                  >
                    📋 TASK PLANNER
                  </button>
                  {/* Branching Lines */}
                  <div className="relative w-full h-8 flex justify-center">
                    <div className="absolute top-0 bottom-0 w-[2px] bg-pink-500" />
                    <div className="absolute top-1/2 left-1/4 right-1/4 h-[2px] bg-pink-500" />
                    <div className="absolute top-1/2 bottom-0 left-1/4 w-[2px] bg-pink-500" />
                    <div className="absolute top-1/2 bottom-0 right-1/4 w-[2px] bg-pink-500" />
                  </div>
                </div>

                {/* Parallel: Permission Manager & Memory Manager */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col items-center">
                    <button
                      onClick={() => setSelectedElement('PERMISSION_MANAGER')}
                      className={`w-full py-2.5 rounded-xl font-bold text-center text-xs border transition-all duration-200 outline-none
                        ${selectedElement === 'PERMISSION_MANAGER' ? 'bg-amber-600/20 border-amber-500 text-white shadow-[0_0_15px_rgba(245,158,11,0.3)]' : 'bg-[#050512] border-white/10 text-[#94A3B8] hover:border-amber-500/50'}`}
                    >
                      🛡️ PERMISSION MANAGER
                    </button>
                    <div className="h-8 w-[2px] bg-amber-500" />
                  </div>

                  <div className="flex flex-col items-center">
                    <button
                      onClick={() => setSelectedElement('MEMORY_MANAGER')}
                      className={`w-full py-2.5 rounded-xl font-bold text-center text-xs border transition-all duration-200 outline-none
                        ${selectedElement === 'MEMORY_MANAGER' ? 'bg-teal-600/20 border-teal-500 text-white shadow-[0_0_15px_rgba(20,184,166,0.3)]' : 'bg-[#050512] border-white/10 text-[#94A3B8] hover:border-teal-500/50'}`}
                    >
                      🧠 MEMORY MANAGER
                    </button>
                    <div className="h-8 w-[2px] bg-teal-500" />
                  </div>
                </div>

                {/* Join from Parallel to Tool Router */}
                <div className="relative w-full h-8 flex justify-center">
                  <div className="absolute top-0 bottom-0 w-[2px] bg-purple-500" />
                  <div className="absolute top-0 h-[2px] left-1/4 right-1/4 bg-purple-500" />
                  <div className="absolute top-0 bottom-0 left-1/4 w-[2px] bg-amber-500/50" />
                  <div className="absolute top-0 bottom-0 right-1/4 w-[2px] bg-teal-500/50" />
                </div>

                {/* Tool Router */}
                <div className="flex flex-col items-center">
                  <button
                    onClick={() => setSelectedElement('TOOL_ROUTER')}
                    className={`px-8 py-2.5 rounded-xl font-bold text-xs border transition-all duration-200 outline-none
                      ${selectedElement === 'TOOL_ROUTER' ? 'bg-purple-600/20 border-purple-500 text-white shadow-[0_0_15px_rgba(168,85,247,0.3)]Scale-105' : 'bg-[#050512] border-white/10 text-[#94A3B8] hover:border-purple-500/50'}`}
                  >
                    ⚙️ TOOL ROUTER
                  </button>
                  {/* Tool branches */}
                  <div className="relative w-full h-8 flex justify-center">
                    <div className="absolute top-0 bottom-0 w-[2px] bg-purple-500" />
                    <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-purple-500" />
                    <div className="absolute top-1/2 bottom-0 left-0 w-[2px] bg-purple-500" />
                    <div className="absolute top-1/2 bottom-0 left-1/4 w-[2px] bg-purple-500" />
                    <div className="absolute top-1/2 bottom-0 right-1/4 w-[2px] bg-purple-500" />
                    <div className="absolute top-1/2 bottom-0 right-0 w-[2px] bg-purple-500" />
                  </div>
                </div>

                {/* 5 Tools row */}
                <div className="grid grid-cols-5 gap-1.5 pt-1">
                  {['Browser', 'Files', 'Code', 'GitHub', 'APIs'].map((tool) => (
                    <button
                      key={tool}
                      onClick={() => setSelectedElement('TOOLS_BRANCH')}
                      className={`py-1.5 rounded-lg text-[9px] sm:text-[10px] font-bold text-center border transition-all
                        ${selectedElement === 'TOOLS_BRANCH' ? 'bg-[#7C3AED]/20 border-purple-500 text-white' : 'bg-[#050512] border-white/5 text-[#94A3B8]'}`}
                    >
                      {tool}
                    </button>
                  ))}
                </div>

                {/* Combine Tools to Result Observer */}
                <div className="relative w-full h-8 flex justify-center">
                  <div className="absolute top-0 bottom-0 w-[2px] bg-purple-500" />
                  <div className="absolute top-0 h-[2px] left-0 right-0 bg-purple-500" />
                  <div className="absolute top-0 bottom-0 left-0 w-[2px] bg-purple-500/20" />
                  <div className="absolute top-0 bottom-0 left-1/4 w-[2px] bg-purple-500/20" />
                  <div className="absolute top-0 bottom-0 right-1/4 w-[2px] bg-purple-500/20" />
                  <div className="absolute top-0 bottom-0 right-0 w-[2px] bg-purple-500/20" />
                </div>

                {/* Result Observer */}
                <div className="flex flex-col items-center">
                  <button
                    onClick={() => setSelectedElement('RESULT_OBSERVER')}
                    className={`px-6 py-2.5 rounded-xl font-bold text-xs border transition-all duration-200 outline-none
                      ${selectedElement === 'RESULT_OBSERVER' ? 'bg-orange-600/20 border-orange-500 text-white shadow-[0_0_15px_rgba(249,115,22,0.3)]Scale-105' : 'bg-[#050512] border-white/10 text-[#94A3B8] hover:border-orange-500/50'}`}
                  >
                    📊 RESULT OBSERVER
                  </button>
                  <div className="h-6 w-[2px] bg-gradient-to-b from-orange-500 to-[#00D9A5]" />
                </div>

                {/* Verify */}
                <div className="flex flex-col items-center">
                  <button
                    onClick={() => setSelectedElement('VERIFY')}
                    className={`px-6 py-2.5 rounded-xl font-bold text-xs border transition-all duration-200 outline-none
                      ${selectedElement === 'VERIFY' ? 'bg-[#00D9A5]/20 border-[#00D9A5] text-white shadow-[0_0_15px_rgba(0,217,165,0.3)]Scale-105' : 'bg-[#050512] border-white/10 text-[#94A3B8] hover:border-[#00D9A5]/50'}`}
                  >
                    🛡️ VERIFY AUDIT
                  </button>
                  <div className="h-6 w-[2px] bg-[#00D9A5]" />
                </div>

                {/* Success Split Decision */}
                <div className="relative w-full flex flex-col items-center">
                  {/* Success Node */}
                  <div className="px-5 py-1.5 rounded-xl bg-[#03020A] border border-[#00D9A5]/40 text-[#00D9A5] text-[10px] font-black font-mono">
                    SUCCESS?
                  </div>
                  {/* Decision branches */}
                  <div className="relative w-full h-8 flex justify-center">
                    <div className="absolute top-0 bottom-0 left-[30%] w-[2px] bg-red-500" />
                    <div className="absolute top-0 bottom-0 right-[30%] w-[2px] bg-emerald-500" />
                    <div className="absolute top-0 h-[2px] left-[30%] right-[30%] bg-white/10" />
                  </div>

                  {/* Yes / No Endpoints */}
                  <div className="grid grid-cols-2 gap-20 w-full px-4">
                    <div className="flex flex-col items-center">
                      <span className="text-[9px] font-bold text-red-400 font-mono mb-1">NO (RETRY)</span>
                      <button
                        onClick={() => setSelectedElement('RECOVERY')}
                        className={`w-full py-2 rounded-xl font-bold text-center text-xs border transition-all
                          ${selectedElement === 'RECOVERY' ? 'bg-red-600/20 border-red-500 text-white' : 'bg-[#050512] border-white/10 text-[#94A3B8]'}`}
                      >
                        🔄 RECOVERY LOOP
                      </button>
                    </div>

                    <div className="flex flex-col items-center">
                      <span className="text-[9px] font-bold text-green-400 font-mono mb-1">YES (COMPLETE)</span>
                      <button
                        onClick={() => setSelectedElement('FINAL_RESPONSE')}
                        className={`w-full py-2 rounded-xl font-bold text-center text-xs border transition-all
                          ${selectedElement === 'FINAL_RESPONSE' ? 'bg-emerald-600/20 border-emerald-500 text-white' : 'bg-[#050512] border-white/10 text-[#94A3B8]'}`}
                      >
                        🏆 FINAL RESPONSE
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            )}
          </div>
        </div>

        {/* Selected Element Inspector Pane */}
        <div className="rounded-2xl bg-[#09071B]/95 p-5 border border-white/5 shadow-2xl flex flex-col justify-between space-y-4">
          <div className="flex items-center gap-2 border-b border-white/5 pb-3">
            <div className="h-3 w-3 rounded-full shrink-0 bg-purple-500 animate-pulse" />
            <span className="text-xs font-bold text-white uppercase tracking-wider">
              Architecture Inspector
            </span>
          </div>

          <div className="space-y-4 flex-1">
            <h3 className="text-base font-black text-white tracking-tight">
              {workflowDetails[selectedElement]?.title || 'Select any node'}
            </h3>

            <div className="space-y-3 text-xs leading-relaxed text-[#94A3B8]">
              <div>
                <span className="text-[10px] font-bold uppercase text-slate-500 tracking-wider block mb-0.5">Core Responsibility</span>
                <p className="text-white font-medium">{workflowDetails[selectedElement]?.role}</p>
              </div>

              <div>
                <span className="text-[10px] font-bold uppercase text-slate-500 tracking-wider block mb-0.5">Execution Mechanism</span>
                <p className="bg-[#050512] p-3 rounded-xl border border-white/5 text-[11px] font-mono text-purple-200">
                  {workflowDetails[selectedElement]?.mechanism}
                </p>
              </div>

              <div>
                <span className="text-[10px] font-bold uppercase text-slate-500 tracking-wider block mb-0.5">Active State / Telemetry</span>
                <p className="text-[#00D9A5] font-mono text-[11px] font-semibold">
                  ● {workflowDetails[selectedElement]?.state}
                </p>
              </div>
            </div>
          </div>

          {/* Interactive Help banner */}
          <div className="p-3 bg-purple-500/5 rounded-xl border border-purple-500/10 text-[10px] text-[#A78BFA] leading-normal">
            ⚙️ **Architecture Tip:** In *ExecutivePersona* mode, the **Tool Router** will prioritize web_search logic for financial targets before dispatching to the Verify layer.
          </div>
        </div>

      </div>

      {/* Guide: How to Command and Chat Like a Pro */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Commands & Cheat Sheet Panel */}
        <div className="rounded-2xl bg-[#09071B]/95 p-5 border border-white/5 shadow-2xl space-y-4">
          <div className="border-b border-white/5 pb-3">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Terminal className="h-4 w-4 text-purple-400" />
              <span>Executive Command Desk & Cheat Sheet</span>
            </h2>
          </div>

          <p className="text-xs text-[#94A3B8] leading-relaxed">
            Your Executive Assistant is designed to understand direct orders, questions, and parameters in plain language. Use these structured command patterns inside the chat for ultra-precise results:
          </p>

          <div className="space-y-3.5 max-h-[380px] overflow-y-auto pr-1">
            <div className="p-3 rounded-xl bg-[#050512] border border-white/5 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white">💰 Financial Goals & Feasibility</span>
                <span className="text-[9px] bg-blue-500/10 text-blue-300 font-mono px-2 py-0.5 rounded border border-blue-500/20">Forced Search</span>
              </div>
              <p className="text-[11px] text-[#94A3B8] leading-relaxed">
                Provide an amount and time limit. The agent searches live rates, validates feasibility, and constructs a detailed action table.
              </p>
              <div className="text-[11px] font-mono text-purple-300 mt-1">
                "আয় $৫০০ ইন ২ মাস" / "How to earn $140 in 1 month"
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#050512] border border-white/5 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white">📁 Advanced File Creation</span>
                <span className="text-[9px] bg-emerald-500/10 text-emerald-300 font-mono px-2 py-0.5 rounded border border-emerald-500/20">Task Engine</span>
              </div>
              <p className="text-[11px] text-[#94A3B8] leading-relaxed">
                Directly ask the agent to write customized code, templates, scripts, or plans directly into files.
              </p>
              <div className="text-[11px] font-mono text-purple-300 mt-1">
                "Create a python web scraper file to collect business leads"
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#050512] border border-white/5 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white">⏰ Alarm & Cron Jobs</span>
                <span className="text-[9px] bg-purple-500/10 text-purple-300 font-mono px-2 py-0.5 rounded border border-purple-500/20">Background Cron</span>
              </div>
              <p className="text-[11px] text-[#94A3B8] leading-relaxed">
                Ask the agent to set custom timer alerts, recurring schedules, or cron jobs directly from the chat.
              </p>
              <div className="text-[11px] font-mono text-purple-300 mt-1">
                "Set an alarm for 10:00 PM called Daily Strategy Sync"
              </div>
            </div>
          </div>
        </div>

        {/* Live Simulation Console */}
        <div className="rounded-2xl bg-[#09071B]/95 p-5 border border-white/5 shadow-2xl flex flex-col justify-between space-y-4">
          <div className="border-b border-white/5 pb-3">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Terminal className="h-4 w-4 text-[#00D9A5]" />
              <span>Interactive Command Terminal Simulator</span>
            </h2>
          </div>

          <p className="text-xs text-[#94A3B8] leading-relaxed">
            Test any command in the simulator below to visually see how the Work OS routes the signal, triggers the live web search engine, and computes the solution:
          </p>

          {/* Interactive Logs Shell Screen */}
          <div className="flex-1 bg-[#04030B] rounded-2xl p-4 border border-white/5 font-mono text-[11px] leading-relaxed text-[#94A3B8] min-h-[220px] max-h-[260px] overflow-y-auto space-y-1.5 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10 select-all">
            {consoleLogs.map((log, i) => (
              <div key={i} className="whitespace-pre-wrap">
                {log.startsWith('[user_command]') && <span className="text-blue-400 font-bold">{log}</span>}
                {log.startsWith('[input_handler]') && <span className="text-[#00D9A5] font-bold">{log}</span>}
                {log.startsWith('[intent_analyzer]') && <span className="text-[#A855F7] font-bold">{log}</span>}
                {log.startsWith('[task_planner]') && <span className="text-pink-400 font-bold">{log}</span>}
                {log.startsWith('[memory_manager]') && <span className="text-teal-400 font-bold">{log}</span>}
                {log.startsWith('[permission_manager]') && <span className="text-amber-400 font-bold">{log}</span>}
                {log.startsWith('[tool_router]') && <span className="text-purple-400 font-bold">{log}</span>}
                {log.startsWith('[browser_tool]') && <span className="text-blue-300 font-bold">{log}</span>}
                {log.startsWith('[result_observer]') && <span className="text-orange-400 font-bold">{log}</span>}
                {log.startsWith('[verify]') && <span className="text-[#00D9A5] font-bold">{log}</span>}
                {log.startsWith('[success]') && <span className="text-[#00D9A5] font-bold">{log}</span>}
                {log.startsWith('[client_dispatch]') && <span className="text-[#94A3B8] font-bold">{log}</span>}
                {!log.startsWith('[') && <span>{log}</span>}
              </div>
            ))}
            {isSimulating && (
              <div className="flex items-center gap-2 text-purple-400 font-bold animate-pulse mt-1">
                <span>&gt;_ Agent computing in background...</span>
              </div>
            )}
          </div>

          <form onSubmit={handleSimulateCommand} className="flex gap-2">
            <input
              type="text"
              value={testConsoleInput}
              disabled={isSimulating}
              onChange={(e) => setTestConsoleInput(e.target.value)}
              placeholder="e.g., Create a freelance audit"
              className="flex-1 rounded-xl bg-[#050512] px-3.5 py-2.5 text-xs text-[#F8FAFC] border border-[rgba(139,92,246,0.2)] focus:outline-none focus:border-[#7C3AED] disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={isSimulating || !testConsoleInput.trim()}
              className="rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 px-4 text-xs font-bold text-white shadow-lg transition-all disabled:opacity-50 flex items-center gap-1.5 cursor-pointer"
            >
              <Play className="h-3 w-3 shrink-0" />
              <span>Route</span>
            </button>
          </form>
        </div>

      </div>

    </div>
  );
};
