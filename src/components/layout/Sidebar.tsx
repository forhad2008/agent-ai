import React, { useState, useEffect } from 'react';
import {
  Home,
  MessageSquare,
  CheckSquare,
  ShieldCheck,
  Settings,
  Activity,
  FileText,
  Folder,
  Zap,
  Link2,
  ChevronRight,
  Sparkles,
  Download,
  Smartphone,
  X,
  CheckCircle2,
  User,
  Workflow,
  Compass,
} from 'lucide-react';
import { useAgent, ActiveView } from '../../context/AgentContext';

export const Sidebar: React.FC = () => {
  const { activeView, setActiveView, tasks, approvals, setIsInstallModalOpen } = useAgent();

  const handleInstallClick = () => {
    setIsInstallModalOpen(true);
  };

  const pendingApprovalsCount = approvals.filter((a) => a.status === 'pending').length;
  const activeTasksCount = tasks.filter((t) => t.status === 'Running' || t.status === 'Waiting for Approval').length;

  const navItems: {
    id: ActiveView;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: number;
  }[] = [
    {
      id: 'dashboard',
      label: 'Home',
      icon: Home,
    },
    {
      id: 'profile',
      label: 'User Bio',
      icon: User,
    },
    {
      id: 'chat',
      label: 'AI Chat',
      icon: MessageSquare,
    },
    {
      id: 'ailab',
      label: 'AI Lab',
      icon: Sparkles,
    },
    {
      id: 'tasks',
      label: 'Tasks',
      icon: CheckSquare,
      badge: activeTasksCount > 0 ? activeTasksCount : 2,
    },
    {
      id: 'approvals',
      label: 'Approvals',
      icon: ShieldCheck,
      badge: pendingApprovalsCount > 0 ? pendingApprovalsCount : 1,
    },
    {
      id: 'activity',
      label: 'Activity',
      icon: Activity,
    },
    {
      id: 'plan',
      label: 'Agent Plan',
      icon: Workflow,
    },
    {
      id: 'results',
      label: 'Results',
      icon: FileText,
    },
    {
      id: 'files',
      label: 'Files',
      icon: Folder,
    },
    {
      id: 'automations',
      label: 'Automations',
      icon: Zap,
    },
    {
      id: 'integrations',
      label: 'Integrations',
      icon: Link2,
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings,
    },
    {
      id: 'guide',
      label: 'Agent Map',
      icon: Compass,
    },
  ];

  return (
    <aside
      id="app_sidebar"
      className="
        relative
        flex
        h-full
        w-[100px]
        xs:w-[115px]
        sm:w-[150px]
        md:w-[185px]
        lg:w-[215px]
        shrink-0
        flex-col
        border-r
        border-white/10
        bg-white/[0.02]
        backdrop-blur-2xl
        shadow-[4px_0_30px_rgba(0,0,0,0.3)]
        transition-all
      "
    >
      {/* Subtle sidebar ambient glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-16 bottom-10 h-64 w-64 rounded-full bg-[#7C3AED]/10 blur-[90px]" />
      </div>

      {/* Navigation List */}
      <div className="relative z-10 flex flex-1 flex-col px-1.5 xs:px-2 sm:px-3 py-3 sm:py-4 overflow-y-auto scrollbar-none">
        <nav className="space-y-1 sm:space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;

            return (
              <button
                key={item.id}
                id={`sidebar_nav_${item.id}`}
                onClick={() => setActiveView(item.id)}
                className={`
                  group
                  relative
                  flex
                  w-full
                  items-center
                  gap-1.5
                  xs:gap-2
                  sm:gap-3
                  rounded-xl
                  px-2
                  xs:px-2.5
                  sm:px-3
                  py-2
                  xs:py-2.5
                  sm:py-2.5
                  text-left
                  transition-all
                  duration-200
                  ${
                    isActive
                      ? `
                        bg-gradient-to-r
                        from-[#1D4ED8]
                        via-[#4F46E5]
                        to-[#7E17F8]
                        text-white
                        border
                        border-white/30
                        shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),0_0_22px_rgba(37,99,235,0.45)]
                      `
                      : `
                        text-[#94A3B8]
                        hover:bg-white/[0.06]
                        hover:text-[#F8FAFC]
                      `
                  }
                `}
              >
                {/* Icon box */}
                <div
                  className={`
                    flex
                    h-6
                    w-6
                    xs:h-7
                    xs:w-7
                    sm:h-8
                    sm:w-8
                    shrink-0
                    items-center
                    justify-center
                    rounded-lg
                    transition-all
                    ${
                      isActive
                        ? 'border border-white/25 bg-white/10 text-white'
                        : 'text-[#94A3B8] group-hover:text-[#C084FC]'
                    }
                  `}
                >
                  <Icon className="h-3.5 w-3.5 xs:h-4 xs:w-4 sm:h-[18px] sm:w-[18px]" />
                </div>

                {/* Label */}
                <span className="flex-1 text-[10px] xs:text-[11px] sm:text-xs md:text-[13px] font-medium tracking-tight truncate">
                  {item.label}
                </span>

                {/* Badge */}
                {item.badge !== undefined && (
                  <span
                    className={`
                      flex
                      h-4
                      min-w-4
                      xs:h-4.5
                      xs:min-w-4.5
                      sm:h-5
                      sm:min-w-5
                      items-center
                      justify-center
                      rounded-full
                      px-1
                      text-[9px]
                      xs:text-[10px]
                      font-bold
                      shadow-sm
                      ${
                        item.id === 'approvals'
                          ? 'bg-[#D946EF] text-white shadow-[0_0_10px_rgba(217,70,239,0.7)]'
                          : 'bg-[#7C3AED] text-white shadow-[0_0_10px_rgba(124,58,237,0.6)]'
                      }
                    `}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom AI Workforce Card + Install App Button */}
      <div className="relative z-10 p-1.5 xs:p-2 sm:p-3 shrink-0 space-y-2">
        {/* PWA Install Button */}
        <button
          id="btn_sidebar_install_app"
          onClick={handleInstallClick}
          className="
            flex
            w-full
            items-center
            justify-center
            gap-1.5
            rounded-xl
            border
            border-white/20
            bg-gradient-to-r
            from-[#1D4ED8]
            via-[#4F46E5]
            to-[#7E17F8]
            hover:from-[#2563EB]
            hover:via-[#6366F1]
            hover:to-[#A855F7]
            px-2
            py-2
            text-[10px]
            xs:text-[11px]
            sm:text-xs
            font-bold
            text-white
            shadow-[0_0_18px_rgba(126,23,248,0.45)]
            transition-all
            hover:scale-[1.02]
            active:scale-[0.98]
          "
          title="Install Agent-alpha08 as an app on your phone or PC"
        >
          <Download className="h-3.5 w-3.5 text-[#38BDF8] animate-bounce-subtle" />
          <span className="truncate">Install App</span>
        </button>

        <div
          id="sidebar_promo_card"
          className="
            relative
            overflow-hidden
            rounded-xl
            sm:rounded-2xl
            border
            border-[#7C3AED]/30
            bg-[#0B0B1D]
            p-2.5
            xs:p-3
            sm:p-3.5
          "
        >
          {/* Subtle Glow */}
          <div className="pointer-events-none absolute -right-6 -bottom-6 h-24 w-24 rounded-full bg-[#7C3AED]/25 blur-2xl" />

          {/* Sparkle Icon */}
          <div className="mb-1.5 sm:mb-2 text-[#C084FC]">
            <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#C084FC]" />
          </div>

          <p className="relative text-[9px] xs:text-[10px] sm:text-xs font-semibold leading-snug text-[#E2E8F0]">
            Your AI
            <br />
            Workforce
            <br />
            <span className="text-[#A855F7]">Never Sleeps</span>
          </p>

          {/* Fluid Glowing Wave Graphic */}
          <div className="relative -mx-3 -mb-3 mt-1.5 sm:mt-2 h-7 sm:h-9 opacity-80 pointer-events-none overflow-hidden">
            <svg
              viewBox="0 0 200 60"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full"
            >
              <path
                d="M -10 40 C 40 10, 80 50, 140 25 C 180 10, 200 45, 220 30"
                stroke="url(#sb_wave_grad)"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M -10 48 C 50 25, 90 60, 150 35 C 180 20, 200 50, 220 38"
                stroke="#C084FC"
                strokeWidth="1.2"
                strokeOpacity="0.5"
                fill="none"
              />
              <defs>
                <linearGradient id="sb_wave_grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#7C3AED" />
                  <stop offset="50%" stopColor="#A855F7" />
                  <stop offset="100%" stopColor="#38BDF8" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>
    </aside>
  );
};
