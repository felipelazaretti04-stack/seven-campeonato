import { createFileRoute } from "@tanstack/react-router";
import { PageIntro, TeamTile, pageMeta } from "@/components/seven/common";
import { teams } from "@/lib/competition";
export const Route = createFileRoute("/times/")({
  head: () =>
    pageMeta(
      "Times",
      "Conheça os oito times fictícios da temporada demonstrativa SEVEN, seus elencos e resultados.",
    ),
  component: Teams,
});
function Teams() {
  return (
    <main className="container-seven page-main">
      <PageIntro
        title="Os times da SEVEN"
        subtitle="Oito escudos. Oito histórias. A mesma vontade de vencer."
      />
      <div className="team-grid">
        {teams.map((t) => (
          <TeamTile team={t} key={t.id} />
        ))}
      </div>
    </main>
  );
}
