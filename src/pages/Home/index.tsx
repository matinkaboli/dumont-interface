import { Container, Icon, Layout } from '@/components';

import PlayButton from '@/pages/_components/PlayButton';
import ProveCard from '@/pages/Home/ProveCard';

const Home = () => {
  return (
    <Layout>
      <Container>
        <div className='grid md:grid-cols-2 grid-cols-1 items-center gap-14 md:pt-28 pt-12 md:pb-40 pb-6'>
          <div>
            <h1 className='font-bold md:text-5xl text-4xl text-white tracking-tight'>
              A
              <span className='bg-gradiant-header-text text-transparent bg-clip-text'> Provably Fair </span>
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

        <div className='pt-20 md:pb-40 pb-24'>
          <div className='flex flex-col items-center gap-4 text-center'>
            <div
              className='border border-neutral-600 rounded-full px-2 h-6 flex items-center mx-auto gap-1.5 font-medium text-xs bg-gradiant-label-text text-transparent bg-clip-text'>
              <Icon name='globe' />Powered by blockchain
            </div>
            <h2 className='font-bold text-white md:text-5xl text-4xl'>Proven by Cryptography</h2>
            <p className='md:text-md text-base text-neutral-300'>
              We utilize blockchain technology to offer what next-generation gamblers deserve.
            </p>
          </div>

          <div className='grid md:grid-cols-2 grid-cols-1 gap-6 md:pt-24 pt-14'>
            <ProveCard
              imgSrc='/images/fair.png'
              title='Fair at the core'
              desc='The game logic is encoded and operated by a non-upgradable smart contract, which prevents manipulation within the game.'
            />
            <ProveCard
              imgSrc='/images/transparent.png'
              title='Transparent by default'
              desc='All game operations and players activities are recorded on the blockchain, ensuring public verifiability by anyone.'
            />
          </div>
        </div>
      </Container>
    </Layout>
  );
};

export default Home;
