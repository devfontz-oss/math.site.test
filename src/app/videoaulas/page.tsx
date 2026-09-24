import Link from "next/link";
import { EmptyState, SectionLabel, VideoCard } from "@/components/ui";
import { getPart, getParts, videoPartsLabel } from "@/lib";
import { review } from "@/content";

export const metadata = {
  title: "Videoaulas · Revisão pra 29/09",
};

export default function VideoaulasPage() {
  const parts = getParts();
  const hasGeneral = review.generalVideos.length > 0;
  const hasAnyVideo = hasGeneral || parts.some((p) => p.videos.length > 0);

  return (
    <div className="px-4 py-10 sm:px-8 sm:py-14 lg:px-12 lg:py-16">
      <div className="mx-auto max-w-5xl">
        <SectionLabel>Recursos gerais</SectionLabel>
        <h1 className="mt-3 font-display text-3xl font-medium text-ink sm:text-4xl">Aulas em vídeo</h1>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-ink-soft">Videoaulas + questões</p>

        {!hasAnyVideo ? (
          <EmptyState
            className="mt-10"
            title="Videoaulas serão adicionadas aqui."
            description="Nenhum vídeo foi cadastrado ainda. Assim que forem adicionados, aparecerão organizados por parte."
          />
        ) : (
          <div className="mt-10 flex flex-col gap-12">
            {/* Playlists gerais — cada uma ligada a um grupo de partes */}
            {review.generalVideos.map((video) => {
              const related = (video.partIds ?? []).map((id) => getPart(id)).filter((p) => p !== undefined);
              return (
                <section key={video.id} className="grid gap-6 md:grid-cols-[1fr_1.1fr] md:items-start">
                  <VideoCard video={video} eyebrow={videoPartsLabel(video)} />
                  {related.length > 0 ? (
                    <div>
                      <p className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-ink-faint">
                        Partes desta playlist
                      </p>
                      <ul className="mt-3 flex flex-col gap-2">
                        {related.map((part) => (
                          <li key={part.id}>
                            <Link
                              href={`/partes/${part.id}`}
                              className="flex items-center gap-3 rounded-control border border-border bg-surface px-4 py-3 text-sm transition-colors hover:border-border-strong"
                            >
                              <span className="font-display text-xs font-semibold text-ink-faint">
                                {String(part.number).padStart(2, "0")}
                              </span>
                              <span className="min-w-0 flex-1 font-medium text-ink">{part.title}</span>
                              <span className="text-brand" aria-hidden>
                                →
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </section>
              );
            })}

            {/* Vídeos cadastrados diretamente em uma parte (se houver) */}
            {parts.map((part) =>
              part.videos.length > 0 ? (
                <section key={part.id}>
                  <h2 className="font-display text-lg font-medium text-ink">
                    Parte {String(part.number).padStart(2, "0")} — {part.title}
                  </h2>
                  <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {part.videos.map((video) => (
                      <VideoCard key={video.id} video={video} eyebrow={`Parte ${String(part.number).padStart(2, "0")}`} />
                    ))}
                  </div>
                </section>
              ) : null,
            )}
          </div>
        )}
      </div>
    </div>
  );
}
