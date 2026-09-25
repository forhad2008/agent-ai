import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import {
  Send,
  Square,
  RotateCw,
  Copy,
  Check,
  Paperclip,
  Mic,
  Sparkles,
  Plus,
  FileText,
  AlertCircle,
  HelpCircle,
  X,
  FileCode,
  ShieldAlert,
  MoreVertical,
  Trash2,
} from 'lucide-react';
import { useAgent } from '../../context/AgentContext';
import { PlanProgressCard } from './PlanProgressCard';
import { ApprovalCard } from './ApprovalCard';
import { ToolExecutionCard } from './ToolExecutionCard';
import { FileItem } from '../../types';

const ThinkingTraceSection: React.FC<{ thinkingText: string }> = ({ thinkingText }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="my-2.5 overflow-hidden rounded-xl bg-[#08081a] border border-[#7C3AED]/20 shadow-sm transition-all">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between px-3.5 py-2 text-left text-[11px] font-bold uppercase tracking-wider text-[#C084FC] hover:bg-[#12122b]/40 transition-colors focus:outline-none"
      >
        <div className="flex items-center gap-2">
          <div className="relative flex h-3.5 w-3.5 items-center justify-center">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#7C3AED] opacity-35"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#C084FC]"></span>
          </div>
          <span className="font-semibold tracking-wider text-[#C084FC]">Agent Cognitive Thoughts</span>
        </div>
        <span className="text-[10px] text-[#94A3B8] font-mono tracking-wide">{isOpen ? 'COLLAPSE' : 'EXPAND TRACE'}</span>
      </button>
      {isOpen && (
        <div className="border-t border-[#7C3AED]/15 bg-[#050512] p-3 font-mono text-[11px] leading-relaxed text-[#94A3B8] whitespace-pre-wrap select-all">
          <div className="flex items-start gap-1 text-[#00D9A5] mb-1.5 font-bold tracking-tight">
            <span>&gt;_ [system_cognitive_loop] analyzing risk & delegation rules...</span>
          </div>
          {thinkingText}
        </div>
      )}
    </div>
  );
};

export const ChatView: React.FC = () => {
  const {
    messages,
    handleSendMessage,
    isGenerating,
    stopGeneration,
    regenerateLastResponse,
    startNewConversation,
    activePlan,
    files,
    settings,
    currentLanguage,
    t,
    setIsLanguageModalOpen,
    deleteMessageWhatsAppStyle,
  } = useAgent();

  const [input, setInput] = useState('');
  const [selectedAttachedFiles, setSelectedAttachedFiles] = useState<FileItem[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [showAttachMenu, setShowAttachMenu] = useState(false);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // High-performance response action timer (10s guarantee countdown)
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isGenerating) {
      setCountdown(10);
      interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            return 1;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isGenerating]);

  const demoSuggestions = [
    { title: t.demoAnalyzeWebsite, prompt: t.demoAnalyzeWebsitePrompt },
    { title: t.demoCustomerReply, prompt: t.demoCustomerReplyPrompt },
    { title: t.demoProductDescription, prompt: t.demoProductDescriptionPrompt },
    { title: t.demoDebugCode, prompt: t.demoDebugCodePrompt },
    { title: t.demoResearchTrends, prompt: t.demoResearchTrendsPrompt },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isGenerating, activePlan]);

  const handleSend = async () => {
    if (!input.trim() || isGenerating) return;
    const textToSend = input;
    const attachedToSend = [...selectedAttachedFiles];
    setInput('');
    setSelectedAttachedFiles([]);
    await handleSendMessage(textToSend, attachedToSend);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleCopyText = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleAttachWorkspaceFile = (file: FileItem) => {
    if (!selectedAttachedFiles.some((f) => f.id === file.id)) {
      setSelectedAttachedFiles([...selectedAttachedFiles, file]);
    }
    setShowAttachMenu(false);
  };

  const handleNativeFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = e.target.files;
    if (!uploadedFiles || uploadedFiles.length === 0) return;

    for (let i = 0; i < uploadedFiles.length; i++) {
      const f = uploadedFiles[i];
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        const newAttachedFile: FileItem = {
          id: `file_${Date.now()}_${i}`,
          name: f.name,
          size: `${(f.size / 1024).toFixed(1)} KB`,
          type: f.type || 'text/plain',
          extension: f.name.split('.').pop() || '',
          updatedAt: 'Just now',
          category: 'document',
          content: content || '[Binary or unreadable file content]',
        };
        setSelectedAttachedFiles((prev) => [...prev, newAttachedFile]);
      };
      if (f.type.includes('text') || f.name.endsWith('.json') || f.name.endsWith('.js') || f.name.endsWith('.ts') || f.name.endsWith('.md') || f.name.endsWith('.csv')) {
        reader.readAsText(f);
      } else {
        reader.readAsDataURL(f);
      }
    }
    setShowAttachMenu(false);
  };

  const toggleVoiceInput = () => {
    if (!isRecording) {
      setIsRecording(true);
      const simulatedText = settings.language === 'Bangla' 
        ? 'ওয়েবসাইটের নিরাপত্তা ও কর্মক্ষমতা বিশ্লেষণ করো'
        : 'Analyze website performance and security vulnerabilities';
      setTimeout(() => {
        setInput((prev) => (prev ? `${prev} ${simulatedText}` : simulatedText));
        setIsRecording(false);
      }, 2500);
    } else {
      setIsRecording(false);
    }
  };

  return (
    <div id="ai_chat_view" className="flex h-full flex-col bg-[#050510] text-[#F8FAFC]">
      {/* Chat Top Subheader */}
      <div className="flex shrink-0 items-center justify-between border-b border-[rgba(139,92,246,0.25)] bg-[#080817] px-3.5 py-2.5 sm:px-6">
        <div className="flex items-center gap-2.5 sm:gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#7C3AED]/20 text-[#C084FC] border border-[#7C3AED]/30">
            <Sparkles className="h-4 w-4 text-[#C084FC]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#F8FAFC]">
                Personal Work Agent Active
              </h3>
              <button
                onClick={() => setIsLanguageModalOpen(true)}
                className="hidden sm:inline-flex items-center gap-1 rounded-full bg-[#0D0D20] px-2 py-0.5 text-[10px] text-[#C084FC] border border-[rgba(139,92,246,0.3)] hover:border-[#A855F7]"
              >
                <span>{currentLanguage.flag}</span>
                <span>{currentLanguage.country}</span>
              </button>
            </div>
            <p className="text-[11px] text-[#94A3B8]">
              {t.chatSubheader}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsLanguageModalOpen(true)}
            className="flex sm:hidden items-center gap-1 rounded-lg bg-[#0D0D20] px-2 py-1 text-xs text-[#F8FAFC] border border-[rgba(139,92,246,0.25)]"
            title="Change Language Mode"
          >
            <span>{currentLanguage.flag}</span>
          </button>

          <button
            id="btn_new_conversation"
            onClick={startNewConversation}
            className="flex items-center gap-1.5 rounded-xl bg-[#0D0D20] px-3 py-1.5 text-xs font-medium text-[#C084FC] border border-[rgba(139,92,246,0.3)] hover:bg-[#12122b] hover:text-white transition-colors"
          >
            <Plus className="h-3.5 w-3.5 text-[#A855F7]" />
            <span className="hidden sm:inline">
              {t.newSession}
            </span>
          </button>
        </div>
      </div>

      {/* Message Stream */}
      <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6 lg:px-8 space-y-6">
        {/* Suggestion Prompts if history is short */}
        {messages.length <= 2 && (
          <div className="mx-auto max-w-3xl mb-6">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#94A3B8]">
              {t.quickSuggestionsTitle}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {demoSuggestions.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(item.prompt)}
                  className="flex flex-col items-start p-3 text-left rounded-2xl bg-[#0D0D20] border border-[rgba(139,92,246,0.25)] hover:border-[#A855F7]/50 hover:bg-[#12122b] transition-all group shadow-sm"
                >
                  <span className="text-xs font-bold text-[#F8FAFC] group-hover:text-[#C084FC]">
                    {item.title}
                  </span>
                  <span className="text-[11px] text-[#94A3B8] line-clamp-2 mt-1">
                    "{item.prompt}"
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Message Items */}
        <div className="mx-auto max-w-3xl space-y-6">
          {messages.map((msg) => {
            if (msg.isDeleted && msg.deletedType === 'me') {
              return null; // WhatsApp "Delete for Me" fully hides the message locally
            }
            const isUser = msg.sender === 'user';

            return (
              <div
                key={msg.id}
                id={`message_${msg.id}`}
                className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} group relative`}
              >
                {/* Sender badge & timestamp */}
                <div className="flex items-center gap-2 mb-1 px-1 text-[11px] text-[#94A3B8]">
                  <span className="font-semibold text-[#F8FAFC]">
                    {isUser ? 'You (Abdullah)' : 'Abdullah AI Work Agent'}
                  </span>
                  <span>•</span>
                  <span>{msg.timestamp}</span>
                </div>

                {/* Message Bubble Container */}
                <div
                  className={`relative max-w-[92%] sm:max-w-[85%] rounded-2xl p-4 sm:p-5 shadow-sm text-sm leading-relaxed transition-all duration-200 ${
                    msg.isDeleted
                      ? 'bg-slate-950/40 text-slate-500 border border-slate-800/60 rounded-2xl italic shadow-inner'
                      : isUser
                        ? 'bg-gradient-to-r from-[#6320EE] via-[#551FD8] to-[#4F46E5] text-[#F8FAFC] rounded-tr-none shadow-[0_0_20px_rgba(99,32,238,0.35)] border border-[rgba(192,132,252,0.3)]'
                        : 'bg-[#0D0D20] text-[#F8FAFC] border border-[rgba(139,92,246,0.25)] rounded-tl-none shadow-[0_0_30px_rgba(124,58,237,0.08)]'
                  }`}
                >
                  {/* WhatsApp Menu Dropdown Trigger */}
                  {!msg.isDeleted && (
                    <div className="absolute right-2 top-2 z-20 sm:opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity duration-150">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveMenuId(activeMenuId === msg.id ? null : msg.id);
                        }}
                        className="p-1 rounded-lg bg-black/40 hover:bg-black/60 text-slate-400 hover:text-white transition-all cursor-pointer"
                        title="Delete Options"
                      >
                        <MoreVertical className="h-3.5 w-3.5" />
                      </button>

                      {activeMenuId === msg.id && (
                        <div className="absolute right-0 mt-1.5 w-40 rounded-xl bg-[#09071b] border border-purple-500/25 py-1 shadow-2xl z-30 animate-fadeIn">
                          <button
                            type="button"
                            onClick={() => {
                              deleteMessageWhatsAppStyle(msg.id, 'everyone');
                              setActiveMenuId(null);
                            }}
                            className="w-full text-left px-3 py-1.5 text-[10px] font-black text-rose-400 hover:bg-rose-500/10 flex items-center gap-2 transition-colors cursor-pointer"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                            <span>Delete for Everyone</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              deleteMessageWhatsAppStyle(msg.id, 'me');
                              setActiveMenuId(null);
                            }}
                            className="w-full text-left px-3 py-1.5 text-[10px] font-black text-slate-300 hover:bg-white/5 flex items-center gap-2 transition-colors cursor-pointer"
                          >
                            <X className="h-3.5 w-3.5 text-slate-400" />
                            <span>Delete for Me</span>
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                  {msg.isDeleted ? (
                    <div className="flex items-center gap-2 text-slate-500 select-none italic text-xs sm:text-sm">
                      <AlertCircle className="h-4 w-4 text-slate-600 shrink-0" />
                      <span>{settings.language === 'Bangla' ? '🚫 এই বার্তাটি মুছে ফেলা হয়েছে' : '🚫 This message was deleted'}</span>
                    </div>
                  ) : (
                    <>
                      {/* Attached files indicator in user msg */}
                      {msg.attachedFiles && msg.attachedFiles.length > 0 && (
                        <div className="mb-3 flex flex-wrap gap-1.5 pb-2 border-b border-white/20">
                          {msg.attachedFiles.map((file, i) => (
                            <span
                              key={i}
                              className="flex items-center gap-1 rounded bg-black/30 px-2 py-1 text-[11px] font-mono text-purple-100"
                            >
                              <Paperclip className="h-3 w-3" />
                              <span>{file.name}</span>
                              <span className="opacity-70">({file.size})</span>
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Collapsible Cognitive Thinking Process block */}
                      {!isUser && msg.thinkingText && (
                        <ThinkingTraceSection thinkingText={msg.thinkingText} />
                      )}

                      {/* Plan Steps Card if embedded */}
                      {msg.planSteps && msg.planSteps.length > 0 && (
                        <PlanProgressCard steps={msg.planSteps} isGenerating={false} />
                      )}

                      {/* Tool Executions Cards */}
                      {msg.toolExecutions && msg.toolExecutions.length > 0 && (
                        <div className="my-3 space-y-1.5">
                          <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                            Executed Tools & Verifications:
                          </div>
                          {msg.toolExecutions.map((toolExec, i) => (
                            <ToolExecutionCard key={i} tool={toolExec} />
                          ))}
                        </div>
                      )}

                      {/* Markdown formatted content */}
                      <div className="prose prose-invert prose-sm max-w-none text-slate-200">
                        <ReactMarkdown>{msg.text}</ReactMarkdown>
                      </div>

                      {/* Embedded Approval Card if waiting for user confirmation */}
                      {msg.requiresApproval && msg.approvalDetails && (
                        <ApprovalCard approval={msg.approvalDetails} />
                      )}

                      {/* Error recovery card */}
                      {msg.error && (
                        <div className="mt-3 rounded-xl bg-rose-950/30 p-3 border border-rose-500/40 text-xs">
                          <div className="flex items-center gap-2 text-rose-300 font-bold mb-1">
                            <AlertCircle className="h-4 w-4" />
                            <span>Execution Anomaly Detected</span>
                          </div>
                          <p className="text-slate-300 font-mono text-[11px]">{msg.error.reason}</p>
                          <div className="mt-2 text-slate-400 flex items-center justify-between pt-2 border-t border-rose-900/40">
                            <span>Next: {msg.error.next}</span>
                            <button
                              onClick={regenerateLastResponse}
                              className="text-purple-400 hover:text-purple-300 font-bold hover:underline"
                            >
                              Retry Step
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Actions (Copy / Regenerate) for agent responses */}
                      {!isUser && (
                        <div className="mt-3 flex items-center gap-2 pt-2 border-t border-[#1b1f54] text-[11px] text-slate-400">
                      <button
                        onClick={() => handleCopyText(msg.id, msg.text)}
                        className="flex items-center gap-1 rounded px-2 py-1 hover:bg-[#151944] hover:text-slate-200 transition-colors"
                        title="Copy message text"
                      >
                        {copiedId === msg.id ? (
                          <>
                            <Check className="h-3 w-3 text-emerald-400" />
                            <span className="text-emerald-400 font-medium">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="h-3 w-3" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>

                      <button
                        onClick={regenerateLastResponse}
                        className="flex items-center gap-1 rounded px-2 py-1 hover:bg-[#151944] hover:text-slate-200 transition-colors"
                        title="Regenerate response"
                      >
                        <RotateCw className="h-3 w-3" />
                        <span>Regenerate</span>
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
            );
          })}

          {/* Active Generation Indicator & Live Plan Steps */}
          {isGenerating && (
            <div className="flex flex-col items-start space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 px-1 text-[11px] text-purple-400">
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-purple-400 animate-ping" />
                  <span className="font-semibold">Abdullah AI Work Agent</span>
                </div>
                <span className="hidden sm:inline">•</span>
                <span className="bg-[#00D9A5]/10 text-[#00D9A5] px-2 py-0.5 rounded-md border border-[#00D9A5]/20 font-bold tracking-wider font-mono text-[9px] animate-pulse">
                  ⚡ 10S IMMEDIATE ACTION GUARANTEE: {countdown}S LEFT
                </span>
              </div>

              <div className="w-full max-w-[85%] rounded-2xl bg-[#090b28] p-4 border border-[#1b1f54] rounded-tl-none space-y-3">
                {activePlan && (
                  <PlanProgressCard steps={activePlan} isGenerating={true} />
                )}

                {/* Instant Action Countdown Progress Bar */}
                <div className="space-y-1 bg-[#050514]/50 rounded-xl p-2.5 border border-white/5">
                  <div className="flex items-center justify-between text-[10px] font-mono text-purple-300">
                    <span className="font-sans">Fast Processing & Response Pipeline:</span>
                    <span className="font-bold">{((10 - countdown) * 10).toFixed(0)}% Completed</span>
                  </div>
                  <div className="w-full bg-[#080817] rounded-full h-1.5 overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-purple-500 via-pink-500 to-[#00D9A5] h-1.5 transition-all duration-300" 
                      style={{ width: `${Math.min(100, ((11 - countdown) * 10))}%` }} 
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3 text-xs text-slate-400 pt-1">
                  <div className="flex space-x-1">
                    <div className="h-2 w-2 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="h-2 w-2 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="h-2 w-2 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                  <span>{settings.language === 'Bangla' ? 'টাস্ক এক্সিকিউশন ও ফলাফল যাচাই চলছে...' : 'Executing tools and verifying results...'}</span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Bar & Controls */}
      <div className="shrink-0 border-t border-[#181a44] bg-[#07081e] p-3 sm:p-4">
        <div className="mx-auto max-w-3xl">
          {/* Selected attached files chips */}
          {selectedAttachedFiles.length > 0 && (
            <div className="mb-2 flex flex-wrap gap-2">
              {selectedAttachedFiles.map((file) => (
                <div
                  key={file.id}
                  className="flex items-center gap-1.5 rounded-lg bg-[#141842] px-2.5 py-1 text-xs text-purple-200 border border-purple-500/40"
                >
                  <FileText className="h-3.5 w-3.5 text-purple-400" />
                  <span className="font-medium">{file.name}</span>
                  <button
                    onClick={() =>
                      setSelectedAttachedFiles(selectedAttachedFiles.filter((f) => f.id !== file.id))
                    }
                    className="ml-1 text-slate-400 hover:text-rose-400"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Voice Input banner if recording */}
          {isRecording && (
            <div className="mb-2 flex items-center justify-between rounded-lg bg-purple-950/40 p-2 text-xs text-purple-300 border border-purple-500/40 animate-pulse">
              <div className="flex items-center gap-2">
                <Mic className="h-4 w-4 text-purple-400" />
                <span>
                  {settings.language === 'Bangla' ? 'ভয়েস শুনছি... নির্দেশ বলুন...' : 'Listening... Speak your task...'}
                </span>
              </div>
              <button
                onClick={() => setIsRecording(false)}
                className="text-[11px] font-semibold text-rose-400 hover:underline"
              >
                Stop
              </button>
            </div>
          )}

          {/* Text Input Row */}
          <div className="relative flex items-end gap-2 rounded-2xl bg-[#08081b] p-2 border border-purple-500/35 focus-within:border-purple-400 focus-within:ring-2 focus-within:ring-purple-500/20 shadow-[0_0_25px_rgba(139,92,246,0.18)] transition-all duration-300">
            {/* Attachment Dropdown Toggle */}
            <div className="relative">
              <button
                id="btn_attach_file"
                type="button"
                onClick={() => setShowAttachMenu(!showAttachMenu)}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-[#94A3B8] hover:bg-[#080817] hover:text-[#F8FAFC] transition-colors"
                title="Attach workspace file or upload"
              >
                <Paperclip className="h-4 w-4" />
              </button>

              {/* Attachment Picker Menu */}
              {showAttachMenu && (
                <div
                  id="attach_menu"
                  className="absolute bottom-12 left-0 z-50 w-64 rounded-2xl bg-[#0D0D20] p-2.5 border border-[rgba(139,92,246,0.3)] shadow-2xl space-y-1 text-xs"
                >
                  <p className="px-2 py-1 font-semibold text-[#94A3B8] uppercase text-[10px]">
                    Workspace Files
                  </p>
                  <div className="max-h-40 overflow-y-auto space-y-1">
                    {files.map((f) => (
                      <button
                        key={f.id}
                        type="button"
                        onClick={() => handleAttachWorkspaceFile(f)}
                        className="flex w-full items-center justify-between rounded-lg px-2 py-1.5 text-left text-[#F8FAFC] hover:bg-[#080817] hover:text-[#C084FC]"
                      >
                        <span className="truncate">{f.name}</span>
                        <span className="text-[10px] text-[#94A3B8]">{f.size}</span>
                      </button>
                    ))}
                  </div>
                  <div className="border-t border-[rgba(139,92,246,0.2)] pt-1">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-[#C084FC] hover:bg-[#080817]"
                    >
                      <Plus className="h-3.5 w-3.5" />
                      <span>Upload from Device</span>
                    </button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      multiple
                      className="hidden"
                      onChange={handleNativeFileUpload}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Voice Input Button */}
            <button
              id="btn_voice_input"
              type="button"
              onClick={toggleVoiceInput}
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors ${
                isRecording
                  ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                  : 'text-[#94A3B8] hover:bg-[#080817] hover:text-[#F8FAFC]'
              }`}
              title="Voice Input (Speech-to-Text)"
            >
              <Mic className="h-4 w-4" />
            </button>

            {/* Main Textarea */}
            <textarea
              id="chat_input_textarea"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={t.chatInputPlaceholder}
              rows={1}
              className="flex-1 max-h-32 resize-none bg-transparent py-2.5 px-2 text-sm text-[#F8FAFC] placeholder:text-[#94A3B8]/60 focus:outline-none caret-purple-400 transition-all duration-150"
            />

            {/* Stop or Send Button */}
            {isGenerating ? (
              <button
                id="btn_stop_generation"
                type="button"
                onClick={stopGeneration}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-rose-500/20 text-rose-400 hover:bg-rose-500/30 border border-rose-500/40 transition-colors"
                title="Stop generation"
              >
                <Square className="h-4 w-4 fill-current" />
              </button>
            ) : (
              <button
                id="btn_send_message"
                type="button"
                onClick={handleSend}
                disabled={!input.trim()}
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-all ${
                  input.trim()
                    ? 'btn-blue-purple text-[#F8FAFC]'
                    : 'bg-[#080817] text-[#94A3B8]/40 border border-[rgba(139,92,246,0.15)] cursor-not-allowed'
                }`}
                title="Send instruction"
              >
                <Send className="h-4 w-4" />
              </button>
            )}
          </div>

          <div className="mt-2 flex items-center justify-between px-2 text-[10px] text-slate-400">
            <span>
              {t.shiftEnterHint}
            </span>
            <span className="flex items-center gap-1 text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Autonomous Agent Mode
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
