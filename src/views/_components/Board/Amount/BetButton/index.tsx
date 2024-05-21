import './style.css';

import { useDispatch } from 'react-redux';
import { ConnectKitButton } from 'connectkit';

import { Button, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components';
import { ButtonProps } from '@/components/Button';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { openDialog } from '@/redux/features/dialogSlice';

import ConfirmBet from '../ConfirmBet';

const BetButton = ({ size, disabled }: ButtonProps) => {
  const dispatch = useDispatch();
  const isConfirmed = useTypedSelector((state) => state.createRound.isConfirmed);

  const buttonProps: ButtonProps = {
    fullWidth: true,
    variant: 'link',
    radius: 'lg',
    size: size,
  };

  const onOpenModal = () => {
    dispatch(
      openDialog({
        content: <ConfirmBet />,
      }),
    );
  };

  return (
    <ConnectKitButton.Custom>
      {({ isConnected, show }) => {
        return (
          <div className="relative w-full h-12">
            {isConnected ? (
              <>
                {isConfirmed ? (
                  <>
                    <div className="btn-glow" />
                    <Button
                      {...buttonProps}
                      type="submit"
                      disabled={disabled}
                      className={disabled ? '' : 'btn-gradiant'}
                      onClick={onOpenModal}
                    >
                      Bet
                    </Button>
                  </>
                ) : (
                  <TooltipProvider delayDuration={100}>
                    <Tooltip>
                      <TooltipTrigger className="w-full">
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
