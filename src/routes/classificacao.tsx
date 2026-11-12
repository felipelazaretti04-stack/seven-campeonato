import { createFileRoute } from "@tanstack/react-router";
import { PageIntro, StandingsTable, pageMeta } from "@/components/seven/common";
export const Route = createFileRoute("/classificacao")({
  head: () =>
    pageMeta(
      "Classificação",
      "Tabela completa da temporada demonstrativa SEVEN 2026: pontos, vitórias, gols e forma dos oito times.",
    ),
  component: Classification,
});
function Classification() {
  return (
    <main className="container-seven page-main">
      <PageIntro title="Classificação" subtitle="Cada ponto conta. A disputa pelo topo da SEVEN." />
      <StandingsTable />
      <div className="flex gap-6 flex-wrap mt-7 text-xs text-muted-foreground">
        <span className="text-primary">● Zona de classificação demonstrativa (1º–4º)</span>
        <span>V Vitória · E Empate · D Derrota</span>
        <span>J Jogos · GP Gols pró · GC Gols contra · SG Saldo de gols</span>
      </div>
    </main>
  );
}
