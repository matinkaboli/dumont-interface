import Image from 'next/image';

import { Button, Container, Icon, Layout, Typography } from '@/components';
import links from '@/constants/externalLinks';

import FollowLink from '@/views/Home/_components/FollowLink';


const Mont = () => {
  return (
    <Layout>
      <Container className='md:pt-32 md:pb-72 pt-16 pb-20'>
        <div className='flex flex-col gap-4 text-center max-w-[744px] mx-auto'>
          <Image width={112} height={112} src='/images/mont.svg' className='mx-auto' alt='mont' />
          <Typography tag='h1' variant='title1'>$MONT</Typography>
          <div
            className='text-md rounded-lg flex items-center px-4 py-1 bg-gradiant-blur backdrop-blur-xl shadow-xl w-fit mx-auto'>
            <div className='text-white'>$0.106</div>
            <div className='px-2.5 text-neutral-500'>|</div>
            <div className='text-success-600 flex items-center gap-1.5'><Icon name='arrow-up' />%0.5</div>
          </div>
          <Typography tag='p' variant='body1'>
            By holding $MONT, you can share in the revenue of the provably fair
            and blockchain-based gambling protocol, Dumont.
          </Typography>
        </div>
        <div className='flex justify-center gap-12 mt-10'>
          <Button
            variant='primary'
            radius='lg'
            leftSection={<Image width={24} height={24} src='/images/uniswap-badge.svg' alt='' />}>
            Buy $MONT
          </Button>
          <FollowLink
            href={links.TOKENOMICS}
            label='Learn more'
            className='font-semibold text-base'
          />
        </div>
      </Container>
    </Layout>
  );
};

export default Mont;
