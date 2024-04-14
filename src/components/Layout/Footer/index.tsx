import Link from 'next/link';

import Container from '@/components/Container';
import Icon from '@/components/Icon';


const Footer = () => {
  return (
    <Container>
      <footer className='border-t border-neutral-700 py-6'>
        <div className='flex items-center justify-between'>
          <div className='text-primary-100 text-sm font-medium'>© 2024 Dumont. All rights reserved.</div>

          <div className="flex gap-6">
           <Link href="/"><Icon name="twitter"/></Link>
           <Link href="/"><Icon name="telegram"/></Link>
          </div>
        </div>
      </footer>
    </Container>
  );
};

export default Footer;
