import React from 'react';
import { AgendaItem } from '../types/secretariat';

interface CalendarSyncModalProps {
  isOpen: boolean;
  onClose: () => void;
  agenda?: AgendaItem | null;
  onTriggerToast: (msg: string) => void;
}

export const CalendarSyncModal: React.FC<CalendarSyncModalProps> = ({
  isOpen,
  onClose,
  agenda,
  onTriggerToast,
}) => {
  if (!isOpen) return null;

  const handleDownloadIcs = () => {
    const title = agenda ? agenda.title : 'Agenda Sekretariat Eksekutif AASI';
    const location = agenda ? agenda.location : 'Ruang Rapat Al-Falah, Lt. 3 / Zoom';
    const description = agenda ? `${agenda.title} - PIC: ${agenda.pic}` : 'Jadwal Agenda Rapat AASI';
    
    const icsData = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//AASI Secretariat//ID',
      'CALSCALE:GREGORIAN',
      'BEGIN:VEVENT',
      `SUMMARY:${title}`,
      `LOCATION:${location}`,
      `DESCRIPTION:${description}`,
      'DTSTART:20241025T020000Z',
      'DTEND:20241025T043000Z',
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `${(agenda ? agenda.title.slice(0, 20) : 'Agenda_AASI')}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    onTriggerToast('File kalender (.ics) berhasil diunduh untuk Google Calendar / Outlook!');
    onClose();
  };

  const handleGoogleCalendarWeb = () => {
    const text = encodeURIComponent(agenda ? agenda.title : 'FGD Standarisasi Akad Wakalah bil Ujrah Anggota AASI');
    const details = encodeURIComponent(agenda ? `PIC: ${agenda.pic} | Peserta: ${agenda.participants}` : 'Sekretariat Eksekutif AASI');
    const location = encodeURIComponent(agenda ? agenda.location : 'Ruang Rapat Al-Falah Lt. 3 & Zoom');
    const gCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${text}&details=${details}&location=${location}&dates=20241025T090000/20241025T113000`;
    
    window.open(gCalUrl, '_blank');
    onTriggerToast('Membuka tautan sinkronisasi Google Calendar...');
    onClose();
  };

  return (
    <div aria-modal="true" className="fixed inset-0 z-50 overflow-y-auto" role="dialog">
      <div
        className="fixed inset-0 bg-[#0b2545]/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="flex min-h-full items-center justify-center p-4 text-left">
        <div className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white p-5 shadow-2xl transition-all z-10 border border-slate-100 flex flex-col gap-4">
          <div className="flex items-start justify-between pb-2 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-lg bg-[#eff4ff] flex items-center justify-center text-[#006a63]">
                <span className="material-symbols-outlined text-[24px]">sync</span>
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#001026]">Sinkronisasi Google Calendar</h3>
                <p className="text-[11px] text-slate-500">Tautkan ke kalender kerja dewan & sekretariat</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-500 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          <div className="p-3 rounded-xl bg-[#f8f9ff] border border-slate-200 text-xs">
            <p className="font-semibold text-slate-900 mb-1">
              {agenda ? agenda.title : 'FGD Standarisasi Akad Wakalah bil Ujrah Anggota AASI'}
            </p>
            <p className="text-slate-600 text-[11px]">
              {agenda ? `${agenda.dateStr} • ${agenda.timeStr}` : 'Jumat, 25 Okt 2024 • 09.00 - 11.30 WIB'}
            </p>
            <p className="text-slate-500 text-[11px] mt-1">
              {agenda ? agenda.location : 'Ruang Rapat Al-Falah, Lt. 3 • Zoom ID: 891 2231 9901'}
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <button
              type="button"
              onClick={handleGoogleCalendarWeb}
              className="w-full py-2.5 px-4 rounded-xl bg-[#006a63] hover:bg-[#00504a] text-white text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">calendar_today</span>
              Buka di Google Calendar Web
            </button>

            <button
              type="button"
              onClick={handleDownloadIcs}
              className="w-full py-2.5 px-4 rounded-xl bg-[#eff4ff] hover:bg-[#e5eeff] text-[#001026] text-xs font-semibold transition-all flex items-center justify-center gap-2 border border-[#dce9ff] cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">download</span>
              Unduh Berkas iCalendar (.ics)
            </button>
          </div>

          <p className="text-[10px] text-slate-400 text-center">
            Pemberitahuan otomatis akan dikirimkan 30 menit sebelum acara ke email terdaftar.
          </p>
        </div>
      </div>
    </div>
  );
};
