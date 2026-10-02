import React, { useState, useRef, useEffect } from 'react';
import { useAnalytics, AppView } from '../../context/AnalyticsContext';
import {
  Search,
  X,
  Database,
  FileText,
  Lightbulb,
  AlertTriangle,
  TrendingUp,
  ArrowRight,
  Loader2,
  Table2,
  CheckCircle2,
} from 'lucide-react';

interface SearchResultItem {
  id: string;
  category: 'Datasets' | 'Reports' | 'Insights & Anomalies' | 'Core Metrics';
  title: string;
  subtitle: string;
  badge?: string;
  action: () => void;
}

export const GlobalSearchBar: React.FC = () => {
  const { analysis, setCurrentView, openEvidenceDrawer } = useAnalytics();
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Keyboard shortcut Cmd+K or Ctrl+K focuses this global search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
        setIsOpen(true);
      }
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
        inputRef.current?.blur();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Debounced typing effect to simulate high-performance indexing
  useEffect(() => {
    if (query.trim().length > 0) {
      setIsSearching(true);
      const timer = setTimeout(() => {
        setIsSearching(false);
      }, 120);
      return () => clearTimeout(timer);
    } else {
      setIsSearching(false);
    }
  }, [query]);

  // Build searchable index
  const getResults = (): SearchResultItem[] => {
    if (!analysis) return [];
    const q = query.toLowerCase().trim();
    const items: SearchResultItem[] = [];

    // 1. Datasets
    const datasetItems: SearchResultItem[] = [
      {
        id: 'ds-active',
        category: 'Datasets',
        title: analysis.dataset_name,
        subtitle: `${analysis.data_quality.row_count.toLocaleString()} rows · ${analysis.data_quality.column_count} columns · ${analysis.data_quality.score.toFixed(1)}% quality score`,
        badge: 'Active Dataset',
        action: () => {
          setCurrentView('data');
          setIsOpen(false);
        },
      },
      {
        id: 'ds-upload',
        category: 'Datasets',
        title: 'Data Ingestion & Inferred Schema',
        subtitle: 'Auto-detect date vectors, numerical fields, and upload CSV/XLSX',
        badge: 'Pipeline',
        action: () => {
          setCurrentView('analyze');
          setIsOpen(false);
        },
      },
      {
        id: 'ds-quality',
        category: 'Datasets',
        title: 'Data Quality & Column Profiling',
        subtitle: 'Distribution analysis, null counts, and raw record browser',
        badge: 'Hygiene',
        action: () => {
          setCurrentView('data');
          setIsOpen(false);
        },
      },
    ];

    // 2. Reports
    const reportItems: SearchResultItem[] = [
      {
        id: 'rep-board',
        category: 'Reports',
        title: 'Executive Board-Level Dossier',
        subtitle: 'Fiscal Performance & Risk Synthesis with executive summary',
        badge: 'Formal Dossier',
        action: () => {
          setCurrentView('reports');
          setIsOpen(false);
        },
      },
      {
        id: 'rep-trends',
        category: 'Reports',
        title: 'Multi-Quarter Performance Trajectory',
        subtitle: 'Consolidated revenue, direct COGS spend, and gross margins table',
        badge: 'Financials',
        action: () => {
          setCurrentView('reports');
          setIsOpen(false);
        },
      },
      {
        id: 'rep-recommendations',
        category: 'Reports',
        title: 'Strategic Board Recommendations',
        subtitle: 'Capital allocation toward SaaS expansion & hardware margin insulation',
        badge: 'Action Plan',
        action: () => {
          setCurrentView('reports');
          setIsOpen(false);
        },
      },
    ];

    // 3. Insights & Anomalies
    const insightItems: SearchResultItem[] = [
      ...analysis.findings.map((f) => ({
        id: f.id,
        category: 'Insights & Anomalies' as const,
        title: f.title,
        subtitle: `${f.description.slice(0, 85)}... · ${f.impact}`,
        badge: f.evidence_ids[0]?.slice(0, 8) || 'N/A',
        action: () => {
          setCurrentView('insights');
          if (f.evidence_ids[0]) openEvidenceDrawer(f.evidence_ids[0]);
          setIsOpen(false);
        },
      })),
      ...analysis.anomalies.map((a) => ({
        id: a.id,
        category: 'Insights & Anomalies' as const,
        title: `${a.metric} Anomaly (${a.severity.toUpperCase()})`,
        subtitle: `Deviation: ${a.deviation > 0 ? '+' : ''}${a.deviation.toFixed(2)}`,
        badge: `${a.severity.toUpperCase()}`,
        action: () => {
          setCurrentView('insights');
          openEvidenceDrawer(a.evidence_id);
          setIsOpen(false);
        },
      })),
    ];

    // 4. Core Metrics
    const metricItems: SearchResultItem[] = analysis.kpis.map((kpi) => ({
      id: kpi.id,
      category: 'Core Metrics',
      title: `${kpi.name}: ${kpi.formatted_value}`,
      subtitle: `${kpi.calculation} · Coverage: ${kpi.coverage}%`,
      badge: kpi.unit || '',
      action: () => {
        setCurrentView('overview');
        setIsOpen(false);
      },
    }));

    const all = [...datasetItems, ...reportItems, ...insightItems, ...metricItems];

    if (!q) return all.slice(0, 10);

    return all.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.subtitle.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        (item.badge && item.badge.toLowerCase().includes(q))
    );
  };

  const results = getResults();

  // Group by category
  const categories = ['Datasets', 'Reports', 'Insights & Anomalies', 'Core Metrics'] as const;
  const categorizedResults = categories
    .map((cat) => ({
      category: cat,
      items: results.filter((r) => r.category === cat),
    }))
    .filter((group) => group.items.length > 0);

  return (
    <div ref={containerRef} className="relative w-full max-w-xs sm:max-w-sm md:max-w-md">
      {/* Search Input Bar */}
      <div className="relative flex items-center">
        <Search className="absolute left-3 h-4 w-4 text-slate-400 dark:text-slate-500 pointer-events-none" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onFocus={() => setIsOpen(true)}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          placeholder="Search datasets, reports, insights..."
          className="w-full rounded-lg border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/4 pl-9 pr-16 py-1.5 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 transition-all focus:border-indigo-500 focus:bg-white dark:focus:bg-[#0B0F19] focus:outline-hidden focus:ring-1 focus:ring-indigo-500/20"
        />

        <div className="absolute right-2.5 flex items-center gap-1">
          {isSearching ? (
            <Loader2 className="h-3.5 w-3.5 text-indigo-500 animate-spin" />
          ) : query ? (
            <button
              onClick={() => {
                setQuery('');
                inputRef.current?.focus();
              }}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          ) : (
            <kbd className="hidden sm:inline-block rounded border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/5 px-1.5 py-0.5 text-[10px] font-mono text-slate-400 dark:text-slate-500">
              ⌘K
            </kbd>
          )}
        </div>
      </div>

      {/* Results Dropdown */}
      {isOpen && (
        <div className="absolute left-0 top-full mt-1.5 z-50 w-full min-w-[320px] sm:min-w-[420px] rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0E1422] p-2 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95">
          <div className="max-h-[380px] overflow-y-auto space-y-3 p-1">
            {categorizedResults.length === 0 ? (
              <div className="py-8 text-center text-xs text-slate-400 dark:text-slate-500">
                No results found for &ldquo;<span className="text-slate-900 dark:text-white font-medium">{query}</span>&rdquo;
              </div>
            ) : (
              categorizedResults.map((group) => (
                <div key={group.category} className="space-y-1">
                  <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 font-mono flex items-center justify-between">
                    <span>{group.category}</span>
                    <span className="text-[10px] font-normal text-slate-400">
                      ({group.items.length})
                    </span>
                  </div>

                  <div className="space-y-0.5">
                    {group.items.map((item) => (
                      <button
                        key={item.id}
                        onClick={item.action}
                        className="group flex w-full items-start justify-between rounded-lg px-2.5 py-2 text-left transition-colors hover:bg-slate-100 dark:hover:bg-white/5"
                      >
                        <div className="min-w-0 flex-1 pr-2">
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-semibold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors truncate">
                              {item.title}
                            </span>
                            {item.badge && (
                              <span className="rounded bg-slate-100 dark:bg-white/5 px-1.5 py-0.2 font-mono text-[9px] text-slate-600 dark:text-slate-400 shrink-0 border border-slate-200 dark:border-white/5">
                                {item.badge}
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                            {item.subtitle}
                          </p>
                        </div>
                        <ArrowRight className="h-3.5 w-3.5 text-slate-300 dark:text-slate-600 group-hover:text-indigo-500 transition-colors shrink-0 mt-1" />
                      </button>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="border-t border-slate-100 dark:border-white/5 px-3 py-1.5 text-[10px] text-slate-400 dark:text-slate-500 font-mono flex items-center justify-between bg-slate-50 dark:bg-white/2 rounded-b-lg">
            <span>Press Enter to select · Esc to dismiss</span>
            <span>{results.length} indexed records</span>
          </div>
        </div>
      )}
    </div>
  );
};
