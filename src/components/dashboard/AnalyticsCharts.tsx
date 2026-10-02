import React, { useState } from 'react';
import { Anomaly, Finding } from '../../types/analytics';
import { useAnalytics } from '../../context/AnalyticsContext';
import { AlertCircle, LineChart as LineIcon } from 'lucide-react';

interface AnalyticsChartsProps {
  timeSeries: any[];
  categories: any[];
  anomalies: Anomaly[];
  findings?: Finding[];
}

export const AnalyticsCharts: React.FC<AnalyticsChartsProps> = ({
  timeSeries,
  categories,
  anomalies,
  findings = [],
}) => {
  const { openEvidenceDrawer } = useAnalytics();
  const [activeCategoryIndex, setActiveCategoryIndex] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* Findings Summary */}
      <div className="rounded-xl border border-slate-200 dark:border-white/8 bg-white dark:bg-[#101625]/90 p-5 shadow-xs transition-colors">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-white/5">
          <div className="flex items-center gap-2">
            <LineIcon className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-800 dark:text-slate-300">
              Key Findings
            </h3>
          </div>
          <span className="text-[11px] font-mono text-slate-400 dark:text-slate-500">
            {findings.length} findings
          </span>
        </div>

        <div className="mt-4 space-y-3">
          {findings.length > 0 ? (
            findings.slice(0, 5).map((finding) => (
              <div
                key={finding.id}
                className="p-3 rounded-lg border border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-white/2 hover:border-indigo-400/40 dark:hover:border-white/15 transition-all cursor-pointer"
                onClick={() => {
                  if (finding.evidence_ids[0]) {
                    openEvidenceDrawer(finding.evidence_ids[0]);
                  }
                }}
              >
                <div className="flex items-center justify-between mb-1">
                  <span
                    className={`text-[10px] font-mono uppercase font-semibold px-2 py-0.5 rounded ${
                      finding.severity === 'critical'
                        ? 'bg-rose-100 dark:bg-rose-500/20 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-500/30'
                        : finding.severity === 'high'
                        ? 'bg-orange-100 dark:bg-orange-500/20 text-orange-700 dark:text-orange-300 border border-orange-200 dark:border-orange-500/30'
                        : finding.severity === 'medium'
                        ? 'bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-500/30'
                        : 'bg-indigo-100 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-500/30'
                    }`}
                  >
                    {finding.severity}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500">
                    {(finding.confidence * 100).toFixed(0)}% confidence
                  </span>
                </div>
                <h4 className="text-xs font-semibold text-slate-900 dark:text-white mb-1">
                  {finding.title}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-2">
                  {finding.description}
                </p>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-sm text-slate-500 dark:text-slate-400">
              No findings available
            </div>
          )}
        </div>
      </div>

      {/* Anomaly Distribution */}
      <div className="rounded-xl border border-slate-200 dark:border-white/8 bg-white dark:bg-[#101625]/90 p-5 shadow-xs transition-colors">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-white/5">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-amber-500 dark:text-amber-400" />
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-800 dark:text-slate-300">
              Anomalies Detected
            </h3>
          </div>
          <span className="text-[11px] font-mono text-slate-400 dark:text-slate-400">
            {anomalies.length} signals
          </span>
        </div>

        <div className="mt-4 space-y-3">
          {anomalies.length > 0 ? (
            anomalies.slice(0, 5).map((anom) => {
              const isHigh = anom.severity === 'high' || anom.severity === 'critical';
              const isMed = anom.severity === 'medium';
              return (
                <div
                  key={anom.id}
                  className="flex flex-col justify-between rounded-lg border border-slate-200 dark:border-white/8 bg-slate-50/50 dark:bg-white/2 p-3.5 hover:border-indigo-400/40 dark:hover:border-white/15 transition-all cursor-pointer"
                  onClick={() => openEvidenceDrawer(anom.evidence_id)}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span
                        className={`text-[10px] font-mono uppercase font-semibold px-2 py-0.5 rounded ${
                          isHigh
                            ? 'bg-rose-100 dark:bg-rose-500/20 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-500/30'
                            : isMed
                            ? 'bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-500/30'
                            : 'bg-indigo-100 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-500/30'
                        }`}
                      >
                        {anom.severity}
                      </span>
                    </div>

                    <h4 className="text-xs font-semibold text-slate-900 dark:text-white mb-1">
                      {anom.metric}
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-1">
                      {anom.dimension || 'Overall'}
                    </p>
                  </div>

                  <div className="border-t border-slate-200/60 dark:border-white/5 pt-2 flex items-center justify-between text-xs">
                    <span className="font-mono text-rose-600 dark:text-rose-400 font-bold">
                      {anom.deviation > 0 ? '+' : ''}{anom.deviation.toFixed(1)} deviation
                    </span>
                    <span className="text-xs font-mono text-indigo-600 dark:text-indigo-400">
                      View evidence
                    </span>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-8 text-sm text-slate-500 dark:text-slate-400">
              No anomalies detected
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
