import Link from 'next/link';

import Container from '@/components/Container';
import Icon from '@/components/Icon';

const Footer = () => {
  return (
    <Container tag='footer' className="relative">
      <div className='flex items-center justify-between border-t border-neutral-700 py-6'>
        <div className='text-primary-100 text-sm font-medium'>© 2024 Dumont. All rights reserved.</div>

        <div className='flex items-center gap-6'>
          <Link href='/'><Icon name='twitter' className="[&>path]:hover:fill-primary-250" /></Link>
          <Link href='/'><Icon name='telegram' className="[&>path]:hover:fill-primary-250" /></Link>
        </div>
      </div>
    </Container>
  );
};

export default Footer;
