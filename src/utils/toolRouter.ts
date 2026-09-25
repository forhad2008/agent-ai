import { performWebSearch, WebSearchResult } from './webSearch';

export type ToolRouteCategory = 'WEB_SEARCH' | 'FILE_SYSTEM' | 'INTERNAL_TASK' | 'GENERAL_CONVERSATION';

export interface ToolRouteDecision {
  category: ToolRouteCategory;
  recommendedQuery: string;
  reason: string;
  requiresExternalData: boolean;
}

/**
 * Classifies user input to determine the most appropriate execution route.
 */
export function classifyUserInput(prompt: string): ToolRouteDecision {
  const p = prompt.toLowerCase();

  // 1. File System operations
  if (
    p.includes('file') || 
    p.includes('document') || 
    p.includes('read') || 
    p.includes('write') || 
    p.includes('save') || 
    p.includes('delete') ||
    p.includes('ফাইল') ||
    p.includes('দলিল')
  ) {
    return {
      category: 'FILE_SYSTEM',
      recommendedQuery: prompt,
      reason: 'User prompt contains references to file systems, document editing, or saving/loading data.',
      requiresExternalData: false,
    };
  }

  // 2. Goal-oriented prompts requiring real-time web search (e.g., planning, earning, trends, research, latest facts)
  const isGoalOrPlan = 
    p.includes('plan') ||
    p.includes('earn') ||
    p.includes('income') ||
    p.includes('dollar') ||
    p.includes('money') ||
    p.includes('research') ||
    p.includes('trend') ||
    p.includes('market') ||
    p.includes('latest') ||
    p.includes('price') ||
    p.includes('competitor') ||
    p.includes('goal') ||
    p.includes('objective') ||
    p.includes('strategy') ||
    p.includes('how to') ||
    p.includes('আয়') ||
    p.includes('উপার্জন') ||
    p.includes('পরিকল্পনা') ||
    p.includes('সার্চ') ||
    /\b(search|find|news|weather|sports|google)\b/i.test(p);

  if (isGoalOrPlan) {
    return {
      category: 'WEB_SEARCH',
      recommendedQuery: prompt,
      reason: 'Goal-oriented prompt detected. Requires real-time web retrieval to compile customized strategies and factual insights.',
      requiresExternalData: true,
    };
  }

  // 3. Internal Tasks / Code Operations
  if (
    p.includes('code') || 
    p.includes('bug') || 
    p.includes('debug') || 
    p.includes('react') || 
    p.includes('typescript') || 
    p.includes('function') ||
    p.includes('alarm') ||
    p.includes('timer') ||
    p.includes('অ্যালার্ম') ||
    p.includes('কোড')
  ) {
    return {
      category: 'INTERNAL_TASK',
      recommendedQuery: prompt,
      reason: 'Instruction maps to internal developer utilities, coding, system alerts, or algorithmic operations.',
      requiresExternalData: false,
    };
  }

  // 4. Default to General Conversation
  return {
    category: 'GENERAL_CONVERSATION',
    recommendedQuery: prompt,
    reason: 'Standard conversational query without complex external tool dependencies.',
    requiresExternalData: false,
  };
}

/**
 * Executes the routing logic. If WEB_SEARCH is recommended, performs webSearch and returns enriched query details.
 * This guarantees that we ALWAYS search the web and compile dynamic, real-time data instead of relying on copy-pasted or static templates.
 */
export async function executeRoutedClassification(prompt: string): Promise<{
  decision: ToolRouteDecision;
  searchResult?: WebSearchResult;
  enrichedPrompt: string;
}> {
  const decision = classifyUserInput(prompt);
  let enrichedPrompt = prompt;
  let searchResult: WebSearchResult | undefined;

  if (decision.category === 'WEB_SEARCH') {
    console.log(`[ToolRouter] Routing execution path to WEB_SEARCH based on user goal: "${prompt}"`);
    searchResult = await performWebSearch(prompt);
    
    if (searchResult && searchResult.success && searchResult.summary) {
      // Prioritize live-search facts, analyze it, and append it with distinct ToolRouter boundary directives
      enrichedPrompt = `${prompt}\n\n[EXTERNAL GROUNDED DATA RETRIEVED BY TOOL ROUTER - CRITICAL REFERENCE]\n${searchResult.summary}\n\n[INSTRUCTION]: Act as an advanced analyst. Use the live web search context above to dynamically answer and construct a customized, step-by-step, actionable goal roadmap. NEVER use any pre-defined or static $100 plan.`;
    }
  }

  return {
    decision,
    searchResult,
    enrichedPrompt,
  };
}
