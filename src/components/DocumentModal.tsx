import React from 'react';

interface DocumentModalProps {
  isOpen: boolean;
  onClose: () => void;
  documentRef?: string;
  onDownloadToast: (msg: string) => void;
}

export const DocumentModal: React.FC<DocumentModalProps> = ({
  isOpen,
  onClose,
  documentRef = 'SRT-042/AASI-OJK/X/2024',
  onDownloadToast,
}) => {
  if (!isOpen) return null;

  return (
    <div aria-modal="true" className="fixed inset-0 z-50 overflow-y-auto" role="dialog">
      <div
        className="fixed inset-0 bg-[#0b2545]/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="flex min-h-full items-center justify-center p-3 sm:p-4 text-left">
        <div className="relative w-full max-w-lg overflow-hidden rounded-2xl bg-white p-5 sm:p-6 shadow-2xl transition-all z-10 border border-slate-100 flex flex-col gap-4">
          <div className="flex items-start justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-lg bg-[#e5eeff] flex items-center justify-center text-[#0b2545]">
                <span className="material-symbols-outlined text-[24px]">article</span>
              </div>
              <div>
                <span className="text-[10px] font-semibold text-[#006a63] uppercase tracking-wider">
                  Berkas Resmi Sekretariat
                </span>
                <h3 className="text-sm sm:text-base font-bold text-[#001026]">
                  Surat Pengantar & Permohonan Audiensi
                </h3>
                <span className="text-xs text-slate-500 font-mono">
                  {documentRef}
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

          {/* Letter Preview Container */}
          <div className="bg-[#f8f9ff] p-4 rounded-xl border border-slate-200 text-xs text-slate-700 font-serif leading-relaxed flex flex-col gap-2.5">
            <div className="text-center pb-2 border-b border-slate-200 font-sans">
              <span className="font-bold text-xs uppercase tracking-wider text-[#001026]">
                ASOSIASI ASURANSI SYARIAH INDONESIA (AASI)
              </span>
              <p className="text-[10px] text-slate-500 font-normal">
                Gedung Permata Kuningan Lt. 6, Jl. Kuningan Mulia Kav. 9C, Jakarta Selatan 12980
              </p>
            </div>

            <div className="flex justify-between items-start font-sans text-[11px] text-slate-600">
              <div>
                <p>Nomor : {documentRef}</p>
                <p>Lampiran : 1 (satu) Berkas Kajian Spin-Off</p>
                <p>Perihal : Permohonan Audiensi & Koordinasi Pelaksanaan POJK Spin-Off</p>
              </div>
              <div className="text-right">
                <p>Jakarta, 21 Oktober 2024</p>
              </div>
            </div>

            <div className="mt-2 text-justify">
              <p className="mb-2">Kepada Yth.<br />
              <strong>Kepala Eksekutif Pengawas PPDP Otoritas Jasa Keuangan (OJK RI)</strong><br />
              Gedung Soemitro Djojohadikusumo, Jakarta Pusat
              </p>
              <p className="indent-4 mb-2">
                Dengan hormat, sehubungan dengan implementasi Peraturan OJK mengenai kewajiban pemisahan (spin-off) Unit Syariah Perusahaan Asuransi dan Reasuransi, Pengurus Harian AASI memohon perkenan waktu untuk mengadakan pertemuan audiensi dan koordinasi teknis bersama jajaran Deputi Direktur OJK pada hari <strong>Jumat, 25 Oktober 2024</strong>.
              </p>
              <p className="indent-4">
                Pertemuan ini dimaksudkan guna menyampaikan laporan kesiapan permodalan, migrasi portofolio tabarru, dan usulan mekanisme masa transisi bagi anggota asosiasi demi menjaga stabilitas industri asuransi syariah nasional.
              </p>
            </div>

            <div className="pt-2 flex justify-between items-end font-sans text-[11px]">
              <div>
                <span className="text-[10px] text-slate-400">Verifikasi Digital: ID-AASI-2024-8891</span>
              </div>
              <div className="text-center">
                <p className="text-slate-500 text-[10px]">Ketua Umum AASI,</p>
                <div className="h-8 flex items-center justify-center font-cursive text-slate-400 italic">
                  [Tanda Tangan Elektronik Sah]
                </div>
                <p className="font-bold text-slate-800">Drs. H. Tatang Nurhidayat</p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-slate-100">
            <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">verified</span>
              Status: Surat Terkirim & Teregister
            </span>
            <button
              type="button"
              onClick={() => {
                onDownloadToast(`Mengunduh dokumen resmi: ${documentRef}.pdf`);
                onClose();
              }}
              className="px-3.5 py-1.5 rounded-lg bg-[#001026] text-white font-semibold text-xs hover:bg-[#0b2545] transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">download</span>
              Unduh Salinan Surat
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
