import { auth, signInWithGoogle, logout } from '../lib/firebase';
import { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { Briefcase, LogIn, LogOut, Bell, User as UserIcon } from 'lucide-react';

interface HeaderProps {
  notificationCount?: number;
}

export default function Header({ notificationCount = 0 }: HeaderProps) {
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
      if (!ignoredErrors.includes(error.code)) {
        console.error("Sign in failed:", error);
        setAuthError(error.message?.split(' (')[0] || "Authentication failed.");
      } else if (error.code === 'auth/popup-closed-by-user') {
        setAuthError("Popup blocked or closed. Please allow popups for this site.");
        // Auto-dismiss after 5 seconds for user-closed popups
        setTimeout(() => setAuthError(null), 5000);
      }
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <header id="app-header" className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 shrink-0 sticky top-0 z-50">
      {authError && !user && (
        <div className="absolute top-18 right-6 bg-rose-600 text-white text-[10px] px-3 py-1.5 rounded-full shadow-lg z-50 flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
          <span>{authError}</span>
          <button onClick={() => setAuthError(null)} className="font-bold hover:text-rose-200 uppercase">Dismiss</button>
        </div>
      )}
      <div className="flex items-center gap-4 flex-1 font-bold italic">
        <div className="flex items-center gap-2 lg:hidden">
          <div className="w-8 h-8 bg-amber-400 rounded-sm flex items-center justify-center font-bold text-indigo-950">B</div>
          <span className="font-bold tracking-tight text-xl text-indigo-900">Bharat Govt</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 text-slate-400 hover:text-indigo-600 transition-colors relative">
          <Bell className="w-5 h-5" />
          {notificationCount > 0 && (
            <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full border-2 border-white animate-pulse"></span>
          )}
        </button>

        {user ? (
          <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
            <div className="text-right">
              <div className="text-xs font-semibold text-slate-900">{user.displayName}</div>
              <div className="flex items-center justify-end gap-2">
                <div className="text-[10px] text-slate-500">Verified Profile</div>
                <button onClick={logout} className="text-[10px] text-indigo-600 hover:text-indigo-800 transition-colors font-bold uppercase tracking-tighter">
                  Logout
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
        ) : (
          <button 
            disabled={isLoggingIn}
            onClick={handleSignIn}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-all text-xs font-bold uppercase tracking-wider shadow-sm disabled:opacity-50"
          >
            {isLoggingIn ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              <LogIn className="w-4 h-4" />
            )}
            {isLoggingIn ? 'Signing In...' : 'Sign In'}
          </button>
        )}
      </div>
    </header>
  );
}
