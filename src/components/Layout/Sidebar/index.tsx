import Link from 'next/link';
import Image from 'next/image';

import { Icon } from '@/components';

import Header from '../Header';

const navs = [
  {
    id: 'home',
    label: 'Home',
    link: '/',
    icon: <Image width={32} height={28} src="/images/logo.svg" alt="dumont" />,
  },
  { id: 'sport', label: 'Sport', link: '/', icon: <Icon name="ball" /> },
  { id: 'card', label: 'Card', link: '/', icon: <Icon name="game-card" /> },
];

const Sidebar = () => {
  return (
    <div className="flex">
      <nav className="flex-col gap-6 px-2.5 border-x-[1.5px] border-neutral-750 bg-neutral-800">
        {navs.map((nav) => (
          <Link
            key={nav.id}
            href={nav.link}
            className="flex flex-col items-center justify-center gap-1 text-neutral-400 text-sm p-3 rounded-md transition duration-200 hover:bg-gray-700"
          >
            {nav.icon}
           <span>{nav.label}</span>
          </Link>
        ))}
      </nav>
      <main className="flex-1">
        <div className="py-4 px-14 bg-gradiant-black border-b-[1.5px] border-neutral-750">
          <Header />
        </div>
        <div className="pt-14 px-2 max-w-[856px] mx-auto text-white">
          <h1 className="text-3xl font-bold">Main Content</h1>
          <p>This is the main content area.</p>
        </div>
      </main>
    </div>
  );
};

export default Sidebar;
