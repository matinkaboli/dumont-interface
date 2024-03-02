import { ReactNode } from 'react';

import Header from './Header';
import Footer from './Footer';

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <div className="relative">
      <div className="absolute -z-10 top-0 left-0 right-0 bg-gradiant-layout blur-[20px] w-screen h-[243px]" />

      <div className="lg:w-[840px] w-full mx-auto flex flex-col min-h-screen lg:px-0 px-5 pt-10 pb-6">
        <Header />
        <main className="pt-10 md:pb-16 pb-2">{children}</main>
        <Footer className="mt-auto" />
      </div>
    </div>
  );
};

export default Layout;
