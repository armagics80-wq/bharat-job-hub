import { motion } from 'motion/react';
import { X, ExternalLink, RefreshCw, FileText, Download, ShieldAlert, MonitorCheck } from 'lucide-react';
import { useState } from 'react';

interface PdfPreviewModalProps {
  pdfUrl: string;
  jobTitle: string;
  onClose: () => void;
}

export default function PdfPreviewModal({ pdfUrl, jobTitle, onClose }: PdfPreviewModalProps) {
  const [viewerMode, setViewerMode] = useState<'direct' | 'google-proxy'>('direct');
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Generate Google Docs external PDF preview proxy URL
  const googleProxyUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(pdfUrl || '')}&embedded=true`;
  const activeUrl = viewerMode === 'direct' ? pdfUrl : googleProxyUrl;

  const handleRefresh = () => {
    setIsLoading(true);
    setHasError(false);
    // Temporary reset iframe to force reload
    const currentMode = viewerMode;
    setViewerMode(currentMode);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      id="pdf-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/85 backdrop-blur-sm cursor-default"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, y: 15 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 15 }}
        transition={{ type: 'spring', damping: 25, stiffness: 350 }}
        className="relative flex flex-col w-full h-[90vh] max-w-5xl bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden pointer-events-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div id="pdf-modal-header" className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-6 py-4 bg-slate-900 text-white select-none">
          <div className="flex items-center gap-3 min-w-0">
            <div className="p-2 bg-rose-500 rounded-lg shrink-0">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <div className="min-w-0">
              <h3 className="text-sm font-black leading-tight truncate text-slate-100">
                Official Notification Preview
              </h3>
              <p className="text-[11px] text-slate-400 font-medium truncate mt-0.5">
                {jobTitle}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Viewer Mode Selector */}
            <div className="flex items-center gap-0.5 bg-slate-800 p-1 rounded-lg border border-slate-700">
              <button
                id="btn-viewer-direct"
                onClick={() => { setViewerMode('direct'); setIsLoading(true); }}
                className={`px-2.5 py-1 text-[10px] font-bold rounded uppercase tracking-wider transition-all ${
                  viewerMode === 'direct'
                    ? 'bg-rose-600 text-white shadow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Direct Embed
              </button>
              <button
                id="btn-viewer-proxy"
                onClick={() => { setViewerMode('google-proxy'); setIsLoading(true); }}
                className={`px-2.5 py-1 text-[10px] font-bold rounded uppercase tracking-wider transition-all ${
                  viewerMode === 'google-proxy'
                    ? 'bg-rose-600 text-white shadow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Google Viewer Proxy (Recommended)
              </button>
            </div>

            {/* Utility buttons */}
            <div className="flex items-center gap-1.5 border-l border-slate-800 pl-2 ml-1">
              <button
                id="btn-pdf-refresh"
                onClick={handleRefresh}
                title="Reload Preview"
                className="p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg transition-all"
              >
                <RefreshCw className="w-4 h-4" />
              </button>

              <a
                id="btn-pdf-download"
                href={pdfUrl}
                download
                title="Download PDF"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg transition-all"
              >
                <Download className="w-4 h-4" />
              </a>

              <a
                id="btn-pdf-external"
                href={pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                title="Open in New Tab"
                className="p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg transition-all"
              >
                <ExternalLink className="w-4 h-4" />
              </a>

              <button
                id="btn-pdf-close"
                onClick={onClose}
                title="Close Preview"
                className="p-2 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition-all ml-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Informative Guidance Bar */}
        <div id="pdf-modal-notice" className="bg-amber-50 border-b border-amber-200 px-6 py-2 flex items-center justify-between text-[11px] text-amber-900 select-none">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0" />
            <span>
              <strong>Notice:</strong> Some official state portals secure documents behind cross-origin policies. If the view is blank, switch to the <strong>Google Viewer Proxy</strong> option.
            </span>
          </div>
          <div className="hidden md:flex items-center gap-1 text-[10px] text-amber-700 bg-amber-100/65 border border-amber-200/50 px-2 py-0.5 rounded font-medium">
            <MonitorCheck className="w-3.5 h-3.5 text-amber-600" /> Frame Connection Active
          </div>
        </div>

        {/* Frame Container */}
        <div className="relative flex-1 bg-slate-100 overflow-hidden">
          {isLoading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-50 z-10 select-none">
              <div className="w-10 h-10 border-4 border-rose-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-4 text-xs font-black text-slate-700 uppercase tracking-widest">
                Establishing Secured Stream...
              </p>
              <p className="mt-1 text-[11px] text-slate-400 max-w-sm text-center">
                Fetching document directly from official {viewerMode === 'direct' ? 'governmental nodes' : 'Google proxy endpoint'}.
              </p>
            </div>
          )}

          {hasError ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-50 z-10 px-4 select-none">
              <ShieldAlert className="w-12 h-12 text-rose-500" />
              <p className="mt-4 text-sm font-black text-slate-800 uppercase tracking-widest text-center">
                Secure Embed Blocked
              </p>
              <p className="mt-1.5 text-xs text-slate-500 max-w-md text-center leading-relaxed">
                The official portal hosting this PDF strictly prevents inline browsing via security policies. Click below to view the official gazette in a secure system tab.
              </p>
              <div className="mt-6 flex items-center gap-3">
                <button
                  onClick={() => setViewerMode(viewerMode === 'direct' ? 'google-proxy' : 'direct')}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-[11px] font-bold uppercase rounded-lg shadow-md transition-all"
                >
                  Switch Connection Protocol
                </button>
                <a
                  href={pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-[11px] font-bold uppercase rounded-lg shadow-md transition-all flex items-center gap-1.5"
                >
                  Open Direct Link <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ) : null}

          {/* PDF Embed Frame */}
          <iframe
            id="pdf-notification-frame"
            src={activeUrl}
            title={`Official Notification for ${jobTitle}`}
            className="w-full h-full border-none"
            onLoad={() => setIsLoading(false)}
            onError={() => {
              setIsLoading(false);
              setHasError(true);
            }}
          />
        </div>

        {/* Modal Footer Controls */}
        <div id="pdf-modal-footer" className="px-6 py-3.5 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[11px] text-slate-500 select-none">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="font-medium">SSL Encrypted governmental document link</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-semibold text-slate-600">Endpoint: {new URL(pdfUrl).hostname}</span>
            <button
              onClick={onClose}
              className="px-4 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-extrabold uppercase tracking-widest rounded-lg transition-all text-[10px]"
            >
              Exit Preview
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
