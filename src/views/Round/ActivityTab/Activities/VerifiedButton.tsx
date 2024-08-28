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
    <div className="group text-primary-100 hover:text-primary-250">
      <a href={explorerUrl} target="_blank" className="flex items-center justify-start">
        <span>Verified</span>
        <ArrowUpRight
          width="8"
          height="8"
          className="ml-1 fill-current text-primary-100 group-hover:text-primary-250"
        />
      </a>
    </div>
  );
};

export default VerifiedButton;
