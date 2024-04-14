import { PropsWithChildren } from 'react';

import Header from './Header';
import Footer from './Footer';


const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="bg-neutral-800 h-full pt-8">
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
