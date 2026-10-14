import React, { useState } from 'react';
import { AgendaCategory, AgendaItem, AgendaStatus } from '../types/secretariat';

interface AgendaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (newAgenda: AgendaItem) => void;
  initialDay?: number;
}

export const AgendaModal: React.FC<AgendaModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialDay = 25,
}) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<AgendaCategory>('komite');
  const [status, setStatus] = useState<AgendaStatus>('menunggu');
  const [dateStr, setDateStr] = useState(`Jumat, ${initialDay} Okt 2024 | 09.00 - 11.30 WIB`);
  const [location, setLocation] = useState('');
  const [participants, setParticipants] = useState('');
  const [pic, setPic] = useState('Bpk. Rizky Maulana (Sekretariat)');
  const [autoSync, setAutoSync] = useState(true);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const categoryLabels: Record<AgendaCategory, string> = {
      pleno: 'Rapat Pleno',
      komite: 'Komite Teknis',
      regulator: 'Audiensi Regulator',
      webinar: 'Webinar & Sosialisasi',
    };

    const statusLabels: Record<AgendaStatus, string> = {
      terkonfirmasi: 'Terkonfirmasi',
      menunggu: 'Menunggu Konfirmasi',
      ditunda: 'Ditunda',
      selesai: 'Selesai',
    };

    // Extract day of month if possible
    let day = initialDay;
    const matchDay = dateStr.match(/(\d{1,2})\s+Okt/i);
    if (matchDay && matchDay[1]) {
      day = parseInt(matchDay[1], 10);
    }

    const newItem: AgendaItem = {
      id: `agenda-${Date.now()}`,
      title,
      category,
      categoryLabel: categoryLabels[category],
      status,
      statusLabel: statusLabels[status],
      dateStr: dateStr.split('|')[0]?.trim() || `Jumat, ${day} Okt 2024`,
      dayOfMonth: day,
      month: 10,
      year: 2024,
      timeStr: dateStr.split('|')[1]?.trim() || '09.00 - 11.30 WIB',
      location: location || 'Ruang Rapat Al-Falah, Lt. 3 / Zoom',
      participants: participants || 'Perwakilan Perusahaan Anggota AASI',
      pic: pic || 'Fatimah Zahra, S.E.',
      notesAvailable: true,
      notesTitle: 'Notulensi Persiapan Baru',
      notulensiContent: {
        ketuaRapat: pic,
        agendaUtama: [title, 'Pembahasan tindak lanjut administrasi syariah'],
        ringkasanKeputusan: ['Agenda dijadwalkan secara resmi di sistem AASI'],
        tindakLanjut: ['Distribusi undangan ke seluruh peserta terdaftar'],
        dokumenTerkait: ['Undangan_Resmi_AASI.pdf']
      }
    };

    onSave(newItem);
    onClose();
  };

  return (
    <div aria-modal="true" className="fixed inset-0 z-50 overflow-y-auto" role="dialog">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#0b2545]/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog Card */}
      <div className="flex min-h-full items-center justify-center p-3 sm:p-4 text-center">
        <div className="relative w-full max-w-lg overflow-hidden rounded-2xl bg-white p-5 sm:p-6 text-left shadow-2xl transition-all z-10 border border-slate-100">
          {/* Modal Header */}
          <div className="flex items-center justify-between pb-3 border-b border-[#e5eeff]">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-lg bg-[#99efe5] flex items-center justify-center text-[#006f67]">
                <span className="material-symbols-outlined text-[24px]">calendar_add_on</span>
              </div>
              <div>
                <h2 className="text-base font-bold text-[#001026]">Jadwalkan Agenda Baru</h2>
                <p className="text-[11px] text-[#44474e]">
                  Formulir Pendaftaran Rapat & Acara Sekretariat
                </p>
              </div>
            </div>
            <button
              type="button"
              aria-label="Tutup Formulir"
              className="w-8 h-8 rounded-lg hover:bg-[#eff4ff] flex items-center justify-center text-[#44474e] cursor-pointer"
              onClick={onClose}
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          {/* Form */}
          <form className="flex flex-col gap-3.5 mt-4" onSubmit={handleSubmit}>
            {/* Nama Pertemuan */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-[#001026]">
                Nama Pertemuan / Acara *
              </label>
              <input
                className="w-full h-10 px-3 bg-[#f8f9ff] border border-slate-200 rounded-lg text-xs text-[#0b1c30] placeholder:text-[#74777f] focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#006a63]"
                placeholder="Contoh: FGD Standarisasi Akad Wakalah bil Ujrah Anggota AASI"
                required
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            {/* Kategori & Status Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-[#001026]">
                  Kategori Agenda *
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as AgendaCategory)}
                  className="w-full h-10 px-2.5 bg-[#f8f9ff] border border-slate-200 rounded-lg text-xs text-[#0b1c30] focus:outline-none focus:ring-2 focus:ring-[#006a63]"
                >
                  <option value="pleno">Rapat Pleno</option>
                  <option value="komite">Komite Teknis</option>
                  <option value="regulator">Audiensi Regulator</option>
                  <option value="webinar">Webinar & Sosialisasi</option>
                </select>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-[#001026]">
                  Status Awal
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as AgendaStatus)}
                  className="w-full h-10 px-2.5 bg-[#f8f9ff] border border-slate-200 rounded-lg text-xs text-[#0b1c30] focus:outline-none focus:ring-2 focus:ring-[#006a63]"
                >
                  <option value="terkonfirmasi">Terkonfirmasi</option>
                  <option value="menunggu">Menunggu Konfirmasi</option>
                  <option value="ditunda">Ditunda</option>
                  <option value="selesai">Selesai</option>
                </select>
              </div>
            </div>

            {/* Tanggal & Waktu */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-[#001026]">
                Tanggal & Waktu Pelaksanaan *
              </label>
              <input
                className="w-full h-10 px-3 bg-[#f8f9ff] border border-slate-200 rounded-lg text-xs text-[#0b1c30] placeholder:text-[#74777f] focus:outline-none focus:ring-2 focus:ring-[#006a63]"
                placeholder="Hari, Tgl Bln Thn | JJ.MM - JJ.MM WIB"
                required
                type="text"
                value={dateStr}
                onChange={(e) => setDateStr(e.target.value)}
              />
            </div>

            {/* Lokasi / Tautan Meeting */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-[#001026]">
                Lokasi / Tautan Meeting *
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-2.5 top-2.5 text-slate-400 text-[18px]">
                  location_on
                </span>
                <input
                  className="w-full h-10 pl-8 pr-3 bg-[#f8f9ff] border border-slate-200 rounded-lg text-xs text-[#0b1c30] placeholder:text-[#74777f] focus:outline-none focus:ring-2 focus:ring-[#006a63]"
                  placeholder="Ruang Rapat Al-Falah, Lt. 3 / Zoom ID: 891 2231 9901"
                  required
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
            </div>

            {/* Daftar Peserta */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-[#001026]">
                Estimasi & Daftar Peserta
              </label>
              <textarea
                className="w-full p-2.5 bg-[#f8f9ff] border border-slate-200 rounded-lg text-xs text-[#0b1c30] placeholder:text-[#74777f] focus:outline-none focus:ring-2 focus:ring-[#006a63] resize-none"
                placeholder="Contoh: 32 Perwakilan Asuransi Jiwa & Umum Syariah, Dewan Pengawas Syariah"
                rows={2}
                value={participants}
                onChange={(e) => setParticipants(e.target.value)}
              />
            </div>

            {/* PIC Acara */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-[#001026]">
                Penanggung Jawab (PIC) Acara *
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-2.5 top-2.5 text-slate-400 text-[18px]">
                  person
                </span>
                <input
                  className="w-full h-10 pl-8 pr-3 bg-[#f8f9ff] border border-slate-200 rounded-lg text-xs text-[#0b1c30] placeholder:text-[#74777f] focus:outline-none focus:ring-2 focus:ring-[#006a63]"
                  placeholder="Contoh: Bpk. Rizky Maulana (Sekretariat)"
                  required
                  type="text"
                  value={pic}
                  onChange={(e) => setPic(e.target.value)}
                />
              </div>
            </div>

            {/* Checkbox Auto GCal Sync */}
            <label className="flex items-center gap-2 text-[#0b1c30] cursor-pointer mt-0.5">
              <input
                checked={autoSync}
                onChange={(e) => setAutoSync(e.target.checked)}
                className="w-4 h-4 rounded text-[#006a63] accent-[#006a63] focus:ring-[#006a63]"
                type="checkbox"
              />
              <span className="text-xs text-[#44474e]">
                Kirim undangan otomatis & tautkan ke Google Calendar Dewan
              </span>
            </label>

            {/* Actions */}
            <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#e5eeff] mt-2">
              <button
                className="px-3 py-2 rounded-lg text-xs font-semibold text-[#44474e] hover:bg-[#eff4ff] transition-colors cursor-pointer"
                onClick={onClose}
                type="button"
              >
                Batal
              </button>
              <button
                className="px-4 py-2 rounded-lg bg-[#001026] text-white text-xs font-bold shadow hover:bg-[#0b2545] active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
                type="submit"
              >
                <span className="material-symbols-outlined text-[16px]">save</span>
                Simpan Jadwal
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
