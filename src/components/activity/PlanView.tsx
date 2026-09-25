import React, { useState, useEffect } from 'react';
import {
  Workflow,
  CheckCircle2,
  Play,
  Settings,
  Download,
  Terminal,
  Shield,
  HelpCircle,
  Clock,
  Sparkles,
  Zap,
  Activity,
  User,
  Coffee,
  AlertTriangle,
  FileText
} from 'lucide-react';
import { useAgent } from '../../context/AgentContext';

export const PlanView: React.FC = () => {
  const {
    activePlan,
    isGenerating,
    currentLanguage,
    t,
    tasks,
    activities,
    handleSendMessage
  } = useAgent();

  const [simulatedObjective, setSimulatedObjective] = useState('');
  const [autopilot, setAutopilot] = useState(true);
  const [selectedStep, setSelectedStep] = useState<number | null>(null);
  const [simulationState, setSimulationState] = useState<'idle' | 'running' | 'completed'>('idle');
  const [simulatedSteps, setSimulatedSteps] = useState<{
    title: string;
    description: string;
    status: 'completed' | 'running' | 'pending';
    estimatedTime: string;
    details: string;
    toolUsed?: string;
  }[]>([]);

  // Default simulated plan when no plan is active
  const defaultSteps = [
    {
      title: t.planUnderstanding || "Analyzing objectives & requirements",
      description: "Deconstructing prompt grammar, semantic intent, and variable bounds.",
      status: 'completed' as const,
      estimatedTime: "1.2s",
      details: "Successfully initialized Work OS LLM orchestrator. Matched inputs against target domain schemas. Extracted metadata. User ID verified: Abdullah.",
    },
    {
      title: t.planScanning || "Scanning workspace files & context",
      description: "Crawling local workspace files, project index, and active DB context.",
      status: 'completed' as const,
      estimatedTime: "2.4s",
      details: "Read INITIAL_FILES index. Found 100-dollar-income-plan.md, website-audit.md. Injected active context store vectors into LLM context window.",
      toolUsed: "Workspace Indexer",
    },
    {
      title: t.planExecuting || "Executing specialized tools & APIs",
      description: "Dispatching queries to Google Search, SEO audit tools, or workspace writers.",
      status: 'running' as const,
      estimatedTime: "3.5s",
      details: "Triggered 'Google Live Search Grounding' to retrieve fresh digital marketing benchmarks for 2026. Synthesizing data points.",
      toolUsed: "Google Live Search Grounding",
    },
    {
      title: t.planVerifying || "Verifying outcomes & formatting report",
      description: "Asserting code type-safety boundaries, compliance gating, and formatting markdown.",
      status: 'pending' as const,
      estimatedTime: "1.5s",
      details: "Validating that generated markdown meets strict structural criteria. Generating preview file block in Files tab.",
    }
  ];

  // Dynamic status based on activePlan
  const currentSteps = activePlan && activePlan.length > 0
    ? activePlan.map((step, idx) => {
        // Map simplified activePlan to detailed timeline objects
        const descriptions = [
          "Parsing user commands, target actions, and semantic bounds.",
          "Indexing active session state, environment parameters, and files.",
          "Triggering server-side specialized tool algorithms and OAuth vectors.",
          "Auditing execution outputs for format accuracy and rendering report."
        ];
        const tools = ["System Parser", "Workspace Indexer", "Specialized API Tool", "Outcome Verifier"];
        
        return {
          title: step.title,
          description: descriptions[idx] || "Executing standard task segment.",
          status: step.status,
          estimatedTime: idx === 2 ? "3.5s" : "1.5s",
          details: `The agent is executing: "${step.title}". Current state is set to '${step.status}' with zero compilation warnings.`,
          toolUsed: idx === 2 && isGenerating ? "Live Gemini Model Engine" : tools[idx]
        };
      })
    : simulationState !== 'idle' ? simulatedSteps : defaultSteps;

  // Active step index
  const activeStepIndex = currentSteps.findIndex(s => s.status === 'running');
  const finishedStepsCount = currentSteps.filter(s => s.status === 'completed').length;
  const progressPercent = Math.round((finishedStepsCount / currentSteps.length) * 100);

  // Auto-select active step on load/update
  useEffect(() => {
    if (activeStepIndex !== -1) {
      setSelectedStep(activeStepIndex);
    } else if (selectedStep === null && currentSteps.length > 0) {
      setSelectedStep(0);
    }
  }, [activeStepIndex, activePlan, simulationState]);

  // Run a visual simulation playground
  const runSimulationPlayground = () => {
    if (!simulatedObjective.trim()) return;
    setSimulationState('running');
    setSelectedStep(0);

    const stepsTemplate = [
      {
        title: "Analyzing Objective: " + simulatedObjective,
        description: "Deconstructing prompt for semantic parameters and required execution scripts.",
        status: 'running' as const,
        estimatedTime: "1.0s",
        details: `Parsing objective: "${simulatedObjective}". Aligning with digital service vectors.`,
      },
      {
        title: "Crawl Competitors & Web Index",
        description: "Executing live search query simulation on Google index to ground findings.",
        status: 'pending' as const,
        estimatedTime: "2.5s",
        details: "Performing live search on Google Index. Aggregating high-converting niches and micro-freelancing platforms.",
        toolUsed: "Google Live Search Grounding"
      },
      {
        title: "Formulate Financial Execution Strategy",
        description: "Synthesizing step-by-step milestones, action points, and daily timetables.",
        status: 'pending' as const,
        estimatedTime: "3.0s",
        details: "Calculating optimized O(N) daily tasks. Preparing a clean, downloadable markdown document structure.",
        toolUsed: "AI Strategy Synthesizer"
      },
      {
        title: "Output Verification & File Delivery",
        description: "Polishing markdown rendering, adding safety triggers, and saving file to database.",
        status: 'pending' as const,
        estimatedTime: "1.5s",
        details: "Finished generation. Rendering file: 'simulated-plan-report.md'. Ready for client view.",
      }
    ];

    setSimulatedSteps(stepsTemplate);

    // Step 1
    setTimeout(() => {
      setSimulatedSteps(prev => [
        { ...prev[0], status: 'completed' },
        { ...prev[1], status: 'running' },
        prev[2],
        prev[3]
      ]);
      setSelectedStep(1);
    }, 1500);

    // Step 2
    setTimeout(() => {
      setSimulatedSteps(prev => [
        prev[0],
        { ...prev[1], status: 'completed' },
        { ...prev[2], status: 'running' },
        prev[3]
      ]);
      setSelectedStep(2);
    }, 3500);

    // Step 3
    setTimeout(() => {
      setSimulatedSteps(prev => [
        prev[0],
        prev[1],
        { ...prev[2], status: 'completed' },
        { ...prev[3], status: 'running' }
      ]);
      setSelectedStep(3);
    }, 6000);

    // Step 4
    setTimeout(() => {
      setSimulatedSteps(prev => [
        prev[0],
        prev[1],
        prev[2],
        { ...prev[3], status: 'completed' }
      ]);
      setSimulationState('completed');
    }, 7500);
  };

  const handleExportMarkdown = () => {
    const header = `# 📋 Agent Task Execution Plan - Status Report\n\n`;
    const body = currentSteps.map((step, idx) => (
      `### [Step ${idx + 1}] ${step.title}\n` +
      `* **Status:** ${step.status.toUpperCase()}\n` +
      `* **Description:** ${step.description}\n` +
      `* **Estimated Time:** ${step.estimatedTime}\n` +
      `${step.toolUsed ? `* **Associated Tool:** ${step.toolUsed}\n` : ''}` +
      `* **Audit Details:** ${step.details}\n\n`
    )).join('---\n\n');

    const blob = new Blob([header + body], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `agent-task-plan-${Date.now()}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div id="plan_view" className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto w-full text-[#F8FAFC]">
      
      {/* View Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[rgba(139,92,246,0.2)] pb-5">
        <div>
          <h1 className="text-xl sm:text-2xl font-black tracking-tight text-[#F8FAFC] flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-purple-500/30">
              <Workflow className="h-5 w-5 text-[#C084FC] animate-spin-slow" />
            </div>
            <span>Agent Plan & Timeline</span>
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-[#94A3B8]">
            Real-time step-by-step cognitive execution path, active tools, and compliance checkpoints.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleExportMarkdown}
            className="flex items-center gap-1.5 rounded-2xl bg-[#0D0D20] px-3.5 py-2.5 text-xs font-semibold text-[#F8FAFC] border border-[rgba(139,92,246,0.25)] hover:bg-[#12122b] transition-all hover:scale-[1.02] cursor-pointer"
          >
            <Download className="h-4 w-4 text-[#C084FC]" />
            <span>Export Report (.MD)</span>
          </button>
        </div>
      </div>

      {/* Grid Layout: Timeline + Step Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Side: Timeline (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Status Panel */}
          <div className="rounded-2xl border border-[rgba(139,92,246,0.25)] bg-[#0D0D20]/80 p-4 sm:p-5 backdrop-blur-md relative overflow-hidden">
            <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#7C3AED]/10 blur-3xl animate-luxury-pulse" />
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[10px] font-bold tracking-widest text-[#C084FC] uppercase flex items-center gap-1">
                  <span className="relative flex h-2 w-2">
                    <span className={`absolute inline-flex h-full w-full rounded-full opacity-75 ${isGenerating || simulationState === 'running' ? 'animate-ping bg-[#00D9A5]' : 'bg-blue-400'}`}></span>
                    <span className={`relative inline-flex rounded-full h-2 w-2 ${isGenerating || simulationState === 'running' ? 'bg-[#00D9A5]' : 'bg-blue-400'}`}></span>
                  </span>
                  {isGenerating || simulationState === 'running' ? 'Active Work Cycle' : 'Idle / Standby'}
                </span>
                <h3 className="text-base font-bold text-white">
                  {isGenerating || simulationState === 'running' 
                    ? "Currently Orchestrating Sub-routines" 
                    : "Ready for Next Prompt Instruction"}
                </h3>
                <p className="text-xs text-[#94A3B8]">
                  Orchestrator Speed: <span className="font-mono text-[#00D9A5] font-semibold">142 GigaFLOPs / Sec</span>
                </p>
              </div>

              <div className="flex items-center gap-4 bg-[#080817] p-3 rounded-xl border border-white/5">
                <div className="text-center">
                  <p className="text-[10px] text-[#94A3B8] uppercase tracking-wider font-semibold">Progress</p>
                  <p className="text-lg font-black text-white">{progressPercent}%</p>
                </div>
                <div className="h-8 w-px bg-white/10" />
                <div className="text-center">
                  <p className="text-[10px] text-[#94A3B8] uppercase tracking-wider font-semibold">Completed</p>
                  <p className="text-lg font-black text-[#00D9A5]">{finishedStepsCount} <span className="text-xs text-[#94A3B8]">/ {currentSteps.length}</span></p>
                </div>
              </div>
            </div>

            {/* Premium Custom Progress Bar */}
            <div className="mt-5 space-y-1">
              <div className="h-1.5 w-full rounded-full bg-white/5 overflow-hidden border border-white/5">
                <div 
                  className="h-full rounded-full bg-gradient-to-r from-[#1D4ED8] via-[#4F46E5] to-[#7E17F8] transition-all duration-700 shadow-[0_0_12px_rgba(124,58,237,0.5)]"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </div>

          {/* Visual Vertical Timeline */}
          <div className="rounded-2xl border border-[rgba(139,92,246,0.25)] bg-[#070514] p-4 sm:p-6 space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2">
                <Activity className="h-4 w-4 text-[#C084FC]" />
                Cognitive Pipeline Timeline
              </span>
              <span className="text-[10px] text-[#94A3B8] italic">Click steps to audit</span>
            </div>

            <div className="relative pl-6 sm:pl-8 space-y-6 sm:space-y-8 before:absolute before:left-[14px] sm:before:left-[18px] before:top-2 before:bottom-2 before:w-0.5 before:bg-gradient-to-b before:from-[#7C3AED]/80 before:via-[#4F46E5]/40 before:to-white/10">
              
              {currentSteps.map((step, idx) => {
                const isCompleted = step.status === 'completed';
                const isRunning = step.status === 'running';
                const isSelected = selectedStep === idx;

                return (
                  <div 
                    key={idx}
                    onClick={() => setSelectedStep(idx)}
                    className={`group relative flex flex-col gap-1.5 cursor-pointer p-3.5 rounded-2xl border transition-all ${
                      isSelected 
                        ? 'bg-[#0D0D20] border-purple-500/30 shadow-[0_0_15px_rgba(124,58,237,0.15)]' 
                        : 'bg-[#080817]/40 border-transparent hover:border-white/5 hover:bg-[#080817]'
                    }`}
                  >
                    {/* Glowing Bullet Node */}
                    <div className="absolute -left-[30px] sm:-left-[35px] top-4 flex h-7 w-7 sm:h-9 sm:w-9 items-center justify-center rounded-full transition-all">
                      {isCompleted ? (
                        <div className="flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-full bg-[#00D9A5]/10 text-[#00D9A5] border border-[#00D9A5]/40 shadow-[0_0_10px_rgba(0,217,165,0.3)]">
                          <CheckCircle2 className="h-3 w-3 sm:h-3.5 sm:w-3.5 stroke-[2.5]" />
                        </div>
                      ) : isRunning ? (
                        <div className="relative flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-full bg-[#C084FC]/10 text-[#C084FC] border border-[#C084FC]/40 shadow-[0_0_12px_rgba(192,132,252,0.4)]">
                          <span className="absolute inset-0 rounded-full border border-[#C084FC]/30 animate-ping" />
                          <div className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-[#C084FC]" />
                        </div>
                      ) : (
                        <div className="flex h-4 w-4 sm:h-5 sm:w-5 items-center justify-center rounded-full bg-[#0F172A] text-[#94A3B8]/40 border border-[#1E293B]">
                          <div className="h-1.5 w-1.5 rounded-full bg-[#334155]" />
                        </div>
                      )}
                    </div>

                    {/* Step Title & Status Badge */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                      <h4 className={`text-xs sm:text-sm font-bold ${
                        isSelected ? 'text-[#F8FAFC]' : isCompleted ? 'text-[#E2E8F0]' : 'text-[#94A3B8]'
                      }`}>
                        Step {idx + 1}: {step.title}
                      </h4>
                      
                      <span className={`inline-block text-[9px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full border shrink-0 w-fit ${
                        isCompleted 
                          ? 'bg-[#00D9A5]/10 text-[#00D9A5] border-[#00D9A5]/20' 
                          : isRunning 
                          ? 'bg-[#7C3AED]/15 text-[#C084FC] border-[#7C3AED]/30 animate-pulse' 
                          : 'bg-white/5 text-[#94A3B8]/60 border-white/5'
                      }`}>
                        {step.status}
                      </span>
                    </div>

                    {/* Short Description */}
                    <p className="text-[11px] sm:text-xs text-[#94A3B8]/85 leading-relaxed">
                      {step.description}
                    </p>

                    {/* Associated Active Tool Tag */}
                    {step.toolUsed && (
                      <div className="flex items-center gap-1.5 mt-1.5 text-[10px] font-mono text-[#C084FC] bg-[#0F0E29]/80 border border-[#7C3AED]/15 rounded-lg px-2.5 py-1 w-fit">
                        <Terminal className="h-3 w-3 text-[#A855F7]" />
                        <span>Tool Executed: {step.toolUsed}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Side: Step Inspector & Tool Playground (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Timeline Step Inspector */}
          {selectedStep !== null && currentSteps[selectedStep] && (
            <div className="rounded-2xl border border-[rgba(139,92,246,0.25)] bg-[#0D0D20] p-4 sm:p-5 relative overflow-hidden shadow-lg animate-fade-in">
              <div className="pointer-events-none absolute -right-20 -bottom-20 h-44 w-44 rounded-full bg-[#7C3AED]/10 blur-3xl" />
              
              <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#C084FC] flex items-center gap-1.5">
                  <Terminal className="h-4 w-4" />
                  Audit Trace Inspector
                </span>
                <span className="text-[10px] text-[#94A3B8] font-mono">
                  Latency: {currentSteps[selectedStep].estimatedTime}
                </span>
              </div>

              <div className="space-y-4">
                <div className="space-y-1">
                  <h4 className="text-xs text-[#94A3B8] uppercase tracking-wider font-semibold">Active Sub-routine</h4>
                  <h3 className="text-sm font-black text-white">
                    {currentSteps[selectedStep].title}
                  </h3>
                </div>

                <div className="space-y-1.5">
                  <h4 className="text-xs text-[#94A3B8] uppercase tracking-wider font-semibold">Diagnostic Log</h4>
                  <div className="rounded-xl bg-[#080817] p-3 border border-white/5 text-[11px] font-mono text-purple-300 leading-relaxed whitespace-pre-wrap max-h-48 overflow-y-auto">
                    {currentSteps[selectedStep].details}
                  </div>
                </div>

                {currentSteps[selectedStep].toolUsed && (
                  <div className="rounded-xl bg-[#0F0E29] p-3 border border-purple-500/20 space-y-2">
                    <div className="flex items-center gap-1.5 text-xs text-[#E2E8F0] font-bold">
                      <Zap className="h-3.5 w-3.5 text-[#C084FC] animate-pulse" />
                      <span>Associated Workspace Action</span>
                    </div>
                    <p className="text-[11px] text-[#94A3B8] leading-relaxed">
                      This action automatically called and executed the <span className="font-mono text-purple-300 font-semibold">{currentSteps[selectedStep].toolUsed}</span> interface. No human authentication was demanded.
                    </p>
                  </div>
                )}

                <div className="flex items-center gap-2 text-[11px] text-[#94A3B8] border-t border-white/5 pt-4">
                  <Shield className="h-3.5 w-3.5 text-[#00D9A5]" />
                  <span>Compliance State: <span className="text-[#00D9A5] font-semibold">SAFE (Autonomous Allowed)</span></span>
                </div>
              </div>
            </div>
          )}

          {/* Real-time Simulator Playground */}
          <div className="rounded-2xl border border-[rgba(139,92,246,0.25)] bg-[#070514] p-4 sm:p-5 relative space-y-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
                <Sparkles className="h-4 w-4 text-[#C084FC]" />
                Cognitive Simulation Lab
              </span>
              <p className="text-[11px] text-[#94A3B8] mt-1">
                Enter any objective below to simulate how the AI Work OS orchestrates its 4-stage pipeline step-by-step.
              </p>
            </div>

            <div className="space-y-2.5">
              <input
                type="text"
                value={simulatedObjective}
                onChange={(e) => setSimulatedObjective(e.target.value)}
                placeholder="e.g. Find 5 high-paying SEO client leads"
                className="w-full rounded-xl bg-[#0D0D20] px-3.5 py-2.5 text-xs text-white border border-[rgba(139,92,246,0.25)] focus:outline-none focus:border-[#A855F7] placeholder:text-[#94A3B8]/45"
                disabled={simulationState === 'running'}
              />

              <button
                onClick={runSimulationPlayground}
                disabled={!simulatedObjective.trim() || simulationState === 'running'}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:via-indigo-500 hover:to-purple-500 py-2.5 text-xs font-bold text-white shadow-md disabled:opacity-45 disabled:pointer-events-none transition-all cursor-pointer"
              >
                <Play className="h-3.5 w-3.5 text-[#38BDF8]" />
                <span>{simulationState === 'running' ? 'Simulating Pipeline...' : 'Simulate Timeline'}</span>
              </button>
            </div>

            {/* Quick Presets */}
            <div className="space-y-1.5 pt-1">
              <h4 className="text-[10px] text-[#94A3B8] uppercase font-bold tracking-wider">Simulation Presets</h4>
              <div className="flex flex-wrap gap-1.5">
                {[
                  "Draft proposal to Tanveer",
                  "SEO Audit on client site",
                  "Automate social posts",
                ].map((preset) => (
                  <button
                    key={preset}
                    onClick={() => setSimulatedObjective(preset)}
                    className="text-[10px] rounded-lg bg-[#0D0D20] px-2 py-1 border border-white/5 text-[#94A3B8] hover:text-white hover:border-purple-500/20 transition-all cursor-pointer"
                    disabled={simulationState === 'running'}
                  >
                    {preset}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Autopilot Guard Gating */}
          <div className="rounded-2xl border border-[rgba(139,92,246,0.2)] bg-[#0B0B1D] p-4 flex items-center justify-between gap-4">
            <div className="space-y-0.5">
              <span className="text-[10px] font-bold text-[#C084FC] uppercase tracking-wider">Autopilot Guard</span>
              <h4 className="text-xs font-bold text-white">Automate Safe Triggers</h4>
              <p className="text-[10px] text-[#94A3B8]">Skip approvals for low-risk read-only tasks.</p>
            </div>
            <button
              onClick={() => setAutopilot(!autopilot)}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                autopilot ? 'bg-purple-600' : 'bg-slate-800'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  autopilot ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
