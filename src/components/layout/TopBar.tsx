import React, { useState } from 'react';
import { useAnalytics, AppView } from '../../context/AnalyticsContext';
import { GlobalSearchBar } from './GlobalSearchBar';
import { ThemeToggle } from './ThemeToggle';
import {
  Bell,
  Menu,
  Plus,
  X,
} from 'lucide-react';

interface TopBarProps {
  onOpenMobileMenu: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ onOpenMobileMenu }) => {
  const {
    currentView,
    setCurrentView,
    analysis,
    notifications,
    markNotificationAsRead,
    clearAllNotifications,
  } = useAnalytics();

  const [showNotifications, setShowNotifications] = useState(false);

  const viewTitles: Record<AppView, { title: string; subtitle: string }> = {
    overview: { title: 'Executive Overview', subtitle: 'Enterprise Performance & KPIs' },
    analyze: { title: 'Data Ingestion & Pipeline', subtitle: 'Schema Verification & Processing' },
    insights: { title: 'Strategic Insights', subtitle: 'Findings, Trends & Risk Exposure' },
    ask: { title: 'Ask DecisionLens AI', subtitle: 'Conversational Analytical Querying' },
    reports: { title: 'Executive Board Report', subtitle: 'Formal Quarterly Analytics Synthesis' },
    data: { title: 'Dataset & Data Quality', subtitle: 'Column Profiling & Completeness' },
    settings: { title: 'Platform Settings', subtitle: 'Workspace Configurations & Alert Rules' },
  };

  const currentInfo = viewTitles[currentView] || { title: 'DecisionLens', subtitle: 'Analytics' };
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header className="sticky top-0 z-30 flex h-14 w-full items-center justify-between border-b border-slate-200 dark:border-white/8 bg-white/95 dark:bg-[#090D16]/90 px-3 sm:px-6 backdrop-blur-md transition-colors duration-200">
      {/* Left: Mobile Toggle & Page Title */}
      <div className="flex items-center gap-3 shrink-0">
        <button
          onClick={onOpenMobileMenu}
          className="rounded-lg p-1.5 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white md:hidden"
          aria-label="Toggle mobile menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-2 text-xs">
          <span className="font-semibold text-slate-900 dark:text-white tracking-tight">
            {currentInfo.title}
          </span>
          <span className="text-slate-400 dark:text-slate-600 hidden sm:inline">/</span>
          <span className="text-slate-500 dark:text-slate-400 hidden sm:inline">
            {currentInfo.subtitle}
          </span>
        </div>
      </div>

      {/* Middle: Prominent Global Search Bar */}
      <div className="flex-1 max-w-md mx-3 hidden sm:block">
        <GlobalSearchBar />
      </div>

      {/* Right: Actions, Theme Toggle, Notifications, Dataset status */}
      <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
        {/* Active Dataset Status indicator */}
        {analysis?.meta && (
          <div className="hidden xl:flex items-center gap-2 rounded-lg border border-slate-200 dark:border-white/6 bg-slate-50 dark:bg-white/3 px-2.5 py-1 text-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-slate-700 dark:text-slate-300 font-medium truncate max-w-[140px]">
              {analysis.meta.name}
            </span>
            <span className="text-slate-400 dark:text-slate-600">·</span>
            <span className="font-mono text-slate-500 dark:text-slate-400 tabular-nums">
              {analysis.meta.rowCount.toLocaleString()} rows
            </span>
          </div>
        )}

        {/* Global Theme Toggle Switch */}
        <ThemeToggle />

        {/* Analyze Quick Action Button */}
        {currentView !== 'analyze' && (
          <button
            onClick={() => setCurrentView('analyze')}
            className="hidden sm:inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-indigo-500 transition-colors shadow-xs"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Analyze Data</span>
          </button>
        )}

        {/* Notifications Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative rounded-lg p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white transition-colors"
            aria-label="View notifications"
          >
            <Bell className="h-4 w-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-indigo-500" />
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 top-11 z-50 w-80 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0E1422] p-3 shadow-2xl animate-in fade-in zoom-in-95">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-white/8">
                <span className="text-xs font-semibold text-slate-900 dark:text-white">
                  Platform Notifications
                </span>
                {notifications.length > 0 && (
                  <button
                    onClick={clearAllNotifications}
                    className="text-[11px] text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
                  >
                    Clear all
                  </button>
                )}
              </div>

              <div className="mt-2 space-y-2 max-h-72 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="py-6 text-center text-xs text-slate-400 dark:text-slate-500">
                    No new notifications
                  </div>
                ) : (
                  notifications.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => markNotificationAsRead(item.id)}
                      className={`rounded-lg p-2.5 transition-colors cursor-pointer text-xs ${
                        item.read
                          ? 'bg-transparent text-slate-500 dark:text-slate-400'
                          : 'bg-slate-50 dark:bg-white/5 text-slate-700 dark:text-slate-200'
                      } hover:bg-slate-100 dark:hover:bg-white/8`}
                    >
                      <div className="flex items-start justify-between gap-1">
                        <span className="font-semibold text-slate-900 dark:text-white">
                          {item.title}
                        </span>
                        <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono shrink-0">
                          {item.timestamp}
                        </span>
                      </div>
                      <p className="mt-1 text-slate-500 dark:text-slate-400 leading-relaxed text-[11px]">
                        {item.message}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
