import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CalendarDays, Crosshair, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  FeaturedTeam,
  MatchCard,
  pageMeta,
  PlayerAvatar,
  SectionHeading,
  StandingsTable,
  TeamTile,
} from "@/components/seven/common";
import { matches, players, rankings, teams, totalGoals } from "@/lib/competition";
import stadium from "@/assets/seven-stadium.jpg";
import portrait from "@/assets/seven-player.jpg";
export const Route = createFileRoute("/")({
  head: () =>
    pageMeta(
      "SEVEN — O jogo é de todos",
      "O portal do campeonato SEVEN. Acompanhe jogos, classificação, times e protagonistas da temporada demonstrativa 2026.",
    ),
  component: Index,
});
function Index() {
  const top = rankings("goals")[0],
    assistant = rankings("assists")[0];
  const finished = matches.filter((m) => m.status === "finished");
  return (
    <main>
      <section className="home-hero">
        <img
          src={stadium}
          className="hero-image"
          alt="Disputa de bola em um campo de futebol iluminado à noite"
          width={1920}
          height={1024}
          fetchPriority="high"
        />
        <div className="hero-content container-seven">
          <div className="eyebrow">
            <span className="live-dot" />
            TEMPORADA 2026 · A DISPUTA CONTINUA
          </div>
          <h1 className="hero-title">
            SEVEN<span>.</span>
          </h1>
          <h2 className="hero-tagline">
            O jogo é de todos.
            <br />A história é nossa.
          </h2>
          <p className="hero-description">
            Cada rodada, uma nova história. Acompanhe os jogos e os protagonistas do nosso
            campeonato.
          </p>
          <div className="hero-actions">
            <Button asChild>
              <Link to="/jogos">
                Acompanhar os jogos
                <ArrowRight />
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/classificacao">
                <Trophy />
                Ver classificação
              </Link>
            </Button>
          </div>
        </div>
        <div className="hero-season-caption">
          <strong>06</strong>
          <div>
            PRÓXIMA RODADA
            <br />
            <span className="text-foreground">13 NOV · ARENA SEVEN</span>
          </div>
        </div>
      </section>
      <div className="container-seven">
        <div className="competition-stats">
          <div>
            <strong>{teams.length.toString().padStart(2, "0")}</strong>
            <span>Times na disputa</span>
          </div>
          <div>
            <strong>{players.length}</strong>
            <span>Jogadores</span>
          </div>
          <div>
            <strong>{finished.length}</strong>
            <span>Jogos realizados</span>
          </div>
          <div>
            <strong>{totalGoals}</strong>
            <span>Gols marcados</span>
          </div>
        </div>
        <section className="home-section">
          <SectionHeading title="A bola vai rolar" to="/jogos" label="Todos os jogos" />
          <div className="match-grid">
            {matches
              .filter((m) => m.status === "scheduled")
              .map((m) => (
                <MatchCard key={m.id} match={m} />
              ))}
          </div>
        </section>
        <div className="home-columns">
          <section>
            <SectionHeading
              title="Na briga pelo topo"
              to="/classificacao"
              label="Classificação completa"
            />
            <StandingsTable compact />
          </section>
          <section>
            <SectionHeading title="Quem faz a diferença" to="/rankings" label="Rankings" />
            {top && (
              <Link to="/jogadores/$id" params={{ id: top.player.id }} className="featured-player">
                <img
                  src={portrait}
                  alt="Retrato demonstrativo de Lucas Ferreira"
                  width={768}
                  height={1024}
                  loading="lazy"
                />
                <div className="featured-player-content">
                  <div className="eyebrow">
                    <Crosshair size={12} />
                    ARTILHEIRO DA TEMPORADA
                  </div>
                  <h3>{top.player.name}</h3>
                  <FeaturedTeam teamId={top.player.teamId} />
                  <div className="featured-stat">
                    <strong>{top.goals.toString().padStart(2, "0")}</strong>
                    <span>Gols</span>
                  </div>
                </div>
              </Link>
            )}
            {assistant && (
              <Link
                className="assist-highlight"
                to="/jogadores/$id"
                params={{ id: assistant.player.id }}
              >
                <PlayerAvatar player={assistant.player} />
                <div>
                  <div className="eyebrow text-muted-foreground mb-1">LÍDER DE ASSISTÊNCIAS</div>
                  <strong className="text-sm">{assistant.player.name}</strong>
                  <p className="text-xs text-muted-foreground mt-1">
                    {teams.find((t) => t.id === assistant.player.teamId)?.name}
                  </p>
                </div>
                <strong className="stat-value">
                  {assistant.assists.toString().padStart(2, "0")}
                </strong>
              </Link>
            )}
          </section>
        </div>
        <section className="home-section">
          <SectionHeading title="O que rolou na rodada" to="/jogos" label="Ver resultados" />
          <div className="match-grid">
            {finished.slice(-4).map((m) => (
              <MatchCard key={m.id} match={m} />
            ))}
          </div>
        </section>
        <section className="home-section">
          <SectionHeading title="8 times. Uma só paixão." to="/times" label="Conheça os times" />
          <div className="team-grid">
            {teams.map((t) => (
              <TeamTile key={t.id} team={t} />
            ))}
          </div>
        </section>
        <div className="table-note mt-6">
          <CalendarDays size={13} />
          Temporada demonstrativa 2026 · Todas as informações esportivas são fictícias.
        </div>
      </div>
    </main>
  );
}
