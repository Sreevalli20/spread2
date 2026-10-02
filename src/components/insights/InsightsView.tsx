import React, { useState } from 'react';
import { useAnalytics } from '../../context/AnalyticsContext';
import {
  Lightbulb,
  TrendingUp,
  AlertTriangle,
  Flame,
  ShieldAlert,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  ShieldCheck,
  CheckCircle,
} from 'lucide-react';

export const InsightsView: React.FC = () => {
  const { analysis, openEvidenceDrawer } = useAnalytics();
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [expandedFindingIds, setExpandedFindingIds] = useState<Record<string, boolean>>({});

  if (!analysis) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <Lightbulb className="h-12 w-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">No Insights Available</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Upload and analyze a dataset to generate insights.
          </p>
        </div>
      </div>
    );
  }

  const categories = ['All', 'trend', 'anomaly', 'segment_difference', 'margin_signal', 'growth_signal', 'concentration', 'data_quality_risk', 'operational_signal'];

  const filteredFindings =
    activeCategory === 'All'
      ? analysis.findings
      : analysis.findings.filter((f) => f.type === activeCategory);

  const toggleExpand = (id: string) => {
    setExpandedFindingIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'text-rose-700 dark:text-rose-400 bg-rose-50 dark:bg-rose-500/10 border-rose-200 dark:border-rose-500/20';
      case 'high':
        return 'text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10 border-amber-200 dark:border-amber-500/20';
      case 'medium':
        return 'text-yellow-700 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-500/10 border-yellow-200 dark:border-yellow-500/20';
      case 'low':
        return 'text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/20';
      default:
        return 'text-indigo-700 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10 border-indigo-200 dark:border-indigo-500/20';
    }
  };

  const getCategoryIcon = (type: string) => {
    switch (type) {
      case 'trend':
        return TrendingUp;
      case 'anomaly':
        return Flame;
      case 'segment_difference':
        return CheckCircle;
      case 'margin_signal':
      case 'growth_signal':
        return Lightbulb;
      case 'concentration':
      case 'data_quality_risk':
      case 'operational_signal':
        return ShieldAlert;
      default:
        return Lightbulb;
    }
  };

  const getCategoryLabel = (type: string) => {
    switch (type) {
      case 'trend':
        return 'Trends';
      case 'anomaly':
        return 'Anomalies';
      case 'segment_difference':
        return 'Segment Differences';
      case 'margin_signal':
        return 'Margin Signals';
      case 'growth_signal':
        return 'Growth Signals';
      case 'concentration':
        return 'Concentration';
      case 'data_quality_risk':
        return 'Data Quality Risks';
      case 'operational_signal':
        return 'Operational Signals';
      default:
        return type;
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
            Strategic Insights & Risk Exposure
          </h1>
          <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
            Synthesized conclusions derived directly from verified data rows. Every finding is
            mathematically backed by an auditable evidence chain.
          </p>
        </div>

        <div className="flex items-center gap-1.5 text-xs font-mono text-slate-600 dark:text-slate-400">
          <ShieldCheck className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
          <span>{analysis.findings.length} Verified Strategic Findings</span>
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto border-b border-slate-200 dark:border-white/8 pb-2">
        {categories.map((cat) => {
          const count =
            cat === 'All'
              ? analysis.findings.length
              : analysis.findings.filter((f) => f.type === cat).length;
          const isActive = activeCategory === cat;

          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                isActive
                  ? 'bg-indigo-50 dark:bg-indigo-600/20 text-indigo-700 dark:text-white border border-indigo-200 dark:border-indigo-500/30 font-semibold shadow-2xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/5 border border-transparent'
              }`}
            >
              <span>{getCategoryLabel(cat)}</span>
              <span className="font-mono text-[10px] text-slate-400 dark:text-slate-500">({count})</span>
            </button>
          );
        })}
      </div>

      {/* Findings List */}
      <div className="space-y-3.5">
        {filteredFindings.length === 0 ? (
          <div className="text-center py-12 text-slate-500 dark:text-slate-400">
            No findings found for this category.
          </div>
        ) : (
          filteredFindings.map((finding) => {
            const isExpanded = !!expandedFindingIds[finding.id];
            const Icon = getCategoryIcon(finding.type);

            return (
              <div
                key={finding.id}
                className="rounded-xl border border-slate-200 dark:border-white/8 bg-white dark:bg-[#101625]/90 transition-all hover:border-slate-300 dark:hover:border-white/15 shadow-xs overflow-hidden"
              >
                {/* Finding Main Row */}
                <div className="p-4 sm:p-5">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5">
                        <Icon className="h-4 w-4" />
                      </div>

                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500">
                            {getCategoryLabel(finding.type)}
                          </span>
                          <span className="text-slate-300 dark:text-slate-700">·</span>
                          <span
                            className={`rounded border px-1.5 py-0.2 text-[10px] font-mono uppercase ${getSeverityBadge(
                              finding.severity
                            )}`}
                          >
                            {finding.severity}
                          </span>
                          <span className="text-slate-300 dark:text-slate-700">·</span>
                          <span className="text-xs text-indigo-700 dark:text-indigo-300 font-mono">
                            KPI: {finding.metric}
                          </span>
                          <span className="text-slate-300 dark:text-slate-700">·</span>
                          <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                            {(finding.confidence * 100).toFixed(0)}% confidence
                          </span>
                        </div>

                        <h3 className="text-sm sm:text-base font-semibold text-slate-900 dark:text-white leading-snug">
                          {finding.title}
                        </h3>

                        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl">
                          {finding.description}
                        </p>
                      </div>
                    </div>

                    {/* Impact badge & Trace link */}
                    <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100 dark:border-white/5">
                      <div className="rounded-lg border border-indigo-200 dark:border-indigo-500/20 bg-indigo-50 dark:bg-indigo-500/10 px-2.5 py-1 text-xs font-mono font-bold text-indigo-700 dark:text-indigo-300 tabular-nums">
                        {finding.impact}
                      </div>

                      {finding.evidence_ids && finding.evidence_ids.length > 0 && (
                        <button
                          onClick={() => openEvidenceDrawer(finding.evidence_ids[0])}
                          className="inline-flex items-center gap-1 font-mono text-xs text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 hover:underline transition-colors"
                        >
                          <span>Audit [{finding.evidence_ids[0]}]</span>
                          <ExternalLink className="h-3 w-3" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Expand / Details toggle */}
                  <div className="mt-4 flex items-center justify-between border-t border-slate-100 dark:border-white/5 pt-3">
                    <div className="text-[11px] text-slate-400 dark:text-slate-500">
                      Source Verified · {analysis.dataset_name}
                    </div>

                    <button
                      onClick={() => toggleExpand(finding.id)}
                      className="flex items-center gap-1 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                    >
                      <span>{isExpanded ? 'Hide details' : 'View details & evidence'}</span>
                      {isExpanded ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
                    </button>
                  </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="border-t border-slate-100 dark:border-white/6 bg-slate-50 dark:bg-black/30 p-4 sm:p-5 space-y-3 text-xs">
                    {finding.limitations && finding.limitations.length > 0 && (
                      <div>
                        <div className="font-semibold text-slate-800 dark:text-slate-300 mb-1">Limitations:</div>
                        <ul className="text-slate-600 dark:text-slate-400 leading-relaxed list-disc list-inside">
                          {finding.limitations.map((lim, idx) => (
                            <li key={idx}>{lim}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {finding.evidence_ids && finding.evidence_ids.length > 1 && (
                      <div>
                        <div className="font-semibold text-slate-800 dark:text-slate-300 mb-1">Evidence References:</div>
                        <div className="flex flex-wrap gap-1">
                          {finding.evidence_ids.map((evId) => (
                            <button
                              key={evId}
                              onClick={() => openEvidenceDrawer(evId)}
                              className="font-mono text-[10px] text-indigo-600 dark:text-indigo-400 hover:underline"
                            >
                              [{evId}]
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
