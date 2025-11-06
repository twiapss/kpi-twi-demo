
import React, { useState, useEffect } from 'react';
// FIX: Corrected import paths for types and constants
import { KPIEntry, Office, Department, Period, KpiStatus } from '../types';
import { COMPANY_STRUCTURE, ALL_PERIODS, ALL_OFFICES, HR_AREA_KPI_TYPES } from '../constants';
import Card from './common/Card';

interface KPIInputFormProps {
  addKpiEntry: (entry: Omit<KPIEntry, 'id' | 'submittedAt' | 'achievement'>) => void;
  onFormSubmit: () => void;
}

const KPIInputForm: React.FC<KPIInputFormProps> = ({ addKpiEntry, onFormSubmit }) => {
  const [office, setOffice] = useState<Office>(ALL_OFFICES[0]);
  const [department, setDepartment] = useState<Department>(COMPANY_STRUCTURE[office][0]);
  const [projectArea, setProjectArea] = useState('');
  const [period, setPeriod] = useState<Period>(Period.MONTHLY);
  const [mainKpi, setMainKpi] = useState('');
  const [subKpi, setSubKpi] = useState('');
  const [hrAreaKpiType, setHrAreaKpiType] = useState(HR_AREA_KPI_TYPES[0]);
  const [checklistCompleted, setChecklistCompleted] = useState(false);
  const [target, setTarget] = useState<number | ''>('');
  const [realization, setRealization] = useState<number | ''>('');
  const [achievement, setAchievement] = useState<number>(0);
  const [notes, setNotes] = useState('');
  const [attachment, setAttachment] = useState<File | null>(null);

  useEffect(() => {
    // Reset department when office changes
    setDepartment(COMPANY_STRUCTURE[office][0]);
  }, [office]);

  useEffect(() => {
    const targetVal = typeof target === 'number' ? target : 0;
    const realizationVal = typeof realization === 'number' ? realization : 0;
    
    if (targetVal > 0) {
      const calculatedAchievement = (realizationVal / targetVal) * 100;
      setAchievement(parseFloat(calculatedAchievement.toFixed(2)));
    } else {
      setAchievement(0);
    }
  }, [target, realization]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const isHrArea = department === Department.HR_AREA;

    if (target === '' || realization === '' || (!isHrArea && (!mainKpi || !subKpi))) {
      alert('Mohon lengkapi semua field yang wajib diisi.');
      return;
    }
    
    const newEntry = {
      office,
      department,
      projectArea: department === Department.HR_AREA ? projectArea : undefined,
      period,
      mainKpi: isHrArea ? 'Tugas Pokok HR Area' : mainKpi,
      subKpi: isHrArea ? hrAreaKpiType : subKpi,
      hrAreaKpiType: isHrArea ? hrAreaKpiType : undefined,
      checklistCompleted: isHrArea ? checklistCompleted : undefined,
      target,
      realization,
      notes,
      attachmentName: attachment?.name,
      status: KpiStatus.PENDING,
    };
    addKpiEntry(newEntry);
    onFormSubmit(); // Notify parent to switch view
  };

  const getAchievementColor = (value: number) => {
    if (value >= 90) return 'text-green-500';
    if (value >= 70) return 'text-yellow-500';
    return 'text-red-500';
  };

  const isHrArea = department === Department.HR_AREA;

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <Card title="Form Input Key Performance Indicator (KPI)">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="office" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Kantor</label>
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
          </div>

          {isHrArea && (
            <div>
              <label htmlFor="projectArea" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Wilayah Project</label>
              <input type="text" id="projectArea" value={projectArea} onChange={(e) => setProjectArea(e.target.value)} className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 dark:bg-brand-blue dark:border-brand-gray rounded-md" />
            </div>
          )}

          <div>
            <label htmlFor="period" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Periode Penilaian</label>
            <select id="period" value={period} onChange={(e) => setPeriod(e.target.value as Period)} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:bg-brand-blue dark:border-brand-gray focus:outline-none focus:ring-brand-accent focus:border-brand-accent sm:text-sm rounded-md">
              {ALL_PERIODS.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>

          <div className="border-t border-gray-200 dark:border-brand-gray pt-6 space-y-6">
            {isHrArea ? (
              <>
                <div>
                  <label htmlFor="hrAreaKpi" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Jenis KPI HR Area</label>
                  <select id="hrAreaKpi" value={hrAreaKpiType} onChange={(e) => setHrAreaKpiType(e.target.value)} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:bg-brand-blue dark:border-brand-gray focus:outline-none focus:ring-brand-accent focus:border-brand-accent sm:text-sm rounded-md">
                    {HR_AREA_KPI_TYPES.map(kpi => <option key={kpi} value={kpi}>{kpi}</option>)}
                  </select>
                </div>
                 <div className="flex items-center">
                    <input
                        id="checklist"
                        name="checklist"
                        type="checkbox"
                        checked={checklistCompleted}
                        onChange={(e) => setChecklistCompleted(e.target.checked)}
                        className="h-4 w-4 text-brand-accent focus:ring-brand-accent border-gray-300 rounded"
                    />
                    <label htmlFor="checklist" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">
                        Checklist (Opsional)
                    </label>
                </div>
              </>
            ) : (
              <>
                <div>
                    <label htmlFor="mainKpi" className="block text-sm font-medium text-gray-700 dark:text-gray-300">KPI Utama</label>
                    <input type="text" id="mainKpi" value={mainKpi} onChange={(e) => setMainKpi(e.target.value)} required className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 dark:bg-brand-blue dark:border-brand-gray rounded-md" />
                </div>
                <div>
                    <label htmlFor="subKpi" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Sub KPI</label>
                    <input type="text" id="subKpi" value={subKpi} onChange={(e) => setSubKpi(e.target.value)} required className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 dark:bg-brand-blue dark:border-brand-gray rounded-md" />
                </div>
              </>
            )}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 <div>
                    <label htmlFor="target" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{isHrArea ? 'Plan (Target)' : 'Target KPI'}</label>
                    <input type="number" id="target" value={target} onChange={(e) => setTarget(e.target.value === '' ? '' : parseFloat(e.target.value))} required className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 dark:bg-brand-blue dark:border-brand-gray rounded-md" />
                </div>
                <div>
                    <label htmlFor="realization" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{isHrArea ? 'Aktual (Realisasi)' : 'Realisasi KPI'}</label>
                    <input type="number" id="realization" value={realization} onChange={(e) => setRealization(e.target.value === '' ? '' : parseFloat(e.target.value))} required className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 dark:bg-brand-blue dark:border-brand-gray rounded-md" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Nilai Pencapaian (%)</label>
                    <div className={`mt-1 p-2 block w-full shadow-sm sm:text-lg font-bold border-gray-300 dark:bg-brand-blue dark:border-brand-gray rounded-md ${getAchievementColor(achievement)}`}>
                        {achievement}%
                    </div>
                </div>
            </div>
             <div>
                <label htmlFor="notes" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Keterangan / Catatan</label>
                <textarea id="notes" value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 dark:bg-brand-blue dark:border-brand-gray rounded-md"></textarea>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Lampiran (Opsional)</label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-brand-gray border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                        <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <div className="flex text-sm text-gray-600 dark:text-gray-400">
                            <label htmlFor="file-upload" className="relative cursor-pointer bg-white dark:bg-brand-blue rounded-md font-medium text-brand-accent hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-brand-accent">
                                <span>Upload a file</span>
                                <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={(e) => setAttachment(e.target.files ? e.target.files[0] : null)} />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                        </div>
                        {attachment && <p className="text-sm text-gray-500">{attachment.name}</p>}
                    </div>
                </div>
            </div>
          </div>

          <div className="flex justify-end">
             <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-brand-accent hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-accent">
                Submit KPI
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default KPIInputForm;