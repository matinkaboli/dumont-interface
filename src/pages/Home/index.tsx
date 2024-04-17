import Link from 'next/link';

import { Container, Icon, Layout } from '@/components';

import PlayButton from '@/pages/_components/PlayButton';

import ProveCard from './ProveCard';
import GradiantBadge from './GradiantBadge';
import FoldedCorners from './FoldedCorners';

const Home = () => {
  return (
    <Layout>
      <Container>
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

        <div className='pt-20 md:pb-40 pb-24'>
          <div className='flex flex-col gap-4 text-center'>
            <GradiantBadge icon='globe' label='Powered by blockchain' className='mx-auto' />
            <h2 className='title'>Proven by Cryptography</h2>
            <p className='description-text'>
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

      <div className='px-4'>
        <div className='bg-gradiant-neon-pink relative pt-16'>
          <FoldedCorners />

          <div className='flex flex-col gap-4 text-center w-full max-w-[670px] mx-auto px-4'>
            <GradiantBadge variant='secondary' icon='game-object' label='Unique gameplay' className='mx-auto' />
            <h3 className='font-bold md:text-4xl text-3xl text-white'>Guess the card and secure a win</h3>
            <p className='description-text'>
              We’ve designed an engaging game with a dedicated user interface that offers an exciting experience to
              players.
            </p>
            <Link href='/' className="flex items-center gap-2 mx-auto text-primary-250 font-bold text-sm">
              Learn more
              <Icon name="arrow-right" />
            </Link>
          </div>

          <div
            className='bg-primary-800 w-full max-w-[843px] md:h-[487px] h-[295px] mx-auto md:mt-20 mt-12 md:rounded-xl rounded-t-lg rounded-b-none'></div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
