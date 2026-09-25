import React, { useState } from 'react';
import {
  Clock,
  Search,
  Download,
} from 'lucide-react';
import { useAgent } from '../../context/AgentContext';

export const ActivityView: React.FC = () => {
  const { activities, currentLanguage, t } = useAgent();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'success' | 'failed' | 'pending'>('All');

  const filtered = activities.filter((act) => {
    const matchesSearch =
      act.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      act.tool.toLowerCase().includes(searchQuery.toLowerCase()) ||
      act.result.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || act.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleExportJSON = () => {
    const blob = new Blob([JSON.stringify(activities, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `agent-activity-audit-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div id="activity_view" className="flex-1 overflow-y-auto p-3.5 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto w-full text-[#F8FAFC]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[rgba(139,92,246,0.2)] pb-4 sm:pb-5">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-[#F8FAFC] flex items-center gap-2.5">
            <Clock className="h-6 w-6 text-[#C084FC]" />
            <span>{currentLanguage.labels.activityTitle}</span>
          </h1>
          <p className="mt-1 text-xs text-[#94A3B8]">
            {t.activitySubtitle}
          </p>
        </div>

        <button
          onClick={handleExportJSON}
          className="flex items-center gap-1.5 rounded-2xl bg-[#0D0D20] px-3.5 py-2.5 text-xs font-semibold text-[#F8FAFC] border border-[rgba(139,92,246,0.25)] hover:bg-[#12122b] transition-colors shadow-sm"
        >
          <Download className="h-4 w-4 text-[#C084FC]" />
          <span>{t.exportAuditJsonBtn}</span>
        </button>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#94A3B8]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search action or tool..."
            className="w-full rounded-2xl bg-[#0D0D20] pl-10 pr-4 py-2.5 text-xs text-[#F8FAFC] placeholder:text-[#94A3B8]/60 border border-[rgba(139,92,246,0.25)] focus:outline-none focus:border-[#A855F7]"
          />
        </div>

        <div className="flex items-center gap-1.5 text-xs overflow-x-auto pb-1">
          {(['All', 'success', 'failed', 'pending'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`rounded-xl px-3 py-1.5 font-medium transition-all ${
                statusFilter === st
                  ? 'bg-[#7C3AED]/25 text-[#C084FC] border border-[#7C3AED]/50 shadow-[0_0_10px_rgba(124,58,237,0.3)]'
                  : 'bg-[#0D0D20] text-[#94A3B8] border border-[rgba(139,92,246,0.2)] hover:bg-[#12122b]'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Activity Table */}
      <div className="overflow-hidden rounded-2xl border border-[rgba(139,92,246,0.25)] bg-[#0D0D20] shadow-[0_0_25px_rgba(124,58,237,0.06)]">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[#94A3B8]">
            <thead className="bg-[#080817] text-[10px] uppercase font-semibold text-[#94A3B8] tracking-wider border-b border-[rgba(139,92,246,0.2)]">
              <tr>
                <th className="px-4 py-3.5">Timestamp</th>
                <th className="px-4 py-3.5">Action Taken</th>
                <th className="px-4 py-3.5">Tool Used</th>
                <th className="px-4 py-3.5">Approval Gate</th>
                <th className="px-4 py-3.5">Execution Outcome</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[rgba(139,92,246,0.12)]">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-[#12122b] transition-colors">
                  <td className="px-4 py-3 font-mono text-[11px] text-[#94A3B8] whitespace-nowrap">
                    {item.timestamp}
                  </td>
                  <td className="px-4 py-3 font-semibold text-[#F8FAFC]">
                    {item.action}
                  </td>
                  <td className="px-4 py-3">
                    <span className="rounded-lg bg-[#080817] px-2 py-0.5 font-mono text-[10px] text-[#C084FC] border border-[rgba(139,92,246,0.2)]">
                      {item.tool}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center gap-1 rounded-lg px-2 py-0.5 text-[10px] font-mono border ${
                        item.approvalStatus === 'approved'
                          ? 'bg-[#00D9A5]/15 text-[#00D9A5] border-[#00D9A5]/30'
                          : item.approvalStatus === 'not_required'
                          ? 'bg-[#080817] text-[#94A3B8] border-[rgba(139,92,246,0.2)]'
                          : 'bg-[#D946EF]/15 text-[#F0ABFC] border-[#D946EF]/30'
                      }`}
                    >
                      {item.approvalStatus}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-mono text-[11px] text-[#F8FAFC] max-w-xs truncate">
                    {item.result}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
