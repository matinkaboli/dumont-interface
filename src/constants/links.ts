import { Networks } from '@/types';

const links = {
  EXPLORER: '',
  APP: 'https://app.dumont.gg',
  BUY_CRYPTO: 'https://www.moonpay.com/',
  BRIDGE_ASSET: 'https://jumper.exchange/',
  GET_REWARD: 'https://docs.dumont.gg/usdmont-token/reward-program',
};

const network = process.env.NEXT_PUBLIC_NETWORK as Networks;

if (network === 'base') {
  links.EXPLORER = 'https://basescan.org';
} else {
  links.EXPLORER = 'https://sepolia.basescan.org';
}

export default links;
