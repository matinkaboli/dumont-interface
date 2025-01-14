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

  return {
    title: 'Social Metadata - Cruip Tutorials',
    description:
      "A guide on how to optimize SEO with static and dynamic metatags using Next.js 13's new Metadata API.",
    openGraph: {
      title: 'Generate Dynamic Open Graph and Twitter Images in Next.js',
      description:
        "A guide on how to optimize SEO with static and dynamic metatags using Next.js 13's new Metadata API.",
      type: 'article',
      url: `https://app.dumont.gg/guess-result?gameId=${gameId}&cardId=${cardId}`,
      images: [
        {
          url: `https://app.dumont.gg/api/og?gameId=${gameId}&cardId=${cardId}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Generate Dynamic Open Graph and Twitter Images in Next.js',
      description:
        "A guide on how to optimize SEO with static and dynamic metatags using Next.js 13's new Metadata API.",
      images: [`https://app.dumont.gg/api/og?gameId=${gameId}&cardId=${cardId}`],
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
