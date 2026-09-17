import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  title?: string;
  className?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ code, title, className = '' }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const highlightJava = (rawCode: string) => {
    const lines = rawCode.split('\n');

    return lines.map((line, lineIndex) => {
      // Comments
      if (line.trim().startsWith('//')) {
        return (
          <div key={lineIndex} className="table-row">
            <span className="table-cell select-none pr-4 text-right text-slate-500/70 text-xs font-mono w-7">
              {lineIndex + 1}
            </span>
            <span className="table-cell text-slate-400 italic font-mono">{line}</span>
          </div>
        );
      }

      // Tokenize
      const tokens = line.split(/(\b(?:public|private|protected|interface|class|implements|extends|return|new|final|void|static|throw|override|default)\b|\b(?:Client|UUID|List|Optional|Map|HashMap|Reservation|Room|Repository|ReservationRepository|ClientRepository|InMemoryClientRepository|ReservationService|String|Integer|BigDecimal|ReservationRequest)\b|"[^"]*"|@\w+|[(){}[\],;])/g);

      return (
        <div key={lineIndex} className="table-row hover:bg-white/[0.02]">
          <span className="table-cell select-none pr-4 text-right text-slate-500/60 text-xs font-mono w-7">
            {lineIndex + 1}
          </span>
          <span className="table-cell font-mono text-slate-100 font-normal">
            {tokens.map((token, tokenIndex) => {
              if (/^(public|private|protected|interface|class|implements|extends|return|new|final|void|static|throw|default)$/.test(token)) {
                return (
                  <span key={tokenIndex} className="text-sky-400 font-semibold">
                    {token}
                  </span>
                );
              }
              if (/^@\w+$/.test(token)) {
                return (
                  <span key={tokenIndex} className="text-amber-300 font-medium">
                    {token}
                  </span>
                );
              }
              if (/^(Client|UUID|List|Optional|Map|HashMap|Reservation|Room|Repository|ReservationRepository|ClientRepository|InMemoryClientRepository|ReservationService|String|Integer|BigDecimal|ReservationRequest)$/.test(token)) {
                return (
                  <span key={tokenIndex} className="text-teal-300 font-medium">
                    {token}
                  </span>
                );
              }
              if (token.startsWith('"') && token.endsWith('"')) {
                return (
                  <span key={tokenIndex} className="text-emerald-300">
                    {token}
                  </span>
                );
              }
              if (/[(){}[\],;]/.test(token)) {
                return (
                  <span key={tokenIndex} className="text-slate-400">
                    {token}
                  </span>
                );
              }
              return <span key={tokenIndex}>{token}</span>;
            })}
          </span>
        </div>
      );
    });
  };

  return (
    <div className={`rounded-xl overflow-hidden border border-slate-700/60 dark:border-slate-800 bg-[#0c1222] shadow-xl text-sm ${className}`}>
      {/* Code window chrome header */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#080d1a] border-b border-slate-800/80">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
          </div>
          <span className="text-xs font-mono font-medium text-slate-300 pl-1 tracking-wide">
            {title || 'Java'}
          </span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 transition-colors px-2 py-1 rounded bg-slate-800/60 hover:bg-slate-800 border border-slate-700/50"
          title="Copier le code"
          aria-label="Copier le code"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400 font-medium">Copié</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copier</span>
            </>
          )}
        </button>
      </div>
      <div className="p-4 overflow-x-auto text-[13px] leading-relaxed table w-full font-mono">
        {highlightJava(code)}
      </div>
    </div>
  );
};
