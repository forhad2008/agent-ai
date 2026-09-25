import React, { useState, useRef } from 'react';
import {
  FolderOpen,
  UploadCloud,
  Plus,
  Search,
  FileText,
  FileCode,
  FileSpreadsheet,
  FileImage,
  Download,
  Eye,
  Sparkles,
  Trash2,
  X,
} from 'lucide-react';
import { useAgent } from '../../context/AgentContext';
import { FileItem } from '../../types';

export const FilesView: React.FC = () => {
  const {
    files,
    uploadFile,
    createNewFile,
    deleteFile,
    selectedFile,
    setSelectedFile,
    handleSendMessage,
    setActiveView,
    currentLanguage,
    t,
  } = useAgent();

  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [isDragOver, setIsDragOver] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newFileName, setNewFileName] = useState('');
  const [newFileContent, setNewFileContent] = useState('');
  const [newFileCategory, setNewFileCategory] = useState<FileItem['category']>('document');

  const fileInputRef = useRef<HTMLInputElement>(null);

  const filteredFiles = files.filter((f) => {
    const matchesSearch = f.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      categoryFilter === 'All' ||
      (categoryFilter === 'Generated' && f.isGenerated) ||
      f.category === categoryFilter.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles.length > 0) {
      processFiles(droppedFiles);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(e.target.files);
    }
  };

  const processFiles = (fileList: FileList) => {
    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      const reader = new FileReader();
      reader.onload = (event) => {
        uploadFile({
          name: file.name,
          size: `${(file.size / 1024).toFixed(1)} KB`,
          type: file.type || 'text/plain',
          content: (event.target?.result as string) || '',
        });
      };
      reader.readAsText(file);
    }
  };

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFileName.trim()) return;
    createNewFile(newFileName.trim(), newFileContent, newFileCategory);
    setIsCreateModalOpen(false);
    setNewFileName('');
    setNewFileContent('');
  };

  const handleAnalyzeWithAgent = (file: FileItem) => {
    setActiveView('chat');
    handleSendMessage(`Analyze workspace file "${file.name}" and provide key insights, anomalies, and structural takeaways.`);
  };

  const handleDownloadFile = (file: FileItem) => {
    const blob = new Blob([file.content || ''], { type: file.type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = file.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getFileIcon = (category: FileItem['category'], ext: string) => {
    if (category === 'code' || ['js', 'ts', 'jsx', 'tsx', 'py'].includes(ext)) {
      return <FileCode className="h-5 w-5 text-[#C084FC]" />;
    }
    if (category === 'data' || ['csv', 'json', 'xlsx'].includes(ext)) {
      return <FileSpreadsheet className="h-5 w-5 text-[#00D9A5]" />;
    }
    if (category === 'image') {
      return <FileImage className="h-5 w-5 text-[#D946EF]" />;
    }
    return <FileText className="h-5 w-5 text-[#A855F7]" />;
  };

  return (
    <div id="files_view" className="flex-1 overflow-y-auto p-3.5 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto w-full text-[#F8FAFC]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[rgba(139,92,246,0.2)] pb-4 sm:pb-5">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-[#F8FAFC] flex items-center gap-2.5">
            <FolderOpen className="h-6 w-6 text-[#C084FC]" />
            <span>{currentLanguage.labels.filesTitle}</span>
          </h1>
          <p className="mt-1 text-xs text-[#94A3B8]">
            {t.filesSubheader}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            id="btn_create_file_modal"
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center gap-1.5 rounded-2xl bg-[#0D0D20] px-3.5 py-2.5 text-xs font-semibold text-[#F8FAFC] border border-[rgba(139,92,246,0.25)] hover:bg-[#12122b] transition-colors"
          >
            <Plus className="h-4 w-4 text-[#C084FC]" />
            <span>{t.newFile}</span>
          </button>

          <button
            id="btn_upload_files"
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-1.5 rounded-2xl btn-blue-purple px-4 py-2.5 text-xs font-bold text-white transition-all"
          >
            <UploadCloud className="h-4 w-4" />
            <span>{t.uploadFiles}</span>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            className="hidden"
            onChange={handleFileInputChange}
          />
        </div>
      </div>

      {/* Drag & Drop Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`cursor-pointer rounded-2xl border-2 border-dashed p-6 text-center transition-all ${
          isDragOver
            ? 'border-[#00D9A5] bg-[#00D9A5]/10 shadow-[0_0_20px_rgba(0,217,165,0.2)]'
            : 'border-[rgba(139,92,246,0.25)] bg-[#0D0D20] hover:border-[#A855F7]/60 hover:bg-[#12122b]'
        }`}
      >
        <UploadCloud className="mx-auto h-8 w-8 text-[#C084FC] mb-2" />
        <p className="text-xs font-semibold text-[#F8FAFC]">
          {t.dragDropHint}
        </p>
        <p className="text-[11px] text-[#94A3B8] mt-1">
          Supported: PDF, DOCX, TXT, CSV, JSON, MD, Images, Code files (Max 20MB)
        </p>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#94A3B8]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.searchFilesPlaceholder}
            className="w-full rounded-2xl bg-[#0D0D20] pl-10 pr-4 py-2.5 text-xs text-[#F8FAFC] placeholder:text-[#94A3B8]/60 border border-[rgba(139,92,246,0.25)] focus:border-[#A855F7] focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto text-xs">
          {['All', 'Document', 'Data', 'Code', 'Generated'].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`rounded-xl px-3 py-1.5 font-medium transition-all shrink-0 ${
                categoryFilter === cat
                  ? 'bg-[#7C3AED]/25 text-[#C084FC] border border-[#7C3AED]/50 shadow-[0_0_10px_rgba(124,58,237,0.3)]'
                  : 'bg-[#0D0D20] text-[#94A3B8] border border-[rgba(139,92,246,0.2)] hover:bg-[#12122b] hover:text-[#F8FAFC]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Files Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredFiles.map((file) => (
          <div
            key={file.id}
            id={`file_card_${file.id}`}
            className="group flex flex-col justify-between rounded-2xl bg-[#0D0D20] p-4 sm:p-5 border border-[rgba(139,92,246,0.25)] hover:border-[#A855F7]/50 transition-all shadow-[0_0_20px_rgba(124,58,237,0.06)]"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#080817] border border-[rgba(139,92,246,0.2)]">
                    {getFileIcon(file.category, file.extension)}
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-[#F8FAFC] truncate max-w-[160px] group-hover:text-[#C084FC] transition-colors">
                      {file.name}
                    </h3>
                    <span className="text-[10px] text-[#94A3B8] font-mono">
                      {file.size} • {file.extension.toUpperCase()}
                    </span>
                  </div>
                </div>

                {file.isGenerated && (
                  <span className="rounded-lg bg-[#00D9A5]/15 px-2 py-0.5 text-[9px] font-mono font-medium text-[#00D9A5] border border-[#00D9A5]/30">
                    Agent Created
                  </span>
                )}
              </div>

              {/* Snippet Preview */}
              <div className="mt-2.5 rounded-xl bg-[#080817] p-2.5 font-mono text-[10px] text-[#94A3B8] border border-[rgba(139,92,246,0.15)] line-clamp-3 leading-relaxed">
                {file.content || '[File contents indexed for agent context]'}
              </div>
            </div>

            {/* Footer Action Buttons */}
            <div className="mt-4 pt-3 flex items-center justify-between border-t border-[rgba(139,92,246,0.18)]">
              <span className="text-[10px] text-[#94A3B8] font-mono">{file.updatedAt}</span>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setSelectedFile(file)}
                  className="rounded-lg p-1.5 text-[#94A3B8] hover:bg-[#080817] hover:text-[#F8FAFC]"
                  title="Preview File"
                >
                  <Eye className="h-3.5 w-3.5" />
                </button>

                <button
                  onClick={() => handleDownloadFile(file)}
                  className="rounded-lg p-1.5 text-[#94A3B8] hover:bg-[#080817] hover:text-[#F8FAFC]"
                  title="Download File"
                >
                  <Download className="h-3.5 w-3.5" />
                </button>

                <button
                  onClick={() => handleAnalyzeWithAgent(file)}
                  className="flex items-center gap-1 rounded-xl bg-[#00D9A5]/15 px-2.5 py-1 text-[11px] font-semibold text-[#00D9A5] hover:bg-[#00D9A5]/25 border border-[#00D9A5]/30 shadow-sm"
                  title="Analyze with AI Agent"
                >
                  <Sparkles className="h-3 w-3" />
                  <span>Analyze</span>
                </button>

                <button
                  onClick={() => deleteFile(file.id)}
                  className="rounded-lg p-1.5 text-[#94A3B8] hover:bg-rose-500/20 hover:text-rose-400 transition-colors"
                  title="Remove from Workspace"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Preview Modal */}
      {selectedFile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
          <div className="w-full max-w-2xl rounded-2xl bg-[#0D0D20] p-6 border border-[rgba(139,92,246,0.3)] shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-[rgba(139,92,246,0.2)] pb-3">
              <div className="flex items-center gap-2">
                {getFileIcon(selectedFile.category, selectedFile.extension)}
                <div>
                  <h2 className="text-sm font-bold text-[#F8FAFC]">{selectedFile.name}</h2>
                  <span className="text-[10px] text-[#94A3B8] font-mono">
                    {selectedFile.size} • {selectedFile.type}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setSelectedFile(null)}
                className="rounded-lg p-1.5 text-[#94A3B8] hover:bg-[#080817] hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="max-h-96 overflow-y-auto rounded-xl bg-[#080817] p-4 border border-[rgba(139,92,246,0.2)] font-mono text-xs text-[#F8FAFC] whitespace-pre-wrap leading-relaxed">
              {selectedFile.content || 'Empty or binary content'}
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-[rgba(139,92,246,0.2)]">
              <button
                onClick={() => handleDownloadFile(selectedFile)}
                className="flex items-center gap-1.5 rounded-xl bg-[#080817] px-3.5 py-2 text-xs font-semibold text-[#F8FAFC] border border-[rgba(139,92,246,0.25)] hover:bg-[#12122b]"
              >
                <Download className="h-3.5 w-3.5" />
                <span>{t.downloadFile}</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedFile(null)}
                  className="rounded-xl px-4 py-2 text-xs text-[#94A3B8] hover:bg-[#080817]"
                >
                  {t.closeModal}
                </button>
                <button
                  onClick={() => {
                    handleAnalyzeWithAgent(selectedFile);
                    setSelectedFile(null);
                  }}
                  className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#4F46E5] px-4 py-2 text-xs font-bold text-white shadow-[0_0_15px_rgba(124,58,237,0.4)]"
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>{t.analyzeWithAgent}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create File Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl bg-[#0D0D20] p-6 border border-[rgba(139,92,246,0.3)] shadow-2xl">
            <div className="flex items-center justify-between border-b border-[rgba(139,92,246,0.2)] pb-3 mb-4">
              <h2 className="text-base font-bold text-[#F8FAFC]">Create Workspace File</h2>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="rounded-lg p-1.5 text-[#94A3B8] hover:bg-[#080817] hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-[#94A3B8] font-medium mb-1">
                  File Name (with extension, e.g. notes.md, data.csv)
                </label>
                <input
                  type="text"
                  required
                  value={newFileName}
                  onChange={(e) => setNewFileName(e.target.value)}
                  placeholder="e.g. project-roadmap.md"
                  className="w-full rounded-xl bg-[#080817] px-3.5 py-2.5 text-[#F8FAFC] border border-[rgba(139,92,246,0.25)] focus:outline-none focus:border-[#A855F7]"
                />
              </div>

              <div>
                <label className="block text-[#94A3B8] font-medium mb-1">Category</label>
                <select
                  value={newFileCategory}
                  onChange={(e) => setNewFileCategory(e.target.value as FileItem['category'])}
                  className="w-full rounded-xl bg-[#080817] px-3 py-2 text-[#F8FAFC] border border-[rgba(139,92,246,0.25)] focus:outline-none"
                >
                  <option value="document">Document (TXT, MD)</option>
                  <option value="code">Code (JS, TS, PY)</option>
                  <option value="data">Data (CSV, JSON)</option>
                </select>
              </div>

              <div>
                <label className="block text-[#94A3B8] font-medium mb-1">Initial Content</label>
                <textarea
                  rows={6}
                  value={newFileContent}
                  onChange={(e) => setNewFileContent(e.target.value)}
                  placeholder="Enter initial markdown, code or data content..."
                  className="w-full rounded-xl bg-[#080817] p-3 text-[#F8FAFC] border border-[rgba(139,92,246,0.25)] focus:outline-none font-mono text-xs"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-[rgba(139,92,246,0.2)]">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="rounded-xl px-4 py-2 text-[#94A3B8] hover:bg-[#080817]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#4F46E5] px-4 py-2 font-bold text-white shadow-[0_0_15px_rgba(124,58,237,0.4)]"
                >
                  Save File
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
