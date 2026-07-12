import { useState } from 'react';
import Sidebar from './components/Sidebar';
import TopNav from './components/TopNav';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage';
import FleetPage from './pages/FleetPage';
import DriversPage from './pages/DriversPage';
import TripsPage from './pages/TripsPage';
import MaintenancePage from './pages/MaintenancePage';
import FuelPage from './pages/FuelPage';
import AnalyticsPage from './pages/AnalyticsPage';
import SettingsPage from './pages/SettingsPage';
import { getSavedUser, clearSession } from './api/auth';
import { AuthUser, Page, Role } from './types';

const savedUser = getSavedUser();

export default function App() {
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(savedUser);
  const [page, setPage] = useState<Page>(savedUser ? 'dashboard' : 'login');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [role, setRole] = useState<Role>(savedUser?.role || 'Fleet Manager');

  const handleNavigate = (p: Page) => {
    setPage(p);
    setSidebarOpen(false);
    if (p !== 'login' && p !== 'signup') {
      window.scrollTo(0, 0);
    }
  };

  const isAuthPage = page === 'login' || page === 'signup';

  const handleAuthenticated = (user: AuthUser) => {
    setCurrentUser(user);
    setRole(user.role);
    handleNavigate('dashboard');
  };

  const handleSignOutUser = () => {
    clearSession();
    setCurrentUser(null);
    handleNavigate('login');
  };

  const renderPage = () => {
    switch (page) {
      case 'login': return <LoginPage onNavigate={handleNavigate} onAuthenticated={handleAuthenticated} />;
      case 'signup': return <SignupPage onNavigate={handleNavigate} onAuthenticated={handleAuthenticated} />;
      case 'dashboard': return <DashboardPage />;
      case 'fleet': return <FleetPage />;
      case 'drivers': return <DriversPage />;
      case 'trips': return <TripsPage />;
      case 'maintenance': return <MaintenancePage />;
      case 'fuel': return <FuelPage />;
      case 'analytics': return <AnalyticsPage />;
      case 'settings': return <SettingsPage />;
      default: return <DashboardPage />;
    }
  };

  if (!currentUser && !isAuthPage) {
    return (
      <div className="min-h-screen bg-[#111827]">
        <LoginPage onNavigate={handleNavigate} onAuthenticated={handleAuthenticated} />
      </div>
    );
  }

  if (isAuthPage) {
    return <div className="min-h-screen bg-[#111827]">{renderPage()}</div>;
  }

  return (
    <div className="min-h-screen bg-[#111827] flex">
      <Sidebar 
        current={page} 
        onNavigate={handleNavigate}
        collapsed={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <div className="flex-1 flex flex-col min-w-0">
        <TopNav
          onMenuClick={() => setSidebarOpen(true)}
          role={role}
          onRoleChange={setRole}
          onSignOut={handleSignOutUser}
        />
        <main className="flex-1 p-4 lg:p-6 overflow-x-hidden">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}
