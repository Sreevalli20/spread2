import React, { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  children?: ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
  children,
}) => {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-slate-200 dark:border-white/5 bg-white dark:bg-[#101625]/40 py-12 px-6 text-center shadow-xs">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-400 mb-4">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="text-base font-semibold text-slate-900 dark:text-white tracking-tight">{title}</h3>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400 max-w-md leading-relaxed">{description}</p>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="mt-5 inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-indigo-500 shadow-sm cursor-pointer"
        >
          {actionLabel}
        </button>
      )}
      {children}
    </div>
  );
};
