import React from 'react';
import { SLIDES_DATA } from '../data/slidesData';
import { X, Layers } from 'lucide-react';

interface SlideOverviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentSlideIndex: number;
  onSelectSlide: (index: number) => void;
}

export const SlideOverviewModal: React.FC<SlideOverviewModalProps> = ({
  isOpen,
  onClose,
  currentSlideIndex,
  onSelectSlide,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/60 dark:bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-5xl max-h-[85vh] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="overview-title"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60">
          <div className="flex items-center gap-2.5">
            <Layers className="w-5 h-5 text-blue-600 dark:text-sky-400" />
            <div>
              <h2 id="overview-title" className="text-base font-bold text-slate-900 dark:text-white">
                Plan de la Présentation
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                8 diapositives techniques — Accès direct
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Grid */}
        <div className="p-6 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {SLIDES_DATA.map((slide, idx) => {
            const isSelected = idx === currentSlideIndex;
            return (
              <button
                key={slide.id}
                onClick={() => {
                  onSelectSlide(idx);
                  onClose();
                }}
                className={`p-4 rounded-xl text-left flex flex-col justify-between transition-all duration-150 border text-xs h-36 ${
                  isSelected
                    ? 'bg-blue-50 dark:bg-sky-950/70 border-blue-500 dark:border-sky-500 shadow-md ring-2 ring-blue-500/20'
                    : 'bg-white dark:bg-slate-950/70 border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/40'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-mono text-xs font-bold text-blue-600 dark:text-sky-400">
                      {slide.number}
                    </span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-medium">
                      {slide.category}
                    </span>
                  </div>
                  <h3 className="font-bold text-slate-900 dark:text-white line-clamp-2 leading-snug">
                    {slide.title}
                  </h3>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 mt-2 leading-relaxed font-normal">
                  {slide.subtitle}
                </p>
              </button>
            );
          })}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40 flex justify-between items-center text-xs text-slate-500 dark:text-slate-400 font-mono">
          <span>Touche [1-8] ou [← / →] pour naviguer</span>
          <button
            onClick={onClose}
            className="px-3 py-1 rounded-md bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 transition-colors font-medium"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};
