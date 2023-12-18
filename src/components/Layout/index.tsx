import { ReactNode } from 'react';

import Header from './Header';
import Footer from './Footer';

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <div className="lg:px-0 px-5 pt-10 pb-6">
      <div className="absolute top-0 bg-gradiant-layout blur-[20px] w-screen h-[243px]" />

      <div className="relative lg:w-[840px] w-full mx-auto">
        <Header />
        <main className="pt-10 pb-16">{children}</main>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
