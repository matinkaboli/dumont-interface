import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useWaitForTransactionReceipt } from 'wagmi';
import { encodeFunctionData } from 'viem';
import { toast } from 'react-toastify';
import { useSmartWallets } from '@privy-io/react-auth/smart-wallets';

import { ToastContent, ToastWrapper } from '@/components';
import { closeDialog, openDialog } from '@/redux/features/dialogSlice';
import { AppDispatch } from '@/redux/store';
import GATEWAY_ABI from '@/abis/GATEWAY_ABI.json';
import { useTypedSelector } from '@/hooks/useTypedSelector';

import AnimatedDialogContent from '@/views/_components/AnimatedDialogContent';
import ErrorContent from '@/views/_components/Dialog/ErrorContent';
import LoadingContent from '@/views/_components/Dialog/LoadingContent';

import ClosePositionModal from './ClosePositionModal';

interface Props {
  id: number,
  size: number,
  fee: number,
  pnl: number,
  name: string,
}

const ClosePositionButton = ({ id, size, fee, pnl, name }: Props) => {
  const { client } = useSmartWallets();
  const dispatch = useDispatch<AppDispatch>();
  const { details } = useTypedSelector((state) => state.config);
  const { match } = useTypedSelector((state) => state.match.main);
  const matchId = match?.matchId || 0;
  const [closePositionTx, setClosePositionTx] = useState('');
  const [isClosePositionLoading, setIsClosePositionLoading] = useState<boolean>(false);

  const { isLoading: isWaitTXLoading } = useWaitForTransactionReceipt({
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

  const onConfirm = () => {
    dispatch(
      openDialog({
        dialogProps: { className: '!pt-6', closeButtonClassName: '!top-[23px]' },
        content: (
          <ClosePositionModal
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
    <button
      type='button'
      className='text-primary-400'
      aria-label={`Close position for ${name}`}
      onClick={() => onConfirm()}
    >
      Close
    </button>
  );
};

export default ClosePositionButton;
