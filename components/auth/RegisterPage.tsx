import React, { useState, useEffect } from 'react';
import Card from '../common/Card';
// FIX: Corrected import paths for types and constants
import { Office, Department, User } from '../../types';
import { ALL_OFFICES, COMPANY_STRUCTURE } from '../../constants';

interface RegisterPageProps {
    onRegister: (userData: Omit<User, 'id' | 'role' | 'status'>) => void;
    onNavigateToLogin: () => void;
}

const RegisterPage: React.FC<RegisterPageProps> = ({ onRegister, onNavigateToLogin }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [office, setOffice] = useState<Office>(ALL_OFFICES[0]);
    const [department, setDepartment] = useState<Department>(COMPANY_STRUCTURE[office][0]);
    const [isRegistered, setIsRegistered] = useState(false);
    
    useEffect(() => {
        // Reset department when office changes
        setDepartment(COMPANY_STRUCTURE[office][0]);
    }, [office]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onRegister({ name, email, password, office, department, phone });
        setIsRegistered(true);
    };

    if (isRegistered) {
        return (
             <div className="min-h-screen bg-slate-100 dark:bg-brand-blue flex items-center justify-center p-4">
                <div className="w-full max-w-md">
                    <Card title="Pendaftaran Berhasil">
                        <div className="text-center space-y-4">
                            <p className="text-gray-700 dark:text-gray-300">
                                Akun Anda berhasil didaftarkan dan menunggu persetujuan admin.
                            </p>
                             <p className="text-gray-500 dark:text-gray-400 text-sm">
                                Notifikasi akan dikirimkan setelah akun Anda disetujui.
                            </p>
                            <button
                                onClick={onNavigateToLogin}
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-accent hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-accent"
                            >
                                Kembali ke Login
                            </button>
                        </div>
                    </Card>
                </div>
            </div>
        );
    }


    return (
        <div className="min-h-screen bg-slate-100 dark:bg-brand-blue flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <Card title="Daftar Akun Baru">
                    <form onSubmit={handleSubmit} className="space-y-4">
                         <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Nama Lengkap</label>
                            <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} required className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 dark:bg-brand-blue dark:border-brand-gray rounded-md" />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                            <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} required className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 dark:bg-brand-blue dark:border-brand-gray rounded-md" />
                        </div>
                         <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Nomor HP (Opsional)</label>
                            <input type="tel" id="phone" value={phone} onChange={e => setPhone(e.target.value)} className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 dark:bg-brand-blue dark:border-brand-gray rounded-md" />
                        </div>
                         <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
                            <input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} required className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 dark:bg-brand-blue dark:border-brand-gray rounded-md" />
                        </div>
                         <div>
                            <label htmlFor="office" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Kantor / Cabang</label>
                            <select id="office" value={office} onChange={(e) => setOffice(e.target.value as Office)} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:bg-brand-blue dark:border-brand-gray focus:outline-none focus:ring-brand-accent focus:border-brand-accent sm:text-sm rounded-md">
                                {ALL_OFFICES.map(o => <option key={o} value={o}>{o}</option>)}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="department" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Departemen</label>
                            <select id="department" value={department} onChange={(e) => setDepartment(e.target.value as Department)} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:bg-brand-blue dark:border-brand-gray focus:outline-none focus:ring-brand-accent focus:border-brand-accent sm:text-sm rounded-md">
                                {COMPANY_STRUCTURE[office].map(d => <option key={d} value={d}>{d}</option>)}
                            </select>
                        </div>
                        <div className="flex items-center justify-between pt-2">
                             <button type="button" onClick={onNavigateToLogin} className="text-sm text-brand-accent hover:underline">
                                Sudah punya akun? Login
                            </button>
                            <button
                                type="submit"
                                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-brand-accent hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-accent"
                            >
                                Kirim Pendaftaran
                            </button>
                        </div>
                    </form>
                </Card>
            </div>
        </div>
    );
};

export default RegisterPage;