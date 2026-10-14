import React from 'react';

interface ToastProps {
  message: string | null;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 bg-[#001026] text-white px-4 py-3 rounded-xl shadow-2xl text-xs font-semibold flex items-center gap-2 border border-slate-700/50 backdrop-blur-md animate-in fade-in slide-in-from-bottom-3 duration-200">
      <span className="material-symbols-outlined text-[#80d5cb] text-[18px]">check_circle</span>
      <span className="tracking-wide">{message}</span>
    </div>
  );
};
