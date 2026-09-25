import React from 'react';
import {
  Menu,
  ShieldCheck,
  ChevronDown,
  User,
} from 'lucide-react';
import { useAgent } from '../../context/AgentContext';
import { AgentLogo } from '../common/AgentLogo';

export const Header: React.FC = () => {
  const { setActiveView, currentLanguage, setIsLanguageModalOpen, userProfile } = useAgent();

  return (
    <header
      id="app_header"
      className="
        relative
        z-50
        flex
        h-[60px]
        xs:h-[64px]
        sm:h-[68px]
        w-full
        shrink-0
        items-center
        justify-between
        border-b
        border-white/10
        bg-[#03030b]/35
        px-2.5
        xs:px-3.5
        sm:px-6
        backdrop-blur-[32px]
        shadow-[0_4px_30px_rgba(0,0,0,0.4)]
      "
    >
      {/* Header bottom specular highlight */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#A855F7]/30 to-transparent" />

      {/* LEFT: Menu + Logo + Brand text */}
      <div className="flex min-w-0 items-center gap-0.5 xs:gap-3">
        {/* Hamburger Menu with descending line width pattern */}
        <button
          id="btn_header_menu"
          onClick={() => setActiveView('dashboard')}
          className="
            flex
            h-9.5
            w-9.5
            xs:h-10.5
            xs:w-10.5
            items-center
            justify-center
            rounded-xl
            text-[#94A3B8]
            transition-all
            hover:bg-white/[0.08]
            hover:text-white
            group
          "
          aria-label="Toggle menu"
        >
          <svg
            className="h-7.5 w-6 xs:h-8 xs:w-6.5 text-current transition-all group-hover:scale-105"
            viewBox="0 0 24 28"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
          >
            {/* Top line - Biggest width */}
            <line x1="3" y1="5" x2="21" y2="5" />
            {/* Middle line - Smaller width */}
            <line x1="3" y1="14" x2="15" y2="14" />
            {/* Bottom line - Smallest width */}
            <line x1="3" y1="23" x2="9" y2="23" />
          </svg>
        </button>

        {/* Logo and Brand */}
        <div
          onClick={() => setActiveView('dashboard')}
          className="flex items-center gap-2 xs:gap-2.5 sm:gap-3 cursor-pointer select-none"
        >
          <div
            className="
              relative
              flex
              h-8
              w-8
              xs:h-9
              xs:w-9
              sm:h-10
              sm:w-10
              items-center
              justify-center
            "
          >
            <AgentLogo className="relative h-7 w-7 xs:h-8 xs:w-8 sm:h-9 sm:w-9" />
          </div>

          <div className="leading-none">
            <div className="flex items-center gap-1 text-[13px] xs:text-[15px] sm:text-[18px] font-extrabold tracking-tight">
              <span className="text-white">Command</span>
              <span className="bg-gradient-to-r from-[#C084FC] via-[#A855F7] to-[#7C3AED] bg-clip-text text-transparent">
                Dashboard
              </span>
            </div>

            <div className="mt-0.5 sm:mt-1 text-[8px] xs:text-[8.5px] sm:text-[9px] font-bold tracking-[0.25em] text-[#64748B]">
              AI AGENT
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT: Security badge + Country language + Avatar */}
      <div className="flex items-center gap-1.5 xs:gap-2 sm:gap-3">
        {/* Secure & Private pill */}
        <div
          id="header_security_pill"
          className="
            flex
            items-center
            gap-1
            xs:gap-1.5
            rounded-full
            border
            border-[#7E17F8]/40
            bg-gradient-to-r
            from-[#2563EB]/15
            via-[#7E17F8]/20
            to-[#A855F7]/15
            px-1.5
            xs:px-2.5
            sm:px-3
            py-0.5
            xs:py-1.5
            text-[8px]
            xs:text-[11px]
            font-bold
            text-[#C084FC]
            shadow-[0_0_12px_rgba(126,23,248,0.3)]
          "
        >
          <ShieldCheck className="h-2.5 w-2.5 xs:h-3.5 xs:w-3.5 sm:h-4 sm:w-4 text-[#38BDF8]" />
          <span className="hidden xs:inline">Secure &amp; Private</span>
          <span className="xs:hidden">Secure</span>
        </div>

        {/* Language selector pill */}
        <button
          id="btn_language_mode_header"
          onClick={() => setIsLanguageModalOpen(true)}
          className="
            flex
            items-center
            gap-1
            xs:gap-1.5
            sm:gap-2
            rounded-full
            border
            border-[#7C3AED]/35
            bg-[#0B0B1B]
            px-2
            xs:px-2.5
            sm:px-3
            py-1
            xs:py-1.5
            text-[10px]
            xs:text-[11px]
            font-medium
            text-[#E2E8F0]
            transition-all
            hover:border-[#A855F7]/60
            hover:bg-[#7C3AED]/10
          "
          title="Change Country Language Mode"
        >
          <span className="text-xs xs:text-sm">
            {currentLanguage?.flag || '🇺🇸'}
          </span>
          <span className="font-semibold text-white">
            {currentLanguage?.id === 'en' ? 'US' : currentLanguage?.id?.toUpperCase() || 'US'}
          </span>
          <span className="hidden sm:inline text-[#94A3B8]">
            {currentLanguage?.name || 'English'}
          </span>
          <ChevronDown className="h-3 w-3 text-[#64748B]" />
        </button>

        {/* Profile / Avatar (Human user silhouette inside purple glowing ring) */}
        <div
          id="header_user_avatar"
          onClick={() => setActiveView('profile')}
          className="
            relative
            flex
            h-8
            w-8
            xs:h-9
            xs:w-9
            sm:h-10
            sm:w-10
            items-center
            justify-center
            cursor-pointer
          "
          title="User Profile & Settings"
        >
          <div className="absolute inset-0 rounded-full bg-[#7C3AED]/30 blur-md" />

          <div
            className="
              relative
              flex
              h-7
              w-7
              xs:h-8
              xs:w-8
              sm:h-9
              sm:w-9
              items-center
              justify-center
              rounded-full
              p-[2px]
              bg-gradient-to-r
              from-[#2563EB]
              via-[#7E17F8]
              to-[#C084FC]
              shadow-[0_0_18px_rgba(126,23,248,0.6)]
            "
          >
            <div className="flex h-full w-full items-center justify-center rounded-full overflow-hidden bg-gradient-to-tr from-[#3B82F6]/30 via-[#7E17F8]/40 to-[#0F0B29]">
              {userProfile.profileImage ? (
                <img src={userProfile.profileImage} alt={userProfile.name} className="h-full w-full object-cover rounded-full" />
              ) : (
                <User className="h-4 w-4 xs:h-4.5 xs:w-4.5 sm:h-5 sm:w-5 text-white fill-white/90" />
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
