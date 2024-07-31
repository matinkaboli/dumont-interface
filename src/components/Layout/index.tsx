import { PropsWithChildren } from 'react';
import clsx from 'clsx';

import Header from './Header';
import Footer from './Footer';
import SmoothScroll from './SmoothScroll';

const bgGradiantClassName = 'absolute left-0 right-0 bg-gradiant-primary-top blur-[40px] opacity-70 w-screen h-[243px]';

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <SmoothScroll>
      <div className='relative min-h-screen flex flex-col pt-8'>
        <div className={clsx('top-0', bgGradiantClassName)} />
        <div className={clsx('bottom-0', bgGradiantClassName)} />
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </div>
    </SmoothScroll>
  );
};

export default Layout;
