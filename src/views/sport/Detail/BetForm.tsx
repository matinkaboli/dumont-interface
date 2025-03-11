'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Slider,
} from '@/components';

import AmountInput from '@/views/_components/AmountInput';
import AmountDetails from '@/views/_components/AmountDetails';
import BetButton from '@/views/_components/BetButton';

import { awayTeam, homeTeam } from './index';

interface SportFormData {
  amount: string;
}

const amountDetails = [
  { id: '1', label: 'Total size', value: '0.00' },
  { id: '2', label: 'Fee per minute', value: '0.00' },
  { id: '3', label: 'Liquidation price', value: '0.00' },
];

const options = [
  {
    value: 'option1',
    label: homeTeam.name,
    logo: homeTeam.logo,
    price: '$0.43',
  },
  {
    value: 'option2',
    label: 'Draw',
    logo: null,
    price: '$0.22',
  },
  {
    value: 'option3',
    label: awayTeam.name,
    logo: awayTeam.logo,
    price: '$0.35',
  },
];

const BetForm = () => {
  const [amount, setAmount] = useState();

  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm<SportFormData>({
    mode: 'onChange',
    defaultValues: {
      amount: '',
    },
  });

  const onSubmit = (data: SportFormData) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col justify-between bg-primary-900 bordr-[1.5px] border-primary-700 rounded-lg col-span-1 p-4"
    >
      <Select defaultValue="option1">
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a option" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {options.map(({ value, label, logo, price }) => (
              <SelectItem key={value} value={value}>
                <div className="flex items-center gap-1">
                  {logo ? (
                    <Image
                      width={0}
                      height={0}
                      sizes="100vw"
                      className="h-6 w-auto"
                      src={logo}
                      alt=""
                    />
                  ) : (
                    <span className="block w-4 h-0.5 bg-neutral-200" />
                  )}
                  {label}
                  <div className="text-xs text-white font-bold bg-primary-700 rounded-full py-0.5 px-1.5">
                    {price}
                  </div>
                </div>
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <div>
        <AmountInput
          control={control}
          touchedFields={touchedFields}
          inputErrors={errors}
          totalOdds={8}
          setValue={setValue}
          setAmount={setAmount}
        />
        <Slider defaultValue={[2]} max={30} step={1} className="my-5" />
      </div>
      <AmountDetails details={amountDetails} />
      <BetButton disabledButtonLabel="Bet" />
    </form>
  );
};

export default BetForm;
