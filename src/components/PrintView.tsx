import React from 'react';
import { SLIDES_DATA } from '../data/slidesData';
import { SlideContent } from './SlideContent';
import { Printer, ArrowLeft } from 'lucide-react';

interface PrintViewProps {
  onBackToPresentation: () => void;
}

export const PrintView: React.FC<PrintViewProps> = ({ onBackToPresentation }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 py-8 px-4 sm:px-8">
      {/* Top action bar (hidden in print) */}
      <div className="max-w-5xl mx-auto mb-8 flex items-center justify-between p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm print:hidden">
        <button
          onClick={onBackToPresentation}
          className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Retour au Diaporama</span>
        </button>

        <div className="text-xs text-slate-500 dark:text-slate-400 font-mono text-center">
          Mode Document Complet — 8 Diapositives
        </div>

        <button
          onClick={handlePrint}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md transition-colors"
        >
          <Printer className="w-4 h-4" />
          <span>Imprimer / Exporter PDF</span>
        </button>
      </div>

      {/* List of all slides */}
      <div className="max-w-5xl mx-auto space-y-12">
        {SLIDES_DATA.map((slide) => (
          <article 
            key={slide.id} 
            className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-md overflow-hidden print:border-none print:shadow-none print:p-0 page-break-after"
          >
            <SlideContent slide={slide} />
          </article>
        ))}
      </div>
    </div>
  );
};
