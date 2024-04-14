import Link from 'next/link';

import Button from '@/components/Button';

import DumontLogo from '../DumontLogo';

const Menus = () => {
  return (
    <ul className='flex items-center gap-12'>
      <li><Link href='/'><DumontLogo /></Link></li>
      <li className='text-base text-neutral-300 font-medium'><Link href='/'>Docs</Link></li>
      <li className='text-base text-neutral-300 font-medium'><Link href='/'>Blog</Link></li>
      <li className='text-base text-neutral-300 font-medium'><Link href='/'>FAQ</Link></li>
      <li className='ml-auto'>
        <Button
          variant='link'
          size='sm'
          radius='lg'
          className='bg-primary-500 text-primary-250 font-bold'>
          Start playing
        </Button>
      </li>
    </ul>
  );
};

export default Menus;
