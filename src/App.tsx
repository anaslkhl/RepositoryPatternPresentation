import React, { useState, useEffect, useCallback, useRef } from 'react';
import { SLIDES_DATA } from './data/slidesData';
import { SlideContent } from './components/SlideContent';
import { PresentationHeader } from './components/PresentationHeader';
import { SlideOverviewModal } from './components/SlideOverviewModal';
import { SpeakerNotesDrawer } from './components/SpeakerNotesDrawer';
import { PrintView } from './components/PrintView';
import { 
  ChevronLeft, 
  ChevronRight, 
  Keyboard
} from 'lucide-react';
import { AnimatePresence } from 'motion/react';

export default function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isOverviewOpen, setIsOverviewOpen] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPrintView, setIsPrintView] = useState(false);
  const [isDark, setIsDark] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const currentSlide = SLIDES_DATA[currentIndex];

  // Sync dark class on document element
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  // Navigation handlers
  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  }, []);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => Math.min(SLIDES_DATA.length - 1, prev + 1));
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }

      if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        handlePrev();
      } else if (e.key === 'f' || e.key === 'F') {
        e.preventDefault();
        toggleFullscreen();
      } else if (e.key === 'o' || e.key === 'O') {
        e.preventDefault();
        setIsOverviewOpen((prev) => !prev);
      } else if (e.key === 'n' || e.key === 'N') {
        e.preventDefault();
        setShowNotes((prev) => !prev);
      } else if (e.key >= '1' && e.key <= '8') {
        const slideIdx = parseInt(e.key, 10) - 1;
        if (slideIdx >= 0 && slideIdx < SLIDES_DATA.length) {
          setCurrentIndex(slideIdx);
        }
      } else if (e.key === 'Escape') {
        if (isOverviewOpen) setIsOverviewOpen(false);
        if (showNotes) setShowNotes(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev, isOverviewOpen, showNotes]);

  // Fullscreen toggle
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => {
        setIsFullscreen(true);
      }).catch(() => {});
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().then(() => {
          setIsFullscreen(false);
        }).catch(() => {});
      }
    }
  };

  useEffect(() => {
    const onFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', onFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', onFullscreenChange);
  }, []);

  if (isPrintView) {
    return <PrintView onBackToPresentation={() => setIsPrintView(false)} />;
  }

  return (
    <div 
      ref={containerRef}
      className="min-h-screen bg-slate-100/70 dark:bg-[#070b14] text-slate-900 dark:text-slate-100 flex flex-col justify-between selection:bg-blue-600 selection:text-white transition-colors duration-200"
    >
      {/* Top Header */}
      <PresentationHeader
        currentIndex={currentIndex}
        totalSlides={SLIDES_DATA.length}
        onPrev={handlePrev}
        onNext={handleNext}
        onOpenOverview={() => setIsOverviewOpen(true)}
        showNotes={showNotes}
        onToggleNotes={() => setShowNotes((prev) => !prev)}
        isFullscreen={isFullscreen}
        onToggleFullscreen={toggleFullscreen}
        isPrintView={isPrintView}
        onTogglePrintView={() => setIsPrintView((prev) => !prev)}
        isDark={isDark}
        onToggleTheme={() => setIsDark((prev) => !prev)}
      />

      {/* Main Slide Presentation Stage */}
      <main className="flex-1 flex items-center justify-center p-3 sm:p-6 lg:p-8 w-full max-w-7xl mx-auto">
        <div className="relative w-full">
          {/* Left Arrow button */}
          {currentIndex > 0 && (
            <button
              onClick={handlePrev}
              className="hidden md:flex absolute -left-5 lg:-left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 items-center justify-center rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-lg text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-sky-400 hover:scale-105 transition-all focus:outline-none"
              title="Diapositive précédente (←)"
              aria-label="Diapositive précédente"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}

          {/* Right Arrow button */}
          {currentIndex < SLIDES_DATA.length - 1 && (
            <button
              onClick={handleNext}
              className="hidden md:flex absolute -right-5 lg:-right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 items-center justify-center rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-lg text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-sky-400 hover:scale-105 transition-all focus:outline-none"
              title="Diapositive suivante (→ ou Espace)"
              aria-label="Diapositive suivante"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          )}

          {/* Slide Stage Card */}
          <section 
            aria-label={`Diapositive ${currentSlide.number} : ${currentSlide.title}`}
            className="w-full bg-white dark:bg-[#0c1222] border border-slate-200/90 dark:border-slate-800/80 rounded-2xl sm:rounded-3xl shadow-xl shadow-slate-900/5 dark:shadow-2xl dark:shadow-black/60 relative overflow-hidden min-h-[620px] flex flex-col justify-between transition-colors duration-200"
          >
            <AnimatePresence mode="wait">
              <SlideContent key={currentSlide.id} slide={currentSlide} />
            </AnimatePresence>
          </section>
        </div>
      </main>

      {/* Bottom Streamlined Timeline & Scrubber */}
      <footer className="w-full max-w-4xl mx-auto px-4 pb-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2.5 px-4 py-2 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 shadow-sm backdrop-blur-md">
          {/* Quick Slide Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto py-0.5 max-w-full">
            {SLIDES_DATA.map((s, idx) => {
              const active = idx === currentIndex;
              return (
                <button
                  key={s.id}
                  onClick={() => setCurrentIndex(idx)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-mono font-medium transition-all ${
                    active
                      ? 'bg-blue-600 text-white shadow-xs font-bold'
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                  title={`${s.number}. ${s.title}`}
                >
                  {s.number}
                </button>
              );
            })}
          </div>

          {/* Keyboard hints */}
          <div className="hidden sm:flex items-center gap-2 text-[11px] text-slate-400 dark:text-slate-500 font-mono">
            <Keyboard className="w-3.5 h-3.5" />
            <span>[← / →] Navigation</span>
            <span>·</span>
            <span>[1-8] Saut direct</span>
            <span>·</span>
            <span>[O] Plan</span>
          </div>
        </div>
      </footer>

      {/* Overview Modal */}
      <SlideOverviewModal
        isOpen={isOverviewOpen}
        onClose={() => setIsOverviewOpen(false)}
        currentSlideIndex={currentIndex}
        onSelectSlide={(idx) => setCurrentIndex(idx)}
      />

      {/* Speaker Notes Drawer */}
      <SpeakerNotesDrawer
        slide={currentSlide}
        isOpen={showNotes}
        onClose={() => setShowNotes(false)}
      />
    </div>
  );
}
