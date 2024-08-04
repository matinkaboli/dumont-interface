import Link from 'next/link';

import Button from '@/components/Button';
import Container from '@/components/Container';
import Routes from '@/constants/routes';
import links from '@/constants/externalLinks';

import DumontLogo from './DumontLogo';
import MobileNavbar from './MobileNavbar';

export const navLinks = [
  { id: 'docs', title: 'Docs', href: links.DOCS, target: '_blank' },
  { id: 'blog', title: 'Blog', href: links.MEDIUM, target: '_blank' },
  { id: 'faq', title: 'FAQ', href: Routes.FAQ, target: '_self' },
  { id: 'mont', title: '$MONT', href: Routes.MONT, target: '_self' },
];

const Header = () => {
  return (
    <Container tag='header' className='relative'>
      <ul className='flex items-center gap-12'>
        <li className='relative z-20'><Link href={Routes.HOME}><DumontLogo /></Link></li>
        {navLinks.map((nav) => (
          <li
            key={nav.id}
            className='text-base font-medium text-neutral-300 hover:text-primary-250 transition duration-75 ease-in-out md:block hidden'
          >
            <Link href={nav.href} target={nav.target}>{nav.title}</Link>
          </li>
        ))}
        <li className='ml-auto'>
          <Button
            asChild
            variant='link'
            size='sm'
            radius='lg'
            className='bg-primary-500 hover:bg-primary-400 transition duration-75 ease-in-out text-primary-250 font-bold md:block hidden'>
            <Link href={links.DUMONT_APP} target='_blank'>Start playing</Link>
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
