import { Control, FieldErrors, UseFormSetValue } from 'react-hook-form';
import Image from 'next/image';

import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue, Slider } from '@/components';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import formatDecimal from '@/helpers/formatDecimal';
import { Outcome } from '@/constants/static';
import humanizeAmount from '@/helpers/humanizeAmount';

import AmountInput from '@/views/_components/AmountInput';
import AmountDetails from '@/views/_components/AmountDetails';
import { getMaximumPossibleAmount } from '@/views/sport/Detail/helpers';

import { BetDetails, OutcomeLabel, SportFormData } from './index';

interface Props {
  control: Control<SportFormData>;
  touchedFields: Partial<{ amount?: boolean | undefined }>;
  errors: FieldErrors<SportFormData>;
  setValue: UseFormSetValue<SportFormData>;
  defaultMultiplierValue: number;
  betDetails: BetDetails;
}

const AmountControls = ({ control, touchedFields, errors, setValue, defaultMultiplierValue, betDetails }: Props) => {
  const { match } = useTypedSelector((state) => state.match.main);
  const { balance } = useTypedSelector((state) => state.account);
  const { minBetAmount, maxBetAmount } = useTypedSelector((state) => state.faro.bet);

  const options = [
    {
      value: `${Outcome.Home}`,
      label: match?.homeTeam.name,
      logo: match?.homeTeam.logo,
      price: `${match?.latestOdds?.home ?? 0}%`,
    },
    {
      value: `${Outcome.Draw}`,
      label: 'Draw',
      logo: null,
      price: `${match?.latestOdds?.draw ?? 0}%`,
    },
    {
      value: `${Outcome.Away}`,
      label: match?.awayTeam.name,
      logo: match?.awayTeam.logo,
      price: `${match?.latestOdds?.away ?? 0}%`,
    },
  ];

  const details = [
    {
      id: '1',
      label: 'Total size',
      value: `$${formatDecimal({ amount: betDetails.totalSize, decimalPlaces: 2 })}`,
    },
    {
      id: '2',
      label: 'Fee per minute',
      value: `$${formatDecimal({ amount: betDetails.feePerMinute, decimalPlaces: 2 })}`,
    },
    {
      id: '3',
      label: 'Liquidation price',
      value: `${formatDecimal({ amount: betDetails.liquidationPrice, decimalPlaces: 2 })}%`,
    },
  ];

  const getCurrentOdds = () => {
    const selectedTeam = Outcome[control._formValues.outcome].toLowerCase() as OutcomeLabel;
    return match!.latestOdds[selectedTeam];
  };

  const onValidateInput = (value: any) => {
    if (balance && value > +balance) return 'Insufficient USDC balance';

    const currentOdds = getCurrentOdds();
    const maxPossibleAmount = getMaximumPossibleAmount({
      currentOdds: currentOdds,
      amount: value,
      multiplier: control._formValues.multiplier,
    });

    if (maxPossibleAmount > maxBetAmount)
      return `Max bet is $${humanizeAmount(
        formatDecimal({ amount: maxPossibleAmount, decimalPlaces: 2 }),
      )}`;

    if (value < minBetAmount) return `Min bet is $${minBetAmount}`;

    return true;
  };

  const setMaxValue = () => {
    touchedFields.amount = true;

    const currentOdds = getCurrentOdds();

    const maxPossibleAmount = getMaximumPossibleAmount({
      currentOdds: currentOdds,
      amount: maxBetAmount,
      multiplier: control._formValues.multiplier,
    }).toString();

    setValue('amount', maxPossibleAmount, { shouldDirty: true, shouldValidate: true });
  };

  return (
    <>
      <Select defaultValue={`${Outcome.Home}`} onValueChange={(value) => setValue('outcome', +value)}>
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
                      alt={label ?? ''}
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
          setMaxValue={setMaxValue}
          onValidate={onValidateInput}
        />
        <Slider
          defaultValue={[defaultMultiplierValue]}
          max={30}
          step={1}
          className='my-5'
          onValueChange={(values) => setValue('multiplier', values[0])}
        />
      </div>
      <AmountDetails details={details} />
    </>
  );
};

export default AmountControls;
