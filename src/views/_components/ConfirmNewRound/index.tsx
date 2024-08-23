import { Button, DialogDescription, DialogIcon, DialogTitle, Icon } from '@/components';

const ConfirmNewRound = ({ onCreateGame }: { onCreateGame: () => void }) => {
  return (
    <>
      <DialogIcon name="game-objects-rainbow" variant="default" />
      <DialogTitle className="text-center mt-5">Confirm round</DialogTitle>
      <DialogDescription className="text-neutral-300 text-base text-center mt-1">
        You need to pay <span className="font-bold">$1</span> to create the round.
      </DialogDescription>
      <div className="flex flex-col gap-4 mt-8">
        <Button fullWidth size="md" radius="lg" onClick={onCreateGame}>
          Create
        </Button>
        <Button
          variant="link"
          size="md"
          className="w-fit mx-auto text-neutral-400 hover:text-neutral-300 [&_.path]:hover:fill-neutral-300 font-semibold text-base"
          rightSection={<Icon name="arrow-up-right" />}
        >
          Why should pay
        </Button>
      </div>
    </>
  );
};

export default ConfirmNewRound;
