import React from 'react';

interface SparklineProps {
  data: number[];
  color?: string;
  height?: number;
  width?: number;
}

export const Sparkline: React.FC<SparklineProps> = ({
  data,
  color = '#6366F1',
  height = 32,
  width = 84,
}) => {
  if (!data || data.length < 2) return null;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min === 0 ? 1 : max - min;
  const padding = 3;

  const points = data
    .map((val, idx) => {
      const x = padding + (idx / (data.length - 1)) * (width - padding * 2);
      const y = height - padding - ((val - min) / range) * (height - padding * 2);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(' ');

  const lastPoint = points.split(' ').pop()?.split(',');
  const lastX = lastPoint ? parseFloat(lastPoint[0]) : 0;
  const lastY = lastPoint ? parseFloat(lastPoint[1]) : 0;

  const gradientId = `spark-grad-${Math.random().toString(36).substring(2, 9)}`;

  // Area path for subtle gradient fill
  const firstX = padding;
  const areaPoints = `${firstX},${height} ${points} ${width - padding},${height}`;

  return (
    <div
      className="relative inline-flex items-center shrink-0 rounded-md p-1 bg-slate-100/60 dark:bg-white/3 border border-slate-200/60 dark:border-white/5"
      style={{ width: width + 8, height: height + 8 }}
      title="Trend sparkline across recorded periods"
    >
      <svg
        width={width}
        height={height}
        className="overflow-visible block mx-auto"
        role="img"
        aria-label="Trend sparkline graph"
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.35" />
            <stop offset="100%" stopColor={color} stopOpacity="0.02" />
          </linearGradient>
          <filter id={`glow-${gradientId}`} x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="1" stdDeviation="1.5" floodColor={color} floodOpacity="0.4" />
          </filter>
        </defs>

        {/* Gradient Filled Area */}
        <polygon points={areaPoints} fill={`url(#${gradientId})`} />

        {/* High-definition crisp sparkline stroke */}
        <polyline
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          points={points}
          filter={`url(#glow-${gradientId})`}
        />

        {/* Final terminal data point with pulse halo */}
        <circle cx={lastX} cy={lastY} r="4" fill={color} fillOpacity="0.25" />
        <circle cx={lastX} cy={lastY} r="2.5" fill={color} stroke="#FFFFFF" strokeWidth="1" />
      </svg>
    </div>
  );
};
