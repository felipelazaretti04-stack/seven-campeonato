import { describe, expect, it } from "vitest";
import { matches, players, teams, standings, playerStats, totalGoals } from "@/lib/competition";
describe("Demo competition integrity", () => {
  it("contains one consistent roster of seven for each of eight teams", () => {
    expect(teams).toHaveLength(8);
    expect(players).toHaveLength(56);
    for (const t of teams) expect(players.filter((p) => p.teamId === t.id)).toHaveLength(7);
  });
  it("never schedules a team against itself", () => {
    for (const m of matches) expect(m.homeId).not.toBe(m.awayId);
  });
  it("never contains negative completed scores", () => {
    for (const m of matches.filter((m) => m.status === "finished")) {
      expect(m.homeScore).toBeGreaterThanOrEqual(0);
      expect(m.awayScore).toBeGreaterThanOrEqual(0);
    }
  });
  it("scores match registered goals", () => {
    for (const m of matches.filter((m) => m.status === "finished")) {
      expect(m.events.filter((e) => e.type === "goal" && e.teamId === m.homeId)).toHaveLength(
        m.homeScore ?? 0,
      );
      expect(m.events.filter((e) => e.type === "goal" && e.teamId === m.awayId)).toHaveLength(
        m.awayScore ?? 0,
      );
    }
  });
  it("events and assists use the same team as the event", () => {
    for (const m of matches)
      for (const e of m.events) {
        expect(players.find((p) => p.id === e.playerId)?.teamId).toBe(e.teamId);
        expect([m.homeId, m.awayId]).toContain(e.teamId);
        if (e.assistId) {
          expect(players.find((p) => p.id === e.assistId)?.teamId).toBe(e.teamId);
          expect(e.assistId).not.toBe(e.playerId);
        }
      }
  });
  it("aggregates goal totals consistently", () => {
    expect(standings().reduce((s, r) => s + r.scored, 0)).toBe(totalGoals);
    expect(standings().reduce((s, r) => s + r.conceded, 0)).toBe(totalGoals);
    expect(players.reduce((s, p) => s + playerStats(p.id).goals, 0)).toBe(totalGoals);
  });
  it("recomputes rather than double-counting edited match events", () => {
    const original = matches[0];
    if (!original) throw new Error("Fixture missing");
    const edited = {
      ...original,
      homeScore: 5,
      events: [
        ...original.events,
        { id: "extra", type: "goal" as const, teamId: "furia", playerId: "furia-1", minute: 50 },
      ],
    };
    const next = matches.map((m) => (m.id === edited.id ? edited : m));
    expect(standings(next).find((r) => r.team.id === "furia")?.scored).toBe(
      (standings().find((r) => r.team.id === "furia")?.scored ?? 0) + 1,
    );
    expect(playerStats("furia-1", next).goals).toBe(playerStats("furia-1").goals + 1);
  });
});
