import React, { useState } from 'react';
import { SuratItem } from '../types/secretariat';

interface SuratMasukScreenProps {
  suratList: SuratItem[];
  onTriggerToast: (msg: string) => void;
  onOpenDocument: (docRef: string) => void;
}

export const SuratMasukScreen: React.FC<SuratMasukScreenProps> = ({
  suratList,
  onTriggerToast,
  onOpenDocument,
}) => {
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedSuratForDisposisi, setSelectedSuratForDisposisi] = useState<SuratItem | null>(null);
  const [disposisiTarget, setDisposisiTarget] = useState<string>('Ketua Umum & Sekjen');
  const [disposisiCatatan, setDisposisiCatatan] = useState<string>('Mohon dikaji dan disiapkan bahan paparan rapat komite.');

  const filteredSurat = suratList.filter((item) => {
    const matchesFilter =
      filterStatus === 'all' ||
      (filterStatus === 'perlu' && item.status === 'Perlu Disposisi') ||
      (filterStatus === 'selesai' && item.status === 'Disposisi Selesai');

    const matchesSearch =
      item.nomorSurat.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.perihal.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.instansi.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const handleSimpanDisposisi = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSuratForDisposisi) return;

    onTriggerToast(`Lembar disposisi untuk surat ${selectedSuratForDisposisi.nomorSurat} diteruskan ke ${disposisiTarget}!`);
    setSelectedSuratForDisposisi(null);
  };

  return (
    <div className="flex flex-col w-full gap-4">
      {/* Header Banner */}
      <div className="bg-[#0b2545] p-4 sm:p-5 rounded-2xl text-white shadow-md flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold text-[#99efe5] tracking-wider">
              Tata Naskah Dinas AASI
            </span>
            <h1 className="text-xl font-bold text-white">Surat Masuk Eksekutif</h1>
            <p className="text-xs text-[#778db2]">
              Registrasi surat dari OJK, DSN-MUI, Kementerian, & Perusahaan Anggota.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onTriggerToast('Formulir pencatatan surat masuk baru dibuka')}
            className="px-3 py-2 bg-[#006a63] hover:bg-[#00504a] text-white text-xs font-semibold rounded-lg shadow-sm flex items-center gap-1.5 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            <span>+ Catat Surat</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="relative flex-1">
          <span className="material-symbols-outlined absolute left-3 top-2.5 text-slate-400 text-[18px]">
            search
          </span>
          <input
            type="text"
            placeholder="Cari nomor surat, pengirim, atau kata kunci..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-10 pl-9 pr-3 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#006a63]"
          />
        </div>

        <div className="flex items-center gap-1 bg-[#e5eeff] p-1 rounded-xl">
          <button
            type="button"
            onClick={() => setFilterStatus('all')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              filterStatus === 'all'
                ? 'bg-white text-[#001026] shadow-xs'
                : 'text-[#44474e] hover:text-[#001026]'
            }`}
          >
            Semua ({suratList.length})
          </button>
          <button
            type="button"
            onClick={() => setFilterStatus('perlu')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              filterStatus === 'perlu'
                ? 'bg-white text-[#001026] shadow-xs'
                : 'text-[#44474e] hover:text-[#001026]'
            }`}
          >
            Perlu Disposisi
          </button>
          <button
            type="button"
            onClick={() => setFilterStatus('selesai')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              filterStatus === 'selesai'
                ? 'bg-white text-[#001026] shadow-xs'
                : 'text-[#44474e] hover:text-[#001026]'
            }`}
          >
            Disposisi Selesai
          </button>
        </div>
      </div>

      {/* Surat List */}
      <div className="flex flex-col gap-3">
        {filteredSurat.map((surat) => (
          <div
            key={surat.id}
            className="bg-white rounded-xl p-4 sm:p-5 shadow-xs border border-slate-100 flex flex-col gap-2.5 transition-all hover:border-[#cbdbf5]"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-[#001026] bg-[#eff4ff] px-2 py-0.5 rounded">
                  {surat.nomorSurat}
                </span>
                <span className="text-[11px] text-slate-500">{surat.tanggal}</span>
              </div>

              <div className="flex items-center gap-1.5">
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                  surat.sifat.includes('Penting') ? 'bg-red-50 text-red-700' : 'bg-slate-100 text-slate-600'
                }`}>
                  {surat.sifat}
                </span>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                  surat.status === 'Perlu Disposisi'
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-emerald-50 text-emerald-700'
                }`}>
                  {surat.status}
                </span>
              </div>
            </div>

            <div>
              <h2 className="text-sm font-bold text-[#001026] leading-snug">
                {surat.perihal}
              </h2>
              <p className="text-xs text-[#006a63] font-medium mt-0.5">
                {surat.instansi} • {surat.pengirimAtauTujuan}
              </p>
            </div>

            <p className="text-xs text-slate-600 bg-[#f8f9ff] p-2.5 rounded-lg border border-slate-100 leading-relaxed">
              {surat.ringkasan}
            </p>

            <div className="flex items-center justify-between pt-2 border-t border-[#e5eeff] text-xs">
              <span className="text-[11px] text-slate-400 font-mono">
                Berkas: {surat.filePdfNama}
              </span>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onOpenDocument(surat.nomorSurat)}
                  className="text-xs text-[#006a63] font-semibold flex items-center gap-1 hover:underline cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">visibility</span>
                  Lihat Berkas
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedSuratForDisposisi(surat)}
                  className="px-3 py-1 rounded-lg bg-[#001026] text-white font-semibold text-xs hover:bg-[#0b2545] transition-all flex items-center gap-1 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">assignment</span>
                  Disposisi
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Disposisi Modal */}
      {selectedSuratForDisposisi && (
        <div aria-modal="true" className="fixed inset-0 z-50 overflow-y-auto" role="dialog">
          <div
            className="fixed inset-0 bg-[#0b2545]/60 backdrop-blur-sm"
            onClick={() => setSelectedSuratForDisposisi(null)}
          />

          <div className="flex min-h-full items-center justify-center p-4 text-left">
            <div className="relative w-full max-w-lg rounded-2xl bg-white p-5 shadow-2xl z-10 border border-slate-100">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <h3 className="text-sm font-bold text-[#001026]">Lembar Disposisi Elektronik</h3>
                  <p className="text-[11px] text-slate-500 font-mono">
                    {selectedSuratForDisposisi.nomorSurat}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedSuratForDisposisi(null)}
                  className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-500 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[20px]">close</span>
                </button>
              </div>

              <form onSubmit={handleSimpanDisposisi} className="flex flex-col gap-3 mt-3 text-xs">
                <div className="bg-[#f8f9ff] p-2.5 rounded-lg border border-slate-200">
                  <span className="text-[10px] text-slate-400 block uppercase">Perihal Surat</span>
                  <p className="font-semibold text-slate-800">{selectedSuratForDisposisi.perihal}</p>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="font-semibold text-slate-800">Diteruskan Kepada *</label>
                  <select
                    value={disposisiTarget}
                    onChange={(e) => setDisposisiTarget(e.target.value)}
                    className="h-10 px-3 bg-white border border-slate-200 rounded-lg text-xs"
                  >
                    <option value="Ketua Umum & Sekjen">Ketua Umum & Sekretaris Jenderal</option>
                    <option value="Komite Syariah & Hukum">Komite Syariah & Hukum</option>
                    <option value="Komite Aktuaria & Regulasi">Komite Aktuaria & Regulasi</option>
                    <option value="Direktur Eksekutif">Direktur Eksekutif AASI</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="font-semibold text-slate-800">Instruksi / Catatan Disposisi *</label>
                  <textarea
                    rows={3}
                    value={disposisiCatatan}
                    onChange={(e) => setDisposisiCatatan(e.target.value)}
                    className="p-2.5 bg-white border border-slate-200 rounded-lg text-xs resize-none"
                    placeholder="Tuliskan arahan tindak lanjut..."
                    required
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2 border-t border-slate-100 mt-2">
                  <button
                    type="button"
                    onClick={() => setSelectedSuratForDisposisi(null)}
                    className="px-3 py-2 rounded-lg text-slate-600 hover:bg-slate-100"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#006a63] hover:bg-[#00504a] text-white rounded-lg font-bold flex items-center gap-1.5"
                  >
                    <span className="material-symbols-outlined text-[16px]">send</span>
                    Teruskan Disposisi
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
