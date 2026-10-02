import React, { useEffect } from 'react';
import { useAnalytics } from '../../context/AnalyticsContext';
import { X, CheckCircle2, ShieldCheck, Database, FileSpreadsheet, Copy, Check } from 'lucide-react';

export const EvidenceDrawer: React.FC = () => {
  const { isEvidenceDrawerOpen, closeEvidenceDrawer, selectedEvidence } = useAnalytics();
  const [copied, setCopied] = React.useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isEvidenceDrawerOpen) {
        closeEvidenceDrawer();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isEvidenceDrawerOpen, closeEvidenceDrawer]);

  if (!isEvidenceDrawerOpen || !selectedEvidence) return null;

  const handleCopyId = () => {
    navigator.clipboard?.writeText(selectedEvidence.id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Dim backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-200"
        onClick={closeEvidenceDrawer}
      />

      {/* Drawer surface */}
      <div className="relative z-10 flex h-full w-full max-w-xl flex-col border-l border-slate-200 dark:border-white/10 bg-white dark:bg-[#0C111D] text-slate-800 dark:text-slate-200 shadow-2xl overflow-y-auto transition-colors duration-200">
        {/* Header */}
        <div className="sticky top-0 z-20 flex items-center justify-between border-b border-slate-200 dark:border-white/8 bg-white/95 dark:bg-[#0C111D]/95 px-6 py-4 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-indigo-200 dark:border-indigo-500/30 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
              <ShieldCheck className="h-4 w-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-sm font-bold text-slate-900 dark:text-white tracking-wider">
                  {selectedEvidence.id}
                </span>
                <button
                  onClick={handleCopyId}
                  className="text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors"
                  title="Copy Evidence ID"
                >
                  {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                </button>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Deterministic Mathematical Audit Trace
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs text-indigo-600 dark:text-indigo-400 font-mono font-medium">
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>{selectedEvidence.confidenceScore}% confidence</span>
            </div>
            <button
              onClick={closeEvidenceDrawer}
              className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-800 dark:hover:text-white transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Content body */}
        <div className="space-y-6 p-6">
          {/* Finding relationship */}
          <div className="rounded-xl border border-slate-200 dark:border-white/6 bg-slate-50 dark:bg-[#111728] p-4">
            <div className="text-[11px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
              Associated Finding
            </div>
            <div className="text-sm font-semibold text-slate-900 dark:text-white leading-snug">
              {selectedEvidence.findingRelationship}
            </div>
          </div>

          {/* Metric & Calculation */}
          <div className="space-y-2.5">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Formula & Calculation
            </div>
            <div className="rounded-xl border border-slate-200 dark:border-white/6 bg-slate-100/80 dark:bg-black/40 p-3 font-mono text-xs text-indigo-700 dark:text-indigo-300 leading-relaxed overflow-x-auto">
              {selectedEvidence.calculation}
            </div>
          </div>

          {/* Computed Values */}
          <div className="space-y-2.5">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Verified Computed Outputs
            </div>
            <div className="grid grid-cols-3 gap-3">
              {selectedEvidence.values.map((item, idx) => (
                <div key={idx} className="rounded-xl border border-slate-200 dark:border-white/6 bg-slate-50 dark:bg-[#111728] p-3">
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate">{item.label}</div>
                  <div className="mt-1 font-mono text-base font-bold text-slate-900 dark:text-white tabular-nums">
                    {item.value}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Source Columns & Sample Size */}
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-xl border border-slate-200 dark:border-white/6 bg-slate-50 dark:bg-[#111728] p-3.5">
              <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-xs mb-1">
                <Database className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
                <span>Source Columns</span>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {selectedEvidence.sourceColumns.map((col, idx) => (
                  <span
                    key={idx}
                    className="font-mono text-xs text-slate-700 dark:text-slate-300 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 px-2 py-0.5 rounded-md"
                  >
                    {col}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 dark:border-white/6 bg-slate-50 dark:bg-[#111728] p-3.5">
              <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-xs mb-1">
                <FileSpreadsheet className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
                <span>Sample Size & Metric</span>
              </div>
              <div className="mt-2 font-mono text-xs text-slate-700 dark:text-slate-200">
                <div className="flex justify-between py-1 border-b border-slate-200/60 dark:border-white/5">
                  <span className="text-slate-500 dark:text-slate-400">Sample Records:</span>
                  <span className="text-slate-900 dark:text-white font-semibold">{selectedEvidence.sampleSize}</span>
                </div>
                <div className="flex justify-between py-1 pt-1.5">
                  <span className="text-slate-500 dark:text-slate-400">Primary Metric:</span>
                  <span className="text-indigo-600 dark:text-indigo-300 font-semibold">{selectedEvidence.relevantMetric}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Methodology */}
          <div className="space-y-2">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Analytical Methodology
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed border-l-2 border-indigo-500 pl-3 py-0.5 bg-slate-50/50 dark:bg-transparent rounded-r">
              {selectedEvidence.methodology}
            </p>
          </div>

          {/* Source Data Snippet */}
          {selectedEvidence.dataSliceSnippet && selectedEvidence.dataSliceSnippet.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Data Slice Sample
                </span>
                <span className="text-[11px] text-slate-400 dark:text-slate-500 font-mono">
                  {selectedEvidence.dataSliceSnippet.length} sample rows
                </span>
              </div>

              <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-white/8 bg-white dark:bg-black/50">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="border-b border-slate-200 dark:border-white/8 bg-slate-50 dark:bg-white/5 text-[11px] text-slate-500 dark:text-slate-400">
                    <tr>
                      {Object.keys(selectedEvidence.dataSliceSnippet[0]).map((head, i) => (
                        <th key={i} className="px-3 py-2 whitespace-nowrap">
                          {head}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-white/5 text-slate-700 dark:text-slate-300">
                    {selectedEvidence.dataSliceSnippet.map((row, rIdx) => (
                      <tr key={rIdx} className="hover:bg-slate-50 dark:hover:bg-white/5">
                        {Object.values(row).map((val, cIdx) => (
                          <td key={cIdx} className="px-3 py-1.5 whitespace-nowrap text-[11px] tabular-nums">
                            {String(val ?? '—')}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 mt-auto border-t border-slate-200 dark:border-white/8 bg-slate-50 dark:bg-[#0C111D] px-6 py-3.5 text-right">
          <button
            onClick={closeEvidenceDrawer}
            className="rounded-lg bg-slate-200 dark:bg-white/10 px-4 py-2 text-xs font-semibold text-slate-800 dark:text-white hover:bg-slate-300 dark:hover:bg-white/15 transition-colors"
          >
            Close Audit View
          </button>
        </div>
      </div>
    </div>
  );
};
