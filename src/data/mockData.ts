import { AgendaItem, SuratItem, TindakLanjutItem } from '../types/secretariat';

export const AASI_ASSETS = {
  logo: 'https://lh3.googleusercontent.com/aida/AEtjO1U3O3V2VFQKwFne-k-BSiwLh-v9yIwm3OkcF4VY6V0foPGOqllguF7QYoRguxtE0y5vZ2d1e7JKNbLMqgPO6DfwlqlU4-xScVhNk_rj6EC-XJ_HzD9gT1IDx6T4OLg1wlMpD8vEmC47vY6uQP7ulPTnnVMfuaYCrtZP7kWSNQy8jUTjkFBpz6swJtXF0csS9RZbwieHKGiB8cbidFf42H4Xoi9xPiqk11BkTE3NGOoX-jBoxfA4LQN5mw',
  avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAlPFMoFhL1_7T6wRfLcnoD35KjzX_ahBGsGoYcaASoVA1mu_r8wHkx1fJcvgiam3gVVJ_EohfAqAwuXqSuBMO82r3LD6pmdLBgeQZ-SEM7OfhYAs-ZjlWzAKl257BqxvQyx69xB4lwRRbG1SlzRQTCN8Dh_rIkGJlOQihkD8antGxDU2APwXBZDWrAymwH1KH-wExme7x1HiDvNNTHTQAmQEBpeDOXE8o8mESSPys7MFuNWsFZU3DH',
  roomMeeting: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDv6JtKoTs9-Mp68pazDEoNUWdM62jjUah2YTrbMzTp-ekFxC8tJQyzF3xWulzEGa0D9KpAQyM8Er7UwLyaf3s1pqatOLM__1v80q66Hw1bRfjFp9OCZsvKPmKfB5e-VZ4PQRhVwV7ppiPAITUu7T_z_2O4JAk1C2lupka4rhZyvQq5UqiucEw_oc6rrCMGBiWM3qr_lMc8nHnT05X_lAhVsf2q4Pp4M80YTzYH7FoG997NtityO8LA',
  studioStreaming: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCjMngZheCCMKzXdEvViopaozpdluhcNRTbtAseE0Gi4ddl2xZft_fwvUcuNxyuPUZrGR0ALmrqw1Hiy_qjwLB79av0RFG0KQ98GD3Uk3LC7O1YvdJ2BN4U-sOyD4I7w4tTj0OPpKA9QxQx3TMr3BOt_jyB5GsGkNhoW6L8sImz9bJvjwBtf_HjNcE2WM42yTFOYnkJbJBQqFuLuixYW4eNCkm0-cPmZAcmDVqEJAAE7jrgBIKuJvG3',
};

export const INITIAL_AGENDAS: AgendaItem[] = [
  {
    id: 'agenda-25-1',
    title: 'FGD Standarisasi Akad Wakalah bil Ujrah Anggota AASI',
    category: 'komite',
    categoryLabel: 'Komite Teknis',
    status: 'terkonfirmasi',
    statusLabel: 'Terkonfirmasi',
    dateStr: 'Jumat, 25 Okt 2024',
    dayOfMonth: 25,
    month: 10,
    year: 2024,
    timeStr: '09.00 - 11.30 WIB',
    location: 'Ruang Rapat Al-Falah, Lt. 3 • Zoom ID: 891 2231 9901',
    participants: '32 Perwakilan Asuransi Jiwa & Umum Syariah, DPS',
    pic: 'Bpk. Rizky Maulana (Sekretariat)',
    image: AASI_ASSETS.roomMeeting,
    imageCaption: 'Ruang Rapat Al-Falah, Lt. 3 • Zoom ID: 891 2231 9901',
    notesAvailable: true,
    notesTitle: 'Notulensi Persiapan',
    notulensiContent: {
      ketuaRapat: 'Dr. H. Ahmad Syafiq, M.A. (Ketua Komite Syariah & Hukum AASI)',
      agendaUtama: [
        'Harmonisasi klausul batas maksimal ujrah pengelolaan portofolio investasi tabarru',
        'Penyesuaian fatwa DSN-MUI No. 53/DSN-MUI/III/2006 terhadap polis modern',
        'Draft konsensus format sertifikat kepesertaan digital berbasis syariah'
      ],
      ringkasanKeputusan: [
        'Disepakati rentang ujrah standar wajar antara 15% - 25% sesuai kompleksitas produk',
        'Pembentukan pokja kecil revisi redaksional polis standar selesai per 15 November 2024',
        'Surat rekomendasi resmi akan disampaikan kepada Dewan Pengawas Syariah (DPS) seluruh anggota'
      ],
      tindakLanjut: [
        'Sekretariat mendistribusikan draft naskah akademik kepada 56 perusahaan anggota',
        'Pengumpulan masukan tertulis paling lambat Kamis, 31 Oktober 2024 pukul 17.00 WIB'
      ],
      dokumenTerkait: [
        'Draft_Standarisasi_Akad_Wakalah_AASI_v2.pdf (1.4 MB)',
        'Matriks_Komparasi_Polis_Anggota_2024.xlsx (820 KB)'
      ]
    }
  },
  {
    id: 'agenda-25-2',
    title: 'Koordinasi Implementasi POJK Spin-Off Unit Syariah',
    category: 'regulator',
    categoryLabel: 'Audiensi Regulator',
    status: 'menunggu',
    statusLabel: 'Menunggu Konfirmasi',
    dateStr: 'Jumat, 25 Okt 2024',
    dayOfMonth: 25,
    month: 10,
    year: 2024,
    timeStr: '14.00 - 16.00 WIB',
    location: 'Gedung Soemitro Djojohadikusumo, OJK RI',
    participants: 'Delegasi Pengurus Harian AASI & Deputi Direktur OJK',
    pic: 'Ibu Fatimah Zahra, S.E.',
    documentRef: 'SRT-042/AASI-OJK/X/2024',
    notesAvailable: false
  },
  {
    id: 'agenda-29-1',
    title: 'Rapat Evaluasi Triwulan III & Penetapan Iuran Anggota 2025',
    category: 'pleno',
    categoryLabel: 'Rapat Pleno',
    status: 'terkonfirmasi',
    statusLabel: 'Terkonfirmasi',
    dateStr: 'Selasa, 29 Okt 2024',
    dayOfMonth: 29,
    month: 10,
    year: 2024,
    timeStr: '10.00 - 13.00 WIB',
    location: 'Hybrid: Ballroom Hotel Mulia & Zoom Cloud',
    participants: '48 Peserta Terdaftar (Direksi Perusahaan Anggota)',
    pic: 'Sekretaris Jenderal AASI',
    notesAvailable: true,
    notesTitle: 'Bahan Paparan Pleno'
  },
  {
    id: 'agenda-31-1',
    title: 'Sosialisasi Roadmap Perasuransian Syariah Bersama DSN-MUI',
    category: 'webinar',
    categoryLabel: 'Webinar & Edukasi',
    status: 'terkonfirmasi',
    statusLabel: 'Terkonfirmasi',
    dateStr: 'Kamis, 31 Okt 2024',
    dayOfMonth: 31,
    month: 10,
    year: 2024,
    timeStr: '09.00 - 12.00 WIB',
    location: 'Studio Live Broadcast Sekretariat & YouTube AASI Official',
    participants: '150+ Peserta Publik & Praktisi Syariah',
    pic: 'Tim Media & Hubungan Luar',
    image: AASI_ASSETS.studioStreaming,
    imageCaption: 'Broadcast Live Streaming Sekretariat',
    notesAvailable: false
  },
  {
    id: 'agenda-3-1',
    title: 'Rapat Koordinasi Komite Klaim & Underwriting Syariah',
    category: 'komite',
    categoryLabel: 'Komite Teknis',
    status: 'selesai',
    statusLabel: 'Selesai',
    dateStr: 'Kamis, 3 Okt 2024',
    dayOfMonth: 3,
    month: 10,
    year: 2024,
    timeStr: '13.30 - 15.30 WIB',
    location: 'Ruang Rapat Al-Haram, Lt. 2',
    participants: '18 Manajer Underwriting Anggota AASI',
    pic: 'Bpk. Rizky Maulana (Sekretariat)',
    notesAvailable: true,
    notesTitle: 'Risalah Keputusan No. 12/RK-UW/2024'
  },
  {
    id: 'agenda-8-1',
    title: 'Rapat Pimpinan Dewan Pengawas Syariah Anggota Wilayah Barat',
    category: 'pleno',
    categoryLabel: 'Rapat Dewan',
    status: 'selesai',
    statusLabel: 'Selesai',
    dateStr: 'Selasa, 8 Okt 2024',
    dayOfMonth: 8,
    month: 10,
    year: 2024,
    timeStr: '09.30 - 12.00 WIB',
    location: 'Ruang Sidang Utama AASI',
    participants: '18 Anggota DPS & Pengurus Harian',
    pic: 'Ibu Fatimah Zahra, S.E.',
    notesAvailable: true,
    notesTitle: 'Risalah Resmi Diarsipkan',
    notulensiContent: {
      ketuaRapat: 'Prof. Dr. Jaih Mubarok, M.Ag. (Koordinator DPS Wilayah Barat)',
      agendaUtama: [
        'Review kepatuhan syariah pada produk asuransi linked syariah (PAYDI)',
        'Mekanisme pemisahan dana tabarru dan ujrah pengelola',
        'Penetapan standar pedoman opini syariah tahunan'
      ],
      ringkasanKeputusan: [
        'Semua DPS wajib memvalidasi alokasi dana surplus underwriting sebelum dibagikan',
        'Format pelaporan DPS diseragamkan mulai periode laporan Q4 2024',
        'Disetujui pembentukan klinik konsultasi syariah di sekretariat'
      ],
      tindakLanjut: [
        'Sekretariat mendistribusikan format template audit DPS ke seluruh anggota',
        'Pengarsipan risalah resmi ke buku register dewan'
      ],
      dokumenTerkait: [
        'Risalah_DPS_Wilayah_Barat_08102024.pdf (2.1 MB)',
        'Lembar_Tanda_Tangan_Kehadiran_DPS.pdf (780 KB)'
      ]
    }
  },
  {
    id: 'agenda-16-1',
    title: 'Diskusi Tabel Mortalitas Syariah IV Bersama Tim Aktuaria',
    category: 'komite',
    categoryLabel: 'Komite Aktuaria',
    status: 'selesai',
    statusLabel: 'Selesai',
    dateStr: 'Rabu, 16 Okt 2024',
    dayOfMonth: 16,
    month: 10,
    year: 2024,
    timeStr: '10.00 - 12.30 WIB',
    location: 'Auditorium AASI Lt. 3 & Zoom',
    participants: '24 Peserta Hadir Fisik (Aktuaris Perusahaan Anggota)',
    pic: 'Bpk. Rizky Maulana (Sekretariat)',
    notesAvailable: true,
    notesTitle: 'Notulensi Ditandatangani',
    notulensiContent: {
      ketuaRapat: 'Ria Sandra, FSAI (Ketua Komite Aktuaria AASI)',
      agendaUtama: [
        'Validasi data empiris mortalitas peserta asuransi jiwa syariah 2019-2023',
        'Komparasi angka harapan hidup peserta syariah vs tabel konvensional',
        'Penyusunan margin kehati-hatian (margin for adverse deviation)'
      ],
      ringkasanKeputusan: [
        'Tabel Mortalitas Syariah IV (TMS-IV) disetujui untuk uji coba internal anggota',
        'Penerbitan surat edaran teknis penghitungan cadangan premi',
        'Penyampaian draf akhir ke Departemen Pengawasan Asuransi OJK'
      ],
      tindakLanjut: [
        'Tim teknis menyelesaikan software kalkulator konversi mortalitas per awal November'
      ],
      dokumenTerkait: [
        'Laporan_Aktuaria_TMS_IV_AASI.pdf (3.8 MB)'
      ]
    }
  },
  {
    id: 'agenda-24-1',
    title: 'Briefing Internal Sekretariat & Koordinasi Administrasi Mingguan',
    category: 'komite',
    categoryLabel: 'Internal Sekretariat',
    status: 'selesai',
    statusLabel: 'Selesai',
    dateStr: 'Kamis, 24 Okt 2024',
    dayOfMonth: 24,
    month: 10,
    year: 2024,
    timeStr: '08.30 - 09.30 WIB',
    location: 'Ruang Rapat Sekretariat Eksekutif',
    participants: 'Seluruh Staf Tata Usaha & Humas',
    pic: 'Fatimah Zahra, S.E.',
    notesAvailable: true,
    notesTitle: 'Catatan Arahan Harian'
  },
  {
    id: 'agenda-28-1',
    title: 'Rapat Pra-Pleno Komite Regulasi & Advokasi Asuransi Syariah',
    category: 'komite',
    categoryLabel: 'Komite Regulasi',
    status: 'terkonfirmasi',
    statusLabel: 'Terkonfirmasi',
    dateStr: 'Senin, 28 Okt 2024',
    dayOfMonth: 28,
    month: 10,
    year: 2024,
    timeStr: '14.00 - 16.30 WIB',
    location: 'Ruang Rapat Al-Falah, Lt. 3',
    participants: '16 Anggota Komite Regulasi & Legal Counsel',
    pic: 'Bpk. Rizky Maulana (Sekretariat)',
    notesAvailable: false
  },
  {
    id: 'agenda-30-1',
    title: 'Konsolidasi Panitia Munas & Konferensi Tahunan AASI 2024',
    category: 'pleno',
    categoryLabel: 'Kepanitiaan',
    status: 'terkonfirmasi',
    statusLabel: 'Terkonfirmasi',
    dateStr: 'Rabu, 30 Okt 2024',
    dayOfMonth: 30,
    month: 10,
    year: 2024,
    timeStr: '13.00 - 15.30 WIB',
    location: 'Ruang Pertemuan Eksekutif Lantai 2',
    participants: 'Pengurus Harian & Seluruh Koordinator Bidang',
    pic: 'Fatimah Zahra, S.E.',
    notesAvailable: false
  }
];

export const MOCK_SURAT_MASUK: SuratItem[] = [
  {
    id: 'sm-01',
    nomorSurat: 'S-284/NB.211/2024',
    perihal: 'Permintaan Data Progres Pemisahan Unit Syariah (Spin-Off) Semester II 2024',
    pengirimAtauTujuan: 'Departemen Pengawasan Industri Keuangan Non-Bank (IKNB) 2A',
    instansi: 'Otoritas Jasa Keuangan (OJK RI)',
    tanggal: '22 Okt 2024',
    kategori: 'Regulator',
    status: 'Perlu Disposisi',
    sifat: 'Penting / Segera',
    ringkasan: 'OJK meminta rekapitulasi kesiapan permodalan minimum Rp100 miliar dan pemisahan sistem IT bagi 14 unit syariah sebelum 31 Desember 2024.',
    filePdfNama: 'OJK_Permintaan_Data_Spinoff_Okt2024.pdf'
  },
  {
    id: 'sm-02',
    nomorSurat: 'B-419/DSN-MUI/X/2024',
    perihal: 'Pemberitahuan Workshop Sertifikasi Dewan Pengawas Syariah Perasuransian',
    pengirimAtauTujuan: 'Sekretariat Dewan Syariah Nasional',
    instansi: 'DSN-MUI Pusat',
    tanggal: '20 Okt 2024',
    kategori: 'DSN-MUI',
    status: 'Disposisi Selesai',
    sifat: 'Biasa',
    ringkasan: 'Undangan pendaftaran calon anggota DPS asuransi jiwa dan reasuransi syariah angkatan XXVI di Hotel Mercure Ancol.',
    filePdfNama: 'DSN_MUI_Workshop_DPS_XXVI.pdf'
  },
  {
    id: 'sm-03',
    nomorSurat: '088/DIR-PRU/SYR/X/2024',
    perihal: 'Permohonan Narasumber Sosialisasi Produk Asuransi Mikro Syariah Wakaf',
    pengirimAtauTujuan: 'Direktur Kepatuhan & Syariah',
    instansi: 'PT Prudential Sharia Life Assurance',
    tanggal: '18 Okt 2024',
    kategori: 'Perusahaan Anggota',
    status: 'Disposisi Selesai',
    sifat: 'Biasa',
    ringkasan: 'Permohonan kehadiran Sekjen AASI sebagai pembicara kunci dalam peluncuran produk asuransi mikro syariah bagi nasabah UMKM.',
    filePdfNama: 'Prudential_Surat_Narasumber_AASI.pdf'
  },
  {
    id: 'sm-04',
    nomorSurat: 'S-712/KN.4/2024',
    perihal: 'Undangan Diskusi Penguatan Ekosistem Sukuk Negara untuk Portofolio Asuransi Syariah',
    pengirimAtauTujuan: 'Direktorat Pembiayaan Syariah, DJPPR',
    instansi: 'Kementerian Keuangan RI',
    tanggal: '15 Okt 2024',
    kategori: 'Kementerian',
    status: 'Selesai',
    sifat: 'Penting / Segera',
    ringkasan: 'Pembahasan skema penerbitan Project-based Sukuk (PBS) dengan tenor khusus untuk matching kewajiban jangka panjang dana tabarru.',
    filePdfNama: 'Kemenkeu_DJPPR_Sukuk_AsuransiSyariah.pdf'
  }
];

export const MOCK_SURAT_KELUAR: SuratItem[] = [
  {
    id: 'sk-01',
    nomorSurat: 'SRT-042/AASI-OJK/X/2024',
    perihal: 'Permohonan Audiensi Pengurus AASI Terkait Relaksasi Batas Waktu Spin-Off Unit Syariah',
    pengirimAtauTujuan: 'Kepala Eksekutif Pengawas Perasuransian, Penjaminan, dan Dana Pensiun (PPDP)',
    instansi: 'Otoritas Jasa Keuangan (OJK RI)',
    tanggal: '21 Okt 2024',
    kategori: 'Regulator',
    status: 'Terkirim',
    sifat: 'Penting / Segera',
    ringkasan: 'Penyampaian kajian yuridis dan finansial asosiasi serta aspirasi anggota mengenai kesiapan industri menghadapi batas akhir pemisahan unit syariah.',
    filePdfNama: 'SRT-042_AASI_Audiensi_OJK.pdf'
  },
  {
    id: 'sk-02',
    nomorSurat: 'SRT-043/AASI-ANGGOTA/X/2024',
    perihal: 'Undangan Rapat Pleno Evaluasi Q3 & Ketetapan Rencana Kerja Tahunan 2025',
    pengirimAtauTujuan: 'Direktur Utama Seluruh Perusahaan Anggota AASI (56 Perusahaan)',
    instansi: 'Anggota AASI',
    tanggal: '23 Okt 2024',
    kategori: 'Perusahaan Anggota',
    status: 'Menunggu TTD',
    sifat: 'Penting / Segera',
    ringkasan: 'Undangan resmi pelaksanaan Rapat Pleno Hybrid pada Selasa, 29 Oktober 2024 di Hotel Mulia Senayan.',
    filePdfNama: 'SRT-043_Undangan_Pleno_Q3_2024.pdf'
  },
  {
    id: 'sk-03',
    nomorSurat: 'SRT-041/AASI-DSN/X/2024',
    perihal: 'Rekomendasi Format Klausul Polis Asuransi Haji & Umrah Khusus Syariah',
    pengirimAtauTujuan: 'BPH Dewan Syariah Nasional - MUI',
    instansi: 'DSN-MUI Pusat',
    tanggal: '17 Okt 2024',
    kategori: 'DSN-MUI',
    status: 'Terkirim',
    sifat: 'Biasa',
    ringkasan: 'Penyampaian draf kesepakatan komite aktuaria dan syariah mengenai batas santunan badal haji dan proteksi keterlambatan penerbangan.',
    filePdfNama: 'SRT-041_Rekomendasi_Polis_Haji.pdf'
  }
];

export const MOCK_TINDAK_LANJUT: TindakLanjutItem[] = [
  {
    id: 'tl-01',
    perihal: 'Kompilasi Data Kesiapan Modal Minimum Rp100 Miliar Unit Syariah',
    sumberRapat: 'Rapat Pleno Triwulan II (Agustus 2024)',
    pic: 'Fatimah Zahra, S.E. & Tim Analis',
    deadline: '30 Okt 2024',
    status: 'Sedang Berjalan',
    progres: 85
  },
  {
    id: 'tl-02',
    perihal: 'Penerbitan Draft Standarisasi Polis Wakalah bil Ujrah',
    sumberRapat: 'FGD Komite Teknis Syariah (25 Okt 2024)',
    pic: 'Bpk. Rizky Maulana (Sekretariat)',
    deadline: '15 Nov 2024',
    status: 'Sedang Berjalan',
    progres: 60
  },
  {
    id: 'tl-03',
    perihal: 'Sinkronisasi Surat Edaran OJK No. 11/SEOJK.05/2024 ke Sistem Web',
    sumberRapat: 'Rapat Harian Sekretariat (14 Okt 2024)',
    pic: 'Divisi TI & Arsip Digital',
    deadline: '20 Okt 2024',
    status: 'Selesai',
    progres: 100
  }
];
