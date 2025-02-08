import Round from '@/views/card/Round';

export async function generateMetadata({
  searchParams,
  params,
}: {
  params: { id: string };
  searchParams: { cardId?: string };
}) {
  const { cardId } = searchParams;
  const gameId = params.id;
  const title = 'Dumont - Make Gambling Great Again';
  const description =
    'Bet on exciting games like leverageable sports markets and card games in a cheat-proof, verifiable environment powered by blockchain';
  const url = `${process.env.NEXT_PUBLIC_WEBSITE_URL}/rounds/${gameId}?cardId=${cardId}`;
  const imageUrl = `${process.env.NEXT_PUBLIC_WEBSITE_URL}/api/og?gameId=${gameId}&cardId=${cardId}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      url,
      images: [{ url: imageUrl }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
  };
}

export default function RoundPage() {
  return <Round />;
}
