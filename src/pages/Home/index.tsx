import { Container, Layout } from '@/components';

import PlayButton from '@/pages/_components/PlayButton';

const Home = () => {
  return (
    <Layout>
      <Container className='md:pt-28 pt-12 pb-10'>
        <div className='grid md:grid-cols-2 grid-cols-1 items-center gap-14'>
          <div>
            <h1 className='font-bold md:text-5xl text-4xl text-white tracking-tight'>
              A
              <span className='bg-gradiant-text text-transparent bg-clip-text'> Provably Fair </span>
              <br className='md:block hidden' />
              Gambling System
            </h1>
            <p className='md:text-md text-base text-neutral-300 mt-4'>
              Dumont is a blockchain-based card game that guarantees immutable outcomes and permissionless payout for
              players.
            </p>
            <PlayButton className='mt-12' />
          </div>
          <div>
            <div className='max-w-[455px] w-full h-[455px] bg-primary-800 md:ml-auto ml-0 rounded-lg' />
          </div>
        </div>
      </Container>
    </Layout>
  );
};

export default Home;
