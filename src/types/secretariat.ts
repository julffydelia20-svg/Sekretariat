export type AgendaCategory = 'pleno' | 'komite' | 'regulator' | 'webinar';

export type AgendaStatus = 'terkonfirmasi' | 'menunggu' | 'ditunda' | 'selesai';

export interface AgendaItem {
  id: string;
  title: string;
  category: AgendaCategory;
  categoryLabel: string;
  status: AgendaStatus;
  statusLabel: string;
  dateStr: string; // e.g. "Jumat, 25 Okt 2024"
  dayOfMonth: number;
  month: number; // 9 = October (0-indexed) or 10
  year: number;
  timeStr: string; // e.g. "09.00 - 11.30 WIB"
  location: string;
  participants: string;
  pic: string;
  image?: string;
  imageCaption?: string;
  documentRef?: string;
  notesAvailable?: boolean;
  notesTitle?: string;
  notulensiContent?: {
    ketuaRapat: string;
    agendaUtama: string[];
    ringkasanKeputusan: string[];
    tindakLanjut: string[];
    dokumenTerkait: string[];
  };
}

export interface SuratItem {
  id: string;
  nomorSurat: string;
  perihal: string;
  pengirimAtauTujuan: string;
  instansi: string;
  tanggal: string;
  kategori: 'Regulator' | 'DSN-MUI' | 'Perusahaan Anggota' | 'Kementerian' | 'Internal';
  status: 'Perlu Disposisi' | 'Disposisi Selesai' | 'Menunggu TTD' | 'Terkirim' | 'Selesai';
  sifat: 'Sangat Rahasia' | 'Penting / Segera' | 'Biasa';
  ringkasan: string;
  filePdfNama: string;
}

export interface TindakLanjutItem {
  id: string;
  perihal: string;
  sumberRapat: string;
  pic: string;
  deadline: string;
  status: 'Belum Mulai' | 'Sedang Berjalan' | 'Selesai';
  progres: number;
}
