import Image from 'next/image';
import { useDispatch } from 'react-redux';

import { Button } from '@/components';
import { closeDialog } from '@/redux/features/dialogSlice';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import getCardInfo from '@/helpers/getCardInfo';
import { swiperRef } from '@/components/Carousel';

const successMessage = (amount: string) => ({
  title: 'You won! 🎉',
  content: (
    <p className="text-white text-md">
      Enjoy your <b className="text-success-400">${amount} win</b> <b>in your wallet</b>
    </p>
  ),
  buttonText: 'Got it',
});

const failureMessage = (amount: string) => ({
  title: 'No luck this time 💔',
  content: (
    <p className="text-sm text-neutral-200 px-0 md:px-5">
      You didn’t win this one, but you still got
      <span className="text-success-400"> +{amount}</span> $MONT in rewards.
    </p>
  ),
  buttonText: 'Try the next',
});

const ResultMessage = () => {
  const dispatch = useDispatch();
  const { guessedResult } = useTypedSelector((state) => state.bet);

  if (!guessedResult) {
    return null; // Handle case where guessedResult is null or undefined
  }

  const {
    number,
    result: { isPlayerWinner, usdtAmount, montAmount },
  } = guessedResult;
  const message = isPlayerWinner ? successMessage(usdtAmount) : failureMessage(montAmount);
  const onCloseDialog = () => {
    dispatch(closeDialog());
    // @ts-ignore
    swiperRef?.current?.slideNext();
  };

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
          <span className="text-white">+{montAmount} MONT</span>
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
