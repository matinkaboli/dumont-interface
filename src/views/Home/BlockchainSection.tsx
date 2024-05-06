import { FadeInUp, Typography } from '@/components';

import GradiantBadge from './_components/GradiantBadge';
import ProveCard from './_components/ProveCard';


const BlockchainSection = () => {
  return (
    <div className='pt-20 md:pb-40 pb-24'>
      <div className='flex flex-col gap-4 text-center'>
        <FadeInUp className='w-fit mx-auto'>
          <GradiantBadge icon='globe' label='Powered by blockchain' className='mx-auto' />
        </FadeInUp>
        <FadeInUp className='w-fit mx-auto'>
          <Typography tag='h2' variant='title2'>Proven by Cryptography</Typography>
        </FadeInUp>
        <FadeInUp className='w-fit mx-auto'>
          <Typography tag='p' variant='body1'>
            We utilize blockchain technology to offer what next-generation gamblers deserve.
          </Typography>
        </FadeInUp>
      </div>

      <div className='grid md:grid-cols-2 grid-cols-1 gap-6 md:pt-24 pt-14'>
        <FadeInUp>
          <ProveCard
            imgSrc='/images/fair.png'
            title='Fair at the core'
            desc='The game logic is encoded and operated by a non-upgradable smart contract, which prevents manipulation within the game.'
          />
        </FadeInUp>
        <FadeInUp>
          <ProveCard
            imgSrc='/images/transparent.png'
            title='Transparent by default'
            desc='All game operations and players activities are recorded on the blockchain, ensuring public verifiability by anyone.'
          />
        </FadeInUp>
      </div>
    </div>
  );
};

export default BlockchainSection;
