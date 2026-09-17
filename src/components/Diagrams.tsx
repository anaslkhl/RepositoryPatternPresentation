import React from 'react';
import { 
  Server, 
  Cpu, 
  Database, 
  Layers, 
  FileCode, 
  ArrowDown, 
  ArrowRight, 
  GitFork,
  CheckCircle2,
  HardDrive
} from 'lucide-react';

interface DiagramProps {
  isDark?: boolean;
}

// SLIDE 1 & 2: Abstraction Flow
export const AbstractionDiagram: React.FC<DiagramProps> = () => {
  const sources = [
    { name: 'PostgreSQL', kind: 'SQL Relationnel' },
    { name: 'MySQL', kind: 'SQL Relationnel' },
    { name: 'MongoDB', kind: 'Document NoSQL' },
    { name: 'API Externe', kind: 'Microservice REST' },
    { name: 'Mémoire', kind: 'Tests Unitaires' },
  ];

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full max-w-lg flex flex-col items-center space-y-3">
        {/* Tier 1: Service */}
        <div className="w-full p-3.5 rounded-xl border border-indigo-200 dark:border-indigo-900/60 bg-indigo-50/70 dark:bg-indigo-950/40 flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-indigo-600 text-white">
              <Cpu className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900 dark:text-white">Service Métier</div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400">Règles de réservation hôtelière</div>
            </div>
          </div>
          <span className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-indigo-100 dark:bg-indigo-900/80 text-indigo-700 dark:text-indigo-300 font-semibold">
            Logique Métier
          </span>
        </div>

        {/* Connector */}
        <div className="flex items-center gap-1.5 text-blue-600 dark:text-sky-400 font-mono text-xs">
          <ArrowDown className="w-4 h-4" />
          <span className="text-[11px] font-medium tracking-wide">délègue à l'abstraction</span>
        </div>

        {/* Tier 2: Repository Interface */}
        <div className="w-full p-4 rounded-xl border-2 border-blue-500 dark:border-sky-500 bg-blue-50/90 dark:bg-sky-950/50 flex items-center justify-between shadow-md ring-2 ring-blue-500/10">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-600 dark:bg-sky-500 text-white">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-extrabold text-blue-950 dark:text-white tracking-wide">
                Repository (Interface)
              </div>
              <div className="text-xs text-blue-700 dark:text-sky-300 font-mono">
                ClientRepository / ReservationRepository
              </div>
            </div>
          </div>
          <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-blue-600 text-white font-bold tracking-wider uppercase">
            Contrat
          </span>
        </div>

        {/* Connector */}
        <div className="flex items-center gap-1.5 text-teal-600 dark:text-teal-400 font-mono text-xs">
          <ArrowDown className="w-4 h-4" />
          <span className="text-[11px] font-medium tracking-wide">implémenté par</span>
        </div>

        {/* Tier 3: Implementation */}
        <div className="w-full p-3.5 rounded-xl border border-teal-200 dark:border-teal-900/60 bg-teal-50/70 dark:bg-teal-950/40 flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-teal-600 text-white">
              <FileCode className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900 dark:text-white">Implémentation Concrète</div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400">JDBC, JPA, Hibernate ou En Mémoire</div>
            </div>
          </div>
          <span className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-teal-100 dark:bg-teal-900/80 text-teal-800 dark:text-teal-300 font-semibold">
            Technique
          </span>
        </div>

        {/* Connector */}
        <div className="flex items-center gap-1.5 text-slate-400 font-mono text-xs">
          <ArrowDown className="w-4 h-4" />
          <span className="text-[11px] font-medium">alimente</span>
        </div>

        {/* Tier 4: Data Sources */}
        <div className="w-full pt-1">
          <div className="text-[11px] font-mono text-center text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2 font-semibold">
            Sources de Données Interchangeables
          </div>
          <div className="grid grid-cols-5 gap-2">
            {sources.map((s, idx) => (
              <div 
                key={idx}
                className="flex flex-col items-center justify-center p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-center shadow-xs hover:border-blue-400 dark:hover:border-sky-500 transition-colors"
              >
                <Database className="w-4 h-4 text-slate-500 dark:text-slate-400 mb-1" />
                <span className="text-xs font-bold text-slate-900 dark:text-slate-100 leading-tight">{s.name}</span>
                <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono mt-0.5">{s.kind}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// SLIDE 3: Layered Architecture Pipeline
export const ArchitectureDiagram: React.FC<DiagramProps> = () => {
  const steps = [
    {
      role: '1. Controller',
      title: 'Exposition HTTP',
      desc: 'Reçoit la requête REST client, parse les inputs.',
      icon: Server,
      badge: 'Point d\'Entrée',
      color: 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200',
      badgeColor: 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
    },
    {
      role: '2. Service',
      title: 'Règles Métier',
      desc: 'Disponibilité, calcul de prix, état de réservation.',
      icon: Cpu,
      badge: 'Cœur Domaine',
      color: 'border-indigo-200 dark:border-indigo-900/60 bg-indigo-50/70 dark:bg-indigo-950/40 text-indigo-900 dark:text-indigo-200',
      badgeColor: 'bg-indigo-100 dark:bg-indigo-900/80 text-indigo-800 dark:text-indigo-300'
    },
    {
      role: '3. Repository',
      title: 'Accès Données',
      desc: 'Contrat abstrait : findById(), save(), findAll().',
      icon: Layers,
      badge: 'Abstraction Clé',
      color: 'border-blue-300 dark:border-sky-500/70 bg-blue-50 dark:bg-sky-950/50 text-blue-950 dark:text-sky-100 ring-2 ring-blue-500/10',
      badgeColor: 'bg-blue-600 text-white font-bold'
    },
    {
      role: '4. Data Source',
      title: 'Stockage Physique',
      desc: 'PostgreSQL, MySQL, MongoDB ou Map mémoire.',
      icon: HardDrive,
      badge: 'Infrastructure',
      color: 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200',
      badgeColor: 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
    }
  ];

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 relative">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <div 
              key={idx}
              className={`p-4 rounded-xl border ${step.color} flex flex-col justify-between shadow-xs relative`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono font-bold">{step.role}</span>
                  <div className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>
                <h4 className="text-sm font-extrabold tracking-tight mt-1">{step.title}</h4>
                <p className="text-xs opacity-80 mt-1.5 leading-relaxed font-normal">{step.desc}</p>
              </div>

              <div className="mt-4 pt-2.5 border-t border-current/10">
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded-md ${step.badgeColor}`}>
                  {step.badge}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-3 flex items-center justify-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400">
        <span>Controller</span>
        <ArrowRight className="w-3.5 h-3.5 text-blue-500" />
        <span>Service</span>
        <ArrowRight className="w-3.5 h-3.5 text-blue-500" />
        <span className="font-bold text-blue-600 dark:text-sky-400">Repository (Interface)</span>
        <ArrowRight className="w-3.5 h-3.5 text-blue-500" />
        <span>Data Source</span>
      </div>
    </div>
  );
};

// SLIDE 4: WHAT vs HOW
export const ContractDiagram: React.FC<DiagramProps> = () => {
  return (
    <div className="w-full flex flex-col sm:flex-row items-stretch justify-between gap-4">
      {/* Interface WHAT */}
      <div className="flex-1 p-5 rounded-xl border-2 border-blue-500/80 dark:border-sky-500 bg-blue-50/60 dark:bg-sky-950/30 flex flex-col justify-between shadow-xs">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="px-2.5 py-1 rounded-md bg-blue-600 text-white font-mono text-xs font-bold uppercase tracking-wider">
              Interface = LE QUOI (WHAT)
            </span>
            <Layers className="w-4 h-4 text-blue-600 dark:text-sky-400" />
          </div>
          <h4 className="text-base font-extrabold text-slate-900 dark:text-white mt-2">
            ClientRepository
          </h4>
          <p className="text-xs text-slate-600 dark:text-slate-300 mt-1.5 leading-relaxed">
            Définit le contrat strict et expressif : quelles opérations le domaine autorise-t-il sur les clients ?
          </p>
        </div>

        <div className="mt-4 p-3 rounded-lg bg-white dark:bg-slate-900 border border-blue-200 dark:border-sky-900/60 font-mono text-xs text-blue-800 dark:text-sky-300 font-medium">
          save(client) · findById(id) · findAll() · delete(id)
        </div>
      </div>

      {/* Center connector */}
      <div className="flex sm:flex-col items-center justify-center gap-1 text-slate-400 font-mono text-xs self-center">
        <span className="text-[11px] font-bold text-slate-500 uppercase">implements</span>
        <ArrowRight className="hidden sm:block w-5 h-5 text-blue-600 dark:text-sky-400" />
        <ArrowDown className="sm:hidden w-5 h-5 text-blue-600 dark:text-sky-400" />
      </div>

      {/* Implementation HOW */}
      <div className="flex-1 p-5 rounded-xl border border-teal-300 dark:border-teal-800 bg-teal-50/60 dark:bg-teal-950/30 flex flex-col justify-between shadow-xs">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="px-2.5 py-1 rounded-md bg-teal-600 text-white font-mono text-xs font-bold uppercase tracking-wider">
              Implémentation = LE COMMENT (HOW)
            </span>
            <FileCode className="w-4 h-4 text-teal-600 dark:text-teal-400" />
          </div>
          <h4 className="text-base font-extrabold text-slate-900 dark:text-white mt-2">
            InMemoryClientRepository
          </h4>
          <p className="text-xs text-slate-600 dark:text-slate-300 mt-1.5 leading-relaxed">
            Définit la technique concrète de stockage : ici une table de hachage en mémoire idéale pour les tests.
          </p>
        </div>

        <div className="mt-4 p-3 rounded-lg bg-white dark:bg-slate-900 border border-teal-200 dark:border-teal-900/60 font-mono text-xs text-teal-800 dark:text-teal-300 font-medium">
          Map&lt;UUID, Client&gt; clients = new HashMap&lt;&gt;();
        </div>
      </div>
    </div>
  );
};

// SLIDE 7: DIP & Testability
export const DIPDiagram: React.FC<DiagramProps> = () => {
  return (
    <div className="w-full space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-center text-center">
        {/* High level */}
        <div className="p-4 rounded-xl border border-indigo-200 dark:border-indigo-900 bg-indigo-50/60 dark:bg-indigo-950/40">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            Module Haut Niveau
          </span>
          <h5 className="text-sm font-bold text-slate-900 dark:text-white mt-1">ReservationService</h5>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Logique de gestion métier</p>
        </div>

        {/* DIP Interface Contract */}
        <div className="p-4 rounded-xl border-2 border-blue-500 dark:border-sky-500 bg-blue-50 dark:bg-sky-950/60 shadow-md">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-600 dark:text-sky-300">
            Contrat Stable (DIP)
          </span>
          <h5 className="text-sm font-extrabold text-blue-950 dark:text-white mt-1">ReservationRepository</h5>
          <p className="text-xs text-blue-700 dark:text-sky-300 mt-1 font-mono">Interface Abstraite</p>
        </div>

        {/* Low level */}
        <div className="p-4 rounded-xl border border-teal-200 dark:border-teal-900 bg-teal-50/60 dark:bg-teal-950/40">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
            Module Bas Niveau
          </span>
          <h5 className="text-sm font-bold text-slate-900 dark:text-white mt-1">Postgres / InMemory</h5>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Détails d'implémentation</p>
        </div>
      </div>

      {/* Testability benefit */}
      <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
          <GitFork className="w-4 h-4 text-blue-600 dark:text-sky-400" />
          <span className="font-bold">Bénéfice Testabilité :</span>
          <span className="text-slate-600 dark:text-slate-400">Le Service s'instancie sans base de données externe</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-md bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono text-[11px] text-slate-700 dark:text-slate-300">
            Prod → SqlReservationRepository
          </span>
          <span className="text-slate-400">vs</span>
          <span className="px-2.5 py-1 rounded-md bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 font-mono text-[11px] text-emerald-700 dark:text-emerald-300 font-semibold">
            Test → FakeInMemory / Mock
          </span>
        </div>
      </div>
    </div>
  );
};

// SLIDE 8: Final Summary Flow
export const RecapDiagram: React.FC<DiagramProps> = () => {
  return (
    <div className="w-full p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs">
        <div className="px-3.5 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-semibold flex items-center gap-2">
          <Server className="w-4 h-4 text-slate-500" />
          <span>1. Controller</span>
        </div>
        <ArrowRight className="w-4 h-4 text-slate-400" />
        <div className="px-3.5 py-2 rounded-lg bg-indigo-100 dark:bg-indigo-950 text-indigo-900 dark:text-indigo-200 font-bold flex items-center gap-2 border border-indigo-200 dark:border-indigo-800">
          <Cpu className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          <span>2. Service (Métier)</span>
        </div>
        <ArrowRight className="w-4 h-4 text-blue-500" />
        <div className="px-4 py-2.5 rounded-lg bg-blue-600 text-white font-extrabold flex items-center gap-2 shadow-md">
          <Layers className="w-4 h-4" />
          <span>3. Repository (Contrat)</span>
        </div>
        <ArrowRight className="w-4 h-4 text-slate-400" />
        <div className="px-3.5 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-semibold flex items-center gap-2">
          <Database className="w-4 h-4 text-slate-500" />
          <span>4. Data Source</span>
        </div>
      </div>
    </div>
  );
};
