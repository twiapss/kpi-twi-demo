import React, { useState, useEffect } from 'react';

import LoginPage from './components/auth/LoginPage';
import RegisterPage from './components/auth/RegisterPage';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import KPIInputForm from './components/KPIInputForm';
import ReportView from './components/ReportView';
import UserManagementPage from './components/admin/UserManagementPage';
import { User, UserStatus, Role, KPIEntry, Office, Department, Period, KpiStatus } from './types';
import { ChartBarIcon, DashboardIcon, DocumentAddIcon, UserCircleIcon } from './components/common/icons';

// Mock Data
const initialUsers: User[] = [
  { id: 1, name: 'Admin TWI', email: 'itdept@twi.co.id', password: 'tw123456', office: Office.PUSAT, department: Department.IT, role: Role.ADMIN, status: UserStatus.APPROVED },
  { id: 2, name: 'Budi Staff', email: 'budi@twi.com', password: 'password', office: Office.SURABAYA, department: Department.OPERASIONAL, role: Role.STAFF, status: UserStatus.APPROVED },
  { id: 3, name: 'Citra Manager', email: 'citra@twi.com', password: 'password', office: Office.PUSAT, department: Department.MARKETING, role: Role.MANAGER, status: UserStatus.APPROVED },
  { id: 4, name: 'Doni Pending', email: 'doni@twi.com', password: 'password', office: Office.MAKASSAR, department: Department.OPERASIONAL, role: Role.STAFF, status: UserStatus.PENDING },
];

const initialKpiData: KPIEntry[] = [
  { id: 1, office: Office.PUSAT, department: Department.MARKETING, period: Period.MONTHLY, mainKpi: "Peningkatan Penjualan", subKpi: "Mencapai Target Sales Call", target: 100, realization: 95, achievement: 95.00, notes: "Hampir mencapai target", submittedAt: new Date(), status: KpiStatus.APPROVED },
  { id: 2, office: Office.SURABAYA, department: Department.OPERASIONAL, period: Period.MONTHLY, mainKpi: "Efisiensi Operasional", subKpi: "Mengurangi Waktu Downtime Mesin", target: 10, realization: 12, achievement: 80.00, notes: "Perlu perbaikan maintenance", submittedAt: new Date(), status: KpiStatus.APPROVED },
  { id: 3, office: Office.PUSAT, department: Department.HR_AREA, period: Period.QUARTERLY, mainKpi: "Tugas Pokok HR Area", subKpi: "Rekrutmen & Seleksi", target: 5, realization: 3, achievement: 60.00, notes: "Kesulitan mencari kandidat", submittedAt: new Date(), status: KpiStatus.PENDING },
  { id: 4, office: Office.MAKASSAR, department: Department.MARKETING, period: Period.MONTHLY, mainKpi: "Brand Awareness", subKpi: "Jumlah Engagement Media Sosial", target: 5000, realization: 5500, achievement: 110.00, notes: "Campaign berhasil", submittedAt: new Date(), status: KpiStatus.APPROVED },
];

const App: React.FC = () => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [view, setView] = useState<'login' | 'register' | 'app'>('login');
    const [appView, setAppView] = useState('dashboard');
    const [users, setUsers] = useState<User[]>(initialUsers);
    const [kpiData, setKpiData] = useState<KPIEntry[]>(initialKpiData);

    const handleLogin = (user: User) => {
        setCurrentUser(user);
        setView('app');
    };

    const handleLogout = () => {
        setCurrentUser(null);
        setView('login');
    };

    const handleRegister = (userData: Omit<User, 'id' | 'role' | 'status'>) => {
        const newUser: User = {
            ...userData,
            id: users.length + 1,
            role: Role.STAFF,
            status: UserStatus.PENDING,
        };
        setUsers([...users, newUser]);
        // In a real app, this would be an API call.
        console.log("New user registered, pending approval:", newUser);
    };

    const addKpiEntry = (entry: Omit<KPIEntry, 'id' | 'submittedAt' | 'achievement'>) => {
        const targetVal = typeof entry.target === 'number' ? entry.target : 0;
        const realizationVal = typeof entry.realization === 'number' ? entry.realization : 0;
        const achievement = targetVal > 0 ? parseFloat(((realizationVal / targetVal) * 100).toFixed(2)) : 0;

        const newEntry: KPIEntry = {
            ...entry,
            id: kpiData.length + 1,
            submittedAt: new Date(),
            target: targetVal,
            realization: realizationVal,
            achievement,
        };
        setKpiData([...kpiData, newEntry]);
    };
    
    const updateUser = (userId: number, updates: Partial<User>) => {
        setUsers(users.map(u => u.id === userId ? { ...u, ...updates } : u));
    };

    if (view === 'login') {
        return <LoginPage onLogin={handleLogin} users={users} onNavigateToRegister={() => setView('register')} />;
    }

    if (view === 'register') {
        return <RegisterPage onRegister={handleRegister} onNavigateToLogin={() => setView('login')} />;
    }
    
    if (view === 'app' && currentUser) {
        const isAdmin = currentUser.role === Role.ADMIN;
        
        const Sidebar = () => {
            const navItems = [
                { id: 'dashboard', label: 'Dashboard', icon: DashboardIcon },
                { id: 'input', label: 'Input KPI', icon: DocumentAddIcon },
                { id: 'report', label: 'Laporan KPI', icon: ChartBarIcon },
            ];
            const adminNavItems = [
                { id: 'user-management', label: 'Manajemen User', icon: UserCircleIcon },
            ];

            const NavLink: React.FC<{item: {id: string, label: string, icon: React.FC<{className?: string}>}, isCurrent: boolean}> = ({ item, isCurrent }) => (
                <li>
                  <button onClick={() => setAppView(item.id)} className={`flex items-center w-full p-2 text-base font-normal rounded-lg transition duration-75 group ${ isCurrent ? 'bg-brand-accent text-white' : 'text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-brand-blue'}`}>
                    <item.icon className={`w-6 h-6 transition duration-75 ${isCurrent ? 'text-white' : 'text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'}`} />
                    <span className="ml-3 flex-1 text-left whitespace-nowrap">{item.label}</span>
                  </button>
                </li>
              );

            return (
                <aside className="w-64" aria-label="Sidebar">
                    <div className="overflow-y-auto py-4 px-3 bg-white dark:bg-brand-blue-light h-full shadow-md">
                        <ul className="space-y-2">
                            {navItems.map(item => <NavLink key={item.id} item={item} isCurrent={appView === item.id} />)}
                        </ul>
                        {isAdmin && (
                        <ul className="pt-4 mt-4 space-y-2 border-t border-gray-200 dark:border-brand-gray">
                            {adminNavItems.map(item => <NavLink key={item.id} item={item} isCurrent={appView === item.id} />)}
                        </ul>
                        )}
                    </div>
                </aside>
            );
        };

        return (
            <div className="min-h-screen bg-slate-100 dark:bg-brand-blue">
                <Header user={currentUser} onLogout={handleLogout} />
                <div className="flex">
                    <Sidebar />
                    <main className="flex-1">
                        {appView === 'dashboard' && <Dashboard kpiData={kpiData} />}
                        {appView === 'input' && <KPIInputForm addKpiEntry={addKpiEntry} onFormSubmit={() => setAppView('report')} />}
                        {appView === 'report' && <ReportView kpiData={kpiData} />}
                        {isAdmin && appView === 'user-management' && <UserManagementPage users={users} updateUser={updateUser} />}
                    </main>
                </div>
            </div>
        );
    }

    return null; // Should not happen
};

export default App;
