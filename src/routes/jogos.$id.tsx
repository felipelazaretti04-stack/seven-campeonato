import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  CalendarDays,
  ChevronRight,
  Clock,
  MapPin,
  CircleDot,
  RectangleVertical,
} from "lucide-react";
import { Crest, EventPlayer, pageMeta, SectionHeading } from "@/components/seven/common";
import { formatDate, getMatch, getTeam } from "@/lib/competition";
export const Route = createFileRoute("/jogos/$id")({
  loader: ({ params }) => {
    const match = getMatch(params.id);
    if (!match) throw notFound();
    return { match };
  },
  head: ({ loaderData }) => {
    const m = loaderData?.match;
    return pageMeta(
      m ? `${getTeam(m.homeId)?.name} × ${getTeam(m.awayId)?.name}` : "Partida indisponível",
      "Placar, gols, assistências e linha do tempo de uma partida da temporada demonstrativa SEVEN.",
    );
  },
  component: MatchDetail,
});
function MatchDetail() {
  const { match: m } = Route.useLoaderData();
  const home = getTeam(m.homeId),
    away = getTeam(m.awayId);
  return (
    <main className="container-seven page-main">
      <div className="breadcrumb">
        <Link to="/jogos">Jogos</Link>
        <ChevronRight size={12} />
        <span>{m.round}ª rodada</span>
      </div>
      <section className="match-detail-top">
        <div className="detail-meta">
          <span>SEVEN 2026</span>
          <span>•</span>
          <span>{m.round}ª RODADA</span>
          <span className="status-badge">{m.status === "finished" ? "Encerrado" : "Agendado"}</span>
        </div>
        <div className="detail-scoreboard">
          <Link to="/times/$id" params={{ id: m.homeId }} className="detail-team">
            <Crest team={home} size="lg" />
            {home?.name}
          </Link>
          <div>
            <div className="detail-score">
              {m.status === "finished"
                ? `${m.homeScore} : ${m.awayScore}`
                : formatDate(m.date, { hour: "2-digit", minute: "2-digit" })}
            </div>
            <div className="text-xs text-muted-foreground">
              {m.status === "finished" ? "PLACAR FINAL" : "HORÁRIO DA PARTIDA"}
            </div>
          </div>
          <Link to="/times/$id" params={{ id: m.awayId }} className="detail-team">
            <Crest team={away} size="lg" />
            {away?.name}
          </Link>
        </div>
        <div className="detail-date">
          <span>
            <CalendarDays size={13} />
            {formatDate(m.date, { day: "numeric", month: "long", year: "numeric" })}
          </span>
          <span>
            <Clock size={13} />
            {formatDate(m.date, { hour: "2-digit", minute: "2-digit" })}
          </span>
          <span>
            <MapPin size={13} />
            {m.venue}
          </span>
        </div>
      </section>
      {m.status === "finished" ? (
        <div className="detail-columns">
          <section>
            <SectionHeading title="A história do jogo" />
            <div className="timeline">
              {m.events.map((e) => (
                <div className="timeline-event" key={e.id}>
                  <span className="timeline-minute">{e.minute}′</span>
                  <span
                    className={`event-icon ${e.type === "yellow" ? "text-gold" : e.type === "red" ? "text-coral" : ""}`}
                  >
                    {e.type === "goal" ? <CircleDot size={17} /> : <RectangleVertical size={16} />}
                  </span>
                  <div>
                    <EventPlayer id={e.playerId} />
                    <p>
                      {e.type === "goal"
                        ? "Gol"
                        : e.type === "yellow"
                          ? "Cartão amarelo"
                          : "Cartão vermelho"}
                      {e.assistId && (
                        <>
                          {" "}
                          · Assistência: <EventPlayer id={e.assistId} />
                        </>
                      )}
                    </p>
                  </div>
                  <Crest team={getTeam(e.teamId)} size="sm" />
                </div>
              ))}
            </div>
          </section>
          <section>
            <SectionHeading title="Em números" />
            {[
              { label: "Gols", a: m.homeScore ?? 0, b: m.awayScore ?? 0 },
              {
                label: "Assistências",
                a: m.events.filter((e) => e.teamId === m.homeId && e.assistId).length,
                b: m.events.filter((e) => e.teamId === m.awayId && e.assistId).length,
              },
              {
                label: "Cartões amarelos",
                a: m.events.filter((e) => e.teamId === m.homeId && e.type === "yellow").length,
                b: m.events.filter((e) => e.teamId === m.awayId && e.type === "yellow").length,
              },
              {
                label: "Cartões vermelhos",
                a: m.events.filter((e) => e.teamId === m.homeId && e.type === "red").length,
                b: m.events.filter((e) => e.teamId === m.awayId && e.type === "red").length,
              },
            ].map((s) => (
              <div className="stat-bar-row" key={s.label}>
                <div className="stat-bar-values">
                  <strong>{s.a}</strong>
                  <span>{s.label}</span>
                  <strong>{s.b}</strong>
                </div>
                <div className="stat-bars">
                  <span />
                  <span />
                </div>
              </div>
            ))}
            <p className="table-note">
              Somente estatísticas registradas nesta partida demonstrativa.
            </p>
          </section>
        </div>
      ) : (
        <div className="empty-state">
          <CalendarDays className="mx-auto mb-4" size={28} />
          <h2 className="font-display text-2xl text-foreground mb-2">
            Tudo pronto para a próxima disputa.
          </h2>
          Os eventos estarão disponíveis após o encerramento da partida.
        </div>
      )}
    </main>
  );
}
