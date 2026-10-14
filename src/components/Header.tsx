import React, { useState } from 'react';
import { AASI_ASSETS } from '../data/mockData';

interface HeaderProps {
  onOpenDrawer: () => void;
  selectedDateTitle?: string;
  onSelectTab: (tab: string) => void;
  isMobileDeviceView: boolean;
  onToggleDeviceView: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenDrawer,
  selectedDateTitle = 'Kamis, 24 Oktober 2024',
  onSelectTab,
  isMobileDeviceView,
  onToggleDeviceView,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <header className="sticky top-0 w-full z-40 bg-[#f8f9ff]/90 backdrop-blur-xl border-b border-[#e5eeff] shadow-[0_1px_8px_rgba(0,0,0,0.03)] transition-all">
      <div className="h-20 px-3 sm:px-4 max-w-5xl mx-auto flex flex-col justify-center gap-1">
        <div className="flex items-center justify-between gap-2">
          {/* Left: Drawer Hamburger & Brand */}
          <div className="flex items-center gap-2.5 min-w-0">
            <button
              type="button"
              aria-label="Menu Tata Usaha"
              onClick={onOpenDrawer}
              className="w-10 h-10 flex items-center justify-center rounded-lg text-[#0b2545] bg-[#eff4ff] hover:bg-[#e5eeff] active:bg-[#dce9ff] transition-colors flex-shrink-0 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[24px]">menu</span>
            </button>

            <div className="flex items-center gap-2 min-w-0">
              <img
                alt="AASI Secretariat Logo"
                className="h-8 w-auto object-contain flex-shrink-0"
                src={AASI_ASSETS.logo}
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm text-[#001026] font-bold truncate tracking-tight">
                    AASI
                  </span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-[#99efe5] text-[#006f67] font-semibold uppercase tracking-wider flex-shrink-0">
                    Demo Prototype
                  </span>
                </div>
                <span className="text-[11px] text-[#44474e] truncate">
                  Sekretariat Eksekutif
                </span>
              </div>
            </div>
          </div>

          {/* Right: View Toggle, Notifications & Profile */}
          <div className="flex items-center gap-1.5 flex-shrink-0 relative">
            {/* View Mode Toggle Button for convenience */}
            <button
              type="button"
              onClick={onToggleDeviceView}
              title={isMobileDeviceView ? 'Beralih ke Tampilan Lebar' : 'Beralih ke Tampilan Mobile Phone'}
              className="hidden sm:flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-lg bg-[#eff4ff] text-[#006a63] hover:bg-[#e5eeff] border border-[#dce9ff] transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">
                {isMobileDeviceView ? 'desktop_windows' : 'smartphone'}
              </span>
              <span className="text-[11px]">
                {isMobileDeviceView ? 'Layar Lebar' : 'Mockup HP'}
              </span>
            </button>

            {/* Notification Bell */}
            <div className="relative">
              <button
                type="button"
                aria-label="Notifikasi"
                onClick={() => {
                  setShowNotifications(!showNotifications);
                  setShowProfileMenu(false);
                }}
                className="relative w-10 h-10 flex items-center justify-center rounded-lg text-[#0b2545] hover:bg-[#e5eeff] transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[22px]">notifications</span>
                <span className="absolute top-2 right-2 flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#006a63] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#006a63]"></span>
                </span>
              </button>

              {/* Notification Popover */}
              {showNotifications && (
                <div className="absolute right-0 top-12 w-80 bg-white rounded-xl shadow-2xl border border-slate-200 p-3 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="text-xs font-bold text-[#001026]">Pemberitahuan Tata Usaha</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-semibold">3 Baru</span>
                  </div>
                  <div className="flex flex-col gap-2 mt-2 max-h-64 overflow-y-auto">
                    <div
                      onClick={() => {
                        setShowNotifications(false);
                        onSelectTab('agenda');
                      }}
                      className="p-2 rounded-lg bg-[#eff4ff] hover:bg-[#e5eeff] cursor-pointer transition-colors"
                    >
                      <p className="text-xs font-semibold text-[#001026]">Konfirmasi FGD Akad Wakalah</p>
                      <p className="text-[11px] text-slate-600">32 perwakilan telah mengonfirmasi hadir via Zoom & fisik.</p>
                      <span className="text-[10px] text-slate-400">10 menit yang lalu</span>
                    </div>

                    <div
                      onClick={() => {
                        setShowNotifications(false);
                        onSelectTab('surat-masuk');
                      }}
                      className="p-2 rounded-lg bg-amber-50 hover:bg-amber-100 cursor-pointer transition-colors"
                    >
                      <p className="text-xs font-semibold text-amber-900">Surat Masuk Baru: OJK RI</p>
                      <p className="text-[11px] text-amber-800">S-284/NB.211/2024 perihal Progres Spin-Off Unit Syariah.</p>
                      <span className="text-[10px] text-amber-600">1 jam yang lalu</span>
                    </div>

                    <div
                      onClick={() => {
                        setShowNotifications(false);
                        onSelectTab('agenda');
                      }}
                      className="p-2 rounded-lg bg-slate-50 hover:bg-slate-100 cursor-pointer transition-colors"
                    >
                      <p className="text-xs font-semibold text-slate-800">Sinkronisasi Jadwal Google Calendar</p>
                      <p className="text-[11px] text-slate-600">Kalender Sekretariat Eksekutif sinkron per 24 Okt.</p>
                      <span className="text-[10px] text-slate-400">Hari ini 08.00 WIB</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Profile Avatar */}
            <div className="relative pl-1">
              <button
                type="button"
                onClick={() => {
                  setShowProfileMenu(!showProfileMenu);
                  setShowNotifications(false);
                }}
                className="w-8 h-8 rounded-full overflow-hidden ring-2 ring-[#99efe5] focus:outline-none focus:ring-[#006a63] cursor-pointer"
              >
                <img
                  alt="Profile"
                  className="w-full h-full object-cover"
                  src={AASI_ASSETS.avatar}
                  referrerPolicy="no-referrer"
                />
              </button>

              {/* Profile Menu Popover */}
              {showProfileMenu && (
                <div className="absolute right-0 top-12 w-64 bg-white rounded-xl shadow-2xl border border-slate-200 p-3 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="flex items-center gap-2 pb-2.5 border-b border-slate-100">
                    <img
                      src={AASI_ASSETS.avatar}
                      alt="Fatimah Zahra"
                      className="w-9 h-9 rounded-full object-cover ring-1 ring-slate-200"
                    />
                    <div className="flex flex-col min-w-0">
                      <span className="text-xs font-bold text-slate-900 truncate">Fatimah Zahra, S.E.</span>
                      <span className="text-[10px] text-slate-500 truncate">Staf Administrasi & Tata Usaha</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1 mt-2 text-xs text-slate-700">
                    <div className="flex items-center justify-between py-1 px-1.5 rounded hover:bg-slate-50">
                      <span>Status Sistem</span>
                      <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">Aktif Online</span>
                    </div>
                    <div className="flex items-center justify-between py-1 px-1.5 rounded hover:bg-slate-50">
                      <span>Hak Akses</span>
                      <span className="text-[10px] font-medium text-slate-600">Sekretariat Eksekutif</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setShowProfileMenu(false);
                        onOpenDrawer();
                      }}
                      className="mt-2 w-full py-1.5 text-center text-xs font-semibold rounded bg-[#eff4ff] text-[#006a63] hover:bg-[#e5eeff]"
                    >
                      Buka Menu Lengkap
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Subheader Date & User Banner */}
        <div className="flex items-center justify-between px-1 text-[#44474e]">
          <span className="text-[11px] flex items-center gap-1 text-[#006a63] font-medium">
            <span className="material-symbols-outlined text-[14px]">calendar_today</span>
            {selectedDateTitle}
          </span>
          <span className="text-[11px] text-[#44474e] font-medium">
            Fatimah Zahra, S.E.
          </span>
        </div>
      </div>
    </header>
  );
};
