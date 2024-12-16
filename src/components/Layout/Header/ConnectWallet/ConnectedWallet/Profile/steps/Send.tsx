import { Controller, useForm } from 'react-hook-form';
import Image from 'next/image';

import { Button, Icon, Input } from '@/components';
import { useTypedSelector } from '@/hooks/useTypedSelector';

interface FormData {
  amount: string;
  address: string;
}

const tokens = [
  {
    icon: '/images/tokens/usdc.svg',
    symbol: 'USDC',
  },
  {
    icon: '/images/tokens/eth.svg',
    symbol: 'ETH',
  },
  {
    icon: '/images/tokens/mont.svg',
    symbol: 'MONT',
  },
];

const Send = ({onNextSlide}: {onNextSlide : () => void}) => {
  const { balance } = useTypedSelector((state) => state.account);
  const {
    control,
    handleSubmit,
    setValue,
  } = useForm<FormData>({
    mode: 'onChange',
    defaultValues: {
      amount: '',
      address: '',
    },
  });

  function onSubmit(data: FormData) {
    console.log(data);
    onNextSlide();
  }

  const setMaxValue = () => {
    setValue('amount', balance ? `${balance}` : '0');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex gap-3 mb-8 mt-6">
        {tokens.map((token) => (
          <button
            type="button"
            key={token.symbol}
            className="w-28 h-10 flex-center gap-2 text-white font-medium border border-neutral-550 text-sm rounded-xl"
          >
            <Image width={24} height={24} src={token.icon} alt="" />
            {token.symbol}
          </button>
        ))}
      </div>

      <div className="flex justify-between mb-2">
        <div className="font-medium text-sm text-white">Amount</div>
        <button
          type="button"
          className="flex items-center gap-0.5 font-medium text-xs text-primary-250"
          onClick={setMaxValue}
        >
          Max
          <Icon name="caret-up" />
        </button>
      </div>

      <Controller
        name="amount"
        control={control}
        rules={{
          required: true,
        }}
        render={({ field }) => <Input variant="secondary" placeholder="0.00" {...field} />}
      />

      <div className="mt-4">
        <Controller
          name="address"
          control={control}
          rules={{
            required: true,
          }}
          render={({ field }) => (
            <Input variant="secondary" label="To" placeholder="0x..." {...field} />
          )}
        />
      </div>

      <div className="flex justify-between items-center mt-6">
        <div className="text-white text-base font-medium">Fee</div>
        <div className="text-neutral-300 text-base font-medium">$0.3</div>
      </div>

      <Button type="submit" fullWidth className="mt-8" radius="lg">
        Send
      </Button>
    </form>
  );
};

export default Send;
