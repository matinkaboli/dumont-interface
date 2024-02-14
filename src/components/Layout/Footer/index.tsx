import clsx from 'clsx';
import Round from './Round';

const Footer = ({ className }: { className?: string }) => {
  return (
    <footer className={clsx('md:flex hidden justify-center items-center', className)}>
      <Round roundTime="2h 20m 12s" />
    </footer>
  );
};

export default Footer;
