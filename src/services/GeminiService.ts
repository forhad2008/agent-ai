import { sendAgentMessage, ChatResponse } from './api';
import { executeRoutedClassification, classifyUserInput } from '../utils/toolRouter';
import { MessageItem, UserProfile } from '../types';

export const GeminiService = {
  /**
   * Evaluates if a prompt is a goal-oriented prompt requiring real-time web insights using classifyUserInput.
   */
  isGoalOrientedPrompt(prompt: string): boolean {
    const decision = classifyUserInput(prompt);
    return decision.category === 'WEB_SEARCH';
  },

  /**
   * Tool Router that detects real-time requirements, executes the webSearch utility via unified toolRouter,
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

    // Execute routing via toolRouter logic layer
    const routingResult = await executeRoutedClassification(prompt);

    if (routingResult.decision.category === 'WEB_SEARCH' && routingResult.searchResult) {
      if (onSearchStart) onSearchStart();
      
      const searchResult = routingResult.searchResult;
      
      if (searchResult.success && searchResult.summary) {
        enrichedPrompt = routingResult.enrichedPrompt;
        
        if (onSearchComplete) {
          onSearchComplete(searchResult.summary, searchResult.query, searchResult.sources || []);
        }

        executedSearchRecord = {
          id: `tool_router_${Date.now()}`,
          toolName: "Google Live Search Grounding",
          category: "WEB_TOOLS",
          status: "success",
          description: `Tool Router classified as WEB_SEARCH, executed Google search and prioritized grounding. Summary length: ${searchResult.summary.length} characters.`,
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
