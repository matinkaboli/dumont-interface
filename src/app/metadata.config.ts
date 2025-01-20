import { Metadata } from 'next';

export const siteConfig = {
  name: 'Dumont - Make Gambling Great Again',
  description:
    'Bet on exciting games like leverageable sports markets and card games in a cheat-proof, verifiable environment powered by blockchain',
  url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}`,
  ogImage: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/images/default-social-preview.png`,
} as const;

export function constructMetadata({
  title = siteConfig.name,
  description = siteConfig.description,
  url = siteConfig.url,
  image = siteConfig.ogImage,
}: {
  title?: string;
  description?: string;
  url?: string;
  image?: string;
} = {}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: title,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  };
}
