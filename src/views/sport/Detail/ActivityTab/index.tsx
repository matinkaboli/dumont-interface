'use client';

import { ReactNode, useMemo } from 'react';
import { usePrivy } from '@privy-io/react-auth';

import { Loading, Tabs, TabsContent, TabsList, TabsTrigger } from '@/components';
import useAxiosGet from '@/hooks/useAxiosGet';
import { Match, Position, Team } from '@/types/match';
import { useTypedSelector } from '@/hooks/useTypedSelector';

import { calculatePNL } from '@/views/sport/Detail/helpers';

import ClosedPositions from './ClosedPositions';
import OpenPositions from './OpenPositions';

export interface FormattedPosition {
  id: number;
  name: string;
  logo: string;
  size: number;
  entry?: number;
  liquid: number;
  exit: number | null;
  fee: number;
  pnl: number;
  isLiquidated: boolean;
  multiplier: number;
}

const TabPanel = ({
  isLoading,
  error,
  isConnected,
  children,
}: {
  isLoading: boolean;
  error?: unknown;
  isConnected: boolean;
  children: ReactNode;
}) => {
  if (isLoading) {
    return (
      <div className="flex-center mt-14 mb-10">
        <Loading size={32} />
      </div>
    );
  } else if (!isConnected) {
    return (
      <div className="flex-center mt-14 mb-10 text-white">Login to see your positions here</div>
    );
  } else if (error) {
    return <div className="flex-center mt-14 mb-10 text-white">Something went wrong</div>;
  } else return <>{children}</>;
};

const formatPositions = (positions: Position[], match: Match | null): FormattedPosition[] => {
  if (!positions?.length) return [];

  return positions.map((position: Position) => {
    const {
      positionId,
      placedAtOdds,
      liquidationThreshold,
      closeRequestedAtOdds,
      isLiquidated,
      outcome,
      decayedAmount,
    } = position;

    const outcomeKey = outcome.toLowerCase() as keyof typeof placedAtOdds;
    const teamKey = `${outcome.toLowerCase()}Team` as keyof typeof match;
    const team = match ? (match[teamKey] as Team) : null;

    const liquidationPriceText = (liquidationThreshold || 0) / 100;
    const entryPriceText = placedAtOdds ? ((placedAtOdds[outcomeKey] as number) || 0) / 100 : 0;
    const exitPriceText = closeRequestedAtOdds
      ? ((closeRequestedAtOdds[outcomeKey] as number) || 0) / 100
      : null;

    const dynamicSize = (position.positionValue || 0) / 1e6;

    return {
      id: positionId,
      name: outcome === 'Draw' ? 'Draw' : team!.name,
      logo: outcome === 'Draw' ? '/images/draw.png' : team!.logo,
      pnl: calculatePNL(position),
      isLiquidated,
      multiplier: position.multiplier / 1e3,
      fee: decayedAmount ? Math.floor(position.decayedAmount) / 1e6 : 0,
      liquid: liquidationPriceText,
      entry: entryPriceText,
      size: dynamicSize,
      exit: exitPriceText,
    };
  });
};

const ActivityTab = ({ className = '', matchId }: { className?: string; matchId: string }) => {
  const { address } = useTypedSelector((state) => state.account.profile);
  const { authenticated } = usePrivy();

  const {
    data: positions,
    loading,
    error,
  } = useAxiosGet<Position[]>(`/matches/${matchId}/positions/${address}`, {
    enabled: authenticated && !!address,
    interval: 2000,
  });

  const { match } = useTypedSelector((state) => state.match.main);

  const { openPositions, closedPositions } = useMemo(() => {
    if (!positions) {
      return { openPositions: [], closedPositions: [] };
    }

    const openRaw = positions.filter(
      (position) => position.status === 'Open' || position.status === 'Pending',
    );
    const closedRaw = positions.filter(
      (position) => position.status !== 'Open' && position.status !== 'Pending',
    );

    return {
      openPositions: formatPositions(openRaw, match),
      closedPositions: formatPositions(closedRaw, match),
    };
  }, [positions, match]);

  return (
    <Tabs defaultValue="open" className={className} onChange={(e) => e.preventDefault()}>
      <TabsList className="sm:w-fit w-full">
        <TabsTrigger value="open" className="sm:!min-w-[160px] sm:w-auto w-1/2">
          Open Positions
        </TabsTrigger>
        <TabsTrigger value="closed" className="sm:w-auto w-1/2">
          Closed Positions
        </TabsTrigger>
      </TabsList>
      <TabsContent value="open" className="mb-32">
        <TabPanel isLoading={loading} isConnected={authenticated} error={error}>
          <OpenPositions positions={openPositions} />
        </TabPanel>
      </TabsContent>
      <TabsContent value="closed" className="mb-32">
        <TabPanel isLoading={loading} isConnected={authenticated} error={error}>
          <ClosedPositions positions={closedPositions} />
        </TabPanel>
      </TabsContent>
    </Tabs>
  );
};

export default ActivityTab;
