import Image from 'next/image';

import { Button } from '@/components';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import getCardInfo from '@/helpers/getCardInfo';
import humanizeAmount from '@/helpers/humanizeAmount';
import parseUnits from '@/helpers/parseUnits';

const createMessage = (isWinner: boolean, amount: string) => ({
  title: isWinner ? 'You won! 🎉' : 'No luck this time 💔',
  content: isWinner ? (
    <p className="text-white text-md">
      Enjoy your <b className="text-success-400">${amount} win</b> <b>in your wallet</b>
    </p>
  ) : (
    <p className="text-sm text-neutral-200 px-0 md:px-5">
      You didn’t win this one, but you still got
      <span className="text-success-400"> +{amount}</span> $MONT in rewards.
    </p>
  ),
  buttonText: isWinner ? 'Got it' : 'Try the next',
});

const ResultMessage = ({ onCloseDialog }: { onCloseDialog: () => void }) => {
  const { guessedResult } = useTypedSelector((state) => state.bet);

  if (!guessedResult) return null;

  const {
    number,
    result: { isPlayerWinner, usdtAmount, montAmount },
  } = guessedResult;
  const amount = humanizeAmount(parseUnits(isPlayerWinner ? usdtAmount : montAmount, 6).toString());
  const message = createMessage(isPlayerWinner, amount);

  return (
    <>
      <Image
        src={`/images/cards/${getCardInfo(number)}.png`}
        width={160}
        height={223}
        className="mx-auto"
        alt=""
      />
      <h3 className="text-xl text-white text-center font-bold mt-6">{message.title}</h3>

      <div className="mt-2 text-center">{message.content}</div>

      {isPlayerWinner && (
        <div className="mt-6 bg-neutral-600 text-center text-base text-white font-medium rounded-lg py-1">
          <span className="text-white">
            +{humanizeAmount(parseUnits(montAmount, 6).toString())} MONT
          </span>
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
