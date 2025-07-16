import { Dispatch, SetStateAction, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { Button, Icon, Input } from '@/components';

import { Balance, SendData, Token } from '../index';

interface TokenItem {
  icon: string;
  symbol: Token;
}

const USDCToken: TokenItem = {
  icon: '/images/tokens/usdc.svg',
  symbol: 'USDC',
};

interface Props {
  balances: Balance;
  onNextSlide: () => void;
  setSendData: Dispatch<SetStateAction<SendData | undefined>>;
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
  const [selectedToken] = useState<Token>(USDCToken.symbol);
  const {
    control,
    handleSubmit,
    setValue,
    trigger,
    formState: { isDirty, isValid, errors },
  } = useForm<SendData>({
    mode: 'onChange',
    defaultValues: {
      amount: '',
      address: '',
      token: selectedToken,
    },
  });

  const tokenBalances = {
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
    trigger('amount');
  };

  const handlePaste = async () => {
    if (navigator.clipboard) {
      const text = await navigator.clipboard.readText();
      setValue('address', text);
      trigger('address');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='pt-6'>
      <Controller
        name='address'
        control={control}
        rules={validateAddress}
        render={({ field }) => (
          <Input
            variant='secondary'
            label='To'
            placeholder='0x...'
            className='!pr-12'
            rightSection={
              <button
                type='button'
                onClick={handlePaste}
                className='text-neutral-400 text-sm font-medium'
              >
                Paste
              </button>
            }
            rightSectionPointerEvents='auto'
            errors={errors}
            {...field}
          />
        )}
      />

      <div className='flex justify-between mt-4 mb-2'>
        <div className='font-medium text-sm text-white'>Amount</div>
        <button
          type='button'
          className='flex items-center gap-0.5 font-medium text-xs text-primary-300'
          onClick={setMaxValue}
        >
          Max
          <Icon name='caret-up' color='#CD3FCD' />
        </button>
      </div>
      <Controller
        name='amount'
        control={control}
        rules={validateAmount(+tokenBalances[selectedToken]!)}
        render={({ field }) => (
          <Input
            variant='secondary'
            placeholder='0.00'
            rightSection={<p className='text-neutral-400 text-sm font-medium'>USDC</p>}
            errors={errors}
            {...field}
          />
        )}
      />

      <Button type='submit' fullWidth className='mt-8' radius='lg' disabled={!isValid || !isDirty}>
        Send
      </Button>
    </form>
  );
};

export default Send;
