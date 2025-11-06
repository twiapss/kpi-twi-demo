import React, { useState } from 'react';
import Card from '../common/Card';
// FIX: Corrected import path for types
import { User, UserStatus } from '../../types';

interface LoginPageProps {
    onLogin: (user: User) => void;
    users: User[];
    onNavigateToRegister: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin, users, onNavigateToRegister }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        const user = users.find(u => u.email === email);

        if (!user || user.password !== password) {
            setError('Email atau password salah.');
            return;
        }

        if (user.status === UserStatus.PENDING) {
            setError('Akun Anda belum disetujui oleh admin.');
            return;
        }

        if (user.status === UserStatus.REJECTED) {
            setError('Akun Anda ditolak. Silakan hubungi admin.');
            return;
        }
        
        if (user.status === UserStatus.APPROVED) {
            onLogin(user);
        } else {
            setError('Status akun tidak valid.');
        }
    };

    return (
        <div className="min-h-screen bg-slate-100 dark:bg-brand-blue flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                 <div className="text-center mb-4">
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-white">PT TWI Group</h1>
                    <p className="text-brand-accent font-semibold">KPI Monitoring System</p>
                </div>
                <Card title="Login">
                    <form onSubmit={handleLogin} className="space-y-6">
                        {error && <p className="text-red-500 text-sm text-center bg-red-100 dark:bg-red-900/50 p-2 rounded-md">{error}</p>}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 dark:bg-brand-blue dark:border-brand-gray rounded-md"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 dark:bg-brand-blue dark:border-brand-gray rounded-md"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-accent hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-accent"
                        >
                            Login
                        </button>

                         <div className="text-center">
                            <button 
                                type="button"
                                onClick={onNavigateToRegister}
                                className="text-sm text-brand-accent hover:underline"
                            >
                                Daftar Akun Baru
                            </button>
                        </div>
                    </form>
                </Card>
            </div>
        </div>
    );
};

export default LoginPage;