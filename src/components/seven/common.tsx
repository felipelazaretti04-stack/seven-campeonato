import { Link } from "@tanstack/react-router";
import {
  Anchor,
  Bird,
  ChevronRight,
  Crown,
  Flame,
  MapPin,
  Mountain,
  Shield,
  Star,
  Zap,
} from "lucide-react";
import {
  formatDate,
  getPlayer,
  getTeam,
  season,
  standings,
  type Match,
  type Player,
  type Team,
} from "@/lib/competition";
import playerImage from "@/assets/seven-player.jpg";
export function Crest({ team, size = "" }: { team: Team | undefined; size?: "" | "sm" | "lg" }) {
  if (!team) return null;
  const Icon = {
    bolt: Zap,
    shield: Shield,
    crown: Crown,
    flame: Flame,
    star: Star,
    mountain: Mountain,
    bird: Bird,
    anchor: Anchor,
  }[team.symbol];
  return (
    <span
      className={`crest ${size ? `crest-${size}` : ""} tone-${team.tone}`}
      aria-label={`Escudo ${team.name}`}
    >
      <Icon strokeWidth={1.7} />
    </span>
  );
}
export function PlayerAvatar({ player, large = false }: { player: Player; large?: boolean }) {
  return (
    <span className={`player-avatar ${large ? "profile-avatar" : ""}`}>
      {player.id === "furia-1" ? (
        <img src={playerImage} alt={player.name} width={768} height={1024} loading="lazy" />
      ) : (
        player.name
          .split(" ")
          .map((n) => n[0])
          .slice(0, 2)
          .join("")
      )}
    </span>
  );
}
export function SectionHeading({
  title,
  to,
  label = "Ver todos",
}: {
  title: string;
  to?: "/jogos" | "/classificacao" | "/rankings" | "/times" | "/jogadores";
  label?: string;
}) {
  return (
    <div className="section-heading">
      <h2>
        <span className="heading-dot" />
        {title}
      </h2>
      {to && (
        <Link to={to}>
          {label}
          <ChevronRight size={14} />
        </Link>
      )}
    </div>
  );
}
export function SeasonSelect() {
  return (
    <select className="season-select" aria-label="Temporada" defaultValue={season.id}>
      <option value={season.id}>{season.name} · Demonstração</option>
    </select>
  );
}
export function PageIntro({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="page-intro">
      <div>
        <div className="eyebrow">
          <span className="live-dot" />
          SEVEN • TEMPORADA 2026
        </div>
        <h1 className="page-title">{title}</h1>
        <p className="page-subtitle">{subtitle}</p>
      </div>
      <SeasonSelect />
    </div>
  );
}
export function MatchCard({ match }: { match: Match }) {
  const home = getTeam(match.homeId),
    away = getTeam(match.awayId);
  return (
    <Link to="/jogos/$id" params={{ id: match.id }} className="match-card">
      <div className="match-meta">
        <span>
          {formatDate(match.date)} · {match.round}ª rodada
        </span>
        <span className={match.status === "scheduled" ? "match-status" : ""}>
          {match.status === "scheduled" ? "Agendado" : "Encerrado"}
        </span>
      </div>
      <div className="match-teams">
        <div className="match-team">
          <Crest team={home} />
          <span>{home?.short}</span>
        </div>
        <div className={`match-score ${match.status === "scheduled" ? "match-time" : ""}`}>
          {match.status === "finished"
            ? `${match.homeScore} : ${match.awayScore}`
            : formatDate(match.date, { hour: "2-digit", minute: "2-digit" })}
        </div>
        <div className="match-team">
          <Crest team={away} />
          <span>{away?.short}</span>
        </div>
      </div>
      <div className="match-venue">
        <MapPin size={10} />
        {match.venue}
      </div>
    </Link>
  );
}
export function StandingsTable({ compact = false }: { compact?: boolean }) {
  const rows = standings();
  return (
    <>
      <div className="table-wrap">
        <table className="standings-table">
          <thead>
            <tr>
              <th>#</th>
              <th className="team-cell">Time</th>
              <th>PTS</th>
              <th>J</th>
              <th>V</th>
              {!compact && (
                <>
                  <th>E</th>
                  <th>D</th>
                  <th>GP</th>
                  <th>GC</th>
                </>
              )}
              <th>SG</th>
              {!compact && <th>Últimos 5</th>}
            </tr>
          </thead>
          <tbody>
            {rows.slice(0, compact ? 5 : 8).map((r, i) => (
              <tr key={r.team.id}>
                <td className={`position ${i < 4 ? "top" : ""}`}>
                  {String(i + 1).padStart(2, "0")}
                </td>
                <td className="team-cell">
                  <Link to="/times/$id" params={{ id: r.team.id }}>
                    <Crest team={r.team} size="sm" />
                    {r.team.name}
                  </Link>
                </td>
                <td className="points">{r.points}</td>
                <td>{r.played}</td>
                <td>{r.wins}</td>
                {!compact && (
                  <>
                    <td>{r.draws}</td>
                    <td>{r.losses}</td>
                    <td>{r.scored}</td>
                    <td>{r.conceded}</td>
                  </>
                )}
                <td>
                  {r.difference > 0 ? "+" : ""}
                  {r.difference}
                </td>
                {!compact && (
                  <td>
                    <div className="form">
                      {r.form.map((v, j) => (
                        <span
                          key={j}
                          className={`form-${v}`}
                          title={v === "V" ? "Vitória" : v === "E" ? "Empate" : "Derrota"}
                        >
                          {v}
                        </span>
                      ))}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="table-note">
        <span className="live-dot" />
        {compact
          ? "4 primeiros na zona de classificação demonstrativa."
          : "Regras demonstrativas: vitória 3 pts · empate 1 pt · derrota 0 pts. Desempate: vitórias, saldo e gols pró."}
      </p>
    </>
  );
}
export function TeamTile({ team }: { team: Team }) {
  return (
    <Link to="/times/$id" params={{ id: team.id }} className="team-tile">
      <Crest team={team} />
      <div>
        <h3>{team.name}</h3>
        <p>Desde {team.founded} · 7 jogadores</p>
      </div>
      <ChevronRight size={14} />
    </Link>
  );
}
export function FeaturedTeam({ teamId }: { teamId: string }) {
  const team = getTeam(teamId);
  return (
    <div className="featured-team">
      <Crest team={team} size="sm" />
      {team?.name}
    </div>
  );
}
export function EventPlayer({ id }: { id: string }) {
  return (
    <Link to="/jogadores/$id" params={{ id }}>
      {getPlayer(id)?.name ?? "Jogador"}
    </Link>
  );
}
export const pageMeta = (title: string, description: string) => ({
  meta: [
    { title: `${title} | SEVEN` },
    { name: "description", content: description },
    { property: "og:title", content: `${title} | SEVEN` },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ],
});
