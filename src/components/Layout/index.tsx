import { PropsWithChildren } from 'react';
import clsx from 'clsx';

import Header from './Header';
import Footer from './Footer';

const bgGradiantClassName = 'absolute left-0 right-0 bg-gradiant-primary-top blur-[40px] opacity-70 w-screen h-[243px]';

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="relative">
      <div className={clsx('top-0', bgGradiantClassName)} />
      <div className={clsx('bottom-0', bgGradiantClassName)} />

      <div className='relative h-full pt-8'>
        <Header />
        {children}
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
