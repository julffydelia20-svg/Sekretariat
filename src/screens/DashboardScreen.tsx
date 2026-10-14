import React from 'react';
import { AgendaItem, SuratItem } from '../types/secretariat';
import { AASI_ASSETS } from '../data/mockData';

interface DashboardScreenProps {
  agendas: AgendaItem[];
  suratMasuk: SuratItem[];
  suratKeluar: SuratItem[];
  onNavigateTab: (tab: string) => void;
  onOpenNewAgenda: () => void;
  onOpenNotulensi: (agenda: AgendaItem) => void;
  onTriggerToast: (msg: string) => void;
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({
  agendas,
  suratMasuk,
  suratKeluar,
  onNavigateTab,
  onOpenNewAgenda,
  onOpenNotulensi,
  onTriggerToast,
}) => {
  const pendingSurat = suratMasuk.filter((s) => s.status === 'Perlu Disposisi');
  const todayAgendas = agendas.filter((a) => a.dayOfMonth === 24 || a.dayOfMonth === 25);

  return (
    <div className="flex flex-col w-full gap-4 pb-4">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-[#0b2545] p-4 sm:p-5 text-white shadow-md">
        <div className="flex items-center justify-between gap-3 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#99efe5] text-[#006f67] font-bold uppercase tracking-wider">
                E-Sekretariat AASI
              </span>
              <span className="text-[11px] text-[#778db2]">Sistem Tata Usaha Digital</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              Assalamu'alaikum, Fatimah Zahra
            </h1>
            <p className="text-xs text-[#778db2] mt-0.5">
              Kelola korespondensi regulator, dewan pengawas syariah, & persiapan agenda rapat.
            </p>
          </div>
          <img
            src={AASI_ASSETS.avatar}
            alt="Fatimah Zahra"
            className="w-12 h-12 rounded-full ring-2 ring-[#99efe5] object-cover flex-shrink-0 hidden sm:block"
          />
        </div>

        {/* 4 Key Counters */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4 pt-3 border-t border-[#001026]/40">
          <div
            onClick={() => onNavigateTab('agenda')}
            className="bg-[#001026]/50 hover:bg-[#001026]/75 rounded-lg p-2.5 flex flex-col cursor-pointer transition-colors"
          >
            <span className="text-[11px] text-[#778db2]">Agenda Terjadwal</span>
            <span className="text-lg font-bold text-[#9cf2e8] tabular-nums">
              {agendas.length} Acara
            </span>
          </div>

          <div
            onClick={() => onNavigateTab('surat-masuk')}
            className="bg-[#001026]/50 hover:bg-[#001026]/75 rounded-lg p-2.5 flex flex-col cursor-pointer transition-colors"
          >
            <span className="text-[11px] text-[#778db2]">Perlu Disposisi</span>
            <span className="text-lg font-bold text-amber-300 tabular-nums">
              {pendingSurat.length} Surat
            </span>
          </div>

          <div
            onClick={() => onNavigateTab('surat-keluar')}
            className="bg-[#001026]/50 hover:bg-[#001026]/75 rounded-lg p-2.5 flex flex-col cursor-pointer transition-colors"
          >
            <span className="text-[11px] text-[#778db2]">Surat Keluar</span>
            <span className="text-lg font-bold text-white tabular-nums">
              {suratKeluar.length} Dokumen
            </span>
          </div>

          <div
            onClick={() => onTriggerToast('Daftar Perusahaan Anggota: 56 Anggota Penuh & Unit Syariah')}
            className="bg-[#001026]/50 hover:bg-[#001026]/75 rounded-lg p-2.5 flex flex-col cursor-pointer transition-colors"
          >
            <span className="text-[11px] text-[#778db2]">Anggota AASI</span>
            <span className="text-lg font-bold text-[#9cf2e8] tabular-nums">
              56 Perusahaan
            </span>
          </div>
        </div>
      </div>

      {/* Quick Actions Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        <button
          type="button"
          onClick={onOpenNewAgenda}
          className="p-3 bg-white hover:bg-[#eff4ff] border border-slate-100 rounded-xl shadow-xs flex items-center gap-2.5 text-left transition-all cursor-pointer"
        >
          <div className="w-8 h-8 rounded-lg bg-[#99efe5] flex items-center justify-center text-[#006f67] flex-shrink-0">
            <span className="material-symbols-outlined text-[18px]">add_circle</span>
          </div>
          <div className="min-w-0">
            <span className="text-xs font-bold text-[#001026] block truncate">+ Rapat Baru</span>
            <span className="text-[10px] text-slate-500 truncate block">Jadwalkan agenda</span>
          </div>
        </button>

        <button
          type="button"
          onClick={() => onNavigateTab('surat-masuk')}
          className="p-3 bg-white hover:bg-[#eff4ff] border border-slate-100 rounded-xl shadow-xs flex items-center gap-2.5 text-left transition-all cursor-pointer"
        >
          <div className="w-8 h-8 rounded-lg bg-[#eff4ff] flex items-center justify-center text-[#006a63] flex-shrink-0">
            <span className="material-symbols-outlined text-[18px]">mark_email_unread</span>
          </div>
          <div className="min-w-0">
            <span className="text-xs font-bold text-[#001026] block truncate">Disposisi Surat</span>
            <span className="text-[10px] text-slate-500 truncate block">Tinjau surat masuk</span>
          </div>
        </button>

        <button
          type="button"
          onClick={() => onNavigateTab('surat-keluar')}
          className="p-3 bg-white hover:bg-[#eff4ff] border border-slate-100 rounded-xl shadow-xs flex items-center gap-2.5 text-left transition-all cursor-pointer"
        >
          <div className="w-8 h-8 rounded-lg bg-[#e5eeff] flex items-center justify-center text-[#0b2545] flex-shrink-0">
            <span className="material-symbols-outlined text-[18px]">outgoing_mail</span>
          </div>
          <div className="min-w-0">
            <span className="text-xs font-bold text-[#001026] block truncate">Nomor Surat</span>
            <span className="text-[10px] text-slate-500 truncate block">Penomoran resmi</span>
          </div>
        </button>

        <button
          type="button"
          onClick={() => onNavigateTab('notulensi-rapat')}
          className="p-3 bg-white hover:bg-[#eff4ff] border border-slate-100 rounded-xl shadow-xs flex items-center gap-2.5 text-left transition-all cursor-pointer"
        >
          <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-700 flex-shrink-0">
            <span className="material-symbols-outlined text-[18px]">verified</span>
          </div>
          <div className="min-w-0">
            <span className="text-xs font-bold text-[#001026] block truncate">Risalah Syariah</span>
            <span className="text-[10px] text-slate-500 truncate block">Arsip & tanda tangan</span>
          </div>
        </button>
      </div>

      {/* Agenda Fokus Terdekat */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-xs border border-slate-100 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#006a63] text-[20px]">event_available</span>
            <h2 className="text-sm font-bold text-[#001026]">Agenda Prioritas Terdekat</h2>
          </div>
          <button
            type="button"
            onClick={() => onNavigateTab('agenda')}
            className="text-xs font-semibold text-[#006a63] hover:underline flex items-center gap-0.5 cursor-pointer"
          >
            Lihat Kalender Lengkap
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          </button>
        </div>

        <div className="flex flex-col gap-2">
          {todayAgendas.slice(0, 2).map((item) => (
            <div
              key={item.id}
              className="p-3 rounded-xl bg-[#f8f9ff] hover:bg-[#eff4ff] border border-slate-200 transition-colors flex flex-col gap-1.5"
            >
              <div className="flex items-center justify-between text-[11px]">
                <span className="px-2 py-0.5 rounded-full font-semibold bg-[#99efe5] text-[#006f67]">
                  {item.categoryLabel}
                </span>
                <span className="font-semibold text-slate-700">{item.dateStr} • {item.timeStr}</span>
              </div>
              <h3 className="text-xs sm:text-sm font-bold text-slate-900">{item.title}</h3>
              <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-200/60">
                <span className="truncate max-w-[220px]">Lokasi: {item.location}</span>
                <button
                  type="button"
                  onClick={() => onOpenNotulensi(item)}
                  className="font-bold text-[#006a63] hover:underline cursor-pointer"
                >
                  Detail & Notulensi
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dua Kolom: Surat Masuk Regulator & Rekap Anggota */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* Surat Masuk Butuh Tindakan */}
        <div className="bg-white rounded-2xl p-4 shadow-xs border border-slate-100 flex flex-col gap-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#001026] flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#006a63] text-[18px]">inbox</span>
              Surat Masuk Butuh Tindakan
            </span>
            <button
              onClick={() => onNavigateTab('surat-masuk')}
              className="text-[11px] text-[#006a63] font-semibold hover:underline"
            >
              Semua ({suratMasuk.length})
            </button>
          </div>

          <div className="flex flex-col gap-2">
            {suratMasuk.slice(0, 2).map((sm) => (
              <div
                key={sm.id}
                onClick={() => onNavigateTab('surat-masuk')}
                className="p-2.5 rounded-xl bg-[#eff4ff]/60 border border-[#dce9ff] flex flex-col gap-1 cursor-pointer hover:bg-[#eff4ff]"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-slate-500 font-semibold">{sm.nomorSurat}</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-800 font-semibold">
                    {sm.status}
                  </span>
                </div>
                <p className="text-xs font-semibold text-slate-900 line-clamp-1">{sm.perihal}</p>
                <span className="text-[10px] text-slate-500">{sm.instansi} • {sm.tanggal}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Profil Keanggotaan Asuransi Syariah */}
        <div className="bg-white rounded-2xl p-4 shadow-xs border border-slate-100 flex flex-col gap-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#001026] flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#006a63] text-[18px]">account_balance</span>
              Keanggotaan AASI Terdaftar
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-semibold">
              Kepatuhan Syariah 100%
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="p-2 rounded-xl bg-[#f8f9ff] border border-slate-100">
              <span className="block text-slate-500 text-[10px]">Jiwa Syariah</span>
              <strong className="text-sm text-[#001026]">29</strong>
              <span className="text-[9px] text-slate-400 block">Perusahaan</span>
            </div>
            <div className="p-2 rounded-xl bg-[#f8f9ff] border border-slate-100">
              <span className="block text-slate-500 text-[10px]">Umum Syariah</span>
              <strong className="text-sm text-[#001026]">23</strong>
              <span className="text-[9px] text-slate-400 block">Perusahaan</span>
            </div>
            <div className="p-2 rounded-xl bg-[#f8f9ff] border border-slate-100">
              <span className="block text-slate-500 text-[10px]">Reasuransi</span>
              <strong className="text-sm text-[#001026]">4</strong>
              <span className="text-[9px] text-slate-400 block">Perusahaan</span>
            </div>
          </div>

          <p className="text-[11px] text-slate-500 leading-relaxed">
            Terhubung langsung dengan forum komunikasi Dewan Pengawas Syariah (DPS) dan sistem pelaporan OJK RI.
          </p>
        </div>
      </div>
    </div>
  );
};
