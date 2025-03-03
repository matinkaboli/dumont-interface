import { ReactNode } from 'react';

import ConnectWallet from './ConnectWallet';
import SideNavs from './SideNavs';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex h-screen overflow-y-hidden">
      <SideNavs />

      <main className="flex-1 h-screen overflow-y-auto overflow-x-hidden md:pb-10 pb-44">
        <div className="py-4 lg:px-14 px-1 bg-gradiant-black border-b-[1.5px] border-neutral-750 sticky top-0 right-0 z-40">
          <div className="min-h-[40px] ml-auto">
            <ConnectWallet />
          </div>
        </div>

        <div className="relative pt-14 px-2">
          <div className="absolute -z-10 top-0 left-0 right-0 bg-gradiant-layout blur-[40px] w-full h-[162px]" />
          <div className="max-w-[856px] mx-auto">{children}</div>
        </div>
      </main>
    </div>
  );
};

export default Layout;
