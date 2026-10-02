import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertCircle, RefreshCw, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorInfo: null,
    };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.setState({
      error,
      errorInfo,
    });
  }

  private handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
    window.location.reload();
  };

  private handleGoHome = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
    window.location.href = '/';
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-[#090D16] p-4">
          <div className="max-w-md w-full">
            <div className="rounded-xl border border-slate-200 dark:border-white/8 bg-white dark:bg-[#101625] p-8 shadow-xl text-center space-y-6">
              <div className="flex justify-center">
                <div className="h-16 w-16 rounded-full bg-rose-100 dark:bg-rose-500/10 flex items-center justify-center">
                  <AlertCircle className="h-8 w-8 text-rose-600 dark:text-rose-400" />
                </div>
              </div>

              <div className="space-y-2">
                <h1 className="text-xl font-bold text-slate-900 dark:text-white">
                  Something went wrong
                </h1>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  An unexpected error occurred. This has been logged and our team has been notified.
                </p>
              </div>

              {this.state.error && (
                <div className="rounded-lg border border-slate-200 dark:border-white/8 bg-slate-50 dark:bg-white/3 p-4 text-left">
                  <div className="text-xs font-mono text-slate-700 dark:text-slate-300 break-words">
                    {this.state.error.toString()}
                  </div>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={this.handleReset}
                  className="flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-500 transition-colors shadow-xs"
                >
                  <RefreshCw className="h-4 w-4" />
                  <span>Retry</span>
                </button>
                <button
                  onClick={this.handleGoHome}
                  className="flex items-center justify-center gap-2 rounded-lg border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/5 px-4 py-2.5 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/10 transition-colors"
                >
                  <Home className="h-4 w-4" />
                  <span>Back to Overview</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
