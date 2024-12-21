import { Dispatch, SetStateAction, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Image from 'next/image';
import clsx from 'clsx';

import { Button, Icon, Input } from '@/components';

import { Balance, SendData, Token } from '../.';

interface TokenItem {
  icon: string;
  symbol: Token;
}

const tokens: TokenItem[] = [
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
  balances: Balance;
}

const validateAmount = (balance: number) => {
  return {
    required: 'Amount is required',
    validate: {
      noNonNumericChars: (value: string) => {
        if (/[^0-9.]/.test(value)) return 'Only numbers and decimal point are allowed';

        const numValue = Number(value);
        if (isNaN(numValue)) return 'Please enter a valid number';

        if (numValue <= 0) return 'Amount must be greater than 0';

        if (numValue > balance) return 'Amount exceeds available balance';

        return true;
      },
    },
  };
};

const validateAddress = {
  required: 'Wallet address is required',
  validate: {
    startsWithZeroX: (value: string) => {
      return value.startsWith('0x') || 'Address must start with 0x';
    },
    validFormat: (value: string) => {
      return /^0x[a-fA-F0-9]{40}$/.test(value) || 'Invalid wallet address format';
    },
  },
};

const Send = ({ onNextSlide, setSendData, balances }: Props) => {
  const [selectedToken, setSelectedToken] = useState<Token>(tokens[0].symbol);
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<SendData>({
    mode: 'onChange',
    defaultValues: {
      amount: '',
      address: '',
      token: selectedToken,
    },
  });

  const tokenBalances = {
    ETH: balances.eth,
    MONT: balances.mont,
    USDC: balances.usdc,
  };

  const onSubmit = (data: SendData) => {
    if (data) {
      setSendData(data);
      onNextSlide();
    }
  };

  const setMaxValue = () => {
    const amount = tokenBalances[selectedToken] ?? '0';
    setValue('amount', amount);
  };

  const onSetToken = (token: Token) => {
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
        rules={validateAmount(+tokenBalances[selectedToken]!)}
        render={({ field }) => (
          <Input variant="secondary" placeholder="0.00" errors={errors} {...field} />
        )}
      />

      <div className="mt-4">
        <Controller
          name="address"
          control={control}
          rules={validateAddress}
          render={({ field }) => (
            <Input variant="secondary" label="To" placeholder="0x..." errors={errors} {...field} />
          )}
        />
      </div>

      <Button type="submit" fullWidth className="mt-8" radius="lg">
        Send
      </Button>
    </form>
  );
};

export default Send;
