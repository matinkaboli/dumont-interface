import Image from 'next/image';

import { Button } from '@/components';
import parseUnits from '@/helpers/parseUnits';
import getCardInfo from '@/helpers/getCardInfo';
import toFixedNumber from '@/helpers/toFixedNumber';
import { useTypedSelector } from '@/hooks/useTypedSelector';

const createMessage = (isWinner: boolean, totalAmount: string, montAmount: string) => ({
  title: isWinner ? 'You won! 🎉' : 'No luck this time 💔',
  content: isWinner ? (
    <p className="text-white text-md">
      Enjoy your <b className="text-success-400">${totalAmount} win</b> <b>in your wallet</b>
    </p>
  ) : (
    <p className="text-sm text-neutral-200 px-0 md:px-5">
      You didn’t win this one, but you still got
      <span className="text-success-400"> +{montAmount}</span> $MONT in rewards.
    </p>
  ),
  buttonText: isWinner ? 'Got it' : 'Try the next',
});

const ResultMessage = ({
  onCloseDialog,
  cardIndex,
}: {
  onCloseDialog: () => void;
  cardIndex: number;
}) => {
  const { data } = useTypedSelector((state) => state.game);

  if (!data) return null;

  const isPlayerWinner = data.cards[cardIndex].result!.isPlayerWinner;
  const TOTALAmount = toFixedNumber(parseUnits(data.cards[cardIndex].totalAmount, 6).toString(), 2);
  const MONTAmount = toFixedNumber(
    parseUnits(data.cards[cardIndex].result!.montAmount, 18).toString(),
    4,
  );

  const message = createMessage(isPlayerWinner, TOTALAmount, MONTAmount);

  return (
    <>
      <Image
        src={`/images/cards/${getCardInfo(data.cards[cardIndex].number)}.png`}
        width={160}
        height={223}
        className="mx-auto"
        alt=""
      />
      <h3 className="text-xl text-white text-center font-bold mt-6">{message.title}</h3>

      <div className="mt-2 text-center">{message.content}</div>

      {isPlayerWinner && (
        <div className="mt-6 bg-neutral-600 text-center text-base text-white font-medium rounded-lg py-1">
          <span className="text-white">+{MONTAmount} MONT</span>
          <span className="text-neutral-400"> in reward.</span>
        </div>
      )}

      <Button fullWidth size="md" radius="lg" className="mt-8" onClick={onCloseDialog}>
        {message.buttonText}
      </Button>
    </>
  );
};
export default ResultMessage;
