import React from 'react';
import { AgendaItem } from '../types/secretariat';

interface NotulensiModalProps {
  agenda: AgendaItem | null;
  isOpen: boolean;
  onClose: () => void;
  onDownloadToast: (msg: string) => void;
}

export const NotulensiModal: React.FC<NotulensiModalProps> = ({
  agenda,
  isOpen,
  onClose,
  onDownloadToast,
}) => {
  if (!isOpen || !agenda) return null;

  const content = agenda.notulensiContent || {
    ketuaRapat: agenda.pic,
    agendaUtama: [
      agenda.title,
      'Penetapan tata tertib dan pembahasan substansi teknis',
      'Koordinasi tindak lanjut dengan komite terkait'
    ],
    ringkasanKeputusan: [
      'Seluruh peserta menyepakati draf acuan kerja',
      'Sekretariat ditugaskan mendokumentasikan notulensi resmi'
    ],
    tindakLanjut: [
      'Penyampaian hasil rapat kepada Dewan Pengurus Harian AASI'
    ],
    dokumenTerkait: ['Risalah_Rapat_Resmi_AASI.pdf (1.2 MB)']
  };

  return (
    <div aria-modal="true" className="fixed inset-0 z-50 overflow-y-auto" role="dialog">
      <div
        className="fixed inset-0 bg-[#0b2545]/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="flex min-h-full items-center justify-center p-3 sm:p-4 text-left">
        <div className="relative w-full max-w-xl overflow-hidden rounded-2xl bg-white p-5 sm:p-6 shadow-2xl transition-all z-10 border border-slate-100 flex flex-col gap-4">
          {/* Header */}
          <div className="flex items-start justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-lg bg-[#eff4ff] flex items-center justify-center text-[#006a63]">
                <span className="material-symbols-outlined text-[24px]">description</span>
              </div>
              <div>
                <span className="text-[10px] font-semibold text-[#006a63] uppercase tracking-wider">
                  Risalah & Notulensi Resmi AASI
                </span>
                <h3 className="text-sm sm:text-base font-bold text-[#001026]">
                  {agenda.title}
                </h3>
                <span className="text-xs text-slate-500">
                  {agenda.dateStr} • {agenda.timeStr}
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-500 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          {/* Meta Information Grid */}
          <div className="grid grid-cols-2 gap-2 text-xs bg-[#f8f9ff] p-3 rounded-xl border border-slate-100">
            <div>
              <span className="text-slate-400 block text-[10px] uppercase">Pimpinan / PIC Rapat</span>
              <span className="font-semibold text-slate-800">{content.ketuaRapat}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase">Lokasi / Media</span>
              <span className="font-semibold text-slate-800 truncate block">{agenda.location}</span>
            </div>
          </div>

          {/* Sections */}
          <div className="flex flex-col gap-3 text-xs max-h-72 overflow-y-auto pr-1">
            {/* Agenda Utama */}
            <div>
              <h4 className="font-bold text-slate-800 mb-1 flex items-center gap-1.5 text-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[#006a63]"></span>
                Agenda Utama Rapat
              </h4>
              <ul className="list-disc list-inside space-y-1 text-slate-600 pl-1">
                {content.agendaUtama.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>

            {/* Ringkasan Keputusan */}
            <div className="bg-[#eff4ff]/60 p-3 rounded-lg border border-[#e5eeff]">
              <h4 className="font-bold text-[#006a63] mb-1 flex items-center gap-1.5 text-xs">
                <span className="material-symbols-outlined text-[16px]">verified</span>
                Ringkasan Keputusan & Fatwa / Regulasi
              </h4>
              <ul className="list-disc list-inside space-y-1 text-slate-700 pl-1">
                {content.ringkasanKeputusan.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>

            {/* Tindak Lanjut */}
            <div>
              <h4 className="font-bold text-slate-800 mb-1 flex items-center gap-1.5 text-xs">
                <span className="material-symbols-outlined text-[16px] text-amber-600">assignment_late</span>
                Rencana Tindak Lanjut Sekretariat
              </h4>
              <ul className="list-disc list-inside space-y-1 text-slate-600 pl-1">
                {content.tindakLanjut.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>

            {/* Dokumen Lampiran */}
            <div>
              <h4 className="font-bold text-slate-800 mb-1 text-xs">Dokumen Terkait</h4>
              <div className="flex flex-col gap-1.5">
                {content.dokumenTerkait.map((doc, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-200"
                  >
                    <span className="text-slate-700 font-medium truncate">{doc}</span>
                    <button
                      type="button"
                      onClick={() => onDownloadToast(`Mengunduh berkas lampiran: ${doc}`)}
                      className="text-[#006a63] hover:underline flex items-center gap-1 text-[11px] font-semibold cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[16px]">download</span>
                      Unduh
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-between pt-3 border-t border-slate-100">
            <span className="text-[11px] text-slate-500">
              Status: <strong className="text-emerald-700">Tersertifikasi Digital</strong>
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  onDownloadToast('Menyimpan lembar notulensi PDF resmi...');
                  onClose();
                }}
                className="px-3.5 py-1.5 rounded-lg bg-[#006a63] text-white font-semibold text-xs hover:bg-[#00504a] transition-all flex items-center gap-1 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">print</span>
                Cetak / Ekspor PDF
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
