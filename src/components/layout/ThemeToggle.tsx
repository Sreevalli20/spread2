import React from 'react';
import { useAnalytics } from '../../context/AnalyticsContext';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  compact?: boolean;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ compact = false }) => {
  const { theme, toggleTheme } = useAnalytics();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`relative inline-flex items-center rounded-lg border transition-all duration-200 cursor-pointer ${
        compact
          ? 'p-1.5 border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/10'
          : 'p-1 border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-white/20'
      }`}
      role="switch"
      aria-checked={isDark}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      <div className="flex items-center gap-1.5 px-1 py-0.5">
        <Sun
          className={`h-3.5 w-3.5 transition-colors ${
            !isDark ? 'text-amber-500 font-bold' : 'text-slate-400'
          }`}
        />
        <div
          className={`h-4 w-7 rounded-full p-0.5 transition-colors duration-200 ease-in-out ${
            isDark ? 'bg-indigo-600' : 'bg-slate-300'
          }`}
        >
          <div
            className={`h-3 w-3 rounded-full bg-white shadow-xs transition-transform duration-200 ease-in-out ${
              isDark ? 'translate-x-3' : 'translate-x-0'
            }`}
          />
        </div>
        <Moon
          className={`h-3.5 w-3.5 transition-colors ${
            isDark ? 'text-indigo-400 font-bold' : 'text-slate-400'
          }`}
        />
      </div>
    </button>
  );
};
