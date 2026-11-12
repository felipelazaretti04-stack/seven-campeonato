import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Search } from "lucide-react";
import { PageIntro, PlayerAvatar, pageMeta } from "@/components/seven/common";
import { getTeam, players, playerStats, teams } from "@/lib/competition";
export const Route = createFileRoute("/jogadores/")({
  head: () =>
    pageMeta(
      "Jogadores",
      "Conheça os 56 jogadores, posições e estatísticas dos elencos demonstrativos da SEVEN.",
    ),
  component: Players,
});
function Players() {
  const [search, setSearch] = useState(""),
    [team, setTeam] = useState("all"),
    [position, setPosition] = useState("all"),
    [sort, setSort] = useState("name");
  const normalize = (s: string) =>
    s
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  const filtered = players
    .filter(
      (p) =>
        normalize(p.name).includes(normalize(search)) &&
        (team === "all" || p.teamId === team) &&
        (position === "all" || p.position === position),
    )
    .sort((a, b) =>
      sort === "goals"
        ? playerStats(b.id).goals - playerStats(a.id).goals
        : a.name.localeCompare(b.name),
    );
  return (
    <main className="container-seven page-main">
      <PageIntro title="Jogadores" subtitle="56 jogadores. O talento que move a SEVEN." />
      <div className="filters">
        <label className="search-box">
          <Search size={16} />
          <input
            aria-label="Buscar jogador"
            placeholder="Buscar jogador..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </label>
        <select
          className="filter-select"
          aria-label="Time dos jogadores"
          value={team}
          onChange={(e) => setTeam(e.target.value)}
        >
          <option value="all">Todos os times</option>
          {teams.map((t) => (
            <option key={t.id} value={t.id}>
              {t.name}
            </option>
          ))}
        </select>
        <select
          className="filter-select"
          aria-label="Posição"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
        >
          <option value="all">Todas as posições</option>
          {["Goleiro", "Defensor", "Meia", "Atacante"].map((p) => (
            <option key={p}>{p}</option>
          ))}
        </select>
        <select
          className="filter-select"
          aria-label="Ordenar jogadores"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="name">Nome: A–Z</option>
          <option value="goals">Mais gols</option>
        </select>
      </div>
      <div className="text-xs text-muted-foreground mb-5">
        {filtered.length} jogadores encontrados
      </div>
      <div className="player-grid">
        {filtered.map((p) => {
          const s = playerStats(p.id);
          return (
            <Link className="player-card" to="/jogadores/$id" params={{ id: p.id }} key={p.id}>
              <span className="player-number">{p.number}</span>
              <PlayerAvatar player={p} />
              <h3>{p.name}</h3>
              <p>
                {getTeam(p.teamId)?.name} · {p.position}
              </p>
              <div className="player-card-stats">
                <span>
                  <strong>{s.goals}</strong>Gols
                </span>
                <span>
                  <strong>{s.assists}</strong>Assist.
                </span>
              </div>
            </Link>
          );
        })}
      </div>
      {!filtered.length && <div className="empty-state">Nenhum jogador encontrado.</div>}
    </main>
  );
}
