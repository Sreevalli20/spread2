import React, { useState } from 'react';
import { useAnalytics } from '../../context/AnalyticsContext';
import { ThemeToggle } from '../layout/ThemeToggle';
import { checkHealth } from '../../lib/api';
import {
  Settings,
  Server,
  Database,
  CheckCircle2,
  XCircle,
  Trash2,
  Save,
  Sun,
  Moon,
  Palette,
  Info,
} from 'lucide-react';

export const SettingsView: React.FC = () => {
  const { settings, updateSettings, theme, setTheme, analysis } = useAnalytics();
  const [localSettings, setLocalSettings] = useState(settings);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [apiStatus, setApiStatus] = useState<'checking' | 'online' | 'offline'>('checking');
  const [apiUrl] = useState(import.meta.env.VITE_API_URL || 'https://decisionlens-backend.onrender.com');

  React.useEffect(() => {
    checkApiHealth();
  }, []);

  const checkApiHealth = async () => {
    setApiStatus('checking');
    try {
      await checkHealth();
      setApiStatus('online');
    } catch (error) {
      setApiStatus('offline');
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(localSettings);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleClearData = () => {
    sessionStorage.removeItem('analysisResult');
    window.location.reload();
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">Application Settings</h1>
        <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
          Configure application preferences and view system status.
        </p>
      </div>

      {/* System Status */}
      <div className="rounded-xl border border-slate-200 dark:border-white/8 bg-white dark:bg-[#101625]/90 p-5 space-y-4 shadow-xs">
        <div className="flex items-center gap-2 border-b border-slate-100 dark:border-white/5 pb-3">
          <Server className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
          <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-800 dark:text-slate-300">
            System Status
          </h2>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-600 dark:text-slate-400">Backend API</span>
              <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500">{apiUrl}</span>
            </div>
            <div className="flex items-center gap-2">
              {apiStatus === 'checking' && (
                <span className="text-xs text-slate-500 dark:text-slate-400">Checking...</span>
              )}
              {apiStatus === 'online' && (
                <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>Online</span>
                </div>
              )}
              {apiStatus === 'offline' && (
                <div className="flex items-center gap-1.5 text-xs text-rose-600 dark:text-rose-400">
                  <XCircle className="h-3.5 w-3.5" />
                  <span>Offline</span>
                </div>
              )}
              <button
                onClick={checkApiHealth}
                className="text-[10px] text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                Refresh
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-600 dark:text-slate-400">Active Dataset</span>
            <span className="text-xs font-mono text-slate-900 dark:text-white">
              {analysis ? analysis.dataset_name : 'None'}
            </span>
          </div>

          {analysis && (
            <>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-600 dark:text-slate-400">Records</span>
                <span className="text-xs font-mono text-slate-900 dark:text-white">
                  {analysis.data_quality?.row_count?.toLocaleString() || 0}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-600 dark:text-slate-400">Data Quality</span>
                <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400">
                  {analysis.data_quality?.score?.toFixed(1) || 0}%
                </span>
              </div>
            </>
          )}
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Appearance & Theme */}
        <div className="rounded-xl border border-slate-200 dark:border-white/8 bg-white dark:bg-[#101625]/90 p-5 space-y-4 shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-3">
            <div className="flex items-center gap-2">
              <Palette className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
              <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-800 dark:text-slate-300">
                Visual Theme
              </h2>
            </div>
            <ThemeToggle />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setTheme('light')}
              className={`rounded-xl border p-4 text-left transition-all cursor-pointer ${
                theme === 'light'
                  ? 'border-indigo-600 bg-indigo-50/50 shadow-xs'
                  : 'border-slate-200 bg-slate-50/50 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-900 font-semibold text-xs">
                  <Sun className="h-4 w-4 text-amber-500" />
                  <span>Light Theme</span>
                </div>
              </div>
              <p className="mt-1.5 text-[11px] text-slate-500">
                Clean off-white surfaces with dark slate text.
              </p>
            </button>

            <button
              type="button"
              onClick={() => setTheme('dark')}
              className={`rounded-xl border p-4 text-left transition-all cursor-pointer ${
                theme === 'dark'
                  ? 'border-indigo-500 bg-indigo-500/10 shadow-xs'
                  : 'border-white/8 bg-white/2 hover:border-white/15'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-white font-semibold text-xs">
                  <Moon className="h-4 w-4 text-indigo-400" />
                  <span>Dark Theme</span>
                </div>
              </div>
              <p className="mt-1.5 text-[11px] text-slate-400">
                Deep near-black slate canvas with high contrast.
              </p>
            </button>
          </div>
        </div>

        {/* Data Management */}
        <div className="rounded-xl border border-slate-200 dark:border-white/8 bg-white dark:bg-[#101625]/90 p-5 space-y-4 shadow-xs">
          <div className="flex items-center gap-2 border-b border-slate-100 dark:border-white/5 pb-3">
            <Database className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
            <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-800 dark:text-slate-300">
              Data Management
            </h2>
          </div>

          <div className="flex items-start gap-3">
            <Info className="h-4 w-4 text-slate-400 dark:text-slate-500 mt-0.5 shrink-0" />
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Clearing analysis data will remove the current dataset and all generated insights from your session.
              You will need to upload a new dataset to continue.
            </p>
          </div>

          <button
            type="button"
            onClick={handleClearData}
            className="flex items-center gap-2 rounded-lg border border-rose-200 dark:border-rose-500/20 bg-rose-50 dark:bg-rose-500/5 px-4 py-2.5 text-xs font-semibold text-rose-700 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-500/10 transition-colors"
          >
            <Trash2 className="h-3.5 w-3.5" />
            <span>Clear Analysis Data</span>
          </button>
        </div>

        {/* Submit Bar */}
        <div className="flex items-center justify-between border-t border-slate-200 dark:border-white/8 pt-4">
          <div className="text-xs text-slate-500 dark:text-slate-400">
            {savedSuccess && (
              <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-mono font-medium">
                <CheckCircle2 className="h-4 w-4" />
                <span>Settings saved successfully</span>
              </span>
            )}
          </div>

          <button
            type="submit"
            className="flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2 text-xs font-semibold text-white hover:bg-indigo-500 transition-colors shadow-xs cursor-pointer"
          >
            <Save className="h-3.5 w-3.5" />
            <span>Save Settings</span>
          </button>
        </div>
      </form>
    </div>
  );
};
