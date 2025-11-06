import { Office, Department, Period } from './types';

export const ALL_OFFICES: Office[] = [
  Office.PUSAT,
  Office.SURABAYA,
  Office.MAKASSAR,
  Office.PALEMBANG,
];

export const ALL_PERIODS: Period[] = [
  Period.MONTHLY,
  Period.QUARTERLY,
  Period.SEMI_ANNUALLY,
  Period.ANNUALLY,
];

export const HR_AREA_KPI_TYPES: string[] = [
  'Rekrutmen & Seleksi',
  'Pelatihan & Pengembangan',
  'Kompensasi & Benefit',
  'Hubungan Industrial',
  'Administrasi Personalia',
];

export const COMPANY_STRUCTURE: Record<Office, Department[]> = {
  [Office.PUSAT]: [
    Department.OPERASIONAL,
    Department.KEUANGAN,
    Department.MARKETING,
    Department.HR_AREA,
    Department.IT,
  ],
  [Office.SURABAYA]: [
    Department.OPERASIONAL,
    Department.KEUANGAN,
    Department.MARKETING,
    Department.HR_AREA,
  ],
  [Office.MAKASSAR]: [
    Department.OPERASIONAL,
    Department.MARKETING,
    Department.HR_AREA,
  ],
  [Office.PALEMBANG]: [
    Department.OPERASIONAL,
    Department.MARKETING,
    Department.HR_AREA,
  ],
};
