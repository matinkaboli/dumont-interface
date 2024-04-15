import Link from 'next/link';

import Button from '@/components/Button';
import Container from '@/components/Container';

import DumontLogo from './DumontLogo';
import MobileNavbar from './MobileNavbar';

export const navLinks = [
  { id: 'docs', title: 'Docs', href: '/' },
  { id: 'blog', title: 'Blog', href: '/' },
  { id: 'faq', title: 'FAQ', href: '/' },
];

const Header = () => {
  return (
    <Container tag='header'>
      <ul className='flex items-center gap-12'>
        <li className="relative z-10"><Link href='/'><DumontLogo /></Link></li>
        {navLinks.map((nav) => (
          <li key={nav.id} className='text-base text-neutral-300 font-medium md:block hidden'>
            <Link href={nav.href}>{nav.title}</Link>
          </li>
        ))}
        <li className='ml-auto'>
          <Button
            variant='link'
            size='sm'
            radius='lg'
            className='bg-primary-500 text-primary-250 font-bold  md:block hidden'>
            Start playing
          </Button>
        </li>
        <li className='ml-auto md:hidden block'>
          <MobileNavbar />
        </li>
      </ul>
    </Container>
  );
};

export default Header;
