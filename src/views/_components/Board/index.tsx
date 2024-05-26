import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { postGuessedCard, setBetData } from '@/redux/features/betSlice';
import { AppDispatch } from '@/redux/store';

import KeyBoard from './KeyBoard';
import Amount from './Amount';

export interface BetData {
  amount: string;
  keys: string[];
}

const Board = () => {
  const dispatch = useDispatch<AppDispatch>();
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
    const id = '32';
    const cardId = '10';
    dispatch(setBetData(data));
    dispatch(
      postGuessedCard({
        id,
        cardId,
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
