import React from 'react';

export const MetricCardSkeleton: React.FC = () => (
  <div className="flex flex-col justify-between rounded-xl border border-slate-200 dark:border-white/5 bg-slate-100/70 dark:bg-[#101625]/60 p-4 animate-pulse">
    <div className="flex items-center justify-between">
      <div className="h-3 w-20 rounded bg-slate-300 dark:bg-slate-800" />
      <div className="h-3 w-3 rounded-full bg-slate-300 dark:bg-slate-800" />
    </div>
    <div className="mt-4 flex items-baseline justify-between">
      <div className="h-7 w-28 rounded bg-slate-300 dark:bg-slate-800" />
      <div className="h-6 w-16 rounded bg-slate-200 dark:bg-slate-800/60" />
    </div>
    <div className="mt-4 h-3 w-32 rounded bg-slate-200 dark:bg-slate-800/40" />
  </div>
);

export const ChartSkeleton: React.FC<{ height?: string }> = ({ height = 'h-64' }) => (
  <div className={`w-full ${height} rounded-xl border border-slate-200 dark:border-white/5 bg-slate-100/70 dark:bg-[#101625]/60 p-5 animate-pulse flex flex-col justify-between`}>
    <div className="flex items-center justify-between">
      <div className="h-4 w-36 rounded bg-slate-300 dark:bg-slate-800" />
      <div className="h-4 w-24 rounded bg-slate-200 dark:bg-slate-800/50" />
    </div>
    <div className="space-y-3 my-4">
      <div className="h-2 w-full rounded bg-slate-200 dark:bg-slate-800/30" />
      <div className="h-2 w-5/6 rounded bg-slate-200 dark:bg-slate-800/30" />
      <div className="h-2 w-4/6 rounded bg-slate-200 dark:bg-slate-800/30" />
      <div className="h-2 w-full rounded bg-slate-200 dark:bg-slate-800/30" />
    </div>
    <div className="h-3 w-48 rounded bg-slate-200 dark:bg-slate-800/40" />
  </div>
);

export const TableSkeleton: React.FC<{ rows?: number }> = ({ rows = 5 }) => (
  <div className="w-full rounded-xl border border-slate-200 dark:border-white/5 bg-slate-100/70 dark:bg-[#101625]/60 p-4 animate-pulse space-y-3">
    <div className="h-4 w-full rounded bg-slate-300 dark:bg-slate-800/60" />
    {Array.from({ length: rows }).map((_, i) => (
      <div key={i} className="h-8 w-full rounded bg-slate-200 dark:bg-slate-800/30" />
    ))}
  </div>
);
