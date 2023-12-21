import { CopyToClipboard, QRCode } from '@/components';

export default function Home() {
  return (
    <div className="text-white">
      Some homePage content
      <CopyToClipboard copyText="jcoifjoijeo" />

      <QRCode value="0x51B59b...E92D4cFc" />
    </div>
  );
}
