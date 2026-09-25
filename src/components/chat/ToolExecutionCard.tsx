import React, { useState } from 'react';
import { Wrench, CheckCircle2, ChevronDown, ChevronUp, ExternalLink, Code2, Globe, FileText, Database } from 'lucide-react';
import { ToolExecutionRecord } from '../../types';

interface ToolExecutionCardProps {
  tool: ToolExecutionRecord;
}

export const ToolExecutionCard: React.FC<ToolExecutionCardProps> = ({ tool }) => {
  const [expanded, setExpanded] = useState(false);

  const getToolIcon = () => {
    switch (tool.category) {
      case 'WEB_TOOLS':
        return <Globe className="h-3.5 w-3.5 text-sky-400" />;
      case 'CODE_TOOLS':
        return <Code2 className="h-3.5 w-3.5 text-indigo-400" />;
      case 'FILE_TOOLS':
        return <FileText className="h-3.5 w-3.5 text-amber-400" />;
      case 'DATA_TOOLS':
        return <Database className="h-3.5 w-3.5 text-teal-400" />;
      default:
        return <Wrench className="h-3.5 w-3.5 text-emerald-400" />;
    }
  };

  return (
    <div className="my-2 rounded-xl bg-[#080817] border border-[rgba(139,92,246,0.25)] text-xs overflow-hidden">
      <div
        onClick={() => setExpanded(!expanded)}
        className="flex cursor-pointer items-center justify-between px-3.5 py-2.5 hover:bg-[#0D0D20] transition-colors"
      >
        <div className="flex items-center gap-2">
          {getToolIcon()}
          <span className="font-mono text-[#F8FAFC] font-medium">{tool.toolName}</span>
          <span className="rounded-lg bg-[#0D0D20] px-2 py-0.5 text-[10px] text-[#94A3B8] border border-[rgba(139,92,246,0.2)]">
            {tool.category}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1 text-[11px] font-medium text-[#00D9A5]">
            <CheckCircle2 className="h-3.5 w-3.5 text-[#00D9A5]" />
            Executed
          </span>
          {expanded ? (
            <ChevronUp className="h-3.5 w-3.5 text-[#94A3B8]" />
          ) : (
            <ChevronDown className="h-3.5 w-3.5 text-[#94A3B8]" />
          )}
        </div>
      </div>

      {expanded && (
        <div className="border-t border-[rgba(139,92,246,0.2)] bg-[#050510] px-3.5 py-2.5 text-[#F8FAFC]">
          <p className="text-[11px] leading-relaxed text-[#94A3B8] font-mono">
            {tool.description}
          </p>
        </div>
      )}
    </div>
  );
};
