import { Button, DialogTitle, Icon } from '@/components';

const ClaimWin = ({ onClaim }: { onClaim: () => void }) => {
  return (
    <>
      <div className="w-14 h-14 rounded-full bg-neutral-600 flex-center mx-auto">
        <Icon name="hand-holding-coin-rainbow" />
      </div>
      <DialogTitle className="mt-5 mb-2 text-center">Claim your win!</DialogTitle>
      <p className="text-base text-neutral-300 text-center">
        You are entitled to a win due to an operator verification issue. You can claim your win now!
      </p>

      <Button fullWidth variant="primary" radius="lg" className="mt-6" onClick={onClaim}>
        Claim
      </Button>
    </>
  );
};

export default ClaimWin;
