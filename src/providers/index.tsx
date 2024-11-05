import { ReactNode } from 'react';

import Wagmi from './Wagmi';
import Redux from './Redux';
import Privy from './PrivyAuth';

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <Redux>
      <Wagmi>
        <Privy>{children}</Privy>
      </Wagmi>
    </Redux>
  );
};

export default Providers;
