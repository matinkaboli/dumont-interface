import { Metadata } from 'next';

import FAQ from '@/views/FAQ';

export const metadata: Metadata = {
  title: 'FAQ | Dumont',
};

export default function FaqPage() {
  return <FAQ />;
}
