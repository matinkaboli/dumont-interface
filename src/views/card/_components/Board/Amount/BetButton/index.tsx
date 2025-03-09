import { usePrivy } from '@privy-io/react-auth';

import isEmpty from '@/helpers/isEmpty';
import { ButtonProps } from '@/components/Button';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { Button, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components';

import './style.css';

const disabledClass = 'bg-neutral-700 text-neutral-400 border-neutral-700';

interface Props extends ButtonProps {
  disabledButtonLabel: string;
  label?: string;
}

const BetButton = ({
  size,
  disabled,
  disabledButtonLabel,
  label = 'Bet',
  type,
  onClick,
}: Props) => {
  const { isCreated, data: game } = useTypedSelector((state) => state.game);
  const { login, authenticated, ready } = usePrivy();

  const buttonProps: ButtonProps = {
    fullWidth: true,
    variant: 'link',
    radius: 'lg',
    size: size,
    type: type,
    onClick: onClick,
  };

  return (
    <div className="relative w-full h-12">
      {ready && authenticated ? (
        <>
          {isCreated || !isEmpty(game) ? (
            <>
              <div className="btn-glow" />
              <Button
                {...buttonProps}
                disabled={disabled}
                className={disabled ? disabledClass : 'btn-gradiant'}
              >
                {disabled ? disabledButtonLabel : label}
              </Button>
            </>
          ) : (
            <TooltipProvider delayDuration={100}>
              <Tooltip>
                <TooltipTrigger className="w-full" asChild>
                  <Button
                    {...buttonProps}
                    disabled={disabled}
                    className={disabled ? disabledClass : 'btn-gradiant'}
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
          <Button
            {...buttonProps}
            type="button"
            className={ready ? 'btn-gradiant' : disabledClass}
            disabled={!ready}
            onClick={login}
          >
            Connect Wallet
          </Button>
        </>
      )}
    </div>
  );
};

export default BetButton;
