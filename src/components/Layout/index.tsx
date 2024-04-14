import { PropsWithChildren } from 'react';

import Header from './Header';
import Footer from './Footer';


const Layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <div className="absolute top-0 left-0 right-0 bg-gradiant-primary-top blur-[20px] opacity-70 w-screen h-[243px]" />

      <div className="relative h-full pt-8">
        <Header />
        {children}
        <Footer />
      </div>
    </>
  );
};

export default Layout;
