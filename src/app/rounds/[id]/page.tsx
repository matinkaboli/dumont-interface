import Round from '@/views/Round';
import { Metadata, ResolvingMetadata } from 'next';

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { id } = await params;
  const { cardIndex } = await searchParams;

  console.log(id, cardIndex);

  // // fetch data
  // const product = await fetch(`https://.../${id}`).then((res) => res.json());

  // optionally access and extend (rather than replace) parent metadata
  // const previousImages = (await parent).openGraph?.images || [];

  return {
    metadataBase: new URL('https://acme.com'),
    openGraph: {
      title: 'Dumont',
      description: 'Round ',
      url: 'https://nextjs.org',
      siteName: 'Next.js',
      images: [
        {
          url: 'http://localhost:3000/api/og?title=Next.js', // Dynamic og route
          width: 800,
          height: 600,
        },
        {
          url: 'http://localhost:3000/api/og?title=Next.js', // Dynamic og route
          width: 1800,
          height: 1600,
          alt: 'My custom alt',
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
  };
}

export default function RoundPage() {
  return <Round />;
}
