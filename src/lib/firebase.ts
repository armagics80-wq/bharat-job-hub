import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, browserPopupRedirectResolver } from 'firebase/auth';
import { getFirestore, doc, getDocFromServer } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, (firebaseConfig as any).firestoreDatabaseId);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider, browserPopupRedirectResolver);
    return result.user;
  } catch (error) {
    console.error("Error signing in with Google", error);
    throw error;
  }
};

export const logout = () => signOut(auth);

// Test connection
async function testConnection() {
  try {
    // Attempting to read a non-existent doc to check connectivity. 
    // This will likely fail with 'permission-denied' if offline is not the issue.
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error: any) {
    if (error.message?.includes('the client is offline')) {
      console.error("Firebase connection test failed: The client appears to be offline. Please check your configuration.");
    } else if (error.code === 'permission-denied') {
      // Permission denied is actually a good sign - it means we reached the server!
      console.log("Firebase connection test: Server reached (as expected, access denied).");
    } else {
      console.warn("Firebase connection test warning:", error.message);
    }
  }
}
testConnection();
