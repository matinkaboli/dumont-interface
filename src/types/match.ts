export interface Match {
  _id: string;
  league: League;
  homeTeam: Team;
  awayTeam: Team;
  start: number;
  startTime: Date;
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
  score: string;
  timer: string;
  isBettingClosed: boolean;
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

export interface Position {
  _id: string;
  positionId: number;
  player: string;
  match: string;
  amount: string;
  finalPayout: string;
  multiplier: number;
  outcome: string;
  status: 'Pending' | 'PendingClose' | 'Open' | 'Closed' | 'Finished';
  isLiquidated: boolean;
  liquidationThreshold: number;
  placedAt: number;
  closeRequestedAt: number;
  createdAt: string;
  updatedAt: string;
  liquidatedAt: string;
  liquidatedAtOdds: Odds;
  placedAtOdds: Odds;
  decayedAmount: number;
  remainingValue?: number;
  closeRequestedAtOdds?: Odds;
  __v: number;
}
