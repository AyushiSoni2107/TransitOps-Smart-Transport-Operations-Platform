import { useState } from 'react';
import { Building2, Users, Shield, Bell, Lock, Sliders, Plus, Check, X } from 'lucide-react';
import { Card, PageHeader, Button, StatusBadge } from '../components/ui';

const tabs = [
  { id: 'company', label: 'Company Profile', icon: Building2 },
  { id: 'users', label: 'User Management', icon: Users },
  { id: 'rbac', label: 'Access Control', icon: Shield },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'security', label: 'Security', icon: Lock },
  { id: 'system', label: 'System Preferences', icon: Sliders },
];

const users = [
  { name: 'Alex Morgan', email: 'alex@transitops.io', role: 'Fleet Manager', status: 'Active' },
  { name: 'Sarah Lee', email: 'sarah@transitops.io', role: 'Dispatcher', status: 'Active' },
  { name: 'Mike Chen', email: 'mike@transitops.io', role: 'Safety Officer', status: 'Active' },
  { name: 'Anna Smith', email: 'anna@transitops.io', role: 'Financial Analyst', status: 'Invited' },
];

const roles = [
  { name: 'Fleet Manager', users: 2, permissions: ['Full fleet access', 'Manage drivers', 'View analytics', 'Edit settings'] },
  { name: 'Dispatcher', users: 4, permissions: ['Create trips', 'Assign drivers', 'View fleet', 'Track trips'] },
  { name: 'Safety Officer', users: 2, permissions: ['View drivers', 'Safety reports', 'Maintenance alerts'] },
  { name: 'Financial Analyst', users: 1, permissions: ['View expenses', 'Export reports', 'View analytics'] },
];

const permMatrix = [
  { perm: 'View Dashboard', fm: true, disp: true, so: true, fa: true },
  { perm: 'Manage Fleet', fm: true, disp: false, so: false, fa: false },
  { perm: 'Manage Drivers', fm: true, disp: false, so: true, fa: false },
  { perm: 'Dispatch Trips', fm: true, disp: true, so: false, fa: false },
  { perm: 'View Analytics', fm: true, disp: true, so: true, fa: true },
  { perm: 'Manage Expenses', fm: true, disp: false, so: false, fa: true },
  { perm: 'Manage Users', fm: true, disp: false, so: false, fa: false },
  { perm: 'System Settings', fm: true, disp: false, so: false, fa: false },
];

export default function SettingsPage() {
  const [tab, setTab] = useState('company');

  return (
    <div>
      <PageHeader title="Settings" subtitle="Manage your organization and system preferences" />

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Tab nav */}
        <Card className="p-3 lg:col-span-1 h-fit">
          <nav className="space-y-1">
            {tabs.map(t => {
              const Icon = t.icon;
              return (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${
                    tab === t.id 
                      ? 'bg-amber-500/10 text-amber-400' 
                      : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                  }`}
                >
                  <Icon className="w-[18px] h-[18px]" />
                  {t.label}
                </button>
              );
            })}
          </nav>
        </Card>

        {/* Tab content */}
        <div className="lg:col-span-4">
          {tab === 'company' && (
            <Card className="p-6">
              <h3 className="text-white font-semibold text-sm mb-5">Company Profile</h3>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-amber-500 flex items-center justify-center">
                  <Building2 className="w-8 h-8 text-gray-900" />
                </div>
                <div>
                  <Button variant="secondary" size="sm">Change Logo</Button>
                  <p className="text-gray-500 text-xs mt-1.5">JPG, PNG or SVG. Max 2MB.</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { label: 'Company Name', value: 'TransitOps Logistics' },
                  { label: 'Industry', value: 'Transportation' },
                  { label: 'Email', value: 'info@transitops.io' },
                  { label: 'Phone', value: '+1-555-0100' },
                  { label: 'Address', value: '120 Freight Ave, Hamburg' },
                  { label: 'Timezone', value: 'CET (UTC+1)' },
                ].map((f, i) => (
                  <div key={i}>
                    <label className="text-gray-400 text-xs font-medium mb-1.5 block">{f.label}</label>
                    <input
                      defaultValue={f.value}
                      className="w-full bg-gray-800/50 border border-gray-700/50 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500/50"
                    />
                  </div>
                ))}
              </div>
              <div className="mt-6 flex gap-3">
                <Button>Save Changes</Button>
                <Button variant="secondary">Cancel</Button>
              </div>
            </Card>
          )}

          {tab === 'users' && (
            <Card className="p-6">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-white font-semibold text-sm">User Management</h3>
                <Button size="sm"><Plus className="w-3.5 h-3.5" />Invite User</Button>
              </div>
              <div className="space-y-3">
                {users.map((u, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-gray-800/50 hover:bg-gray-800 transition">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-gray-900 text-xs font-bold">
                      {u.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm font-medium">{u.name}</p>
                      <p className="text-gray-500 text-xs">{u.email}</p>
                    </div>
                    <span className="text-gray-400 text-xs hidden sm:block">{u.role}</span>
                    <StatusBadge status={u.status === 'Active' ? 'Available' : 'Scheduled'} />
                    <button className="text-gray-500 hover:text-white text-xs">Edit</button>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {tab === 'rbac' && (
            <div className="space-y-6">
              <Card className="p-6">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-white font-semibold text-sm">Role-Based Access Control</h3>
                  <Button size="sm"><Plus className="w-3.5 h-3.5" />Create Role</Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {roles.map((r, i) => (
                    <div key={i} className="p-4 rounded-xl bg-gray-800/50 border border-gray-700/50">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <Shield className="w-4 h-4 text-amber-400" />
                          <p className="text-white text-sm font-medium">{r.name}</p>
                        </div>
                        <span className="text-gray-500 text-xs">{r.users} users</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {r.permissions.map((p, j) => (
                          <span key={j} className="px-2 py-1 rounded-md bg-gray-700/50 text-gray-400 text-[10px]">{p}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-white font-semibold text-sm mb-5">Permission Matrix</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-left text-gray-500 text-xs border-b border-gray-700/50">
                        <th className="pb-3 pr-4 font-medium">Permission</th>
                        <th className="pb-3 pr-4 font-medium text-center">Fleet Mgr</th>
                        <th className="pb-3 pr-4 font-medium text-center">Dispatcher</th>
                        <th className="pb-3 pr-4 font-medium text-center">Safety</th>
                        <th className="pb-3 pr-4 font-medium text-center">Finance</th>
                      </tr>
                    </thead>
                    <tbody>
                      {permMatrix.map((p, i) => (
                        <tr key={i} className="border-b border-gray-800/50 last:border-0">
                          <td className="py-3 pr-4 text-gray-300 text-xs">{p.perm}</td>
                          <td className="py-3 pr-4 text-center">{p.fm ? <Check className="w-4 h-4 text-emerald-400 inline" /> : <X className="w-4 h-4 text-gray-600 inline" />}</td>
                          <td className="py-3 pr-4 text-center">{p.disp ? <Check className="w-4 h-4 text-emerald-400 inline" /> : <X className="w-4 h-4 text-gray-600 inline" />}</td>
                          <td className="py-3 pr-4 text-center">{p.so ? <Check className="w-4 h-4 text-emerald-400 inline" /> : <X className="w-4 h-4 text-gray-600 inline" />}</td>
                          <td className="py-3 pr-4 text-center">{p.fa ? <Check className="w-4 h-4 text-emerald-400 inline" /> : <X className="w-4 h-4 text-gray-600 inline" />}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>
          )}

          {tab === 'notifications' && (
            <Card className="p-6">
              <h3 className="text-white font-semibold text-sm mb-5">Notification Preferences</h3>
              <div className="space-y-4">
                {[
                  { label: 'Maintenance Alerts', desc: 'Get notified about upcoming and overdue services' },
                  { label: 'Trip Updates', desc: 'Real-time trip status changes and completions' },
                  { label: 'Driver Compliance', desc: 'License expirations and safety score drops' },
                  { label: 'Fuel Threshold', desc: 'Alert when fuel drops below 25%' },
                  { label: 'Weekly Reports', desc: 'Summary report every Monday at 8:00 AM' },
                ].map((n, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-gray-800/50">
                    <div>
                      <p className="text-white text-sm font-medium">{n.label}</p>
                      <p className="text-gray-500 text-xs mt-0.5">{n.desc}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked={i < 3} className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:bg-amber-500 transition after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition peer-checked:after:translate-x-5"></div>
                    </label>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {tab === 'security' && (
            <div className="space-y-6">
              <Card className="p-6">
                <h3 className="text-white font-semibold text-sm mb-5">Security Settings</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-xl bg-gray-800/50">
                    <div>
                      <p className="text-white text-sm font-medium">Two-Factor Authentication</p>
                      <p className="text-gray-500 text-xs mt-0.5">Require 2FA for all admin accounts</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:bg-amber-500 transition after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition peer-checked:after:translate-x-5"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-xl bg-gray-800/50">
                    <div>
                      <p className="text-white text-sm font-medium">Session Timeout</p>
                      <p className="text-gray-500 text-xs mt-0.5">Auto-logout after 30 minutes of inactivity</p>
                    </div>
                    <select className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none">
                      <option>15 min</option><option>30 min</option><option>1 hour</option><option>4 hours</option>
                    </select>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-xl bg-gray-800/50">
                    <div>
                      <p className="text-white text-sm font-medium">IP Whitelist</p>
                      <p className="text-gray-500 text-xs mt-0.5">Restrict access to specific IP addresses</p>
                    </div>
                    <Button variant="secondary" size="sm">Configure</Button>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {tab === 'system' && (
            <Card className="p-6">
              <h3 className="text-white font-semibold text-sm mb-5">System Preferences</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { label: 'Language', value: 'English (US)' },
                  { label: 'Currency', value: 'USD ($)' },
                  { label: 'Date Format', value: 'YYYY-MM-DD' },
                  { label: 'Distance Unit', value: 'Kilometers (km)' },
                ].map((f, i) => (
                  <div key={i}>
                    <label className="text-gray-400 text-xs font-medium mb-1.5 block">{f.label}</label>
                    <select className="w-full bg-gray-800/50 border border-gray-700/50 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500/50">
                      <option>{f.value}</option>
                    </select>
                  </div>
                ))}
              </div>
              <div className="mt-6"><Button>Save Preferences</Button></div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
