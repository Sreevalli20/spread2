import React, { useState } from 'react';
import { useAnalytics } from '../../context/AnalyticsContext';
import {
  Table2,
  FileCheck2,
  AlertCircle,
  Search,
  ChevronLeft,
  ChevronRight,
  Database,
  Calendar,
  Layers,
  CheckCircle2,
} from 'lucide-react';

export const DataView: React.FC = () => {
  const { analysis } = useAnalytics();

  if (!analysis) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <Database className="h-12 w-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">No Dataset Available</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Upload and analyze a dataset to view data profiling information.
          </p>
        </div>
      </div>
    );
  }

  const dataQuality = analysis.data_quality || {};
  const columns = analysis.columns || [];

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
          Dataset & Data Hygiene Profiling
        </h1>
        <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
          Inspect field type inferences, null frequencies, and distribution ranges.
        </p>
      </div>

      {/* Summary Scorecards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="rounded-xl border border-slate-200 dark:border-white/8 bg-white dark:bg-[#101625]/90 p-4 shadow-xs">
          <span className="text-[11px] font-mono uppercase text-slate-400 dark:text-slate-500">Active Dataset</span>
          <div className="mt-1 text-sm font-semibold text-slate-900 dark:text-white truncate">
            {analysis.dataset_name}
          </div>
          <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
            {columns.length} columns detected
          </span>
        </div>

        <div className="rounded-xl border border-slate-200 dark:border-white/8 bg-white dark:bg-[#101625]/90 p-4 shadow-xs">
          <span className="text-[11px] font-mono uppercase text-slate-400 dark:text-slate-500">Volume & Breadth</span>
          <div className="mt-1 text-lg font-bold font-mono text-slate-900 dark:text-white tabular-nums">
            {dataQuality.row_count?.toLocaleString() || 0} rows
          </div>
          <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
            {dataQuality.column_count || 0} columns
          </span>
        </div>

        <div className="rounded-xl border border-slate-200 dark:border-white/8 bg-white dark:bg-[#101625]/90 p-4 shadow-xs">
          <span className="text-[11px] font-mono uppercase text-slate-400 dark:text-slate-500">Hygiene Score</span>
          <div className="mt-1 text-lg font-bold font-mono text-emerald-600 dark:text-emerald-400 tabular-nums">
            {dataQuality.score?.toFixed(1) || 0}%
          </div>
          <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
            {dataQuality.missing_cells || 0} null cells
          </span>
        </div>

        <div className="rounded-xl border border-slate-200 dark:border-white/8 bg-white dark:bg-[#101625]/90 p-4 shadow-xs">
          <span className="text-[11px] font-mono uppercase text-slate-400 dark:text-slate-500">Data Quality</span>
          <div className="mt-1 flex items-center gap-1.5 text-sm font-semibold text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 className="h-4 w-4" />
            <span>{dataQuality.duplicate_rows || 0} duplicates</span>
          </div>
          <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
            {dataQuality.invalid_dates || 0} date errors
          </span>
        </div>
      </div>

      {/* Data Quality Details */}
      <div className="rounded-xl border border-slate-200 dark:border-white/8 bg-white dark:bg-[#101625]/90 p-5 space-y-4 shadow-xs">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-3">
          <div className="flex items-center gap-2">
            <Layers className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
            <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-800 dark:text-slate-300">
              Data Quality Assessment
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
          <div>
            <span className="text-slate-400 dark:text-slate-500 block">Missing Cells</span>
            <span className="font-semibold text-slate-900 dark:text-white tabular-nums">
              {dataQuality.missing_cells || 0} ({dataQuality.missing_percentage?.toFixed(2) || 0}%)
            </span>
          </div>
          <div>
            <span className="text-slate-400 dark:text-slate-500 block">Duplicate Rows</span>
            <span className="font-semibold text-slate-900 dark:text-white tabular-nums">
              {dataQuality.duplicate_rows || 0} ({dataQuality.duplicate_percentage?.toFixed(2) || 0}%)
            </span>
          </div>
          <div>
            <span className="text-slate-400 dark:text-slate-500 block">Constant Columns</span>
            <span className="font-semibold text-slate-900 dark:text-white tabular-nums">
              {dataQuality.constant_columns || 0}
            </span>
          </div>
          <div>
            <span className="text-slate-400 dark:text-slate-500 block">Date Columns</span>
            <span className="font-semibold text-slate-900 dark:text-white tabular-nums">
              {dataQuality.date_columns || 0}
            </span>
          </div>
          <div>
            <span className="text-slate-400 dark:text-slate-500 block">Numeric Columns</span>
            <span className="font-semibold text-slate-900 dark:text-white tabular-nums">
              {dataQuality.numeric_columns || 0}
            </span>
          </div>
          <div>
            <span className="text-slate-400 dark:text-slate-500 block">Categorical Columns</span>
            <span className="font-semibold text-slate-900 dark:text-white tabular-nums">
              {dataQuality.categorical_columns || 0}
            </span>
          </div>
          <div>
            <span className="text-slate-400 dark:text-slate-500 block">Mixed Type Columns</span>
            <span className="font-semibold text-slate-900 dark:text-white tabular-nums">
              {dataQuality.mixed_type_columns || 0}
            </span>
          </div>
          <div>
            <span className="text-slate-400 dark:text-slate-500 block">Invalid Dates</span>
            <span className="font-semibold text-slate-900 dark:text-white tabular-nums">
              {dataQuality.invalid_dates || 0}
            </span>
          </div>
        </div>

        {dataQuality.reasons && dataQuality.reasons.length > 0 && (
          <div className="mt-4">
            <div className="text-[11px] font-semibold text-slate-800 dark:text-slate-300 mb-2">Quality Notes:</div>
            <ul className="text-xs text-slate-600 dark:text-slate-400 list-disc list-inside space-y-1">
              {dataQuality.reasons.map((reason, idx) => (
                <li key={idx}>{reason}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Column Profiling Table */}
      <div className="rounded-xl border border-slate-200 dark:border-white/8 bg-white dark:bg-[#101625]/90 p-5 space-y-4 shadow-xs">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-3">
          <div className="flex items-center gap-2">
            <Layers className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
            <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-800 dark:text-slate-300">
              Column Profiles
            </h2>
          </div>
          <span className="text-[11px] font-mono text-slate-400 dark:text-slate-500">
            {columns.length} Fields Evaluated
          </span>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-white/5">
          <table className="w-full text-left text-xs font-mono">
            <thead className="border-b border-slate-200 dark:border-white/8 bg-slate-50 dark:bg-white/3 text-[11px] text-slate-500 dark:text-slate-400">
              <tr>
                <th className="px-4 py-2.5">Field</th>
                <th className="px-4 py-2.5">Data Type</th>
                <th className="px-4 py-2.5">Role</th>
                <th className="px-4 py-2.5">Missing</th>
                <th className="px-4 py-2.5">Missing %</th>
                <th className="px-4 py-2.5">Unique Values</th>
                <th className="px-4 py-2.5">Constant?</th>
                <th className="px-4 py-2.5">Sample Values</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/5 text-slate-700 dark:text-slate-300">
              {columns.map((col, idx) => (
                <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-white/3">
                  <td className="px-4 py-2.5 font-semibold text-slate-900 dark:text-white">{col.name}</td>
                  <td className="px-4 py-2.5">
                    <span className="rounded bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/20 px-2 py-0.5 text-[11px] text-indigo-700 dark:text-indigo-300 font-medium">
                      {col.dtype}
                    </span>
                  </td>
                  <td className="px-4 py-2.5 text-slate-600 dark:text-slate-400">{col.role}</td>
                  <td className="px-4 py-2.5 tabular-nums text-slate-500 dark:text-slate-400">{col.missing_count}</td>
                  <td className="px-4 py-2.5 tabular-nums text-slate-500 dark:text-slate-400">{col.missing_percentage?.toFixed(2)}%</td>
                  <td className="px-4 py-2.5 tabular-nums text-slate-500 dark:text-slate-400">{col.unique_count}</td>
                  <td className="px-4 py-2.5 text-slate-500 dark:text-slate-400">{col.is_constant ? 'Yes' : 'No'}</td>
                  <td className="px-4 py-2.5 text-slate-500 dark:text-slate-500 truncate max-w-xs">
                    {col.sample_values?.slice(0, 3).join(', ') || '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
