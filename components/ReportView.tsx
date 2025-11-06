import React, { useState } from 'react';
import { KPIEntry, KpiStatus } from '../types';
import Card from './common/Card';

interface ReportViewProps {
  kpiData: KPIEntry[];
}

const ReportView: React.FC<ReportViewProps> = ({ kpiData }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = kpiData.filter(item => 
    item.mainKpi.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.subKpi.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.office.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: KpiStatus) => {
    switch (status) {
      case KpiStatus.APPROVED: return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case KpiStatus.PENDING: return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case KpiStatus.REJECTED: return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Laporan KPI</h2>
      <Card>
        <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
            <input
                type="text"
                placeholder="Cari KPI..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full md:w-1/3 p-2 border border-gray-300 rounded-md dark:bg-brand-blue dark:border-brand-gray"
            />
            <button 
                onClick={() => window.print()}
                className="w-full md:w-auto bg-brand-accent text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
                Cetak Laporan
            </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-brand-blue dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">KPI Utama</th>
                <th scope="col" className="px-6 py-3">Sub KPI</th>
                <th scope="col" className="px-6 py-3">Kantor</th>
                <th scope="col" className="px-6 py-3">Departemen</th>
                <th scope="col" className="px-6 py-3">Target</th>
                <th scope="col" className="px-6 py-3">Realisasi</th>
                <th scope="col" className="px-6 py-3">Pencapaian</th>
                <th scope="col" className="px-6 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item) => (
                <tr key={item.id} className="bg-white border-b dark:bg-brand-blue-light dark:border-brand-gray">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.mainKpi}</th>
                  <td className="px-6 py-4">{item.subKpi}</td>
                  <td className="px-6 py-4">{item.office}</td>
                  <td className="px-6 py-4">{item.department}</td>
                  <td className="px-6 py-4">{item.target}</td>
                  <td className="px-6 py-4">{item.realization}</td>
                  <td className="px-6 py-4 font-bold">{item.achievement}%</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                        {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredData.length === 0 && (
            <p className="text-center p-4">Tidak ada data yang cocok dengan pencarian.</p>
          )}
        </div>
      </Card>
    </div>
  );
};

export default ReportView;
