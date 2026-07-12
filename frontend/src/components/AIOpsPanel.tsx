import { Sparkles, TrendingUp, Route, Fuel, ShieldCheck, AlertTriangle, Lightbulb } from 'lucide-react';
import { GlassCard } from './ui';

const insights = [
  { 
    icon: AlertTriangle, 
    title: 'Predictive Maintenance', 
    severity: 'High',
    message: 'BUS-12 brake pads projected to fail within 1,200 km. Schedule replacement now to prevent roadside breakdown.',
    action: 'Schedule Service',
    color: 'text-red-400',
    bg: 'bg-red-500/10',
    border: 'border-red-500/20',
  },
  { 
    icon: Route, 
    title: 'Route Optimization', 
    severity: 'Medium',
    message: 'Trip TR006 can save 18 km by rerouting through Highway A1. Estimated 22 min faster and 4.2L fuel saved.',
    action: 'Apply Route',
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/20',
  },
  { 
    icon: Fuel, 
    title: 'Fuel-Saving Recommendation', 
    severity: 'Low',
    message: 'TRUCK-3 idle time increased 34% this week. Driver coaching could save ~$420/month in fuel costs.',
    action: 'View Report',
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/20',
  },
];

export default function AIOpsPanel() {
  return (
    <GlassCard className="p-5">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-amber-400" />
          </div>
          <div>
            <h3 className="text-white font-semibold text-sm">AI Operations</h3>
            <p className="text-gray-500 text-xs">Smart insights & recommendations</p>
          </div>
        </div>
        <span className="flex items-center gap-1.5 text-[10px] font-medium text-amber-400 bg-amber-500/10 px-2 py-1 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 pulse-dot"></span>
          LIVE
        </span>
      </div>

      <div className="mb-5 p-4 rounded-xl bg-gradient-to-br from-amber-500/10 to-transparent border border-amber-500/20">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <p className="text-white text-sm font-medium">Fleet Health Score</p>
          </div>
          <span className="text-2xl font-bold text-amber-400">87<span className="text-sm text-gray-500">/100</span></span>
        </div>
        <div className="h-2 rounded-full bg-gray-700/50 overflow-hidden">
          <div className="h-full rounded-full bg-gradient-to-r from-amber-500 to-amber-400 bar-fill" style={{ width: '87%' }}></div>
        </div>
        <div className="flex items-center gap-1.5 mt-2 text-xs">
          <TrendingUp className="w-3 h-3 text-emerald-400" />
          <span className="text-emerald-400">+3.2%</span>
          <span className="text-gray-500">vs last week</span>
        </div>
      </div>

      <div className="space-y-3">
        {insights.map((ins, i) => {
          const Icon = ins.icon;
          return (
            <div key={i} className={`p-3.5 rounded-xl ${ins.bg} border ${ins.border}`}>
              <div className="flex items-start gap-3">
                <Icon className={`w-4 h-4 ${ins.color} mt-0.5 shrink-0`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-white text-xs font-semibold">{ins.title}</p>
                    <span className={`text-[10px] font-medium ${ins.color}`}>{ins.severity}</span>
                  </div>
                  <p className="text-gray-400 text-xs leading-relaxed mb-2.5">{ins.message}</p>
                  <button className={`text-xs font-medium ${ins.color} hover:underline`}>
                    {ins.action} →
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-700/50 flex items-center gap-2 text-xs text-gray-500">
        <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
        <span>AI analyzed 1,247 data points across 6 vehicles</span>
      </div>
    </GlassCard>
  );
}
