import Cards from '@/views/card/Main';
import { constructMetadata } from '@/app/metadata.config';

export const metadata = constructMetadata();

export default function CardsPage() {
  return <Cards />;
}
