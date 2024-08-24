import links from '@/constants/links';
import ArrowUpRight from '@/components/Icon/svgs/ArrowUpRight';

type VerifiedButtonProps = {
  revelationHash?: string;
};

const VerifiedButton = ({ revelationHash }: VerifiedButtonProps) => {
  if (!revelationHash) {
    return <div>Verified</div>;
  }

  const explorerUrl = `${links.EXPLORER}/tx/${revelationHash}`;

  return (
    <div className="text-primary-100">
      <a href={explorerUrl} target="_blank" className="flex items-center justify-start">
        <span>Verified</span>
        <ArrowUpRight color="#DAA7FE" width="8" height="8" className="ml-1" />
      </a>
    </div>
  );
};

export default VerifiedButton;
