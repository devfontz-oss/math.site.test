"use client";

/**
 * PROGRESSO DO ESTUDANTE
 * Salvo no navegador (localStorage): flashcards, questões,
 * objetivos, teoria vista e discursivas. Inclui os cálculos de
 * progresso e o bloco "Seu progresso".
 */
import {
  createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode,
} from "react";
import { getDiscursiveQuestions, getParts, percentage, type Part } from "@/lib";
import { ProgressBar } from "./ui";

// ═══════════════════════════════════════════════════════════════
// CONTEXTO (dados salvos)
// ═══════════════════════════════════════════════════════════════

const STORAGE_KEY = "study-platform:progress:v1";

type FlashcardStatus = "known" | "unknown";

interface ProgressState {
  flashcardStatus: Record<string, FlashcardStatus>;
  questionAnswers: Record<string, { alternativeId: string; correct: boolean }>;
  objectivesDone: Record<string, true>;
  theoryViewed: Record<string, true>;
  discursiveDrafts: Record<string, string>;
  discursiveStatus: Record<string, DiscursiveStatus>;
}

type DiscursiveStatus = "correct" | "review";

const emptyState: ProgressState = {
  flashcardStatus: {},
  questionAnswers: {},
  objectivesDone: {},
  theoryViewed: {},
  discursiveDrafts: {},
  discursiveStatus: {},
};

function flashcardKey(partId: string, cardId: string) {
  return `${partId}::${cardId}`;
}
function questionKey(partId: string, questionId: string) {
  return `${partId}::${questionId}`;
}
function objectiveKey(partId: string, objectiveId: string) {
  return `${partId}::${objectiveId}`;
}

interface ProgressContextValue {
  state: ProgressState;
  markFlashcard: (partId: string, cardId: string, status: FlashcardStatus) => void;
  resetPartFlashcards: (partId: string, cardIds: string[]) => void;
  getFlashcardStatus: (partId: string, cardId: string) => FlashcardStatus | undefined;
  answerQuestion: (
    partId: string,
    questionId: string,
    alternativeId: string,
    correct: boolean,
  ) => void;
  resetPartQuestions: (partId: string, questionIds: string[]) => void;
  getQuestionAnswer: (
    partId: string,
    questionId: string,
  ) => { alternativeId: string; correct: boolean } | undefined;
  toggleObjective: (partId: string, objectiveId: string) => void;
  isObjectiveDone: (partId: string, objectiveId: string) => boolean;
  markTheoryViewed: (partId: string) => void;
  isTheoryViewed: (partId: string) => boolean;
  setDiscursiveDraft: (questionId: string, text: string) => void;
  setDiscursiveStatus: (questionId: string, status: DiscursiveStatus | null) => void;
  resetDiscursive: () => void;
}

const ProgressContext = createContext<ProgressContextValue | null>(null);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ProgressState>(emptyState);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<ProgressState>;
        setState({ ...emptyState, ...parsed });
      }
    } catch {
      // localStorage indisponível — a plataforma continua funcionando sem persistência.
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // ignora falhas de escrita (ex: modo privado)
    }
  }, [state, hydrated]);

  const markFlashcard = useCallback(
    (partId: string, cardId: string, status: FlashcardStatus) => {
      setState((prev) => ({
        ...prev,
        flashcardStatus: { ...prev.flashcardStatus, [flashcardKey(partId, cardId)]: status },
      }));
    },
    [],
  );

  const resetPartFlashcards = useCallback((partId: string, cardIds: string[]) => {
    setState((prev) => {
      const next = { ...prev.flashcardStatus };
      for (const id of cardIds) delete next[flashcardKey(partId, id)];
      return { ...prev, flashcardStatus: next };
    });
  }, []);

  const getFlashcardStatus = useCallback(
    (partId: string, cardId: string) => state.flashcardStatus[flashcardKey(partId, cardId)],
    [state.flashcardStatus],
  );

  const answerQuestion = useCallback(
    (partId: string, questionId: string, alternativeId: string, correct: boolean) => {
      setState((prev) => ({
        ...prev,
        questionAnswers: {
          ...prev.questionAnswers,
          [questionKey(partId, questionId)]: { alternativeId, correct },
        },
      }));
    },
    [],
  );

  const resetPartQuestions = useCallback((partId: string, questionIds: string[]) => {
    setState((prev) => {
      const next = { ...prev.questionAnswers };
      for (const id of questionIds) delete next[questionKey(partId, id)];
      return { ...prev, questionAnswers: next };
    });
  }, []);

  const getQuestionAnswer = useCallback(
    (partId: string, questionId: string) => state.questionAnswers[questionKey(partId, questionId)],
    [state.questionAnswers],
  );

  const toggleObjective = useCallback((partId: string, objectiveId: string) => {
    setState((prev) => {
      const key = objectiveKey(partId, objectiveId);
      const next = { ...prev.objectivesDone };
      if (next[key]) {
        delete next[key];
      } else {
        next[key] = true;
      }
      return { ...prev, objectivesDone: next };
    });
  }, []);

  const isObjectiveDone = useCallback(
    (partId: string, objectiveId: string) => Boolean(state.objectivesDone[objectiveKey(partId, objectiveId)]),
    [state.objectivesDone],
  );

  const markTheoryViewed = useCallback((partId: string) => {
    setState((prev) => {
      if (prev.theoryViewed[partId]) return prev;
      return { ...prev, theoryViewed: { ...prev.theoryViewed, [partId]: true } };
    });
  }, []);

  const isTheoryViewed = useCallback(
    (partId: string) => Boolean(state.theoryViewed[partId]),
    [state.theoryViewed],
  );

  const setDiscursiveDraft = useCallback((questionId: string, text: string) => {
    setState((prev) => ({
      ...prev,
      discursiveDrafts: { ...prev.discursiveDrafts, [questionId]: text },
    }));
  }, []);

  const setDiscursiveStatus = useCallback((questionId: string, status: DiscursiveStatus | null) => {
    setState((prev) => {
      const next = { ...prev.discursiveStatus };
      if (status) next[questionId] = status;
      else delete next[questionId];
      return { ...prev, discursiveStatus: next };
    });
  }, []);

  const resetDiscursive = useCallback(() => {
    setState((prev) => ({ ...prev, discursiveDrafts: {}, discursiveStatus: {} }));
  }, []);

  const value = useMemo<ProgressContextValue>(
    () => ({
      state,
      markFlashcard,
      resetPartFlashcards,
      getFlashcardStatus,
      answerQuestion,
      resetPartQuestions,
      getQuestionAnswer,
      toggleObjective,
      isObjectiveDone,
      markTheoryViewed,
      isTheoryViewed,
      setDiscursiveDraft,
      setDiscursiveStatus,
      resetDiscursive,
    }),
    [
      state,
      markFlashcard,
      resetPartFlashcards,
      getFlashcardStatus,
      answerQuestion,
      resetPartQuestions,
      getQuestionAnswer,
      toggleObjective,
      isObjectiveDone,
      markTheoryViewed,
      isTheoryViewed,
      setDiscursiveDraft,
      setDiscursiveStatus,
      resetDiscursive,
    ],
  );

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

/**
 * Valor usado quando o <ProgressProvider> não é encontrado — o que pode
 * acontecer durante a pré-renderização do build (servidor), dependendo
 * do ambiente. Ele equivale exatamente ao estado inicial do Provider
 * (progresso vazio, pois o localStorage só é lido no navegador), então o
 * HTML gerado é o mesmo. As ações não fazem nada fora do Provider.
 */
const noop = () => {};
const fallbackValue: ProgressContextValue = {
  state: emptyState,
  markFlashcard: noop,
  resetPartFlashcards: noop,
  getFlashcardStatus: () => undefined,
  answerQuestion: noop,
  resetPartQuestions: noop,
  getQuestionAnswer: () => undefined,
  toggleObjective: noop,
  isObjectiveDone: () => false,
  markTheoryViewed: noop,
  isTheoryViewed: () => false,
  setDiscursiveDraft: noop,
  setDiscursiveStatus: noop,
  resetDiscursive: noop,
};

export function useProgress(): ProgressContextValue {
  // Nunca lança erro: sem o Provider, usa o estado vazio em vez de quebrar o build.
  return useContext(ProgressContext) ?? fallbackValue;
}

// ═══════════════════════════════════════════════════════════════
// CÁLCULOS DE PROGRESSO
// ═══════════════════════════════════════════════════════════════

export type PartStatus = "not-started" | "in-progress" | "completed";

interface PartProgress {
  flashcardsTotal: number;
  flashcardsReviewed: number;
  flashcardsKnown: number;
  questionsTotal: number;
  questionsAnswered: number;
  questionsCorrect: number;
  objectivesTotal: number;
  objectivesDone: number;
  theoryViewed: boolean;
  percent: number;
  status: PartStatus;
}

export function usePartProgress(part: Part): PartProgress {
  const { state } = useProgress();

  return useMemo(() => {
    const flashcardsTotal = part.flashcards.length;
    const flashcardsReviewed = part.flashcards.filter(
      (card) => state.flashcardStatus[`${part.id}::${card.id}`],
    ).length;
    const flashcardsKnown = part.flashcards.filter(
      (card) => state.flashcardStatus[`${part.id}::${card.id}`] === "known",
    ).length;

    const questionsTotal = part.questions.length;
    const answeredEntries = part.questions
      .map((q) => state.questionAnswers[`${part.id}::${q.id}`])
      .filter(Boolean);
    const questionsAnswered = answeredEntries.length;
    const questionsCorrect = answeredEntries.filter((a) => a?.correct).length;

    const objectivesTotal = part.objectives.length;
    const objectivesDone = part.objectives.filter(
      (o) => state.objectivesDone[`${part.id}::${o.id}`],
    ).length;

    const theoryViewed = Boolean(state.theoryViewed[part.id]);

    const trackedUnits = [
      part.theory.length > 0 ? 1 : 0,
      flashcardsTotal > 0 ? 1 : 0,
      questionsTotal > 0 ? 1 : 0,
    ].reduce((a, b) => a + b, 0);

    const completedUnits = [
      part.theory.length > 0 && theoryViewed ? 1 : 0,
      flashcardsTotal > 0 && flashcardsReviewed === flashcardsTotal ? 1 : 0,
      questionsTotal > 0 && questionsAnswered === questionsTotal ? 1 : 0,
    ].reduce((a, b) => a + b, 0);

    const percent = trackedUnits > 0 ? percentage(completedUnits, trackedUnits) : 0;

    let status: PartStatus = "not-started";
    if (completedUnits > 0 && completedUnits === trackedUnits && trackedUnits > 0) {
      status = "completed";
    } else if (
      theoryViewed ||
      flashcardsReviewed > 0 ||
      questionsAnswered > 0 ||
      objectivesDone > 0
    ) {
      status = "in-progress";
    }

    return {
      flashcardsTotal,
      flashcardsReviewed,
      flashcardsKnown,
      questionsTotal,
      questionsAnswered,
      questionsCorrect,
      objectivesTotal,
      objectivesDone,
      theoryViewed,
      percent,
      status,
    };
  }, [part, state]);
}

interface OverallProgress {
  partsTotal: number;
  partsCompleted: number;
  flashcardsTotal: number;
  flashcardsReviewed: number;
  questionsTotal: number;
  questionsAnswered: number;
  objectivesTotal: number;
  objectivesDone: number;
  discursiveTotal: number;
  discursiveDone: number;
  percent: number;
}

function useOverallProgress(): OverallProgress {
  const { state } = useProgress();

  return useMemo(() => {
    const parts = getParts();
    let flashcardsTotal = 0;
    let flashcardsReviewed = 0;
    let questionsTotal = 0;
    let questionsAnswered = 0;
    let objectivesTotal = 0;
    let objectivesDone = 0;
    let partsCompleted = 0;

    for (const part of parts) {
      flashcardsTotal += part.flashcards.length;
      flashcardsReviewed += part.flashcards.filter(
        (c) => state.flashcardStatus[`${part.id}::${c.id}`],
      ).length;

      questionsTotal += part.questions.length;
      questionsAnswered += part.questions.filter(
        (q) => state.questionAnswers[`${part.id}::${q.id}`],
      ).length;

      objectivesTotal += part.objectives.length;
      const doneHere = part.objectives.filter(
        (o) => state.objectivesDone[`${part.id}::${o.id}`],
      ).length;
      objectivesDone += doneHere;

      const trackedUnits = [
        part.theory.length > 0 ? 1 : 0,
        part.flashcards.length > 0 ? 1 : 0,
        part.questions.length > 0 ? 1 : 0,
      ].reduce((a, b) => a + b, 0);
      const theoryViewed = Boolean(state.theoryViewed[part.id]);
      const flashcardsDoneHere = part.flashcards.filter(
        (c) => state.flashcardStatus[`${part.id}::${c.id}`],
      ).length;
      const questionsDoneHere = part.questions.filter(
        (q) => state.questionAnswers[`${part.id}::${q.id}`],
      ).length;
      const completedUnits = [
        part.theory.length > 0 && theoryViewed ? 1 : 0,
        part.flashcards.length > 0 && flashcardsDoneHere === part.flashcards.length ? 1 : 0,
        part.questions.length > 0 && questionsDoneHere === part.questions.length ? 1 : 0,
      ].reduce((a, b) => a + b, 0);
      if (trackedUnits > 0 && completedUnits === trackedUnits) partsCompleted += 1;
    }

    const discursive = getDiscursiveQuestions();
    const discursiveTotal = discursive.length;
    const discursiveDone = discursive.filter((q) => state.discursiveStatus[q.id]).length;

    const totalTrackable = flashcardsTotal + questionsTotal + objectivesTotal + discursiveTotal;
    const totalDone = flashcardsReviewed + questionsAnswered + objectivesDone + discursiveDone;

    return {
      partsTotal: parts.length,
      partsCompleted,
      flashcardsTotal,
      flashcardsReviewed,
      questionsTotal,
      questionsAnswered,
      objectivesTotal,
      objectivesDone,
      discursiveTotal,
      discursiveDone,
      percent: percentage(totalDone, totalTrackable),
    };
  }, [state]);
}

// ═══════════════════════════════════════════════════════════════
// BLOCO "SEU PROGRESSO"
// ═══════════════════════════════════════════════════════════════

/**
 * "SEU PROGRESSO" — visão geral simples combinando partes,
 * flashcards, questões e objetivos. Sempre calculado a partir do
 * progresso salvo (localStorage) e dos dados de conteúdo reais.
 */
export function ProgressSummary({ compact = false }: { compact?: boolean }) {
  const progress = useOverallProgress();

  const rows = [
    { label: "Partes", done: progress.partsCompleted, total: progress.partsTotal },
    { label: "Flashcards", done: progress.flashcardsReviewed, total: progress.flashcardsTotal },
    { label: "Questões", done: progress.questionsAnswered, total: progress.questionsTotal },
    { label: "Objetivos", done: progress.objectivesDone, total: progress.objectivesTotal },
    ...(progress.discursiveTotal > 0
      ? [{ label: "Discursivas", done: progress.discursiveDone, total: progress.discursiveTotal }]
      : []),
  ];

  return (
    <div>
      <div className="flex items-baseline justify-between">
        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-ink-faint">
          Seu progresso
        </p>
        <p className="font-display text-2xl font-medium text-ink">{progress.percent}%</p>
      </div>
      <ProgressBar value={progress.percent} className="mt-2" label="Progresso geral da revisão" />

      {!compact && (
        <dl className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3 sm:grid-cols-3 lg:grid-cols-5">
          {rows.map((row) => (
            <div key={row.label}>
              <dt className="text-xs text-ink-faint">{row.label}</dt>
              <dd className="text-sm font-medium text-ink">
                {row.done} / {row.total}
              </dd>
            </div>
          ))}
        </dl>
      )}
    </div>
  );
}
