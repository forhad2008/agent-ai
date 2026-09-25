import React, { useState } from 'react';
import { 
  Compass, 
  MapPin, 
  MessageSquare, 
  Terminal, 
  Play, 
  Cpu, 
  Search, 
  CheckCircle, 
  HelpCircle, 
  Sliders, 
  Info, 
  ArrowRight, 
  Layers, 
  Sparkles,
  ExternalLink,
  ShieldAlert
} from 'lucide-react';
import { useAgent } from '../../context/AgentContext';

type MapNodeId = 'input' | 'router' | 'search' | 'reasoning' | 'approvals' | 'execution' | 'storage';

export const AgentMapGuideView: React.FC = () => {
  const { 
    settings, 
    tasks, 
    approvals, 
    files, 
    activities, 
    addActivity 
  } = useAgent();

  const [activeNode, setActiveNode] = useState<MapNodeId>('input');
  const [testConsoleInput, setTestConsoleInput] = useState('');
  const [consoleLogs, setConsoleLogs] = useState<string[]>([
    '[system_init] Executive Assistant OS core initialized.',
    '[persona] Active Persona set to "🛡️ Executive Assistant".',
    '[idle] Awaiting Boss\'s command...'
  ]);
  const [isSimulating, setIsSimulating] = useState(false);

  // Map Nodes description data
  const nodeDetails: Record<MapNodeId, {
    title: string;
    icon: React.ComponentType<{ className?: string }>;
    color: string;
    description: string;
    technicalFlow: string;
    liveStats: string;
    codeExample: string;
  }> = {
    input: {
      title: 'User Input & Prompts',
      icon: MessageSquare,
      color: '#3B82F6', // Blue
      description: 'The starting point where Boss Abdullah issues commands, sets targets, or queries feasibility in natural language (Bangla or English).',
      technicalFlow: 'Captured by the React client-side ChatView component and dispatched to the local workspace server `/api/chat` endpoint.',
      liveStats: `Live Workspace Volume: ${activities.length} total processed events.`,
      codeExample: 'Boss: "Make a plan to earn $140 in 1 month."'
    },
    router: {
      title: 'Intelligent Tool Router',
      icon: Sliders,
      color: '#8B5CF6', // Purple
      description: 'The router intercepts the incoming goal/plan request. It analyses keywords to decide whether external context or specific execution modules are required.',
      technicalFlow: 'Evaluates the user prompt using semantic pattern matching inside `/src/utils/toolRouter.ts` to flag any financial, task-oriented, or date-bound keywords.',
      liveStats: 'Status: Forced-search evaluation active.',
      codeExample: `// Matches: "achieve", "target", "feasible", "উপার্জন"
const isGoalOrPlan = checkGoalKeywords(prompt);`
    },
    search: {
      title: 'Forced Live Web Search',
      icon: Search,
      color: '#00D9A5', // Emerald
      description: 'In Executive Assistant mode, every plan or target strictly triggers the `webSearch` utility first. It scans real-world, current web indexes to retrieve accurate baseline facts.',
      technicalFlow: 'Performs external API lookup using Google Search. Results are fetched, parsed, and prepended into the Gemini System Instruction context.',
      liveStats: 'Targeting: Live freelancing rates, macrotask payloads, and SEO keywords.',
      codeExample: 'Search Query: "freelancing remote microtasks earning rates 2026"'
    },
    reasoning: {
      title: 'Gemini Analytical Engine & Feasibility Audit',
      icon: Cpu,
      color: '#EC4899', // Pink
      description: 'The Gemini-3.5-Flash model parses the combination of the Boss\'s goal, the Live Search facts, and the ExecutivePersona config constraints.',
      technicalFlow: 'The model executes deep cognitive reasoning, verifying mathematical feasibility. It always outputs a transparent, detailed <thinking> block.',
      liveStats: `Active Persona: "${settings.systemPersona || 'executive-assistant'}".`,
      codeExample: '<thinking>\nChecking if $140 is possible in 30 days...\nMath: $140/30 = $4.66/day.\nVerdict: Highly Feasible.\n</thinking>'
    },
    approvals: {
      title: 'Safety Approvals Sentinel',
      icon: ShieldAlert,
      color: '#F59E0B', // Amber
      description: 'If a calculated roadmap requires sensitive system actions (like creating files or setting alarms), the task is suspended into "Waiting for Approval" state.',
      technicalFlow: 'The agent registers a pending approval inside the React Context, rendering a beautiful interactive action card in the Approvals panel for the Boss to inspect and authorize.',
      liveStats: `Current Pending Approvals: ${approvals.filter(a => a.status === 'pending').length} items.`,
      codeExample: 'Action: "Create file /freelance_roadmap.txt"\nRisk Level: Low'
    },
    execution: {
      title: 'Asynchronous Task Runner',
      icon: Play,
      color: '#EF4444', // Red
      description: 'Approved tasks or direct background activities are dispatched to the Node.js runner to compile code, run tests, or execute cron tasks.',
      technicalFlow: 'Uses system commands via background sub-processes. Emits notification payloads upon early termination or task completion.',
      liveStats: `Total Managed Tasks: ${tasks.length} total.`,
      codeExample: `// Spawns async shell task
runCommand("npm run compile_applet");`
    },
    storage: {
      title: 'Workspace File System & Persistence',
      icon: CheckCircle,
      color: '#38BDF8', // Sky Blue
      description: 'Generates permanent, beautifully decorated text files, spreadsheets, and configurations inside the workspace directory.',
      technicalFlow: 'Uses the Node.js filesystem API (fs) to create directories and write files cleanly on the system, keeping the user\'s workspace fully organized.',
      liveStats: `Total Files Generated: ${files.length} items.`,
      codeExample: 'fs.writeFileSync("/workspace/plans/roadmap.md", content);'
    }
  };

  const mapConnections = [
    { from: 'input', to: 'router', color: 'from-[#3B82F6] to-[#8B5CF6]' },
    { from: 'router', to: 'search', color: 'from-[#8B5CF6] to-[#00D9A5]' },
    { from: 'search', to: 'reasoning', color: 'from-[#00D9A5] to-[#EC4899]' },
    { from: 'reasoning', to: 'approvals', color: 'from-[#EC4899] to-[#F59E0B]' },
    { from: 'approvals', to: 'execution', color: 'from-[#F59E0B] to-[#EF4444]' },
    { from: 'execution', to: 'storage', color: 'from-[#EF4444] to-[#38BDF8]' }
  ];

  const handleSimulateCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!testConsoleInput.trim() || isSimulating) return;

    const input = testConsoleInput;
    setTestConsoleInput('');
    setIsSimulating(true);

    const steps = [
      { delay: 400, text: `[user_command] Boss: "${input}"` },
      { delay: 1000, text: `[router_evaluation] Intercepting command... detected plan-oriented query.` },
      { delay: 1800, text: `[web_search_forced] Triggering live context search on Google for current 2026 indices...` },
      { delay: 2400, text: `[web_search_forced] Search complete. Context payload injected successfully into LLM.` },
      { delay: 3200, text: `[gemini_reasoning] Analytical thinking activated. Computing math and feasibility...` },
      { delay: 4000, text: `[gemini_thinking] Trace generated: "Determined that Boss's target of ${input.replace(/[^0-9]/g, '') || '$100'} is achievable using microtasks."` },
      { delay: 4600, text: `[system_action] Generating action plan and registering task in background...` },
      { delay: 5200, text: `[success] Delivery prepared. Executive response dispatched to chat.` }
    ];

    setConsoleLogs(prev => [...prev, `[client_dispatch] Dispatching: "${input}"`]);

    steps.forEach((step, idx) => {
      setTimeout(() => {
        setConsoleLogs(prev => [...prev, step.text]);
        // Update active map node during simulation to visually show routing
        if (idx === 1) setActiveNode('router');
        if (idx === 2) setActiveNode('search');
        if (idx === 4) setActiveNode('reasoning');
        if (idx === 6) setActiveNode('execution');
        if (idx === 7) {
          setActiveNode('storage');
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
              <span>Interactive Navigation & Control Map</span>
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              How Your Executive Agent Works
            </h1>
            <p className="text-xs sm:text-sm text-[#94A3B8] max-w-2xl leading-relaxed">
              Explore the real-time routing path, logical milestones, and systems architecture of your Personal AI Work OS. Click on any node in the map below to discover the exact technical processes, live system telemetry, and command syntax rules.
            </p>
          </div>
          
          {/* Live Engine Status Badge */}
          <div className="flex items-center gap-3 bg-[#0B0B1D] px-4.5 py-3 rounded-2xl border border-white/5 shadow-inner">
            <div className="relative flex h-3 w-3 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00D9A5] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#00D9A5]"></span>
            </div>
            <div>
              <span className="block text-[10px] text-[#94A3B8] font-bold uppercase tracking-wider">Work OS Core Engine</span>
              <span className="text-xs font-bold text-white">Active & Fully Armed</span>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Flow Map Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* The Map visualization (Takes 2 Columns) */}
        <div className="lg:col-span-2 rounded-2xl bg-[#09071B]/95 p-5 border border-white/5 shadow-2xl space-y-6 flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-white/5 pb-3.5">
            <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Layers className="h-4 w-4 text-blue-400" />
              <span>System Flow Routing Diagram</span>
            </span>
            <span className="text-[10px] text-[#94A3B8] font-mono">
              Click any node to inspect telemetry
            </span>
          </div>

          {/* Interactive Node Path */}
          <div className="relative py-12 px-4 flex flex-col sm:flex-row items-center justify-between gap-10 sm:gap-4 overflow-x-auto scrollbar-none min-h-[220px]">
            {/* Visual Connecting Lines between Nodes */}
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-white/5 -translate-y-1/2 hidden sm:block pointer-events-none" />

            {/* Render Nodes */}
            {Object.keys(nodeDetails).map((key) => {
              const nodeKey = key as MapNodeId;
              const node = nodeDetails[nodeKey];
              const Icon = node.icon;
              const isActive = activeNode === nodeKey;

              return (
                <button
                  key={nodeKey}
                  onClick={() => setActiveNode(nodeKey)}
                  className={`
                    relative z-10 flex flex-col items-center group transition-all duration-300 outline-none focus:outline-none
                    ${isActive ? 'scale-115' : 'hover:scale-105'}
                  `}
                >
                  {/* Glowing Node Button */}
                  <div 
                    className={`
                      flex h-14 w-14 items-center justify-center rounded-2xl transition-all duration-300 border shadow-lg
                      ${isActive 
                        ? 'scale-110 shadow-[0_0_25px_rgba(124,58,237,0.45)]' 
                        : 'bg-[#060614] border-white/10 hover:border-purple-500/30'
                      }
                    `}
                    style={{
                      backgroundColor: isActive ? `${node.color}25` : '#04030a',
                      borderColor: isActive ? node.color : 'rgba(255,255,255,0.1)'
                    }}
                  >
                    <Icon 
                      className={`h-6 w-6 transition-colors`} 
                      style={{ color: isActive ? node.color : '#94A3B8' }}
                    />

                    {/* Active Ping Dot */}
                    {isActive && (
                      <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: node.color }} />
                        <span className="relative inline-flex rounded-full h-3.5 w-3.5" style={{ backgroundColor: node.color }} />
                      </span>
                    )}
                  </div>

                  {/* Node Title */}
                  <span 
                    className={`text-[10px] font-black mt-3 text-center max-w-[80px] tracking-tight truncate transition-colors duration-200
                      ${isActive ? 'text-white' : 'text-[#64748B] group-hover:text-[#94A3B8]'}
                    `}
                  >
                    {node.title.split(' ')[0]}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Connected Route State Display */}
          <div className="bg-[#050512] rounded-xl p-3 border border-white/5 text-[11px] text-[#94A3B8] flex items-center gap-2.5">
            <span className="font-bold text-white text-[10px] uppercase tracking-wider bg-white/5 px-2 py-0.5 rounded">Current Active Route:</span>
            <div className="flex flex-wrap items-center gap-1.5 font-mono text-[10px]">
              <span className={activeNode === 'input' ? 'text-blue-400 font-bold' : ''}>Input</span>
              <ArrowRight className="h-3 w-3" />
              <span className={activeNode === 'router' ? 'text-purple-400 font-bold' : ''}>Router</span>
              <ArrowRight className="h-3 w-3" />
              <span className={activeNode === 'search' ? 'text-[#00D9A5] font-bold' : ''}>Search</span>
              <ArrowRight className="h-3 w-3" />
              <span className={activeNode === 'reasoning' ? 'text-pink-400 font-bold' : ''}>Reasoning</span>
              <ArrowRight className="h-3 w-3" />
              <span className={activeNode === 'approvals' ? 'text-amber-400 font-bold' : ''}>Approvals</span>
              <ArrowRight className="h-3 w-3" />
              <span className={activeNode === 'execution' ? 'text-red-400 font-bold' : ''}>Execution</span>
              <ArrowRight className="h-3 w-3" />
              <span className={activeNode === 'storage' ? 'text-sky-400 font-bold' : ''}>Storage</span>
            </div>
          </div>
        </div>

        {/* Selected Node Inspector Pane (Takes 1 Column) */}
        <div className="rounded-2xl bg-[#09071B]/95 p-5 border border-white/5 shadow-2xl flex flex-col justify-between space-y-4">
          <div className="flex items-center gap-2 border-b border-white/5 pb-3">
            <div 
              className="h-3 w-3 rounded-full shrink-0" 
              style={{ backgroundColor: nodeDetails[activeNode].color }}
            />
            <span className="text-xs font-bold text-white uppercase tracking-wider">
              Node Inspector
            </span>
          </div>

          <div className="space-y-3.5 flex-1 overflow-y-auto pr-1">
            <h3 className="text-base font-black text-white tracking-tight flex items-center gap-2">
              <span>{nodeDetails[activeNode].title}</span>
            </h3>

            <p className="text-xs text-[#94A3B8] leading-relaxed">
              {nodeDetails[activeNode].description}
            </p>

            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase text-[#54657E] tracking-wider block">Technical Mechanism</span>
              <div className="bg-[#050512] rounded-xl p-2.5 border border-white/5 text-[11px] text-purple-200 font-mono leading-normal">
                {nodeDetails[activeNode].technicalFlow}
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase text-[#54657E] tracking-wider block">Live Node Telemetry</span>
              <div className="bg-[#050512] rounded-xl p-2.5 border border-white/5 text-[11px] text-[#00D9A5] font-mono">
                {nodeDetails[activeNode].liveStats}
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase text-[#54657E] tracking-wider block">Input / Code Pattern Example</span>
              <div className="bg-[#050512] rounded-xl p-2.5 border border-white/5 text-[11px] text-blue-400 font-mono whitespace-pre-wrap leading-relaxed select-all">
                {nodeDetails[activeNode].codeExample}
              </div>
            </div>
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

            <div className="p-3 rounded-xl bg-[#050512] border border-white/5 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white">🛡️ Multi-Agent Crews</span>
                <span className="text-[9px] bg-pink-500/10 text-pink-300 font-mono px-2 py-0.5 rounded border border-pink-500/20">CrewAI</span>
              </div>
              <p className="text-[11px] text-[#94A3B8] leading-relaxed">
                Trigger autonomous agent tasks utilizing multi-agent systems from the AI Lab panel or chat directly.
              </p>
              <div className="text-[11px] font-mono text-purple-300 mt-1">
                "Launch the content writing Crew to write articles"
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
                {log.startsWith('[web_search_forced]') && <span className="text-[#00D9A5] font-bold">{log}</span>}
                {log.startsWith('[router_evaluation]') && <span className="text-[#A855F7] font-bold">{log}</span>}
                {log.startsWith('[gemini_reasoning]') && <span className="text-pink-400 font-bold">{log}</span>}
                {log.startsWith('[gemini_thinking]') && <span className="text-amber-300 font-bold">{log}</span>}
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
              placeholder="e.g., Earn $500 in 1 month"
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
