export interface CodeSnippet {
  code: string;
  language?: string;
  title?: string;
  highlightLines?: number[];
}

export interface SlidePoint {
  title: string;
  description?: string;
  icon?: string;
  badge?: string;
}

export interface DiagramData {
  type: 'architecture' | 'abstraction' | 'dip' | 'contract' | 'testability' | 'recap';
  variant?: string;
}

export interface ComparisonRow {
  aspect: string;
  dao: string;
  repository: string;
  service: string;
}

export interface SlideData {
  id: number;
  number: string;
  category: string;
  title: string;
  subtitle: string;
  definition?: string;
  keyMessage?: string;
  points?: SlidePoint[];
  codeSnippets?: CodeSnippet[];
  diagram?: DiagramData;
  comparisonTable?: ComparisonRow[];
  bestPractices?: SlidePoint[];
  pitfalls?: SlidePoint[];
  speakerNotes?: string;
  tags?: string[];
}
