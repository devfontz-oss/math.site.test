import Link from "next/link";
import {
  ArrowRight, BookMarked, CalendarDays, Layers, Lightbulb, ListChecks, NotebookPen, PlaySquare,
  type LucideIcon,
} from "lucide-react";
import { review } from "@/content";
import {
  allVideos, cn, getDiscursiveGroups, getDiscursiveQuestions, getParts,
  totalFlashcards, totalQuestions, totalVideos,
} from "@/lib";
import { EmptyState, SectionLabel, VideoCard } from "@/components/ui";
import { PartCard } from "@/components/study";
import { ProgressSummary } from "@/components/progress";

export default function HomePage() {
  const parts = getParts();
  const videos = allVideos().slice(0, 3);
  const secondTip = review.studyTips[1];
  const discursive = getDiscursiveQuestions();
  const discursiveGroups = getDiscursiveGroups();

  return (
    <div className="px-4 py-10 sm:px-8 sm:py-14 lg:px-12 lg:py-16">
      <div className="mx-auto max-w-5xl">
        {/* HERO */}
        <section className="relative overflow-hidden rounded-card bg-grid-paper">
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, var(--color-bg) 0%, color-mix(in srgb, var(--color-bg) 55%, transparent) 55%, var(--color-bg) 100%)",
            }}
            aria-hidden
          />
          <div className="relative grid gap-10 px-1 py-2 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-6">
            <div>
              <SectionLabel>{review.kicker}</SectionLabel>
              <h1 className="mt-4 max-w-xl font-display text-4xl font-medium leading-[1.08] text-ink sm:text-5xl lg:text-[3.4rem]">
                {review.title}
              </h1>
              <p className="mt-4 max-w-xl text-lg leading-relaxed text-ink-soft">{review.subtitle}</p>

              {review.identifier ? (
                <p className="mt-3 inline-flex items-center gap-2 rounded-full bg-surface px-3 py-1.5 text-sm text-ink-soft">
                  <CalendarDays className="h-4 w-4 text-ink-faint" aria-hidden />
                  {review.identifier}
                </p>
              ) : null}

              <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-soft">{review.description}</p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                {parts.length > 0 ? (
                  <Link
                    href={`/partes/${parts[0].id}`}
                    className="inline-flex items-center gap-2 rounded-control bg-brand px-5 py-3 text-sm font-semibold text-brand-contrast transition-opacity hover:opacity-90"
                  >
                    Começar revisão
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </Link>
                ) : (
                  <Link
                    href="/partes"
                    className="inline-flex items-center gap-2 rounded-control bg-brand px-5 py-3 text-sm font-semibold text-brand-contrast transition-opacity hover:opacity-90"
                  >
                    Ver partes
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </Link>
                )}
                <Link
                  href="/videoaulas"
                  className="inline-flex items-center gap-2 rounded-control border border-border px-5 py-3 text-sm font-medium text-ink-soft transition-colors hover:border-border-strong hover:text-ink"
                >
                  Ver videoaulas
                </Link>
              </div>
            </div>

            <HeroMathMotif className="hidden h-auto w-full max-w-[280px] justify-self-end lg:block" />
          </div>
        </section>

        {/* RESUMO */}
        <section className="mt-12 grid grid-cols-2 gap-3 sm:mt-16 sm:grid-cols-4">
          <MetricCard icon={Layers} value={parts.length} label="Partes" />
          <MetricCard icon={BookMarked} value={totalFlashcards()} label="Flashcards" />
          <MetricCard icon={ListChecks} value={totalQuestions()} label="Questões" />
          <MetricCard icon={PlaySquare} value={totalVideos()} label="Videoaulas" />
        </section>

        {/* PROGRESSO */}
        <section className="mt-12 rounded-card border border-border bg-surface p-6 sm:mt-16 sm:p-8">
          <ProgressSummary />
        </section>

        {/* PARTES */}
        <section className="mt-12 sm:mt-16">
          <div className="flex items-end justify-between gap-4">
            <div>
              <SectionLabel>Partes da revisão</SectionLabel>
              <h2 className="mt-2 font-display text-2xl font-medium text-ink sm:text-3xl">
                {parts.length > 0 ? `${parts.length} partes disponíveis` : "Estrutura pronta para partes"}
              </h2>
            </div>
            {parts.length > 0 ? (
              <Link href="/partes" className="hidden shrink-0 text-sm font-medium text-brand sm:inline">
                Ver todas →
              </Link>
            ) : null}
          </div>

          {parts.length > 0 ? (
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {parts.map((part) => (
                <PartCard key={part.id} part={part} />
              ))}
            </div>
          ) : (
            <EmptyState
              className="mt-6"
              title="Nenhuma parte adicionada ainda."
              description="Os conteúdos desta revisão aparecerão aqui assim que forem cadastrados em src/content.ts — teoria, flashcards, questões e objetivos organizados por parte."
            />
          )}
        </section>

        {/* DISCURSIVAS */}
        {discursive.length > 0 ? (
          <section className="mt-12 sm:mt-16">
            <Link
              href="/discursivas"
              className="group grid gap-6 rounded-card border border-border bg-surface p-6 transition-colors hover:border-border-strong sm:grid-cols-[1fr_auto] sm:items-center sm:p-8"
            >
              <div>
                <SectionLabel>Área de treino</SectionLabel>
                <h2 className="mt-2 font-display text-2xl font-medium text-ink sm:text-3xl">Questões discursivas</h2>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink-soft">
                  {discursive.length} questões abertas que combinam o conteúdo das partes, com resolução
                  comentada passo a passo.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {discursiveGroups.map(({ group, questions }) => (
                    <span key={group} className="rounded-full bg-surface-muted px-3 py-1 text-xs text-ink-soft">
                      {questions.length} · {group}
                    </span>
                  ))}
                </div>
              </div>
              <span className="inline-flex items-center gap-2 text-sm font-medium text-brand">
                <NotebookPen className="h-4 w-4" aria-hidden />
                Resolver agora
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
              </span>
            </Link>
          </section>
        ) : null}

        {/* VIDEOAULAS */}
        <section className="mt-12 sm:mt-16">
          <div className="flex items-end justify-between gap-4">
            <div>
              <SectionLabel>Recursos</SectionLabel>
              <h2 className="mt-2 font-display text-2xl font-medium text-ink sm:text-3xl">Videoaulas</h2>
              <p className="mt-1 text-sm text-ink-soft">Videoaulas + questões</p>
            </div>
            {videos.length > 0 ? (
              <Link href="/videoaulas" className="hidden shrink-0 text-sm font-medium text-brand sm:inline">
                Ver todas →
              </Link>
            ) : null}
          </div>

          {videos.length > 0 ? (
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {videos.map(({ video, label }) => (
                <VideoCard key={video.id} video={video} eyebrow={label} />
              ))}
            </div>
          ) : (
            <EmptyState
              className="mt-6"
              title="Videoaulas serão adicionadas aqui."
              description="Os links das videoaulas serão adicionados em breve e aparecerão organizados por parte."
            />
          )}
        </section>

        {/* DICA */}
        {secondTip ? <StudyTip tip={secondTip} className="mt-12 sm:mt-16" /> : null}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// PEÇAS USADAS SÓ NESTA PÁGINA
// ═══════════════════════════════════════════════════════════════

function MetricCard({
  icon: Icon,
  value,
  label,
}: {
  icon: LucideIcon;
  value: number | string;
  label: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-card border border-border bg-surface px-4 py-3.5">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-soft text-brand">
        <Icon className="h-4.5 w-4.5" aria-hidden />
      </span>
      <div>
        <p className="font-display text-xl font-medium leading-none text-ink">{value}</p>
        <p className="mt-1 text-xs text-ink-faint">{label}</p>
      </div>
    </div>
  );
}

/**
 * Componente reutilizável de "Dica de estudo". O texto vem sempre
 * de `review.studyTips` (src/content.ts) — nunca hardcoded aqui.
 */
function StudyTip({ tip, className }: { tip: string; className?: string }) {
  return (
    <div
      className={cn(
        "flex gap-3 rounded-card border border-border bg-brand-soft/60 p-4",
        className,
      )}
    >
      <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden />
      <div>
        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-brand">
          Dica de estudo
        </p>
        <p className="mt-1 text-sm leading-relaxed text-ink-soft">{tip}</p>
      </div>
    </div>
  );
}

/**
 * Composição decorativa do Hero, específica desta revisão de
 * Matemática: colchetes de matriz com uma grade de elementos
 * (Matrizes) sobre um pequeno plano cartesiano com um triângulo e
 * seu baricentro (Geometria Analítica). Puramente decorativo.
 */
function HeroMathMotif({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 320 420"
      fill="none"
      role="presentation"
      aria-hidden="true"
      className={className}
    >
      {/* Colchetes de matriz */}
      <path
        d="M96 30 L74 30 L74 190 L96 190"
        stroke="var(--color-brand)"
        strokeWidth="6"
        strokeLinecap="round"
        opacity="0.22"
      />
      <path
        d="M224 30 L246 30 L246 190 L224 190"
        stroke="var(--color-brand)"
        strokeWidth="6"
        strokeLinecap="round"
        opacity="0.22"
      />

      {/* Grade 3x3 de elementos da matriz */}
      {[62, 110, 158].map((y) =>
        [120, 160, 200].map((x) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r={5} fill="var(--color-brand)" opacity={0.35} />
        )),
      )}

      {/* Plano cartesiano */}
      <line x1="46" y1="400" x2="284" y2="400" stroke="var(--color-border-strong)" strokeWidth="2" />
      <line x1="60" y1="410" x2="60" y2="230" stroke="var(--color-border-strong)" strokeWidth="2" />

      {/* Triângulo e baricentro */}
      <polygon
        points="100,384 226,384 168,258"
        stroke="var(--color-accent)"
        strokeWidth="3"
        fill="none"
        opacity="0.55"
      />
      <circle cx="100" cy="384" r="4" fill="var(--color-brand)" opacity="0.5" />
      <circle cx="226" cy="384" r="4" fill="var(--color-brand)" opacity="0.5" />
      <circle cx="168" cy="258" r="4" fill="var(--color-brand)" opacity="0.5" />
      <circle cx="164.7" cy="342" r="5" fill="var(--color-accent)" />
    </svg>
  );
}
