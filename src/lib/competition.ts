export type Team = {
  id: string;
  name: string;
  short: string;
  initials: string;
  tone: string;
  symbol: "bolt" | "shield" | "crown" | "flame" | "star" | "mountain" | "bird" | "anchor";
  founded: number;
};
export type Player = {
  id: string;
  name: string;
  nickname: string;
  teamId: string;
  number: number;
  position: string;
};
export type MatchEvent = {
  id: string;
  playerId: string;
  teamId: string;
  minute: number;
  type: "goal" | "yellow" | "red";
  assistId?: string | undefined;
};
export type Match = {
  id: string;
  round: number;
  homeId: string;
  awayId: string;
  homeScore: number | null;
  awayScore: number | null;
  status: "finished" | "scheduled";
  date: string;
  venue: string;
  events: MatchEvent[];
};

export const season = { id: "demo-2026", name: "Temporada 2026", label: "Edição demonstrativa" };
export const demoRules = { win: 3, draw: 1, loss: 0 };
export const teams: Team[] = [
  {
    id: "furia",
    name: "Fúria FC",
    short: "Fúria",
    initials: "FUR",
    tone: "lime",
    symbol: "bolt",
    founded: 2018,
  },
  {
    id: "atletico",
    name: "Atlético Seven",
    short: "Atlético",
    initials: "ATL",
    tone: "coral",
    symbol: "shield",
    founded: 2019,
  },
  {
    id: "imperial",
    name: "Imperial FC",
    short: "Imperial",
    initials: "IMP",
    tone: "gold",
    symbol: "crown",
    founded: 2020,
  },
  {
    id: "fenix",
    name: "Fênix United",
    short: "Fênix",
    initials: "FEN",
    tone: "coral",
    symbol: "flame",
    founded: 2017,
  },
  {
    id: "estrela",
    name: "Estrela FC",
    short: "Estrela",
    initials: "EST",
    tone: "cyan",
    symbol: "star",
    founded: 2019,
  },
  {
    id: "montanha",
    name: "Montanha FC",
    short: "Montanha",
    initials: "MON",
    tone: "mint",
    symbol: "mountain",
    founded: 2021,
  },
  {
    id: "aguias",
    name: "Águias FC",
    short: "Águias",
    initials: "AGU",
    tone: "gold",
    symbol: "bird",
    founded: 2016,
  },
  {
    id: "nautico",
    name: "Náutico Seven",
    short: "Náutico",
    initials: "NAU",
    tone: "cyan",
    symbol: "anchor",
    founded: 2022,
  },
];
const names = [
  [
    "Lucas Ferreira",
    "Rafael Costa",
    "Bruno Martins",
    "Diego Santos",
    "André Lima",
    "Pedro Ribeiro",
    "Caio Alves",
  ],
  [
    "Gabriel Silva",
    "Matheus Oliveira",
    "Thiago Rocha",
    "Vitor Souza",
    "Felipe Melo",
    "Gustavo Nunes",
    "Henrique Dias",
  ],
  [
    "João Victor",
    "Leonardo Ramos",
    "Daniel Cruz",
    "Eduardo Reis",
    "Arthur Mendes",
    "Samuel Pinto",
    "Miguel Barros",
  ],
  [
    "Vinícius Lopes",
    "Wesley Araújo",
    "Renan Teixeira",
    "Igor Batista",
    "Alan Carvalho",
    "Pablo Freitas",
    "Davi Moreira",
  ],
  [
    "Nicolas Duarte",
    "César Correia",
    "Luiz Henrique",
    "Ruan Monteiro",
    "Enzo Cardoso",
    "Otávio Leal",
    "Alex Vieira",
  ],
  [
    "Marcos Paiva",
    "Danilo Castro",
    "David Moura",
    "Erick Torres",
    "Leandro Braga",
    "Breno Machado",
    "Murilo Gomes",
  ],
  [
    "Rodrigo Assis",
    "Carlos Moraes",
    "Kevin Tavares",
    "Douglas Farias",
    "Júlio Campos",
    "Hugo Andrade",
    "Tomás Melo",
  ],
  [
    "Patrick Fernandes",
    "Cristian Borges",
    "Willian Neves",
    "Jorge Macedo",
    "Fernando Sales",
    "Heitor Luz",
    "Sérgio Matos",
  ],
];
export const players: Player[] = teams.flatMap((team, index) =>
  (names[index] ?? []).map((name, i) => ({
    id: `${team.id}-${i + 1}`,
    name,
    nickname: name.split(" ")[0] ?? name,
    teamId: team.id,
    number: [9, 10, 7, 5, 8, 3, 1][i] ?? 1,
    position:
      ["Atacante", "Meia", "Atacante", "Defensor", "Meia", "Defensor", "Goleiro"][i] ?? "Meia",
  })),
);

// One source of truth: scores and events, never separate hand-maintained totals.
const fixtures = [
  [
    [0, 7, 4, 1],
    [1, 6, 3, 1],
    [2, 5, 2, 0],
    [3, 4, 2, 2],
  ],
  [
    [0, 6, 3, 1],
    [7, 5, 1, 2],
    [1, 4, 2, 1],
    [2, 3, 3, 2],
  ],
  [
    [0, 5, 5, 2],
    [6, 4, 1, 3],
    [7, 3, 1, 2],
    [1, 2, 2, 2],
  ],
  [
    [0, 4, 2, 2],
    [5, 3, 1, 3],
    [6, 2, 2, 4],
    [7, 1, 0, 3],
  ],
  [
    [0, 3, 4, 2],
    [4, 2, 1, 2],
    [5, 1, 2, 2],
    [6, 7, 3, 1],
  ],
  [
    [0, 2, -1, -1],
    [3, 1, -1, -1],
    [4, 7, -1, -1],
    [5, 6, -1, -1],
  ],
];
export const matches: Match[] = fixtures.flatMap((roundFixtures, roundIndex) =>
  roundFixtures.map((fixture, i) => {
    const [homeIndex = 0, awayIndex = 1, homeScore = 0, awayScore = 0] = fixture;
    const home = teams[homeIndex];
    const away = teams[awayIndex];
    if (!home || !away) throw new Error("Invalid demo fixture");
    const finished = roundIndex < 5;
    const id = `r${roundIndex + 1}-${i + 1}`;
    const events: MatchEvent[] = [];
    if (finished) {
      [
        { team: home, score: homeScore },
        { team: away, score: awayScore },
      ].forEach(({ team, score }, side) => {
        for (let goal = 0; goal < score; goal++) {
          const scorer = goal < 2 ? 1 : (goal % 3) + 1;
          events.push({
            id: `${id}-${side}-${goal}`,
            teamId: team.id,
            playerId: `${team.id}-${scorer}`,
            minute: 5 + goal * 9 + side * 4 + i,
            type: "goal",
            assistId: goal % 3 !== 2 ? `${team.id}-${scorer === 2 ? 3 : 2}` : undefined,
          });
        }
      });
      events.push({
        id: `${id}-card`,
        teamId: away.id,
        playerId: `${away.id}-4`,
        minute: 33,
        type: "yellow",
      });
    }
    return {
      id,
      round: roundIndex + 1,
      homeId: home.id,
      awayId: away.id,
      homeScore: finished ? homeScore : null,
      awayScore: finished ? awayScore : null,
      status: finished ? "finished" : "scheduled",
      date: `2026-11-${String(finished ? 1 + roundIndex * 2 : 13).padStart(2, "0")}T${i % 2 === 0 ? "19" : "20"}:${i < 2 ? "00" : "30"}:00-03:00`,
      venue: i % 2 === 0 ? "Arena Seven • Campo 1" : "Arena Seven • Campo 2",
      events: events.sort((a, b) => a.minute - b.minute),
    };
  }),
);

export const getTeam = (id: string) => teams.find((team) => team.id === id);
export const getPlayer = (id: string) => players.find((player) => player.id === id);
export const getMatch = (id: string) => matches.find((match) => match.id === id);
export function standings(source: Match[] = matches, rules = demoRules) {
  return teams
    .map((team) => {
      const played = source.filter(
        (match) =>
          match.status === "finished" && (match.homeId === team.id || match.awayId === team.id),
      );
      let wins = 0,
        draws = 0,
        losses = 0,
        scored = 0,
        conceded = 0;
      const form: string[] = [];
      for (const match of played) {
        const own = (match.homeId === team.id ? match.homeScore : match.awayScore) ?? 0;
        const opponent = (match.homeId === team.id ? match.awayScore : match.homeScore) ?? 0;
        scored += own;
        conceded += opponent;
        if (own > opponent) {
          wins++;
          form.push("V");
        } else if (own === opponent) {
          draws++;
          form.push("E");
        } else {
          losses++;
          form.push("D");
        }
      }
      return {
        team,
        played: played.length,
        wins,
        draws,
        losses,
        scored,
        conceded,
        difference: scored - conceded,
        points: wins * rules.win + draws * rules.draw + losses * rules.loss,
        form: form.slice(-5),
      };
    })
    .sort(
      (a, b) =>
        b.points - a.points ||
        b.wins - a.wins ||
        b.difference - a.difference ||
        b.scored - a.scored ||
        a.team.name.localeCompare(b.team.name),
    );
}
export function playerStats(playerId: string, source: Match[] = matches) {
  const player = getPlayer(playerId);
  const played = source.filter(
    (match) =>
      match.status === "finished" &&
      (match.homeId === player?.teamId || match.awayId === player?.teamId),
  );
  const events = played.flatMap((match) => match.events);
  const goals = events.filter(
    (event) => event.type === "goal" && event.playerId === playerId,
  ).length;
  const assists = events.filter(
    (event) => event.type === "goal" && event.assistId === playerId,
  ).length;
  // Demo lineups contain all seven registered players in each completed match.
  return {
    played: played.length,
    goals,
    assists,
    contributions: goals + assists,
    yellow: events.filter((event) => event.type === "yellow" && event.playerId === playerId).length,
    red: events.filter((event) => event.type === "red" && event.playerId === playerId).length,
  };
}
export type RankingMetric = "goals" | "assists" | "contributions";
export function rankings(metric: RankingMetric = "goals") {
  return players
    .map((player) => ({ player, ...playerStats(player.id) }))
    .sort((a, b) => b[metric] - a[metric] || a.player.name.localeCompare(b.player.name));
}
export const formatDate = (
  date: string,
  options: Intl.DateTimeFormatOptions = { day: "2-digit", month: "short" },
) =>
  new Intl.DateTimeFormat("pt-BR", { timeZone: "America/Sao_Paulo", ...options }).format(
    new Date(date),
  );
export const totalGoals = matches
  .filter((match) => match.status === "finished")
  .reduce((sum, match) => sum + (match.homeScore ?? 0) + (match.awayScore ?? 0), 0);
