import React from 'react';
import {
  Home,
  MessageSquare,
  CheckSquare,
  ShieldCheck,
  Menu,
} from 'lucide-react';
import { useAgent } from '../../context/AgentContext';

interface MobileNavBarProps {
  onOpenMobileMenu: () => void;
}

export const MobileNavBar: React.FC<MobileNavBarProps> = ({ onOpenMobileMenu }) => {
  const {
    activeView,
    setActiveView,
    tasks,
    approvals,
    isGenerating,
  } = useAgent();

  const pendingApprovalsCount = approvals.filter((a) => a.status === 'pending').length;
  const activeTasksCount = tasks.filter((t) => t.status === 'Running' || t.status === 'Waiting for Approval').length;

  return (
    <nav
      id="mobile_bottom_nav"
      aria-label="Mobile Navigation"
      className="fixed bottom-0 left-0 right-0 z-40 flex h-16 items-center justify-around border-t border-[rgba(139,92,246,0.25)] bg-[#050510]/60 px-2 backdrop-blur-[32px] lg:hidden safe-area-pb shadow-2xl"
    >
      {/* 1. Home */}
      <button
        id="mobile_nav_home"
        onClick={() => setActiveView('dashboard')}
        className={`relative flex flex-1 flex-col items-center justify-center py-1 transition-all ${
          activeView === 'dashboard' ? 'text-[#C084FC] font-bold' : 'text-[#94A3B8] hover:text-[#F8FAFC]'
        }`}
        aria-label="Home"
      >
        <Home className="h-5 w-5" />
        <span className="mt-0.5 text-[10px] tracking-tight">Home</span>
        {activeView === 'dashboard' && (
          <span className="absolute bottom-0.5 h-1 w-6 rounded-full bg-[#7C3AED] shadow-[0_0_8px_#A855F7]" />
        )}
      </button>

      {/* 2. AI Chat */}
      <button
        id="mobile_nav_chat"
        onClick={() => setActiveView('chat')}
        className={`relative flex flex-1 flex-col items-center justify-center py-1 transition-all ${
          activeView === 'chat' ? 'text-[#C084FC] font-bold' : 'text-[#94A3B8] hover:text-[#F8FAFC]'
        }`}
        aria-label="AI Chat"
      >
        <div className="relative">
          <MessageSquare className="h-5 w-5" />
          {isGenerating && (
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#C084FC] opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#7C3AED]" />
            </span>
          )}
        </div>
        <span className="mt-0.5 text-[10px] tracking-tight">AI Chat</span>
        {activeView === 'chat' && (
          <span className="absolute bottom-0.5 h-1 w-6 rounded-full bg-[#7C3AED] shadow-[0_0_8px_#A855F7]" />
        )}
      </button>

      {/* 3. Tasks */}
      <button
        id="mobile_nav_tasks"
        onClick={() => setActiveView('tasks')}
        className={`relative flex flex-1 flex-col items-center justify-center py-1 transition-all ${
          activeView === 'tasks' ? 'text-[#C084FC] font-bold' : 'text-[#94A3B8] hover:text-[#F8FAFC]'
        }`}
        aria-label="Tasks"
      >
        <div className="relative">
          <CheckSquare className="h-5 w-5" />
          {activeTasksCount > 0 && (
            <span className="absolute -top-1.5 -right-2.5 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-[#4C1D95] px-1 text-[9px] font-mono font-bold text-[#C084FC] border border-[#7C3AED]/40">
              {activeTasksCount}
            </span>
          )}
        </div>
        <span className="mt-0.5 text-[10px] tracking-tight">Tasks</span>
        {activeView === 'tasks' && (
          <span className="absolute bottom-0.5 h-1 w-6 rounded-full bg-[#7C3AED] shadow-[0_0_8px_#A855F7]" />
        )}
      </button>

      {/* 4. Approvals */}
      <button
        id="mobile_nav_approvals"
        onClick={() => setActiveView('approvals')}
        className={`relative flex flex-1 flex-col items-center justify-center py-1 transition-all ${
          activeView === 'approvals' ? 'text-[#C084FC] font-bold' : 'text-[#94A3B8] hover:text-[#F8FAFC]'
        }`}
        aria-label="Approvals"
      >
        <div className="relative">
          <ShieldCheck className="h-5 w-5" />
          {pendingApprovalsCount > 0 && (
            <span className="absolute -top-1.5 -right-2.5 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-[#F59E0B] px-1 text-[9px] font-mono font-bold text-slate-950 shadow-sm">
              {pendingApprovalsCount}
            </span>
          )}
        </div>
        <span className="mt-0.5 text-[10px] tracking-tight">Approvals</span>
        {activeView === 'approvals' && (
          <span className="absolute bottom-0.5 h-1 w-6 rounded-full bg-[#7C3AED] shadow-[0_0_8px_#A855F7]" />
        )}
      </button>

      {/* 5. Menu */}
      <button
        id="mobile_nav_menu"
        onClick={onOpenMobileMenu}
        className="flex flex-1 flex-col items-center justify-center py-1 text-[#94A3B8] hover:text-[#F8FAFC] transition-all"
        aria-label="Open Full Menu"
      >
        <Menu className="h-5 w-5" />
        <span className="mt-0.5 text-[10px] tracking-tight">Menu</span>
      </button>
    </nav>
  );
};
