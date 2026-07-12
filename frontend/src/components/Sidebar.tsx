import { 
  LayoutDashboard, Truck, Users, Route, Wrench, Fuel, BarChart3, Settings, 
  Zap, X
} from 'lucide-react';
import { Page } from '../types';

interface SidebarProps {
  current: Page;
  onNavigate: (page: Page) => void;
  collapsed: boolean;
  onClose?: () => void;
}

const menuItems: { id: Page; label: string; icon: typeof LayoutDashboard }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'fleet', label: 'Fleet', icon: Truck },
  { id: 'drivers', label: 'Drivers', icon: Users },
  { id: 'trips', label: 'Trips', icon: Route },
  { id: 'maintenance', label: 'Maintenance', icon: Wrench },
  { id: 'fuel', label: 'Fuel & Expenses', icon: Fuel },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export default function Sidebar({ current, onNavigate, collapsed, onClose }: SidebarProps) {
  return (
    <>
      {collapsed && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 lg:hidden" 
          onClick={onClose}
        />
      )}
      <aside className={`
        fixed lg:sticky top-0 left-0 h-screen z-50
        ${collapsed ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        transition-transform duration-300
        w-[240px] bg-[#111827] border-r border-gray-800 flex flex-col
      `}>
        <div className="flex items-center justify-between px-5 h-16 border-b border-gray-800 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500 flex items-center justify-center amber-glow">
              <Zap className="w-5 h-5 text-gray-900" fill="currentColor" />
            </div>
            <div>
              <h1 className="text-white font-bold text-base leading-none">TransitOps</h1>
              <p className="text-gray-500 text-[10px] mt-0.5">Transport Operations</p>
            </div>
          </div>
          {onClose && (
            <button onClick={onClose} className="lg:hidden text-gray-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-3">
          <p className="text-gray-600 text-[10px] font-semibold uppercase tracking-wider px-3 mb-2">Menu</p>
          <ul className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const active = current === item.id;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => onNavigate(item.id)}
                    className={`
                      w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium
                      transition-all duration-200 group
                      ${active 
                        ? 'sidebar-item-active text-amber-400' 
                        : 'text-gray-400 hover:text-white hover:bg-gray-800/50'}
                    `}
                  >
                    <Icon className={`w-[18px] h-[18px] ${active ? 'text-amber-400' : 'text-gray-500 group-hover:text-gray-300'}`} />
                    {item.label}
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="mt-6 mx-3 p-4 rounded-xl bg-gradient-to-br from-amber-500/10 to-amber-600/5 border border-amber-500/20">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-amber-400 pulse-dot"></div>
              <p className="text-amber-400 text-xs font-semibold">AI Ops Active</p>
            </div>
            <p className="text-gray-400 text-[11px] leading-relaxed mb-3">3 predictive alerts, 2 route optimizations ready</p>
            <button className="text-amber-400 text-xs font-medium hover:text-amber-300 transition">View insights →</button>
          </div>
        </nav>

        <div className="px-3 py-4 border-t border-gray-800 shrink-0">
          <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-800/50 cursor-pointer transition">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-gray-900 text-xs font-bold">
              FM
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-xs font-medium truncate">Fleet Manager</p>
              <p className="text-gray-500 text-[10px] truncate">admin@transitops.io</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
