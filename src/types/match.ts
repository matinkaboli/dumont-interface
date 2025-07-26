export interface Match {
  _id: string;
  league: League;
  homeTeam: Team;
  awayTeam: Team;
  start: number;
  eventId: string;
  matchId: number;
  contractAddress: string;
  matchName: string;
  isEnded: boolean;
  isPrematch: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  latestOdds: Odds;
}

export interface League {
  _id: string;
  name: string;
  logo: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Team {
  _id: string;
  name: string;
  logo: string;
  shortName: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Odds {
  _id: string;
  home: number;
  away: number;
  draw: number;
  date: number;
  match: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
