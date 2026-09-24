/**
 * PEÇAS VISUAIS SIMPLES (sem estado)
 * Usadas por várias páginas: etiquetas, estado vazio, ícones das
 * partes, matemática (KaTeX), barra de progresso e card de vídeo.
 */
import katex from "katex";
import {
  Atom, BookOpen, Brain, Calculator, Compass, ExternalLink, FlaskConical, Globe, Grid3x3,
  Inbox, Landmark, Leaf, PenLine, PlayCircle, Scale, Sigma, type LucideIcon,
} from "lucide-react";
import { cn, type PartIconName, type Video } from "@/lib";

// ═══════════════════════════════════════════════════════════════
// ETIQUETA DE SEÇÃO
// ═══════════════════════════════════════════════════════════════

/**
 * Pequena etiqueta tipográfica usada para identificar seções
 * ("PARTE 01", "TEORIA", "RECURSOS"...). Reutilizável em toda a
 * plataforma para manter o ritmo editorial consistente.
 */
export function SectionLabel({
  children,
  className,
  tone = "brand",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "brand" | "muted";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.16em]",
        tone === "brand" ? "text-brand" : "text-ink-faint",
        className,
      )}
    >
      {children}
    </span>
  );
}

// ═══════════════════════════════════════════════════════════════
// ESTADO VAZIO
// ═══════════════════════════════════════════════════════════════

/**
 * Estado vazio elegante e reutilizável — usado sempre que uma
 * parte, lista de flashcards, questões ou vídeos ainda não possui
 * conteúdo cadastrado. Nunca deixe uma área quebrada ou em branco.
 */
export function EmptyState({
  icon: Icon = Inbox,
  title,
  description,
  className,
  action,
}: {
  icon?: LucideIcon;
  title: string;
  description?: string;
  className?: string;
  action?: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center gap-3 rounded-card border border-dashed border-border-strong bg-surface-muted/60 px-6 py-12 text-center",
        className,
      )}
    >
      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-surface text-ink-faint">
        <Icon className="h-5 w-5" aria-hidden />
      </span>
      <p className="text-base font-medium text-ink">{title}</p>
      {description ? (
        <p className="max-w-sm text-sm leading-relaxed text-ink-soft">{description}</p>
      ) : null}
      {action}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// ÍCONE DA PARTE
// ═══════════════════════════════════════════════════════════════

const ICONS: Record<PartIconName, LucideIcon> = {
  "book-open": BookOpen,
  "flask-conical": FlaskConical,
  atom: Atom,
  calculator: Calculator,
  globe: Globe,
  landmark: Landmark,
  leaf: Leaf,
  brain: Brain,
  scale: Scale,
  compass: Compass,
  "pen-line": PenLine,
  sigma: Sigma,
  grid: Grid3x3,
};

export function PartIcon({
  name,
  className,
}: {
  name?: PartIconName;
  className?: string;
}) {
  const Icon = (name && ICONS[name]) || BookOpen;
  return <Icon className={className} aria-hidden />;
}

// ═══════════════════════════════════════════════════════════════
// MATEMÁTICA (KaTeX)
// ═══════════════════════════════════════════════════════════════

/**
 * Renderiza uma expressão matemática (LaTeX) usando KaTeX.
 * Funciona em componentes de servidor e cliente — o KaTeX gera
 * apenas uma string HTML, sem depender do DOM do navegador.
 *
 * Nunca exiba LaTeX/notação crua (a_ij, x^2, sqrt(x)...) para o
 * estudante: sempre passe a expressão por este componente.
 */
export function MathFormula({
  latex,
  display = false,
  className,
}: {
  latex: string;
  display?: boolean;
  className?: string;
}) {
  const html = katex.renderToString(latex, {
    throwOnError: false,
    displayMode: display,
    output: "html",
    strict: "ignore",
  });

  const Tag = display ? "div" : "span";

  return (
    <Tag
      className={cn(display ? "katex-display-block overflow-x-auto" : "katex-inline", className)}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

/**
 * Renderiza um texto que pode conter trechos de matemática.
 *
 * Convenção usada em todo o conteúdo (src/content.ts):
 *  - `$...$`   → matemática inline (ex: "o elemento $a_{ij}$")
 *  - `$$...$$` → matemática em bloco/destacada
 *
 * Isso garante que nenhuma sintaxe crua de LaTeX/programação
 * (a_ij, x^2, <=, >=...) chegue até o estudante — tudo é
 * convertido em notação matemática real via KaTeX.
 */

type Segment =
  | { type: "text"; value: string }
  | { type: "math"; value: string }
  | { type: "display-math"; value: string };

function splitMath(text: string): Segment[] {
  const segments: Segment[] = [];
  const regex = /\$\$([^$]+)\$\$|\$([^$]+)\$/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      segments.push({ type: "text", value: text.slice(lastIndex, match.index) });
    }
    if (match[1] !== undefined) {
      segments.push({ type: "display-math", value: match[1] });
    } else if (match[2] !== undefined) {
      segments.push({ type: "math", value: match[2] });
    }
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    segments.push({ type: "text", value: text.slice(lastIndex) });
  }

  return segments.length > 0 ? segments : [{ type: "text", value: text }];
}

export function MathText({ text, className }: { text: string; className?: string }) {
  const segments = splitMath(text);

  return (
    <span className={className}>
      {segments.map((segment, i) => {
        if (segment.type === "math") {
          return <MathFormula key={i} latex={segment.value} />;
        }
        if (segment.type === "display-math") {
          return <MathFormula key={i} latex={segment.value} display />;
        }
        return <span key={i}>{segment.value}</span>;
      })}
    </span>
  );
}

// ═══════════════════════════════════════════════════════════════
// BARRA DE PROGRESSO
// ═══════════════════════════════════════════════════════════════

export function ProgressBar({
  value,
  className,
  trackClassName,
  barClassName,
  label,
}: {
  value: number;
  className?: string;
  trackClassName?: string;
  barClassName?: string;
  label?: string;
}) {
  const clamped = Math.min(100, Math.max(0, value));
  return (
    <div
      className={cn("w-full", className)}
      role="progressbar"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label}
    >
      <div className={cn("h-2 w-full overflow-hidden rounded-full bg-surface-sunken", trackClassName)}>
        <div
          className={cn("h-full rounded-full bg-brand transition-[width] duration-500 ease-out", barClassName)}
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// CARD DE VÍDEO
// ═══════════════════════════════════════════════════════════════

export function VideoCard({ video, eyebrow }: { video: Video; eyebrow?: string }) {
  return (
    <a
      href={video.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${video.title} — abrir no YouTube (nova aba)`}
      className="group flex flex-col gap-3 rounded-card border border-border bg-surface p-5 transition-colors hover:border-border-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
    >
      <div className="flex items-center justify-between gap-3">
        {eyebrow ? (
          <span className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-ink-faint">
            {eyebrow}
          </span>
        ) : (
          <span />
        )}
        {video.durationLabel ? (
          <span className="text-xs text-ink-faint">{video.durationLabel}</span>
        ) : null}
      </div>

      <div className="flex items-start gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-soft text-brand transition-transform group-hover:scale-105">
          <PlayCircle className="h-5 w-5" aria-hidden />
        </span>
        <div>
          <h3 className="font-display text-base font-medium leading-snug text-ink">{video.title}</h3>
          {video.description ? (
            <p className="mt-1 text-sm leading-relaxed text-ink-soft">{video.description}</p>
          ) : null}
          {video.author ? <p className="mt-2 text-xs text-ink-faint">{video.author}</p> : null}
        </div>
      </div>

      <span className="mt-auto inline-flex w-full items-center justify-center gap-2 rounded-control bg-brand px-4 py-2.5 text-sm font-semibold text-brand-contrast transition-opacity group-hover:opacity-90">
        Assistir no YouTube
        <ExternalLink className="h-4 w-4" aria-hidden />
      </span>
    </a>
  );
}
