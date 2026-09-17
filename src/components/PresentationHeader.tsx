import React from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Maximize, 
  Minimize, 
  LayoutGrid, 
  FileText, 
  Printer, 
  Code2,
  Sun,
  Moon
} from 'lucide-react';

interface PresentationHeaderProps {
  currentIndex: number;
  totalSlides: number;
  onPrev: () => void;
  onNext: () => void;
  onOpenOverview: () => void;
  showNotes: boolean;
  onToggleNotes: () => void;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
  isPrintView: boolean;
  onTogglePrintView: () => void;
  isDark: boolean;
  onToggleTheme: () => void;
}

export const PresentationHeader: React.FC<PresentationHeaderProps> = ({
  currentIndex,
  totalSlides,
  onPrev,
  onNext,
  onOpenOverview,
  showNotes,
  onToggleNotes,
  isFullscreen,
  onToggleFullscreen,
  isPrintView,
  onTogglePrintView,
  isDark,
  onToggleTheme,
}) => {
  const progressPercent = ((currentIndex + 1) / totalSlides) * 100;

  return (
    <header className="w-full bg-white/90 dark:bg-slate-950/90 border-b border-slate-200/80 dark:border-slate-800 backdrop-blur-md sticky top-0 z-40 px-4 sm:px-6 py-2.5 transition-colors">
      {/* Top progress line */}
      <div 
        className="absolute top-0 left-0 h-1 bg-gradient-to-r from-blue-600 via-sky-500 to-indigo-600 transition-all duration-300"
        style={{ width: `${progressPercent}%` }}
      />

      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Title branding */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-sky-950 border border-blue-200 dark:border-sky-800/80 flex items-center justify-center shrink-0">
            <Code2 className="w-4 h-4 text-blue-600 dark:text-sky-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-sm font-extrabold text-slate-900 dark:text-white tracking-tight">
                Repository Pattern
              </h1>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-blue-100 dark:bg-slate-800 text-blue-800 dark:text-sky-300 font-semibold">
                Java
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 hidden sm:block">
              Architecture & Découplage du Domaine Métier
            </p>
          </div>
        </div>

        {/* Center navigation controls */}
        {!isPrintView && (
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              onClick={onPrev}
              disabled={currentIndex === 0}
              className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-200 dark:hover:bg-slate-800 disabled:opacity-30 disabled:pointer-events-none text-slate-700 dark:text-slate-300 transition-colors"
              title="Précédent (←)"
              aria-label="Diapositive précédente"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="px-3 py-1 rounded-lg bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-xs font-mono font-bold min-w-[80px] text-center">
              <span className="text-blue-600 dark:text-sky-400">{String(currentIndex + 1).padStart(2, '0')}</span>
              <span className="text-slate-400 dark:text-slate-600 mx-1">/</span>
              <span className="text-slate-600 dark:text-slate-400">{String(totalSlides).padStart(2, '0')}</span>
            </div>

            <button
              onClick={onNext}
              disabled={currentIndex === totalSlides - 1}
              className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-200 dark:hover:bg-slate-800 disabled:opacity-30 disabled:pointer-events-none text-slate-700 dark:text-slate-300 transition-colors"
              title="Suivant (→ ou Espace)"
              aria-label="Diapositive suivante"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Right action tools */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Theme switcher */}
          <button
            onClick={onToggleTheme}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-medium transition-colors"
            title={isDark ? "Passer en mode Clair (Studio)" : "Passer en mode Sombre (Navy)"}
            aria-label="Changer le thème"
          >
            {isDark ? (
              <>
                <Sun className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden md:inline">Clair</span>
              </>
            ) : (
              <>
                <Moon className="w-3.5 h-3.5 text-indigo-600" />
                <span className="hidden md:inline">Sombre</span>
              </>
            )}
          </button>

          {/* Overview button */}
          <button
            onClick={onOpenOverview}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-medium transition-colors"
            title="Plan des diapositives (O)"
          >
            <LayoutGrid className="w-3.5 h-3.5 text-blue-600 dark:text-sky-400" />
            <span className="hidden md:inline">Plan</span>
          </button>

          {/* Speaker Notes toggle */}
          {!isPrintView && (
            <button
              onClick={onToggleNotes}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-medium transition-colors ${
                showNotes 
                  ? 'bg-blue-50 dark:bg-sky-950/80 border-blue-400 dark:border-sky-500 text-blue-800 dark:text-sky-200' 
                  : 'bg-slate-100 dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
              }`}
              title="Notes de l'orateur (N)"
            >
              <FileText className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Notes</span>
            </button>
          )}

          {/* Document / Handout print mode */}
          <button
            onClick={onTogglePrintView}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-medium transition-colors ${
              isPrintView
                ? 'bg-indigo-50 dark:bg-indigo-950/80 border-indigo-400 dark:border-indigo-500 text-indigo-800 dark:text-indigo-200'
                : 'bg-slate-100 dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
            }`}
            title={isPrintView ? "Retour au Diaporama" : "Mode Document (Imprimer / PDF)"}
          >
            <Printer className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            <span className="hidden lg:inline">{isPrintView ? "Diaporama" : "Document"}</span>
          </button>

          {/* Fullscreen toggle */}
          <button
            onClick={onToggleFullscreen}
            className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors"
            title={isFullscreen ? "Quitter le plein écran" : "Plein écran (F)"}
            aria-label="Plein écran"
          >
            {isFullscreen ? (
              <Minimize className="w-4 h-4 text-amber-500" />
            ) : (
              <Maximize className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
