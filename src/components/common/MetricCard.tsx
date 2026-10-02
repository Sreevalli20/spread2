import React, { useState } from 'react';
import { KpiMetric } from '../../types/analytics';
import { Sparkline } from './Sparkline';
import { TrendingUp, TrendingDown, Info, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface MetricCardProps {
  metric: KpiMetric;
  onClick?: () => void;
}

export const MetricCard: React.FC<MetricCardProps> = ({ metric, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  const isPositive = (metric.changePercent ?? 0) >= 0;
  const isGood = metric.isPositiveGood ? isPositive : !isPositive;

  const sparkColor =
    metric.status === 'alert'
      ? '#F43F5E'
      : metric.status === 'warning'
      ? '#F59E0B'
      : isGood
      ? '#6366F1'
      : '#64748B';

  const statusDot =
    metric.status === 'alert'
      ? 'bg-rose-500'
      : metric.status === 'warning'
      ? 'bg-amber-500'
      : metric.status === 'excellent'
      ? 'bg-indigo-500'
      : 'bg-emerald-500';

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      className="group relative flex flex-col justify-between rounded-xl border border-slate-200/90 dark:border-white/8 bg-white dark:bg-[#101625]/90 p-4 transition-all duration-200 hover:border-indigo-500/40 dark:hover:border-white/20 hover:shadow-lg dark:hover:shadow-black/40 hover:bg-slate-50/80 dark:hover:bg-[#141C2E] cursor-pointer"
      tabIndex={0}
      role="region"
      aria-label={`${metric.label} KPI card`}
    >
      {/* Top row: Label & Info & Status Indicator */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className={`h-2 w-2 rounded-full ${statusDot}`} aria-hidden="true" />
          <span className="text-xs font-semibold tracking-wider text-slate-500 dark:text-slate-400 uppercase">
            {metric.label}
          </span>
        </div>

        <div className="flex items-center gap-1">
          <span className="text-[10px] font-mono font-medium text-slate-400 dark:text-slate-500 uppercase">
            {metric.unit}
          </span>
          <Info className="h-3.5 w-3.5 text-slate-400 dark:text-slate-500 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors" />
        </div>
      </div>

      {/* Middle row: Large value & Sparkline */}
      <div className="mt-3.5 flex items-baseline justify-between gap-3">
        <div className="min-w-0">
          <span className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white tabular-nums font-mono">
            {metric.formattedValue}
          </span>
        </div>
        <Sparkline data={metric.sparkline} color={sparkColor} width={88} height={32} />
      </div>

      {/* Bottom row: Delta & Contextual summary */}
      <div className="mt-3.5 flex items-center justify-between text-xs text-slate-600 dark:text-slate-400 border-t border-slate-100 dark:border-white/5 pt-2.5">
        {metric.changePercent !== undefined ? (
          <div className="flex items-center gap-1.5 font-mono">
            {metric.trend === 'up' ? (
              <TrendingUp
                className={`h-3.5 w-3.5 ${
                  isGood ? 'text-indigo-600 dark:text-indigo-400' : 'text-rose-600 dark:text-rose-400'
                }`}
              />
            ) : (
              <TrendingDown
                className={`h-3.5 w-3.5 ${
                  isGood ? 'text-indigo-600 dark:text-indigo-400' : 'text-rose-600 dark:text-rose-400'
                }`}
              />
            )}
            <span
              className={`font-semibold tabular-nums ${
                isGood ? 'text-indigo-600 dark:text-indigo-400' : 'text-rose-600 dark:text-rose-400'
              }`}
            >
              {metric.changePercent > 0 ? `+${metric.changePercent}%` : `${metric.changePercent}%`}
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-500 font-sans">
              vs benchmark
            </span>
          </div>
        ) : (
          <span className="text-slate-500 text-xs">Standard baseline</span>
        )}

        <span className="text-[11px] font-mono text-indigo-600 dark:text-indigo-400 font-medium">
          Audit &rarr;
        </span>
      </div>

      {/* Hover Floating Tooltip */}
      {isHovered && (
        <div
          className="pointer-events-none absolute left-1/2 -top-3 z-50 w-72 -translate-x-1/2 -translate-y-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0B0F19] p-3.5 text-xs text-slate-700 dark:text-slate-200 shadow-2xl transition-all duration-150 animate-in fade-in zoom-in-95"
          role="tooltip"
        >
          {/* Tooltip Header: Full KPI Label */}
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2 mb-2">
            <span className="font-semibold text-slate-900 dark:text-white text-xs">
              {metric.label}
            </span>
            <span className="rounded bg-indigo-50 dark:bg-indigo-500/10 px-1.5 py-0.5 font-mono text-[10px] font-semibold text-indigo-700 dark:text-indigo-300 border border-indigo-200/50 dark:border-indigo-500/20">
              {metric.unit}
            </span>
          </div>

          {/* Exact Current Value */}
          <div className="space-y-1 mb-2.5">
            <div className="text-[10px] uppercase font-mono tracking-wider text-slate-500 dark:text-slate-400">
              Exact Recorded Value
            </div>
            <div className="text-base font-bold font-mono text-slate-900 dark:text-white tabular-nums">
              {metric.exactValueFormatted}
            </div>
          </div>

          {/* Detailed Contextual Change */}
          <div className="rounded-lg bg-slate-50 dark:bg-white/4 border border-slate-100 dark:border-white/5 p-2 mb-2.5">
            <div className="text-[10px] uppercase font-mono tracking-wider text-indigo-600 dark:text-indigo-400 font-semibold mb-0.5">
              Contextual Analysis
            </div>
            <div className="text-xs text-slate-700 dark:text-slate-300 leading-snug">
              {metric.contextualChangeDetailed}
            </div>
          </div>

          {/* Formula & Description */}
          <div className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-2">
            <div className="font-mono text-indigo-600 dark:text-indigo-400 mb-0.5">
              Formula: {metric.formula}
            </div>
            <div>{metric.tooltip}</div>
          </div>

          {/* Tooltip arrow pointer */}
          <div className="absolute left-1/2 -bottom-1.5 -translate-x-1/2 h-3 w-3 rotate-45 border-r border-b border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0B0F19]" />
        </div>
      )}
    </div>
  );
};
