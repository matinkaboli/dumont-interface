import Image from 'next/image';
import clsx from 'clsx';

interface Props {
  imgSrc?: string;
  width: number;
  className?: string;
}

const Card = ({ imgSrc = '/images/demo-card.png', width, className }: Props) => {
  return (
    <div>
      <Image
        src={imgSrc}
        width={width}
        height={0}
        style={{ width: `${width}px` }}
        className={clsx('h-auto', className)}
        alt=""
      />
    </div>
  );
};

export default Card;
