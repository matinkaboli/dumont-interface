import Image from 'next/image';

interface Props {
  title: string;
  desc: string;
  imgSrc: string;
}

const ProveCard = ({ title, desc, imgSrc }: Props) => {
  return (
    <div className='bg-gradiant-blur shadow-xl rounded-xl backdrop-blur-xl w-full md:px-8 px-4 md:py-10 py-8'>
      <Image width={170} height={170} sizes="100vw" src={imgSrc} className='mx-auto' alt='dumont' />
      <h6 className='md:mt-12 mt-8 text-white text-xl font-bold'>{title}</h6>
      <p className='mt-4 text-base text-neutral-300'>{desc}</p>
    </div>
  );
};

export default ProveCard;
