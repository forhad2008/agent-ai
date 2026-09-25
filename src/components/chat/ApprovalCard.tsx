import React, { useState } from 'react';
import { ShieldAlert, Check, X, Edit3, RotateCw, AlertTriangle, Send } from 'lucide-react';
import { ApprovalRequest } from '../../types';
import { useAgent } from '../../context/AgentContext';

interface ApprovalCardProps {
  approval: ApprovalRequest;
}

export const ApprovalCard: React.FC<ApprovalCardProps> = ({ approval }) => {
  const { approveAction, rejectAction, handleSendMessage, settings, t } = useAgent();
  const [isEditing, setIsEditing] = useState(false);
  const [editedPreview, setEditedPreview] = useState(approval.preview || approval.details);

  const isPending = approval.status === 'pending';
  const isApproved = approval.status === 'approved';
  const isRejected = approval.status === 'rejected';

  const handleApprove = () => {
    approveAction(approval.id);
  };

  const handleReject = () => {
    rejectAction(approval.id);
  };

  const handleRegenerate = () => {
    handleSendMessage(`Please regenerate the draft for: "${approval.action}" with a slightly different professional tone.`);
  };

  const handleSaveEdit = () => {
    setIsEditing(false);
    approval.preview = editedPreview;
  };

  return (
    <div
      id={`approval_card_${approval.id}`}
      className={`my-4 overflow-hidden rounded-2xl border backdrop-blur-md transition-all shadow-xl ${
        isApproved
          ? 'bg-[#0D0D20] border-[#00D9A5]/40 text-[#F8FAFC]'
          : isRejected
          ? 'bg-[#0D0D20] border-rose-500/40 text-[#F8FAFC]'
          : 'bg-[#0D0D20] border-[rgba(139,92,246,0.35)] shadow-[0_0_25px_rgba(124,58,237,0.15)]'
      }`}
    >
      {/* Header Banner */}
      <div
        className={`flex items-center justify-between border-b px-4 py-3 ${
          isApproved
            ? 'bg-[#00D9A5]/10 border-[#00D9A5]/30'
            : isRejected
            ? 'bg-rose-950/40 border-rose-500/30'
            : 'bg-[#080817] border-[rgba(139,92,246,0.25)]'
        }`}
      >
        <div className="flex items-center gap-2">
          {isApproved ? (
            <Check className="h-4 w-4 text-[#00D9A5]" />
          ) : isRejected ? (
            <X className="h-4 w-4 text-rose-400" />
          ) : (
            <ShieldAlert className="h-4 w-4 text-[#D946EF] animate-pulse" />
          )}
          <span className="text-xs font-bold uppercase tracking-wider text-[#F8FAFC]">
            {isApproved
              ? t.actionApprovedExecuted
              : isRejected
              ? t.actionDeniedCancelled
              : t.approvalRequired}
          </span>
        </div>

        <div className="flex items-center gap-1.5 rounded-lg bg-[#050510] px-2.5 py-1 text-[10px] font-mono border border-[rgba(139,92,246,0.3)]">
          <AlertTriangle className="h-3 w-3 text-[#D946EF]" />
          <span className="text-[#C084FC] font-semibold">{approval.riskLevel}</span>
        </div>
      </div>

      {/* Body Details */}
      <div className="p-4 sm:p-5 space-y-3.5 text-xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[#94A3B8]">
          <div className="rounded-xl bg-[#080817] p-2.5 border border-[rgba(139,92,246,0.15)]">
            <span className="text-[10px] font-medium text-[#94A3B8] block uppercase tracking-wide">
              {settings.language === 'Bangla' ? 'অ্যাকশন:' : 'Action:'}
            </span>
            <span className="font-semibold text-[#F8FAFC]">{approval.action}</span>
          </div>
          <div className="rounded-xl bg-[#080817] p-2.5 border border-[rgba(139,92,246,0.15)]">
            <span className="text-[10px] font-medium text-[#94A3B8] block uppercase tracking-wide">
              {settings.language === 'Bangla' ? 'প্রাপক / লক্ষ্য:' : 'Recipient / Target:'}
            </span>
            <span className="font-semibold text-[#F8FAFC]">{approval.recipient}</span>
          </div>
        </div>

        <div className="rounded-xl bg-[#080817] p-2.5 border border-[rgba(139,92,246,0.15)]">
          <span className="text-[10px] font-medium text-[#94A3B8] block uppercase tracking-wide">
            {settings.language === 'Bangla' ? 'ঝুঁকির কারণ:' : 'Risk Category:'}
          </span>
          <p className="text-[#F8FAFC] mt-0.5">{approval.riskReason}</p>
        </div>

        {/* Message Preview or Editable Text */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] font-medium text-[#94A3B8] uppercase tracking-wide">
              {settings.language === 'Bangla' ? 'খসড়া মেসেজ প্রিভিউ:' : 'Message Draft Preview:'}
            </span>
            {isPending && !isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-1 text-[11px] text-[#C084FC] hover:text-[#E9D5FF]"
              >
                <Edit3 className="h-3 w-3" />
                {settings.language === 'Bangla' ? 'সংশোধন' : 'Edit Draft'}
              </button>
            )}
          </div>

          {isEditing ? (
            <div className="space-y-2">
              <textarea
                value={editedPreview}
                onChange={(e) => setEditedPreview(e.target.value)}
                rows={4}
                className="w-full rounded-xl bg-[#050510] p-3 text-xs text-[#F8FAFC] border border-[#7C3AED]/60 focus:border-[#C084FC] focus:outline-none"
              />
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setIsEditing(false)}
                  className="rounded-lg px-2.5 py-1 text-[11px] text-[#94A3B8] hover:bg-[#080817]"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveEdit}
                  className="rounded-lg bg-[#7C3AED]/20 px-3 py-1 text-[11px] font-medium text-[#C084FC] border border-[#7C3AED]/40 hover:bg-[#7C3AED]/30"
                >
                  Save Changes
                </button>
              </div>
            </div>
          ) : (
            <div className="rounded-xl bg-[#050510] p-3 text-[#F8FAFC] border border-[rgba(139,92,246,0.2)] font-mono text-[11px] leading-relaxed whitespace-pre-wrap">
              {editedPreview}
            </div>
          )}
        </div>

        {/* Actions Button Bar */}
        {isPending ? (
          <div className="pt-2 flex flex-wrap items-center justify-end gap-2 border-t border-[rgba(139,92,246,0.2)]">
            <button
              id={`btn_regenerate_${approval.id}`}
              onClick={handleRegenerate}
              className="flex items-center gap-1.5 rounded-xl bg-[#080817] px-3 py-2 text-xs font-medium text-[#94A3B8] border border-[rgba(139,92,246,0.25)] hover:bg-[#12122b] hover:text-[#F8FAFC] transition-colors"
            >
              <RotateCw className="h-3.5 w-3.5" />
              <span>{t.regenerateOption}</span>
            </button>

            <button
              id={`btn_reject_${approval.id}`}
              onClick={handleReject}
              className="flex items-center gap-1.5 rounded-xl bg-rose-500/15 px-3 py-2 text-xs font-semibold text-rose-300 border border-rose-500/30 hover:bg-rose-500/25 transition-colors"
            >
              <X className="h-3.5 w-3.5" />
              <span>{t.rejectCancel}</span>
            </button>

            <button
              id={`btn_approve_${approval.id}`}
              onClick={handleApprove}
              className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-[#00D9A5] to-[#059669] px-4 py-2 text-xs font-bold text-[#050510] shadow-[0_0_15px_rgba(0,217,165,0.4)] hover:brightness-110 transition-all"
            >
              <Check className="h-3.5 w-3.5 stroke-[3]" />
              <span>{t.approveExecute}</span>
            </button>
          </div>
        ) : (
          <div className="pt-2 flex items-center justify-between border-t border-[rgba(139,92,246,0.2)] text-[11px] text-[#94A3B8]">
            <span>Logged in audit trail</span>
            <span className="font-mono">{approval.timestamp}</span>
          </div>
        )}
      </div>
    </div>
  );
};
