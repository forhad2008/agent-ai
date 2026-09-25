import firebaseConfig from '../../firebase-applet-config.json';

const CLIENT_ID = firebaseConfig.oAuthClientId;

const SCOPES = [
  'https://www.googleapis.com/auth/gmail.readonly',
  'https://www.googleapis.com/auth/calendar.readonly',
  'https://www.googleapis.com/auth/drive.readonly',
  'https://www.googleapis.com/auth/spreadsheets.readonly'
].join(' ');

export interface GoogleUser {
  email: string;
  name?: string;
  picture?: string;
}

/**
 * GoogleAuthService
 * Handles Client-side Implicit OAuth 2.0 flow securely using Client ID from firebase-applet-config.json
 */
export const GoogleAuthService = {
  /**
   * Retrieves the current stored Google OAuth access token.
   */
  getAccessToken(): string | null {
    return localStorage.getItem('google_oauth_token');
  },

  /**
   * Retrieves the current saved Google user profile details.
   */
  getUser(): GoogleUser | null {
    const data = localStorage.getItem('google_oauth_user');
    if (data) {
      try {
        return JSON.parse(data);
      } catch (e) {
        return null;
      }
    }
    return null;
  },

  /**
   * Clears the stored OAuth credentials from local storage.
   */
  logout(): void {
    localStorage.removeItem('google_oauth_token');
    localStorage.removeItem('google_oauth_user');
  },

  /**
   * Initiates a secure popup-based Google OAuth 2.0 login flow.
   * Prompts the user to authorize Gmail, Google Calendar, and Drive scopes.
   */
  login(): Promise<{ accessToken: string; user: GoogleUser }> {
    return new Promise((resolve, reject) => {
      const redirectUri = window.location.origin;
      const state = Math.random().toString(36).substring(2);
      
      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth` +
        `?client_id=${encodeURIComponent(CLIENT_ID)}` +
        `&redirect_uri=${encodeURIComponent(redirectUri)}` +
        `&response_type=token` +
        `&scope=${encodeURIComponent(SCOPES)}` +
        `&state=${encodeURIComponent(state)}` +
        `&prompt=select_account`;

      const width = 550;
      const height = 650;
      const left = window.screen.width / 2 - width / 2;
      const top = window.screen.height / 2 - height / 2;

      const popup = window.open(
        authUrl,
        'GoogleOAuthPopup',
        `width=${width},height=${height},left=${left},top=${top},status=no,resizable=yes`
      );

      if (!popup) {
        reject(new Error('Sign-in popup window was blocked by the browser. Please allow popups and try again.'));
        return;
      }

      const pollInterval = setInterval(async () => {
        if (popup.closed) {
          clearInterval(pollInterval);
          reject(new Error('Sign-in process was cancelled by the user.'));
          return;
        }

        try {
          const popupUrl = popup.location.href;
          if (popupUrl && popupUrl.startsWith(redirectUri)) {
            const hash = popup.location.hash;
            if (hash) {
              const params = new URLSearchParams(hash.substring(1));
              const accessToken = params.get('access_token');
              const responseState = params.get('state');

              if (accessToken) {
                clearInterval(pollInterval);
                popup.close();

                if (responseState !== state) {
                  reject(new Error('Security warning: OAuth state parameter verification failed.'));
                  return;
                }

                // Fetch real user info from google oauth2 v3 endpoint
                try {
                  const profileRes = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
                    headers: { Authorization: `Bearer ${accessToken}` }
                  });
                  const profileData = await profileRes.json();

                  const user: GoogleUser = {
                    email: profileData.email,
                    name: profileData.name,
                    picture: profileData.picture
                  };

                  localStorage.setItem('google_oauth_token', accessToken);
                  localStorage.setItem('google_oauth_user', JSON.stringify(user));

                  resolve({ accessToken, user });
                } catch (profileErr) {
                  // Fallback profile if user info fetch fails
                  const user: GoogleUser = { email: 'Authorized Workspace User' };
                  localStorage.setItem('google_oauth_token', accessToken);
                  localStorage.setItem('google_oauth_user', JSON.stringify(user));
                  resolve({ accessToken, user });
                }
              }
            }
          }
        } catch (e) {
          // Cross-origin access warnings are bypassed until popup points back to our redirect origin
        }
      }, 400);
    });
  }
};
export default GoogleAuthService;
