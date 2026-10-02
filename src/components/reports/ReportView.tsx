import React from 'react';
import { useAnalytics } from '../../context/AnalyticsContext';
import {
  Printer,
  Download,
  ShieldCheck,
  FileText,
  Calendar,
  Layers,
  TrendingUp,
  AlertTriangle,
  Lightbulb,
} from 'lucide-react';

export const ReportView: React.FC = () => {
  const { analysis, openEvidenceDrawer } = useAnalytics();

  if (!analysis) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <FileText className="h-12 w-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">No Analysis Available</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Upload and analyze a dataset to generate a report.
          </p>
        </div>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  const handleExportJson = () => {
    const dataStr =
      'data:text/json;charset=utf-8,' +
      encodeURIComponent(
        JSON.stringify(
          {
            reportTitle: 'Executive Decision Intelligence Report',
            generatedAt: new Date().toISOString(),
            dataset: analysis.dataset_name,
            kpis: analysis.kpis.map((k) => ({ name: k.name, value: k.formatted_value })),
            findings: analysis.findings,
            anomalies: analysis.anomalies,
            data_quality: analysis.data_quality,
          },
          null,
          2
        )
      );
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute(
      'download',
      `DecisionLens_Executive_Report_${new Date().toISOString().slice(0, 10)}.json`
    );
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      {/* Top Controls Bar (Hidden during print) */}
      <div className="no-print flex items-center justify-between rounded-xl border border-slate-200 dark:border-white/8 bg-white dark:bg-[#101625]/80 p-4 shadow-xs">
        <div>
          <h1 className="text-lg font-bold text-slate-900 dark:text-white">Board-Level Executive Report</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Formally synthesized performance dossier ready for board presentations & audit.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleExportJson}
            className="flex items-center gap-1.5 rounded-lg border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/10 transition-colors shadow-2xs"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Export JSON</span>
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 rounded-lg bg-indigo-600 px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-indigo-500 transition-colors shadow-xs"
          >
            <Printer className="h-3.5 w-3.5" />
            <span>Print Dossier</span>
          </button>
        </div>
      </div>

      {/* Formal Executive Document Surface */}
      <div className="rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0D1220] p-8 shadow-xl space-y-8 text-slate-800 dark:text-slate-200 transition-colors">
        {/* Report Header */}
        <div className="border-b border-slate-200 dark:border-white/10 pb-6 flex flex-col sm:flex-row justify-between sm:items-end gap-4">
          <div>
            <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-mono text-xs mb-1">
              <ShieldCheck className="h-4 w-4" />
              <span>DECISIONLENS EXECUTIVE INTELLIGENCE DOSSIER</span>
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Data Analysis Report
            </h2>
            <div className="mt-1 flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 font-mono">
              <span>Dataset: {analysis.dataset_name}</span>
              <span>·</span>
              <span>Date Generated: {new Date().toLocaleDateString()}</span>
            </div>
          </div>

          <div className="text-left sm:text-right font-mono text-xs text-slate-500 dark:text-slate-400">
            <div>Audit Status: Verified (100% Deterministic)</div>
            <div>Processing Time: {analysis.processing_time?.toFixed(2)}s</div>
          </div>
        </div>

        {/* Dataset Information */}
        <div className="rounded-xl border border-slate-200 dark:border-white/6 bg-slate-50 dark:bg-white/2 p-4 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
          <div>
            <span className="text-slate-400 dark:text-slate-500 block">Dataset Source</span>
            <span className="font-semibold text-slate-900 dark:text-white truncate block">{analysis.dataset_name}</span>
          </div>
          <div>
            <span className="text-slate-400 dark:text-slate-500 block">Ledger Volume</span>
            <span className="font-semibold text-slate-900 dark:text-white tabular-nums">
              {analysis.data_quality?.row_count?.toLocaleString() || 0} records
            </span>
          </div>
          <div>
            <span className="text-slate-400 dark:text-slate-500 block">Hygiene Rating</span>
            <span className="font-semibold text-emerald-600 dark:text-emerald-400">
              {analysis.data_quality?.score?.toFixed(1) || 0}% Complete
            </span>
          </div>
          <div>
            <span className="text-slate-400 dark:text-slate-500 block">Detected Dimensions</span>
            <span className="font-semibold text-indigo-600 dark:text-indigo-300">
              {analysis.data_quality?.column_count || 0} Dimensions
            </span>
          </div>
        </div>

        {/* Executive Summary from AI */}
        {analysis.ai_insight?.executive_summary && (
          <section className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 border-b border-slate-100 dark:border-white/5 pb-1">
              01. Executive Summary
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {analysis.ai_insight.executive_summary}
            </p>
          </section>
        )}

        {/* KPI Overview Grid */}
        <section className="space-y-3">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 border-b border-slate-100 dark:border-white/5 pb-1">
            02. Core KPI Scorecard
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {analysis.kpis.map((kpi) => (
              <div key={kpi.id} className="rounded-xl border border-slate-200 dark:border-white/6 bg-slate-50 dark:bg-white/2 p-3 shadow-2xs">
                <span className="text-[11px] text-slate-500 dark:text-slate-400 block truncate">{kpi.name}</span>
                <span className="text-base sm:text-lg font-bold text-slate-900 dark:text-white font-mono tabular-nums block mt-0.5">
                  {kpi.formatted_value}
                </span>
                <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-mono block mt-0.5">
                  {kpi.calculation}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Key Findings */}
        {analysis.findings && analysis.findings.length > 0 && (
          <section className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 border-b border-slate-100 dark:border-white/5 pb-1">
              03. Strategic Findings & Root-Cause Traceability
            </h3>
            <div className="space-y-2.5">
              {analysis.findings.slice(0, 6).map((f) => (
                <div key={f.id} className="rounded-xl border border-slate-200 dark:border-white/6 bg-slate-50 dark:bg-white/2 p-3 text-xs shadow-2xs">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-slate-900 dark:text-white">{f.title}</span>
                    <span className="font-mono text-[10px] text-slate-400 dark:text-slate-500 uppercase">
                      {f.severity}
                    </span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{f.description}</p>
                  {f.evidence_ids && f.evidence_ids.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {f.evidence_ids.slice(0, 2).map((evId) => (
                        <button
                          key={evId}
                          onClick={() => openEvidenceDrawer(evId)}
                          className="font-mono text-[10px] text-indigo-600 dark:text-indigo-400 hover:underline"
                        >
                          [{evId}]
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Anomalies */}
        {analysis.anomalies && analysis.anomalies.length > 0 && (
          <section className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 border-b border-slate-100 dark:border-white/5 pb-1">
              04. Detected Anomalies
            </h3>
            <div className="space-y-2.5">
              {analysis.anomalies.slice(0, 5).map((a) => (
                <div key={a.id} className="rounded-xl border border-slate-200 dark:border-white/6 bg-slate-50 dark:bg-white/2 p-3 text-xs shadow-2xs">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-slate-900 dark:text-white">{a.metric}</span>
                    <span className={`font-mono text-[10px] uppercase ${
                      a.severity === 'critical' ? 'text-rose-600 dark:text-rose-400' :
                      a.severity === 'high' ? 'text-amber-600 dark:text-amber-400' :
                      'text-slate-600 dark:text-slate-400'
                    }`}>
                      {a.severity}
                    </span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    Observed: {a.observed_value?.toFixed(2)} | Expected: {a.expected_value?.toFixed(2) || 'N/A'} | Deviation: {a.deviation?.toFixed(2)}%
                  </p>
                  {a.evidence_id && (
                    <button
                      onClick={() => openEvidenceDrawer(a.evidence_id)}
                      className="mt-2 font-mono text-[10px] text-indigo-600 dark:text-indigo-400 hover:underline"
                    >
                      View Evidence [{a.evidence_id}]
                    </button>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* AI Insights */}
        {analysis.ai_insight?.insights && analysis.ai_insight.insights.length > 0 && (
          <section className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 border-b border-slate-100 dark:border-white/5 pb-1">
              05. AI-Generated Insights
            </h3>
            <div className="space-y-2.5">
              {analysis.ai_insight.insights.map((insight, idx) => (
                <div key={idx} className="rounded-xl border border-indigo-200 dark:border-indigo-500/20 bg-indigo-50/70 dark:bg-indigo-500/5 p-3.5 text-xs shadow-2xs">
                  <div className="font-semibold text-indigo-800 dark:text-indigo-300 flex items-center gap-1.5 mb-1">
                    <Lightbulb className="h-4 w-4" />
                    <span>Insight {idx + 1}</span>
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{insight.insight}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* AI Recommendations */}
        {analysis.ai_insight?.recommendations && analysis.ai_insight.recommendations.length > 0 && (
          <section className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 border-b border-slate-100 dark:border-white/5 pb-1">
              06. Strategic Recommendations
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              {analysis.ai_insight.recommendations.map((rec, idx) => (
                <div key={idx} className="rounded-xl border border-amber-200 dark:border-amber-500/20 bg-amber-50/70 dark:bg-amber-500/5 p-3.5 space-y-1.5 shadow-2xs">
                  <div className="font-semibold text-amber-800 dark:text-amber-300 flex items-center gap-1.5">
                    <AlertTriangle className="h-4 w-4" />
                    <span>Recommendation {idx + 1}</span>
                    <span className="text-[10px] text-amber-600 dark:text-amber-400 ml-auto font-mono uppercase">
                      {rec.priority}
                    </span>
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{rec.recommendation}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Limitations & Data Quality */}
        <section className="border-t border-slate-200 dark:border-white/10 pt-4 text-[11px] text-slate-400 dark:text-slate-500 font-mono space-y-1">
          <div>DATA AUDIT NOTE:</div>
          <div>
            All metrics calculated deterministically against {analysis.data_quality?.row_count || 0} source records.
            Data quality score: {analysis.data_quality?.score?.toFixed(1) || 0}%.
          </div>
          {analysis.ai_insight?.limitations && analysis.ai_insight.limitations.length > 0 && (
            <div className="mt-2">
              <div>AI LIMITATIONS:</div>
              {analysis.ai_insight.limitations.map((lim, idx) => (
                <div key={idx}>• {lim}</div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};
