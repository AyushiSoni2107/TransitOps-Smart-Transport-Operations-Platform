import { ReactNode } from 'react';

export function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`bg-[#1f2937] rounded-2xl border border-gray-800 ${className}`}>
      {children}
    </div>
  );
}

export function GlassCard({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`glass-card rounded-2xl ${className}`}>
      {children}
    </div>
  );
}

export function PageHeader({ title, subtitle, action }: { title: string; subtitle?: string; action?: ReactNode }) {
  return (
    <div className="flex items-start justify-between mb-6">
      <div>
        <h1 className="text-white text-2xl font-bold tracking-tight">{title}</h1>
        {subtitle && <p className="text-gray-400 text-sm mt-1">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    'Available': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    'In Trip': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    'Maintenance': 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    'On Duty': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    'Off Duty': 'bg-gray-500/10 text-gray-400 border-gray-500/20',
    'On Trip': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    'Suspended': 'bg-red-500/10 text-red-400 border-red-500/20',
    'Scheduled': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    'In Progress': 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    'Completed': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    'Cancelled': 'bg-red-500/10 text-red-400 border-red-500/20',
    'High': 'bg-red-500/10 text-red-400 border-red-500/20',
    'Medium': 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    'Low': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  };
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${colors[status] || colors['Low']}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${
        status === 'Available' || status === 'On Duty' || status === 'Completed' ? 'bg-emerald-400' :
        status === 'In Trip' || status === 'On Trip' || status === 'Scheduled' ? 'bg-blue-400' :
        status === 'Maintenance' || status === 'In Progress' || status === 'Medium' ? 'bg-amber-400' :
        status === 'Suspended' || status === 'Cancelled' || status === 'High' ? 'bg-red-400' :
        'bg-gray-400'
      }`}></span>
      {status}
    </span>
  );
}

export function Button({ 
  children, onClick, variant = 'primary', size = 'md', className = '' 
}: { 
  children: ReactNode; onClick?: () => void; variant?: 'primary' | 'secondary' | 'ghost'; size?: 'sm' | 'md'; className?: string 
}) {
  const variants = {
    primary: 'bg-amber-500 text-gray-900 hover:bg-amber-400 font-semibold',
    secondary: 'bg-gray-800 text-gray-200 hover:bg-gray-700 border border-gray-700',
    ghost: 'text-gray-400 hover:text-white hover:bg-gray-800/50',
  };
  const sizes = { sm: 'px-3 py-1.5 text-xs', md: 'px-4 py-2 text-sm' };
  return (
    <button 
      onClick={onClick}
      className={`inline-flex items-center gap-2 rounded-lg transition ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </button>
  );
}
