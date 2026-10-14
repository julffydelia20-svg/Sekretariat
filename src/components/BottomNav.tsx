import React from 'react';

interface BottomNavProps {
  activeTab: string;
  onSelectTab: (tab: string) => void;
  onOpenDrawer: () => void;
  unreadCount?: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onSelectTab,
  onOpenDrawer,
  unreadCount = 1,
}) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#f8f9ff]/95 backdrop-blur-xl border-t border-[#e5eeff] shadow-[0_-2px_12px_rgba(11,37,69,0.06)] pb-safe">
      <div className="max-w-5xl mx-auto flex justify-around items-center h-16 px-2">
        {/* Beranda */}
        <button
          type="button"
          onClick={() => onSelectTab('dashboard')}
          className={`flex flex-col items-center justify-center gap-0.5 min-w-[56px] h-12 transition-colors cursor-pointer ${
            activeTab === 'dashboard'
              ? 'text-[#006a63] font-semibold'
              : 'text-[#44474e] hover:text-[#001026]'
          }`}
        >
          <span className="material-symbols-outlined text-[22px]">dashboard</span>
          <span className="text-[11px] tracking-tight">Beranda</span>
        </button>

        {/* Surat Masuk */}
        <button
          type="button"
          onClick={() => onSelectTab('surat-masuk')}
          className={`relative flex flex-col items-center justify-center gap-0.5 min-w-[56px] h-12 transition-colors cursor-pointer ${
            activeTab === 'surat-masuk'
              ? 'text-[#006a63] font-semibold'
              : 'text-[#44474e] hover:text-[#001026]'
          }`}
        >
          <span className="material-symbols-outlined text-[22px]">mark_email_unread</span>
          {unreadCount > 0 && (
            <span className="absolute top-1.5 right-3 w-2 h-2 rounded-full bg-[#006a63]"></span>
          )}
          <span className="text-[11px] tracking-tight">Masuk</span>
        </button>

        {/* Surat Keluar */}
        <button
          type="button"
          onClick={() => onSelectTab('surat-keluar')}
          className={`flex flex-col items-center justify-center gap-0.5 min-w-[56px] h-12 transition-colors cursor-pointer ${
            activeTab === 'surat-keluar'
              ? 'text-[#006a63] font-semibold'
              : 'text-[#44474e] hover:text-[#001026]'
          }`}
        >
          <span className="material-symbols-outlined text-[22px]">outgoing_mail</span>
          <span className="text-[11px] tracking-tight">Keluar</span>
        </button>

        {/* Agenda */}
        <button
          type="button"
          onClick={() => onSelectTab('agenda')}
          className={`flex flex-col items-center justify-center gap-0.5 min-w-[56px] h-12 transition-colors cursor-pointer ${
            activeTab === 'agenda'
              ? 'text-[#006a63] font-semibold'
              : 'text-[#44474e] hover:text-[#001026]'
          }`}
        >
          <span className="material-symbols-outlined text-[22px]">event_available</span>
          <span className="text-[11px] tracking-tight">Agenda</span>
        </button>

        {/* Lainnya */}
        <button
          type="button"
          aria-label="Buka Menu Lengkap"
          onClick={onOpenDrawer}
          className="flex flex-col items-center justify-center gap-0.5 min-w-[56px] h-12 text-[#44474e] hover:text-[#001026] transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-[22px]">apps</span>
          <span className="text-[11px] tracking-tight">Lainnya</span>
        </button>
      </div>
    </nav>
  );
};
