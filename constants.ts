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
  'Mencari kandidat',
  'Merekrut',
  'Menseleksi',
  'Menerima',
  'Pemenuhan Target Omset Bulanan',
  'Memproses kontrak kerja',
  'Menginput data base',
  'Merekap absen',
  'Menghitung gaji dan tagihan pph 21',
  'Meminta bukti pph 23',
  'Mengurus BPJS TK/ KES',
  'Mengkontrol kerja harian',
  'Membina karyawan',
  'Memberikan sanksi',
  'Melakukan pemutusan/pengembalian',
  'Mengunjungi mitra dan karyawannya',
  'Mencari dan memanggil tenaga pengganti /BKO',
  'Memastikan semua posisi full terisi penuh',
  'Mengecek APD seragam karyawan',
  'Mengecek kebutuhan alat kerja',
  'Melakukan pengajuan permintaan training K3 5R BPJS dll ke team pusat',
  'Membuat laporan pembinaan dan training',
  'Melakukan meeting evaluasi bulanan team pusat dan mitra',
  'Melakukan dokumentasi hardcopy fisik dan soft copy email',
  'Aktif melaporkan harian, mingguan, dan bulanan',
  'Melakukan meeting training (meettrain) setiap hari Sabtu rutin di kantor pusat',
  'Memberikan data pergantian orang yang sudah habis masa kontrak dan tidak perlu diperpanjang ke mitra',
  'Pengurusan kecelakaan kerja dari proses awal sampai akhir claim cair',
  'Kepastian BPJS TK/KES terbayar dan tercetak kartu',
  'HP online 24 jam dan cepat respon',
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