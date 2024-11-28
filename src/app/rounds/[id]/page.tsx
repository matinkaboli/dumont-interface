import Round from '@/views/Round';

const website = 'https://app.dumont.gg';

export const metadata = {
  title: 'Ultimate Card Game Strategy Guide',
  description:
    'Master the art of card games with our expert guide. Learn strategies, rules, and tips to dominate any deck.',
  openGraph: {
    title: 'The Ultimate Guide to Card Game Mastery',
    description:
      'Dive into strategies, rules, and expert tips to become a card game champion. Perfect for players of all levels!',
    type: 'article',
    url: `${website}/rounds`,
    images: [
      {
        url: `${website}/api/og?title=The Ultimate Guide to Card Game Mastery`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Ultimate Guide to Card Game Mastery',
    description:
      'Unlock pro-level skills in your favorite card games. Strategies, rules, and tips all in one guide!',
    images: [`${website}/api/og?title=The Ultimate Guide to Card Game Mastery`],
  },
};

export default function RoundPage() {
  return <Round />;
}
