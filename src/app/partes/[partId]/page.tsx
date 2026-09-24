import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ExternalLink, PlayCircle } from "lucide-react";
import { getAdjacentParts, getPart, getParts, getVideosForPart, type Part } from "@/lib";
import { MathText, PartIcon } from "@/components/ui";
import { ObjectivesList, PartTabs } from "@/components/study";

export function generateStaticParams() {
  return getParts().map((part) => ({ partId: part.id }));
}

export default async function PartPage({
  params,
}: {
  params: Promise<{ partId: string }>;
}) {
  const { partId } = await params;
  const part = getPart(partId);

  if (!part) {
    notFound();
  }

  const { prev, next } = getAdjacentParts(partId);

  return (
    <div className="px-4 py-10 sm:px-8 sm:py-14 lg:px-12 lg:py-16">
      <div className="mx-auto max-w-5xl">
        <PartHeader part={part} />
        <PartTabs part={part} />
        <PartNavigation prev={prev} next={next} />
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// PEÇAS USADAS SÓ NESTA PÁGINA
// ═══════════════════════════════════════════════════════════════

function PartHeader({ part }: { part: Part }) {
  const video = getVideosForPart(part)[0];

  return (
    <header className="border-b border-border pb-8">
      <Link href="/partes" className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-faint hover:text-ink">
        <ArrowLeft className="h-4 w-4" aria-hidden />
        Todas as partes
      </Link>

      <div className="mt-5 flex items-start gap-4">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-soft text-brand">
          <PartIcon name={part.icon} className="h-6 w-6" />
        </span>
        <div className="min-w-0">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-ink-faint">
            Parte {String(part.number).padStart(2, "0")}
          </p>
          <h1 className="mt-1 font-display text-3xl font-medium leading-tight text-ink sm:text-4xl">
            {part.title}
          </h1>
          <p className="mt-3 max-w-prose text-base leading-relaxed text-ink-soft">
            <MathText text={part.description} />
          </p>

          {video ? (
            <a
              href={video.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-control border border-brand/30 bg-brand-soft px-4 py-2.5 text-sm font-semibold text-brand-strong transition-colors hover:border-brand/60"
            >
              <PlayCircle className="h-4 w-4" aria-hidden />
              Assistir videoaulas desta parte
              <ExternalLink className="h-3.5 w-3.5 opacity-70" aria-hidden />
              <span className="sr-only">(abre o YouTube em nova aba)</span>
            </a>
          ) : null}
        </div>
      </div>

      {part.objectives.length > 0 ? (
        <div className="mt-6 max-w-xl">
          <ObjectivesList partId={part.id} objectives={part.objectives} />
        </div>
      ) : null}
    </header>
  );
}

function PartNavigation({ prev, next }: { prev?: Part; next?: Part }) {
  if (!prev && !next) return null;

  return (
    <nav aria-label="Navegação entre partes" className="mt-10 flex items-stretch gap-3 border-t border-border pt-6">
      {prev ? (
        <Link
          href={`/partes/${prev.id}`}
          className="flex flex-1 flex-col gap-1 rounded-card border border-border bg-surface px-4 py-3 transition-colors hover:border-border-strong"
        >
          <span className="inline-flex items-center gap-1.5 text-xs text-ink-faint">
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
            Parte anterior
          </span>
          <span className="truncate text-sm font-medium text-ink">{prev.title}</span>
        </Link>
      ) : (
        <div className="flex-1" />
      )}

      {next ? (
        <Link
          href={`/partes/${next.id}`}
          className="flex flex-1 flex-col items-end gap-1 rounded-card border border-border bg-surface px-4 py-3 text-right transition-colors hover:border-border-strong"
        >
          <span className="inline-flex items-center gap-1.5 text-xs text-ink-faint">
            Próxima parte
            <ArrowRight className="h-3.5 w-3.5" aria-hidden />
          </span>
          <span className="truncate text-sm font-medium text-ink">{next.title}</span>
        </Link>
      ) : (
        <div className="flex-1" />
      )}
    </nav>
  );
}
