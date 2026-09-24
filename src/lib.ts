/**
 * TIPOS + FUNÇÕES AUXILIARES
 * Formato do conteúdo (tipos) e cálculos derivados dele
 * (contagens, gabarito, navegação entre partes).
 * O conteúdo em si fica em src/content.ts.
 */
import { review } from "@/content";

// ═══════════════════════════════════════════════════════════════
// TIPOS DO CONTEÚDO
// ═══════════════════════════════════════════════════════════════

/** Nome de um ícone (lucide-react) usado para identificar uma parte. */
export type PartIconName =
  | "book-open"
  | "flask-conical"
  | "atom"
  | "calculator"
  | "globe"
  | "landmark"
  | "leaf"
  | "brain"
  | "scale"
  | "compass"
  | "pen-line"
  | "sigma"
  | "grid";

export interface Objective {
  id: string;
  text: string;
}

/** Blocos de teoria — permitem montar uma página de leitura rica e modular. */
export type TheoryBlock =
  | { type: "heading"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; style?: "bullet" | "number"; items: string[] }
  | { type: "definition"; term: string; text: string }
  | {
      type: "callout";
      variant?: "info" | "warning" | "success";
      title?: string;
      text: string;
    }
  | { type: "example"; title?: string; text: string }
  | { type: "formula"; text: string; caption?: string }
  | { type: "table"; headers: string[]; rows: string[][] }
  | { type: "quote"; text: string; source?: string };

export interface Flashcard {
  id: string;
  question: string;
  answer: string;
}

export interface Alternative {
  id: string;
  text: string;
}

export interface Question {
  id: string;
  statement: string;
  alternatives: Alternative[];
  /** Id da alternativa correta — fonte única de verdade para gabarito. */
  correctAlternativeId: string;
  explanation?: string;
}

export interface Video {
  id: string;
  title: string;
  description?: string;
  url: string;
  thumbnail?: string;
  durationLabel?: string;
  author?: string;
  /** (só para vídeos gerais) partes a que este vídeo/playlist atende. */
  partIds?: string[];
}

export interface Part {
  id: string;
  number: number;
  title: string;
  description: string;
  icon?: PartIconName;
  objectives: Objective[];
  theory: TheoryBlock[];
  flashcards: Flashcard[];
  questions: Question[];
  videos: Video[];
}

/**
 * Questão discursiva (resposta aberta). O estudante escreve a própria
 * resolução, depois revela a resolução comentada e se autoavalia.
 */
export interface DiscursiveQuestion {
  id: string;
  /** Agrupamento exibido na página, ex: "Matrizes", "Geometria Analítica". */
  group: string;
  /** Enunciado principal. Aceita matemática com $...$. */
  statement: string;
  /** Itens opcionais (a, b, c...). */
  items?: string[];
  /** Passos da resolução comentada. */
  resolutionSteps: string[];
  /** Resposta final resumida. */
  finalAnswer: string;
  /** Ids das partes cujo conteúdo é exigido na questão. */
  relatedPartIds: string[];
}

export interface Review {
  /** Nome curto da plataforma/etiqueta, ex: "SISTEMA DE REVISÃO" */
  kicker: string;
  /** Título principal da revisão. */
  title: string;
  /** Frase de apoio, ex: "Revisão para A.O de Biologia" */
  subtitle: string;
  /** Data ou identificação da avaliação (opcional). */
  identifier?: string;
  /** Descrição livre da revisão. */
  description: string;
  /** Dicas curtas de estudo, exibidas em vários pontos da plataforma. */
  studyTips: string[];
  /** Partes da revisão — quantidade totalmente dinâmica. */
  parts: Part[];
  /** Vídeos gerais, não amarrados a uma parte específica. */
  generalVideos: Video[];
  /** Área de questões discursivas (independente das partes). */
  discursiveQuestions: DiscursiveQuestion[];
}

// ═══════════════════════════════════════════════════════════════
// UTILITÁRIOS
// ═══════════════════════════════════════════════════════════════

/** Junta classes condicionalmente, ignorando valores falsy. */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

/** Calcula porcentagem segura (evita divisão por zero). */
export function percentage(done: number, total: number): number {
  if (total <= 0) return 0;
  return Math.round((done / total) * 100);
}

// ═══════════════════════════════════════════════════════════════
// DERIVAÇÕES DO CONTEÚDO
// ═══════════════════════════════════════════════════════════════

export function getDiscursiveQuestions(): DiscursiveQuestion[] {
  return review.discursiveQuestions;
}

/** Questões discursivas agrupadas (ex: "Matrizes", "Geometria Analítica"), preservando a ordem. */
export function getDiscursiveGroups(): { group: string; questions: { question: DiscursiveQuestion; number: number }[] }[] {
  const groups: { group: string; questions: { question: DiscursiveQuestion; number: number }[] }[] = [];
  review.discursiveQuestions.forEach((question, index) => {
    let entry = groups.find((g) => g.group === question.group);
    if (!entry) {
      entry = { group: question.group, questions: [] };
      groups.push(entry);
    }
    entry.questions.push({ question, number: index + 1 });
  });
  return groups;
}

export function getParts(): Part[] {
  return review.parts;
}

export function getPart(id: string): Part | undefined {
  return review.parts.find((part) => part.id === id);
}

export function getAdjacentParts(id: string): {
  prev: Part | undefined;
  next: Part | undefined;
} {
  const parts = getParts();
  const index = parts.findIndex((part) => part.id === id);
  if (index === -1) return { prev: undefined, next: undefined };
  return {
    prev: index > 0 ? parts[index - 1] : undefined,
    next: index < parts.length - 1 ? parts[index + 1] : undefined,
  };
}

export function countFlashcards(part: Part): number {
  return part.flashcards.length;
}

export function countQuestions(part: Part): number {
  return part.questions.length;
}

export function countObjectives(part: Part): number {
  return part.objectives.length;
}

export function countPartVideos(part: Part): number {
  return part.videos.length;
}

export function totalFlashcards(): number {
  return getParts().reduce((sum, part) => sum + countFlashcards(part), 0);
}

export function totalQuestions(): number {
  return getParts().reduce((sum, part) => sum + countQuestions(part), 0);
}

export function totalVideos(): number {
  const inParts = getParts().reduce((sum, part) => sum + countPartVideos(part), 0);
  return inParts + review.generalVideos.length;
}

/** Lista de todos os vídeos, cada um com a etiqueta das partes a que atende. */
export function allVideos(): { label: string; video: Video }[] {
  const list: { label: string; video: Video }[] = [];
  for (const video of review.generalVideos) {
    list.push({ label: videoPartsLabel(video), video });
  }
  for (const part of getParts()) {
    for (const video of part.videos) {
      list.push({ label: `Parte ${String(part.number).padStart(2, "0")}`, video });
    }
  }
  return list;
}

/** Vídeos de uma parte: os próprios + os gerais (playlists) ligados a ela por `partIds`. */
export function getVideosForPart(part: Part): Video[] {
  return [...part.videos, ...review.generalVideos.filter((video) => video.partIds?.includes(part.id))];
}

/** Etiqueta das partes de um vídeo geral, ex: "Partes 01 · 02 · 03". */
export function videoPartsLabel(video: Video): string {
  const numbers = (video.partIds ?? [])
    .map((id) => getPart(id)?.number)
    .filter((n): n is number => n !== undefined)
    .map((n) => String(n).padStart(2, "0"));
  if (numbers.length === 0) return "Geral";
  return `${numbers.length === 1 ? "Parte" : "Partes"} ${numbers.join(" · ")}`;
}

/** Letra (A, B, C...) correspondente ao índice de uma alternativa. */
export function letterFor(index: number): string {
  return String.fromCharCode(65 + index);
}

/** Retorna a letra da alternativa correta de uma questão. */
export function correctLetter(question: Question): string {
  const index = question.alternatives.findIndex(
    (alt) => alt.id === question.correctAlternativeId,
  );
  return index >= 0 ? letterFor(index) : "?";
}

/** Gabarito agrupado por parte — sempre derivado das questões, nunca duplicado. */
export function getAnswerKey(): { part: Part; entries: { question: Question; letter: string }[] }[] {
  return getParts()
    .filter((part) => part.questions.length > 0)
    .map((part) => ({
      part,
      entries: part.questions.map((question) => ({
        question,
        letter: correctLetter(question),
      })),
    }));
}
