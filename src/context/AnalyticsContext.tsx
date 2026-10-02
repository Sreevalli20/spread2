import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  analyzeDataset as analyzeDatasetAPI,
  askQuestion as askQuestionAPI,
} from '../lib/api';
import {
  ChatMessage,
  WorkspaceSettings,
  AnalysisResponse,
  AskResponse,
} from '../types/analytics';

export type AppView = 'overview' | 'analyze' | 'insights' | 'ask' | 'reports' | 'data' | 'settings';
export type AppTheme = 'dark' | 'light';

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'info' | 'anomaly' | 'success';
}

interface AnalyticsContextType {
  currentView: AppView;
  setCurrentView: (view: AppView) => void;
  theme: AppTheme;
  toggleTheme: () => void;
  setTheme: (theme: AppTheme) => void;
  analysis: AnalysisResponse | null;
  isLoading: boolean;
  uploadProgress: number | null;
  error: string | null;
  selectedEvidence: any;
  isEvidenceDrawerOpen: boolean;
  openEvidenceDrawer: (evidenceId: string) => void;
  closeEvidenceDrawer: () => void;
  chatMessages: ChatMessage[];
  isAiThinking: boolean;
  sendChatMessage: (question: string) => void;
  settings: WorkspaceSettings;
  updateSettings: (newSettings: Partial<WorkspaceSettings>) => void;
  notifications: NotificationItem[];
  markNotificationAsRead: (id: string) => void;
  clearAllNotifications: () => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  handleFileUpload: (file: File) => Promise<void>;
}

const DEFAULT_SETTINGS: WorkspaceSettings = {
  workspaceName: 'My Workspace',
  organization: 'My Organization',
  currency: 'USD ($)',
  dateFormat: 'YYYY-MM-DD',
  anomalySensitivity: 'standard',
  confidenceThreshold: 90,
  autoAnalyzeOnUpload: true,
  emailAlerts: true,
};

const AnalyticsContext = createContext<AnalyticsContextType | undefined>(undefined);

export function AnalyticsProvider({ children }: { children: ReactNode }) {
  const [currentView, setCurrentView] = useState<AppView>('overview');
  const [theme, setThemeState] = useState<AppTheme>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('decisionlens_theme');
      if (saved === 'light' || saved === 'dark') return saved;
    }
    return 'dark';
  });

  const [analysis, setAnalysis] = useState<AnalysisResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedEvidenceId, setSelectedEvidenceId] = useState<string | null>(null);
  const [isEvidenceDrawerOpen, setIsEvidenceDrawerOpen] = useState<boolean>(false);
  const [settings, setSettings] = useState<WorkspaceSettings>(DEFAULT_SETTINGS);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    try {
      localStorage.setItem('decisionlens_theme', theme);
    } catch {}
  }, [theme]);

  const toggleTheme = () => {
    setThemeState((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const setTheme = (newTheme: AppTheme) => {
    setThemeState(newTheme);
  };

  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [isAiThinking, setIsAiThinking] = useState<boolean>(false);

  // Load analysis from sessionStorage on mount
  useEffect(() => {
    try {
      const stored = sessionStorage.getItem('analysisResult');
      if (stored) {
        const loadedAnalysis = JSON.parse(stored);
        setAnalysis(loadedAnalysis);
        // Set welcome message based on active analysis
        setChatMessages([
          {
            id: 'msg-welcome',
            role: 'assistant',
            content: `Active dataset: ${loadedAnalysis.dataset_name} (${loadedAnalysis.data_quality?.row_count?.toLocaleString() || 0} rows). Ask questions about your data and get evidence-grounded answers.`,
            timestamp: 'Just now',
          },
        ]);
      } else {
        // No analysis loaded
        setChatMessages([
          {
            id: 'msg-welcome',
            role: 'assistant',
            content: 'Welcome to DecisionLens. Upload a dataset to begin your analysis. Once analyzed, you can ask questions about your data and get evidence-grounded answers.',
            timestamp: 'Just now',
          },
        ]);
      }
    } catch (err) {
      console.error('Failed to load stored analysis:', err);
      setChatMessages([
        {
          id: 'msg-welcome',
          role: 'assistant',
          content: 'Welcome to DecisionLens. Upload a dataset to begin your analysis. Once analyzed, you can ask questions about your data and get evidence-grounded answers.',
          timestamp: 'Just now',
        },
      ]);
    }
  }, []);

  const openEvidenceDrawer = (evidenceId: string) => {
    setSelectedEvidenceId(evidenceId);
    setIsEvidenceDrawerOpen(true);
  };

  const closeEvidenceDrawer = () => {
    setIsEvidenceDrawerOpen(false);
    setSelectedEvidenceId(null);
  };

  const selectedEvidence = selectedEvidenceId && analysis?.evidence?.[selectedEvidenceId]
    ? { ...analysis.evidence[selectedEvidenceId], id: selectedEvidenceId }
    : null;

  const handleFileUpload = async (file: File) => {
    setIsLoading(true);
    setError(null);
    setUploadProgress(15);

    try {
      const progressTimer = setInterval(() => {
        setUploadProgress((prev) => (prev !== null && prev < 85 ? prev + 25 : prev));
      }, 150);

      const newAnalysis = await analyzeDatasetAPI(file);
      clearInterval(progressTimer);
      setUploadProgress(100);

      setAnalysis(newAnalysis);
      sessionStorage.setItem('analysisResult', JSON.stringify(newAnalysis));

      // Update welcome message to reflect new active dataset
      setChatMessages([
        {
          id: 'msg-welcome',
          role: 'assistant',
          content: `Active dataset: ${newAnalysis.dataset_name} (${newAnalysis.data_quality?.row_count?.toLocaleString() || 0} rows). Ask questions about your data and get evidence-grounded answers.`,
          timestamp: 'Just now',
        },
      ]);

      setTimeout(() => {
        setUploadProgress(null);
        setIsLoading(false);
        setCurrentView('overview');
      }, 400);
    } catch (err: any) {
      clearInterval?.();
      setUploadProgress(null);
      setIsLoading(false);
      setError(err?.message || 'Failed to analyze dataset. Please try again.');
    }
  };

  const updateSettings = (newSettings: Partial<WorkspaceSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const sendChatMessage = async (question: string) => {
    if (!question.trim() || !analysis) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: question,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setChatMessages((prev) => [...prev, userMsg]);
    setIsAiThinking(true);

    try {
      const response: AskResponse = await askQuestionAPI(question, analysis);

      const assistantMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        role: 'assistant',
        content: response.answer,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        evidenceReferences: response.evidence_ids,
        findingReferences: response.finding_ids,
        limitations: response.limitations,
      };

      setChatMessages((prev) => [...prev, assistantMsg]);
    } catch (err: any) {
      const errorMsg: ChatMessage = {
        id: `ai-error-${Date.now()}`,
        role: 'assistant',
        content: `Sorry, I couldn't process your question. ${err?.message || 'The AI service may be temporarily unavailable.'}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        limitations: ['AI service unavailable'],
      };
      setChatMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsAiThinking(false);
    }
  };

  return (
    <AnalyticsContext.Provider
      value={{
        currentView,
        setCurrentView,
        theme,
        toggleTheme,
        setTheme,
        analysis,
        isLoading,
        uploadProgress,
        error,
        selectedEvidence,
        isEvidenceDrawerOpen,
        openEvidenceDrawer,
        closeEvidenceDrawer,
        chatMessages,
        isAiThinking,
        sendChatMessage,
        settings,
        updateSettings,
        notifications,
        markNotificationAsRead,
        clearAllNotifications,
        isSearchOpen,
        setIsSearchOpen,
        handleFileUpload,
      }}
    >
      {children}
    </AnalyticsContext.Provider>
  );
}

export function useAnalytics() {
  const context = useContext(AnalyticsContext);
  if (!context) {
    throw new Error('useAnalytics must be used within an AnalyticsProvider');
  }
  return context;
}
