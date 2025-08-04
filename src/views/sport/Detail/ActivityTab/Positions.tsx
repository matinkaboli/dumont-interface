import Image from 'next/image';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { encodeFunctionData } from 'viem';
import { useEffect, useState } from 'react';
import { useWaitForTransactionReceipt } from 'wagmi';
import { useSmartWallets } from '@privy-io/react-auth/smart-wallets';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  ToastContent,
  ToastWrapper,
} from '@/components';
import { closeDialog, openDialog } from '@/redux/features/dialogSlice';
import { AppDispatch } from '@/redux/store';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import GATEWAY_ABI from '@/abis/GATEWAY_ABI.json';

import AnimatedDialogContent from '@/views/_components/AnimatedDialogContent';
import ErrorContent from '@/views/_components/Dialog/ErrorContent';
import ClosePosition from '@/views/sport/Detail/ActivityTab/ClosePosition';
import LoadingContent from '@/views/_components/Dialog/LoadingContent';

const positions = [
  {
    id: '1',
    team: 'Real Madrid',
    logo: '/images/teams/real-madrid.svg',
    size: '$3,000',
    entryPrice: '0.6',
    liquidationPrice: '0.5',
    chargedFee: '$400',
    pnl: -500,
    leverage: '10x',
  },
  {
    id: '2',
    team: 'Barcelona',
    logo: '/images/teams/barcelona.svg',
    size: '$2,000',
    entryPrice: '0.4',
    liquidationPrice: '0.5',
    chargedFee: '$300',
    pnl: 500,
    leverage: '5x',
  },
  {
    id: '3',
    team: 'Porto',
    logo: '/images/teams/porto.svg',
    size: '$1,500',
    entryPrice: '0.2',
    liquidationPrice: '0.3',
    chargedFee: '$600',
    pnl: -500,
    leverage: '8x',
  },
];

const Positions = () => {
  const { client } = useSmartWallets();
  const dispatch = useDispatch<AppDispatch>();
  const { details } = useTypedSelector((state) => state.config);
  const [closePositionTx, setClosePositionTx] = useState('');
  const [isClosePositionLoading, setIsClosePositionLoading] = useState<boolean>(false);

  const { isLoading: isWaitTXLoading, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash: closePositionTx as `0x${string}`,
  });

  useEffect(() => {
    if (isWaitTXLoading || isClosePositionLoading) {
      dispatch(
        openDialog({
          dialogProps: { showCloseButton: false, disableEvents: true },
          content: (
            <AnimatedDialogContent key='loading'>
              <LoadingContent title='Waiting for the network' desc='It will take a few seconds' />
            </AnimatedDialogContent>
          ),
        }),
      );
    }
  }, [isWaitTXLoading, isClosePositionLoading]);

  useEffect(() => {
    if (isConfirmed) {
      dispatch(closeDialog());
      toast(
        <ToastWrapper>
          <ToastContent
            variant='neutral'
            title='Position closed.'
            description='Your profit/loss has been settled.'
          />
        </ToastWrapper>,
        { position: 'bottom-right', toastId: 'closed' },
      );
    }
  }, [isConfirmed]);

  const onConfirm = (
    { id, size, fee, pnl }:
    { id: string; size: string, fee: string, pnl: number },
  ) => {
    dispatch(
      openDialog({
        dialogProps: { className: '!pt-6', closeButtonClassName: '!top-[23px]' },
        content: (
          <ClosePosition
            positionSize={size}
            fee={fee}
            pnl={pnl}
            onClosePosition={() => onClosePosition(+id)}
          />),
      }));
  };

  const onClosePosition = async (matchId: number) => {
    if (!client) return;

    try {
      setIsClosePositionLoading(true);

      const tx = await client.sendTransaction({
        account: client.account,
        calls: [
          {
            to: details!.gateway,
            data: encodeFunctionData({
              abi: GATEWAY_ABI,
              functionName: 'closePosition',
              args: [matchId],
            }),
          },
        ],
      });
      setClosePositionTx(tx);
    } catch (error) {
      dispatch(
        openDialog({
          content: (
            <AnimatedDialogContent key='error'>
              <ErrorContent title='Something went wrong!' />
            </AnimatedDialogContent>
          ),
        }),
      );
    } finally {
      setIsClosePositionLoading(false);
    }
  };

  return (
    <Table className='text-white'>
      <TableHeader>
        <TableRow className='uppercase text-neutral-400 text-xs font-medium'>
          <TableHead>Team</TableHead>
          <TableHead>Position Size</TableHead>
          <TableHead>Entry Odds</TableHead>
          <TableHead>Liquidation Threshold</TableHead>
          <TableHead>Charged Fee</TableHead>
          <TableHead>PNL</TableHead>
          <TableHead />
        </TableRow>
      </TableHeader>
      <TableBody>
        {positions.map(
          ({ id, team, logo, size, entryPrice, liquidationPrice, chargedFee, pnl, leverage }) => (
            <TableRow key={id}>
              <TableCell className='flex items-center gap-2 pr-6'>
                <Image
                  width={24}
                  height={24}
                  className='h-6 w-6 rounded-full'
                  src={logo}
                  alt={team}
                />
                <span className='text-neutral-300 font-medium text-sm'>{team}</span>
                <span className='bg-neutral-750 rounded-full px-2 py-0.5 text-xs text-white font-medium'>
                  {leverage}
                </span>
              </TableCell>
              <TableCell className='text-neutral-300'>{size}</TableCell>
              <TableCell className='text-neutral-300'>{entryPrice}</TableCell>
              <TableCell className='text-neutral-300'>{liquidationPrice}</TableCell>
              <TableCell className='text-neutral-300'>{chargedFee}</TableCell>
              <TableCell className={pnl > 0 ? 'text-success-600' : 'text-error-500'}>
                {pnl > 0 ? `+${pnl}` : pnl}
              </TableCell>
              <TableCell>
                <button
                  type='button'
                  className='text-primary-400'
                  aria-label={`Close position for ${team}`}
                  onClick={() => onConfirm({ id, size, fee: liquidationPrice, pnl })}
                >
                  Close
                </button>
              </TableCell>
            </TableRow>
          ),
        )}
      </TableBody>
    </Table>
  );
};

export default Positions;
