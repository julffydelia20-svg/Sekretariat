import React, { useState } from 'react';
import { AgendaItem, SuratItem } from './types/secretariat';
import { INITIAL_AGENDAS, MOCK_SURAT_MASUK, MOCK_SURAT_KELUAR } from './data/mockData';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { Drawer } from './components/Drawer';
import { AgendaModal } from './components/AgendaModal';
import { NotulensiModal } from './components/NotulensiModal';
import { DocumentModal } from './components/DocumentModal';
import { CalendarSyncModal } from './components/CalendarSyncModal';
import { Toast } from './components/Toast';

import { AgendaScreen } from './screens/AgendaScreen';
import { DashboardScreen } from './screens/DashboardScreen';
import { SuratMasukScreen } from './screens/SuratMasukScreen';
import { SuratKeluarScreen } from './screens/SuratKeluarScreen';
import { NotulensiScreen } from './screens/NotulensiScreen';
import { TindakLanjutScreen } from './screens/TindakLanjutScreen';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('agenda');
  const [agendas, setAgendas] = useState<AgendaItem[]>(INITIAL_AGENDAS);
  const [suratMasuk] = useState<SuratItem[]>(MOCK_SURAT_MASUK);
  const [suratKeluar] = useState<SuratItem[]>(MOCK_SURAT_KELUAR);

  // UI state
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isAgendaModalOpen, setIsAgendaModalOpen] = useState(false);
  const [notulensiAgenda, setNotulensiAgenda] = useState<AgendaItem | null>(null);
  const [documentRef, setDocumentRef] = useState<string | null>(null);
  const [syncAgenda, setSyncAgenda] = useState<AgendaItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // View frame toggle (mobile preview vs responsive fluid)
  const [isMobileDeviceView, setIsMobileDeviceView] = useState<boolean>(true);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3000);
  };

  const handleSaveAgenda = (newAgenda: AgendaItem) => {
    setAgendas((prev) => [newAgenda, ...prev]);
    showToast(`Agenda "${newAgenda.title}" berhasil dijadwalkan & disinkronkan ke kalender AASI!`);
  };

  const renderActiveScreen = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <DashboardScreen
            agendas={agendas}
            suratMasuk={suratMasuk}
            suratKeluar={suratKeluar}
            onNavigateTab={(tab) => setActiveTab(tab)}
            onOpenNewAgenda={() => setIsAgendaModalOpen(true)}
            onOpenNotulensi={(item) => setNotulensiAgenda(item)}
            onTriggerToast={showToast}
          />
        );

      case 'surat-masuk':
        return (
          <SuratMasukScreen
            suratList={suratMasuk}
            onTriggerToast={showToast}
            onOpenDocument={(ref) => setDocumentRef(ref)}
          />
        );

      case 'surat-keluar':
        return (
          <SuratKeluarScreen
            suratList={suratKeluar}
            onTriggerToast={showToast}
            onOpenDocument={(ref) => setDocumentRef(ref)}
          />
        );

      case 'notulensi-rapat':
        return (
          <NotulensiScreen
            agendas={agendas}
            onOpenNotulensi={(item) => setNotulensiAgenda(item)}
            onTriggerToast={showToast}
          />
        );

      case 'tindak-lanjut':
        return <TindakLanjutScreen onTriggerToast={showToast} />;

      case 'agenda':
      default:
        return (
          <AgendaScreen
            agendas={agendas}
            onOpenNewModal={() => setIsAgendaModalOpen(true)}
            onOpenNotulensi={(item) => setNotulensiAgenda(item)}
            onOpenDocument={(ref) => setDocumentRef(ref)}
            onOpenSync={(item) => setSyncAgenda(item)}
            onTriggerToast={showToast}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#f1f5f9] text-[#0b1c30] flex flex-col items-center justify-start">
      {/* Device frame container */}
      <div
        className={`w-full min-h-screen flex flex-col bg-[#f8f9ff] shadow-xl transition-all ${
          isMobileDeviceView
            ? 'max-w-[440px] my-0 sm:my-3 sm:rounded-3xl sm:border sm:border-slate-300/80 overflow-hidden relative'
            : 'max-w-4xl'
        }`}
      >
        {/* Top Header */}
        <Header
          onOpenDrawer={() => setIsDrawerOpen(true)}
          selectedDateTitle="Kamis, 24 Oktober 2024"
          onSelectTab={(tab) => setActiveTab(tab)}
          isMobileDeviceView={isMobileDeviceView}
          onToggleDeviceView={() => setIsMobileDeviceView(!isMobileDeviceView)}
        />

        {/* Main Content Area */}
        <main className="flex-1 px-3 sm:px-4 pt-3 pb-24 overflow-y-auto">
          {renderActiveScreen()}
        </main>

        {/* Bottom Navigation */}
        <BottomNav
          activeTab={activeTab}
          onSelectTab={(tab) => setActiveTab(tab)}
          onOpenDrawer={() => setIsDrawerOpen(true)}
          unreadCount={1}
        />
      </div>

      {/* Floating Viewport Toggle (Visible on larger screens) */}
      <aside className="fixed bottom-4 right-4 z-30 hidden lg:flex items-center gap-2 bg-[#001026] text-white px-3.5 py-2 rounded-full shadow-2xl border border-slate-700/60 text-xs">
        <span className="text-slate-300">Format Pratinjau:</span>
        <button
          type="button"
          onClick={() => setIsMobileDeviceView(true)}
          className={`px-2.5 py-1 rounded-full font-semibold transition-all cursor-pointer ${
            isMobileDeviceView ? 'bg-[#006a63] text-white' : 'text-slate-400 hover:text-white'
          }`}
        >
          Mockup HP (Sesuai Desain)
        </button>
        <button
          type="button"
          onClick={() => setIsMobileDeviceView(false)}
          className={`px-2.5 py-1 rounded-full font-semibold transition-all cursor-pointer ${
            !isMobileDeviceView ? 'bg-[#006a63] text-white' : 'text-slate-400 hover:text-white'
          }`}
        >
          Layar Responsif
        </button>
      </aside>

      {/* Drawer */}
      <Drawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        activeTab={activeTab}
        onSelectTab={(tab) => setActiveTab(tab)}
      />

      {/* Modals */}
      <AgendaModal
        isOpen={isAgendaModalOpen}
        onClose={() => setIsAgendaModalOpen(false)}
        onSave={handleSaveAgenda}
        initialDay={25}
      />

      <NotulensiModal
        isOpen={Boolean(notulensiAgenda)}
        agenda={notulensiAgenda}
        onClose={() => setNotulensiAgenda(null)}
        onDownloadToast={showToast}
      />

      <DocumentModal
        isOpen={Boolean(documentRef)}
        documentRef={documentRef || 'SRT-042/AASI-OJK/X/2024'}
        onClose={() => setDocumentRef(null)}
        onDownloadToast={showToast}
      />

      <CalendarSyncModal
        isOpen={Boolean(syncAgenda)}
        agenda={syncAgenda}
        onClose={() => setSyncAgenda(null)}
        onTriggerToast={showToast}
      />

      {/* Toast */}
      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
    </div>
  );
}
