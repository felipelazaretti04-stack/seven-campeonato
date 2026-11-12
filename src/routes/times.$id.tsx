import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import {
  Crest,
  MatchCard,
  PlayerAvatar,
  SectionHeading,
  pageMeta,
} from "@/components/seven/common";
import { getTeam, matches, players, playerStats, standings } from "@/lib/competition";
export const Route = createFileRoute("/times/$id")({
  loader: ({ params }) => {
    const team = getTeam(params.id);
    if (!team) throw notFound();
    return { team };
  },
  head: ({ loaderData }) =>
    pageMeta(
      loaderData?.team.name ?? "Time indisponível",
      "Elenco, classificação, próximos jogos e resultados do time na temporada demonstrativa SEVEN 2026.",
    ),
  component: TeamProfile,
});
function TeamProfile() {
  const { team: t } = Route.useLoaderData();
  const table = standings();
  const row = table.find((r) => r.team.id === t.id);
  return (
    <main className="container-seven page-main">
      <div className="breadcrumb">
        <Link to="/times">Times</Link>
        <ChevronRight size={12} />
        {t.name}
      </div>
      <section className="profile-header">
        <Crest team={t} size="lg" />
        <div>
          <div className="eyebrow">SEVEN · TEMPORADA 2026</div>
          <h1 className="page-title">{t.name}</h1>
          <p className="page-subtitle">Desde {t.founded} · Arena Seven · Elenco demonstrativo</p>
        </div>
        <span className="profile-number">{table.findIndex((r) => r.team.id === t.id) + 1}º</span>
      </section>
      {row && (
        <div className="profile-stats">
          {[
            { label: "Pontos", value: row.points },
            { label: "Partidas", value: row.played },
            { label: "Vitórias", value: row.wins },
            { label: "Gols pró", value: row.scored },
            { label: "Gols contra", value: row.conceded },
            { label: "Saldo", value: row.difference },
          ].map((s) => (
            <div key={s.label}>
              <strong>{s.value}</strong>
              <span>{s.label}</span>
            </div>
          ))}
        </div>
      )}
      <section className="home-section">
        <SectionHeading title="O elenco" />
        <div className="player-grid">
          {players
            .filter((p) => p.teamId === t.id)
            .map((p) => (
              <Link to="/jogadores/$id" params={{ id: p.id }} className="player-card" key={p.id}>
                <span className="player-number">{p.number}</span>
                <PlayerAvatar player={p} />
                <h3>{p.name}</h3>
                <p>{p.position}</p>
                <div className="player-card-stats">
                  <span>
                    <strong>{playerStats(p.id).goals}</strong>Gols
                  </span>
                  <span>
                    <strong>{playerStats(p.id).assists}</strong>Assist.
                  </span>
                </div>
              </Link>
            ))}
        </div>
      </section>
      <section className="home-section">
        <SectionHeading title="Agenda e resultados" />
        <div className="match-grid">
          {matches
            .filter((m) => m.homeId === t.id || m.awayId === t.id)
            .reverse()
            .map((m) => (
              <MatchCard key={m.id} match={m} />
            ))}
        </div>
      </section>
    </main>
  );
}
