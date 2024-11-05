import Round from '@/views/Round';
import { Metadata } from 'next';

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata(): Promise<Metadata> {
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
