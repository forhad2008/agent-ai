import React from 'react';
import { Check, Loader2, Circle, ListOrdered } from 'lucide-react';
import { PlanStep } from '../../types';
import { useAgent } from '../../context/AgentContext';

interface PlanProgressCardProps {
  taskTitle?: string;
  steps: PlanStep[];
  isGenerating?: boolean;
}

export const PlanProgressCard: React.FC<PlanProgressCardProps> = ({
  taskTitle,
  steps,
  isGenerating,
}) => {
  const { t } = useAgent();
  if (!steps || steps.length === 0) return null;

  return (
    <div
      id="plan_progress_card"
      className="my-3 overflow-hidden rounded-2xl bg-[#0D0D20] border border-[rgba(139,92,246,0.25)] shadow-lg backdrop-blur-sm"
    >
      <div className="flex items-center justify-between border-b border-[rgba(139,92,246,0.2)] bg-[#080817] px-4 py-2.5">
        <div className="flex items-center gap-2">
          <ListOrdered className="h-4 w-4 text-[#C084FC]" />
          <span className="text-xs font-semibold uppercase tracking-wider text-[#F8FAFC]">
            {t.taskExecutionPlan}
          </span>
        </div>
        {isGenerating && (
          <span className="flex items-center gap-1.5 text-[11px] font-medium text-[#C084FC]">
            <Loader2 className="h-3 w-3 animate-spin text-[#C084FC]" />
            {t.inProgress}
          </span>
        )}
      </div>

      <div className="px-4 py-3">
        {taskTitle && (
          <p className="mb-2 text-xs font-medium text-[#94A3B8] italic">
            "{taskTitle}"
          </p>
        )}

        <div className="space-y-2">
          {steps.map((step, idx) => {
            const isDone = step.status === 'completed';
            const isRunning = step.status === 'running';

            return (
              <div
                key={idx}
                className={`flex items-center gap-3 text-xs transition-colors ${
                  isDone
                    ? 'text-[#F8FAFC]'
                    : isRunning
                    ? 'text-[#C084FC] font-medium'
                    : 'text-[#94A3B8]/60'
                }`}
              >
                <div className="flex h-5 w-5 items-center justify-center shrink-0">
                  {isDone ? (
                    <div className="flex h-4 w-4 items-center justify-center rounded-full bg-[#00D9A5]/20 text-[#00D9A5] border border-[#00D9A5]/40">
                      <Check className="h-2.5 w-2.5 stroke-[3]" />
                    </div>
                  ) : isRunning ? (
                    <div className="relative flex h-3.5 w-3.5 items-center justify-center">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#C084FC] opacity-60"></span>
                      <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#C084FC]"></span>
                    </div>
                  ) : (
                    <Circle className="h-3.5 w-3.5 text-[#94A3B8]/40 stroke-[2]" />
                  )}
                </div>
                <span className="leading-snug">{step.title}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
