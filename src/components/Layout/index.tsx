'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import clsx from 'clsx';

import { Icon } from '@/components';
import ConnectWallet from '@/components/Layout/Header/ConnectWallet';
import { useActivePath } from '@/hooks/useActivePath';

const navs = [
  {
    id: 'home',
    label: '',
    link: '/',
    icon: <Image width={32} height={28} src="/images/logo.svg" alt="dumont" />,
  },
  { id: 'sport', label: 'Sport', link: '/start', icon: <Icon name="ball" /> },
  { id: 'card', label: 'Card', link: '/', icon: <Icon name="game-card" /> },
];

const Layout = ({ children }: { children: ReactNode }) => {
  const isActivePath = useActivePath();

  return (
    <div className="flex">
      <nav className="flex flex-col gap-0.5 px-2.5 border-x-[1.5px] border-neutral-750 bg-neutral-800 min-h-screen">
        {navs.map((nav) => (
          <div
            key={nav.id}
            className={clsx(
              'min-h-[72px] border-transparent rounded-md',
              isActivePath(nav.link) && 'border bg-gradiant-border bg-primary-800 bg-origin-border',
            )}
          >
            <Link
              href={nav.link}
              className="h-[72px] flex flex-col items-center justify-center gap-1 bg-neutral-800 text-neutral-400 rounded-md text-sm p-3 transition duration-200 hover:bg-neutral-750"
            >
              {nav.icon}
              <span>{nav.label}</span>
            </Link>
          </div>
        ))}
      </nav>
      <main className="flex-1">
        <div className="py-4 px-14 bg-gradiant-black border-b-[1.5px] border-neutral-750">
          <div className="min-h-[40px] w-fit ml-auto">
            <ConnectWallet />
          </div>
        </div>
        <div className="relative pt-14 px-2 max-w-[856px] mx-auto">
          <div className="absolute -z-10 top-0 left-0 right-0 bg-gradiant-layout blur-[20px] w-screen h-[243px]" />
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
