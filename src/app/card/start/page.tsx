import Start from '@/views/card/Start';
import { constructMetadata } from '@/app/metadata.config';

export const metadata = constructMetadata();

export default function StartPage() {
  return <Start />;
}
