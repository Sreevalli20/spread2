import type { AnalysisResponse, AskResponse } from '../types/analytics';

const API_URL = import.meta.env.VITE_API_URL || 'https://decisionlens-backend.onrender.com';
const REQUEST_TIMEOUT = 120000; // 2 minutes for Render cold start + processing

async function fetchWithTimeout(url: string, options: RequestInit, timeout: number): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error('Request timeout. The service may be starting up. Please try again.');
    }
    throw error;
  }
}

export async function analyzeDataset(file: File): Promise<AnalysisResponse> {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetchWithTimeout(
    `${API_URL}/api/analyze`,
    {
      method: 'POST',
      body: formData,
    },
    REQUEST_TIMEOUT
  );

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'Failed to analyze dataset' }));
    throw new Error(error.detail || 'Failed to analyze dataset');
  }

  const data = await response.json();
  return transformBackendResponse(data);
}

export async function askQuestion(
  question: string,
  analysisData: any
): Promise<AskResponse> {
  const response = await fetchWithTimeout(
    `${API_URL}/api/ask`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        question,
        analysis_data: analysisData,
      }),
    },
    60000 // 1 minute timeout for ask
  );

  if (!response.ok) {
    throw new Error('Failed to ask question');
  }

  return response.json();
}

export async function checkHealth(): Promise<{ status: string; service: string; version: string }> {
  const response = await fetch(`${API_URL}/api/health`);
  return response.json();
}

// Transform backend response to match frontend types
function transformBackendResponse(data: any): AnalysisResponse {
  return {
    success: data.success,
    dataset_name: data.dataset_name,
    columns: data.columns || [],
    data_quality: data.data_quality || {
      row_count: 0,
      column_count: 0,
      missing_cells: 0,
      missing_percentage: 0,
      duplicate_rows: 0,
      duplicate_percentage: 0,
      constant_columns: 0,
      date_columns: 0,
      numeric_columns: 0,
      categorical_columns: 0,
      mixed_type_columns: 0,
      invalid_dates: 0,
      infinite_values: 0,
      suspicious_values: 0,
      score: 0,
      reasons: [],
    },
    kpis: (data.kpis || []).map((kpi: any) => ({
      id: kpi.id || `kpi-${Math.random().toString(36).substr(2, 9)}`,
      name: kpi.name || kpi.label || 'Unknown',
      value: kpi.value || 0,
      formatted_value: kpi.formatted_value || kpi.formattedValue || kpi.value?.toString() || '0',
      unit: kpi.unit || null,
      calculation: kpi.calculation || kpi.formula || '',
      source_columns: kpi.source_columns || [],
      coverage: kpi.coverage || 100,
      warnings: kpi.warnings || [],
    })),
    trends: data.trends || [],
    anomalies: data.anomalies || [],
    segment_comparisons: data.segment_comparisons || [],
    findings: data.findings || [],
    evidence: data.evidence || {},
    ai_insight: data.ai_insight || null,
    processing_time: data.processing_time || 0,
    error: data.error || null,
  };
}
