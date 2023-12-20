import { CopyToClipboard } from '@/components';

export default function Home() {
  return (
    <div className="text-white">
      Some homePage content
      <CopyToClipboard copyText="jcoifjoijeo" />
    </div>
  );
}
