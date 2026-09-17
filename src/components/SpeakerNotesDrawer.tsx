import React from 'react';
import { SlideData } from '../types';
import { MessageSquare, Sparkles, KeyRound, X } from 'lucide-react';

interface SpeakerNotesDrawerProps {
  slide: SlideData;
  isOpen: boolean;
  onClose: () => void;
}

export const SpeakerNotesDrawer: React.FC<SpeakerNotesDrawerProps> = ({
  slide,
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <aside 
      className="fixed bottom-0 left-0 right-0 z-30 bg-white/95 dark:bg-slate-950/95 border-t border-slate-200 dark:border-slate-800 shadow-2xl backdrop-blur-md px-6 py-4 transition-transform animate-in slide-in-from-bottom-5 duration-200"
      aria-label="Notes de l'orateur"
    >
      <div className="max-w-5xl mx-auto flex flex-col gap-3">
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-blue-600 dark:text-sky-400" />
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
              Notes Orateur — Diapositive {slide.number} : {slide.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-800 dark:hover:text-white transition-colors"
            aria-label="Fermer les notes"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 text-xs">
          <div className="md:col-span-8 bg-slate-50 dark:bg-slate-900/80 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-1.5 text-blue-600 dark:text-sky-400 font-bold mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Points clés à verbaliser :</span>
            </div>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              {slide.speakerNotes || "Expliquer les principes clés de séparation et d'inversion des dépendances."}
            </p>
          </div>

          <div className="md:col-span-4 bg-slate-50 dark:bg-slate-900/80 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400 font-bold mb-1">
                <KeyRound className="w-3.5 h-3.5" />
                <span>Rappel Métier Hôtelier :</span>
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 font-mono">
                Agrégats : Client, Room, Reservation.
              </p>
            </div>
            <div className="text-[10px] text-slate-400 font-mono mt-2">
              Pressez [N] pour masquer les notes
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
