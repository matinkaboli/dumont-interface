import { SubmitHandler, useForm } from 'react-hook-form';

import KeyBoard from './KeyBoard';
import Amount from './Amount';

export interface AmountForm {
  amount: string;
  keys: string[];
}

const Board = () => {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { isDirty, isValid },
  } = useForm<AmountForm>({
    mode: 'onChange',
    defaultValues: {
      amount: '',
      keys: [],
    },
  });

  const onSubmit: SubmitHandler<AmountForm> = (data) => {
    console.log(data);
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
        <Amount control={control} disabledButton={!isValid || !isDirty} />
      </div>
    </form>
  );
};

export default Board;
