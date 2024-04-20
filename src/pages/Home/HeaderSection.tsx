import PlayButton from '@/pages/_components/PlayButton';

const HeaderSection = () => {
  return (
    <div className='grid md:grid-cols-2 grid-cols-1 items-center gap-14 md:pt-28 pt-12 md:pb-40 pb-6'>
      <div>
        <h1 className='title tracking-tight'>
          A
          <span className='bg-gradiant-header-text text-transparent bg-clip-text'> Provably Fair </span>
          <br className='md:block hidden' />
          Gambling System
        </h1>
        <p className='description-text mt-4'>
          Dumont is a blockchain-based card game that guarantees immutable outcomes and permissionless payout for
          players.
        </p>
        <PlayButton className='mt-12' />
      </div>
      <div>
        <div className='max-w-[455px] w-full h-[455px] bg-primary-800 md:ml-auto ml-0 rounded-lg' />
      </div>
    </div>
  );
};

export default HeaderSection;
