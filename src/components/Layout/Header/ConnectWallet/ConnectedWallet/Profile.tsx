import { Button, CopyToClipboard, QRCode } from '@/components';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
  address?: string;
  truncatedAddress?: string;
  onOpenChange?: () => void;
}

const Profile = ({ address = '', truncatedAddress, onOpenChange }: Props) => {
  return (
    <div>
      <QRCode value={address} size={192} className="mx-auto" />

      <div className="flex flex-col gap-6">
        <div className="flex-between mt-4 bg-neutral-600 px-4 py-2 rounded-lg">
          <div className="flex gap-2">
            <Image src="/images/metamask.png" width={24} height={24} alt="MetaMask" />
            <div className="text-neutral-100 font-medium text-base">{truncatedAddress}</div>
          </div>

          <CopyToClipboard copyText={address} />
        </div>

        <div className="flex flex-col gap-2">
          <h6 className="text-sm text-neutral-300 font-semibold">Balance</h6>
          <ul className="bg-neutral-600 rounded-lg">
            <li className="px-4 py-2 flex-between border-b border-neutral-700 last:border-b-0">
              <div className="flex gap-2">
                <Image src="/images/DAI.svg" width={24} height={24} alt="" />
                <div className="text-neutral-200 text-base font-medium">ETH</div>
              </div>
              <div className="text-neutral-50 text-base font-medium">0.12</div>
            </li>
            <li className="px-4 py-2 flex-between">
              <div className="flex gap-2">
                <Image src="/images/DAI.svg" width={24} height={24} alt="" />
                <div className="text-neutral-200 text-base font-medium">ETH</div>
              </div>
              <div className="text-neutral-50 text-base font-medium">0.12</div>
            </li>
          </ul>

          <div className="flex gap-2">
            <Button
              asChild
              fullWidth
              variant="link"
              size="sm"
              radius="lg"
              className="bg-neutral-600 font-bold text-white"
              rightSection={<Image src="/images/DAI.svg" width={24} height={24} alt="" />}
            >
             <Link href="/">Buy crypto</Link>
            </Button>
            <Button
              asChild
              fullWidth
              variant="link"
              size="sm"
              radius="lg"
              className="bg-neutral-600 font-bold text-white"
              rightSection={<Image src="/images/DAI.svg" width={24} height={24} alt="" />}
            >
              <Link href="/">Buy crypto</Link>
            </Button>
          </div>
        </div>

        <div>
          <h6 className="text-sm text-neutral-300 font-semibold">Invite Link</h6>
        </div>
      </div>

      <Button className="mt-8 mx-auto" onClick={onOpenChange}>
        logOut
      </Button>
    </div>
  );
};

export default Profile;
