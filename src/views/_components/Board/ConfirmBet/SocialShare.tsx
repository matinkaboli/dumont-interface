import Image from 'next/image';

import { Button, DialogTitle, Icon } from '@/components';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import toFixedNumber from '@/helpers/toFixedNumber';
import parseUnits from '@/helpers/parseUnits';

const SocialShare = ({ gameId, cardIndex }: { gameId: number; cardIndex: number }) => {
  const { activities } = useTypedSelector((state) => state.activity);
  const card = activities[cardIndex];
  const totalAmount = toFixedNumber(parseUnits(card?.totalAmount, 6));
  const odds = toFixedNumber(card?.result?.rate as string);

  // const payoutUrl = `https://basescan.org/tx/${card?.hash}`;
  // const text = `Won $${totalAmount} with ${odds}x odds on @dumontgg \n\nPayout transaction:\n${payoutUrl}`;
  const text = `Won $${totalAmount} with ${odds}x odds on @dumontgg`;
  const url = `https://app.dumont.gg/rounds/${gameId}?cardId=${cardIndex}`;

  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    text,
  )}&url=${encodeURIComponent(url)}`;

  return (
    <>
      <DialogTitle className="text-center">Preview</DialogTitle>
      <Image
        width={0}
        height={0}
        className="w-full h-auto rounded-xl mt-8"
        sizes="100vw"
        src="/images/social-screenshot.png"
        alt=""
      />
      <Button asChild fullWidth radius="lg" className="mt-8">
        <a href={twitterUrl} target="_blank" rel="noopener noreferrer">
          Share in
          <Icon name="twitter" />
        </a>
      </Button>
    </>
  );
};

export default SocialShare;
