export interface RawDataRow {
  [key: string]: string | number | null | undefined;
}

export interface ColumnProfile {
  name: string;
  type: 'numeric' | 'date' | 'category' | 'text';
  missingCount: number;
  uniqueCount: number;
  sampleValues: (string | number)[];
  min?: number;
  max?: number;
  mean?: number;
}

export interface DatasetMeta {
  id: string;
  name: string;
  fileName: string;
  fileSize: string;
  uploadedAt: string;
  rowCount: number;
  columnCount: number;
  qualityScore: number; // 0 - 100
  missingValuesCount: number;
  invalidDatesCount: number;
  detectedDateCol?: string;
  detectedRevenueCol?: string;
  detectedCostCol?: string;
  detectedUnitsCol?: string;
  detectedOrdersCol?: string;
  detectedCategoryCol?: string;
  detectedRegionCol?: string;
  columns: ColumnProfile[];
}

export interface KpiMetric {
  id: string;
  label: string;
  value: number;
  formattedValue: string;
  exactValueFormatted: string;
  contextualChangeDetailed: string;
  previousValue?: number;
  changePercent?: number; // e.g., +14.2%
  trend: 'up' | 'down' | 'neutral';
  isPositiveGood: boolean;
  sparkline: number[];
  unit: string;
  tooltip: string;
  status: 'nominal' | 'warning' | 'alert' | 'excellent';
  formula: string;
}

export interface TimeSeriesPoint {
  date: string;
  revenue: number;
  cost: number;
  profit: number;
  margin: number;
  orders: number;
  units: number;
}

export interface CategoryMetric {
  category: string;
  revenue: number;
  profit: number;
  margin: number;
  orders: number;
  percentageOfTotal: number;
}

export interface AnomalyItem {
  id: string;
  date: string;
  metric: string;
  observedValue: number;
  expectedValue: number;
  deviationPercent: number;
  severity: 'low' | 'medium' | 'high';
  explanation: string;
  evidenceId: string;
}

export interface InsightFinding {
  id: string;
  category: 'Key findings' | 'Trends' | 'Anomalies' | 'Opportunities' | 'Risks';
  title: string;
  explanation: string;
  impact: string;
  evidenceId: string;
  relatedKpi: string;
  severity: 'info' | 'positive' | 'warning' | 'critical';
  details: string;
  actionRecommendation: string;
}

export interface EvidenceRecord {
  id: string;
  findingRelationship: string;
  calculation: string;
  sourceColumns: string[];
  sampleSize: number;
  values: { label: string; value: string | number }[];
  methodology: string;
  relevantMetric: string;
  confidenceScore: number; // 0 - 100
  dataSliceSnippet?: RawDataRow[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  evidenceReferences?: string[];
  findingReferences?: string[];
  limitations?: string[];
}

export interface WorkspaceSettings {
  workspaceName: string;
  organization: string;
  currency: string;
  dateFormat: string;
  anomalySensitivity: 'conservative' | 'standard' | 'aggressive';
  confidenceThreshold: number;
  autoAnalyzeOnUpload: boolean;
  emailAlerts: boolean;
}

// Backend response types
export interface ColumnInfo {
  name: string;
  dtype: string;
  role: string;
  missing_count: number;
  missing_percentage: number;
  unique_count: number;
  is_constant: boolean;
  sample_values: string[];
}

export interface DataQuality {
  row_count: number;
  column_count: number;
  missing_cells: number;
  missing_percentage: number;
  duplicate_rows: number;
  duplicate_percentage: number;
  constant_columns: number;
  date_columns: number;
  numeric_columns: number;
  categorical_columns: number;
  mixed_type_columns: number;
  invalid_dates: number;
  infinite_values: number;
  suspicious_values: number;
  score: number;
  reasons: string[];
}

export interface KPI {
  id: string;
  name: string;
  value: number;
  formatted_value: string;
  unit: string | null;
  calculation: string;
  source_columns: string[];
  coverage: number;
  warnings: string[];
}

export interface Trend {
  metric: string;
  direction: string;
  strength: number;
  recent_change: number;
  volatility: number;
  period_type: string;
  evidence_id: string;
}

export interface Anomaly {
  id: string;
  metric: string;
  dimension: string | null;
  observed_value: number;
  expected_value: number | null;
  deviation: number;
  severity: 'low' | 'medium' | 'high' | 'critical';
  method: string;
  evidence_id: string;
  limitations: string[];
}

export interface SegmentComparison {
  dimension: string;
  metric: string;
  best_segment: string;
  worst_segment: string;
  difference: number;
  difference_percentage: number;
  best_sample_size: number;
  worst_sample_size: number;
  evidence_id: string;
}

export interface Evidence {
  evidence_id: string;
  finding_id: string;
  claim: string;
  source_columns: string[];
  filters: Record<string, any>;
  sample_size: number;
  calculation: string;
  values: Record<string, any>;
  comparison: Record<string, any>;
  limitations: string[];
  data_quality: Record<string, any>;
}

export interface Finding {
  id: string;
  title: string;
  type: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  impact: string;
  metric: string;
  description: string;
  evidence_ids: string[];
  confidence: number;
  limitations: string[];
}

export interface AIInsight {
  executive_summary: string;
  insights: Array<{
    insight: string;
    evidence_ids: string[];
    finding_ids: string[];
  }>;
  recommendations: Array<{
    recommendation: string;
    evidence_ids: string[];
    priority: string;
  }>;
  limitations: string[];
}

export interface AnalysisResponse {
  success: boolean;
  dataset_name: string;
  columns: ColumnInfo[];
  data_quality: DataQuality;
  kpis: KPI[];
  trends: Trend[];
  anomalies: Anomaly[];
  segment_comparisons: SegmentComparison[];
  findings: Finding[];
  evidence: Record<string, Evidence>;
  ai_insight: AIInsight | null;
  processing_time: number;
  error: string | null;
}

export interface AskResponse {
  answer: string;
  evidence_ids: string[];
  finding_ids: string[];
  limitations: string[];
}
