import { TaskItem, ToolItem, FileItem, ApprovalRequest, ActivityItem, MessageItem } from '../types';

export const INITIAL_TOOLS: ToolItem[] = [
  // FILE_TOOLS
  {
    id: 'tool_read_file',
    name: 'Read File',
    category: 'FILE_TOOLS',
    description: 'Read and extract content from documents (PDF, DOCX, TXT, CSV, JSON, MD, Code)',
    status: 'connected',
    riskLevel: 'LOW_RISK',
  },
  {
    id: 'tool_search_files',
    name: 'Search Files',
    category: 'FILE_TOOLS',
    description: 'Semantic and keyword search across local workspace files',
    status: 'connected',
    riskLevel: 'LOW_RISK',
  },
  {
    id: 'tool_create_file',
    name: 'Create File',
    category: 'FILE_TOOLS',
    description: 'Generate and write new documents, reports, and code files to workspace',
    status: 'connected',
    riskLevel: 'LOW_RISK',
  },
  {
    id: 'tool_analyze_file',
    name: 'Analyze File',
    category: 'FILE_TOOLS',
    description: 'Deep structural analysis, complexity metrics, and content verification',
    status: 'connected',
    riskLevel: 'LOW_RISK',
  },

  // WEB_TOOLS
  {
    id: 'tool_web_search',
    name: 'Web Search',
    category: 'WEB_TOOLS',
    description: 'Query live search indexes to gather real-time data and industry benchmarks',
    status: 'connected',
    riskLevel: 'LOW_RISK',
  },
  {
    id: 'tool_open_webpage',
    name: 'Open Webpage',
    category: 'WEB_TOOLS',
    description: 'Inspect URL endpoints, fetch HTML content, and examine DOM structures',
    status: 'connected',
    riskLevel: 'LOW_RISK',
  },
  {
    id: 'tool_extract_info',
    name: 'Extract Information',
    category: 'WEB_TOOLS',
    description: 'Isolate key statistics, quotes, and factual citations from web articles',
    status: 'connected',
    riskLevel: 'LOW_RISK',
  },

  // CODE_TOOLS
  {
    id: 'tool_analyze_code',
    name: 'Analyze Code',
    category: 'CODE_TOOLS',
    description: 'Perform static AST audits, vulnerability checks, and performance profiling',
    status: 'connected',
    riskLevel: 'LOW_RISK',
  },
  {
    id: 'tool_generate_code',
    name: 'Generate Code',
    category: 'CODE_TOOLS',
    description: 'Synthesize clean, typed, modular components and backend controllers',
    status: 'connected',
    riskLevel: 'LOW_RISK',
  },
  {
    id: 'tool_debug_code',
    name: 'Debug Code',
    category: 'CODE_TOOLS',
    description: 'Isolate syntax and runtime exceptions, race conditions, and memory leaks',
    status: 'connected',
    riskLevel: 'LOW_RISK',
  },

  // DOCUMENT_TOOLS
  {
    id: 'tool_create_doc',
    name: 'Create Document',
    category: 'DOCUMENT_TOOLS',
    description: 'Compose executive briefs, client proposals, project roadmaps, and PRDs',
    status: 'connected',
    riskLevel: 'LOW_RISK',
  },
  {
    id: 'tool_summarize_doc',
    name: 'Summarize Document',
    category: 'DOCUMENT_TOOLS',
    description: 'Condense multi-page whitepapers into high-signal bulleted takeaways',
    status: 'connected',
    riskLevel: 'LOW_RISK',
  },
  {
    id: 'tool_format_doc',
    name: 'Format Document',
    category: 'DOCUMENT_TOOLS',
    description: 'Standardize headers, markdown hierarchy, callouts, and clean tables',
    status: 'connected',
    riskLevel: 'LOW_RISK',
  },

  // DATA_TOOLS
  {
    id: 'tool_analyze_csv',
    name: 'Analyze CSV',
    category: 'DATA_TOOLS',
    description: 'Parse tabular rows, calculate aggregations, distributions, and null ratios',
    status: 'connected',
    riskLevel: 'LOW_RISK',
  },
  {
    id: 'tool_analyze_json',
    name: 'Analyze JSON',
    category: 'DATA_TOOLS',
    description: 'Validate schemas, flatten nested hierarchies, and query data paths',
    status: 'connected',
    riskLevel: 'LOW_RISK',
  },
  {
    id: 'tool_gen_tables',
    name: 'Generate Tables',
    category: 'DATA_TOOLS',
    description: 'Render responsive, formatted data tables with column alignment',
    status: 'connected',
    riskLevel: 'LOW_RISK',
  },
  {
    id: 'tool_gen_charts',
    name: 'Generate Charts',
    category: 'DATA_TOOLS',
    description: 'Compute statistical distribution charts, bar metrics, and trendlines',
    status: 'connected',
    riskLevel: 'LOW_RISK',
  },

  // CREATIVE_TOOLS
  {
    id: 'tool_design_concepts',
    name: 'Generate Design Concepts',
    category: 'CREATIVE_TOOLS',
    description: 'Produce high-converting UI wireframes, design systems, and component specs',
    status: 'connected',
    riskLevel: 'LOW_RISK',
  },
  {
    id: 'tool_gen_prompts',
    name: 'Generate Prompts',
    category: 'CREATIVE_TOOLS',
    description: 'Craft high-precision instructions and few-shot reasoning prompts',
    status: 'connected',
    riskLevel: 'LOW_RISK',
  },
  {
    id: 'tool_product_desc',
    name: 'Create Product Description',
    category: 'CREATIVE_TOOLS',
    description: 'Generate feature-benefit matrices and conversion-focused product copy',
    status: 'connected',
    riskLevel: 'LOW_RISK',
  },
  {
    id: 'tool_marketing_copy',
    name: 'Create Marketing Copy',
    category: 'CREATIVE_TOOLS',
    description: 'Draft high-impact email campaigns, ad taglines, and social announcements',
    status: 'connected',
    riskLevel: 'LOW_RISK',
  },
  {
    id: 'tool_seo_audit',
    name: 'SEO & Performance Auditor',
    category: 'WEB_TOOLS',
    description: 'Audit any URL for search engine optimization indexing, response latency, metadata depth, and mobile friendliness',
    status: 'connected',
    riskLevel: 'LOW_RISK',
  },
  {
    id: 'tool_sql_designer',
    name: 'SQL Sandbox & DB Designer',
    category: 'DATA_TOOLS',
    description: 'Design relational tables, test complex SQL queries, generate mocked seeds, and analyze query execution plans',
    status: 'connected',
    riskLevel: 'LOW_RISK',
  },
  {
    id: 'tool_prompt_optimizer',
    name: 'Prompt Optimizer Engine',
    category: 'CREATIVE_TOOLS',
    description: 'Refine raw natural language concepts into high-signal system instructions, incorporating few-shot templates and formatting constraints',
    status: 'connected',
    riskLevel: 'LOW_RISK',
  },
];

export const FUTURE_INTEGRATIONS = [
  { name: 'Google Drive', category: 'Cloud Storage', status: 'Not connected', icon: 'HardDrive' },
  { name: 'Gmail', category: 'Communication', status: 'Not connected', icon: 'Mail' },
  { name: 'Google Calendar', category: 'Scheduling', status: 'Not connected', icon: 'Calendar' },
  { name: 'GitHub', category: 'Version Control', status: 'Not connected', icon: 'GitBranch' },
  { name: 'Discord', category: 'Team Chat', status: 'Not connected', icon: 'MessageSquare' },
  { name: 'Slack', category: 'Team Chat', status: 'Not connected', icon: 'Slack' },
  { name: 'Notion', category: 'Knowledge Base', status: 'Not connected', icon: 'BookOpen' },
  { name: 'HubSpot / CRM', category: 'Customer Relations', status: 'Not connected', icon: 'Users' },
];

export const INITIAL_FILES: FileItem[] = [
  {
    id: 'file_income_plan',
    name: '100-dollar-income-plan.md',
    size: '4.8 KB',
    type: 'text/markdown',
    extension: 'md',
    updatedAt: 'Just Now',
    category: 'document',
    content: `# 🎯 1-Month $100 Income Strategy (১ মাসে $১০০ আয়ের রোডম্যাপ)

## 📋 Executive Overview
This practical, milestone-driven strategy is designed to help Abdullah earn **$100 within 30 days** by leveraging AI-assisted workflows, micro-freelancing, and local/global digital services. 

---

## 📅 Phase 1: Preparation & Setup (Days 1 - 5)
*Target: Profiles live and verified.*
*   **Action 1:** Create professional accounts on **Fiverr, Upwork, and Kwork**.
*   **Action 2:** Choose a niche: *AI-Assisted Content Writing*, *SEO Audit Reports*, or *UI Mockup/Wireframe Generation*.
*   **Action 3:** Optimize your profile bios using the **Creative Tools (Prompt Optimizer)** in this Workspace to stand out.

---

## 🚀 Phase 2: Active Service Delivery (Days 6 - 20)
*Target: First 2-3 orders ($40 - $50 total).*
*   **Service A: AI-Assisted Blog Posts ($10/post)**
    *   *How:* Use Gemini to outline and write SEO-friendly posts. Fact-check and rewrite manually for a human touch.
*   **Service B: Website SEO Audits ($15/audit)**
    *   *How:* Use the **SEO & Performance Auditor** tool inside your Tools View. Enter client websites, download the report, and deliver it with personalized suggestions.
*   **Service C: Custom Prompts / Custom GPTs ($15/package)**
    *   *How:* Design and bundle 10 custom marketing/automation prompts for business niches.

---

## 📈 Phase 3: Scaling & Local Outreach (Days 21 - 30)
*Target: Final $50 - $60 to reach the $100 milestone.*
*   **Action 1: Local Social Media Audits ($20/client)**
    *   Identify local businesses with poor online presence on Facebook/LinkedIn.
    *   Offer them a structured 1-month content strategy generated by your AI Agent.
*   **Action 2: Quick Bug Fixing / Script Modification ($10/task)**
    *   Identify and fix minor HTML/CSS/JS errors for clients on micro-task platforms.

---

## 🔑 Key Rules for Success
1.  **Fast Communication:** Reply to buyers within 1 hour.
2.  **Over-deliver:** Provide a bonus report or free consultation with every order to get 5-star reviews.
3.  **Leverage This Workspace:** Use the integrated tools (File Readers, Prompt Optimizers) to finish tasks in 15 minutes instead of 2 hours.`,
    isGenerated: true,
  },
  {
    id: 'file_web_audit',
    name: 'website-audit.md',
    size: '14.2 KB',
    type: 'text/markdown',
    extension: 'md',
    updatedAt: '10:45 AM Today',
    category: 'document',
    content: `# Website Performance & SEO Audit Report

## Executive Summary
Audit of Abdullah's Portfolio and Client Gateway indicates a strong 92/100 Core Web Vitals score.

### Key Metrics
- First Contentful Paint (FCP): 0.8s
- Largest Contentful Paint (LCP): 1.4s
- Cumulative Layout Shift (CLS): 0.02
- Accessibility Score: 98/100

### Priority Action Items
1. Enable AVIF/WebP image compression for project gallery.
2. Minify third-party analytics script payload.
3. Add OpenGraph tags for interactive previews.`,
    isGenerated: true,
  },
  {
    id: 'file_customer_feedback',
    name: 'customer-feedback.csv',
    size: '32.8 KB',
    type: 'text/csv',
    extension: 'csv',
    updatedAt: '09:20 AM Today',
    category: 'data',
    content: `Customer_ID,Name,Satisfaction_Score,Feedback_Category,Comments
CUST-101,Rahim Ahmed,4.8,Support,"Very fast response on our order dispatch issue."
CUST-102,Farhana Karim,5.0,Product,"The updated UI workflow saved our team 4 hours weekly."
CUST-103,Tanvir Hasan,3.2,Delivery,"Tracking information was delayed by 3 hours."
CUST-104,Nadia Sultana,4.9,Pricing,"Exceptional value for agency work automation."`,
  },
  {
    id: 'file_order_script',
    name: 'order-processing.js',
    size: '8.4 KB',
    type: 'application/javascript',
    extension: 'js',
    updatedAt: '08:50 AM Today',
    category: 'code',
    content: `// Client order verification service
async function processClientOrder(orderId, customerPayload) {
  // Potential unhandled exception: no try/catch wrapper
  const inventoryCheck = await queryInventory(orderId);
  
  if (inventoryCheck.available) {
    // Missing validation on customer email format
    const invoice = generateInvoice(orderId, customerPayload.price);
    await dispatchNotification(customerPayload.email, invoice);
    return { status: "processed", invoiceId: invoice.id };
  } else {
    // Missing rollback on partial inventory reservations
    return { status: "out_of_stock" };
  }
}`,
  },
  {
    id: 'file_product_spec',
    name: 'product-spec.json',
    size: '6.1 KB',
    type: 'application/json',
    extension: 'json',
    updatedAt: 'Yesterday',
    category: 'data',
    content: `{
  "productId": "AGENT-PRO-2026",
  "name": "Agent-alpha08 Autonomous Operating System",
  "version": "3.8.0-flash",
  "features": [
    "Full-stack agentic execution",
    "Multi-step safe task planning",
    "Permission gatekeeper for sensitive actions",
    "Dual language support (Bangla & English)"
  ],
  "securityTier": "Enterprise Strict"
}`,
  },
];

export const INITIAL_TASKS: TaskItem[] = [
  {
    id: 'task_001',
    title: 'Analyze my website project',
    description: 'Perform complete Core Web Vitals, accessibility, and SEO audit on current web app assets.',
    status: 'Completed',
    priority: 'High',
    createdTime: '10:42 AM Today',
    updatedTime: '10:45 AM Today',
    progress: 100,
    requiredTools: ['Read File', 'Analyze File', 'Web Search'],
    approvalStatus: 'None',
    result: 'Audit completed. Score 92/100. Generated "website-audit.md" with prioritized recommendations.',
    planSteps: [
      { title: 'Understanding request', status: 'completed' },
      { title: 'Checking available files', status: 'completed' },
      { title: 'Analyzing project assets', status: 'completed' },
      { title: 'Preparing report & file', status: 'completed' },
    ],
  },
  {
    id: 'task_002',
    title: 'Draft a reply to this customer',
    description: 'Synthesize empathetic reply for Customer Tanvir Hasan regarding delivery tracking delay.',
    status: 'Waiting for Approval',
    priority: 'Urgent',
    createdTime: '10:46 AM Today',
    updatedTime: '10:46 AM Today',
    progress: 85,
    requiredTools: ['Read File', 'Create Marketing Copy'],
    approvalStatus: 'Pending',
    result: 'Drafted professional response. Stoppped execution for human review prior to sending.',
    planSteps: [
      { title: 'Analyzing customer message', status: 'completed' },
      { title: 'Identifying intent & urgency', status: 'completed' },
      { title: 'Drafting response', status: 'completed' },
      { title: 'Waiting for approval', status: 'running' },
    ],
  },
  {
    id: 'task_003',
    title: 'Find problems in this JavaScript code',
    description: 'Scan order-processing.js for race conditions, unhandled rejections, and missing validations.',
    status: 'Running',
    priority: 'Medium',
    createdTime: '10:48 AM Today',
    updatedTime: '10:48 AM Today',
    progress: 60,
    requiredTools: ['Analyze Code', 'Debug Code'],
    approvalStatus: 'None',
    planSteps: [
      { title: 'Scanning AST tree', status: 'completed' },
      { title: 'Checking error handling', status: 'completed' },
      { title: 'Drafting refactored code', status: 'running' },
      { title: 'Generating test suite', status: 'pending' },
    ],
  },
  {
    id: 'task_004',
    title: 'Research modern portfolio website trends',
    description: 'Gather verified design trends, typography pairings, and interaction benchmarks for 2026.',
    status: 'Completed',
    priority: 'Medium',
    createdTime: '09:15 AM Today',
    updatedTime: '09:22 AM Today',
    progress: 100,
    requiredTools: ['Web Search', 'Extract Information'],
    approvalStatus: 'None',
    result: 'Researched 12 leading design systems. Highlighted dark neo-minimalism, high-contrast serif/sans pairings, and AI copilot integrations.',
    planSteps: [
      { title: 'Querying design sources', status: 'completed' },
      { title: 'Extracting key takeaways', status: 'completed' },
      { title: 'Formatting research summary', status: 'completed' },
    ],
  },
  {
    id: 'task_005',
    title: 'Create a professional product description',
    description: 'Write conversion-focused copy highlighting automated work workflows for the AI Agent.',
    status: 'Planning',
    priority: 'Low',
    createdTime: '10:50 AM Today',
    updatedTime: '10:50 AM Today',
    progress: 20,
    requiredTools: ['Create Product Description', 'Format Document'],
    approvalStatus: 'None',
    planSteps: [
      { title: 'Analyzing target audience', status: 'completed' },
      { title: 'Structuring value propositions', status: 'running' },
      { title: 'Refining tone & call-to-actions', status: 'pending' },
    ],
  },
];

export const INITIAL_APPROVALS: ApprovalRequest[] = [
  {
    id: 'appr_001',
    taskId: 'task_002',
    action: 'Send Customer Reply',
    recipient: 'Tanvir Hasan (tanvir.h@example.com)',
    details: 'Send drafted message regarding delivery tracking resolution to customer.',
    preview: `Dear Tanvir Hasan,

Thank you for contacting Abdullah AI Services. We sincerely apologize for the delay in providing your tracking code. 

Our logistics team has verified that your package is currently in transit and scheduled for delivery before 4:00 PM today. We have also credited 15% towards your next monthly billing cycle as a courtesy.

Warm regards,
Abdullah AI Work Operations`,
    riskLevel: 'REQUIRES_APPROVAL',
    riskReason: 'External communication with real client',
    status: 'pending',
    timestamp: '10:46 AM Today',
  },
];

export const INITIAL_ACTIVITIES: ActivityItem[] = [
  {
    id: 'act_005',
    timestamp: '10:46 AM',
    action: 'Approval Requested',
    tool: 'Permission Gatekeeper',
    result: 'Halted dispatch of customer message to Tanvir Hasan. Awaiting user consent.',
    status: 'pending',
    details: 'External client communication',
  },
  {
    id: 'act_004',
    timestamp: '10:45 AM',
    action: 'Generated Report',
    tool: 'Create File (DOCUMENT_TOOLS)',
    result: 'Persisted "website-audit.md" with 92/100 performance score and recommendations.',
    status: 'success',
  },
  {
    id: 'act_003',
    timestamp: '10:44 AM',
    action: 'Analyzed Project',
    tool: 'Analyze File (FILE_TOOLS)',
    result: 'Parsed core web assets, evaluated Core Web Vitals, and identified asset minification targets.',
    status: 'success',
  },
  {
    id: 'act_002',
    timestamp: '10:43 AM',
    action: 'Read Workspace Files',
    tool: 'Read File (FILE_TOOLS)',
    result: 'Successfully indexed 4 local files for project contextualization.',
    status: 'success',
  },
  {
    id: 'act_001',
    timestamp: '10:42 AM',
    action: 'Agent Started Task',
    tool: 'AI Work Orchestrator',
    result: 'Task "Analyze my website project" initiated by user instruction.',
    status: 'success',
  },
];

export const INITIAL_MESSAGES: MessageItem[] = [
  {
    id: 'msg_welcome',
    sender: 'agent',
    text: `## Objective
Welcome! I am **Agent-alpha08**, your personal AI work operating system powered by Gemini.

## Plan
- Understand natural language instructions and construct autonomous execution pipelines.
- Deploy authorized workspace tools across files, web intelligence, document drafting, and code auditing.
- Run verification checks and synthesize verified operational reports.
- Guard sensitive actions (external client messaging, database writes, asset deletions) behind strict approval checkpoints.

## Verification
Workspace online. All tools armed and ready. Select any quick action or enter your instructions below.`,
    timestamp: '10:40 AM',
    planSteps: [
      { title: 'System initialized & ready', status: 'completed' },
      { title: 'Workspace tools connected', status: 'completed' },
      { title: 'Permission gatekeeper active', status: 'completed' },
    ],
  },
];
