import { FormEvent, useState } from 'react';
import { Zap, User, Mail, Lock, Eye, EyeOff, ArrowRight, ShieldCheck, Route, Users, DollarSign, CheckCircle } from 'lucide-react';
import { saveSession, signupUser } from '../api/auth';
import { AuthUser, Page, Role } from '../types';

interface SignupPageProps {
  onNavigate: (page: Page) => void;
  onAuthenticated: (user: AuthUser) => void;
}

const roleOptions: { value: Role; icon: typeof ShieldCheck; desc: string }[] = [
  { value: 'Fleet Manager', icon: ShieldCheck, desc: 'Full fleet access' },
  { value: 'Dispatcher', icon: Route, desc: 'Trips & dispatch' },
  { value: 'Safety Officer', icon: Users, desc: 'Safety & compliance' },
  { value: 'Financial Analyst', icon: DollarSign, desc: 'Costs & reports' },
];

export default function SignupPage({ onNavigate, onAuthenticated }: SignupPageProps) {
  const [showPwd, setShowPwd] = useState(false);
  const [agree, setAgree] = useState(false);
  const [role, setRole] = useState<Role>('Fleet Manager');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    if (!name.trim() || !email.trim() || !password) {
      setError('Complete all account details to continue.');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }

    if (!agree) {
      setError('Accept the terms to create your account.');
      return;
    }

    setLoading(true);
    try {
      const response = await signupUser(name.trim(), 'TransitOps', email.trim(), password, role);
      saveSession(response.data.user, response.data.token);
      onAuthenticated(response.data.user);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to create account. Check your details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#111827] flex">
      {/* Form */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-2.5 mb-8 justify-center">
            <div className="w-9 h-9 rounded-xl bg-amber-500 flex items-center justify-center amber-glow">
              <Zap className="w-5 h-5 text-gray-900" fill="currentColor" />
            </div>
            <span className="font-bold text-lg text-white">TransitOps</span>
          </div>

          <h2 className="text-2xl font-bold text-white mb-2">Create your account</h2>
          <div className="mb-8" />

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="text-gray-400 text-xs font-medium mb-1.5 block">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  autoComplete="name"
                  className="w-full bg-gray-800/50 border border-gray-700/50 rounded-lg pl-10 pr-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-amber-500/50 focus:bg-gray-800 transition"
                />
              </div>
            </div>

            <div>
              <label className="text-gray-400 text-xs font-medium mb-1.5 block">Work Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  autoComplete="email"
                  className="w-full bg-gray-800/50 border border-gray-700/50 rounded-lg pl-10 pr-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-amber-500/50 focus:bg-gray-800 transition"
                />
              </div>
            </div>

            <div>
              <label className="text-gray-400 text-xs font-medium mb-1.5 block">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type={showPwd ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a strong password"
                  autoComplete="new-password"
                  className="w-full bg-gray-800/50 border border-gray-700/50 rounded-lg pl-10 pr-10 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-amber-500/50 focus:bg-gray-800 transition"
                />
                <button type="button" onClick={() => setShowPwd(!showPwd)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300">
                  {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <div className="flex items-center gap-1.5 mt-2">
                <div className="flex-1 h-1 rounded-full bg-gray-700 overflow-hidden">
                  <div className="h-full w-2/3 rounded-full bg-amber-500"></div>
                </div>
                <span className="text-gray-500 text-[10px]">Medium strength</span>
              </div>
            </div>

            <div>
              <label className="text-gray-400 text-xs font-medium mb-2 block">Primary Role</label>
              <div className="grid grid-cols-2 gap-2">
                {roleOptions.map((r) => {
                  const Icon = r.icon;
                  const active = role === r.value;
                  return (
                    <button
                      key={r.value}
                      type="button"
                      onClick={() => setRole(r.value)}
                      className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg border text-left transition ${
                        active
                          ? 'bg-amber-500/10 border-amber-500/40 text-white'
                          : 'bg-gray-800/50 border-gray-700/50 text-gray-400 hover:border-gray-600 hover:text-gray-200'
                      }`}
                    >
                      <Icon className={`w-4 h-4 shrink-0 ${active ? 'text-amber-400' : 'text-gray-500'}`} />
                      <div className="min-w-0">
                        <p className="text-xs font-medium truncate">{r.value}</p>
                        <p className="text-[10px] text-gray-500 truncate">{r.desc}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <label className="flex items-start gap-2.5 cursor-pointer">
              <input 
                type="checkbox" 
                checked={agree}
                onChange={e => setAgree(e.target.checked)}
                className="w-4 h-4 rounded border-gray-600 bg-gray-800 text-amber-500 focus:ring-amber-500/20 mt-0.5" 
              />
              <span className="text-gray-400 text-xs leading-relaxed">
                I agree to the <a href="#" className="text-amber-400 hover:underline">Terms of Service</a> and <a href="#" className="text-amber-400 hover:underline">Privacy Policy</a>
              </span>
            </label>

            {error && (
              <div className="rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2 text-xs text-red-300">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={!agree || loading}
              className="w-full bg-amber-500 text-gray-900 font-semibold py-3 rounded-lg hover:bg-amber-400 transition flex items-center justify-center gap-2 amber-glow disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating account...' : `Create Account as ${role}`} <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-gray-800"></div>
            <span className="text-gray-600 text-xs">OR SIGN UP WITH</span>
            <div className="flex-1 h-px bg-gray-800"></div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center gap-2 bg-gray-800/50 border border-gray-700/50 rounded-lg py-2.5 text-sm text-gray-300 hover:bg-gray-800 transition">
              <svg className="w-4 h-4" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
              Google
            </button>
            <button className="flex items-center justify-center gap-2 bg-gray-800/50 border border-gray-700/50 rounded-lg py-2.5 text-sm text-gray-300 hover:bg-gray-800 transition">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M16.365 1.43c0 1.14-.493 2.27-1.177 3.08-.875.99-2.27 1.71-3.43 1.61-.12-1.16.49-2.35 1.24-3.17.87-.93 2.36-1.6 3.367-1.52zM20.5 17.21c-.49 1.12-.72 1.62-1.35 2.62-.88 1.39-2.12 3.12-3.66 3.13-1.37.01-1.72-.89-3.58-.88-1.86.01-2.25.9-3.62.88-1.54-.01-2.72-1.57-3.6-2.96C2.5 17.1 2.27 13.4 3.6 11.39c.94-1.42 2.42-2.25 3.81-2.25 1.42 0 2.31.98 3.48.98 1.14 0 1.83-.98 3.48-.98 1.24 0 2.56.68 3.5 1.85-3.08 1.69-2.58 6.08.65 8.22z"/></svg>
              Apple
            </button>
          </div>

          <p className="text-center text-gray-500 text-sm mt-8">
            Already have an account?{' '}
            <button onClick={() => onNavigate('login')} className="text-amber-400 font-medium hover:underline">
              Sign in
            </button>
          </p>

          <button onClick={() => onNavigate('login')} className="block mx-auto mt-4 text-gray-600 text-xs hover:text-gray-400 transition">
            ← Back to home
          </button>
        </div>
      </div>

    </div>
  );
}
