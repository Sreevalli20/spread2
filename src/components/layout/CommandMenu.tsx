import React, { useState, useEffect } from 'react';
import { useAnalytics, AppView } from '../../context/AnalyticsContext';
import { Search, LayoutDashboard, UploadCloud, Lightbulb, MessageSquareCode, FileText, Table2, Settings, ShieldCheck, ArrowRight } from 'lucide-react';

export const CommandMenu: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, setCurrentView, analysis, openEvidenceDrawer } = useAnalytics();
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen(!isSearchOpen);
      }
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  if (!isSearchOpen) return null;

  const navItems: { label: string; view: AppView; icon: any }[] = [
    { label: 'Executive Dashboard Overview', view: 'overview', icon: LayoutDashboard },
    { label: 'Upload & Analyze Datasets', view: 'analyze', icon: UploadCloud },
    { label: 'Strategic Insights & Risks', view: 'insights', icon: Lightbulb },
    { label: 'Ask DecisionLens AI', view: 'ask', icon: MessageSquareCode },
    { label: 'Executive Board Report', view: 'reports', icon: FileText },
    { label: 'Data Quality & Profiles', view: 'data', icon: Table2 },
    { label: 'Platform Settings', view: 'settings', icon: Settings },
  ];

  const filteredNav = navItems.filter((item) =>
    item.label.toLowerCase().includes(query.toLowerCase())
  );

  const filteredKpis =
    analysis?.kpis.filter((kpi) =>
      kpi.label.toLowerCase().includes(query.toLowerCase())
    ) || [];

  const filteredFindings =
    analysis?.findings.filter((f) =>
      f.title.toLowerCase().includes(query.toLowerCase()) ||
      f.explanation.toLowerCase().includes(query.toLowerCase())
    ) || [];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={() => setIsSearchOpen(false)}
      />

      {/* Modal Dialog */}
      <div className="relative z-10 w-full max-w-xl rounded-xl border border-slate-200 dark:border-white/12 bg-white dark:bg-[#0E1422] shadow-2xl overflow-hidden transition-colors">
        {/* Input box */}
        <div className="flex items-center gap-3 border-b border-slate-200 dark:border-white/10 px-4 py-3 bg-slate-50/50 dark:bg-transparent">
          <Search className="h-4 w-4 text-slate-400 dark:text-slate-500" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search metrics, findings, evidence IDs, or navigation..."
            autoFocus
            className="w-full bg-transparent text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-hidden"
          />
          <kbd className="hidden sm:inline-block rounded border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/5 px-1.5 py-0.5 text-[10px] font-mono text-slate-500">
            ESC
          </kbd>
        </div>

        {/* Results */}
        <div className="max-h-96 overflow-y-auto p-2 space-y-4 text-xs">
          {/* Views */}
          {filteredNav.length > 0 && (
            <div>
              <div className="px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 font-mono">
                Navigation
              </div>
              <div className="space-y-0.5">
                {filteredNav.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.view}
                      onClick={() => {
                        setCurrentView(item.view);
                        setIsSearchOpen(false);
                      }}
                      className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white transition-colors"
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                        <span className="font-medium">{item.label}</span>
                      </div>
                      <ArrowRight className="h-3.5 w-3.5 text-slate-300 dark:text-slate-600" />
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* KPIs */}
          {filteredKpis.length > 0 && (
            <div>
              <div className="px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 font-mono">
                Calculated Metrics
              </div>
              <div className="space-y-0.5">
                {filteredKpis.map((kpi) => (
                  <button
                    key={kpi.id}
                    onClick={() => {
                      setCurrentView('overview');
                      setIsSearchOpen(false);
                    }}
                    className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-slate-900 dark:text-white">{kpi.label}</span>
                      <span className="text-slate-400 dark:text-slate-500">({kpi.formula})</span>
                    </div>
                    <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">{kpi.formattedValue}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Findings & Evidence */}
          {filteredFindings.length > 0 && (
            <div>
              <div className="px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 font-mono">
                Findings & Evidence
              </div>
              <div className="space-y-0.5">
                {filteredFindings.map((finding) => (
                  <button
                    key={finding.id}
                    onClick={() => {
                      openEvidenceDrawer(finding.evidenceId);
                      setIsSearchOpen(false);
                    }}
                    className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white transition-colors text-left"
                  >
                    <div className="flex items-center gap-2 truncate pr-2">
                      <ShieldCheck className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400 shrink-0" />
                      <span className="truncate">{finding.title}</span>
                    </div>
                    <span className="font-mono text-[10px] text-slate-500 dark:text-slate-400 shrink-0">
                      {finding.evidenceId}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {filteredNav.length === 0 && filteredKpis.length === 0 && filteredFindings.length === 0 && (
            <div className="py-8 text-center text-slate-400 dark:text-slate-500">
              No matching results for &ldquo;{query}&rdquo;.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
