import { useState, useEffect } from 'react';
import { RefreshCw, CheckCircle2, Zap, AlertCircle } from 'lucide-react';
import { formatDistanceToNow, isToday } from 'date-fns';
import { jobService } from '../services/jobService';
import { motion, AnimatePresence } from 'motion/react';
import { Job } from '../types';

interface Activity {
    id: string;
    type: 'added' | 'updated' | 'expired' | 'removed' | 'verified';
    title: string;
    timestamp: string;
}

interface MinimalActivityFeedProps {
    jobs: Job[];
}

export default function MinimalActivityFeed({ jobs }: MinimalActivityFeedProps) {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    const unsub = jobService.subscribeToActivity((data) => {
        setActivities(data);
    });
    return () => unsub();
  }, []);

  const newTodayCount = jobs.filter(job => {
    if (!job.lastUpdatedAt) return false;
    return isToday(new Date(job.lastUpdatedAt));
  }).length;

  const expiredRecently = jobs.filter(job => job.status === 'Expired').length;

  return (
    <div className="bg-white border border-slate-200 rounded-lg shadow-sm mb-6 overflow-hidden">
      <div className="px-4 py-2 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <RefreshCw className="w-3.5 h-3.5 text-indigo-500 animate-spin-slow" />
          <h3 className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">Live System Updates</h3>
        </div>
        <div className="text-[9px] font-medium text-slate-400">
           System Online • {activities.length > 0 ? formatDistanceToNow(new Date(activities[0].timestamp), { addSuffix: true }) : 'Syncing...'}
        </div>
      </div>
      
      <div className="p-3">
        {/* Quick Stats Summary */}
        <div className="flex flex-wrap gap-4 mb-3 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-1.5 transition-all">
            <Zap className="w-3 h-3 text-amber-500 fill-amber-500" />
            <span className="text-[10px] font-bold text-slate-700">{newTodayCount} New Today</span>
          </div>
          <div className="flex items-center gap-1.5 transition-all">
            <AlertCircle className="w-3 h-3 text-rose-500" />
            <span className="text-[10px] font-bold text-slate-700">{expiredRecently} Recently Expired</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3 h-3 text-emerald-500" />
            <span className="text-[10px] font-bold text-slate-700">All Sources Monitored</span>
          </div>
        </div>

        {/* Minimal Scrollable Feed */}
        <div className="space-y-2 max-h-[120px] overflow-y-auto pr-1 custom-scrollbar">
          <AnimatePresence mode="popLayout">
            {activities.map((event) => (
                <motion.div 
                key={event.id}
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex items-start justify-between gap-3 group"
                >
                <div className="flex gap-2 min-w-0">
                    <div className="mt-1">
                    {event.type === 'added' && <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />}
                    {event.type === 'updated' && <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full" />}
                    {event.type === 'expired' && <div className="w-1.5 h-1.5 bg-rose-500 rounded-full" />}
                    {event.type === 'verified' && <div className="w-1.5 h-1.5 bg-sky-500 rounded-full" />}
                    {event.type === 'removed' && <div className="w-1.5 h-1.5 bg-slate-400 rounded-full" />}
                    </div>
                    <p className="text-[10px] text-slate-600 leading-tight">
                    <span className="font-bold text-slate-900 capitalize">{event.type}: </span>
                    {event.title}
                    </p>
                </div>
                <span className="text-[9px] text-slate-400 whitespace-nowrap font-medium">
                    {formatDistanceToNow(new Date(event.timestamp))} ago
                </span>
                </motion.div>
            ))}
          </AnimatePresence>
          
          {activities.length === 0 && (
            <div className="text-center py-4 text-[10px] text-slate-400 italic">
              Initializing live feed...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
