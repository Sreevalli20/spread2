import React, { useState, useRef } from 'react';
import { useAnalytics } from '../../context/AnalyticsContext';
import {
  UploadCloud,
  FileSpreadsheet,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  FileCheck,
  Table,
  Calendar,
  Layers,
  Sparkles,
  ArrowRight,
  Database,
} from 'lucide-react';

export const AnalyzeView: React.FC = () => {
  const {
    analysis,
    handleFileUpload,
    isLoading,
    uploadProgress,
    error,
    setCurrentView,
  } = useAnalytics();

  const [isDragOver, setIsDragOver] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const onDragLeave = () => {
    setIsDragOver(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      processSelectedFile(files[0]);
    }
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processSelectedFile(e.target.files[0]);
    }
  };

  const processSelectedFile = (file: File) => {
    const validExtensions = ['.csv', '.xlsx', '.xls'];
    const hasValidExt = validExtensions.some((ext) => file.name.toLowerCase().endsWith(ext));

    if (!hasValidExt) {
      alert('Please upload a valid CSV or XLSX file.');
      return;
    }

    setSelectedFile(file);
    handleFileUpload(file);
  };

  const triggerBrowse = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header explanation */}
      <div>
        <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
          Data Ingestion & Pipeline Workspace
        </h1>
        <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
          Upload enterprise ledger spreadsheets or transactional records. DecisionLens validates
          schema integrity, detects date/numeric vectors, computes mathematical KPIs, and
          constructs traceable audit evidence.
        </p>
      </div>

      {/* Upload Drop Zone Card */}
      <div
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        className={`relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-8 text-center transition-all duration-200 ${
          isDragOver
            ? 'border-indigo-500 bg-indigo-500/10'
            : 'border-slate-300 dark:border-white/12 bg-white dark:bg-[#101625]/60 hover:border-slate-400 dark:hover:border-white/25 hover:bg-slate-50 dark:hover:bg-[#12192B]'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".csv, .xlsx, .xls"
          onChange={onFileChange}
          className="hidden"
        />

        <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-indigo-200 dark:border-indigo-500/25 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 mb-4 shadow-sm">
          <UploadCloud className="h-7 w-7" />
        </div>

        <h3 className="text-base font-semibold text-slate-900 dark:text-white">
          Drag & drop your dataset here
        </h3>
        <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400 max-w-md">
          Supports <span className="font-mono text-slate-700 dark:text-slate-300">.CSV</span> and{' '}
          <span className="font-mono text-slate-700 dark:text-slate-300">.XLSX</span> files up to 10MB.
        </p>

        {/* Action Controls */}
        <div className="mt-5">
          <button
            type="button"
            onClick={triggerBrowse}
            disabled={isLoading}
            className="rounded-lg bg-indigo-600 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-500 transition-colors shadow-xs disabled:opacity-50"
          >
            Browse Files
          </button>
        </div>

        {/* Progress or Processing indicator */}
        {isLoading && uploadProgress !== null && (
          <div className="mt-6 w-full max-w-md space-y-2">
            <div className="flex justify-between text-xs font-mono text-indigo-600 dark:text-indigo-300">
              <span>Analyzing dataset...</span>
              <span>{uploadProgress}%</span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
              <div
                className="h-full bg-indigo-600 dark:bg-indigo-500 transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          </div>
        )}

        {/* Validation Errors */}
        {error && (
          <div className="mt-4 flex items-center gap-2 rounded-lg border border-rose-300 dark:border-rose-500/30 bg-rose-50 dark:bg-rose-500/10 px-3 py-2 text-xs text-rose-700 dark:text-rose-300 font-mono">
            <AlertTriangle className="h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}
      </div>

      {/* Dataset Overview (if dataset active) */}
      {analysis && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileCheck className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Active Dataset Overview
              </h2>
            </div>
            <button
              onClick={() => setCurrentView('overview')}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 transition-colors"
            >
              <span>View Dashboard</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="rounded-xl border border-slate-200 dark:border-white/8 bg-white dark:bg-[#101625]/90 p-4 shadow-xs">
              <span className="text-[11px] font-mono uppercase text-slate-400 dark:text-slate-500">Dataset Name</span>
              <div className="mt-1 font-semibold text-slate-900 dark:text-white text-sm truncate">
                {analysis.dataset_name}
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 dark:border-white/8 bg-white dark:bg-[#101625]/90 p-4 shadow-xs">
              <span className="text-[11px] font-mono uppercase text-slate-400 dark:text-slate-500">Total Rows</span>
              <div className="mt-1 font-bold text-slate-900 dark:text-white text-lg font-mono tabular-nums">
                {analysis.data_quality.row_count.toLocaleString()}
              </div>
              <span className="text-[11px] font-mono text-slate-500 dark:text-slate-500">
                {analysis.data_quality.column_count} columns
              </span>
            </div>

            <div className="rounded-xl border border-slate-200 dark:border-white/8 bg-white dark:bg-[#101625]/90 p-4 shadow-xs">
              <span className="text-[11px] font-mono uppercase text-slate-400 dark:text-slate-500">Quality Score</span>
              <div className="mt-1 font-bold text-emerald-600 dark:text-emerald-400 text-lg font-mono tabular-nums">
                {analysis.data_quality.score.toFixed(1)}%
              </div>
              <span className="text-[11px] font-mono text-slate-500 dark:text-slate-500">
                {analysis.data_quality.missing_cells} missing cells
              </span>
            </div>

            <div className="rounded-xl border border-slate-200 dark:border-white/8 bg-white dark:bg-[#101625]/90 p-4 shadow-xs">
              <span className="text-[11px] font-mono uppercase text-slate-400 dark:text-slate-500">Analysis Time</span>
              <div className="mt-1 flex items-center gap-1.5 text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="h-4 w-4" />
                <span>{analysis.processing_time.toFixed(2)}s</span>
              </div>
              <span className="text-[11px] font-mono text-slate-500 dark:text-slate-500">Complete</span>
            </div>
          </div>

          {/* Column Profile Table Preview */}
          <div className="rounded-xl border border-slate-200 dark:border-white/8 bg-white dark:bg-[#101625]/90 p-5 shadow-xs">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-800 dark:text-slate-300 mb-4">
              Detected Columns
            </h3>

            <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-white/5">
              <table className="w-full text-left text-xs font-mono">
                <thead className="border-b border-slate-200 dark:border-white/8 bg-slate-50 dark:bg-white/3 text-[11px] text-slate-500 dark:text-slate-400">
                  <tr>
                    <th className="px-4 py-2.5">Field Name</th>
                    <th className="px-4 py-2.5">Data Type</th>
                    <th className="px-4 py-2.5">Missing</th>
                    <th className="px-4 py-2.5">Unique</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-white/5 text-slate-700 dark:text-slate-300">
                  {analysis.columns.map((col, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-white/3">
                      <td className="px-4 py-2 font-semibold text-slate-900 dark:text-white">{col.name}</td>
                      <td className="px-4 py-2">
                        <span className="text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-500/10 px-2 py-0.5 rounded text-[11px] border border-indigo-200 dark:border-indigo-500/20">
                          {col.dtype}
                        </span>
                      </td>
                      <td className="px-4 py-2 tabular-nums">{col.missing_count}</td>
                      <td className="px-4 py-2 tabular-nums">{col.unique_count}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
