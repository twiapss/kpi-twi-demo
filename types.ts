export enum Office {
  PUSAT = 'Kantor Pusat Jakarta',
  SURABAYA = 'Kantor Cabang Surabaya',
  MAKASSAR = 'Kantor Cabang Makassar',
  PALEMBANG = 'Kantor Cabang Palembang',
}

export enum Department {
  OPERASIONAL = 'Operasional',
  KEUANGAN = 'Keuangan & Akuntansi',
  MARKETING = 'Marketing & Sales',
  HR_AREA = 'HR & GA Area',
  IT = 'IT Support',
}

export enum Period {
  MONTHLY = 'Bulanan',
  QUARTERLY = 'Triwulanan',
  SEMI_ANNUALLY = 'Semester',
  ANNUALLY = 'Tahunan',
}

export enum KpiStatus {
  PENDING = 'Pending',
  APPROVED = 'Approved',
  REJECTED = 'Rejected',
}

export interface KPIEntry {
  id: number;
  office: Office;
  department: Department;
  projectArea?: string;
  period: Period;
  mainKpi: string;
  subKpi: string;
  hrAreaKpiType?: string;
  checklistCompleted?: boolean;
  target: number;
  realization: number;
  achievement: number;
  notes: string;
  attachmentName?: string;
  submittedAt: Date;
  status: KpiStatus;
}

export enum Role {
  STAFF = 'Staff',
  MANAGER = 'Manager',
  ADMIN = 'Admin',
}

export enum UserStatus {
  PENDING = 'Pending',
  APPROVED = 'Approved',
  REJECTED = 'Rejected',
}

export interface User {
  id: number;
  name: string;
  email: string;
  password?: string;
  phone?: string;
  office: Office;
  department: Department;
  role: Role;
  status: UserStatus;
}
