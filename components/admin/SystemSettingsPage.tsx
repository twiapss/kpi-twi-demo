import React from 'react';
import Card from '../common/Card';

const SystemSettingsPage: React.FC = () => {
    // Basic settings like dark mode toggle
    const handleToggleDarkMode = () => {
        document.documentElement.classList.toggle('dark');
    };

    return (
        <div className="p-4 sm:p-6 lg:p-8 space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Pengaturan Sistem</h2>
            <Card title="Preferensi Tampilan">
                <div className="flex items-center justify-between">
                    <span className="text-gray-700 dark:text-gray-300">Mode Gelap</span>
                    <label htmlFor="dark-mode-toggle" className="inline-flex relative items-center cursor-pointer">
                        <input type="checkbox" value="" id="dark-mode-toggle" className="sr-only peer" onChange={handleToggleDarkMode} defaultChecked={document.documentElement.classList.contains('dark')} />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                </div>
            </Card>
            {/* More settings can be added here */}
        </div>
    );
};

export default SystemSettingsPage;
