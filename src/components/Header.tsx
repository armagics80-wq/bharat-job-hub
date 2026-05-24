import { auth, signInWithGoogle, logout } from '../lib/firebase';
import { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { Briefcase, LogIn, LogOut, Bell, User as UserIcon } from 'lucide-react';

interface HeaderProps {
  notificationCount?: number;
  onNotificationClick?: () => void;
  onTempSignIn?: () => void;
}

export default function Header({ notificationCount = 0, onNotificationClick, onTempSignIn }: HeaderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    return auth.onAuthStateChanged((u) => setUser(u));
  }, []);

  const handleSignIn = async () => {
    if (isLoggingIn) return;
    setIsLoggingIn(true);
    setAuthError(null);
    try {
      await signInWithGoogle();
    } catch (error: any) {
      const ignoredErrors = ['auth/popup-closed-by-user', 'auth/cancelled-popup-request'];
      
      if (error.code === 'auth/unauthorized-domain') {
        setAuthError("Unauthorized Domain: This URL needs to be added to Firebase authorized domains.");
      } else if (error.code === 'auth/popup-closed-by-user') {
        setAuthError("Popup blocked or closed. Please allow popups for this site.");
        setTimeout(() => setAuthError(null), 8000);
      } else if (!ignoredErrors.includes(error.code)) {
        console.error("Sign in failed:", error);
        setAuthError(error.message?.split(' (')[0] || "Authentication failed.");
      }
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <header id="app-header" className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 shrink-0 sticky top-0 z-50">
      <div className="flex items-center gap-4 flex-1 lg:hidden">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-orange-500 rounded flex items-center justify-center font-black text-white text-xs shadow-sm">🇮🇳</div>
          <span className="font-extrabold tracking-tight text-sm text-indigo-950 uppercase selection:bg-indigo-300">BHARAT GOVT JOB NOTIFY</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button 
          onClick={onNotificationClick}
          className="p-2 text-slate-400 hover:text-indigo-600 transition-colors relative"
        >
          <Bell className="w-5 h-5" />
          {notificationCount > 0 && (
            <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full border-2 border-white animate-pulse"></span>
          )}
        </button>

        {user && (
          <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
            <div className="text-right">
              <div className="text-xs font-semibold text-slate-900">{user.displayName}</div>
              <div className="flex items-center justify-end gap-2">
                <div className="text-[10px] text-slate-500">{user.uid.startsWith('temp-') ? 'Guest Active' : 'Account'}</div>
                <button onClick={() => {
                  if (user.uid.startsWith('temp-')) {
                    window.location.reload();
                  } else {
                    logout();
                  }
                }} className="text-[10px] text-indigo-600 hover:text-indigo-800 transition-colors font-bold uppercase tracking-tighter">
                  Reset
                </button>
              </div>
            </div>
            {user.photoURL ? (
              <img src={user.photoURL} alt={user.displayName || ""} className="w-9 h-9 rounded-full border-2 border-indigo-500" />
            ) : (
              <div className="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center border-2 border-indigo-500">
                <UserIcon className="w-5 h-5 text-indigo-600" />
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
