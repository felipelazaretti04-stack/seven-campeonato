import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Crest, FeaturedTeam, PageIntro, PlayerAvatar, pageMeta } from "@/components/seven/common";
import { getTeam, rankings, type RankingMetric } from "@/lib/competition";
export const Route = createFileRoute("/rankings")({
  head: () =>
    pageMeta(
      "Rankings",
      "Os protagonistas da SEVEN: artilharia, assistências e participações em gols na temporada demonstrativa 2026.",
    ),
  component: Rankings,
});
const metrics: { id: RankingMetric; label: string; unit: string }[] = [
  { id: "goals", label: "Artilharia", unit: "gols" },
  { id: "assists", label: "Assistências", unit: "assistências" },
  { id: "contributions", label: "Participações em gols", unit: "participações" },
];
function Rankings() {
  const [metric, setMetric] = useState<RankingMetric>("goals");
  const ranked = rankings(metric).filter((p) => p[metric] > 0);
  const unit = metrics.find((m) => m.id === metric)?.unit;
  return (
    <main className="container-seven page-main">
      <PageIntro
        title="Os protagonistas"
        subtitle="Talento que decide. Os nomes que deixam sua marca na temporada."
      />
      <div className="filters">
        <div className="segment-control">
          {metrics.map((m) => (
            <Button
              variant="ghost"
              key={m.id}
              aria-pressed={metric === m.id}
              onClick={() => setMetric(m.id)}
            >
              {m.label}
            </Button>
          ))}
        </div>
      </div>
      <div className="ranking-podium">
        {ranked.slice(0, 3).map((r, i) => (
          <Link
            to="/jogadores/$id"
            params={{ id: r.player.id }}
            key={r.player.id}
            className="podium-card"
          >
            <span className="podium-position">0{i + 1}</span>
            <PlayerAvatar player={r.player} />
            <div>
              <h3>{r.player.name}</h3>
              <FeaturedTeam teamId={r.player.teamId} />
            </div>
            <div className="podium-total">
              {r[metric]}
              <span>{unit}</span>
            </div>
          </Link>
        ))}
      </div>
      <div className="ranking-row bg-card text-xs text-muted-foreground">
        <span>#</span>
        <span>JOGADOR</span>
        <span className="ranking-team">TIME</span>
        <span className="text-right uppercase">{unit}</span>
      </div>
      {ranked.map((r, i) => (
        <div className="ranking-row" key={r.player.id}>
          <span className={i === 0 ? "text-primary" : "text-muted-foreground"}>
            {String(i + 1).padStart(2, "0")}
          </span>
          <Link to="/jogadores/$id" params={{ id: r.player.id }} className="player-link">
            <PlayerAvatar player={r.player} />
            {r.player.name}
          </Link>
          <Link to="/times/$id" params={{ id: r.player.teamId }} className="ranking-team">
            <Crest team={getTeam(r.player.teamId)} size="sm" />
            {getTeam(r.player.teamId)?.name}
          </Link>
          <strong className="ranking-value">{r[metric]}</strong>
        </div>
      ))}
    </main>
  );
}
