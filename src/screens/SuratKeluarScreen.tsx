import React, { useState } from 'react';
import { SuratItem } from '../types/secretariat';

interface SuratKeluarScreenProps {
  suratList: SuratItem[];
  onTriggerToast: (msg: string) => void;
  onOpenDocument: (docRef: string) => void;
}

export const SuratKeluarScreen: React.FC<SuratKeluarScreenProps> = ({
  suratList,
  onTriggerToast,
  onOpenDocument,
}) => {
  const [showNewLetterModal, setShowNewLetterModal] = useState(false);
  const [perihal, setPerihal] = useState('');
  const [tujuan, setTujuan] = useState('');
  const [instansi, setInstansi] = useState('');

  const handleBuatNomor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!perihal.trim() || !instansi.trim()) return;

    onTriggerToast(`Nomor surat resmi SRT-044/AASI-${instansi.slice(0, 4).toUpperCase()}/X/2024 berhasil diterbitkan!`);
    setShowNewLetterModal(false);
    setPerihal('');
    setTujuan('');
    setInstansi('');
  };

  return (
    <div className="flex flex-col w-full gap-4">
      {/* Header Banner */}
      <div className="bg-[#0b2545] p-4 sm:p-5 rounded-2xl text-white shadow-md flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold text-[#99efe5] tracking-wider">
              Buku Registrasi Naskah
            </span>
            <h1 className="text-xl font-bold text-white">Surat Keluar & Penomoran</h1>
            <p className="text-xs text-[#778db2]">
              Pencatatan nomor surat resmi, verifikasi tanda tangan digital, & arsip keluar.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setShowNewLetterModal(true)}
            className="px-3 py-2 bg-[#006a63] hover:bg-[#00504a] text-white text-xs font-semibold rounded-lg shadow-sm flex items-center gap-1.5 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">add_circle</span>
            <span>+ Terbitkan Nomor</span>
          </button>
        </div>
      </div>

      {/* List */}
      <div className="flex flex-col gap-3">
        {suratList.map((surat) => (
          <div
            key={surat.id}
            className="bg-white rounded-xl p-4 sm:p-5 shadow-xs border border-slate-100 flex flex-col gap-2.5 transition-all hover:border-[#cbdbf5]"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-[#006a63] bg-[#eff4ff] px-2 py-0.5 rounded">
                  {surat.nomorSurat}
                </span>
                <span className="text-[11px] text-slate-500">{surat.tanggal}</span>
              </div>

              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                surat.status === 'Terkirim'
                  ? 'bg-emerald-50 text-emerald-700'
                  : 'bg-amber-100 text-amber-800'
              }`}>
                {surat.status}
              </span>
            </div>

            <div>
              <h2 className="text-sm font-bold text-[#001026] leading-snug">
                {surat.perihal}
              </h2>
              <p className="text-xs text-[#44474e] mt-0.5">
                Tujuan: <strong className="text-slate-800">{surat.pengirimAtauTujuan}</strong> ({surat.instansi})
              </p>
            </div>

            <p className="text-xs text-slate-600 bg-[#f8f9ff] p-2.5 rounded-lg border border-slate-100 leading-relaxed">
              {surat.ringkasan}
            </p>

            <div className="flex items-center justify-between pt-2 border-t border-[#e5eeff] text-xs">
              <span className="text-[11px] text-slate-400 font-mono">
                {surat.filePdfNama}
              </span>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onOpenDocument(surat.nomorSurat)}
                  className="text-xs text-[#006a63] font-semibold flex items-center gap-1 hover:underline cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">visibility</span>
                  Lihat Draf Surat
                </button>

                {surat.status === 'Menunggu TTD' ? (
                  <button
                    type="button"
                    onClick={() => onTriggerToast(`Permintaan verifikasi tanda tangan dikirimkan ke Ketua Umum!`)}
                    className="px-3 py-1 rounded-lg bg-amber-500 hover:bg-amber-600 text-white font-semibold text-xs flex items-center gap-1 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[16px]">draw</span>
                    Tanda Tangan Digital
                  </button>
                ) : (
                  <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">check_circle</span>
                    Terkirim Resmi
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Terbitkan Nomor Surat */}
      {showNewLetterModal && (
        <div aria-modal="true" className="fixed inset-0 z-50 overflow-y-auto" role="dialog">
          <div
            className="fixed inset-0 bg-[#0b2545]/60 backdrop-blur-sm"
            onClick={() => setShowNewLetterModal(false)}
          />

          <div className="flex min-h-full items-center justify-center p-4 text-left">
            <div className="relative w-full max-w-lg rounded-2xl bg-white p-5 shadow-2xl z-10 border border-slate-100">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <h3 className="text-sm font-bold text-[#001026]">Penerbitan Nomor Surat Keluar</h3>
                  <p className="text-[11px] text-slate-500">Penomoran terintegrasi format tata naskah dinas AASI</p>
                </div>
                <button
                  onClick={() => setShowNewLetterModal(false)}
                  className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-500 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[20px]">close</span>
                </button>
              </div>

              <form onSubmit={handleBuatNomor} className="flex flex-col gap-3 mt-3 text-xs">
                <div className="flex flex-col gap-1">
                  <label className="font-semibold text-slate-800">Perihal Surat *</label>
                  <input
                    type="text"
                    required
                    value={perihal}
                    onChange={(e) => setPerihal(e.target.value)}
                    placeholder="Contoh: Tanggapan Revisi Draf Fatwa DSN-MUI Mengenai Reasuransi Syariah"
                    className="h-10 px-3 bg-[#f8f9ff] border border-slate-200 rounded-lg text-xs focus:bg-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="flex flex-col gap-1">
                    <label className="font-semibold text-slate-800">Instansi Tujuan *</label>
                    <input
                      type="text"
                      required
                      value={instansi}
                      onChange={(e) => setInstansi(e.target.value)}
                      placeholder="Contoh: OJK RI / DSN-MUI"
                      className="h-10 px-3 bg-[#f8f9ff] border border-slate-200 rounded-lg text-xs focus:bg-white"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="font-semibold text-slate-800">Pejabat Penerima</label>
                    <input
                      type="text"
                      value={tujuan}
                      onChange={(e) => setTujuan(e.target.value)}
                      placeholder="Contoh: Deputi Komisioner Pengawas"
                      className="h-10 px-3 bg-[#f8f9ff] border border-slate-200 rounded-lg text-xs focus:bg-white"
                    />
                  </div>
                </div>

                <div className="bg-[#eff4ff] p-3 rounded-lg border border-[#dce9ff] text-slate-700">
                  <span className="text-[10px] text-slate-500 block">Preview Nomor Surat Otomatis:</span>
                  <span className="font-mono font-bold text-xs text-[#006a63]">
                    SRT-044/AASI-{instansi ? instansi.slice(0, 4).toUpperCase() : 'EXT'}/X/2024
                  </span>
                </div>

                <div className="flex justify-end gap-2 pt-2 border-t border-slate-100 mt-2">
                  <button
                    type="button"
                    onClick={() => setShowNewLetterModal(false)}
                    className="px-3 py-2 rounded-lg text-slate-600 hover:bg-slate-100"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#001026] hover:bg-[#0b2545] text-white rounded-lg font-bold flex items-center gap-1.5"
                  >
                    <span className="material-symbols-outlined text-[16px]">save</span>
                    Terbitkan Nomor Resmi
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
