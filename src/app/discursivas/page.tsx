import { EmptyState, SectionLabel } from "@/components/ui";
import { DiscursiveProgress, DiscursiveQuestionCard } from "@/components/discursive";
import { getDiscursiveGroups, getDiscursiveQuestions, getPart } from "@/lib";

export const metadata = {
  title: "Questões discursivas · Revisão pra 29/09",
};

export default function DiscursivasPage() {
  const all = getDiscursiveQuestions();
  const groups = getDiscursiveGroups();

  return (
    <div className="px-4 py-10 sm:px-8 sm:py-14 lg:px-12 lg:py-16">
      <div className="mx-auto max-w-3xl">
        <SectionLabel>Área de treino</SectionLabel>
        <h1 className="mt-3 font-display text-3xl font-medium text-ink sm:text-4xl">Questões discursivas</h1>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-ink-soft">
          Questões abertas que combinam o conteúdo de várias partes. Resolva no papel ou no campo de
          resposta, depois abra a resolução comentada e avalie seu resultado.
        </p>

        {all.length === 0 ? (
          <EmptyState
            className="mt-10"
            title="Nenhuma questão discursiva cadastrada."
            description="As questões discursivas desta revisão aparecerão aqui."
          />
        ) : (
          <>
            <div className="mt-8">
              <DiscursiveProgress questionIds={all.map((q) => q.id)} />
            </div>

            <div className="mt-12 flex flex-col gap-14">
              {groups.map(({ group, questions }) => (
                <section key={group} aria-labelledby={`grupo-${group}`}>
                  <div className="flex items-baseline justify-between gap-4 border-b border-border pb-3">
                    <h2 id={`grupo-${group}`} className="font-display text-xl font-medium text-ink sm:text-2xl">
                      {group}
                    </h2>
                    <span className="text-xs text-ink-faint">
                      {questions.length} {questions.length === 1 ? "questão" : "questões"}
                    </span>
                  </div>
                  <div className="mt-6 flex flex-col gap-6">
                    {questions.map(({ question, number }) => (
                      <DiscursiveQuestionCard
                        key={question.id}
                        question={question}
                        number={number}
                        relatedParts={question.relatedPartIds
                          .map((id) => getPart(id))
                          .filter((p) => p !== undefined)
                          .map((p) => ({ id: p.id, number: p.number, title: p.title }))}
                      />
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
