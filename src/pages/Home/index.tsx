import Image from 'next/image';

import { Container, Layout } from '@/components';

import PlayButton from '@/pages/_components/PlayButton';

import ProveCard from './ProveCard';
import GradiantBadge from './GradiantBadge';
import FoldedCorners from './FoldedCorners';
import FollowLink from './FollowLink';
import Button from '../../components/Button';
import BlurBadge from '@/pages/Home/BlurBadge';

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
        <div className='grid md:grid-cols-2 grid-cols-1 items-center md:gap-0 gap-14 md:py-48 py-16'>
          <div>
            <GradiantBadge icon='circle-dollar' label='True randomness' className='w-fit' />
            <h3 className='title mt-6'>Immutable outcomes</h3>
            <div className='mt-2 md:text-2xl text-lg text-neutral-300'>No possibility of operator cheating</div>
            <p className='description-text mt-6'>We designed an innovative cryptography mechanism that proves game
              results are random and safe against manipulation.</p>
            <FollowLink
              href='/'
              label='How it works'
              className='font-semibold text-base mx-auto md:mt-14 mt-8'
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
          <div className='md:order-1 order-2'>
            <Image
              height='0'
              width='0'
              sizes='100vw'
              src='/images/Permissionless.png'
              className='w-full max-w-[400px] h-auto md:mx-0 mx-auto'
              alt='dumont'
            />
          </div>
          <div className='md:order-2 order-1'>
            <GradiantBadge icon='circle-dollar' label='immediate payouts' className='w-fit' />
            <h3 className='title mt-6'>Permissionless payouts</h3>
            <div className='mt-2 md:text-2xl text-lg text-neutral-300'>No need for operator permission</div>
            <p className='description-text mt-6'>
              Your winning amounts are immediately and automatically sent to your address by the blockchain-based smart
              contract.
            </p>
            <BlurBadge className='mt-6'><b>$10,230,000</b> bet settled so far</BlurBadge>
          </div>
        </div>
      </Container>


      <div className='px-4'>
        <div className='bg-gradiant-neon-pink relative pt-8 pb-14 px-4'>
          <Image
            width='0'
            height='0'
            sizes='100vw'
            src='/images/lines.png'
            className='w-auto h-full absolute right-0 top-0 bottom-0 md:block hidden'
            alt=''
          />
          <FoldedCorners />

          <div className='flex flex-col items-center text-center gap-4'>
            <Image width={104} height={104} src='/images/mont.svg' alt='mont' />
            <h3 className='title'>$MONT</h3>
            <h6 className='md:text-3xl text-xl text-white font-bold'>Democratizing the house benefit</h6>
          </div>
        </div>
      </div>

      <Container>
        <div className='grid md:grid-cols-2 grid-cols-1 items-center justify-items-end lg:gap-0 gap-16 md:py-56 py-36'>
          <div>
            <GradiantBadge icon='circle-dollar' label='MONT token' className='w-fit' />
            <h3 className='title mt-6'>Tap to the house benefit</h3>
            <div className='mt-2 md:text-2xl text-lg text-neutral-300'>Get your share of the game revenue</div>
            <p className='description-text mt-6'>
              Thanks to our burning mechanism, everyone can benefit from the system’s revenue by purchasing and holding
              $MONT.
            </p>
            <div className='flex items-center md:mt-10 mt-8 gap-10'>
              <Button
                variant='link'
                size='md'
                radius='lg'
                className='bg-primary-500 hover:bg-primary-400 transition duration-75 ease-in-out text-primary-250 font-bold'>
                Buy $MONT
              </Button>
              <FollowLink
                href='/'
                label='How it works'
                className='font-semibold text-base'
              />
            </div>
          </div>

          <div className='max-w-[456px] w-full'>
            <div className='w-full h-[132px] bg-primary-800 rounded-xl' />
            <div className='flex flex-col gap-2 mt-8'>
              <div className='text-lg text-neutral-400'>Total Amount Burned</div>
              <h4 className='lg:text-5xl text-4xl text-primary-250 font-bold'>120,930 MONT</h4>
              <BlurBadge>From <b>$15,000</b> of collected fees</BlurBadge>
            </div>
          </div>
        </div>


        <div className='rounded-3xl lg:px-24 px-4 lg:py-20 py-12 bg-gradiant-dark relative'>
          <div className='grid md:grid-cols-2 grid-cols-1 items-center justify-items-end'>
            <div>
              <GradiantBadge icon='circle-dollar' label='MONT rewards' className='w-fit' />
              <h3 className='title mt-6'>Play and get rewards</h3>
              <div className='mt-2 md:text-2xl text-lg text-neutral-300'>Get free $MONT from playing</div>

              <div className='flex border-t border-b border-neutral-700 mt-8'>
                <div className='py-4 pr-8 border-r border-neutral-700'>
                  <div className='text-xl font-bold text-primary-250'>20,00,000 MONT</div>
                  <div className='text-sm text-neutral-400 font-medium'>Total Reward Distributed</div>
                </div>
                <div className='py-4 px-8'>
                  <div className='text-xl font-bold text-primary-250'>2,320</div>
                  <div className='text-sm text-neutral-400 font-medium'>Recipient Users</div>
                </div>
              </div>

              <p className='description-text mt-8'>
                A significant portion of $MONT supply is allocated for player
                You can get your share by playing in the game or inviting your friends.
              </p>

              <FollowLink
                href='/'
                label='Learn more'
                className='font-semibold text-base mt-9'
              />
            </div>
            <div className='md:mt-0 -mt-16'>
              <Image
                width='0'
                height='0'
                sizes='100vw'
                className='w-auto h-full md:max-h-[500px] max-h-[250px] absolute right-0 bottom-0'
                src='/images/bg-circle.png'
                alt=''
              />

              <Image
                width='0'
                height='0'
                sizes='100vw'
                className='w-full max-w-[290px] h-auto relative'
                src='/images/rewards.png'
                alt=''
              />
            </div>
          </div>
        </div>
      </Container>
    </Layout>
  );
};

export default Home;
