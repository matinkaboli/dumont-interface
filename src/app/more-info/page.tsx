import MoreInfo from '@/views/MoreInfo';
import { constructMetadata } from '@/app/metadata.config';

export const metadata = constructMetadata();

export default function MoreInfoPage() {
  return <MoreInfo />;
}
