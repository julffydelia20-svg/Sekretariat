import React, { useState } from 'react';
import { AgendaCategory, AgendaItem } from '../types/secretariat';
import { AASI_ASSETS } from '../data/mockData';

interface AgendaScreenProps {
  agendas: AgendaItem[];
  onOpenNewModal: () => void;
  onOpenNotulensi: (agenda: AgendaItem) => void;
  onOpenDocument: (docRef: string) => void;
  onOpenSync: (agenda: AgendaItem) => void;
  onTriggerToast: (msg: string) => void;
}

export const AgendaScreen: React.FC<AgendaScreenProps> = ({
  agendas,
  onOpenNewModal,
  onOpenNotulensi,
  onOpenDocument,
  onOpenSync,
  onTriggerToast,
}) => {
  const [activeView, setActiveView] = useState<'calendar' | 'list'>('calendar');
  const [selectedFilter, setSelectedFilter] = useState<'all' | AgendaCategory>('all');
  const [selectedDay, setSelectedDay] = useState<number>(25);

  // Month navigation (current is October 2024 / 1446 H)
  const currentMonthName = 'Oktober 2024';
  const hijriYear = '1446 H';

  // Filter agendas by category
  const filteredAgendas = agendas.filter((item) => {
    if (selectedFilter === 'all') return true;
    return item.category === selectedFilter;
  });

  // Filter agendas for selected day in calendar view
  const agendasForSelectedDay = filteredAgendas.filter(
    (item) => item.dayOfMonth === selectedDay
  );

  // Days with events for calendar dots
  const komiteDays = [3, 16, 25, 28, 30];
  const plenoDays = [8, 29];

  const handleFilterClick = (filter: 'all' | AgendaCategory, label: string) => {
    setSelectedFilter(filter);
    onTriggerToast(`Memfilter agenda berdasarkan: ${label}`);
  };

  const handleDayClick = (day: number) => {
    setSelectedDay(day);
    const dayItemCount = agendas.filter((a) => a.dayOfMonth === day).length;
    onTriggerToast(`Melihat agenda tanggal ${day} Oktober 2024 (${dayItemCount} kegiatan)`);
  };

  const getDayFormattedTitle = (day: number) => {
    const daysName = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    // 2024-10-day
    const dateObj = new Date(2024, 9, day);
    const dayName = daysName[dateObj.getDay()];
    return `Agenda Terpilih: ${dayName}, ${day} Okt 2024`;
  };

  return (
    <div className="flex flex-col w-full gap-4">
      {/* Top Welcome & Quick Metric Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-[#0b2545] p-4 sm:p-5 text-white shadow-md">
        <div className="absolute -right-6 -bottom-6 w-32 h-32 rounded-full bg-[#006a63]/25 blur-xl pointer-events-none" />
        <div className="flex items-center justify-between gap-3 relative z-10">
          <div className="flex flex-col min-w-0">
            <span className="text-[11px] text-[#778db2] uppercase tracking-wider font-semibold">
              Sekretariat Eksekutif AASI
            </span>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white mt-0.5">
              Agenda Kegiatan & Rapat
            </h1>
            <p className="text-xs text-[#778db2] mt-0.5 max-w-md">
              Pantau kesiapan pleno, audiensi OJK, & forum komite syariah.
            </p>
          </div>
          <button
            type="button"
            onClick={onOpenNewModal}
            className="flex items-center gap-1.5 bg-[#006a63] hover:bg-[#00504a] active:scale-95 transition-all text-white px-3 py-2 rounded-lg shadow-md flex-shrink-0 cursor-pointer font-semibold text-xs"
          >
            <span className="material-symbols-outlined text-[18px]">add_circle</span>
            <span className="whitespace-nowrap">+ Agenda</span>
          </button>
        </div>

        {/* Mini KPI Strip */}
        <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-[#001026]/40">
          <div className="bg-[#001026]/50 rounded-lg p-2.5 flex flex-col">
            <span className="text-[11px] text-[#778db2]">Bulan Ini</span>
            <span className="text-base sm:text-lg font-bold text-[#9cf2e8] tabular-nums">
              14 Rapat
            </span>
          </div>
          <div className="bg-[#001026]/50 rounded-lg p-2.5 flex flex-col">
            <span className="text-[11px] text-[#778db2]">Mendatang</span>
            <span className="text-base sm:text-lg font-bold text-white tabular-nums">
              5 Acara
            </span>
          </div>
          <div className="bg-[#001026]/50 rounded-lg p-2.5 flex flex-col">
            <span className="text-[11px] text-[#778db2]">Tingkat Hadir</span>
            <span className="text-base sm:text-lg font-bold text-[#9cf2e8] tabular-nums">
              94.8%
            </span>
          </div>
        </div>
      </div>

      {/* Interactive View Switcher & Filter Chips */}
      <div className="flex flex-col gap-2.5">
        <div className="flex items-center justify-between gap-2">
          {/* Toggle Segmented Control */}
          <div className="bg-[#e5eeff] p-1 rounded-xl flex items-center flex-1 shadow-xs">
            <button
              type="button"
              onClick={() => setActiveView('calendar')}
              className={`flex-1 py-1.5 px-2 rounded-lg text-xs text-center font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                activeView === 'calendar'
                  ? 'bg-white text-[#001026] shadow-sm'
                  : 'text-[#44474e] hover:text-[#001026]'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">calendar_month</span>
              Kalender
            </button>
            <button
              type="button"
              onClick={() => setActiveView('list')}
              className={`flex-1 py-1.5 px-2 rounded-lg text-xs text-center font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                activeView === 'list'
                  ? 'bg-white text-[#001026] shadow-sm'
                  : 'text-[#44474e] hover:text-[#001026]'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">format_list_bulleted</span>
              Daftar Agenda
            </button>
          </div>

          {/* Quick Sync Button */}
          <button
            type="button"
            onClick={() => onOpenSync(agendas[0])}
            title="Sinkronisasi Google Calendar"
            className="bg-white text-[#006a63] hover:bg-[#eff4ff] p-2.5 rounded-xl shadow-xs border border-slate-100 flex items-center justify-center transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">sync</span>
          </button>
        </div>

        {/* Filter Chips Scrollable */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          <button
            type="button"
            onClick={() => handleFilterClick('all', 'Semua Agenda')}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
              selectedFilter === 'all'
                ? 'bg-[#001026] text-white'
                : 'bg-[#eff4ff] text-[#44474e] hover:bg-[#e5eeff]'
            }`}
          >
            Semua Agenda
          </button>
          <button
            type="button"
            onClick={() => handleFilterClick('pleno', 'Rapat Pleno')}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
              selectedFilter === 'pleno'
                ? 'bg-[#001026] text-white'
                : 'bg-[#eff4ff] text-[#44474e] hover:bg-[#e5eeff]'
            }`}
          >
            Rapat Pleno
          </button>
          <button
            type="button"
            onClick={() => handleFilterClick('komite', 'Komite Teknis')}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
              selectedFilter === 'komite'
                ? 'bg-[#001026] text-white'
                : 'bg-[#eff4ff] text-[#44474e] hover:bg-[#e5eeff]'
            }`}
          >
            Komite Teknis
          </button>
          <button
            type="button"
            onClick={() => handleFilterClick('regulator', 'Audiensi Regulator')}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
              selectedFilter === 'regulator'
                ? 'bg-[#001026] text-white'
                : 'bg-[#eff4ff] text-[#44474e] hover:bg-[#e5eeff]'
            }`}
          >
            Audiensi Regulator
          </button>
          <button
            type="button"
            onClick={() => handleFilterClick('webinar', 'Webinar & Sosialisasi')}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
              selectedFilter === 'webinar'
                ? 'bg-[#001026] text-white'
                : 'bg-[#eff4ff] text-[#44474e] hover:bg-[#e5eeff]'
            }`}
          >
            Webinar & Sosialisasi
          </button>
        </div>
      </div>

      {/* VIEW: CALENDAR */}
      {activeView === 'calendar' && (
        <div className="flex flex-col gap-4 animate-in fade-in duration-200">
          {/* Calendar Widget Card */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-xs border border-slate-100">
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#006a63] text-[22px]">
                  event_note
                </span>
                <span className="text-sm sm:text-base text-[#001026] font-bold">
                  {currentMonthName}
                </span>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#99efe5] text-[#006f67] font-semibold">
                  {hijriYear}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => onTriggerToast('Kalender diset pada bulan aktif: Oktober 2024')}
                  className="w-8 h-8 rounded-lg bg-[#eff4ff] hover:bg-[#e5eeff] flex items-center justify-center text-[#0b2545] cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">chevron_left</span>
                </button>
                <button
                  type="button"
                  onClick={() => onTriggerToast('Jadwal November 2024 akan dibuka setelah Pleno Q3')}
                  className="w-8 h-8 rounded-lg bg-[#eff4ff] hover:bg-[#e5eeff] flex items-center justify-center text-[#0b2545] cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                </button>
              </div>
            </div>

            {/* Days Grid Header */}
            <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-[#44474e] mb-2">
              <span>Min</span>
              <span>Sen</span>
              <span>Sel</span>
              <span>Rab</span>
              <span>Kam</span>
              <span>Jum</span>
              <span>Sab</span>
            </div>

            {/* Calendar Days */}
            <div className="grid grid-cols-7 gap-1 text-center text-xs">
              {/* Previous month padding */}
              <span className="py-2 text-[#c4c6cf]">29</span>
              <span className="py-2 text-[#c4c6cf]">30</span>

              {/* Days 1 to 31 */}
              {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => {
                const isSelected = selectedDay === day;
                const isToday = day === 24;
                const hasKomite = komiteDays.includes(day);
                const hasPleno = plenoDays.includes(day);

                let btnClass = 'relative py-2 rounded-lg font-medium transition-all cursor-pointer ';

                if (isSelected) {
                  btnClass += 'bg-[#001026] text-white font-bold shadow-xs ';
                } else if (isToday) {
                  btnClass += 'bg-[#e5eeff] text-[#006a63] font-bold ';
                } else {
                  btnClass += 'text-[#0b1c30] hover:bg-[#eff4ff] ';
                }

                return (
                  <button
                    key={day}
                    type="button"
                    onClick={() => handleDayClick(day)}
                    className={btnClass}
                  >
                    <span>{day}</span>
                    {/* Event indicators */}
                    {hasKomite && (
                      <span
                        className={`absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full ${
                          isSelected ? 'bg-[#9cf2e8]' : 'bg-[#006a63]'
                        }`}
                      />
                    )}
                    {hasPleno && !hasKomite && (
                      <span
                        className={`absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full ${
                          isSelected ? 'bg-[#d5e3ff]' : 'bg-[#0b2545]'
                        }`}
                      />
                    )}
                  </button>
                );
              })}

              {/* Next month padding */}
              <span className="py-2 text-[#c4c6cf]">1</span>
              <span className="py-2 text-[#c4c6cf]">2</span>
            </div>

            {/* Calendar Legend */}
            <div className="flex flex-wrap items-center justify-between pt-3 mt-3 border-t border-slate-100 text-[11px] text-[#44474e]">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#006a63]"></span> Agenda Komite
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#0b2545]"></span> Pleno / Direksi
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded bg-[#001026]"></span> Terpilih ({selectedDay} Okt)
              </span>
            </div>
          </div>

          {/* Active Day Schedule Highlight */}
          <div className="flex flex-col gap-2.5">
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[#006a63] text-[20px]">timer</span>
                <span className="text-xs sm:text-sm text-[#001026] font-bold">
                  {getDayFormattedTitle(selectedDay)}
                </span>
              </div>
              <span className="text-[11px] text-[#44474e]">
                {agendasForSelectedDay.length} Kegiatan
              </span>
            </div>

            {agendasForSelectedDay.length === 0 ? (
              <div className="bg-white rounded-xl p-6 text-center shadow-xs border border-slate-100">
                <span className="material-symbols-outlined text-slate-300 text-[36px] mb-1">
                  event_busy
                </span>
                <p className="text-xs font-semibold text-slate-700">Tidak ada agenda pada tanggal {selectedDay} Oktober 2024.</p>
                <p className="text-[11px] text-slate-400 mt-0.5">Pilih tanggal lain atau jadwalkan rapat baru.</p>
                <button
                  type="button"
                  onClick={onOpenNewModal}
                  className="mt-3 px-3 py-1.5 rounded-lg bg-[#eff4ff] text-[#006a63] text-xs font-semibold hover:bg-[#e5eeff] cursor-pointer"
                >
                  + Jadwalkan Agenda Baru
                </button>
              </div>
            ) : (
              agendasForSelectedDay.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl p-4 sm:p-5 shadow-xs border border-slate-100 flex flex-col gap-2.5 transition-all hover:border-[#cbdbf5]"
                >
                  {/* Category & Status Bar */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-[#99efe5] text-[#006f67]">
                        {item.categoryLabel}
                      </span>
                      <span className="text-xs font-semibold text-[#001026]">
                        {item.timeStr}
                      </span>
                    </div>

                    <span
                      className={`flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                        item.status === 'terkonfirmasi'
                          ? 'bg-[#eff4ff] text-[#006a63]'
                          : 'bg-[#dce9ff] text-[#44474e]'
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          item.status === 'terkonfirmasi' ? 'bg-[#006a63]' : 'bg-[#74777f]'
                        }`}
                      />
                      {item.statusLabel}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="text-sm sm:text-base font-bold text-[#001026] leading-snug">
                    {item.title}
                  </h2>

                  {/* Optional Image Card (e.g. Ruang Rapat Al-Falah) */}
                  {item.image && (
                    <div className="relative w-full h-28 rounded-lg overflow-hidden my-1 shadow-xs">
                      <img
                        className="w-full h-full object-cover"
                        src={item.image}
                        alt={item.title}
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#001026]/85 via-[#001026]/30 to-transparent flex items-end p-2.5">
                        <span className="text-[11px] text-white flex items-center gap-1 font-medium">
                          <span className="material-symbols-outlined text-[16px] text-[#9cf2e8]">
                            meeting_room
                          </span>
                          {item.imageCaption || item.location}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Details */}
                  <div className="flex flex-col gap-1 text-[#44474e] text-xs">
                    {!item.image && (
                      <div className="flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[16px] text-[#006a63]">
                          location_on
                        </span>
                        <span>{item.location}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[16px] text-[#006a63]">
                        group
                      </span>
                      <span>{item.participants}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[16px] text-[#006a63]">
                        badge
                      </span>
                      <span>
                        PIC: <strong className="text-[#0b1c30]">{item.pic}</strong>
                      </span>
                    </div>
                  </div>

                  {/* Bottom Action Footer */}
                  <div className="flex items-center justify-between pt-2.5 border-t border-[#e5eeff] mt-1">
                    {item.documentRef ? (
                      <span className="text-[11px] text-[#44474e] font-mono truncate max-w-[200px]">
                        Surat: {item.documentRef}
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => onOpenSync(item)}
                        className="text-xs text-[#006a63] font-semibold flex items-center gap-1 hover:underline cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[16px]">edit_calendar</span>
                        Sinkronkan Kalender
                      </button>
                    )}

                    {item.documentRef ? (
                      <button
                        type="button"
                        onClick={() => onOpenDocument(item.documentRef || '')}
                        className="text-xs text-[#006a63] font-semibold flex items-center gap-1 hover:underline cursor-pointer"
                      >
                        <span>Detail Berkas</span>
                        <span className="material-symbols-outlined text-[16px]">open_in_new</span>
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => onOpenNotulensi(item)}
                        className="text-xs text-[#001026] font-semibold flex items-center gap-1 hover:underline cursor-pointer"
                      >
                        <span>{item.notesTitle || 'Notulensi Persiapan'}</span>
                        <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* VIEW: LIST (Upcoming & Past) */}
      {activeView === 'list' && (
        <div className="flex flex-col gap-4 animate-in fade-in duration-200">
          {/* Upcoming Section */}
          <div className="flex flex-col gap-2.5">
            <div className="flex items-center justify-between px-1">
              <span className="text-xs sm:text-sm text-[#001026] font-bold flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[#006a63] text-[20px]">
                  upcoming
                </span>
                Agenda Mendatang
              </span>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[#99efe5] text-[#006f67]">
                {filteredAgendas.filter((a) => a.status !== 'selesai').length} Pertemuan
              </span>
            </div>

            {filteredAgendas
              .filter((a) => a.status !== 'selesai')
              .map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl p-4 sm:p-5 shadow-xs border border-slate-100 flex flex-col gap-2"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-[#002257] text-[#688ad8]">
                        {item.categoryLabel}
                      </span>
                      <span className="text-xs text-[#44474e]">{item.dateStr}</span>
                    </div>
                    <span className="flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[#eff4ff] text-[#006a63]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#006a63]" />
                      {item.statusLabel}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-[#001026] leading-snug">
                    {item.title}
                  </h3>

                  {item.image && (
                    <div className="relative w-full h-20 rounded-lg overflow-hidden my-1 shadow-xs">
                      <img
                        className="w-full h-full object-cover"
                        src={item.image}
                        alt={item.title}
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-[#001026]/90 via-[#001026]/40 to-transparent flex items-center px-3">
                        <span className="text-xs text-white font-semibold flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-[18px] text-[#9cf2e8]">
                            cast
                          </span>
                          {item.imageCaption || 'Broadcast Live Streaming'}
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-2 py-1 text-xs text-[#44474e]">
                    <div className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[16px] text-[#006a63]">
                        schedule
                      </span>
                      <span>{item.timeStr}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[16px] text-[#006a63]">
                        group
                      </span>
                      <span className="truncate">{item.participants}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-[#44474e]">
                    <span className="material-symbols-outlined text-[16px] text-[#006a63]">
                      location_on
                    </span>
                    <span className="truncate">{item.location}</span>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-[#e5eeff] mt-1">
                    <button
                      type="button"
                      onClick={() => onOpenSync(item)}
                      className="text-xs text-[#006a63] font-semibold flex items-center gap-1 hover:underline cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[16px]">sync</span>
                      GCal Sync
                    </button>
                    <button
                      type="button"
                      onClick={() => onOpenNotulensi(item)}
                      className="text-xs text-[#001026] font-semibold flex items-center gap-1 hover:underline cursor-pointer"
                    >
                      Lihat Notulensi Terkait
                      <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                    </button>
                  </div>
                </div>
              ))}
          </div>

          {/* Past / Completed Section */}
          <div className="flex flex-col gap-2.5 mt-2">
            <div className="flex items-center justify-between px-1">
              <span className="text-xs sm:text-sm text-[#44474e] font-bold flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[#74777f] text-[20px]">
                  history
                </span>
                Agenda Selesai (Bulan Ini)
              </span>
              <span className="text-[11px] text-[#44474e]">Arsip Notulensi Aktif</span>
            </div>

            {filteredAgendas
              .filter((a) => a.status === 'selesai')
              .map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl p-4 sm:p-5 shadow-xs border border-slate-100 flex flex-col gap-1.5 opacity-95"
                >
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-[#dce9ff] text-[#44474e]">
                      {item.categoryLabel}
                    </span>
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[#eff4ff] text-[#006a63]">
                      Selesai
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-[#001026] mt-1">{item.title}</h3>
                  <p className="text-xs text-[#44474e]">
                    {item.dateStr} • {item.participants}
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t border-[#e5eeff] mt-1">
                    <span className="text-[11px] text-[#006a63] font-semibold flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px]">check_circle</span>
                      Notulensi Ditandatangani
                    </span>
                    <button
                      type="button"
                      onClick={() => onOpenNotulensi(item)}
                      className="text-xs text-[#001026] font-bold flex items-center gap-1 hover:underline cursor-pointer"
                    >
                      Lihat Notulensi Terkait
                      <span className="material-symbols-outlined text-[16px]">description</span>
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};
