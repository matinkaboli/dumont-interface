import { ReactNode } from 'react';

import ConnectWallet from './Header/ConnectWallet';
import SideNavs from './SideNavs';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex h-screen overflow-y-hidden">
      <SideNavs />
      <main className="flex-1 h-screen overflow-y-auto sm:pb-0 pb-44">
        <div className="py-4 sm:px-14 px-1 bg-gradiant-black border-b-[1.5px] border-neutral-750 sticky top-0 right-0 z-[999]">
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
