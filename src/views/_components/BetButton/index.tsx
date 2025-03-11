import { usePrivy } from '@privy-io/react-auth';
import { ButtonProps } from '@/components/Button';
import { Button, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components';

import './style.css';

const disabledClass = 'bg-neutral-700 text-neutral-400 border-neutral-700';

interface Props extends ButtonProps {
  disabledButtonLabel: string;
  label?: string;
  tooltipContent?: string;
  showTooltip?: boolean;
}

const BetButton = ({
  type,
  size,
  disabled,
  onClick,
  label = 'Bet',
  showTooltip = false,
  tooltipContent = '',
  disabledButtonLabel,
}: Props) => {
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
          {showTooltip ? (
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
                <TooltipContent>{tooltipContent}</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : (
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
