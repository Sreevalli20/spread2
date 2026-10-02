import React, { useState } from 'react';
import { useAnalytics } from '../../context/AnalyticsContext';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import { EvidenceDrawer } from './EvidenceDrawer';
import { CommandMenu } from './CommandMenu';
import { DashboardView } from '../dashboard/DashboardView';
import { AnalyzeView } from '../analyze/AnalyzeView';
import { InsightsView } from '../insights/InsightsView';
import { AskDecisionLensView } from '../ask/AskDecisionLensView';
import { ReportView } from '../reports/ReportView';
import { DataView } from '../data/DataView';
import { SettingsView } from '../settings/SettingsView';

export const AppShell: React.FC = () => {
  const { currentView } = useAnalytics();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const renderCurrentView = () => {
    switch (currentView) {
      case 'overview':
        return <DashboardView />;
      case 'analyze':
        return <AnalyzeView />;
      case 'insights':
        return <InsightsView />;
      case 'ask':
        return <AskDecisionLensView />;
      case 'reports':
        return <ReportView />;
      case 'data':
        return <DataView />;
      case 'settings':
        return <SettingsView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-[#090D16] text-slate-900 dark:text-[#E2E8F0] selection:bg-indigo-600/30 selection:text-white overflow-x-hidden transition-colors duration-200">
      {/* Desktop & Mobile Sidebar */}
      <Sidebar
        isMobileOpen={mobileMenuOpen}
        onCloseMobile={() => setMobileMenuOpen(false)}
      />

      {/* Main Container */}
      <div className="flex flex-1 flex-col min-w-0">
        <TopBar onOpenMobileMenu={() => setMobileMenuOpen(true)} />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0 max-w-[1600px] w-full mx-auto">
          {renderCurrentView()}
        </main>
      </div>

      {/* Traceable Evidence Drawer & Audit Modal */}
      <EvidenceDrawer />

      {/* Global ⌘K Command Palette */}
      <CommandMenu />
    </div>
  );
};
