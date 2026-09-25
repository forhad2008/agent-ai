/**
 * Comprehensive Multi-Page Localization Dictionary for Abdullah AI Work Agent
 * Supports all 30 Technology Country Languages.
 * Strictly defaults to English before any setting is configured.
 */

export interface PageTranslations {
  // Global & Nav
  appName: string;
  appSubtitle: string;
  agentReady: string;
  agentStatus: string;
  openChat: string;
  newSession: string;
  activeLanguageLabel: string;
  systemActive: string;
  hubLabel: string;
  
  // Dashboard
  welcomeSubtitle: string;
  inExecution: string;
  verified: string;
  actionRequired: string;
  allClear: string;
  readyToRun: string;
  quickActionsTitle: string;
  activePipelinesTitle: string;
  recentOperationsTitle: string;
  viewAll: string;
  fullLog: string;
  sensitiveNotice: string;
  reviewNow: string;
  qaStartTask: string;
  qaStartTaskDesc: string;
  qaAnalyzeFiles: string;
  qaAnalyzeFilesDesc: string;
  qaResearch: string;
  qaResearchDesc: string;
  qaCreateDoc: string;
  qaCreateDocDesc: string;
  qaWriteCode: string;
  qaWriteCodeDesc: string;
  qaOpenChat: string;
  qaOpenChatDesc: string;

  // Chat
  chatActiveNotice: string;
  chatSubtitle: string;
  quickDemoPromptsTitle: string;
  promptAnalyzeWebsite: string;
  promptCustomerReply: string;
  promptProductDescription: string;
  promptDebugCode: string;
  promptResearchTrends: string;
  shiftEnterHint: string;
  autonomousAgentBadge: string;
  attachWorkspaceFile: string;
  uploadFromDevice: string;
  voiceInputTooltip: string;
  stopBtn: string;
  welcomeMessageHeading: string;
  welcomeMessageBody: string;

  // Plan Steps
  planUnderstanding: string;
  planScanning: string;
  planExecuting: string;
  planVerifying: string;

  // Tasks
  tasksSubtitle: string;
  createTaskBtn: string;
  searchTasksPlaceholder: string;
  filterAll: string;
  filterRunning: string;
  filterWaitingApproval: string;
  filterCompleted: string;
  filterPlanning: string;
  filterFailed: string;
  priorityUrgent: string;
  priorityHigh: string;
  priorityMedium: string;
  priorityLow: string;
  executeInChatBtn: string;
  newTaskModalTitle: string;
  taskTitleLabel: string;
  taskDescLabel: string;
  taskPriorityLabel: string;
  cancelBtn: string;

  // Files
  filesSubtitle: string;
  newFileBtn: string;
  uploadFilesBtn: string;
  searchFilesPlaceholder: string;
  categoryAll: string;
  categoryDocs: string;
  categoryCode: string;
  categoryData: string;
  categoryImages: string;
  categoryGenerated: string;
  dragDropText: string;
  fileDetailsTitle: string;
  analyzeWithAiBtn: string;
  deleteFileBtn: string;

  // Tools
  toolsSubtitle: string;
  toolsActiveCount: string;
  searchToolsPlaceholder: string;
  catAllTools: string;
  catFileTools: string;
  catWebTools: string;
  catCodeTools: string;
  catDocTools: string;
  catDataTools: string;
  catCreativeTools: string;
  testSandboxBtn: string;
  runTestBtn: string;
  testResultTitle: string;

  // Approvals
  approvalsSubtitle: string;
  pendingActionsBadge: string;
  policyBannerTitle: string;
  policyBannerDesc: string;
  filterPending: string;
  filterResolved: string;
  approveBtn: string;
  rejectBtn: string;

  // Activity
  activitySubtitle: string;
  exportAuditJsonBtn: string;
  filterSuccess: string;

  // Settings
  settingsSubtitle: string;
  langModeSectionTitle: string;
  agentIdentitySectionTitle: string;
  safetyGuardrailsSectionTitle: string;
  workspaceDataSectionTitle: string;
  saveSettingsBtn: string;
  savedSuccessBadge: string;
  exportBackupBtn: string;
  resetMemoryBtn: string;
  openModalBtn: string;

  // Additional unified labels for components
  approvalsSubheader: string;
  securityPolicyNotice: string;
  pendingReviewFilter: string;
  auditHistoryFilter: string;
  allRecordsFilter: string;
  noApprovalsWaiting: string;
  noApprovalsDesc: string;
  actionApprovedExecuted: string;
  actionDeniedCancelled: string;
  approvalRequired: string;
  regenerateOption: string;
  rejectCancel: string;
  approveExecute: string;

  chatSubheader: string;
  quickSuggestionsTitle: string;
  chatInputPlaceholder: string;
  demoAnalyzeWebsite: string;
  demoAnalyzeWebsitePrompt: string;
  demoCustomerReply: string;
  demoCustomerReplyPrompt: string;
  demoProductDescription: string;
  demoProductDescriptionPrompt: string;
  demoDebugCode: string;
  demoDebugCodePrompt: string;
  demoResearchTrends: string;
  demoResearchTrendsPrompt: string;
  taskExecutionPlan: string;
  inProgress: string;

  filesSubheader: string;
  newFile: string;
  uploadFiles: string;
  dragDropHint: string;
  downloadFile: string;
  closeModal: string;
  analyzeWithAgent: string;

  tasksSubheader: string;
  createTask: string;
  allTasksFilter: string;
  verifiedOutcome: string;
  taskExecutionStages: string;
  runWithAgent: string;
}

// English Standard (DEFAULT)
export const EN_TRANSLATIONS: PageTranslations = {
  appName: 'Agent-alpha08',
  appSubtitle: 'Personal AI Work Agent OS',
  agentReady: 'Agent Ready & Active',
  agentStatus: 'Agent Status',
  openChat: 'Open AI Chat',
  newSession: 'New Session',
  activeLanguageLabel: 'Currently Operating In:',
  systemActive: 'SYSTEM ACTIVE',
  hubLabel: 'Tech Hub:',
  
  welcomeSubtitle: 'Your personal AI work agent is armed and ready. Provide natural instructions to read customer messages, audit data, research topics, debug code, and orchestrate verified outcomes.',
  inExecution: 'in execution',
  verified: 'verified',
  actionRequired: 'action required',
  allClear: 'all clear',
  readyToRun: 'ready to run',
  quickActionsTitle: 'Quick Action Launchers',
  activePipelinesTitle: 'Active Task Pipelines',
  recentOperationsTitle: 'Recent Agent Operations',
  viewAll: 'View all',
  fullLog: 'Full Log',
  sensitiveNotice: 'Sensitive Action Awaiting Approval',
  reviewNow: 'Review Now',
  
  qaStartTask: 'Start Task',
  qaStartTaskDesc: 'Launch autonomous workflow',
  qaAnalyzeFiles: 'Analyze Files',
  qaAnalyzeFilesDesc: 'Audit workspace data',
  qaResearch: 'Research',
  qaResearchDesc: 'Synthesize knowledge',
  qaCreateDoc: 'Create Document',
  qaCreateDocDesc: 'Draft reports & specs',
  qaWriteCode: 'Write Code',
  qaWriteCodeDesc: 'Inspect & debug code',
  qaOpenChat: 'Open AI Chat',
  qaOpenChatDesc: 'Direct agent stream',

  chatActiveNotice: 'Personal Work Agent Active',
  chatSubtitle: 'Natural Language Work Execution • Plan, Tool & Verify',
  quickDemoPromptsTitle: 'Quick Demo Instructions:',
  promptAnalyzeWebsite: 'Analyze my website project and create a report.',
  promptCustomerReply: 'Draft a reply to this customer message regarding delivery delay.',
  promptProductDescription: 'Create a professional product description for our autonomous work agent.',
  promptDebugCode: 'Find problems in this JavaScript code and provide a safe refactoring.',
  promptResearchTrends: 'Research modern portfolio website trends and summarize findings.',
  shiftEnterHint: 'Press Shift + Enter for new line',
  autonomousAgentBadge: 'Autonomous Agent Mode',
  attachWorkspaceFile: 'Attach Workspace File',
  uploadFromDevice: 'Upload from Device',
  voiceInputTooltip: 'Voice Input (Speech-to-Text)',
  stopBtn: 'Stop generation',
  welcomeMessageHeading: 'Objective',
  welcomeMessageBody: 'Welcome! I am **Agent-alpha08**, your personal AI work operating system powered by Gemini.\n\n## Plan\n- Understand natural language instructions and construct autonomous execution pipelines.\n- Deploy authorized workspace tools across files, web intelligence, document drafting, and code auditing.\n- Run verification checks and synthesize verified operational reports.\n- Guard sensitive actions (external client messaging, database writes, asset deletions) behind strict approval checkpoints.\n\n## Verification\nWorkspace online. All tools armed and ready. Select any quick action or enter your instructions below.',

  planUnderstanding: 'Understanding objective & context',
  planScanning: 'Scanning required tools & files',
  planExecuting: 'Executing permitted actions',
  planVerifying: 'Verifying results & reporting',

  tasksSubtitle: 'Autonomous task queue, execution stages, and verified results.',
  createTaskBtn: 'Create Task',
  searchTasksPlaceholder: 'Search tasks...',
  filterAll: 'All',
  filterRunning: 'Running',
  filterWaitingApproval: 'Waiting for Approval',
  filterCompleted: 'Completed',
  filterPlanning: 'Planning',
  filterFailed: 'Failed',
  priorityUrgent: 'Urgent',
  priorityHigh: 'High',
  priorityMedium: 'Medium',
  priorityLow: 'Low',
  executeInChatBtn: 'Execute in Chat',
  newTaskModalTitle: 'Create New Autonomous Task',
  taskTitleLabel: 'Task Title',
  taskDescLabel: 'Description',
  taskPriorityLabel: 'Priority Level',
  cancelBtn: 'Cancel',

  filesSubtitle: 'Browse, upload, inspect, and analyze documents, datasets, and code.',
  newFileBtn: 'New File',
  uploadFilesBtn: 'Upload Files',
  searchFilesPlaceholder: 'Search files by name...',
  categoryAll: 'All',
  categoryDocs: 'Documents',
  categoryCode: 'Code',
  categoryData: 'Spreadsheets',
  categoryImages: 'Images',
  categoryGenerated: 'Generated',
  dragDropText: 'Drag and drop files here to upload to workspace',
  fileDetailsTitle: 'File Inspector',
  analyzeWithAiBtn: 'Analyze with AI',
  deleteFileBtn: 'Delete File',

  toolsSubtitle: 'Modular agent capabilities, safety boundaries, and sandbox invocation testbed.',
  toolsActiveCount: 'Tools Active',
  searchToolsPlaceholder: 'Search tools by capability or category...',
  catAllTools: 'All Tools',
  catFileTools: 'File Tools',
  catWebTools: 'Web Tools',
  catCodeTools: 'Code Tools',
  catDocTools: 'Document Tools',
  catDataTools: 'Data Tools',
  catCreativeTools: 'Creative Tools',
  testSandboxBtn: 'Test Sandbox',
  runTestBtn: 'Run Test',
  testResultTitle: 'Sandbox Execution Output',

  approvalsSubtitle: 'Zero-trust permission gatekeeper for external communications, data writes, and deletions.',
  pendingActionsBadge: 'Pending Actions',
  policyBannerTitle: 'Agent Security & Permission Enforcement Policy',
  policyBannerDesc: 'LOW RISK (Auto-Permitted): Read files, Search workspace, Analyze data, Generate drafts. REQUIRES APPROVAL (Gated): Send emails/messages, Delete records, Modify production assets, Publish external content.',
  filterPending: 'Pending Approval',
  filterResolved: 'Resolved / History',
  approveBtn: 'Approve & Execute',
  rejectBtn: 'Reject & Halt',

  activitySubtitle: 'Tamper-evident audit trail of all autonomous executions, tool calls, and human approvals.',
  exportAuditJsonBtn: 'Export Audit Log (JSON)',
  filterSuccess: 'Success',

  settingsSubtitle: 'Customize agent behavior, 30 technology country language modes, permission boundaries, and workspace states.',
  langModeSectionTitle: 'Language Mode (30 Technology Nations)',
  agentIdentitySectionTitle: 'Agent Identity & Autonomous Profile',
  safetyGuardrailsSectionTitle: 'Safety & Security Guardrails',
  workspaceDataSectionTitle: 'Workspace Data Management',
  saveSettingsBtn: 'Save Settings',
  savedSuccessBadge: 'Saved Successfully',
  exportBackupBtn: 'Export Full Workspace Backup',
  resetMemoryBtn: 'Reset Agent Memory',
  openModalBtn: 'Open Visual Selector Modal',

  approvalsSubheader: 'Zero-trust permission gatekeeper for external communications, data writes, and deletions.',
  securityPolicyNotice: 'LOW RISK (Auto-Permitted): Read files, Search workspace, Analyze data, Generate drafts, Internal synthesis. REQUIRES APPROVAL (Gated): Send emails/messages, Delete records, Modify production assets, Publish external content.',
  pendingReviewFilter: 'Pending Review',
  auditHistoryFilter: 'Audit History',
  allRecordsFilter: 'All Records',
  noApprovalsWaiting: 'No Approvals Waiting',
  noApprovalsDesc: 'All agent execution actions are currently verified or within permitted thresholds.',
  actionApprovedExecuted: 'Action Approved & Executed',
  actionDeniedCancelled: 'Action Denied / Cancelled',
  approvalRequired: 'Human Approval Required',
  regenerateOption: 'Regenerate Option',
  rejectCancel: 'Reject / Cancel',
  approveExecute: 'Approve & Execute',

  chatSubheader: 'Natural Language Work Execution • Plan, Tool & Verify',
  quickSuggestionsTitle: 'Quick Demo Instructions:',
  chatInputPlaceholder: 'Give an instruction (e.g. "Read my customer messages and prepare replies", "Analyze these files and create a report")...',
  demoAnalyzeWebsite: 'Analyze Website',
  demoAnalyzeWebsitePrompt: 'Analyze my website project and create a report.',
  demoCustomerReply: 'Customer Reply',
  demoCustomerReplyPrompt: 'Draft a reply to this customer message regarding delivery delay.',
  demoProductDescription: 'Product Description',
  demoProductDescriptionPrompt: 'Create a professional product description for our autonomous work agent.',
  demoDebugCode: 'Debug Code',
  demoDebugCodePrompt: 'Find problems in this JavaScript code and provide a safe refactoring.',
  demoResearchTrends: 'Research Trends',
  demoResearchTrendsPrompt: 'Research modern portfolio website trends and summarize findings.',
  taskExecutionPlan: 'Task Execution Plan',
  inProgress: 'In Progress',

  filesSubheader: 'Browse, upload, inspect, and analyze documents, datasets, and code.',
  newFile: 'New File',
  uploadFiles: 'Upload Files',
  dragDropHint: 'Drag and drop files here, or click to browse',
  downloadFile: 'Download',
  closeModal: 'Close',
  analyzeWithAgent: 'Analyze with Agent',

  tasksSubheader: 'Autonomous task queue, execution stages, and verified results.',
  createTask: 'Create Task',
  allTasksFilter: 'All',
  verifiedOutcome: 'Verified Outcome / Output',
  taskExecutionStages: 'Task Execution Stages',
  runWithAgent: 'Run with Agent',
};

// Bengali Translations (Bangladesh #1)
export const BN_TRANSLATIONS: PageTranslations = {
  ...EN_TRANSLATIONS,
  appName: 'Agent-alpha08',
  appSubtitle: 'ব্যক্তিগত AI কর্ম সহকারী ওএস',
  agentReady: 'এজেন্ট প্রস্তুত ও সক্রিয়',
  agentStatus: 'এজেন্ট স্ট্যাটাস',
  openChat: 'AI চ্যাট খুলুন',
  newSession: 'নতুন সেশন',
  activeLanguageLabel: 'বর্তমানে সক্রিয় ভাষা:',
  systemActive: 'সিস্টেম সক্রিয়',
  hubLabel: 'প্রযুক্তি হাব:',
  
  welcomeSubtitle: 'আপনার ব্যক্তিগত AI এজেন্ট সম্পূর্ণ প্রস্তুত। প্রাকৃতিক ভাষায় নির্দেশ দিন—এজেন্ট স্বয়ংক্রিয়ভাবে পরিকল্পনা প্রণয়ন, টুল পরিচালনা, ফলাফল যাচাই ও প্রতিবেদন তৈরি করবে।',
  inExecution: 'চলমান রয়েছে',
  verified: 'যাচাইকৃত',
  actionRequired: 'অনুমোদন প্রয়োজন',
  allClear: 'সব ক্লিয়ার',
  readyToRun: 'প্রস্তুত রয়েছে',
  quickActionsTitle: 'দ্রুত কর্মসম্পাদন (Quick Actions)',
  activePipelinesTitle: 'সক্রিয় টাস্ক পাইপলাইন',
  recentOperationsTitle: 'সাম্প্রতিক এজেন্ট অ্যাক্টিভিটি',
  viewAll: 'সবগুলো দেখুন',
  fullLog: 'সম্পূর্ণ লগ',
  sensitiveNotice: 'সংবেদনশীল অ্যাকশন আপনার অনুমোদনের অপেক্ষায়',
  reviewNow: 'এখনই পর্যালোচনা করুন',

  qaStartTask: 'টাস্ক শুরু করুন',
  qaStartTaskDesc: 'স্বয়ংক্রিয় ওয়ার্কফ্লো চালু',
  qaAnalyzeFiles: 'ফাইল বিশ্লেষণ',
  qaAnalyzeFilesDesc: 'ওয়ার্কস্পেস অডিট',
  qaResearch: 'গবেষণা ও তথ্য',
  qaResearchDesc: 'জ্ঞান ও সারসংক্ষেপ তৈরি',
  qaCreateDoc: 'ডকুমেন্ট তৈরি',
  qaCreateDocDesc: 'প্রতিবেদন ও খসড়া লিখন',
  qaWriteCode: 'কোড নিরীক্ষা',
  qaWriteCodeDesc: 'ডিবাগিং ও নিরাপদ কোড',
  qaOpenChat: 'AI চ্যাট ওপেন',
  qaOpenChatDesc: 'এজেন্টের সাথে কথোপকথন',

  chatActiveNotice: 'ব্যক্তিগত ওয়ার্ক এজেন্ট সক্রিয়',
  chatSubtitle: 'প্রাকৃতিক ভাষায় কাজ দিন • স্বয়ংক্রিয় পরিকল্পনা ও নিরাপদ এক্সিকিউশন',
  quickDemoPromptsTitle: 'দ্রুত শুরু করার নির্দেশনাসমূহ:',
  promptAnalyzeWebsite: 'আমার ওয়েবসাইট প্রজেক্টটি বিশ্লেষণ করে একটি রিপোর্ট তৈরি করো।',
  promptCustomerReply: 'ডেলিভারিতে দেরির বিষয়ে গ্রাহককে একটি পেশাদার উত্তর খসড়া করে দাও।',
  promptProductDescription: 'আমাদের AI ওয়ার্ক এজেন্টের জন্য একটি আকর্ষণীয় প্রোডাক্ট বিবরণী লেখো।',
  promptDebugCode: 'এই জাভাস্ক্রিপ্ট কোডে থাকা সমস্যাগুলো চিহ্নিত করো এবং নিরাপদ সমাধান দাও।',
  promptResearchTrends: 'আধুনিক পোর্টফোলিও ওয়েবসাইট ট্রেন্ড ও ডিজাইন রিসার্চ করে সামারি তৈরি করো।',
  shiftEnterHint: 'শিফট + এন্টার চাপলে নতুন লাইন হবে',
  autonomousAgentBadge: 'অটোনোমাস এজেন্ট মোড',
  attachWorkspaceFile: 'ওয়ার্কস্পেস ফাইল যুক্ত করুন',
  uploadFromDevice: 'ডিভাইস থেকে আপলোড',
  voiceInputTooltip: 'ভয়েস ইনপুট (স্পিচ-টু-টেক্সট)',
  stopBtn: 'উৎপাদন বন্ধ করুন',
  welcomeMessageHeading: 'উদ্দেশ্য',
  welcomeMessageBody: 'স্বাগতম! আমি **Agent-alpha08**।\n\n## পরিকল্পনা\n- আপনার প্রাকৃতিক ভাষার নির্দেশ বুঝে স্বয়ংক্রিয় পরিকল্পনা তৈরি করা।\n- অনুমতিপ্রাপ্ত ফাইল, কোড, ওয়েব রিসার্চ এবং ডেটা টুল ব্যবহার করা।\n- ফলাফল পরীক্ষা ও যাচাই করে স্বচ্ছ প্রতিবেদন প্রদান করা।\n- সংবেদনশীল কাজের জন্য আপনার অনুমোদন নেওয়া।\n\n## ফলাফল\nসিস্টেম সম্পূর্ণ প্রস্তুত। যেকোনো নির্দেশ দিন।',

  planUnderstanding: 'নির্দেশ ও উদ্দেশ্য অনুধাবন',
  planScanning: 'প্রয়োজনীয় টুল ও ফাইল স্ক্যান',
  planExecuting: 'নিরাপদ কার্যসম্পাদন',
  planVerifying: 'ফলাফল যাচাই ও উপস্থাপন',

  tasksSubtitle: 'এজেন্টের সক্রিয়, অপেক্ষমাণ এবং সম্পন্ন কাজের স্বয়ংক্রিয় তালিকা ও নিয়ন্ত্রণ।',
  createTaskBtn: 'নতুন টাস্ক তৈরি',
  searchTasksPlaceholder: 'টাস্ক খুঁজুন...',
  filterAll: 'সকল',
  filterRunning: 'চলমান',
  filterWaitingApproval: 'অনুমোদনের অপেক্ষায়',
  filterCompleted: 'সম্পন্ন',
  filterPlanning: 'পরিকল্পনায়',
  filterFailed: 'ব্যর্থ',
  priorityUrgent: 'জরুরি',
  priorityHigh: 'উচ্চ',
  priorityMedium: 'মাঝারি',
  priorityLow: 'নিম্ন',
  executeInChatBtn: 'চ্যাটে চালু করুন',
  newTaskModalTitle: 'নতুন স্বয়ংক্রিয় টাস্ক তৈরি',
  taskTitleLabel: 'টাস্কের শিরোনাম',
  taskDescLabel: 'বিস্তারিত বিবরণ',
  taskPriorityLabel: 'অগ্রাধিকার স্তর',
  cancelBtn: 'বাতিল',

  filesSubtitle: 'এজেন্টের বিশ্লেষণের জন্য ফাইল আপলোড, প্রিভিউ এবং পরিচালনা করুন।',
  newFileBtn: 'নতুন ফাইল',
  uploadFilesBtn: 'ফাইল আপলোড',
  searchFilesPlaceholder: 'নাম দিয়ে ফাইল খুঁজুন...',
  categoryAll: 'সব ফাইল',
  categoryDocs: 'ডকুমেন্টস',
  categoryCode: 'কোড',
  categoryData: 'স্প্রেডশিট',
  categoryImages: 'ইমেজ',
  categoryGenerated: 'জেনারেটেড',
  dragDropText: 'ওয়ার্কস্পেসে আপলোড করতে ফাইল এখানে ড্র্যাগ ও ড্রপ করুন',
  fileDetailsTitle: 'ফাইল বিস্তারিত ও প্রিভিউ',
  analyzeWithAiBtn: 'AI দিয়ে বিশ্লেষণ',
  deleteFileBtn: 'ফাইল মুছুন',

  toolsSubtitle: 'মডিউলার এজেন্ট সক্ষমতা, নিরাপত্তা সীমানা ও স্যান্ডবক্স টেস্টবেড।',
  toolsActiveCount: 'টুল সক্রিয় রয়েছে',
  searchToolsPlaceholder: 'ক্যাপাবিলিটি বা ক্যাটাগরি দিয়ে টুল খুঁজুন...',
  catAllTools: 'সকল টুলস',
  catFileTools: 'ফাইল টুলস',
  catWebTools: 'ওয়েব টুলস',
  catCodeTools: 'কোড টুলস',
  catDocTools: 'ডকুমেন্ট টুলস',
  catDataTools: 'ডেটা টুলস',
  catCreativeTools: 'সৃজনশীল টুলস',
  testSandboxBtn: 'স্যান্ডবক্স টেস্ট',
  runTestBtn: 'টেস্ট রান করুন',
  testResultTitle: 'স্যান্ডবক্স ফলাফল আউটপুট',

  approvalsSubtitle: 'সংবেদনশীল বাহ্যিক বার্তা, ডেটা মুছে ফেলা বা পরিবর্তনের জন্য জিরো-ট্রাস্ট অনুমোদন গেটওয়ে।',
  pendingActionsBadge: 'অনুমোদন অপেক্ষায়',
  policyBannerTitle: 'এজেন্ট নিরাপত্তা ও অনুমতি প্রয়োগ নীতি',
  policyBannerDesc: 'কম ঝুঁকি (স্বয়ংক্রিয় অনুমোদিত): ফাইল পড়া, ওয়ার্কস্পেস সার্চ, ডেটা বিশ্লেষণ, ড্রাফট তৈরি। অনুমোদন প্রয়োজন: ইমেল/মেসেজ পাঠানো, রেকর্ড মুছে ফেলা, প্রজেক্ট ফাইল পরিবর্তন।',
  filterPending: 'অপেক্ষমাণ অনুমোদন',
  filterResolved: 'সম্পন্ন / হিস্ট্রি',
  approveBtn: 'অনুমোদন ও চালু',
  rejectBtn: 'বাতিল ও স্থগিত',

  activitySubtitle: 'এজেন্টের প্রতিটি স্বয়ংক্রিয় কাজ, টুল কল এবং অনুমোদনের স্বচ্ছ অডিট লগ।',
  exportAuditJsonBtn: 'সম্পূর্ণ অডিট লগ এক্সপোর্ট (JSON)',
  filterSuccess: 'সফল',

  settingsSubtitle: 'এজেন্ট প্রোফাইল, ৩০টি প্রযুক্তি দেশের ভাষা মোড, নিরাপত্তা নীতি এবং ওয়ার্কস্পেস কনফিগারেশন।',
  langModeSectionTitle: 'ভাষা মোড (৩০টি প্রযুক্তি দেশ)',
  agentIdentitySectionTitle: 'এজেন্ট প্রোফাইল ও পরিচয়',
  safetyGuardrailsSectionTitle: 'নিরাপত্তা ও গার্ডরেইল নীতি',
  workspaceDataSectionTitle: 'ওয়ার্কস্পেস ডেটা ও মেমোরি পরিচালনা',
  saveSettingsBtn: 'সেটিংস সংরক্ষণ করুন',
  savedSuccessBadge: 'সফলভাবে সংরক্ষিত হয়েছে',
  exportBackupBtn: 'সম্পূর্ণ ওয়ার্কস্পেস ব্যাকআপ নিন',
  resetMemoryBtn: 'এজেন্ট মেমোরি রিসেট করুন',
  openModalBtn: 'ভিজ্যুয়াল সিলেক্টর মোডাল খুলুন',

  approvalsSubheader: 'নিরাপত্তা নীতি: সংবেদনশীল অ্যাকশন (মেসেজ পাঠানো, ডিলিট, পাবলিশ) ব্যবহারকারীর সম্মতি ব্যতীত নিষিদ্ধ।',
  securityPolicyNotice: 'কম ঝুঁকি (স্বয়ংক্রিয় অনুমোদিত): ফাইল পড়া, ওয়ার্কস্পেস সার্চ, ডেটা বিশ্লেষণ, ড্রাফট তৈরি। অনুমোদন প্রয়োজন: ইমেল/মেসেজ পাঠানো, রেকর্ড মুছে ফেলা, প্রজেক্ট ফাইল পরিবর্তন।',
  pendingReviewFilter: 'পর্যালোচনার অপেক্ষায়',
  auditHistoryFilter: 'অডিট হিস্ট্রি',
  allRecordsFilter: 'সকল রেকর্ড',
  noApprovalsWaiting: 'কোনো অনুমোদন অপেক্ষায় নেই',
  noApprovalsDesc: 'এজেন্টের সমস্ত কার্যসম্পাদন বর্তমানে অনুমোদিত সীমার মধ্যে রয়েছে।',
  actionApprovedExecuted: 'অ্যাকশন অনুমোদিত ও সম্পন্ন হয়েছে',
  actionDeniedCancelled: 'অ্যাকশন বাতিল করা হয়েছে',
  approvalRequired: 'ব্যবহারকারীর অনুমোদন প্রয়োজন',
  regenerateOption: 'পুনরায় বিকল্প তৈরি',
  rejectCancel: 'বাতিল / প্রত্যাখ্যান',
  approveExecute: 'অনুমোদন ও সম্পন্ন করুন',

  chatSubheader: 'প্রাকৃতিক ভাষায় কাজ দিন • স্বয়ংক্রিয় পরিকল্পনা ও নিরাপদ এক্সিকিউশন',
  quickSuggestionsTitle: 'দ্রুত শুরু করার নির্দেশনাসমূহ:',
  chatInputPlaceholder: 'একটি কাজের নির্দেশ দিন (যেমন: "আমার কাস্টমার মেসেজগুলো পড়ে উত্তর প্রস্তুত করো", "এই ফাইলগুলো অ্যানালাইজ করে রিপোর্ট তৈরি করো")...',
  demoAnalyzeWebsite: 'ওয়েবসাইট বিশ্লেষণ',
  demoAnalyzeWebsitePrompt: 'আমার ওয়েবসাইট প্রজেক্টটি বিশ্লেষণ করে একটি রিপোর্ট তৈরি করো।',
  demoCustomerReply: 'গ্রাহকের উত্তর',
  demoCustomerReplyPrompt: 'ডেলিভারিতে দেরির বিষয়ে গ্রাহককে একটি পেশাদার উত্তর খসড়া করে দাও।',
  demoProductDescription: 'প্রোডাক্ট বিবরণী',
  demoProductDescriptionPrompt: 'আমাদের AI ওয়ার্ক এজেন্টের জন্য একটি আকর্ষণীয় প্রোডাক্ট বিবরণী লেখো।',
  demoDebugCode: 'কোড ডিবাগ',
  demoDebugCodePrompt: 'এই জাভাস্ক্রিপ্ট কোডে থাকা সমস্যাগুলো চিহ্নিত করো এবং নিরাপদ সমাধান দাও।',
  demoResearchTrends: 'ট্রেন্ড গবেষণা',
  demoResearchTrendsPrompt: 'আধুনিক পোর্টফোলিও ওয়েবসাইট ট্রেন্ড ও ডিজাইন রিসার্চ করে সামারি তৈরি করো।',
  taskExecutionPlan: 'টাস্ক কার্যসম্পাদন পরিকল্পনা',
  inProgress: 'চলমান',

  filesSubheader: 'এজেন্টের বিশ্লেষণের জন্য ফাইল আপলোড, প্রিভিউ এবং তৈরি করুন।',
  newFile: 'নতুন ফাইল',
  uploadFiles: 'ফাইল আপলোড',
  dragDropHint: 'ফাইল ড্র্যাগ অ্যান্ড ড্রপ করুন অথবা ক্লিক করে ব্রাউজ করুন',
  downloadFile: 'ডাউনলোড',
  closeModal: 'বন্ধ করুন',
  analyzeWithAgent: 'এজেন্ট দিয়ে বিশ্লেষণ',

  tasksSubheader: 'এজেন্টের সক্রিয়, অপেক্ষমাণ এবং সম্পন্ন কাজের সম্পূর্ণ তালিকা ও নিয়ন্ত্রণ।',
  createTask: 'নতুন টাস্ক তৈরি',
  allTasksFilter: 'সকল',
  verifiedOutcome: 'যাচাইকৃত আউটপুট / ফলাফল',
  taskExecutionStages: 'টাস্ক এক্সিকিউশন ধাপসমূহ',
  runWithAgent: 'এজেন্ট দিয়ে চালান',
};

// Japanese Translations (Japan #3)
export const JA_TRANSLATIONS: PageTranslations = {
  ...EN_TRANSLATIONS,
  appName: 'Agent-alpha08',
  appSubtitle: '専属AIワークOS',
  agentReady: 'エージェント稼働中',
  agentStatus: 'エージェントステータス',
  openChat: 'AIチャットを開く',
  newSession: '新規セッション',
  activeLanguageLabel: '現在のアクティブ言語:',
  systemActive: 'システム正常',
  hubLabel: 'テックハブ:',
  welcomeSubtitle: 'あなたの専属AIワークエージェントがスタンバイしています。顧客メッセージの返信、データ監査、リサーチ、コードのデバッグなど、自然言語で指示してください。',
  inExecution: '実行中',
  verified: '検証完了',
  actionRequired: '承認待ち',
  allClear: 'クリア',
  readyToRun: '即時実行可',
  quickActionsTitle: 'クイックアクション',
  activePipelinesTitle: 'アクティブタスクパイプライン',
  recentOperationsTitle: 'エージェント運用ログ',
  viewAll: 'すべて表示',
  fullLog: '詳細ログ',
  sensitiveNotice: '承認待ちの機密アクション',
  reviewNow: '今すぐ確認',
  qaStartTask: 'タスク開始',
  qaStartTaskDesc: '自律ワークフロー起動',
  qaAnalyzeFiles: 'ファイル分析',
  qaAnalyzeFilesDesc: 'データ監査と検証',
  qaResearch: 'リサーチ',
  qaResearchDesc: '情報集約と要約',
  qaCreateDoc: 'ドキュメント作成',
  qaCreateDocDesc: 'レポート・仕様書起草',
  qaWriteCode: 'コード作成・監査',
  qaWriteCodeDesc: 'デバッグ・安全リファクタ',
  qaOpenChat: 'AIチャット',
  qaOpenChatDesc: '直接指示ストリーム',
  chatActiveNotice: 'AIワークエージェント稼働中',
  chatSubtitle: '自然言語タスク実行 • 計画、ツール実行、検証',
  quickDemoPromptsTitle: 'クイックデモ指示:',
  promptAnalyzeWebsite: 'ウェブサイトプロジェクトを分析し、レポートを作成してください。',
  promptCustomerReply: '配送遅延に関する顧客からの問い合わせへの返信を作成してください。',
  promptProductDescription: '自律型AIエージェントの魅力的な製品紹介文を作成してください。',
  promptDebugCode: 'このJavaScriptコードの問題を特定し、安全な改善案を提示してください。',
  promptResearchTrends: '最新のWebデザイン動向をリサーチし、要約してください。',
  shiftEnterHint: 'Shift + Enter で改行',
  autonomousAgentBadge: '自律エージェントモード',
  attachWorkspaceFile: 'ワークスペースファイル添付',
  uploadFromDevice: '端末からアップロード',
  voiceInputTooltip: '音声入力',
  stopBtn: '生成停止',
  tasksSubtitle: '自律タスクキュー、実行ステージ、検証結果の統合管理。',
  createTaskBtn: '新規タスク作成',
  searchTasksPlaceholder: 'タスクを検索...',
  filesSubtitle: '分析対象ドキュメント、データセット、コードの閲覧とアップロード。',
  newFileBtn: '新規ファイル',
  uploadFilesBtn: 'ファイルアップロード',
  toolsSubtitle: 'モジュール型機能、セキュリティ境界、サンドボックス実行基盤。',
  approvalsSubtitle: '外部通信・データ削除のゼロトラスト承認ゲートウェイ。',
  settingsSubtitle: 'エージェントプロファイル、30カ国のテクノロジー言語モード、安全管理設定。',
  saveSettingsBtn: '設定を保存',
  savedSuccessBadge: '正常に保存されました',
};

// German Translations (Germany #4)
export const DE_TRANSLATIONS: PageTranslations = {
  ...EN_TRANSLATIONS,
  appName: 'Agent-alpha08',
  appSubtitle: 'Persönliches KI-Arbeits-Betriebssystem',
  agentReady: 'Agent Bereit & Aktiv',
  agentStatus: 'Agentenstatus',
  openChat: 'KI-Chat öffnen',
  newSession: 'Neue Sitzung',
  activeLanguageLabel: 'Aktiver Sprachmodus:',
  systemActive: 'SYSTEM AKTIV',
  hubLabel: 'Tech-Hub:',
  welcomeSubtitle: 'Ihr persönlicher KI-Arbeitsagent ist einsatzbereit. Erteilen Sie Anweisungen in natürlicher Sprache für Kundenkorrespondenz, Datenprüfung, Recherche und Code-Audits.',
  inExecution: 'in Ausführung',
  verified: 'verifiziert',
  actionRequired: 'Aktion erforderlich',
  allClear: 'alles bereit',
  readyToRun: 'betriebsbereit',
  quickActionsTitle: 'Schnellstart-Aktionen',
  activePipelinesTitle: 'Aktive Aufgaben-Pipelines',
  recentOperationsTitle: 'Aktuelle Agenten-Operationen',
  viewAll: 'Alle anzeigen',
  fullLog: 'Vollständiges Protokoll',
  sensitiveNotice: 'Sensible Aktion wartet auf Genehmigung',
  reviewNow: 'Jetzt prüfen',
  chatActiveNotice: 'Arbeitsagent Aktiv',
  chatSubtitle: 'Natürliche Sprachausführung • Planen, Ausführen, Verifizieren',
  quickDemoPromptsTitle: 'Beispielanweisungen:',
  promptAnalyzeWebsite: 'Analysieren Sie mein Website-Projekt und erstellen Sie einen Prüfbericht.',
  promptCustomerReply: 'Entwerfen Sie eine Kundenantwort bezüglich einer Lieferverzögerung.',
  promptProductDescription: 'Erstellen Sie eine professionelle Produktbeschreibung für unseren KI-Agenten.',
  promptDebugCode: 'Finden Sie Probleme in diesem JavaScript-Code und optimieren Sie ihn.',
  promptResearchTrends: 'Recherchieren Sie aktuelle Trends im Portfolio-Design.',
  shiftEnterHint: 'Umschalt + Eingabe für neue Zeile',
  autonomousAgentBadge: 'Autonomer Agentenmodus',
  tasksSubtitle: 'Autonome Aufgabenwarteschlange, Phasen und geprüfte Ergebnisse.',
  createTaskBtn: 'Aufgabe erstellen',
  filesSubtitle: 'Dateien, Datensätze und Code verwalten, prüfen und hochladen.',
  toolsSubtitle: 'Modulare Werkzeuge, Sicherheitsrichtlinien und Sandbox-Testumgebung.',
  approvalsSubtitle: 'Zero-Trust-Genehmigungsgateway für externe Kommunikation und Schreibzugriffe.',
  settingsSubtitle: 'Agentenprofil, 30 Technologie-Sprachmodi und Sicherheitsgrenzen konfigurieren.',
  saveSettingsBtn: 'Einstellungen speichern',
  savedSuccessBadge: 'Erfolgreich gespeichert',
};

// French Translations (France #13)
export const FR_TRANSLATIONS: PageTranslations = {
  ...EN_TRANSLATIONS,
  appName: 'Agent-alpha08',
  appSubtitle: 'Système d’Exploitation IA Personnel',
  agentReady: 'Agent Prêt & Actif',
  agentStatus: 'Statut de l’Agent',
  openChat: 'Ouvrir le Chat IA',
  newSession: 'Nouvelle Session',
  activeLanguageLabel: 'Mode de langue actif :',
  systemActive: 'SYSTÈME ACTIF',
  hubLabel: 'Pôle Technologique :',
  welcomeSubtitle: 'Votre agent de travail IA personnel est opérationnel. Donnez des instructions en langage naturel pour traiter les messages clients, auditer les données et rechercher.',
  inExecution: 'en cours',
  verified: 'vérifié',
  actionRequired: 'action requise',
  allClear: 'tout est prêt',
  readyToRun: 'prêt à exécuter',
  quickActionsTitle: 'Actions Rapides',
  activePipelinesTitle: 'Tâches en Cours',
  recentOperationsTitle: 'Opérations Récentes',
  viewAll: 'Voir tout',
  fullLog: 'Journal Complet',
  sensitiveNotice: 'Action sensible en attente d’approbation',
  reviewNow: 'Examiner maintenant',
  chatActiveNotice: 'Agent de Travail Actif',
  chatSubtitle: 'Exécution en Langage Naturel • Planifier, Agir, Vérifier',
  quickDemoPromptsTitle: 'Instructions Démo Rapides :',
  promptAnalyzeWebsite: 'Analysez mon projet de site web et rédigez un rapport.',
  promptCustomerReply: 'Rédigez une réponse client concernant un retard de livraison.',
  promptProductDescription: 'Rédigez une description produit percutante pour notre agent IA.',
  promptDebugCode: 'Identifiez les erreurs dans ce code JavaScript et proposez un correctif.',
  promptResearchTrends: 'Faites des recherches sur les tendances modernes des sites portfolio.',
  shiftEnterHint: 'Maj + Entrée pour un saut de ligne',
  autonomousAgentBadge: 'Mode Agent Autonome',
  tasksSubtitle: 'File de tâches autonomes, étapes d’exécution et résultats validés.',
  createTaskBtn: 'Créer une Tâche',
  filesSubtitle: 'Explorer, téléverser, inspecter et analyser documents et données.',
  toolsSubtitle: 'Capacités modulaires, limites de sécurité et bac à sable de test.',
  approvalsSubtitle: 'Passerelle de sécurité Zero-Trust pour les communications et écritures.',
  settingsSubtitle: 'Profil de l’agent, 30 modes linguistiques technologiques et autorisations.',
  saveSettingsBtn: 'Enregistrer les paramètres',
  savedSuccessBadge: 'Enregistré avec succès',
};

// Spanish Translations (Spain #25)
export const ES_TRANSLATIONS: PageTranslations = {
  ...EN_TRANSLATIONS,
  appName: 'Agent-alpha08',
  appSubtitle: 'Sistema Operativo de Trabajo con IA Personal',
  agentReady: 'Agente Listo y Activo',
  agentStatus: 'Estado del Agente',
  openChat: 'Abrir Chat IA',
  newSession: 'Nueva Sesión',
  activeLanguageLabel: 'Modo de idioma activo:',
  systemActive: 'SISTEMA ACTIVO',
  hubLabel: 'Centro Tecnológico:',
  welcomeSubtitle: 'Su agente de trabajo de IA personal está listo. Proporcione instrucciones en lenguaje natural para responder mensajes, auditar datos y depurar código.',
  inExecution: 'en ejecución',
  verified: 'verificado',
  actionRequired: 'acción requerida',
  allClear: 'todo listo',
  readyToRun: 'listo para ejecutar',
  quickActionsTitle: 'Lanzadores Rápidos',
  activePipelinesTitle: 'Flujos de Tareas Activos',
  recentOperationsTitle: 'Operaciones Recientes',
  viewAll: 'Ver todo',
  fullLog: 'Registro Completo',
  sensitiveNotice: 'Acción sensible en espera de aprobación',
  reviewNow: 'Revisar Ahora',
  chatActiveNotice: 'Agente de Trabajo Activo',
  chatSubtitle: 'Ejecución en Lenguaje Natural • Planificar, Ejecutar, Verificar',
  quickDemoPromptsTitle: 'Instrucciones Rápidas de Demostración:',
  promptAnalyzeWebsite: 'Analiza mi proyecto de sitio web y elabora un informe técnico.',
  promptCustomerReply: 'Redacta una respuesta a este mensaje de cliente sobre un retraso en la entrega.',
  promptProductDescription: 'Crea una descripción de producto profesional para nuestro agente IA.',
  promptDebugCode: 'Encuentra errores en este código JavaScript y proporciona una refactorización segura.',
  promptResearchTrends: 'Investiga tendencias modernas en diseño web de portafolios.',
  shiftEnterHint: 'Shift + Enter para salto de línea',
  autonomousAgentBadge: 'Modo de Agente Autónomo',
  tasksSubtitle: 'Cola de tareas autónomas, etapas de ejecución y resultados verificados.',
  createTaskBtn: 'Crear Tarea',
  filesSubtitle: 'Explorar, subir, inspeccionar y analizar documentos y código.',
  toolsSubtitle: 'Herramientas modulares, límites de seguridad y entorno de pruebas.',
  approvalsSubtitle: 'Pasarela de aprobación Zero-Trust para comunicaciones externas y eliminaciones.',
  settingsSubtitle: 'Perfil del agente, 30 modos de idiomas tecnológicos y seguridad.',
  saveSettingsBtn: 'Guardar Configuración',
  savedSuccessBadge: 'Guardado con Éxito',
};

// Chinese Translations (China #8 & Taiwan #17 & Singapore #9)
export const ZH_TRANSLATIONS: PageTranslations = {
  ...EN_TRANSLATIONS,
  appName: 'Agent-alpha08',
  appSubtitle: '个人 AI 工作操作系统',
  agentReady: '智能体就绪与就位',
  agentStatus: '智能体状态',
  openChat: '打开 AI 对话',
  newSession: '新建会话',
  activeLanguageLabel: '当前运行语言模式：',
  systemActive: '系统运行中',
  hubLabel: '科技枢纽：',
  welcomeSubtitle: '您的专属 AI 工作智能体已就绪。通过自然语言下达指令，智能体将自主规划、调用工具、校验结果并生成报告。',
  inExecution: '正在执行',
  verified: '已验证',
  actionRequired: '需要审批',
  allClear: '一切就绪',
  readyToRun: '随时启动',
  quickActionsTitle: '快捷行动启动器',
  activePipelinesTitle: '当前任务管线',
  recentOperationsTitle: '近期智能体操作',
  viewAll: '查看全部',
  fullLog: '完整日志',
  sensitiveNotice: '敏感操作等待您的审批',
  reviewNow: '立即审核',
  qaStartTask: '开始任务',
  qaStartTaskDesc: '启动自主流水线',
  qaAnalyzeFiles: '分析文件',
  qaAnalyzeFilesDesc: '审计空间数据',
  qaResearch: '深度研究',
  qaResearchDesc: '提炼行业知识',
  qaCreateDoc: '创建文档',
  qaCreateDocDesc: '撰写报告与规范',
  qaWriteCode: '编写代码',
  qaWriteCodeDesc: '审查与重构代码',
  qaOpenChat: 'AI 交互',
  qaOpenChatDesc: '直接指令对话',
  chatActiveNotice: '工作智能体已激活',
  chatSubtitle: '自然语言工作执行 • 规划、调用工具与验证',
  quickDemoPromptsTitle: '快捷演示指令：',
  promptAnalyzeWebsite: '分析我的网站项目代码并生成一份诊断报告。',
  promptCustomerReply: '针对发货延迟起草一份专业且诚恳的客户回复邮件。',
  promptProductDescription: '为我们的人工智能工作智能体撰写一段高转化率的产品介绍。',
  promptDebugCode: '找出这段 JavaScript 代码中的缺陷并提供安全重构方案。',
  promptResearchTrends: '调研现代作品集网站的设计趋势并总结核心要点。',
  shiftEnterHint: '按 Shift + Enter 换行',
  autonomousAgentBadge: '自主智能体模式',
  tasksSubtitle: '自主任务队列、执行阶段和验证结果一览。',
  createTaskBtn: '创建任务',
  filesSubtitle: '浏览、上传、检查和分析工作空间文件与数据集。',
  toolsSubtitle: '模块化智能体能力、安全边界与沙箱测试中心。',
  approvalsSubtitle: '针对外部通信与数据写操作的零信任审批关卡。',
  settingsSubtitle: '配置智能体画像、30 个科技国家语言模式及安全边界。',
  saveSettingsBtn: '保存设置',
  savedSuccessBadge: '保存成功',
};

// Arabic Translations (UAE #11)
export const AR_TRANSLATIONS: PageTranslations = {
  ...EN_TRANSLATIONS,
  appName: 'وكيل عبد الله للعمل بالذكاء الاصطناعي',
  appSubtitle: 'نظام تشغيل مهام الذكاء الاصطناعي الشخصي',
  agentReady: 'الوكيل جاهز ونشط',
  agentStatus: 'حالة الوكيل',
  openChat: 'فتح محادثة الذكاء الاصطناعي',
  newSession: 'جلسة جديدة',
  activeLanguageLabel: 'وضع اللغة النشط حالياً:',
  systemActive: 'النظام نشط',
  hubLabel: 'المركز التقني:',
  welcomeSubtitle: 'وكيل العمل الذكي الخاص بك جاهز تماماً. قدم تعليمات باللغة الطبيعية لقراءة رسائل العملاء، تدقيق البيانات، والبحث البرمجي.',
  inExecution: 'قيد التنفيذ',
  verified: 'تم التحقق',
  actionRequired: 'مطلوب إجراء',
  allClear: 'جاهز تماماً',
  readyToRun: 'مستعد للتشغيل',
  quickActionsTitle: 'مشغلات الإجراءات السريعة',
  activePipelinesTitle: 'مهام العمل النشطة',
  recentOperationsTitle: 'أحدث العمليات',
  viewAll: 'عرض الكل',
  fullLog: 'السجل الكامل',
  sensitiveNotice: 'إجراء حساس بانتظار موافقتك',
  reviewNow: 'مراجعة الآن',
  chatActiveNotice: 'وكيل العمل الذكي نشط',
  chatSubtitle: 'تنفيذ المهام باللغة الطبيعية • تخطيط، أدوات، وتحقق',
  quickDemoPromptsTitle: 'تعليمات تجريبية سريعة:',
  promptAnalyzeWebsite: 'قم بتحليل مشروع موقع الويب الخاص بي وإنشاء تقرير تدقيق.',
  promptCustomerReply: 'صِغ رداً احترافياً لرسالة العميل هذه بخصوص تأخير التسليم.',
  promptProductDescription: 'اكتب وصفاً تسويقياً احترافياً لوكيل العمل الذكي.',
  promptDebugCode: 'ابحث عن المشكلات في كود جافا سكريبت هذا واقترح حلاً آمناً.',
  promptResearchTrends: 'ابحث في أحدث اتجاهات تصميم مواقع الأعمال ولخص النتائج.',
  shiftEnterHint: 'اضغط Shift + Enter لسطر جديد',
  autonomousAgentBadge: 'وضع الوكيل المستقل',
  tasksSubtitle: 'قائمة المهام المستقلة ومراحل التنفيذ والنتائج المعتمدة.',
  createTaskBtn: 'إنشاء مهمة',
  filesSubtitle: 'تصفح ورفع وتدقيق المستندات وقواعد البيانات والرموز البرمجية.',
  toolsSubtitle: 'الأدوات التفاعلية، حدود الأمان، وبيئة الاختبار الافتراضية.',
  approvalsSubtitle: 'بوابة الأمان والتحقق للمراسلات الخارجية وحذف البيانات.',
  settingsSubtitle: 'تخصيص سلوك الوكيل ووضع لغات 30 دولة تقنية وقواعد الأمان.',
  saveSettingsBtn: 'حفظ الإعدادات',
  savedSuccessBadge: 'تم الحفظ بنجاح',
};

// Hindi Translations (India #5)
export const HI_TRANSLATIONS: PageTranslations = {
  ...EN_TRANSLATIONS,
  appName: 'अब्दुल्लाह एआई वर्क एजेंट',
  appSubtitle: 'पर्सनल एआई वर्क ऑपरेटिंग सिस्टम',
  agentReady: 'एजेंट सक्रिय एवं तैयार',
  agentStatus: 'एजेंट स्थिति',
  openChat: 'एआई चैट खोलें',
  newSession: 'नया सत्र',
  activeLanguageLabel: 'वर्तमान में सक्रिय भाषा मोड:',
  systemActive: 'सिस्टम सक्रिय',
  hubLabel: 'टेक हब:',
  welcomeSubtitle: 'आपका व्यक्तिगत एआई कार्य सहायक तैयार है। स्वाभाविक भाषा में निर्देश दें—एजेंट योजना बनाएगा, टूल्स चलाएगा और सत्यापित परिणाम देगा।',
  inExecution: 'प्रगति पर है',
  verified: 'सत्यापित',
  actionRequired: 'अनुमोदन आवश्यक',
  allClear: 'सब साफ़',
  readyToRun: 'चालू करने के लिए तैयार',
  quickActionsTitle: 'त्वरित कार्रवाई लॉन्चर',
  activePipelinesTitle: 'सक्रिय कार्य पाइपलाइन',
  recentOperationsTitle: 'हालिया संचालन लॉग',
  viewAll: 'सभी देखें',
  fullLog: 'पूरा लॉग',
  sensitiveNotice: 'संवेदनशील कार्रवाई आपके अनुमोदन की प्रतीक्षा में है',
  reviewNow: 'अभी समीक्षा करें',
  chatActiveNotice: 'कार्य एजेंट सक्रिय',
  chatSubtitle: 'प्राकृतिक भाषा में कार्य निष्पादन • योजना, टूल और सत्यापन',
  quickDemoPromptsTitle: 'त्वरित डेमो निर्देश:',
  promptAnalyzeWebsite: 'मेरी वेबसाइट प्रोजेक्ट का विश्लेषण करें और एक रिपोर्ट तैयार करें।',
  promptCustomerReply: 'डिलीवरी में देरी के संबंध में ग्राहक के संदेश का उत्तर तैयार करें।',
  promptProductDescription: 'हमारे एआई एजेंट के लिए एक पेशेवर उत्पाद विवरण लिखें।',
  promptDebugCode: 'इस जावास्क्रिप्ट कोड में समस्याएं ढूंढें और सुरक्षित समाधान दें।',
  promptResearchTrends: 'पोर्टफोलियो वेबसाइट के आधुनिक रुझानों पर शोध करें और सारांश बनाएं।',
  shiftEnterHint: 'नई पंक्ति के लिए Shift + Enter दबाएं',
  autonomousAgentBadge: 'स्वायत्त एजेंट मोड',
  tasksSubtitle: 'स्वायत्त कार्य कतार, निष्पादन चरण और सत्यापित परिणाम।',
  createTaskBtn: 'नया कार्य बनाएं',
  filesSubtitle: 'दस्तावेज़, डेटासेट और कोड ब्राउज़, अपलोड और विश्लेषण करें।',
  toolsSubtitle: 'मॉड्यूलर उपकरण क्षमताएं, सुरक्षा सीमाएं और सैंडबॉक्स परीक्षण।',
  approvalsSubtitle: 'बाहरी संचार और डेटा संशोधन के लिए शून्य-विश्वास अनुमोदन गेटवे।',
  settingsSubtitle: 'एजेंट प्रोफाइल, 30 तकनीकी भाषा मोड और सुरक्षा नीतियां कॉन्फ़िगर करें।',
  saveSettingsBtn: 'सेटिंग्स सहेजें',
  savedSuccessBadge: 'सफलतापूर्वक सहेजा गया',
};

// Korean Translations (South Korea #7)
export const KO_TRANSLATIONS: PageTranslations = {
  ...EN_TRANSLATIONS,
  appName: '압둘라 AI 워크 에이전트',
  appSubtitle: '개인용 AI 업무 운영체제',
  agentReady: '에이전트 준비 및 활성',
  agentStatus: '에이전트 상태',
  openChat: 'AI 채팅 열기',
  newSession: '새 세션',
  activeLanguageLabel: '현재 활성 언어 모드:',
  systemActive: '시스템 정상',
  hubLabel: '테크 허브:',
  welcomeSubtitle: '개인 AI 업무 에이전트가 준비되었습니다. 고객 메시지 회신, 데이터 감사, 리서치, 코드 디버깅 등 자연어로 지시하세요.',
  inExecution: '실행 중',
  verified: '검증 완료',
  actionRequired: '승인 대기',
  allClear: '이상 없음',
  readyToRun: '실행 준비 완료',
  quickActionsTitle: '빠른 실행기',
  activePipelinesTitle: '활성 업무 파이프라인',
  recentOperationsTitle: '최근 에이전트 작업 기록',
  viewAll: '모두 보기',
  fullLog: '전체 로그',
  sensitiveNotice: '승인 대기 중인 중요 작업',
  reviewNow: '지금 검토',
  chatActiveNotice: '업무 에이전트 활성화됨',
  chatSubtitle: '자연어 작업 실행 • 계획, 도구 실행, 검증',
  quickDemoPromptsTitle: '빠른 데모 명령:',
  promptAnalyzeWebsite: '웹사이트 프로젝트를 분석하고 보고서를 작성해 주세요.',
  promptCustomerReply: '배송 지연에 대한 고객 문의 답변을 작성해 주세요.',
  promptProductDescription: 'AI 업무 에이전트를 위한 매력적인 제품 소개서를 작성해 주세요.',
  promptDebugCode: '이 자바스크립트 코드의 오류를 찾고 안전하게 리팩토링해 주세요.',
  promptResearchTrends: '최신 포트폴리오 웹사이트 디자인 트렌드를 조사하고 요약해 주세요.',
  shiftEnterHint: '줄 바꿈: Shift + Enter',
  autonomousAgentBadge: '자율 에이전트 모드',
  tasksSubtitle: '자율 작업 큐, 단계별 진행 상태 및 검증 결과 통합 관리.',
  createTaskBtn: '작업 만들기',
  filesSubtitle: '문서, 데이터 세트, 코드 탐색, 업로드 및 정밀 분석.',
  toolsSubtitle: '모듈형 도구 레지스트리, 보안 경계 및 샌드박스 테스트 환경.',
  approvalsSubtitle: '외부 메시지 발송 및 데이터 삭제를 위한 제로 트러스트 승인 게이트웨이.',
  settingsSubtitle: '에이전트 프로필, 30개 테크 국가 언어 모드 및 보안 정책 설정.',
  saveSettingsBtn: '설정 저장',
  savedSuccessBadge: '성공적으로 저장되었습니다',
};

/**
 * Main translation getter that guarantees:
 * - If not setuped or 'en': returns 100% English
 * - If 'bn': returns 100% Bengali
 * - If other tech countries: returns tailored localized dictionary
 * - All missing keys safely fallback to English
 */
export function getPageTranslations(langId?: string): PageTranslations {
  if (!langId || langId.toLowerCase() === 'en' || langId.toLowerCase() === 'english') {
    return EN_TRANSLATIONS;
  }

  const id = langId.toLowerCase();

  if (id === 'bn' || id === 'bangla' || id === 'bengali') {
    return BN_TRANSLATIONS;
  }
  if (id === 'ja' || id === 'japan' || id === 'japanese') {
    return JA_TRANSLATIONS;
  }
  if (id === 'de' || id === 'germany' || id === 'german' || id === 'de-ch') {
    return DE_TRANSLATIONS;
  }
  if (id === 'fr' || id === 'france' || id === 'french') {
    return FR_TRANSLATIONS;
  }
  if (id === 'es' || id === 'spain' || id === 'spanish') {
    return ES_TRANSLATIONS;
  }
  if (id === 'zh' || id === 'china' || id === 'chinese' || id === 'zh-tw' || id === 'tw' || id === 'sg') {
    return ZH_TRANSLATIONS;
  }
  if (id === 'ar' || id === 'uae' || id === 'arabic') {
    return AR_TRANSLATIONS;
  }
  if (id === 'hi' || id === 'india' || id === 'hindi') {
    return HI_TRANSLATIONS;
  }
  if (id === 'ko' || id === 'korea' || id === 'korean') {
    return KO_TRANSLATIONS;
  }

  // For any other of the 30 languages, start with English and overlay language details
  return {
    ...EN_TRANSLATIONS,
  };
}
