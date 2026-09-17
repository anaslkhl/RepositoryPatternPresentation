import React from 'react';
import { SlideData } from '../types';
import { CodeBlock } from './CodeBlock';
import { 
  AbstractionDiagram, 
  ArchitectureDiagram, 
  ContractDiagram, 
  DIPDiagram, 
  RecapDiagram 
} from './Diagrams';
import { 
  Layers, 
  Unplug, 
  Target, 
  CheckCircle2, 
  Database, 
  Search, 
  ShieldCheck, 
  AlertTriangle, 
  Check, 
  X,
  Split,
  Shield,
  Unlink,
  Zap,
  Sliders,
  Quote,
  Sparkles,
  ArrowRight,
  Info
} from 'lucide-react';
import { motion } from 'motion/react';

interface SlideContentProps {
  slide: SlideData;
}

const renderIcon = (iconName?: string) => {
  switch (iconName) {
    case 'Layers': return <Layers className="w-5 h-5 text-blue-600 dark:text-sky-400" />;
    case 'Unplug': return <Unplug className="w-5 h-5 text-blue-600 dark:text-sky-400" />;
    case 'Target': return <Target className="w-5 h-5 text-blue-600 dark:text-sky-400" />;
    case 'CheckCircle2': return <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />;
    case 'Database': return <Database className="w-5 h-5 text-blue-600 dark:text-sky-400" />;
    case 'Search': return <Search className="w-5 h-5 text-amber-600 dark:text-amber-400" />;
    case 'ShieldCheck': return <ShieldCheck className="w-5 h-5 text-teal-600 dark:text-teal-400" />;
    case 'Split': return <Split className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />;
    case 'Shield': return <Shield className="w-5 h-5 text-blue-600 dark:text-sky-400" />;
    case 'Unlink': return <Unlink className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />;
    case 'Zap': return <Zap className="w-5 h-5 text-amber-600 dark:text-amber-400" />;
    case 'Sliders': return <Sliders className="w-5 h-5 text-purple-600 dark:text-purple-400" />;
    default: return <Sparkles className="w-5 h-5 text-blue-600 dark:text-sky-400" />;
  }
};

export const SlideContent: React.FC<SlideContentProps> = ({ slide }) => {
  return (
    <motion.div 
      key={slide.id}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.22, ease: 'easeOut' }}
      className="flex-1 flex flex-col justify-between p-6 sm:p-8 lg:p-10 w-full"
    >
      {/* Slide Header */}
      <header className="mb-6 sm:mb-8 border-b border-slate-200/80 dark:border-slate-800 pb-4">
        <div className="flex items-center justify-between gap-3 mb-2">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono font-bold tracking-wider uppercase px-2.5 py-1 rounded-md bg-blue-50 dark:bg-sky-950 text-blue-700 dark:text-sky-300 border border-blue-200 dark:border-sky-800/80">
              {slide.number} · {slide.category}
            </span>
          </div>

          {slide.tags && (
            <div className="hidden sm:flex items-center gap-1.5">
              {slide.tags.map((tag, i) => (
                <span key={i} className="text-[11px] font-mono text-slate-500 dark:text-slate-400 px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700/60">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          {slide.title}
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-1.5 font-normal">
          {slide.subtitle}
        </p>
      </header>

      {/* Main Slide Content Area */}
      <div className="flex-1 flex flex-col justify-center">
        {/* SLIDE 1: INTRODUCTION */}
        {slide.id === 1 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
            <div className="lg:col-span-6 flex flex-col space-y-4">
              {/* Definition */}
              <div className="p-4 rounded-xl bg-blue-50/80 dark:bg-sky-950/40 border-l-4 border-blue-600 dark:border-sky-400 border-y border-r border-blue-200/70 dark:border-slate-800">
                <p className="text-sm sm:text-base text-slate-800 dark:text-slate-200 font-medium leading-relaxed italic">
                  "{slide.definition}"
                </p>
              </div>

              {/* 4 Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {slide.points?.map((pt, idx) => (
                  <div 
                    key={idx} 
                    className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs hover:border-blue-400 dark:hover:border-sky-500 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      {renderIcon(pt.icon)}
                      {pt.badge && (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold">
                          {pt.badge}
                        </span>
                      )}
                    </div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">{pt.title}</h4>
                    <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                      {pt.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Architecture flow */}
            <div className="lg:col-span-6">
              <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/40">
                <AbstractionDiagram />
              </div>
            </div>
          </div>
        )}

        {/* SLIDE 2: ROLE DU REPOSITORY */}
        {slide.id === 2 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
            <div className="lg:col-span-5 flex flex-col space-y-4">
              <div className="p-4 rounded-xl bg-blue-50/70 dark:bg-sky-950/40 border border-blue-200 dark:border-sky-900/60">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-blue-700 dark:text-sky-300 mb-1">
                  Concept Clé
                </h4>
                <p className="text-sm font-semibold text-slate-900 dark:text-white leading-relaxed">
                  Le Repository émule une collection d'objets métier en mémoire.
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1.5 leading-relaxed">
                  Il masque intégralement la plomberie technique (tables relationnelles, requêtes SQL, connexions).
                </p>
              </div>

              <div className="space-y-2.5">
                {slide.points?.map((pt, idx) => (
                  <div key={idx} className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs flex items-start gap-3">
                    <div className="mt-0.5">{renderIcon(pt.icon)}</div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold text-slate-900 dark:text-white">{pt.title}</h4>
                        {pt.badge && (
                          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                            {pt.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5">{pt.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-7 flex flex-col space-y-3">
              {slide.codeSnippets && (
                <CodeBlock 
                  code={slide.codeSnippets[0].code}
                  title={slide.codeSnippets[0].title}
                />
              )}

              {/* Bottom rule */}
              <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center gap-2 text-xs font-mono text-slate-700 dark:text-slate-300">
                <span className="font-bold text-indigo-600 dark:text-indigo-400">Service</span>
                <span>→ Logique Métier</span>
                <span className="text-slate-400 mx-1">|</span>
                <span className="font-bold text-blue-600 dark:text-sky-400">Repository</span>
                <span>→ Accès aux Données</span>
              </div>
            </div>
          </div>
        )}

        {/* SLIDE 3: ARCHITECTURE */}
        {slide.id === 3 && (
          <div className="flex flex-col space-y-5">
            <ArchitectureDiagram />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
              <div className="lg:col-span-7">
                {slide.codeSnippets && (
                  <CodeBlock 
                    code={slide.codeSnippets[0].code}
                    title={slide.codeSnippets[0].title}
                  />
                )}
              </div>

              <div className="lg:col-span-5 space-y-3">
                <div className="p-4 rounded-xl border border-blue-200 dark:border-sky-900/60 bg-blue-50/70 dark:bg-sky-950/40">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-blue-700 dark:text-sky-300">
                    Règle d'Inversion
                  </h4>
                  <p className="text-sm font-bold text-slate-900 dark:text-white mt-1 leading-snug">
                    {slide.keyMessage}
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                    Grâce à l'injection par constructeur, le Service ne dépend d'aucune base SQL particulière. On peut lui injecter une implémentation Postgres en production et un Fake en mémoire lors des tests.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SLIDE 4: WHAT vs HOW */}
        {slide.id === 4 && (
          <div className="flex flex-col space-y-4">
            <ContractDiagram />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pt-1">
              {slide.codeSnippets?.map((snip, idx) => (
                <CodeBlock 
                  key={idx}
                  code={snip.code}
                  title={snip.title}
                />
              ))}
            </div>
          </div>
        )}

        {/* SLIDE 5: GENERICS + OPTIONAL */}
        {slide.id === 5 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
            <div className="lg:col-span-5 flex flex-col space-y-3.5">
              {slide.points?.map((pt, idx) => (
                <div 
                  key={idx}
                  className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-mono font-bold text-blue-600 dark:text-sky-400">
                      {pt.badge}
                    </span>
                  </div>
                  <h4 className="text-sm font-extrabold text-slate-900 dark:text-white">{pt.title}</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                    {pt.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="lg:col-span-7 flex flex-col space-y-3.5">
              {slide.codeSnippets?.map((snip, idx) => (
                <CodeBlock 
                  key={idx}
                  code={snip.code}
                  title={snip.title}
                />
              ))}
            </div>
          </div>
        )}

        {/* SLIDE 6: REPOSITORY VS DAO VS SERVICE */}
        {slide.id === 6 && (
          <div className="flex flex-col space-y-4">
            {/* Comparison Matrix */}
            <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-950/60 font-mono">
                    <th className="p-3 text-slate-500 font-semibold uppercase tracking-wider w-1/4">Critère</th>
                    <th className="p-3 text-slate-700 dark:text-slate-300 font-bold w-1/4">DAO (Technique)</th>
                    <th className="p-3 text-blue-600 dark:text-sky-400 font-extrabold w-1/4">Repository (Domaine)</th>
                    <th className="p-3 text-indigo-600 dark:text-indigo-400 font-bold w-1/4">Service (Métier)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                  {slide.comparisonTable?.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                      <td className="p-3 font-semibold text-slate-900 dark:text-slate-200 font-mono text-[11px]">
                        {row.aspect}
                      </td>
                      <td className="p-3 text-slate-600 dark:text-slate-400 leading-relaxed font-mono text-[11px]">
                        {row.dao}
                      </td>
                      <td className="p-3 text-blue-900 dark:text-sky-200 bg-blue-50/30 dark:bg-sky-950/20 font-medium leading-relaxed font-mono text-[11px]">
                        {row.repository}
                      </td>
                      <td className="p-3 text-slate-700 dark:text-slate-300 leading-relaxed font-mono text-[11px]">
                        {row.service}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Code example of orchestrator */}
            {slide.codeSnippets && (
              <CodeBlock 
                code={slide.codeSnippets[0].code}
                title={slide.codeSnippets[0].title}
              />
            )}
          </div>
        )}

        {/* SLIDE 7: BEST PRACTICES & PITFALLS */}
        {slide.id === 7 && (
          <div className="flex flex-col space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Best practices column */}
              <div className="p-4 rounded-xl border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/40 dark:bg-emerald-950/20 flex flex-col space-y-2.5">
                <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 pb-1 border-b border-emerald-200/80 dark:border-emerald-900/60">
                  <CheckCircle2 className="w-4 h-4" />
                  <h3 className="text-xs font-mono font-bold uppercase tracking-wider">
                    Bonnes Pratiques
                  </h3>
                </div>

                {slide.bestPractices?.map((bp, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-white dark:bg-slate-900 border border-emerald-100 dark:border-emerald-900/40 shadow-xs">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                        {bp.title}
                      </h4>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-semibold">
                        {bp.badge}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                      {bp.description}
                    </p>
                  </div>
                ))}
              </div>

              {/* Pitfalls column */}
              <div className="p-4 rounded-xl border border-rose-200 dark:border-rose-900/60 bg-rose-50/40 dark:bg-rose-950/20 flex flex-col space-y-2.5">
                <div className="flex items-center gap-2 text-rose-700 dark:text-rose-400 pb-1 border-b border-rose-200/80 dark:border-rose-900/60">
                  <AlertTriangle className="w-4 h-4" />
                  <h3 className="text-xs font-mono font-bold uppercase tracking-wider">
                    Pièges à Éviter
                  </h3>
                </div>

                {slide.pitfalls?.map((pf, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-white dark:bg-slate-900 border border-rose-100 dark:border-rose-900/40 shadow-xs">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                        <X className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
                        {pf.title}
                      </h4>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300 font-semibold">
                        {pf.badge}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                      {pf.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* DIP Bottom diagram */}
            <DIPDiagram />
          </div>
        )}

        {/* SLIDE 8: CONCLUSION */}
        {slide.id === 8 && (
          <div className="flex flex-col space-y-6">
            {/* 5 Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {slide.points?.map((pt, idx) => (
                <div 
                  key={idx}
                  className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs flex flex-col justify-between hover:border-blue-400 dark:hover:border-sky-500 transition-colors"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      {renderIcon(pt.icon)}
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold">
                        {pt.badge}
                      </span>
                    </div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white mt-1">{pt.title}</h4>
                    <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1.5 leading-relaxed">
                      {pt.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Recap flow */}
            <RecapDiagram />

            {/* Final Punchline */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-center shadow-lg">
              <span className="text-[11px] font-mono uppercase tracking-widest text-blue-200 font-bold block mb-1">
                Règle d'or de conception
              </span>
              <p className="text-base sm:text-lg lg:text-xl font-extrabold tracking-tight">
                {slide.keyMessage}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Slide footer info */}
      <footer className="mt-6 pt-3 border-t border-slate-200/80 dark:border-slate-800 flex items-center justify-between text-xs text-slate-400 font-mono">
        <span>Java Clean Architecture · Domain-Driven Design</span>
        <span>Slide {slide.number} / 08</span>
      </footer>
    </motion.div>
  );
};
