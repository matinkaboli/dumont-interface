import Home from '@/views/card/Home';
import { constructMetadata } from '@/app/metadata.config';

export const metadata = constructMetadata();

export default function HomePage() {
  return <Home />;
}
