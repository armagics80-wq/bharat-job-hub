import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertCircle, RefreshCw } from "lucide-react";

interface Props {
  children?: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-[200px] flex flex-col items-center justify-center p-8 text-center bg-white border border-slate-200 rounded-xl shadow-sm my-4">
          <div className="w-12 h-12 bg-rose-50 rounded-full flex items-center justify-center mb-4">
            <AlertCircle className="w-6 h-6 text-rose-600" />
          </div>
          <h2 className="text-sm font-bold text-slate-800 mb-2">Something went wrong</h2>
          <p className="text-xs text-slate-500 mb-6 max-w-xs mx-auto">
            We encountered a technical error while processing your request. This is likely a temporary issue.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white text-[11px] font-bold uppercase tracking-widest rounded-lg hover:bg-indigo-700 transition shadow-sm"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Reload Page
          </button>
          {this.state.error && (
            <div className="mt-6 pt-6 border-t border-slate-100 w-full text-[10px] text-slate-400 font-mono">
              Error: {this.state.error.message}
            </div>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
