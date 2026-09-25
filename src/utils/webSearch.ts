import { executeToolApi } from '../services/api';

export interface WebSearchResult {
  success: boolean;
  query: string;
  summary: string;
  sources?: { title: string; domain: string }[];
  completedAt?: string;
  error?: string;
}

/**
 * Performs a high-fidelity web search by utilizing the back-end's Google Search Grounding engine.
 * This extracts live web data, current events, and trends to assist in goal planning and complex queries.
 * 
 * @param query The search query string
 * @returns Promise resolving to the structured search result
 */
export async function performWebSearch(query: string): Promise<WebSearchResult> {
  if (!query || !query.trim()) {
    return {
      success: false,
      query: '',
      summary: 'Empty search query provided.',
    };
  }

  try {
    const apiResult = await executeToolApi('web_search', { query: query.trim() });
    
    if (apiResult && apiResult.result) {
      return {
        success: true,
        query: apiResult.result.query || query,
        summary: apiResult.result.summary || apiResult.result.message || '',
        sources: apiResult.result.sources || [],
        completedAt: apiResult.result.completedAt || new Date().toISOString(),
      };
    }
    
    throw new Error('Invalid response payload from search engine API.');
  } catch (error: any) {
    console.error('Web Search Utility Error:', error);
    return {
      success: false,
      query,
      summary: `Failed to retrieve web data: ${error.message || error}`,
      error: error.message || String(error),
    };
  }
}
