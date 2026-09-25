import React, { useState } from 'react';
import { ShieldCheck, CheckCircle2, Lock } from 'lucide-react';
import { useAgent } from '../../context/AgentContext';
import { ApprovalCard } from '../chat/ApprovalCard';

export const ApprovalsView: React.FC = () => {
  const { approvals, currentLanguage, t } = useAgent();
  const [filter, setFilter] = useState<'pending' | 'resolved' | 'all'>('pending');

  const pendingList = approvals.filter((a) => a.status === 'pending');
  const resolvedList = approvals.filter((a) => a.status !== 'pending');

  const displayedApprovals =
    filter === 'pending' ? pendingList : filter === 'resolved' ? resolvedList : approvals;

  return (
    <div id="approvals_view" className="flex-1 overflow-y-auto p-3.5 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto w-full text-[#F8FAFC]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[rgba(139,92,246,0.2)] pb-4 sm:pb-5">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-[#F8FAFC] flex items-center gap-2.5">
            <ShieldCheck className="h-6 w-6 text-[#D946EF]" />
            <span>{currentLanguage.labels.approvalsTitle}</span>
          </h1>
          <p className="mt-1 text-xs text-[#94A3B8]">
            {t.approvalsSubheader}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="rounded-xl bg-[#D946EF]/20 px-3.5 py-1.5 font-mono text-xs font-semibold text-[#F0ABFC] border border-[#D946EF]/40 shadow-[0_0_12px_rgba(217,70,239,0.3)]">
            {pendingList.length} Pending Actions
          </span>
        </div>
      </div>

      {/* Safety Policy Explainer Banner */}
      <div className="rounded-2xl bg-[#0D0D20] p-5 border border-[rgba(139,92,246,0.25)] shadow-[0_0_25px_rgba(124,58,237,0.1)]">
        <div className="flex items-start gap-3.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#7C3AED]/20 text-[#C084FC] border border-[#7C3AED]/40 shrink-0">
            <Lock className="h-5 w-5 text-[#C084FC]" />
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#C084FC]">
              Agent Security & Permission Enforcement Policy
            </h3>
            <p className="text-xs text-[#94A3B8] mt-1 leading-relaxed">
              {t.securityPolicyNotice}
            </p>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-[rgba(139,92,246,0.2)] pb-3 text-xs">
        <button
          onClick={() => setFilter('pending')}
          className={`rounded-xl px-3.5 py-1.5 font-semibold transition-all ${
            filter === 'pending'
              ? 'bg-[#D946EF]/20 text-[#F0ABFC] border border-[#D946EF]/50 shadow-[0_0_10px_rgba(217,70,239,0.3)]'
              : 'text-[#94A3B8] hover:text-[#F8FAFC]'
          }`}
        >
          {t.pendingReviewFilter} ({pendingList.length})
        </button>
        <button
          onClick={() => setFilter('resolved')}
          className={`rounded-xl px-3.5 py-1.5 font-semibold transition-all ${
            filter === 'resolved'
              ? 'bg-[#00D9A5]/20 text-[#00D9A5] border border-[#00D9A5]/50 shadow-[0_0_10px_rgba(0,217,165,0.3)]'
              : 'text-[#94A3B8] hover:text-[#F8FAFC]'
          }`}
        >
          {t.auditHistoryFilter} ({resolvedList.length})
        </button>
        <button
          onClick={() => setFilter('all')}
          className={`rounded-xl px-3.5 py-1.5 font-semibold transition-all ${
            filter === 'all'
              ? 'bg-[#7C3AED]/20 text-[#C084FC] border border-[#7C3AED]/40'
              : 'text-[#94A3B8] hover:text-[#F8FAFC]'
          }`}
        >
          {t.allRecordsFilter}
        </button>
      </div>

      {/* List of Approval Cards */}
      <div className="space-y-4 max-w-3xl">
        {displayedApprovals.length === 0 ? (
          <div className="rounded-2xl bg-[#0D0D20] p-8 text-center border border-[rgba(139,92,246,0.25)]">
            <CheckCircle2 className="mx-auto h-8 w-8 text-[#00D9A5] mb-2" />
            <h3 className="text-sm font-bold text-[#F8FAFC]">{t.noApprovalsWaiting}</h3>
            <p className="text-xs text-[#94A3B8] mt-1">
              {t.noApprovalsDesc}
            </p>
          </div>
        ) : (
          displayedApprovals.map((item) => (
            <ApprovalCard key={item.id} approval={item} />
          ))
        )}
      </div>
    </div>
  );
};
