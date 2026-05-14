import { ShieldAlert, Info } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-auto py-8 px-6 bg-slate-900 text-slate-400 border-t border-slate-800">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <ShieldAlert className="w-5 h-5 text-amber-500" />
              IMPORTANT DISCLAIMER
            </div>
            <p className="text-[11px] leading-relaxed">
              This website is not affiliated with the Government of India or any state government. 
              Information is collected from official public recruitment notifications and official sources.
            </p>
          </div>
          <div className="space-y-3">
             <div className="flex items-center gap-2 text-white font-bold text-sm">
              <Info className="w-5 h-5 text-indigo-400" />
              VERIFICATION NOTICE
            </div>
            <p className="text-[11px] leading-relaxed">
              Always verify details from the official notification and official website before applying. 
              While we strive for 100% accuracy, candidates are advised to consult the original gazette 
              or department portal for final figures and dates.
            </p>
          </div>
        </div>
        
        <div className="pt-6 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-widest font-bold">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            Live Monitoring Active
          </div>
          <div>
            &copy; 2026 BharatHub • Aggregated Govt Notifications Portal
          </div>
        </div>
      </div>
    </footer>
  );
}
