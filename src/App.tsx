/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AnalyticsProvider } from './context/AnalyticsContext';
import { AppShell } from './components/layout/AppShell';
import { ErrorBoundary } from './components/common/ErrorBoundary';

export default function App() {
  return (
    <ErrorBoundary>
      <AnalyticsProvider>
        <AppShell />
      </AnalyticsProvider>
    </ErrorBoundary>
  );
}
