import Link from 'next/link';
import { motion } from 'framer-motion';

const linkVariants = {
  initial: {
    y: '30vh',
    transition: {
      duration: 0.5,
      ease: [0.37, 0, 0.63, 1],
    },
  },
  open: {
    y: 0,
    transition: {
      ease: [0, 0.55, 0.45, 1],
      duration: 0.7,
    },
  },
};

interface Props {
  title: string;
  href: string;
  target: string;
  onClick: () => void;
}

const NavLink = ({ title, href, target, onClick }: Props) => {
  return (
    <motion.div
      variants={linkVariants}
      className='text-2xl text-white'
    >
      <Link href={href} target={target} onClick={onClick}>{title}</Link>
    </motion.div>
  );
};

export default NavLink;
