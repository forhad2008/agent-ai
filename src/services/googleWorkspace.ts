/**
 * Google Workspace Integration Service
 * Provides client-side utilities to interact with Gmail, Google Calendar, and Google Drive APIs
 * using the authorized OAuth 2.0 access token.
 */

import { GoogleAuthService } from './GoogleAuthService';

export interface GmailMessage {
  id: string;
  threadId: string;
  snippet?: string;
  subject?: string;
  from?: string;
  date?: string;
}

export interface CalendarEvent {
  id: string;
  summary: string;
  description?: string;
  start: string;
  end: string;
  location?: string;
}

export interface DriveFileMetadata {
  id: string;
  name: string;
  mimeType: string;
  webViewLink?: string;
  modifiedTime?: string;
}

/**
 * Fetches the user's recent Gmail messages (up to 5) with basic headers.
 */
export async function fetchRecentEmails(accessToken: string, maxResults = 5): Promise<GmailMessage[]> {
  const headers = { Authorization: `Bearer ${accessToken}` };
  
  try {
    // 1. Get the list of message summaries
    const listRes = await fetch(
      `https://gmail.googleapis.com/gmail/v1/users/me/messages?maxResults=${maxResults}`, 
      { headers }
    );
    
    if (!listRes.ok) {
      throw new Error(`Gmail API error: ${listRes.statusText}`);
    }
    
    const listData = await listRes.json();
    if (!listData.messages || listData.messages.length === 0) {
      return [];
    }

    // 2. Fetch details for each message in parallel
    const emailPromises = listData.messages.map(async (msg: { id: string; threadId: string }) => {
      try {
        const detailRes = await fetch(
          `https://gmail.googleapis.com/gmail/v1/users/me/messages/${msg.id}`,
          { headers }
        );
        if (!detailRes.ok) return null;
        
        const detailData = await detailRes.json();
        const headersList = detailData.payload?.headers || [];
        
        const subject = headersList.find((h: any) => h.name.toLowerCase() === 'subject')?.value || '(No Subject)';
        const from = headersList.find((h: any) => h.name.toLowerCase() === 'from')?.value || 'Unknown Sender';
        const date = headersList.find((h: any) => h.name.toLowerCase() === 'date')?.value || '';
        
        return {
          id: msg.id,
          threadId: msg.threadId,
          snippet: detailData.snippet || '',
          subject,
          from,
          date
        };
      } catch (err) {
        console.error(`Error fetching email detail for ${msg.id}:`, err);
        return null;
      }
    });

    const results = await Promise.all(emailPromises);
    return results.filter((email): email is GmailMessage => email !== null);
  } catch (error) {
    console.error('Failed to fetch Gmail emails:', error);
    throw error;
  }
}

/**
 * Fetches the user's upcoming Google Calendar events from the primary calendar.
 */
export async function fetchUpcomingEvents(accessToken: string, maxResults = 10): Promise<CalendarEvent[]> {
  const headers = { Authorization: `Bearer ${accessToken}` };
  const now = new Date().toISOString();
  
  try {
    const url = `https://www.googleapis.com/calendar/v3/calendars/primary/events` +
      `?timeMin=${encodeURIComponent(now)}` +
      `&singleEvents=true` +
      `&orderBy=startTime` +
      `&maxResults=${maxResults}`;
      
    const res = await fetch(url, { headers });
    
    if (!res.ok) {
      throw new Error(`Calendar API error: ${res.statusText}`);
    }
    
    const data = await res.json();
    if (!data.items) {
      return [];
    }
    
    return data.items.map((item: any) => ({
      id: item.id,
      summary: item.summary || '(No Title)',
      description: item.description || '',
      start: item.start?.dateTime || item.start?.date || '',
      end: item.end?.dateTime || item.end?.date || '',
      location: item.location || ''
    }));
  } catch (error) {
    console.error('Failed to fetch Calendar events:', error);
    throw error;
  }
}

/**
 * Fetches files and folders metadata from user's Google Drive.
 */
export async function fetchDriveFilesMetadata(accessToken: string, q = '', maxResults = 15): Promise<DriveFileMetadata[]> {
  const headers = { Authorization: `Bearer ${accessToken}` };
  
  try {
    let url = `https://www.googleapis.com/drive/v3/files` +
      `?pageSize=${maxResults}` +
      `&fields=files(id,name,mimeType,webViewLink,modifiedTime)`;
      
    if (q) {
      url += `&q=${encodeURIComponent(q)}`;
    }
    
    const res = await fetch(url, { headers });
    
    if (!res.ok) {
      throw new Error(`Drive API error: ${res.statusText}`);
    }
    
    const data = await res.json();
    return data.files || [];
  } catch (error) {
    console.error('Failed to fetch Drive file metadata:', error);
    throw error;
  }
}

/**
 * Fetches and parses the user's latest Gmail messages automatically retrieving
 * the authorized token from the GoogleAuthService securely.
 */
export async function fetchUserGmailWithAuthService(maxResults = 5): Promise<GmailMessage[]> {
  const token = GoogleAuthService.getAccessToken();
  if (!token) {
    throw new Error('No active Google OAuth access token found. Please sign in via Settings.');
  }
  return fetchRecentEmails(token, maxResults);
}

/**
 * Fetches the user's upcoming Google Calendar events automatically retrieving
 * the authorized token from the GoogleAuthService securely.
 */
export async function fetchUserCalendarWithAuthService(maxResults = 10): Promise<CalendarEvent[]> {
  const token = GoogleAuthService.getAccessToken();
  if (!token) {
    throw new Error('No active Google OAuth access token found. Please sign in via Settings.');
  }
  return fetchUpcomingEvents(token, maxResults);
}

/**
 * Fetches the user's Google Drive files metadata automatically retrieving
 * the authorized token from the GoogleAuthService securely.
 */
export async function fetchUserDriveWithAuthService(q = '', maxResults = 15): Promise<DriveFileMetadata[]> {
  const token = GoogleAuthService.getAccessToken();
  if (!token) {
    throw new Error('No active Google OAuth access token found. Please sign in via Settings.');
  }
  return fetchDriveFilesMetadata(token, q, maxResults);
}

