import Game from '@/views/card/Game';

export async function generateMetadata(
  props: {
    params: Promise<{ id: string }>;
    searchParams: Promise<{ cardId?: string }>;
  }
) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const { cardId } = searchParams;
  const gameId = params.id;
  const title = 'A provably fair gambling platform';
  const description =
    'Dumont is a blockchain-based gambling platform that guarantees a provably fair experience for players';
  const url = `${process.env.NEXT_PUBLIC_WEBSITE_URL}/games/${gameId}?cardId=${cardId}&mode=card`;
  const imageUrl = `${process.env.NEXT_PUBLIC_WEBSITE_URL}/api/og?gameId=${gameId}&cardId=${cardId}&mode=card`;

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

export default function GamePage() {
  return <Game />;
}
