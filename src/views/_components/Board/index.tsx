import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { postGuessedCard, setBetData } from '@/redux/features/betSlice';
import { AppDispatch } from '@/redux/store';

import KeyBoard from './KeyBoard';
import Amount from './Amount';
import { useTypedSelector } from '@/hooks/useTypedSelector';

export interface BetData {
  amount: string;
  keys: string[];
}

const Board = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data: game, activeCardIndex } = useTypedSelector((state) => state.game);
  const {
    control,
    handleSubmit,
    setValue,
    formState: { isDirty, isValid, errors },
  } = useForm<BetData>({
    mode: 'onChange',
    defaultValues: {
      amount: '',
      keys: [],
    },
  });

  const onSubmit: SubmitHandler<BetData> = (data) => {
    dispatch(setBetData(data));

    dispatch(
      postGuessedCard({
        id: game!.id,
        cardId: game!.cards[activeCardIndex - 1]._id,
        body: { tx: '0xe53c674cd5edd0e0f54921fa8bdf0debd972efae758e2d29dd17ff4598410136' },
      }),
    );
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid md:grid-cols-3 grid-cols-1 md:gap-x-4 gap-x-0 md:gap-y-0 gap-y-4"
    >
      <div className="col-span-2 md:order-1 order-2">
        <KeyBoard setValue={setValue} />
      </div>
      <div className="col-span-1 md:order-2 order-1">
        <Amount inputErrors={errors} control={control} disabledButton={!isValid || !isDirty} />
      </div>
    </form>
  );
};

export default Board;
