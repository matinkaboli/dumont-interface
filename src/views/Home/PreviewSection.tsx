import { FadeInUp, Typography } from '@/components';

import FoldedCorners from './_components/FoldedCorners';
import GradiantBadge from './_components/GradiantBadge';
import FollowLink from './_components/FollowLink';

const PreviewSection = () => {
  return (
    <div className='px-4'>
      <div className='bg-gradiant-neon-pink relative pt-16'>
        <FoldedCorners />

        <div className='flex flex-col gap-4 text-center w-full max-w-[670px] mx-auto px-4'>
          <FadeInUp className='w-fit mx-auto'>
            <GradiantBadge variant='secondary' icon='game-object' label='Unique gameplay' />
          </FadeInUp>
          <FadeInUp className='w-fit mx-auto'>
            <Typography tag='h3' variant='title3'>Guess the card and secure a win</Typography>
          </FadeInUp>
          <FadeInUp className='w-fit mx-auto'>
            <Typography tag='p' variant='body1'>
              We’ve designed an engaging game with a dedicated user interface that offers an exciting experience to
              players.
            </Typography>
          </FadeInUp>
          <FadeInUp className='w-fit mx-auto'>
            <FollowLink href='/' label='Learn more' className='font-bold text-sm' />
          </FadeInUp>
        </div>

        <div
          className='bg-primary-800 w-full max-w-[843px] md:h-[487px] h-[295px] mx-auto md:mt-20 mt-12 md:rounded-t-xl rounded-t-lg rounded-b-none' />
      </div>
    </div>
  );
};

export default PreviewSection;
