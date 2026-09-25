import React, { useState } from 'react';
import {
  Globe,
  Search,
  Check,
  X,
  ChevronRight,
} from 'lucide-react';
import { useAgent } from '../../context/AgentContext';
import { TECH_LANGUAGES, TechLanguage } from '../../data/languages';

export const LanguageModeModal: React.FC = () => {
  const { currentLanguage, setLanguageMode, isLanguageModalOpen, setIsLanguageModalOpen, t } = useAgent();
  const [search, setSearch] = useState('');
  const [regionFilter, setRegionFilter] = useState<string>('All');

  if (!isLanguageModalOpen) return null;

  const regions = ['All', 'Asia & Pacific', 'Europe', 'Americas', 'Middle East'];

  const filteredLanguages = TECH_LANGUAGES.filter((lang) => {
    const matchesRegion = regionFilter === 'All' || lang.region === regionFilter;
    const query = search.toLowerCase().trim();
    const matchesQuery =
      !query ||
      lang.country.toLowerCase().includes(query) ||
      lang.name.toLowerCase().includes(query) ||
      lang.englishName.toLowerCase().includes(query) ||
      lang.id.toLowerCase().includes(query);

    return matchesRegion && matchesQuery;
  });

  const handleSelectLanguage = (lang: TechLanguage) => {
    setLanguageMode(lang.id);
    setIsLanguageModalOpen(false);
  };

  return (
    <div
      id="language_mode_modal_backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-fadeIn"
      onClick={() => setIsLanguageModalOpen(false)}
    >
      <div
        id="language_mode_modal_card"
        onClick={(e) => e.stopPropagation()}
        className="relative flex flex-col w-full max-w-2xl max-h-[90vh] rounded-3xl glass-panel overflow-hidden text-[#F8FAFC] animate-scaleUp border border-purple-500/20"
      >
        {/* Modal Header */}
        <div className="flex items-start justify-between border-b border-[rgba(139,92,246,0.15)] p-4 sm:p-6 bg-gradient-to-r from-[#080817] via-[#120D2C] to-[#080817]">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#7C3AED]/20 border border-[#7C3AED]/30 text-[#C084FC]">
              <Globe className="h-5 w-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-[#F8FAFC] tracking-tight">
                  {currentLanguage.labels.languageMode}
                </h2>
                <span className="rounded-full bg-[#7C3AED]/20 px-2 py-0.5 text-[10px] font-mono text-[#C084FC] border border-[#7C3AED]/40">
                  30 Tech Nations
                </span>
              </div>
              <p className="text-xs text-[#94A3B8] mt-0.5">
                {currentLanguage.labels.selectLanguage}
              </p>
            </div>
          </div>

          <button
            id="btn_close_language_modal"
            onClick={() => setIsLanguageModalOpen(false)}
            className="rounded-xl p-2 text-[#94A3B8] hover:bg-[#080817] hover:text-[#F8FAFC] transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Active Language Highlight Bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-2.5 bg-[#080817] border-b border-[rgba(139,92,246,0.15)] text-xs">
          <div className="flex items-center gap-2">
            <span className="text-[#94A3B8]">Active Mode:</span>
            <span className="text-base">{currentLanguage.flag}</span>
            <span className="font-semibold text-[#C084FC]">{currentLanguage.country}</span>
            <span className="text-[#94A3B8]">({currentLanguage.name})</span>
          </div>
        </div>

        {/* Search & Region Filter Bar */}
        <div className="p-4 sm:px-6 sm:py-3 border-b border-[rgba(139,92,246,0.15)] space-y-3 bg-[#080817]">
          {/* Search Box */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#94A3B8]" />
            <input
              id="input_search_language"
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by country or language..."
              className="w-full rounded-xl bg-[#0D0D20] pl-9 pr-4 py-2 text-xs sm:text-sm text-[#F8FAFC] placeholder:text-[#94A3B8]/60 border border-[rgba(139,92,246,0.25)] focus:outline-none focus:border-[#A855F7]"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#94A3B8] hover:text-[#F8FAFC] cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>

          {/* Region Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs no-scrollbar">
            {regions.map((reg) => (
              <button
                key={reg}
                onClick={() => setRegionFilter(reg)}
                className={`whitespace-nowrap px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                  regionFilter === reg
                    ? 'bg-[#7C3AED]/30 text-[#C084FC] border border-[#7C3AED]/60 shadow-sm'
                    : 'bg-[#0D0D20] text-[#94A3B8] hover:bg-[#12122b] hover:text-[#F8FAFC] border border-transparent'
                }`}
              >
                {reg}
              </button>
            ))}
          </div>
        </div>

        {/* Language Grid */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 max-h-[50vh] bg-[#03030c]/50">
          {filteredLanguages.length === 0 ? (
            <div className="py-12 text-center text-slate-400">
              <Globe className="h-8 w-8 mx-auto mb-2 text-slate-600 animate-pulse" />
              <p className="text-sm font-medium">No tech countries match &quot;{search}&quot;</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {filteredLanguages.map((lang) => {
                const isActive = currentLanguage.id === lang.id;
                return (
                  <button
                    key={lang.id}
                    id={`lang_option_${lang.id}`}
                    onClick={() => handleSelectLanguage(lang)}
                    className={`text-left flex items-center justify-between p-3 rounded-xl transition-all duration-200 group border cursor-pointer ${
                      isActive
                        ? 'bg-gradient-to-r from-[#7C3AED]/20 to-[#6320EE]/20 border-purple-500/40 text-[#F8FAFC] shadow-[0_0_15px_rgba(124,58,237,0.12)]'
                        : 'bg-[#08081a]/40 hover:bg-[#120d2c]/50 border-white/5 hover:border-purple-500/20 text-[#94A3B8] hover:text-[#F8FAFC]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="text-xl sm:text-2xl shrink-0 select-none transition-transform group-hover:scale-110 duration-200">
                        {lang.flag}
                      </span>
                      <div className="min-w-0 flex items-center gap-1.5 flex-wrap">
                        <span className="text-xs font-bold text-[#F8FAFC] truncate">
                          {lang.country}
                        </span>
                        <span className="text-[10px] text-slate-400 group-hover:text-slate-300 truncate">
                          ({lang.name})
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center shrink-0 ml-2">
                      {isActive ? (
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#00D9A5] text-slate-950 shadow-sm">
                          <Check className="h-3 w-3 stroke-[3]" />
                        </span>
                      ) : (
                        <ChevronRight className="h-3.5 w-3.5 text-slate-500 group-hover:text-[#A855F7] group-hover:translate-x-0.5 transition-all duration-200" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between p-4 sm:px-6 bg-[#080817] border-t border-[rgba(139,92,246,0.15)] text-xs">
          <span className="text-[#94A3B8]">
            Selected: <strong className="text-[#F8FAFC]">{currentLanguage.country}</strong> ({currentLanguage.englishName})
          </span>
          <button
            onClick={() => setIsLanguageModalOpen(false)}
            className="rounded-xl bg-[#0D0D20] hover:bg-[#12122b] px-4 py-2 font-semibold text-[#C084FC] border border-[rgba(139,92,246,0.3)] transition-colors cursor-pointer"
          >
            {t.closeModal}
          </button>
        </div>
      </div>
    </div>
  );
};
