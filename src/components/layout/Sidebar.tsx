import React, { useState } from 'react';
import { useAnalytics, AppView } from '../../context/AnalyticsContext';
import { ThemeToggle } from './ThemeToggle';
import {
  LayoutDashboard,
  UploadCloud,
  Lightbulb,
  MessageSquareCode,
  FileText,
  Table2,
  Settings,
  Layers,
  X,
} from 'lucide-react';

interface SidebarProps {
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isMobileOpen, onCloseMobile }) => {
  const { currentView, setCurrentView } = useAnalytics();

  const navItems: { id: AppView; label: string; icon: any; badge?: string }[] = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'analyze', label: 'Analyze', icon: UploadCloud },
    { id: 'insights', label: 'Insights', icon: Lightbulb },
    { id: 'ask', label: 'Ask DecisionLens', icon: MessageSquareCode, badge: 'AI' },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'data', label: 'Data', icon: Table2 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const handleNavClick = (viewId: AppView) => {
    setCurrentView(viewId);
    if (onCloseMobile) onCloseMobile();
  };

  const sidebarContent = (
    <div className="flex h-full flex-col justify-between bg-slate-50 dark:bg-[#080C15] border-r border-slate-200 dark:border-white/8 text-slate-700 dark:text-slate-300 transition-colors duration-200">
      {/* Top: Brand Wordmark */}
      <div className="p-4 border-b border-slate-200 dark:border-white/5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white shadow-md shadow-indigo-600/20">
              <Layers className="h-4 w-4" />
            </div>
            <div>
              <div className="text-sm font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-1.5">
                <span>DecisionLens</span>
                <span className="text-[10px] font-mono text-indigo-600 dark:text-indigo-400 font-normal">v2.6</span>
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-500 leading-none">Decision Intelligence</div>
            </div>
          </div>

          {onCloseMobile && (
            <button
              onClick={onCloseMobile}
              className="rounded-lg p-1 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white md:hidden"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        <div className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 font-mono">
          Platform Workspace
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`group flex w-full items-center justify-between rounded-lg px-3 py-2 text-xs font-medium transition-all duration-150 ${
                isActive
                  ? 'bg-indigo-50 dark:bg-indigo-600/15 text-indigo-700 dark:text-white border border-indigo-200/80 dark:border-indigo-500/30 font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200/50 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-slate-200 border border-transparent'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Icon
                  className={`h-4 w-4 transition-colors ${
                    isActive
                      ? 'text-indigo-600 dark:text-indigo-400'
                      : 'text-slate-400 dark:text-slate-500 group-hover:text-slate-700 dark:group-hover:text-slate-300'
                  }`}
                />
                <span>{item.label}</span>
              </div>

              {item.badge && (
                <span
                  className={`rounded px-1.5 py-0.2 text-[10px] font-mono ${
                    isActive
                      ? 'bg-indigo-100 dark:bg-indigo-500/30 text-indigo-700 dark:text-indigo-300 font-semibold'
                      : 'bg-slate-200/60 dark:bg-white/5 text-slate-500 dark:text-slate-400 group-hover:bg-slate-200 dark:group-hover:bg-white/10'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Bottom Area: Theme switch */}
      <div className="border-t border-slate-200 dark:border-white/8 p-3 bg-slate-100/60 dark:bg-[#060911]">
        <ThemeToggle />
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden md:flex md:w-60 md:shrink-0 md:flex-col h-screen sticky top-0 z-40">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            onClick={onCloseMobile}
          />
          <div className="relative z-10 w-64 max-w-full h-full shadow-2xl">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};
