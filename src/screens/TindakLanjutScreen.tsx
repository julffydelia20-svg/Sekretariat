import React, { useState } from 'react';
import { TindakLanjutItem } from '../types/secretariat';
import { MOCK_TINDAK_LANJUT } from '../data/mockData';

interface TindakLanjutScreenProps {
  onTriggerToast: (msg: string) => void;
}

export const TindakLanjutScreen: React.FC<TindakLanjutScreenProps> = ({
  onTriggerToast,
}) => {
  const [tasks, setTasks] = useState<TindakLanjutItem[]>(MOCK_TINDAK_LANJUT);

  const handleUpdateProgress = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          const nextProg = t.progres >= 100 ? 50 : Math.min(100, t.progres + 20);
          const nextStatus = nextProg === 100 ? 'Selesai' : 'Sedang Berjalan';
          return { ...t, progres: nextProg, status: nextStatus };
        }
        return t;
      })
    );
    onTriggerToast('Progres tindak lanjut berhasil diperbarui!');
  };

  return (
    <div className="flex flex-col w-full gap-4">
      <div className="bg-[#0b2545] p-4 sm:p-5 rounded-2xl text-white shadow-md flex flex-col gap-2">
        <span className="text-[10px] uppercase font-bold text-[#99efe5] tracking-wider">
          Monitoring Resolusi & Amanat Rapat
        </span>
        <h1 className="text-xl font-bold text-white">Tindak Lanjut Sekretariat</h1>
        <p className="text-xs text-[#778db2]">
          Pantau pelaksanaan keputusan pleno dewan, target regulator OJK, & gugus tugas teknis.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="bg-white rounded-xl p-4 sm:p-5 shadow-xs border border-slate-100 flex flex-col gap-3"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <span className="text-[10px] font-semibold text-slate-500 uppercase">
                  Sumber: {task.sumberRapat}
                </span>
                <h3 className="text-sm font-bold text-[#001026] mt-0.5">{task.perihal}</h3>
              </div>

              <span
                className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                  task.status === 'Selesai'
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-blue-100 text-blue-800'
                }`}
              >
                {task.status}
              </span>
            </div>

            <div className="flex flex-col gap-1.5 text-xs text-slate-600">
              <div className="flex justify-between items-center text-[11px]">
                <span>Penanggung Jawab: <strong>{task.pic}</strong></span>
                <span className="text-red-700 font-medium">Batas Waktu: {task.deadline}</span>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden mt-1">
                <div
                  className={`h-full rounded-full transition-all duration-300 ${
                    task.progres === 100 ? 'bg-[#006a63]' : 'bg-[#0b2545]'
                  }`}
                  style={{ width: `${task.progres}%` }}
                />
              </div>
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>Pencapaian Milestone</span>
                <span className="font-bold text-slate-700">{task.progres}%</span>
              </div>
            </div>

            <div className="flex justify-end pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => handleUpdateProgress(task.id)}
                className="text-xs text-[#006a63] font-semibold flex items-center gap-1 hover:underline cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">check_box</span>
                Perbarui Progres (+20%)
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
