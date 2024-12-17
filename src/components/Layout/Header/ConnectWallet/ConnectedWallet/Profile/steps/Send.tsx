import { Dispatch, SetStateAction, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Image from 'next/image';
import clsx from 'clsx';

import { Button, Icon, Input } from '@/components';
import { useTypedSelector } from '@/hooks/useTypedSelector';

import { SendData } from '../.';

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

interface Props {
  setSendData: Dispatch<SetStateAction<SendData | undefined>>;
  onNextSlide: () => void;
}

const Send = ({ onNextSlide, setSendData }: Props) => {
  const { balance } = useTypedSelector((state) => state.account);
  const [selectedToken, setSelectedToken] = useState(tokens[0].symbol);
  const { control, handleSubmit, setValue } = useForm<SendData>({
    mode: 'onChange',
    defaultValues: {
      amount: '',
      address: '',
      token: selectedToken,
    },
  });

  const onSubmit = (data: SendData) => {
    if (data) {
      setSendData(data);
      onNextSlide();
    }
  };

  const setMaxValue = () => {
    setValue('amount', balance ? `${balance}` : '0');
  };

  const onSetToken = (token: string) => {
    setSelectedToken(token);
    setValue('token', token);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex gap-3 mb-8 mt-6">
        {tokens.map((token) => (
          <button
            type="button"
            key={token.symbol}
            onClick={() => onSetToken(token.symbol)}
            className={clsx(
              'w-28 h-10 flex-center gap-2 text-white font-medium border text-sm rounded-xl transition-all duration-300 ease-in-out',
              selectedToken === token.symbol
                ? 'border-primary-250 bg-primary-600'
                : 'border-neutral-550 bg-transparent',
            )}
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
