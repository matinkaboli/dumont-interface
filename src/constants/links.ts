import { Networks } from '@/types';

const links = {
  EXPLORER: '',
  APP: 'https://app.dumont.gg',
  BUY_CRYPTO: 'https://www.moonpay.com/buy/eth',
  BRIDGE_ASSET:
    'https://jumper.exchange/?fromChain=1&fromToken=0x0000000000000000000000000000000000000000&toChain=8453&toToken=0x0000000000000000000000000000000000000000',
  GET_REWARD: 'https://docs.dumont.gg/usdmont-token/reward-program',
  TUTORIAL_VIDEO: 'https://www.youtube.com/watch?v=VDU1sxo-HqA',
  AIRDROP: 'https://x.com/dumontgg/status/1846604245673345484',
  MOONPAY: 'https://www.moonpay.com/',
  TWITTER: 'https://x.com/dumontgg',
  APP_DOC: 'https://docs.dumont.gg/',
};

const network = process.env.NEXT_PUBLIC_NETWORK as Networks;

if (network === 'base') {
  links.EXPLORER = 'https://basescan.org';
} else {
  links.EXPLORER = 'https://sepolia.basescan.org';
}

export default links;
