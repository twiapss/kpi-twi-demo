
import React, { useState, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
// FIX: Corrected import paths for types and constants
import { KPIEntry, Office, Department, Period } from '../types';
import Card from './common/Card';
import { ArrowUpIcon, ArrowDownIcon } from './common/icons';
import { ALL_OFFICES, ALL_PERIODS } from '../constants';

// NOTE: You need to install recharts for this component to work.
// Run: npm install recharts

interface DashboardProps {
  kpiData: KPIEntry[];
}

const getAchievementColor = (value: number) => {
  if (value >= 90) return 'bg-green-500';
  if (value >= 70) return 'bg-yellow-500';
  return 'bg-red-500';
};
const getAchievementTextColor = (value: number) => {
    if (value >= 90) return 'text-green-500';
    if (value >= 70) return 'text-yellow-500';
    return 'text-red-500';
};

const Dashboard: React.FC<DashboardProps> = ({ kpiData }) => {
    const [selectedOffice, setSelectedOffice] = useState<Office | 'all'>('all');
    const [selectedPeriod, setSelectedPeriod] = useState<Period | 'all'>('all');

    const filteredData = useMemo(() => {
        return kpiData.filter(item => {
            const officeMatch = selectedOffice === 'all' || item.office === selectedOffice;
            const periodMatch = selectedPeriod === 'all' || item.period === selectedPeriod;
            return officeMatch && periodMatch;
        });
    }, [kpiData, selectedOffice, selectedPeriod]);

    const overallAchievement = useMemo(() => {
        if (filteredData.length === 0) return 0;
        const total = filteredData.reduce((sum, item) => sum + item.achievement, 0);
        return parseFloat((total / filteredData.length).toFixed(2));
    }, [filteredData]);

    const chartData = useMemo(() => {
        // FIX: Explicitly type the accumulator to prevent 'unknown' type errors.
        const aggregated = filteredData.reduce((acc: Record<string, {name: string, Target: number, Realisasi: number, count: number}>, item) => {
            const key = item.mainKpi;
            if (!acc[key]) {
                acc[key] = { name: key, Target: 0, Realisasi: 0, count: 0 };
            }
            // Simple average for demonstration. Could be weighted.
            acc[key].Target += item.target;
            acc[key].Realisasi += item.realization;
            acc[key].count += 1;
            return acc;
        }, {});
        
        return Object.values(aggregated).map(item => ({
            name: item.name,
            Target: item.Target / item.count,
            Realisasi: item.Realisasi / item.count,
        }));
    }, [filteredData]);

    const performanceLists = useMemo(() => {
        const sorted = [...filteredData].sort((a, b) => b.achievement - a.achievement);
        const top = sorted.filter(k => k.achievement >= 90).slice(0, 5);
        const bottom = sorted.filter(k => k.achievement < 70).slice(-5).reverse();
        return { top, bottom };
    }, [filteredData]);

    const heatmapData = useMemo(() => {
        const offices = ALL_OFFICES;
        const departments = Object.values(Department);
        const data = offices.map(office => {
            const officeData = kpiData.filter(d => d.office === office);
            const departmentAchievements = departments.map(dept => {
                const deptData = officeData.filter(d => d.department === dept);
                if (deptData.length === 0) return { dept, avg: null };
                const avg = deptData.reduce((sum, item) => sum + item.achievement, 0) / deptData.length;
                return { dept, avg: parseFloat(avg.toFixed(1)) };
            });
            return { office, achievements: departmentAchievements };
        });
        return data;
    }, [kpiData]);

    return (
        <div className="p-4 sm:p-6 lg:p-8 space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Dashboard Analitik KPI</h2>
            
            {/* Filters */}
            <Card>
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                        <label htmlFor="office-filter" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Filter Kantor</label>
                        <select id="office-filter" value={selectedOffice} onChange={e => setSelectedOffice(e.target.value as Office | 'all')} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:bg-brand-blue dark:border-brand-gray focus:outline-none focus:ring-brand-accent focus:border-brand-accent sm:text-sm rounded-md">
                            <option value="all">Semua Kantor</option>
                            {ALL_OFFICES.map(o => <option key={o} value={o}>{o}</option>)}
                        </select>
                    </div>
                     <div className="flex-1">
                        <label htmlFor="period-filter" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Filter Periode</label>
                        <select id="period-filter" value={selectedPeriod} onChange={e => setSelectedPeriod(e.target.value as Period | 'all')} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:bg-brand-blue dark:border-brand-gray focus:outline-none focus:ring-brand-accent focus:border-brand-accent sm:text-sm rounded-md">
                            <option value="all">Semua Periode</option>
                            {ALL_PERIODS.map(p => <option key={p} value={p}>{p}</option>)}
                        </select>
                    </div>
                </div>
            </Card>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                    <h4 className="text-gray-500 dark:text-gray-400">Pencapaian Rata-rata</h4>
                    <div className="flex items-baseline">
                        <p className={`text-4xl font-bold ${getAchievementTextColor(overallAchievement)}`}>{overallAchievement}%</p>
                    </div>
                </Card>
                 <Card>
                    <h4 className="text-gray-500 dark:text-gray-400">Total KPI Diajukan</h4>
                    <p className="text-4xl font-bold text-gray-800 dark:text-gray-200">{filteredData.length}</p>
                </Card>
                 <Card>
                    <h4 className="text-gray-500 dark:text-gray-400">KPI Disetujui</h4>
                    <p className="text-4xl font-bold text-gray-800 dark:text-gray-200">{filteredData.filter(k => k.status === 'Approved').length}</p>
                </Card>
            </div>
            
            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                 <Card title="Perbandingan Target vs Realisasi (Rata-rata)">
                    {filteredData.length > 0 ? (
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={chartData} margin={{ top: 20, right: 20, left: -10, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(128, 128, 128, 0.2)" />
                                <XAxis dataKey="name" tick={{ fill: '#9CA3AF' }}/>
                                <YAxis tick={{ fill: '#9CA3AF' }}/>
                                <Tooltip contentStyle={{ backgroundColor: '#1E293B', border: 'none', color: '#FFF' }} />
                                <Legend wrapperStyle={{ color: '#9CA3AF' }} />
                                <Bar dataKey="Target" fill="#64748B" />
                                <Bar dataKey="Realisasi" fill="#3B82F6" />
                            </BarChart>
                        </ResponsiveContainer>
                    ) : <p className="text-center text-gray-500 dark:text-gray-400 h-[300px] flex items-center justify-center">Tidak ada data untuk ditampilkan.</p>}
                </Card>

                <Card title="Heatmap Performa per Cabang">
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-sm text-left">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-brand-blue dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-2 py-3">Cabang/Dept</th>
                                    {Object.values(Department).map(dept => <th key={dept} scope="col" className="px-2 py-3 text-center transform -rotate-45 whitespace-nowrap">{dept}</th>)}
                                </tr>
                            </thead>
                            <tbody>
                                {heatmapData.map(({office, achievements}) => (
                                    <tr key={office} className="bg-white border-b dark:bg-brand-blue-light dark:border-brand-gray">
                                        <th scope="row" className="px-2 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{office.replace('Kantor Cabang ', '').replace('Kantor Pusat ', '')}</th>
                                        {achievements.map(({dept, avg}) => (
                                            <td key={dept} className="px-2 py-4 text-center">
                                                {avg !== null ? 
                                                    <div className={`w-10 h-10 mx-auto rounded flex items-center justify-center font-bold text-white text-xs ${getAchievementColor(avg)}`}>
                                                        {avg}%
                                                    </div> 
                                                    : <div className="w-10 h-10 mx-auto rounded bg-gray-200 dark:bg-brand-blue"></div>
                                                }
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card>
            </div>
            
            {/* Performance Lists */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card title="Top Performance">
                     <ul className="space-y-3">
                        {performanceLists.top.length > 0 ? performanceLists.top.map(item => (
                            <li key={item.id} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-brand-blue rounded-md">
                                <div className="text-sm">
                                    <p className="font-semibold text-gray-800 dark:text-gray-200">{item.subKpi}</p>
                                    <p className="text-gray-500 dark:text-gray-400">{item.office}</p>
                                </div>
                                <div className="flex items-center font-bold text-green-500">
                                    <ArrowUpIcon className="h-5 w-5 mr-1" />
                                    {item.achievement}%
                                </div>
                            </li>
                        )) : <p className="text-center text-gray-500 dark:text-gray-400">Tidak ada data.</p>}
                    </ul>
                </Card>
                <Card title="Need Improvement">
                    <ul className="space-y-3">
                        {performanceLists.bottom.length > 0 ? performanceLists.bottom.map(item => (
                            <li key={item.id} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-brand-blue rounded-md">
                                <div className="text-sm">
                                    <p className="font-semibold text-gray-800 dark:text-gray-200">{item.subKpi}</p>
                                    <p className="text-gray-500 dark:text-gray-400">{item.office}</p>
                                </div>
                                <div className="flex items-center font-bold text-red-500">
                                    <ArrowDownIcon className="h-5 w-5 mr-1" />
                                    {item.achievement}%
                                </div>
                            </li>
                        )) : <p className="text-center text-gray-500 dark:text-gray-400">Tidak ada data.</p>}
                    </ul>
                </Card>
            </div>
        </div>
    );
};

export default Dashboard;