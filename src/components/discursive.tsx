"use client";

/**
 * QUESTÕES DISCURSIVAS
 * Card da questão (resposta, resolução comentada, autoavaliação)
 * e barra de progresso da área.
 */
import { useState } from "react";
import Link from "next/link";
import { Check, ChevronDown, RotateCcw } from "lucide-react";
import { cn, percentage, type DiscursiveQuestion } from "@/lib";
import { MathText, ProgressBar } from "./ui";
import { useProgress } from "./progress";

// ═══════════════════════════════════════════════════════════════
// CARD DA QUESTÃO
// ═══════════════════════════════════════════════════════════════

interface RelatedPartLink {
  id: string;
  number: number;
  title: string;
}

/**
 * Questão discursiva: o estudante escreve a própria resolução (salva
 * localmente), revela a resolução comentada e se autoavalia.
 * A resolução só aparece depois de uma ação explícita.
 */
export function DiscursiveQuestionCard({
  question,
  number,
  relatedParts,
}: {
  question: DiscursiveQuestion;
  number: number;
  relatedParts: RelatedPartLink[];
}) {
  const { state, setDiscursiveDraft, setDiscursiveStatus } = useProgress();
  const [revealed, setRevealed] = useState(false);

  const draft = state.discursiveDrafts[question.id] ?? "";
  const status = state.discursiveStatus[question.id];
  const label = String(number).padStart(2, "0");
  const textareaId = `disc-answer-${question.id}`;

  return (
    <article className="rounded-card border border-border bg-surface p-5 sm:p-7">
      <header className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-ink-faint">
            Discursiva {label}
          </p>
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            {relatedParts.map((part) => (
              <Link
                key={part.id}
                href={`/partes/${part.id}`}
                className="rounded-full bg-surface-muted px-2.5 py-0.5 text-xs text-ink-soft transition-colors hover:bg-brand-soft hover:text-brand"
              >
                Parte {String(part.number).padStart(2, "0")} · {part.title}
              </Link>
            ))}
          </div>
        </div>
        {status ? (
          <span
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium",
              status === "correct" ? "bg-success-soft text-success" : "bg-warning-soft text-warning",
            )}
          >
            {status === "correct" ? <Check className="h-3.5 w-3.5" aria-hidden /> : <RotateCcw className="h-3.5 w-3.5" aria-hidden />}
            {status === "correct" ? "Acertei" : "Revisar"}
          </span>
        ) : null}
      </header>

      <p className="mt-4 max-w-prose text-[1.05rem] leading-relaxed text-ink">
        <MathText text={question.statement} />
      </p>

      {question.items && question.items.length > 0 ? (
        <ol className="mt-4 flex max-w-prose flex-col gap-2">
          {question.items.map((item, i) => (
            <li key={i} className="flex gap-3 text-[1.02rem] leading-relaxed text-ink-soft">
              <span className="w-5 shrink-0 font-display font-semibold text-brand">{String.fromCharCode(97 + i)})</span>
              <span className="min-w-0">
                <MathText text={item} />
              </span>
            </li>
          ))}
        </ol>
      ) : null}

      <div className="mt-6">
        <label htmlFor={textareaId} className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-ink-faint">
          Sua resolução
        </label>
        <textarea
          id={textareaId}
          value={draft}
          onChange={(e) => setDiscursiveDraft(question.id, e.target.value)}
          rows={4}
          placeholder="Escreva aqui seus cálculos e sua resposta. O texto fica salvo neste navegador."
          className="mt-2 w-full resize-y rounded-control border border-border bg-bg px-3.5 py-3 text-base leading-relaxed text-ink placeholder:text-ink-faint focus:border-brand focus:outline-none focus-visible:outline-2 focus-visible:outline-brand"
        />
      </div>

      <button
        type="button"
        onClick={() => setRevealed((v) => !v)}
        aria-expanded={revealed}
        aria-controls={`disc-resolution-${question.id}`}
        className={cn(
          "mt-4 inline-flex items-center gap-2 rounded-control px-4 py-2.5 text-sm font-medium transition-colors",
          revealed
            ? "border border-border text-ink-soft hover:border-border-strong"
            : "bg-brand text-brand-contrast hover:opacity-90",
        )}
      >
        {revealed ? "Ocultar resolução" : "Ver resolução comentada"}
        <ChevronDown className={cn("h-4 w-4 transition-transform", revealed && "rotate-180")} aria-hidden />
      </button>

      {revealed ? (
        <div id={`disc-resolution-${question.id}`} className="mt-5 border-t border-border pt-5">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-brand">Resolução</p>
          <ol className="mt-3 flex flex-col gap-3">
            {question.resolutionSteps.map((step, i) => (
              <li key={i} className="flex gap-3">
                <span
                  aria-hidden
                  className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-soft text-xs font-semibold text-brand"
                >
                  {i + 1}
                </span>
                <p className="min-w-0 max-w-prose overflow-x-auto text-[0.98rem] leading-relaxed text-ink-soft">
                  <MathText text={step} />
                </p>
              </li>
            ))}
          </ol>

          <div className="mt-5 max-w-prose overflow-x-auto rounded-control border border-accent/30 bg-accent-soft px-4 py-3.5">
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-accent">Resposta final</p>
            <p className="mt-1.5 text-[0.98rem] leading-relaxed text-ink">
              <MathText text={question.finalAnswer} />
            </p>
          </div>

          <div className="mt-5">
            <p className="text-sm text-ink-soft">Como foi sua resolução?</p>
            <div className="mt-2 flex flex-wrap gap-2">
              <button
                type="button"
                aria-pressed={status === "review"}
                onClick={() => setDiscursiveStatus(question.id, status === "review" ? null : "review")}
                className={cn(
                  "inline-flex items-center gap-2 rounded-control border px-4 py-2.5 text-sm font-medium transition-colors",
                  status === "review"
                    ? "border-warning/50 bg-warning-soft text-warning"
                    : "border-border text-ink-soft hover:border-border-strong",
                )}
              >
                <RotateCcw className="h-4 w-4" aria-hidden />
                Preciso revisar
              </button>
              <button
                type="button"
                aria-pressed={status === "correct"}
                onClick={() => setDiscursiveStatus(question.id, status === "correct" ? null : "correct")}
                className={cn(
                  "inline-flex items-center gap-2 rounded-control border px-4 py-2.5 text-sm font-medium transition-colors",
                  status === "correct"
                    ? "border-success/50 bg-success-soft text-success"
                    : "border-border text-ink-soft hover:border-border-strong",
                )}
              >
                <Check className="h-4 w-4" aria-hidden />
                Acertei
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </article>
  );
}

// ═══════════════════════════════════════════════════════════════
// PROGRESSO DA ÁREA
// ═══════════════════════════════════════════════════════════════

export function DiscursiveProgress({ questionIds }: { questionIds: string[] }) {
  const { state, resetDiscursive } = useProgress();
  const total = questionIds.length;
  const evaluated = questionIds.filter((id) => state.discursiveStatus[id]);
  const correct = evaluated.filter((id) => state.discursiveStatus[id] === "correct").length;
  const review = evaluated.length - correct;

  return (
    <div className="rounded-card border border-border bg-surface p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-ink-soft">
          {evaluated.length} / {total} autoavaliadas
          <span className="mx-2 text-ink-faint">·</span>
          <span className="text-success">acertei: {correct}</span>
          <span className="mx-1 text-ink-faint">/</span>
          <span className="text-warning">revisar: {review}</span>
        </p>
        <button
          type="button"
          onClick={resetDiscursive}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-ink-faint hover:text-ink"
        >
          <RotateCcw className="h-3.5 w-3.5" aria-hidden />
          Apagar respostas e recomeçar
        </button>
      </div>
      <ProgressBar value={percentage(evaluated.length, total)} className="mt-3" label="Progresso das questões discursivas" />
    </div>
  );
}
