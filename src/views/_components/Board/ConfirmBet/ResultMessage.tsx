import Image from 'next/image';

import { Button, Icon } from '@/components';
import parseUnits from '@/helpers/parseUnits';
import getCardInfo from '@/helpers/getCardInfo';
import toFixedNumber from '@/helpers/toFixedNumber';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { openDialog } from '@/redux/features/dialogSlice';
import AnimatedDialogContent from '@/views/_components/AnimatedDialogContent';
import SocialShare from './SocialShare';

const createMessage = (isWinner: boolean, totalAmount: string, montAmount: string) => ({
  title: isWinner ? 'You won! 🎉' : 'No luck this time 💔',
  content: isWinner ? (
    <p className="text-neutral-300 text-base px-6">
      You’ll receive <b className="text-success-400">${totalAmount} win</b> in your wallet
      after in ~ 10 sec.
    </p>
  ) : (
    <p className="text-sm text-neutral-300 px-0 md:px-5">
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
  const dispatch = useDispatch<AppDispatch>();
  const { data } = useTypedSelector((state) => state.game);

  if (!data) return null;

  const isPlayerWinner = data.cards[cardIndex].result!.isPlayerWinner;
  const TOTALAmount = toFixedNumber(parseUnits(data.cards[cardIndex].totalAmount, 6).toString(), 2);
  const MONTAmount = toFixedNumber(
    parseUnits(data.cards[cardIndex].result!.montAmount, 18).toString(),
    4,
  );

  const message = createMessage(isPlayerWinner, TOTALAmount, MONTAmount);

  const onShare = () => {
    dispatch(
      openDialog({
        content: (
          <AnimatedDialogContent key="share">
            <SocialShare gameId={+data.id} cardIndex={cardIndex} />
          </AnimatedDialogContent>
        ),
      }),
    );
  };

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
        <div className="mt-6 bg-neutral-700 text-center text-base text-white rounded-lg py-2">
          <span className="font-medium">+{MONTAmount} MONT</span>
          <span> in reward.</span>
        </div>
      )}

      <Button fullWidth size="md" radius="lg" className="mt-8" onClick={onCloseDialog}>
        {message.buttonText}
      </Button>

      {isPlayerWinner && (
        <button
          type="button"
          className="text-neutral-400 text-base flex-center gap-2 font-semibold mt-7 w-fit mx-auto"
          onClick={onShare}
        >
          <Icon name="share" />
          Share in social
        </button>
      )}
    </>
  );
};
export default ResultMessage;
