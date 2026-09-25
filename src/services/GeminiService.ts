import { sendAgentMessage, ChatResponse } from './api';
import { performWebSearch } from '../utils/webSearch';
import { MessageItem, UserProfile } from '../types';

export const GeminiService = {
  /**
   * Evaluates if a prompt is a goal-oriented prompt requiring real-time web insights.
   */
  isGoalOrientedPrompt(prompt: string): boolean {
    const p = prompt.toLowerCase();
    return (
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
      p.includes('business') ||
      p.includes('strategy') ||
      p.includes('আয়') ||
      p.includes('উপার্জন') ||
      p.includes('পরিকল্পনা') ||
      p.includes('সার্চ')
    );
  },

  /**
   * Tool Router that detects real-time requirements, executes the webSearch utility,
   * and routes the enriched prompt with search summary context to the agent.
   */
  async processAgentMessageWithRouting(
    prompt: string,
    conversationHistory: MessageItem[],
    language: string,
    attachedFiles: any[] = [],
    userProfile?: UserProfile,
    settings?: any,
    onSearchStart?: () => void,
    onSearchComplete?: (summary: string, query: string, sources: any[]) => void
  ): Promise<ChatResponse> {
    
    let enrichedPrompt = prompt;
    let executedSearchRecord: any = null;

    if (this.isGoalOrientedPrompt(prompt)) {
      if (onSearchStart) onSearchStart();
      
      console.log(`Tool Router: Goal-oriented prompt detected. Prioritizing & routing to webSearch utility for: "${prompt}"`);
      const searchResult = await performWebSearch(prompt);
      
      if (searchResult.success && searchResult.summary) {
        // Enrich prompt with direct real-time Google search context
        enrichedPrompt = `${prompt}\n\n[EXTERNAL LIVE WEB SEARCH DATA - PRIORITIZED BY TOOL ROUTER]\nHere is the latest live Google Search data retrieved for this request:\n${searchResult.summary}`;
        
        if (onSearchComplete) {
          onSearchComplete(searchResult.summary, searchResult.query, searchResult.sources || []);
        }

        executedSearchRecord = {
          id: `tool_router_${Date.now()}`,
          toolName: "Google Live Search Grounding",
          category: "WEB_TOOLS",
          status: "success",
          description: `Tool Router successfully routed and prioritized webSearch utility. Summary length: ${searchResult.summary.length} characters.`,
          timestamp: new Date().toLocaleTimeString()
        };
      }
    }

    // Call the core agent endpoint with the enriched prompt
    const agentResponse = await sendAgentMessage(
      enrichedPrompt,
      conversationHistory,
      language,
      attachedFiles,
      userProfile,
      settings
    );

    // If we executed a prioritized webSearch, inject the tool execution record into the agent response
    if (executedSearchRecord) {
      if (!agentResponse.toolExecutions) {
        agentResponse.toolExecutions = [];
      }
      if (!agentResponse.toolExecutions.some(t => t.toolName === "Google Live Search Grounding")) {
        agentResponse.toolExecutions.unshift(executedSearchRecord);
      }
    }

    return agentResponse;
  }
};
