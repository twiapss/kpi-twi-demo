import React from 'react';
// FIX: Corrected import path for types
import { User } from '../types';

interface HeaderProps {
    user: User;
    onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onLogout }) => {
    return (
        <header className="bg-white dark:bg-brand-blue-light shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                           <h1 className="text-xl font-bold text-brand-accent">KPI Dashboard TWI</h1>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <div className="text-right mr-4">
                            <span className="text-gray-800 dark:text-gray-200 font-medium block">{user.name}</span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">{user.role} - {user.department}</span>
                        </div>
                        <button
                            onClick={onLogout}
                            className="bg-red-500 text-white px-3 py-1.5 rounded-md text-sm font-medium hover:bg-red-600"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;