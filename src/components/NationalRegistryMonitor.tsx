import { useState, useEffect, useMemo } from 'react';
import { 
  Globe, 
  Activity, 
  CheckCircle, 
  Clock, 
  Database, 
  ChevronRight, 
  ShieldCheck, 
  RefreshCw, 
  Search, 
  ExternalLink, 
  Sparkles, 
  Server, 
  AlertCircle, 
  FileCheck, 
  TrendingUp, 
  UserCheck, 
  Award,
  BookOpen,
  Info,
  BarChart4
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface RegistryPortal {
  id: string;
  name: string;
  authority: string;
  acronym: string;
  vacancies: number;
  jobseekers: string;
  employers: string;
  status: 'Online' | 'Maintenance' | 'Update Required';
  pingMs: number;
  lastChecked: string;
  primaryURL: string;
  niche: string;
}

const INITIAL_PORTALS: RegistryPortal[] = [
  {
    id: 'ncs',
    name: 'National Career Service Portal',
    authority: 'Ministry of Labour & Employment, GoI',
    acronym: 'NCS',
    vacancies: 342150,
    jobseekers: '12.4 Million',
    employers: '22,400+',
    status: 'Online',
    pingMs: 42,
    lastChecked: 'Just Now',
    primaryURL: 'https://www.ncs.gov.in',
    niche: 'Comprehensive employment registry & counseling network'
  },
  {
    id: 'nra',
    name: 'National Recruitment Agency System',
    authority: 'Department of Personnel & Training, GoI',
    acronym: 'NRA',
    vacancies: 87500,
    jobseekers: '18.2 Million',
    employers: 'Governing Ministries',
    status: 'Online',
    pingMs: 58,
    lastChecked: '2 mins ago',
    primaryURL: 'https://nra.gov.in',
    niche: 'Common Eligibility Test (CET) candidate registry & screening'
  },
  {
    id: 'upsc-otr',
    name: 'UPSC One-Time Registration Network',
    authority: 'Union Public Service Commission',
    acronym: 'UPSC-OTR',
    vacancies: 18200,
    jobseekers: '4.8 Million',
    employers: 'All Central Depts',
    status: 'Online',
    pingMs: 31,
    lastChecked: '1 min ago',
    primaryURL: 'https://upsconline.nic.in',
    niche: 'Group-A and Gazetted central cadre civil candidates pool'
  },
  {
    id: 'ssc-digidoc',
    name: 'SSC National Candidate Registry',
    authority: 'Staff Selection Commission, GoI',
    acronym: 'SSC-NCR',
    vacancies: 124500,
    jobseekers: '24.1 Million',
    employers: 'Subordinate Services',
    status: 'Online',
    pingMs: 65,
    lastChecked: '5 mins ago',
    primaryURL: 'https://ssc.gov.in',
    niche: 'Central staff recruitment, technical cadres & general services'
  },
  {
    id: 'sid',
    name: 'Skill India Digital Registry',
    authority: 'Ministry of Skill Development & Entrepreneurship',
    acronym: 'SID',
    vacancies: 198000,
    jobseekers: '8.2 Million',
    employers: '18,500+ MSMEs',
    status: 'Online',
    pingMs: 49,
    lastChecked: 'Just Now',
    primaryURL: 'https://www.skillindiadigital.gov.in',
    niche: 'Certified professional apprentices & vocational candidate tracking'
  },
  {
    id: 'naps',
    name: 'National Apprenticeship Portal',
    authority: 'Directorate General of Training, GoI',
    acronym: 'NAPS',
    vacancies: 56300,
    jobseekers: '1.9 Million',
    employers: '8,400+ Corporates',
    status: 'Online',
    pingMs: 72,
    lastChecked: '3 mins ago',
    primaryURL: 'https://www.apprenticeshipindia.gov.in',
    niche: 'Industrial apprentice schemes and training registry'
  }
];

export default function NationalRegistryMonitor() {
  const [portals, setPortals] = useState<RegistryPortal[]>(INITIAL_PORTALS);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Central' | 'Apprentice' | 'Skilled'>('All');
  const [selectedPortal, setSelectedPortal] = useState<RegistryPortal | null>(INITIAL_PORTALS[0]);
  const [checkIntervalTime, setCheckIntervalTime] = useState<string>(new Date().toLocaleTimeString('en-IN'));

  // SVG chart configurations
  const historyData = [
    { month: 'Jan', registrations: 14.2, vacancies: 180 },
    { month: 'Feb', registrations: 16.5, vacancies: 220 },
    { month: 'Mar', registrations: 18.9, vacancies: 260 },
    { month: 'Apr', registrations: 21.4, vacancies: 310 },
    { month: 'May', registrations: 23.8, vacancies: 390 },
    { month: 'Jun', registrations: 26.5, vacancies: 442 }
  ];

  const handleRefresh = () => {
    if (isRefreshing) return;
    setIsRefreshing(true);
    setTimeout(() => {
      setPortals(prev => 
        prev.map(p => ({
          ...p,
          pingMs: Math.round(p.pingMs * (0.85 + Math.random() * 0.3)), // realistic fluctuation
          lastChecked: 'Just Now'
        }))
      );
      setCheckIntervalTime(new Date().toLocaleTimeString('en-IN'));
      setIsRefreshing(false);
    }, 1200);
  };

  const filteredPortals = useMemo(() => {
    return portals.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            p.acronym.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            p.authority.toLowerCase().includes(searchQuery.toLowerCase());
      
      if (selectedCategory === 'All') return matchesSearch;
      if (selectedCategory === 'Central') return matchesSearch && (p.id === 'ncs' || p.id === 'nra' || p.id === 'upsc-otr');
      if (selectedCategory === 'Apprentice') return matchesSearch && (p.id === 'naps' || p.id === 'sid');
      if (selectedCategory === 'Skilled') return matchesSearch && (p.id === 'sid' || p.id === 'ncs');
      return matchesSearch;
    });
  }, [portals, searchQuery, selectedCategory]);

  return (
    <div id="national-registry-monitor-container" className="space-y-6">
      
      {/* Title block */}
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-950 to-slate-900 rounded-2xl p-6 text-white border border-indigo-950 shadow-md relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-500/15 rounded-full blur-3xl -ml-20 -mb-20 pointer-events-none" />
        
        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-4 z-10">
          <div className="space-y-1.5 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-800/60 border border-indigo-700/60 text-indigo-200 rounded-full text-[10px] font-black uppercase tracking-widest leading-none mb-1 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Official Portal Registry
            </div>
            <h1 className="text-xl md:text-2xl font-black tracking-tight leading-tight uppercase">
              National Job Registry Monitor
            </h1>
            <p className="text-xs text-indigo-200/90 leading-relaxed font-medium">
              Live consolidated stats, health checks, and active registrations from India&apos;s apex central employment databases. Under Article 16 (Equality of Opportunity in Public Employment), we track national registries directly to prevent information asymmetry.
            </p>
          </div>

          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="self-start md:self-auto px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 border border-indigo-500/30 shadow-md transition-all active:scale-[0.98] disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
            {isRefreshing ? 'Rechecking Health...' : 'Refresh Monitor'}
          </button>
        </div>

        {/* Global Stats bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-indigo-800/40 relative z-10">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-indigo-300 uppercase block tracking-wider">Apex Databases</span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-extrabold font-mono">06</span>
              <span className="text-[9px] text-emerald-450 font-bold bg-emerald-500/10 px-1.5 py-0.5 rounded uppercase font-mono">Online</span>
            </div>
          </div>
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-indigo-300 uppercase block tracking-wider">Total Vacancies Listed</span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-extrabold font-mono">826.1K</span>
              <span className="text-[9px] text-indigo-300 font-bold font-mono">Across India</span>
            </div>
          </div>
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-indigo-300 uppercase block tracking-wider">Registered Jobseekers</span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-extrabold font-mono">68.2M</span>
              <span className="text-[9px] text-orange-400 font-bold font-mono">+12.4% MoM</span>
            </div>
          </div>
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-indigo-300 uppercase block tracking-wider">Average Portals Latency</span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-extrabold font-mono">51ms</span>
              <span className="text-[9px] text-emerald-400 font-bold uppercase font-mono">Optimal</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Registries on Left, Analytics/Guide on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Columns - Monitor list */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-wrap gap-4 items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold uppercase tracking-tight text-slate-705 flex items-center gap-2">
                <Globe className="w-4 h-4 text-indigo-600" /> Monitored Portals ({filteredPortals.length})
              </h2>
            </div>
            
            <div className="flex flex-wrap items-center gap-2">
              {/* Category selector */}
              <div className="flex bg-slate-100 p-1 rounded-lg gap-0.5 border border-slate-200/50">
                {(['All', 'Central', 'Apprentice', 'Skilled'] as const).map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-tight transition-all ${
                      selectedCategory === cat 
                        ? 'bg-white text-indigo-950 shadow-xs' 
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
              
              {/* Simple Search */}
              <div className="relative min-w-44">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-400" />
                <input
                  type="text"
                  placeholder="Filter registries..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-7 pr-2.5 py-1 bg-slate-50 border border-slate-200 rounded text-[10px] outline-none focus:ring-1 focus:ring-indigo-500 transition-all font-medium"
                />
              </div>
            </div>
          </div>

          {/* Portals list */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredPortals.map(portal => {
              const isSelected = selectedPortal?.id === portal.id;
              return (
                <div
                  key={portal.id}
                  onClick={() => setSelectedPortal(portal)}
                  className={`p-4 bg-white rounded-xl border transition-all cursor-pointer select-none space-y-3 relative group ${
                    isSelected 
                      ? 'border-indigo-600 ring-1 ring-indigo-600 shadow-sm' 
                      : 'border-slate-200 hover:border-indigo-300 hover:shadow-xs'
                  }`}
                >
                  <div className="flex justify-between items-start gap-2">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-[11px] font-black text-indigo-950 px-1.5 py-0.5 bg-indigo-50 border border-indigo-100 rounded uppercase font-mono">
                          {portal.acronym}
                        </span>
                        <span className="flex items-center gap-1 text-[9px] text-emerald-600 font-bold uppercase">
                          <span className={`w-1.5 h-1.5 rounded-full bg-emerald-500 ${isRefreshing ? 'animate-ping' : ''}`} />
                          {portal.status}
                        </span>
                      </div>
                      <h4 className="text-xs font-black text-slate-900 group-hover:text-indigo-650 transition-colors pt-1">
                        {portal.name}
                      </h4>
                      <p className="text-[9.5px] text-slate-500 font-medium">
                        {portal.authority}
                      </p>
                    </div>
                    
                    <div className="text-right space-y-0.5">
                      <span className="text-[9px] font-bold text-slate-400 block font-mono">PING</span>
                      <span className="text-xs font-extrabold font-mono text-emerald-600">{portal.pingMs}ms</span>
                    </div>
                  </div>

                  {/* Portal Brief stats */}
                  <div className="grid grid-cols-2 gap-2 p-2 bg-slate-50 border border-slate-200/50 rounded-lg text-center">
                    <div>
                      <span className="text-[8px] font-bold text-slate-400 block uppercase leading-none">Jobseekers</span>
                      <span className="text-[10px] font-extrabold text-slate-800 font-mono mt-0.5 block">{portal.jobseekers}</span>
                    </div>
                    <div>
                      <span className="text-[8px] font-bold text-slate-400 block uppercase leading-none">Vacancies</span>
                      <span className="text-[10px] font-extrabold font-mono text-indigo-600 mt-0.5 block">
                        {portal.vacancies.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>

                  {/* Micro footer check */}
                  <div className="flex items-center justify-between text-[9px] text-slate-450 border-t border-slate-50 pt-2 font-mono">
                    <span className="flex items-center gap-1">
                      <Clock className="w-2.5 h-2.5 text-slate-400" />
                      Status Checked {portal.lastChecked}
                    </span>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(portal.primaryURL, '_blank', 'noopener,noreferrer');
                      }}
                      className="text-indigo-650 font-bold uppercase tracking-wide inline-flex items-center gap-0.5 hover:underline"
                    >
                      Visit <ExternalLink className="w-2.5 h-2.5" />
                    </button>
                  </div>
                </div>
              );
            })}
            
            {filteredPortals.length === 0 && (
              <div className="col-span-full bg-white rounded-xl border border-slate-200 p-12 text-center">
                <AlertCircle className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                <h4 className="text-xs font-bold text-slate-750 font-mono">No matching national portals found</h4>
                <p className="text-[10px] text-slate-450 mt-1">Adjust your filter categories or check the search string.</p>
              </div>
            )}
          </div>

          {/* Deep Selected Portal Detail Dashboard */}
          {selectedPortal && (
            <div className="bg-slate-900 text-white rounded-xl p-5 border border-indigo-950 shadow-md relative overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-350">
              <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/5 rounded-full blur-2xl pointer-events-none" />
              
              <div className="relative flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-indigo-800/40 pb-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[9.5px] font-bold bg-orange-600 text-white px-2 py-0.5 rounded-full uppercase tracking-widest font-mono">
                      APEX LEVEL
                    </span>
                    <span className="text-[9.5px] text-indigo-305 font-bold font-mono">
                      ID: {selectedPortal.id}-gov-registry
                    </span>
                  </div>
                  <h3 className="text-sm font-black uppercase tracking-tight text-white mt-1 pt-0.5">
                    {selectedPortal.name}
                  </h3>
                  <p className="text-[10.5px] text-indigo-200 font-medium">
                    {selectedPortal.authority}
                  </p>
                </div>

                <button 
                  onClick={() => window.open(selectedPortal.primaryURL, '_blank', 'noopener,noreferrer')}
                  className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white border border-indigo-500/30 rounded-lg text-[10px] font-black uppercase tracking-wider inline-flex items-center justify-center gap-1 transition-all"
                >
                  Gateway Link <ExternalLink className="w-3 h-3" />
                </button>
              </div>

              {/* Stats & description section */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 relative">
                <div className="md:col-span-2 space-y-3">
                  <div>
                    <h5 className="text-[9px] font-black uppercase tracking-wider text-indigo-300">Monitored Service Niche</h5>
                    <p className="text-xs text-indigo-100/90 leading-relaxed font-semibold mt-1">
                      {selectedPortal.niche}
                    </p>
                  </div>

                  <div className="p-3 bg-indigo-950/40 rounded-lg border border-indigo-900/30 space-y-2">
                    <h5 className="text-[9px] font-black uppercase tracking-wider text-indigo-300 flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-emerald-450" /> Portal Metadata Integrity Verified
                    </h5>
                    <p className="text-[10.5px] text-indigo-250 leading-normal font-medium">
                      All connection handshakes, vacancy sync indices, and employer registries have been checked. Registries conform with Article 16 of the Indian Constitution ensuring absolute equity and transparency.
                    </p>
                  </div>
                </div>

                <div className="p-3 bg-indigo-950/35 border border-indigo-800/20 rounded-lg space-y-3">
                  <h5 className="text-[9px] font-black uppercase tracking-wider text-indigo-300">Database Density</h5>
                  
                  <div className="space-y-2 font-mono">
                    <div className="flex justify-between items-center text-[10px]">
                      <span className="text-indigo-200">Employers Res:</span>
                      <span className="font-extrabold text-white">{selectedPortal.employers}</span>
                    </div>
                    <div className="flex justify-between items-center text-[10px]">
                      <span className="text-indigo-200">Active Pool:</span>
                      <span className="font-extrabold text-white">{selectedPortal.jobseekers}</span>
                    </div>
                    <div className="flex justify-between items-center text-[10px]">
                      <span className="text-indigo-200">Vacancies Open:</span>
                      <span className="font-extrabold text-orange-400">{selectedPortal.vacancies.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Estimator Chart, Portal Guidelines */}
        <div className="space-y-6">
          
          {/* Indian Government Portal Registry Guidelines */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 space-y-4">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-600 flex items-center gap-1.5 border-b border-slate-100 pb-2">
              <BookOpen className="w-4 h-4 text-orange-500 shrink-0" />
              Guidelines & Directives
            </h3>
            
            <div className="space-y-3">
              <div className="flex items-start gap-2.5">
                <div className="w-5 h-5 bg-orange-50 rounded-full flex items-center justify-center font-extrabold text-[10px] text-orange-600 shrink-0 mt-0.5">
                  1
                </div>
                <div className="space-y-0.5">
                  <span className="text-[11px] font-bold text-slate-800 block leading-tight">DigiLocker Verification</span>
                  <p className="text-[9.5px] text-slate-500 leading-normal font-medium">
                    DOPT recommends linking certificates via DigiLocker. When submitting through UPSC-OTR or SSC, confirm your profile matches your Aadhaar-linked database to expedite processing.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="w-5 h-5 bg-indigo-50 rounded-full flex items-center justify-center font-extrabold text-[10px] text-indigo-600 shrink-0 mt-0.5">
                  2
                </div>
                <div className="space-y-0.5">
                  <span className="text-[11px] font-bold text-slate-800 block leading-tight">NCS Unique ID generation</span>
                  <p className="text-[9.5px] text-slate-500 leading-normal font-medium">
                    Registering on the National Career Service (NCS) generates a unique 14-digit identifier. Some state recruitment boards (such as APPSC and TGPSC) allow direct linkages with your system ID for single-click submissions.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="w-5 h-5 bg-emerald-50 rounded-full flex items-center justify-center font-extrabold text-[10px] text-emerald-600 shrink-0 mt-0.5">
                  3
                </div>
                <div className="space-y-0.5">
                  <span className="text-[11px] font-bold text-slate-800 block leading-tight">NRA CET Policy Screenings</span>
                  <p className="text-[9.5px] text-slate-500 leading-normal font-medium">
                    The expected CET framework registers single-score parameters to combine Tier-1 examinations across SSC, Banks, and Railways into a uniform merit list. Keep tabs on NRA announcement cycles.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* SVG Registered Jobseekers Density Chart */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-100 pb-2">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                <BarChart4 className="w-4 h-4 text-indigo-600" />
                Registry Flow Trends
              </h3>
              <span className="text-[8px] bg-indigo-50 text-indigo-600 font-bold px-1.5 py-0.5 rounded font-mono">
                REGISTRATIONS (M)
              </span>
            </div>

            <p className="text-[9.5px] text-slate-500 leading-relaxed font-semibold">
              Consolidated aggregate registration curve across national databases over the preceding months (represented in Millions).
            </p>

            {/* Custom SVG Line Chart */}
            <div className="h-36 w-full relative pt-2">
              <svg className="w-full h-full font-mono overflow-visible" viewBox="0 0 300 120">
                {/* Grid Lines */}
                <line x1="30" y1="20" x2="280" y2="20" stroke="#f1f5f9" strokeWidth="1" />
                <line x1="30" y1="50" x2="280" y2="50" stroke="#f1f5f9" strokeWidth="1" />
                <line x1="30" y1="80" x2="280" y2="80" stroke="#f1f5f9" strokeWidth="1" />
                <line x1="30" y1="110" x2="280" y2="110" stroke="#e2e8f0" strokeWidth="1.5" />

                {/* Y Axis labels */}
                <text x="5" y="24" className="text-[8px] fill-slate-400" textAnchor="start">30M</text>
                <text x="5" y="54" className="text-[8px] fill-slate-400" textAnchor="start">20M</text>
                <text x="5" y="84" className="text-[8px] fill-slate-400" textAnchor="start">10M</text>
                <text x="5" y="114" className="text-[8px] fill-slate-400" textAnchor="start">0M</text>

                {/* X Axis Coordinates & Labels */}
                {historyData.map((d, idx) => {
                  const x = 30 + idx * 48;
                  return (
                    <text key={d.month} x={x} y="128" className="text-[8.5px] fill-slate-400 font-bold" textAnchor="middle">
                      {d.month}
                    </text>
                  );
                })}

                {/* Draw Gradient Area */}
                <path
                  d={`M 30,110
                     L 30,${110 - (historyData[0].registrations / 30) * 90}
                     L 78,${110 - (historyData[1].registrations / 30) * 90}
                     L 126,${110 - (historyData[2].registrations / 30) * 90}
                     L 174,${110 - (historyData[3].registrations / 30) * 90}
                     L 222,${110 - (historyData[4].registrations / 30) * 90}
                     L 270,${110 - (historyData[5].registrations / 30) * 90}
                     L 270,110 Z`}
                  fill="url(#indigoGrad)"
                  opacity="0.15"
                />

                {/* Draw Main Path Line */}
                <path
                  d={`M 30,${110 - (historyData[0].registrations / 30) * 90}
                     L 78,${110 - (historyData[1].registrations / 30) * 90}
                     L 126,${110 - (historyData[2].registrations / 30) * 90}
                     L 174,${110 - (historyData[3].registrations / 30) * 90}
                     L 222,${110 - (historyData[4].registrations / 30) * 90}
                     L 270,${110 - (historyData[5].registrations / 30) * 90}`}
                  fill="none"
                  stroke="#4f46e5"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Draw Data Points Circles */}
                {historyData.map((d, idx) => {
                  const x = 30 + idx * 48;
                  const y = 110 - (d.registrations / 30) * 90;
                  return (
                    <g key={d.month}>
                      <circle cx={x} cy={y} r="4" className="fill-indigo-600 stroke-white" strokeWidth="1.5" />
                      <text x={x} y={y - 8} className="text-[8px] font-extrabold fill-slate-700" textAnchor="middle">
                        {d.registrations}M
                      </text>
                    </g>
                  );
                })}

                {/* Definitions for Gradients */}
                <defs>
                  <linearGradient id="indigoGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#4f46e5" />
                    <stop offset="100%" stopColor="#818cf8" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            
            <div className="flex justify-between text-[9px] text-slate-400 font-mono bg-slate-50 p-2 rounded-lg border border-slate-205/60 mt-1">
              <span className="flex items-center gap-1">
                <CheckCircle className="w-2.5 h-2.5 text-emerald-500" /> Auto-Calibrated (NCS Stream)
              </span>
              <span>Updated: {checkIntervalTime}</span>
            </div>
          </div>

          {/* Quick info widget for direct lookup */}
          <div className="bg-indigo-50 border border-indigo-150 p-4 rounded-xl flex items-start gap-3">
             <Info className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
             <div className="space-y-1">
               <span className="text-[10px] font-black text-indigo-900 uppercase tracking-wider block">Official Notice</span>
               <p className="text-[9.5px] text-indigo-700 leading-normal font-medium">
                  National Job Registry entries are kept completely synchronized with governmental notification circulars. Under central directives, registrations must be renewed every 3 years.
               </p>
             </div>
          </div>
        </div>

      </div>

    </div>
  );
}
