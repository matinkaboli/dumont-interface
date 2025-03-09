import { Button, DialogDescription, DialogIcon, DialogTitle } from '@/components';
import { useTypedSelector } from '@/hooks/useTypedSelector';

const ConfirmNewRound = ({ onCreateGame }: { onCreateGame: () => void }) => {
  const { balance } = useTypedSelector((state) => state.account);

  return (
    <>
      <DialogIcon name="game-objects-rainbow" variant="default" />
      <DialogTitle className="text-center mt-5">Create game</DialogTitle>
      <DialogDescription className="text-neutral-300 text-base text-center mt-1">
        You need to pay <span className="font-semibold text-white">$1</span> to create the round.
      </DialogDescription>
      <div className="flex flex-col gap-4 mt-8">
        {balance && (
          <Button fullWidth size="md" radius="lg" onClick={onCreateGame} disabled={balance === '0'}>
            {balance === '0' ? 'Insufficient USDC balance' : 'Create'}
          </Button>
        )}

        <p className="text-neutral-400 text-xs text-center font-thin px-4">
          *Note: This fee covers your transaction costs and the casino&apos;s proof submission to the
          blockchain
        </p>
      </div>
    </>
  );
};

export default ConfirmNewRound;
