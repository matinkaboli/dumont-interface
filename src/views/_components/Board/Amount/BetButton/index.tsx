import './style.css';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ConnectKitButton } from 'connectkit';
import { useContractWrite, useWaitForTransaction } from 'wagmi';

import { Button, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components';
import { ButtonProps } from '@/components/Button';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { openDialog } from '@/redux/features/dialogSlice';
import { postGuessedCard } from '@/redux/features/betSlice';
import { AppDispatch } from '@/redux/store';
import GAME_ABI from '@/abis/GAME_ABI.json';
import transformedRanks from '@/helpers/transformedRanks';
import guessArrayToNumber from '@/helpers/guessArrayToNumber';

import AnimatedDialogContent from '@/views/_components/AnimatedDialogContent';
import LoadingContent from '@/views/_components/Dialog/LoadingContent';
import ResultMessage from '@/views/_components/Board/Amount/ConfirmBet/ConfirmProcess/ResultMessage';

import ConfirmBet from '../ConfirmBet';

const BetButton = ({ size, disabled }: ButtonProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { isCreated, data: game, activeCardIndex } = useTypedSelector((state) => state.game);
  const { betData } = useTypedSelector((state) => state.bet);
  const { details } = useTypedSelector((state) => state.config);

  const buttonProps: ButtonProps = {
    fullWidth: true,
    variant: 'link',
    radius: 'lg',
    size: size,
  };

  const {
    write: writeGuessCard,
    data: guessCardData,
    isLoading: isGuessCardLoading,
  } = useContractWrite({
    address: game?.address as any,
    abi: GAME_ABI,
    functionName: 'guessCard',
    onError: onError,
  });

  useWaitForTransaction({
    chainId: details?.networkId,
    hash: guessCardData?.hash,
    onSuccess: onGuessCardSuccess,
    onError: onError,
  });

  useEffect(() => {
    if (isGuessCardLoading) {
      dispatch(
        openDialog({
          dialogProps: { showCloseButton: false, disableEvents: true },
          content: (
            <AnimatedDialogContent key="loading">
              <LoadingContent title="Waiting for the network" desc="This may take a few seconds" />
            </AnimatedDialogContent>
          ),
        }),
      );
    }
  }, [isGuessCardLoading]);

  function onGuessCardSuccess() {
    dispatch(
      postGuessedCard({
        id: game!.id,
        body: { cardIndex: activeCardIndex - 1 },
      }),
    )
      .unwrap()
      .then(() => {
        dispatch(
          openDialog({
            content: (
              <AnimatedDialogContent key="result">
                <ResultMessage />
              </AnimatedDialogContent>
            ),
          }),
        );
      })
      .catch(() => {
        onError();
      });
  }

  function onError() {
    dispatch(
      openDialog({
        content: <AnimatedDialogContent key="error">Something went wrong!</AnimatedDialogContent>,
      }),
    );
  }

  const onConfirmBet = () => {
    const keys = transformedRanks(betData.keys);
    console.log('keys', keys);
    const guessNumber = guessArrayToNumber(keys);
    console.log('guess', guessNumber);

    writeGuessCard?.({ args: [activeCardIndex - 1, +betData.amount * 1000000, guessNumber] });
  };

  const onBet = () => {
    dispatch(
      openDialog({
        content: <ConfirmBet onConfirm={onConfirmBet} />,
      }),
    );
  };

  // <AnimatedDialogContent key="verification">
  //    <VerificationOperation />
  //  </AnimatedDialogContent>

  return (
    <ConnectKitButton.Custom>
      {({ isConnected, show }) => {
        return (
          <div className="relative w-full h-12">
            {isConnected ? (
              <>
                {isCreated || game?.id ? (
                  <>
                    <div className="btn-glow" />
                    <Button
                      {...buttonProps}
                      type="submit"
                      disabled={disabled}
                      className={disabled ? '' : 'btn-gradiant'}
                      onClick={onBet}
                    >
                      Bet
                    </Button>
                  </>
                ) : (
                  <TooltipProvider delayDuration={100}>
                    <Tooltip>
                      <TooltipTrigger className="w-full" asChild>
                        <Button
                          {...buttonProps}
                          disabled={disabled}
                          className={disabled ? '' : 'btn-gradiant'}
                        >
                          Bet
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>No game created yet.</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </>
            ) : (
              <>
                <div className="btn-glow" />
                <Button {...buttonProps} className="btn-gradiant" onClick={show}>
                  Connect Wallet
                </Button>
              </>
            )}
          </div>
        );
      }}
    </ConnectKitButton.Custom>
  );
};

export default BetButton;
