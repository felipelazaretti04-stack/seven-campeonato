import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MatchCard, PageIntro, pageMeta } from "@/components/seven/common";
import { matches, teams } from "@/lib/competition";
export const Route = createFileRoute("/jogos/")({
  head: () =>
    pageMeta(
      "Jogos",
      "Agenda e resultados da SEVEN: partidas por rodada, placares e detalhes da temporada demonstrativa.",
    ),
  component: Games,
});
function Games() {
  const [status, setStatus] = useState("all"),
    [team, setTeam] = useState("all"),
    [round, setRound] = useState("all");
  const filtered = matches.filter(
    (m) =>
      (status === "all" || m.status === status) &&
      (team === "all" || m.homeId === team || m.awayId === team) &&
      (round === "all" || m.round === Number(round)),
  );
  const rounds = [...new Set(filtered.map((m) => m.round))].sort((a, b) => b - a);
  return (
    <main className="container-seven page-main">
      <PageIntro
        title="Jogos"
        subtitle="Da primeira bola ao apito final. Todas as rodadas em um só lugar."
      />
      <div className="filters">
        <div className="segment-control">
          {[
            { id: "all", label: "Todos os jogos" },
            { id: "scheduled", label: "Próximos" },
            { id: "finished", label: "Resultados" },
          ].map((s) => (
            <Button
              key={s.id}
              variant="ghost"
              aria-pressed={status === s.id}
              onClick={() => setStatus(s.id)}
            >
              {s.label}
            </Button>
          ))}
        </div>
        <select
          className="filter-select"
          aria-label="Filtrar por time"
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
          aria-label="Filtrar por rodada"
          value={round}
          onChange={(e) => setRound(e.target.value)}
        >
          <option value="all">Todas as rodadas</option>
          {[1, 2, 3, 4, 5, 6].map((r) => (
            <option key={r} value={r}>
              {r}ª rodada
            </option>
          ))}
        </select>
      </div>
      {rounds.map((r) => (
        <section key={r}>
          <h2 className="round-heading">
            {String(r).padStart(2, "0")}ª rodada
            <span>{r === 6 ? "A bola vai rolar" : "Rodada encerrada"}</span>
          </h2>
          <div className="match-grid">
            {filtered
              .filter((m) => m.round === r)
              .map((m) => (
                <MatchCard match={m} key={m.id} />
              ))}
          </div>
        </section>
      ))}
      {filtered.length === 0 && (
        <div className="empty-state">Nenhuma partida encontrada para estes filtros.</div>
      )}
    </main>
  );
}
