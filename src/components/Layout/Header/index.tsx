import Link from 'next/link';

import Button from '@/components/Button';
import Container from '@/components/Container';
import Routes from '@/constants/routes';

import DumontLogo from './DumontLogo';
import MobileNavbar from './MobileNavbar';

export const navLinks = [
  { id: 'docs', title: 'Docs', href: '/' },
  { id: 'blog', title: 'Blog', href: '/' },
  { id: 'faq', title: 'FAQ', href: Routes.FAQ },
];

const Header = () => {
  return (
    <Container tag='header'>
      <ul className='flex items-center gap-12'>
        <li className='relative z-20'><Link href={Routes.HOME}><DumontLogo /></Link></li>
        {navLinks.map((nav) => (
          <li
            key={nav.id}
            className='text-base font-medium text-neutral-300 hover:text-primary-250 transition duration-75 ease-in-out md:block hidden'
          >
            <Link href={nav.href}>{nav.title}</Link>
          </li>
        ))}
        <li className='ml-auto'>
          <Button
            variant='link'
            size='sm'
            radius='lg'
            className='bg-primary-500 hover:bg-primary-400 transition duration-75 ease-in-out text-primary-250 font-bold md:block hidden'>
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
