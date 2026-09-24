import Link from "next/link";
import { EmptyState, SectionLabel } from "@/components/ui";
import { AnswerRow } from "@/components/study";
import { getAnswerKey } from "@/lib";

export const metadata = {
  title: "Gabaritos · Revisão pra 29/09",
};

export default function GabaritosPage() {
  const answerKey = getAnswerKey();

  return (
    <div className="px-4 py-10 sm:px-8 sm:py-14 lg:px-12 lg:py-16">
      <div className="mx-auto max-w-3xl">
        <SectionLabel>Recursos gerais</SectionLabel>
        <h1 className="mt-3 font-display text-3xl font-medium text-ink sm:text-4xl">Gabarito</h1>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-ink-soft">
          Respostas das questões objetivas de cada parte. As resoluções das questões discursivas ficam
          na{" "}
          <Link href="/discursivas" className="font-medium text-brand underline-offset-2 hover:underline">
            área de discursivas
          </Link>
          .
        </p>

        {answerKey.length > 0 ? (
          <div className="mt-10 flex flex-col gap-10">
            {answerKey.map(({ part, entries }) => (
              <section key={part.id}>
                <h2 className="font-display text-lg font-medium text-ink">
                  Parte {String(part.number).padStart(2, "0")} — {part.title}
                </h2>
                <ul className="mt-3 rounded-card border border-border bg-surface px-4">
                  {entries.map(({ question, letter }, i) => (
                    <AnswerRow key={question.id} number={i + 1} letter={letter} question={question} />
                  ))}
                </ul>
              </section>
            ))}
          </div>
        ) : (
          <EmptyState
            className="mt-10"
            title="Nenhum gabarito disponível ainda."
            description="Assim que questões forem cadastradas em uma parte, o gabarito correspondente aparecerá aqui automaticamente."
          />
        )}
      </div>
    </div>
  );
}
