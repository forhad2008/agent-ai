import React from 'react';
import { Bell, Volume2 } from 'lucide-react';
import { AgentProvider, useAgent } from './context/AgentContext';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { DashboardView } from './components/dashboard/DashboardView';
import { ChatView } from './components/chat/ChatView';
import { TasksView } from './components/tasks/TasksView';
import { FilesView } from './components/files/FilesView';
import { ToolsView } from './components/tools/ToolsView';
import { ApprovalsView } from './components/approvals/ApprovalsView';
import { ActivityView } from './components/activity/ActivityView';
import { SettingsView } from './components/settings/SettingsView';
import { UserProfileView } from './components/profile/UserProfileView';
import { AILabView } from './components/ailab/AILabView';
import { LanguageModeModal } from './components/common/LanguageModeModal';
import { InstallGuideModal } from './components/common/InstallGuideModal';

const MainLayout: React.FC = () => {
  const { activeView, triggeredAlarm, setTriggeredAlarm } = useAgent();

  const renderActiveView = () => {
    switch (activeView) {
      case 'dashboard':
        return <DashboardView />;
      case 'profile':
        return <UserProfileView />;
      case 'chat':
        return <ChatView />;
      case 'ailab':
        return <AILabView />;
      case 'tasks':
        return <TasksView />;
      case 'files':
        return <FilesView />;
      case 'tools':
        return <ToolsView />;
      case 'approvals':
        return <ApprovalsView />;
      case 'activity':
        return <ActivityView />;
      case 'results':
        return <TasksView />;
      case 'automations':
        return <TasksView />;
      case 'integrations':
        return <ToolsView />;
      case 'settings':
        return <SettingsView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="relative flex h-screen w-screen overflow-hidden bg-[#03030B] text-[#F8FAFC] font-sans antialiased">
      {/* Ambient glassmorphism background mesh lighting */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Living Liquid Orbs with premium slow-breathing pulse animation */}
        <div className="absolute -top-32 left-[15%] h-[600px] w-[600px] rounded-full bg-gradient-to-br from-[#7C3AED]/20 via-[#A855F7]/12 to-transparent blur-[150px] animate-luxury-pulse" />
        <div className="absolute right-[-100px] top-[15%] h-[650px] w-[650px] rounded-full bg-gradient-to-bl from-[#4F46E5]/20 via-[#3B82F6]/12 to-transparent blur-[170px] animate-orb-glow" />
        <div className="absolute bottom-[-150px] left-[30%] h-[550px] w-[550px] rounded-full bg-gradient-to-tr from-[#EC4899]/15 via-[#8B5CF6]/15 to-transparent blur-[160px] animate-luxury-pulse" />
      </div>

      {/* Header and Layout */}
      <div className="relative z-40 flex h-full w-full flex-col">
        <Header />

        <div className="flex min-h-0 flex-1 overflow-hidden">
          {/* Desktop Sidebar */}
          <Sidebar />

          {/* Main Content */}
          <main
            className="
              relative
              flex-1
              min-w-0
              overflow-y-auto
              overflow-x-hidden
              bg-transparent
              scrollbar-thin
              scrollbar-track-transparent
              scrollbar-thumb-[#7C3AED]/30
            "
          >
            {renderActiveView()}
          </main>
        </div>
      </div>

      {/* Language Selector Modal */}
      <LanguageModeModal />

      {/* PWA App Install Guide Modal */}
      <InstallGuideModal />

      {/* Real-time Triggered Alarm Overlay Popup */}
      {triggeredAlarm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-fade-in">
          <div className="relative w-full max-w-sm overflow-hidden rounded-3xl border border-purple-500/30 bg-[#070514]/90 p-6 shadow-[0_0_50px_rgba(124,58,237,0.25)] text-center space-y-5">
            
            <div className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-purple-500/30">
              <div className="absolute inset-0 rounded-full border border-blue-500/20 animate-ping" />
              <Bell className="h-10 w-10 text-purple-400 animate-bounce" />
            </div>

            <div className="space-y-1.5">
              <span className="inline-block rounded-full bg-purple-500/10 px-3 py-1 text-[10px] font-bold tracking-widest text-purple-300 uppercase border border-purple-500/20">
                🚨 Work OS Alarm Alert
              </span>
              <h2 className="text-xl font-black text-white tracking-tight">
                {triggeredAlarm.label}
              </h2>
              <p className="text-xs text-[#94A3B8]">
                Alarm Time: <span className="font-mono font-bold text-blue-400">{triggeredAlarm.time}</span>
              </p>
            </div>

            <div className="rounded-2xl bg-[#09071b] p-3 border border-white/5 flex items-center justify-center gap-2 text-[11px] text-[#00D9A5]">
              <Volume2 className="h-3.5 w-3.5 text-[#00D9A5] animate-pulse animate-bounce" />
              <span className="font-semibold">🔊 Playing "Pirates of the Caribbean" Theme Song...</span>
            </div>

            <button
              type="button"
              onClick={() => setTriggeredAlarm(null)}
              className="w-full rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:via-indigo-500 hover:to-purple-500 py-3 text-xs font-black text-white shadow-lg shadow-purple-950/40 transition-all transform active:scale-95 cursor-pointer"
            >
              DISMISS ALARM
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <AgentProvider>
      <MainLayout />
    </AgentProvider>
  );
}
