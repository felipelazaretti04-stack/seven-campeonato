import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import {
  Crest,
  MatchCard,
  PlayerAvatar,
  SectionHeading,
  pageMeta,
} from "@/components/seven/common";
import { getPlayer, getTeam, matches, playerStats } from "@/lib/competition";
import portrait from "@/assets/seven-player.jpg";
export const Route = createFileRoute("/jogadores/$id")({
  loader: ({ params }) => {
    const player = getPlayer(params.id);
    if (!player) throw notFound();
    return { player };
  },
  head: ({ loaderData }) =>
    pageMeta(
      loaderData?.player.name ?? "Jogador indisponível",
      "Perfil esportivo, gols, assistências e histórico de partidas na temporada demonstrativa SEVEN 2026.",
    ),
  component: PlayerProfile,
});
function PlayerProfile() {
  const { player: p } = Route.useLoaderData();
  const stats = playerStats(p.id);
  return (
    <main className="container-seven page-main">
      <div className="breadcrumb">
        <Link to="/jogadores">Jogadores</Link>
        <ChevronRight size={12} />
        {p.name}
      </div>
      <section className="profile-header">
        {p.id === "furia-1" ? (
          <img className="profile-portrait" src={portrait} alt={p.name} width={768} height={1024} />
        ) : (
          <PlayerAvatar player={p} large />
        )}
        <div>
          <div className="eyebrow">JOGADOR · TEMPORADA 2026</div>
          <h1 className="page-title">{p.name}</h1>
          <p className="page-subtitle">
            {p.nickname} · {p.position}
          </p>
          <div className="profile-meta">
            <Link to="/times/$id" params={{ id: p.teamId }} className="flex items-center gap-2">
              <Crest team={getTeam(p.teamId)} size="sm" />
              {getTeam(p.teamId)?.name}
            </Link>
            <span>Camisa {p.number}</span>
          </div>
        </div>
        <span className="profile-number">{p.number}</span>
      </section>
      <div className="profile-stats">
        {[
          { label: "Partidas", value: stats.played },
          { label: "Gols", value: stats.goals },
          { label: "Assistências", value: stats.assists },
          { label: "Participações", value: stats.contributions },
          { label: "Amarelos", value: stats.yellow },
          { label: "Vermelhos", value: stats.red },
        ].map((s) => (
          <div key={s.label}>
            <strong>{s.value}</strong>
            <span>{s.label}</span>
          </div>
        ))}
      </div>
      <section className="home-section">
        <SectionHeading title="Histórico de partidas" />
        <div className="match-grid">
          {matches
            .filter(
              (m) => m.status === "finished" && (m.homeId === p.teamId || m.awayId === p.teamId),
            )
            .reverse()
            .map((m) => (
              <MatchCard key={m.id} match={m} />
            ))}
        </div>
      </section>
      <p className="table-note">
        Elenco demonstrativo: os sete jogadores participam de cada partida do time.
      </p>
    </main>
  );
}
