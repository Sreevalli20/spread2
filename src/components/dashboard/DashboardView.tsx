import React from 'react';
import { useAnalytics } from '../../context/AnalyticsContext';
import { MetricCard } from '../common/MetricCard';
import { AnalyticsCharts } from './AnalyticsCharts';
import { MetricCardSkeleton, ChartSkeleton } from '../common/SkeletonLoader';
import { EmptyState } from '../common/EmptyState';
import {
  UploadCloud,
  Layers,
  Sparkles,
  ArrowUpRight,
  TrendingUp,
  FileCheck2,
  RefreshCw,
} from 'lucide-react';

export const DashboardView: React.FC = () => {
  const {
    analysis,
    isLoading,
    setCurrentView,
    openEvidenceDrawer,
  } = useAnalytics();

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-14 w-full rounded-xl border border-white/5 bg-[#101625]/40 animate-pulse" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 9 }).map((_, i) => (
            <MetricCardSkeleton key={i} />
          ))}
        </div>
        <ChartSkeleton height="h-72" />
      </div>
    );
  }

  if (!analysis) {
    return (
      <EmptyState
        icon={UploadCloud}
        title="No Active Dataset Analysis"
        description="Upload a CSV or XLSX file to generate evidence-based decision intelligence."
        actionLabel="Upload Dataset"
        onAction={() => setCurrentView('analyze')}
      />
    );
  }

  // Transform backend KPIs to match MetricCard interface
  const kpis = analysis.kpis.map((kpi) => ({
    id: kpi.id,
    label: kpi.name,
    value: kpi.value,
    formattedValue: kpi.formatted_value,
    exactValueFormatted: kpi.formatted_value,
    contextualChangeDetailed: 'Calculated from uploaded dataset',
    previousValue: undefined,
    changePercent: undefined,
    trend: 'neutral' as const,
    isPositiveGood: true,
    sparkline: [],
    unit: kpi.unit || '',
    tooltip: kpi.calculation,
    status: 'nominal' as const,
    formula: kpi.calculation,
  }));

  return (
    <div className="space-y-6">
      {/* Top section: Context & Quick Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-xl border border-slate-200 dark:border-white/8 bg-white dark:bg-[#101625]/80 p-5 shadow-xs transition-colors">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-indigo-600 dark:text-indigo-400">
            <Sparkles className="h-3.5 w-3.5" />
            <span>DecisionLens Analytics</span>
          </div>

          <h1 className="mt-1 text-xl font-bold tracking-tight text-slate-900 dark:text-white">
            Dashboard
          </h1>

          <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
            Active dataset:{' '}
            <span className="font-semibold text-slate-800 dark:text-slate-200">{analysis.dataset_name}</span> ·{' '}
            <span className="font-mono text-slate-700 dark:text-slate-300 tabular-nums">
              {analysis.data_quality.row_count.toLocaleString()}
            </span>{' '}
            records verified ({analysis.data_quality.score.toFixed(1)}% data quality)
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={() => setCurrentView('reports')}
            className="flex items-center gap-1.5 rounded-lg border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/5 px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-white/10 transition-colors"
          >
            <span>Report</span>
            <ArrowUpRight className="h-3.5 w-3.5 text-slate-400 dark:text-slate-400" />
          </button>

          <button
            onClick={() => setCurrentView('analyze')}
            className="flex items-center gap-1.5 rounded-lg bg-indigo-600 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-500 transition-colors shadow-xs"
          >
            <UploadCloud className="h-4 w-4" />
            <span>Analyze Data</span>
          </button>
        </div>
      </div>

      {/* KPI Grid */}
      <div>
        <div className="flex items-center justify-between mb-3 px-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Key Performance Indicators
            </span>
            <span className="text-[11px] font-mono text-slate-400 dark:text-slate-500">
              ({kpis.length} metrics)
            </span>
          </div>
          <span className="text-[11px] font-mono text-indigo-600 dark:text-indigo-400">
            Deterministic Calculations
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {kpis.map((metric) => (
            <MetricCard
              key={metric.id}
              metric={metric}
              onClick={() => {
                const firstEvidenceId = Object.keys(analysis.evidence)[0];
                if (firstEvidenceId) openEvidenceDrawer(firstEvidenceId);
              }}
            />
          ))}
        </div>
      </div>

      {/* Executive Analytical Visualizations */}
      <div>
        <div className="flex items-center justify-between mb-3 px-1">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Findings & Anomalies
          </span>
          <span className="text-[11px] font-mono text-slate-400 dark:text-slate-500">
            {analysis.findings.length} findings · {analysis.anomalies.length} anomalies
          </span>
        </div>

        <AnalyticsCharts
          timeSeries={[]}
          categories={[]}
          anomalies={analysis.anomalies}
          findings={analysis.findings}
        />
      </div>
    </div>
  );
};
