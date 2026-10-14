import React, { useState } from 'react';
import { AASI_ASSETS } from '../data/mockData';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: string;
  onSelectTab: (tab: string) => void;
}

export const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  activeTab,
  onSelectTab,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  const handleNavClick = (tabId: string) => {
    onSelectTab(tabId);
    onClose();
  };

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
    { id: 'surat-masuk', label: 'Surat Masuk', icon: 'mark_email_unread' },
    { id: 'surat-keluar', label: 'Surat Keluar', icon: 'outgoing_mail' },
    { id: 'agenda', label: 'Agenda Rapat', icon: 'calendar_month' },
    { id: 'notulensi-rapat', label: 'Notulensi Rapat', icon: 'description' },
    { id: 'tindak-lanjut', label: 'Tindak Lanjut', icon: 'task_alt' },
  ];

  const filteredItems = menuItems.filter((item) =>
    item.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <aside aria-modal="true" className="fixed inset-0 z-50 overflow-hidden" role="dialog">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#0b2545]/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Drawer panel */}
      <div className="relative w-4/5 max-w-sm h-full bg-white shadow-2xl flex flex-col justify-between pt-safe pb-safe z-10 animate-in slide-in-from-left duration-250 ease-out">
        <div className="flex flex-col">
          {/* Header */}
          <div className="p-4 bg-[#eff4ff] flex items-center justify-between border-b border-[#e5eeff]">
            <div className="flex items-center gap-2.5">
              <img
                alt="AASI Secretariat Logo"
                className="h-8 w-auto object-contain"
                src={AASI_ASSETS.logo}
                referrerPolicy="no-referrer"
              />
              <div className="flex flex-col">
                <span className="text-sm text-[#001026] font-bold">Sekretariat AASI</span>
                <span className="text-[11px] text-[#44474e]">Sistem Tata Usaha Digital</span>
              </div>
            </div>
            <button
              type="button"
              aria-label="Tutup Menu"
              className="w-9 h-9 flex items-center justify-center rounded-lg text-[#44474e] hover:bg-[#e5eeff] transition-colors cursor-pointer"
              onClick={onClose}
            >
              <span className="material-symbols-outlined text-[22px]">close</span>
            </button>
          </div>

          {/* Profile snippet */}
          <div className="p-4 flex items-center gap-3 bg-[#f8f9ff] border-b border-[#eff4ff]">
            <img
              alt="Profile"
              className="w-10 h-10 rounded-full object-cover ring-2 ring-[#006a63]"
              src={AASI_ASSETS.avatar}
              referrerPolicy="no-referrer"
            />
            <div className="flex flex-col min-w-0">
              <span className="text-sm text-[#001026] font-semibold truncate">
                Fatimah Zahra, S.E.
              </span>
              <span className="text-[11px] text-[#44474e] truncate">
                Staf Administrasi & Tata Usaha
              </span>
            </div>
          </div>

          {/* Search bar inside drawer */}
          <div className="px-4 py-3">
            <div className="h-10 px-3 bg-[#eff4ff] rounded-lg flex items-center gap-2 text-[#44474e] border border-transparent focus-within:border-[#006a63]">
              <span className="material-symbols-outlined text-[18px]">search</span>
              <input
                className="bg-transparent border-none outline-none text-xs text-[#0b1c30] w-full placeholder:text-[#74777f]"
                placeholder="Cari menu, arsip, risalah..."
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Navigation Links */}
          <div className="px-2 py-1 flex flex-col gap-1 overflow-y-auto max-h-[calc(100vh-270px)]">
            {filteredItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors text-left cursor-pointer ${
                    isActive
                      ? 'bg-[#e5eeff] text-[#006a63] font-semibold'
                      : 'text-[#44474e] hover:bg-[#eff4ff] hover:text-[#001026]'
                  }`}
                >
                  <span className={`material-symbols-outlined text-[20px] ${isActive ? 'text-[#006a63]' : 'text-slate-500'}`}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#eff4ff] border-t border-[#e5eeff] flex items-center justify-between text-[11px]">
          <span className="text-[#44474e]">v1.2.0 • Syariah Governance</span>
          <span className="font-semibold text-[#006a63] flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#006a63] inline-block animate-pulse"></span>
            Online
          </span>
        </div>
      </div>
    </aside>
  );
};
