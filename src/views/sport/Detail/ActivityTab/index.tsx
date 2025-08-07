'use client';

import { useMemo } from 'react';

import { Loading, Tabs, TabsContent, TabsList, TabsTrigger } from '@/components';
import useAxiosGet from '@/hooks/useAxiosGet';
import { Match, Position, Team } from '@/types/match';
import { useTypedSelector } from '@/hooks/useTypedSelector';

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
  fee: string;
  pnl: number;
  isLiquidated: boolean;
  multiplier: number;
}

const LoadingState = () => (
  <div className='flex-center mt-14 mb-10'>
    <Loading size={32} />
  </div>
);

const formatPositions = (positions: Position[], match: Match | null): FormattedPosition[] => {
  if (!positions?.length) return [];

  return positions.map((position: Position) => {
    const {
      positionId,
      placedAtOdds,
      liquidationThreshold,
      closeRequestedAtOdds,
      isLiquidated,
      multiplier,
      outcome,
      decayedAmount,
    } = position;
    const outcomeKey = outcome.toLowerCase() as keyof typeof placedAtOdds;
    const teamKey = `${outcome.toLowerCase()}Team` as keyof typeof match;
    const team = match ? match[teamKey] as Team : null;

    return {
      id: positionId,
      name: team?.name ?? 'Team',
      logo: team?.logo ?? '',
      pnl: 0,
      isLiquidated,
      multiplier,
      liquid: liquidationThreshold,
      entry: placedAtOdds[outcomeKey] as number,
      fee: decayedAmount ? (Math.floor(position.decayedAmount) / 1e7).toFixed(2) : '0',
      size: (Number(position.amount) / 1e7) * (position.multiplier / 1e3),
      exit: closeRequestedAtOdds ? closeRequestedAtOdds[teamKey] : null,
    };
  });
};

const ActivityTab = ({ className = '', matchId }: { className?: string, matchId: string }) => {
  const { address, isConnecting } = useTypedSelector(state => state.account.profile);
  const { data: positions, loading, error } = useAxiosGet<Position[]>(
    address ? `/matches/${matchId}/positions/${address}` : '',
  );
  const { match } = useTypedSelector((state) => state.match.main);
  const isLoading = loading || isConnecting;

  const { openPositions, closedPositions } = useMemo(() => {
    if (!positions) {
      return { openPositions: [], closedPositions: [] };
    }

    const openRaw = positions.filter((position) => position.status === 'Open');
    const closedRaw = positions.filter((position) => position.status !== 'Open' && position.status !== 'Pending');

    return {
      openPositions: formatPositions(openRaw, match),
      closedPositions: formatPositions(closedRaw, match),
    };
  }, [positions, match]);

  if (error) return null;

  return (
    <Tabs defaultValue='open' className={className} onChange={(e) => e.preventDefault()}>
      <TabsList className='sm:w-fit w-full'>
        <TabsTrigger value='open' className='sm:!min-w-[160px] sm:w-auto w-1/2'>
          Open Positions
        </TabsTrigger>
        <TabsTrigger value='closed' className='sm:w-auto w-1/2'>Closed Positions</TabsTrigger>
      </TabsList>
      <TabsContent value='open' className='mb-32'>
        {isLoading ? <LoadingState /> : <OpenPositions positions={openPositions} />}
      </TabsContent>
      <TabsContent value='closed' className='mb-32'>
        {isLoading ? <LoadingState /> : <ClosedPositions positions={closedPositions} />}
      </TabsContent>
    </Tabs>
  );
};

export default ActivityTab;
