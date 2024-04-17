import Image from 'next/image';

import { Container, Layout } from '@/components';

import PlayButton from '@/pages/_components/PlayButton';

import ProveCard from './ProveCard';
import GradiantBadge from './GradiantBadge';
import FoldedCorners from './FoldedCorners';
import FollowLink from './FollowLink';

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
            <FollowLink href='/' label='Learn more' className='font-bold text-sm mx-auto' />
          </div>

          <div
            className='bg-primary-800 w-full max-w-[843px] md:h-[487px] h-[295px] mx-auto md:mt-20 mt-12 md:rounded-xl rounded-t-lg rounded-b-none'></div>
        </div>
      </div>

      <Container>
        <div className='grid md:grid-cols-2 grid-cols-1 items-center md:gap-2 gap-14 md:py-48 py-16'>
          <div>
            <GradiantBadge icon='circle-dollar' label='True randomness' className='w-fit' />
            <h3 className='title mt-6'>Immutable outcomes</h3>
            <div className='mt-2 md:text-2xl text-lg text-neutral-300'>No possibility of operator cheating</div>
            <p className='description-text mt-6'>We designed an innovative cryptography mechanism that proves game
              results are random and safe against manipulation.</p>
            <FollowLink
              href='/'
              label='How it works'
              className='font-semibold text-base md:mt-14 mt-8'
            />
          </div>
          <div>
            <Image
              height='0'
              width='0'
              sizes='100vw'
              src='/images/immutable.png'
              className='w-full max-w-[454px] h-auto md:ml-auto md:mr-0 mx-auto'
              alt='dumont'
            />
          </div>
        </div>


        <div className='grid md:grid-cols-2 grid-cols-1 items-center xl:gap-0 lg:gap-4 gap-14 md:py-48 py-16'>
          <div className="md:order-1 order-2">
            <Image
              height='0'
              width='0'
              sizes='100vw'
              src='/images/Permissionless.png'
              className='w-full max-w-[400px] h-auto md:mx-0 mx-auto'
              alt='dumont'
            />
          </div>
          <div className="md:order-2 order-1">
            <GradiantBadge icon='circle-dollar' label='immediate payouts' className='w-fit' />
            <h3 className='title mt-6'>Permissionless payouts</h3>
            <div className='mt-2 md:text-2xl text-lg text-neutral-300'>No need for operator permission</div>
            <p className='description-text mt-6'>
              Your winning amounts are immediately and automatically sent to your address by the blockchain-based smart contract.
            </p>
            <div className="bg-gradiant-blur backdrop-blur-xl shadow-xl rounded-full flex items-center gap-1 h-10 px-3 text-base text-neutral-300 w-fit mt-6">
              <b>$10,230,000</b> bet settled so far
            </div>
          </div>
        </div>
      </Container>
    </Layout>
  );
};

export default Home;
