import { Button, Icon } from '@/components';
import humanizeAmount from '@/helpers/humanizeAmount';

interface Props {
  claimValue: string;
  onClaim: () => void;
}

const ClaimReward = ({ claimValue, onClaim }: Props) => {
  return (
    <div className="text-center">
      <h6 className="text-md text-white">Reward to claim</h6>
      <h2 className="font-bold text-4xl text-white mt-2">
        <span className="bg-gradiant-text text-transparent bg-clip-text">
          {humanizeAmount(claimValue)}
        </span>{' '}
        MONT
      </h2>

      <Button fullWidth className="mt-8" variant="primary" radius="lg" onClick={onClaim}>
        Claim Reward
      </Button>
      <Button
        fullWidth
        variant="link"
        radius="lg"
        className="text-neutral-400 font-semibold text-base mt-4 !px-0 hover:bg-neutral-600"
        rightSection={<Icon name="arrow-up-right" />}
      >
        How i get reward
      </Button>
    </div>
  );
};

export default ClaimReward;
