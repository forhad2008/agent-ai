export type TaskStatus = 
  | 'Pending' 
  | 'Planning' 
  | 'Running' 
  | 'Waiting for Approval' 
  | 'Completed' 
  | 'Failed' 
  | 'Cancelled';

export type TaskPriority = 'Low' | 'Medium' | 'High' | 'Urgent';

export type RiskLevel = 'LOW_RISK' | 'REQUIRES_APPROVAL';

export type ToolCategory = 
  | 'FILE_TOOLS' 
  | 'WEB_TOOLS' 
  | 'CODE_TOOLS' 
  | 'DOCUMENT_TOOLS' 
  | 'DATA_TOOLS' 
  | 'CREATIVE_TOOLS';

export interface PlanStep {
  title: string;
  status: 'completed' | 'running' | 'pending';
}

export interface ToolExecutionRecord {
  id?: string;
  toolName: string;
  category: ToolCategory | string;
  status: 'success' | 'running' | 'failed' | 'idle';
  description: string;
  timestamp?: string;
}

export interface TaskItem {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  createdTime: string;
  updatedTime: string;
  progress: number;
  requiredTools: string[];
  approvalStatus: 'None' | 'Pending' | 'Approved' | 'Rejected';
  result?: string;
  planSteps?: PlanStep[];
  error?: string;
}

export interface ToolItem {
  id: string;
  name: string;
  category: ToolCategory;
  description: string;
  status: 'connected' | 'idle' | 'executing' | 'error' | 'not_connected';
  riskLevel: RiskLevel;
  isIntegration?: boolean;
}

export interface FileItem {
  id: string;
  name: string;
  size: string;
  type: string;
  extension: string;
  updatedAt: string;
  category: 'code' | 'document' | 'data' | 'image' | 'other';
  content?: string;
  isGenerated?: boolean;
}

export interface ApprovalRequest {
  id: string;
  taskId?: string;
  action: string;
  recipient: string;
  details: string;
  preview?: string;
  riskLevel: 'REQUIRES_APPROVAL';
  riskReason: string;
  status: 'pending' | 'approved' | 'rejected';
  timestamp: string;
}

export interface ActivityItem {
  id: string;
  timestamp: string;
  action: string;
  tool: string;
  result: string;
  status: 'success' | 'warning' | 'pending' | 'failed';
  approvalStatus?: 'approved' | 'rejected' | 'not_required' | 'pending';
  details?: string;
}

export interface MessageItem {
  id: string;
  sender: 'user' | 'agent' | 'system';
  text: string;
  timestamp: string;
  planSteps?: PlanStep[];
  toolExecutions?: ToolExecutionRecord[];
  requiresApproval?: boolean;
  approvalDetails?: ApprovalRequest;
  attachedFiles?: { name: string; size: string; type?: string }[];
  isThinking?: boolean;
  thinkingText?: string;
  error?: {
    failed: string;
    reason: string;
    completed: string;
    next: string;
  };
  isDeleted?: boolean;
  deletedType?: 'me' | 'everyone';
}

export interface UserProfile {
  name: string;
  role: string;
  company: string;
  email: string;
  bio: string;
  goals: string;
  preferences: string;
  techStack: string;
  customAgentInstructions: string;
  profileImage?: string;
}

export interface SettingsState {
  agentName: string;
  language: string;
  aiBehavior: 'autonomous' | 'semi-autonomous' | 'strict-approval';
  permissionSensitivity: 'High' | 'Medium' | 'Low';
  safeMode: boolean;
  theme: 'dark-pro';
  notifications: boolean;
  autoApproveLowRisk: boolean;
  autoApproveEmail: boolean;
  autoApproveCalendar: boolean;
  autoApproveFiles: boolean;
  autoApproveResearch: boolean;
  dataRetentionDays: number;
  aiStatus: 'active' | 'busy' | 'idle';
  crewAiEnabled?: boolean;
  crewAiUrl?: string;
  crewAiToken?: string;
  crewAiOrgId?: string;
}

export interface AlarmItem {
  id: string;
  time: string; // e.g. "16:00" or "04:00 PM"
  label: string;
  enabled: boolean;
  timestamp: number; // Scheduled timestamp in millisecond
}

export type GoalSentiment = 'Positive' | 'Neutral' | 'Needs Attention';

export interface UserGoalItem {
  text: string;
  sentiment: GoalSentiment;
}

export interface SessionContextMetadata {
  entities: string[];
  userGoals: (string | UserGoalItem)[];
  sentiment: 'positive' | 'neutral' | 'curious' | 'urgent' | 'frustrated' | 'motivated';
  activeTopic: string;
  lastUpdated: string;
}

