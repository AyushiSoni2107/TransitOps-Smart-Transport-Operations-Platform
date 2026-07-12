import { Search, Bell, ChevronDown, Menu, Sparkles } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { Role } from '../types';

interface TopNavProps {
  onMenuClick: () => void;
  role: Role;
  onRoleChange: (r: Role) => void;
  onSignOut: () => void;
}

const roles: Role[] = ['Fleet Manager', 'Dispatcher', 'Safety Officer', 'Financial Analyst'];

export default function TopNav({ onMenuClick, role, onRoleChange, onSignOut }: TopNavProps) {
  const [roleOpen, setRoleOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const roleRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (roleRef.current && !roleRef.current.contains(e.target as Node)) setRoleOpen(false);
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setNotifOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <header className="sticky top-0 z-30 h-16 bg-[#111827]/80 backdrop-blur-xl border-b border-gray-800 flex items-center px-4 lg:px-6 gap-4">
      <button onClick={onMenuClick} className="lg:hidden text-gray-400 hover:text-white">
        <Menu className="w-5 h-5" />
      </button>

      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
        <input
          type="text"
          placeholder="Search vehicles, drivers, trips..."
          className="w-full bg-gray-800/50 border border-gray-700/50 rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-amber-500/50 focus:bg-gray-800 transition"
        />
      </div>

      <div className="flex items-center gap-2 lg:gap-3">
        <button className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-medium hover:bg-amber-500/20 transition">
          <Sparkles className="w-3.5 h-3.5" />
          AI Assistant
        </button>

        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setNotifOpen(!notifOpen)}
            className="relative w-9 h-9 rounded-lg bg-gray-800/50 border border-gray-700/50 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-800 transition"
          >
            <Bell className="w-[18px] h-[18px]" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-amber-500 ring-2 ring-[#111827]"></span>
          </button>
          {notifOpen && (
            <div className="absolute right-0 top-12 w-80 bg-gray-800 border border-gray-700 rounded-xl shadow-2xl overflow-hidden slide-in">
              <div className="px-4 py-3 border-b border-gray-700 flex items-center justify-between">
                <p className="text-white font-semibold text-sm">Notifications</p>
                <span className="text-amber-400 text-xs">5 new</span>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {[
                  { t: 'MICRO-05 overdue for service', time: '2m', type: 'error' },
                  { t: 'Sam Rivera license expiring', time: '15m', type: 'warning' },
                  { t: 'BUS-12 fuel level critical', time: '1h', type: 'warning' },
                  { t: 'Trip TR006 dispatched', time: '2h', type: 'info' },
                  { t: 'TRUCK-8 maintenance done', time: '3h', type: 'success' },
                ].map((n, i) => (
                  <div key={i} className="px-4 py-3 hover:bg-gray-700/50 cursor-pointer border-b border-gray-700/50 last:border-0">
                    <div className="flex items-start gap-2.5">
                      <span className={`mt-1.5 w-2 h-2 rounded-full shrink-0 ${
                        n.type === 'error' ? 'bg-red-500' :
                        n.type === 'warning' ? 'bg-amber-500' :
                        n.type === 'success' ? 'bg-emerald-500' : 'bg-blue-500'
                      }`}></span>
                      <div className="flex-1">
                        <p className="text-gray-200 text-sm">{n.t}</p>
                        <p className="text-gray-500 text-xs mt-0.5">{n.time} ago</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full px-4 py-2.5 text-center text-amber-400 text-xs font-medium hover:bg-gray-700/50 transition">
                View all notifications
              </button>
            </div>
          )}
        </div>

        <div className="relative" ref={roleRef}>
          <button
            onClick={() => setRoleOpen(!roleOpen)}
            className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-gray-800/50 border border-gray-700/50 hover:bg-gray-800 transition"
          >
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-gray-900 text-[10px] font-bold">
              FM
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-white text-xs font-medium leading-none">Alex Morgan</p>
              <p className="text-gray-500 text-[10px] mt-0.5">{role}</p>
            </div>
            <ChevronDown className={`w-3.5 h-3.5 text-gray-500 transition ${roleOpen ? 'rotate-180' : ''}`} />
          </button>
          {roleOpen && (
            <div className="absolute right-0 top-12 w-56 bg-gray-800 border border-gray-700 rounded-xl shadow-2xl overflow-hidden slide-in">
              <p className="px-4 py-2 text-gray-500 text-[10px] font-semibold uppercase tracking-wider border-b border-gray-700">Switch Role</p>
              {roles.map((r) => (
                <button
                  key={r}
                  onClick={() => { onRoleChange(r); setRoleOpen(false); }}
                  className={`w-full text-left px-4 py-2.5 text-sm transition ${
                    role === r ? 'text-amber-400 bg-amber-500/10' : 'text-gray-300 hover:bg-gray-700/50'
                  }`}
                >
                  {r}
                </button>
              ))}
              <div className="border-t border-gray-700">
                <button className="w-full text-left px-4 py-2.5 text-sm text-gray-400 hover:bg-gray-700/50 transition">
                  Account Settings
                </button>
                <button className="w-full text-left px-4 py-2.5 text-sm text-red-400 hover:bg-gray-700/50 transition" onClick={onSignOut}>
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}