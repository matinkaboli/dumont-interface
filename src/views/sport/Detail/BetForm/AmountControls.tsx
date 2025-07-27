import { Control, FieldErrors, UseFormSetValue } from 'react-hook-form';
import Image from 'next/image';

import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue, Slider } from '@/components';
import { useTypedSelector } from '@/hooks/useTypedSelector';

import AmountInput from '@/views/_components/AmountInput';
import AmountDetails from '@/views/_components/AmountDetails';

import { SportFormData } from './index';

const amountDetails = [
  { id: '1', label: 'Total size', value: '0.00' },
  { id: '2', label: 'Fee per minute', value: '0.00' },
  { id: '3', label: 'Liquidation price', value: '0.00' },
];

interface Props {
  control: Control<SportFormData>;
  touchedFields: Partial<{ amount?: boolean | undefined }>;
  errors: FieldErrors<SportFormData>;
  setValue: UseFormSetValue<SportFormData>;
}

const AmountControls = ({ control, touchedFields, errors, setValue }: Props) => {
  const { match } = useTypedSelector((state) => state.match.main);

  const options = [
    {
      value: 'option1',
      label: match?.homeTeam.name,
      logo: match?.homeTeam.logo,
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
      label: match?.awayTeam.name,
      logo: match?.awayTeam.logo,
      price: '$0.35',
    },
  ];

  return (
    <>
      <Select defaultValue='option1'>
        <SelectTrigger className='w-full'>
          <SelectValue placeholder='Select a option' />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {options.map(({ value, label, logo, price }) => (
              <SelectItem key={value} value={value}>
                <div className='flex items-center gap-1'>
                  {logo ? (
                    <Image
                      width={0}
                      height={0}
                      sizes='100vw'
                      className='h-6 w-auto'
                      src={logo}
                      alt=''
                    />
                  ) : (
                    <span className='block w-4 h-0.5 bg-neutral-200' />
                  )}
                  {label}
                  <div className='text-xs text-white font-bold bg-primary-700 rounded-full py-0.5 px-1.5'>
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
        />
        <Slider defaultValue={[2]} max={30} step={1} className='my-5' />
      </div>
      <AmountDetails details={amountDetails} />
    </>
  );
};

export default AmountControls;
