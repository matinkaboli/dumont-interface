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
import isEmpty from '@/helpers/isEmpty';

import AnimatedDialogContent from '@/views/_components/AnimatedDialogContent';
import ErrorContent from '@/views/_components/Dialog/ErrorContent';
import LoadingContent from '@/views/_components/Dialog/LoadingContent';
import { FormattedPosition } from '@/views/sport/Detail/ActivityTab';
import EmptyDataMessage from '@/views/card/Game/ActivityTab/EmptyDataMessage';

import ClosePosition from './ClosePosition';

const OpenPositions = ({ positions }: { positions: FormattedPosition[] }) => {
  const { client } = useSmartWallets();
  const dispatch = useDispatch<AppDispatch>();
  const match = useTypedSelector((state) => state.match);
  const [closePositionTx, setClosePositionTx] = useState('');
  const { details } = useTypedSelector((state) => state.config);
  const [isClosePositionLoading, setIsClosePositionLoading] = useState<boolean>(false);

  const { isLoading: isWaitTXLoading, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash: closePositionTx as `0x${string}`,
  });

  const matchId = match.main.match?.matchId || 0;

  useEffect(() => {
    if (isWaitTXLoading || isClosePositionLoading) {
      dispatch(
        openDialog({
          dialogProps: { showCloseButton: false, disableEvents: true },
          content: (
            <AnimatedDialogContent key="loading">
              <LoadingContent title="Waiting for the network" desc="It will take a few seconds" />
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
            variant="neutral"
            title="Position closed."
            description="Your profit/loss has been settled."
          />
        </ToastWrapper>,
        { position: 'bottom-right', toastId: 'closed' },
      );
    }
  }, [isConfirmed]);

  const onConfirm = ({
    id,
    size,
    fee,
    pnl,
  }: {
    id: number;
    size: number;
    fee: number;
    pnl: number;
  }) => {
    dispatch(
      openDialog({
        dialogProps: { className: '!pt-6', closeButtonClassName: '!top-[23px]' },
        content: (
          <ClosePosition
            positionSize={size}
            fee={fee}
            pnl={pnl}
            onClosePosition={() => onClosePosition(matchId, id)}
          />
        ),
      }),
    );
  };

  const onClosePosition = async (matchId: number, positionId: number) => {
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
              args: [matchId, positionId],
            }),
          },
        ],
      });
      setClosePositionTx(tx);
    } catch (error) {
      dispatch(
        openDialog({
          content: (
            <AnimatedDialogContent key="error">
              <ErrorContent title="Something went wrong!" />
            </AnimatedDialogContent>
          ),
        }),
      );
    } finally {
      setIsClosePositionLoading(false);
    }
  };

  if (isEmpty(positions)) return <EmptyDataMessage message="No open position yet" />;

  return (
    <Table className="text-white">
      <TableHeader>
        <TableRow className="uppercase text-neutral-400 text-xs font-medium">
          <TableHead>Outcome</TableHead>
          <TableHead>Size</TableHead>
          <TableHead>Entry%</TableHead>
          <TableHead>Liquid%</TableHead>
          <TableHead>Fee</TableHead>
          <TableHead>PNL</TableHead>
          <TableHead />
        </TableRow>
      </TableHeader>
      <TableBody>
        {positions?.map(({ id, name, logo, size, entry, multiplier, fee, pnl, liquid }) => (
          <TableRow key={id}>
            <TableCell className="flex items-center gap-2 pr-6">
              <Image
                width={24}
                height={24}
                className="h-6 w-6 rounded-full"
                src={logo ?? '/images/draw.png'}
                alt={name ?? ''}
              />
              <span className="text-neutral-300 font-medium text-sm">{name}</span>
              <span className="bg-neutral-750 rounded-full px-2 py-0.5 text-xs text-white font-medium">
                {multiplier}
              </span>
            </TableCell>
            <TableCell className="text-neutral-300">${size.toFixed(2)}</TableCell>
            <TableCell className="text-neutral-300">{entry?.toFixed(2)}%</TableCell>
            <TableCell className="text-neutral-300">${liquid.toFixed(2)}</TableCell>
            <TableCell className="text-neutral-300">${fee.toFixed(2)}</TableCell>
            <TableCell className={pnl > 0 ? 'text-success-600' : 'text-error-500'}>
              {pnl > 0 ? `+$${pnl.toFixed(2)}` : `$${pnl.toFixed(2)}`}
            </TableCell>
            <TableCell>
              <button
                type="button"
                className="text-primary-400"
                aria-label={`Close position for ${name}`}
                onClick={() => onConfirm({ id, size, fee, pnl })}
              >
                Close
              </button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default OpenPositions;
