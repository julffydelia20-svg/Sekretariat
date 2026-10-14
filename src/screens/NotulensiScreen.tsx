import React, { useState } from 'react';
import { AgendaItem } from '../types/secretariat';

interface NotulensiScreenProps {
  agendas: AgendaItem[];
  onOpenNotulensi: (agenda: AgendaItem) => void;
  onTriggerToast: (msg: string) => void;
}

export const NotulensiScreen: React.FC<NotulensiScreenProps> = ({
  agendas,
  onOpenNotulensi,
  onTriggerToast,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const notulensiAgendas = agendas.filter(
    (a) =>
      a.notesAvailable &&
      (a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.categoryLabel.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="flex flex-col w-full gap-4">
      <div className="bg-[#0b2545] p-4 sm:p-5 rounded-2xl text-white shadow-md flex flex-col gap-2">
        <span className="text-[10px] uppercase font-bold text-[#99efe5] tracking-wider">
          Dokumentasi & Konsensus Syariah
        </span>
        <h1 className="text-xl font-bold text-white">Risalah & Notulensi Resmi</h1>
        <p className="text-xs text-[#778db2]">
          Kumpulan notulensi rapat dewan, komite teknis, dan fatwa operasional asuransi syariah.
        </p>
      </div>

      <div className="relative">
        <span className="material-symbols-outlined absolute left-3 top-2.5 text-slate-400 text-[18px]">
          search
        </span>
        <input
          type="text"
          placeholder="Cari risalah rapat atau topik pembahasan..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full h-10 pl-9 pr-3 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#006a63]"
        />
      </div>

      <div className="flex flex-col gap-3">
        {notulensiAgendas.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl p-4 sm:p-5 shadow-xs border border-slate-100 flex flex-col gap-2.5 transition-all hover:border-[#cbdbf5]"
          >
            <div className="flex items-center justify-between">
              <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-[#99efe5] text-[#006f67]">
                {item.categoryLabel}
              </span>
              <span className="text-xs text-slate-500">{item.dateStr}</span>
            </div>

            <h3 className="text-sm font-bold text-[#001026] leading-snug">{item.title}</h3>

            <p className="text-xs text-slate-600">
              PIC: <strong>{item.pic}</strong> • Peserta: {item.participants}
            </p>

            {item.notulensiContent && (
              <div className="bg-[#f8f9ff] p-3 rounded-lg border border-slate-100 text-xs">
                <span className="text-[10px] uppercase font-bold text-[#006a63] block mb-1">
                  Intisari Kesepakatan:
                </span>
                <p className="text-slate-700 italic">
                  "{item.notulensiContent.ringkasanKeputusan[0]}"
                </p>
              </div>
            )}

            <div className="flex items-center justify-between pt-2 border-t border-[#e5eeff]">
              <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">verified</span>
                Arsip Tersertifikasi
              </span>
              <button
                type="button"
                onClick={() => onOpenNotulensi(item)}
                className="px-3 py-1.5 rounded-lg bg-[#001026] text-white font-semibold text-xs hover:bg-[#0b2545] flex items-center gap-1.5 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">description</span>
                Buka Risalah Lengkap
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
