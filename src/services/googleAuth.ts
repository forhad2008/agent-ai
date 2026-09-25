import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, User } from 'firebase/auth';
import firebaseConfig from '../../firebase-applet-config.json';

// Initialize Firebase App
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const provider = new GoogleAuthProvider();
// Add required Google Workspace scopes requested by the user
provider.addScope('https://www.googleapis.com/auth/gmail.readonly');
provider.addScope('https://www.googleapis.com/auth/calendar.readonly');
provider.addScope('https://www.googleapis.com/auth/drive.readonly');
provider.addScope('https://www.googleapis.com/auth/spreadsheets.readonly');

let isSigningIn = false;
let cachedAccessToken: string | null = null;
let cachedUser: User | null = null;

// Initialize Auth Listener
export const initGoogleAuth = (
  onAuthSuccess?: (user: User, token: string) => void,
  onAuthFailure?: () => void
) => {
  return onAuthStateChanged(auth, async (user: User | null) => {
    if (user) {
      cachedUser = user;
      // If we already have the token cached, trigger success
      if (cachedAccessToken) {
        if (onAuthSuccess) onAuthSuccess(user, cachedAccessToken);
      } else {
        // We are logged in but don't have the token cached (e.g. page reload)
        // In this case, we'll prompt the user to sign-in again to acquire the token
        if (onAuthFailure) onAuthFailure();
      }
    } else {
      cachedUser = null;
      cachedAccessToken = null;
      if (onAuthFailure) onAuthFailure();
    }
  });
};

// Sign in with Google Popup to obtain the OAuth access token
export const signInWithGoogle = async (): Promise<{ user: User; accessToken: string } | null> => {
  if (isSigningIn) return null;
  try {
    isSigningIn = true;
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    if (!credential?.accessToken) {
      throw new Error('Failed to get access token from Google Auth Provider');
    }
    cachedAccessToken = credential.accessToken;
    cachedUser = result.user;
    
    // Save in session state as temporary cache
    try {
      sessionStorage.setItem('google_temp_token', cachedAccessToken);
    } catch (e) {}

    return { user: result.user, accessToken: cachedAccessToken };
  } catch (error: any) {
    console.error('Google Sign-in error:', error);
    throw error;
  } finally {
    isSigningIn = false;
  }
};

// Get cached token (or fallback to sessionStorage)
export const getGoogleAccessToken = async (): Promise<string | null> => {
  if (cachedAccessToken) return cachedAccessToken;
  try {
    const saved = sessionStorage.getItem('google_temp_token');
    if (saved) {
      cachedAccessToken = saved;
      return saved;
    }
  } catch (e) {}
  return null;
};

// Logout
export const signOutGoogle = async () => {
  await auth.signOut();
  cachedAccessToken = null;
  cachedUser = null;
  try {
    sessionStorage.removeItem('google_temp_token');
  } catch (e) {}
};

export const getCurrentUser = (): User | null => {
  return cachedUser || auth.currentUser;
};
