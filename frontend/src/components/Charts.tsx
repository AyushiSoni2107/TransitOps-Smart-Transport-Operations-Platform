import { useMemo } from 'react';

// Donut chart for vehicle status distribution
export function DonutChart({ data }: { data: { label: string; value: number; color: string }[] }) {
  const total = data.reduce((s, d) => s + d.value, 0);
  const circumference = 2 * Math.PI * 60;
  let offset = 0;

  return (
    <div className="flex items-center gap-6">
      <svg width="160" height="160" viewBox="0 0 160 160" className="-rotate-90">
        <circle cx="80" cy="80" r="60" fill="none" stroke="#374151" strokeWidth="14" />
        {data.map((d, i) => {
          const dash = (d.value / total) * circumference;
          const el = (
            <circle
              key={i}
              cx="80" cy="80" r="60"
              fill="none"
              stroke={d.color}
              strokeWidth="14"
              strokeDasharray={`${dash} ${circumference - dash}`}
              strokeDashoffset={-offset}
              strokeLinecap="round"
            />
          );
          offset += dash;
          return el;
        })}
      </svg>
      <div className="space-y-2.5">
        {data.map((d, i) => (
          <div key={i} className="flex items-center gap-2.5">
            <span className="w-3 h-3 rounded-full" style={{ background: d.color }}></span>
            <div>
              <p className="text-white text-sm font-medium">{d.value}</p>
              <p className="text-gray-500 text-xs">{d.label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Bar chart for monthly trips
export function BarChart({ data, height = 200 }: { 
  data: { label: string; value: number; secondary?: number }[];
  height?: number;
}) {
  const max = useMemo(() => Math.max(...data.map(d => d.value)), [data]);
  
  return (
    <div className="flex items-end justify-between gap-2" style={{ height }}>
      {data.map((d, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
          <div className="w-full flex flex-col items-center justify-end relative" style={{ height: height - 30 }}>
            <div className="absolute -top-6 opacity-0 group-hover:opacity-100 transition bg-gray-900 text-white text-[10px] px-2 py-1 rounded-md whitespace-nowrap z-10">
              {d.value}{d.secondary !== undefined && ` / ${d.secondary}`}
            </div>
            <div 
              className="w-full max-w-[32px] rounded-t-md bg-gradient-to-t from-amber-600 to-amber-400 bar-fill group-hover:from-amber-500 group-hover:to-amber-300 transition"
              style={{ height: `${(d.value / max) * (height - 30)}px` }}
            ></div>
            {d.secondary !== undefined && (
              <div 
                className="w-full max-w-[32px] rounded-t-md bg-gray-600 absolute bottom-0"
                style={{ height: `${(d.secondary / max) * (height - 30)}px`, opacity: 0.4 }}
              ></div>
            )}
          </div>
          <span className="text-gray-500 text-[10px] font-medium">{d.label}</span>
        </div>
      ))}
    </div>
  );
}

// Line/area chart for fuel consumption
export function AreaChart({ data, height = 200 }: {
  data: { label: string; value: number }[];
  height?: number;
}) {
  const max = Math.max(...data.map(d => d.value));
  const min = Math.min(...data.map(d => d.value));
  const range = max - min || 1;
  const w = 100 / (data.length - 1);
  
  const points = data.map((d, i) => ({
    x: i * w,
    y: 100 - ((d.value - min) / range) * 80 - 10,
  }));
  
  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  const areaPath = `${linePath} L 100 100 L 0 100 Z`;

  return (
    <div style={{ height }} className="relative">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full overflow-visible">
        <defs>
          <linearGradient id="fuelGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={areaPath} fill="url(#fuelGrad)" />
        <path d={linePath} fill="none" stroke="#F59E0B" strokeWidth="2" vectorEffect="non-scaling-stroke" />
        {points.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="2.5" fill="#F59E0B" vectorEffect="non-scaling-stroke" className="hover:r-4" />
        ))}
      </svg>
      <div className="flex justify-between mt-2">
        {data.map((d, i) => (
          <span key={i} className="text-gray-500 text-[10px] font-medium">{d.label}</span>
        ))}
      </div>
    </div>
  );
}

// Horizontal progress bar
export function ProgressBar({ value, label, color = 'amber' }: { 
  value: number; label?: string; color?: string 
}) {
  const colors: Record<string, string> = {
    amber: 'from-amber-600 to-amber-400',
    blue: 'from-blue-600 to-blue-400',
    emerald: 'from-emerald-600 to-emerald-400',
    red: 'from-red-600 to-red-400',
  };
  return (
    <div>
      {label && (
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-gray-400 text-xs">{label}</span>
          <span className="text-white text-xs font-medium">{value}%</span>
        </div>
      )}
      <div className="h-2 rounded-full bg-gray-700/50 overflow-hidden">
        <div 
          className={`h-full rounded-full bg-gradient-to-r ${colors[color]} bar-fill`}
          style={{ width: `${value}%` }}
        ></div>
      </div>
    </div>
  );
}
