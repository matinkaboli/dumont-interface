import Image from 'next/image';

interface Props {
  imgSrc?: string;
  width: number;
  height: number;
  className?: string;
}

const DemoCard = ({ imgSrc = '/images/demo-card.png', width, height, className }: Props) => {
  return (
    <div>
      <Image
        priority
        src={imgSrc}
        width={0}
        height={0}
        sizes="100vw"
        className={className}
        style={{ width: `${width}px`, height: `${height}px` }}
        alt=""
      />
    </div>
  );
};

export default DemoCard;
