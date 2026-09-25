import firebaseConfig from '../../firebase-applet-config.json';

// Get OAuth Client ID directly from the config
const CLIENT_ID = firebaseConfig.oAuthClientId;

// Scopes required for Gmail, Calendar, Drive, and Sheets
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

// Initiates a secure OAuth 2.0 Implicit Flow popup
export const loginWithGoogleOAuth = (): Promise<{ accessToken: string; user: GoogleUser }> => {
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
      reject(new Error('Popup blocked by browser. Please enable popups and retry.'));
      return;
    }

    const pollInterval = setInterval(async () => {
      if (popup.closed) {
        clearInterval(pollInterval);
        reject(new Error('Sign-in window closed by user.'));
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
                reject(new Error('OAuth state mismatch. Security verification failed.'));
                return;
              }

              // Fetch basic profile details using the newly acquired access token
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

                // Save in storage
                localStorage.setItem('google_oauth_token', accessToken);
                localStorage.setItem('google_oauth_user', JSON.stringify(user));

                resolve({ accessToken, user });
              } catch (profileErr) {
                // Return basic fallback if userinfo fails
                const user: GoogleUser = { email: 'Authorized Workspace Account' };
                localStorage.setItem('google_oauth_token', accessToken);
                localStorage.setItem('google_oauth_user', JSON.stringify(user));
                resolve({ accessToken, user });
              }
            }
          }
        }
      } catch (e) {
        // Cross-origin exceptions are expected and ignored while on google.com
      }
    }, 400);
  });
};

// Retrieve current saved access token
export const getSavedGoogleAccessToken = (): string | null => {
  return localStorage.getItem('google_oauth_token');
};

// Retrieve current saved profile
export const getSavedGoogleUser = (): GoogleUser | null => {
  const data = localStorage.getItem('google_oauth_user');
  if (data) {
    try {
      return JSON.parse(data);
    } catch (e) {
      return null;
    }
  }
  return null;
};

// Revoke access token and log out
export const logoutGoogleOAuth = () => {
  localStorage.removeItem('google_oauth_token');
  localStorage.removeItem('google_oauth_user');
};
