type GuessResultSearchParams = {
  gameId?: string;
  cardId?: string;
};

export async function generateMetadata({
  searchParams,
}: {
  searchParams: GuessResultSearchParams;
}) {
  const { gameId, cardId } = searchParams;

  const title = 'Dumont - Make Gambling Great Again';
  const description =
    'Bet on exciting games like leverageable sports markets and card games in a cheat-proof, verifiable environment powered by blockchain';
  const url = `https://app.dumont.gg/guess-result?gameId=${gameId}&cardId=${cardId}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      url,
      images: [{ url }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [url],
    },
  };
}

export default function GuessResultPage() {
  return (
    <main className="relative flex min-h-[50vh] flex-col justify-center overflow-hidden">
      <div className="text-center">
        <div className="font-bold text-3xl md:text-4xl [text-wrap:balance] bg-clip-text text-transparent bg-gradient-to-r from-slate-200/60 to-50% to-slate-200">
          Share this page to see result
        </div>
      </div>
    </main>
  );
}
