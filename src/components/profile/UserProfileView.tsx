import React, { useState } from 'react';
import {
  User,
  Briefcase,
  Building,
  Mail,
  FileText,
  Target,
  Cpu,
  Sparkles,
  Save,
  CheckCircle2,
  Bot,
  Brain,
  ShieldCheck,
  Code2,
  Sliders,
  RefreshCw,
  Camera,
  Upload,
} from 'lucide-react';
import { useAgent } from '../../context/AgentContext';

export const UserProfileView: React.FC = () => {
  const { userProfile, updateUserProfile, currentLanguage } = useAgent();

  const [formData, setFormData] = useState({ ...userProfile });
  const [savedSuccess, setSavedSuccess] = useState(false);

  const isBangla = currentLanguage.id === 'bn';

  const handleProfilePicUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64Content = event.target?.result as string;
      setFormData((prev) => ({ ...prev, profileImage: base64Content }));
      updateUserProfile({ profileImage: base64Content });
    };
    reader.readAsDataURL(file);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setSavedSuccess(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div
      id="user_profile_view"
      className="flex-1 overflow-y-auto p-2.5 xs:p-3.5 sm:p-6 lg:p-8 space-y-4 sm:space-y-6 max-w-6xl mx-auto w-full animate-fadeIn"
    >
      {/* Top Banner Header */}
      <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-white/10 bg-gradient-to-r from-[#0B0826] via-[#120D3D] to-[#1E0B4B] p-5 sm:p-8 shadow-2xl">
        <div className="pointer-events-none absolute -top-20 right-0 h-80 w-80 rounded-full bg-[#7C3AED]/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 left-10 h-64 w-64 rounded-full bg-[#2563EB]/20 blur-3xl" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4 sm:gap-5">
            {/* User Avatar with Luxury Blue-Purple Gradient & Facebook-style Profile Picture Upload */}
            <div className="relative group shrink-0 flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full p-[3px] bg-gradient-to-r from-[#2563EB] via-[#7E17F8] to-[#C084FC] shadow-[0_0_25px_rgba(126,23,248,0.5)] cursor-pointer overflow-hidden">
              <div className="relative flex h-full w-full items-center justify-center rounded-full bg-[#09051B] overflow-hidden">
                {formData.profileImage ? (
                  <img
                    src={formData.profileImage}
                    alt={formData.name}
                    className="h-full w-full object-cover rounded-full"
                  />
                ) : (
                  <User className="h-8 w-8 sm:h-10 sm:w-10 text-white fill-white/80" />
                )}

                {/* Hover / Tap overlay (Facebook style) */}
                <label className="absolute inset-0 bg-black/75 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center gap-1 cursor-pointer transition-opacity duration-250">
                  <Camera className="h-5 w-5 sm:h-6 sm:w-6 text-white animate-bounce" />
                  <span className="text-[8px] sm:text-[10px] font-bold text-center px-1 text-slate-200">
                    {isBangla ? 'ছবি পরিবর্তন' : 'Change Photo'}
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleProfilePicUpload}
                    className="hidden"
                  />
                </label>
              </div>
              <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#00D9A5] border-2 border-[#09051B] text-[10px] z-10" title="Context Active">
                ✓
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="rounded-full bg-[#7C3AED]/25 px-2.5 py-0.5 text-[10px] sm:text-xs font-bold text-[#C084FC] border border-[#7C3AED]/40">
                  {isBangla ? 'ব্যবহারকারী প্রোফাইল ও প্রসঙ্গ' : 'User Profile & Context Memory'}
                </span>
                <span className="text-[10px] text-[#A855F7] font-semibold flex items-center gap-1">
                  <Camera className="h-3 w-3" />
                  {isBangla ? 'পরিবর্তন করতে ছবিতে ক্লিক করুন' : 'Click avatar to upload picture'}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {userProfile.name || 'User Profile'}
              </h1>
              <p className="text-xs sm:text-sm text-[#94A3B8] mt-0.5">
                {userProfile.role || 'Senior Software Engineer'} {userProfile.company ? `at ${userProfile.company}` : ''}
              </p>
            </div>
          </div>

          {/* Quick Stats Pill */}
          <div className="flex items-center gap-2 sm:gap-3 rounded-2xl bg-white/[0.04] p-3 border border-white/10 backdrop-blur-md">
            <Brain className="h-6 w-6 text-[#A855F7] animate-pulse shrink-0" />
            <div className="text-xs">
              <span className="block font-bold text-white">Agent Memory Active</span>
              <span className="text-[11px] text-[#00D9A5]">100% Context Synced</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Form Left, Agent Memory Card Right */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6">
        {/* Left 2 Cols: Editable Form */}
        <div className="lg:col-span-2 space-y-5">
          <form onSubmit={handleSubmit} className="rounded-2xl sm:rounded-3xl border border-white/10 bg-[#0F0B24]/90 p-5 sm:p-7 space-y-5 shadow-xl backdrop-blur-xl">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Sliders className="h-5 w-5 text-[#38BDF8]" />
                <h2 className="text-base sm:text-lg font-bold text-white">
                  {isBangla ? 'ব্যক্তিগত তথ্য ও এআই নির্দেশাবলী' : 'Personal Information & Agent Rules'}
                </h2>
              </div>

              {savedSuccess && (
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#00D9A5] bg-[#00D9A5]/10 px-3 py-1 rounded-full border border-[#00D9A5]/30 animate-fadeIn">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>{isBangla ? 'সংরক্ষিত হয়েছে!' : 'Saved Successfully!'}</span>
                </div>
              )}
            </div>

            {/* Basic Info Rows */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#CBD5E1] mb-1.5 flex items-center gap-1.5">
                  <User className="h-3.5 w-3.5 text-[#38BDF8]" />
                  {isBangla ? 'সম্পূর্ণ নাম' : 'Full Name'}
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-white/15 bg-white/[0.04] px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-white/30 focus:border-[#7C3AED] focus:outline-none focus:ring-1 focus:ring-[#7C3AED]"
                  placeholder="e.g. Abdullah"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#CBD5E1] mb-1.5 flex items-center gap-1.5">
                  <Briefcase className="h-3.5 w-3.5 text-[#C084FC]" />
                  {isBangla ? 'পদবী / দায়িত্ব' : 'Role / Job Title'}
                </label>
                <input
                  type="text"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-white/15 bg-white/[0.04] px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-white/30 focus:border-[#7C3AED] focus:outline-none focus:ring-1 focus:ring-[#7C3AED]"
                  placeholder="e.g. Senior Software Engineer"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#CBD5E1] mb-1.5 flex items-center gap-1.5">
                  <Building className="h-3.5 w-3.5 text-[#38BDF8]" />
                  {isBangla ? 'কোম্পানি / প্রতিষ্ঠান' : 'Company / Organization'}
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-white/15 bg-white/[0.04] px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-white/30 focus:border-[#7C3AED] focus:outline-none focus:ring-1 focus:ring-[#7C3AED]"
                  placeholder="e.g. Work Agent Systems"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#CBD5E1] mb-1.5 flex items-center gap-1.5">
                  <Mail className="h-3.5 w-3.5 text-[#00D9A5]" />
                  {isBangla ? 'ইমেইল ঠিকানা' : 'Email Address'}
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-white/15 bg-white/[0.04] px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-white/30 focus:border-[#7C3AED] focus:outline-none focus:ring-1 focus:ring-[#7C3AED]"
                  placeholder="e.g. pchamza2025@gmail.com"
                />
              </div>
            </div>

            {/* Bio & Background */}
            <div>
              <label className="block text-xs font-semibold text-[#CBD5E1] mb-1.5 flex items-center gap-1.5">
                <FileText className="h-3.5 w-3.5 text-[#C084FC]" />
                {isBangla ? 'প্রোফাইল বায়ো ও কাজের অভিজ্ঞতা' : 'Bio & Professional Summary'}
              </label>
              <textarea
                name="bio"
                rows={2}
                value={formData.bio}
                onChange={handleChange}
                className="w-full rounded-xl border border-white/15 bg-white/[0.04] px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-white/30 focus:border-[#7C3AED] focus:outline-none focus:ring-1 focus:ring-[#7C3AED]"
                placeholder="Describe what you work on day to day..."
              />
            </div>

            {/* Key Goals & Tech Stack */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#CBD5E1] mb-1.5 flex items-center gap-1.5">
                  <Target className="h-3.5 w-3.5 text-[#00D9A5]" />
                  {isBangla ? 'মূল লক্ষ্য ও কাজের প্রাধান্য' : 'Key Goals & Work Priorities'}
                </label>
                <textarea
                  name="goals"
                  rows={2}
                  value={formData.goals}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-white/15 bg-white/[0.04] px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-white/30 focus:border-[#7C3AED] focus:outline-none focus:ring-1 focus:ring-[#7C3AED]"
                  placeholder="e.g. Optimize React app speed, automate customer email replies"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#CBD5E1] mb-1.5 flex items-center gap-1.5">
                  <Code2 className="h-3.5 w-3.5 text-[#38BDF8]" />
                  {isBangla ? 'প্রযুক্তিসমূহ (Tech Stack)' : 'Technical Stack & Tools'}
                </label>
                <textarea
                  name="techStack"
                  rows={2}
                  value={formData.techStack}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-white/15 bg-white/[0.04] px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-white/30 focus:border-[#7C3AED] focus:outline-none focus:ring-1 focus:ring-[#7C3AED]"
                  placeholder="e.g. TypeScript, React, Tailwind, Node.js, Python"
                />
              </div>
            </div>

            {/* Custom Agent Instructions */}
            <div className="rounded-xl border border-[#7C3AED]/40 bg-[#7C3AED]/10 p-4 space-y-2">
              <label className="block text-xs font-bold text-[#C084FC] flex items-center gap-2">
                <Bot className="h-4 w-4 text-[#C084FC]" />
                {isBangla ? 'এআই এজেন্টের জন্য বিশেষ নির্দেশনা (Custom System Prompt)' : 'Custom Instructions for Your AI Agent'}
              </label>
              <p className="text-[11px] text-[#CBD5E1]">
                {isBangla
                  ? 'এখানে লিখুন এআই এজেন্ট আপনাকে কীভাবে সম্বোধন করবে এবং কোন স্টাইলে কাজ সমাধান করবে।'
                  : 'Specify exact preferences on how the AI agent should address you, present code, or format responses.'}
              </p>
              <textarea
                name="customAgentInstructions"
                rows={3}
                value={formData.customAgentInstructions}
                onChange={handleChange}
                className="w-full rounded-xl border border-white/20 bg-black/40 px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-white/30 focus:border-[#C084FC] focus:outline-none focus:ring-1 focus:ring-[#C084FC]"
                placeholder="e.g. Always address me as Abdullah. Give concise, step-by-step code in TypeScript with zero fluff."
              />
            </div>

            {/* Save Submit Button */}
            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#2563EB] via-[#7E17F8] to-[#C084FC] px-6 py-3 text-xs sm:text-sm font-bold text-white shadow-[0_0_20px_rgba(126,23,248,0.5)] transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <Save className="h-4 w-4" />
                <span>{isBangla ? 'প্রোফাইল সংরক্ষণ করুন' : 'Save Profile & Update Context'}</span>
              </button>
            </div>
          </form>
        </div>

        {/* Right Col: What the AI Agent Knows About You (Context Memory Matrix) */}
        <div className="space-y-5">
          {/* Facebook-style Profile Picture Showcase Card */}
          <div className="rounded-2xl sm:rounded-3xl border border-white/10 bg-[#0B0821]/70 overflow-hidden shadow-xl animate-fadeIn">
            <div className="h-20 bg-gradient-to-r from-[#2563EB] to-[#7C3AED] relative">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400/20 via-transparent to-transparent" />
            </div>
            <div className="px-5 pb-5 relative flex flex-col items-center">
              <div className="relative -mt-10 mb-3 shrink-0 flex h-20 w-20 items-center justify-center rounded-full p-[3px] bg-gradient-to-r from-[#2563EB] via-[#7E17F8] to-[#C084FC] shadow-lg">
                <div className="flex h-full w-full items-center justify-center rounded-full bg-[#09051B] overflow-hidden">
                  {userProfile.profileImage ? (
                    <img
                      src={userProfile.profileImage}
                      alt={userProfile.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <User className="h-10 w-10 text-white fill-white/80" />
                  )}
                </div>
              </div>
              <h3 className="text-base font-extrabold text-white">{userProfile.name}</h3>
              <p className="text-xs text-[#C084FC] font-semibold mt-0.5">{userProfile.role}</p>
              <p className="text-[11px] text-[#94A3B8] text-center mt-2 px-2 line-clamp-2">
                {userProfile.bio}
              </p>
              <div className="mt-4 w-full flex items-center justify-center gap-1.5 rounded-xl bg-[#00D9A5]/10 p-2 border border-[#00D9A5]/20 text-[#00D9A5] text-[10px] font-bold">
                <ShieldCheck className="h-4 w-4 shrink-0" />
                <span>Primary Email: {userProfile.email}</span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl sm:rounded-3xl border border-[#7C3AED]/30 bg-[#0B0821] p-5 space-y-4 shadow-xl">
            <div className="flex items-center gap-2.5 pb-3 border-b border-white/10">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#7C3AED]/20 border border-[#7C3AED]/40 text-[#C084FC]">
                <Brain className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Agent Memory Matrix</h3>
                <p className="text-[11px] text-[#94A3B8]">Active user context loaded into LLM</p>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 space-y-1">
                <span className="text-[10px] uppercase font-mono text-[#38BDF8] font-bold block">User Identity</span>
                <p className="text-white font-semibold">{userProfile.name || 'User'}</p>
                <p className="text-[#94A3B8]">{userProfile.role}</p>
              </div>

              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 space-y-1">
                <span className="text-[10px] uppercase font-mono text-[#00D9A5] font-bold block">Organization</span>
                <p className="text-white">{userProfile.company || 'Autonomous Work OS'}</p>
                <p className="text-[#94A3B8] text-[11px]">{userProfile.email}</p>
              </div>

              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 space-y-1">
                <span className="text-[10px] uppercase font-mono text-[#C084FC] font-bold block">Custom Directive</span>
                <p className="text-[#E2E8F0] italic">{userProfile.customAgentInstructions || 'Default concise AI work OS mode.'}</p>
              </div>

              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 space-y-1">
                <span className="text-[10px] uppercase font-mono text-[#F59E0B] font-bold block">Tech Stack</span>
                <p className="text-[#CBD5E1]">{userProfile.techStack}</p>
              </div>
            </div>

            <div className="pt-2 text-[11px] text-[#94A3B8] flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-[#00D9A5] shrink-0" />
              <span>All user memory is kept 100% private and local to your agent OS session.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
