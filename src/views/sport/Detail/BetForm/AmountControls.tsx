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
  isDisable?: boolean;
  trigger: (name?: keyof SportFormData | (keyof SportFormData)[]) => Promise<boolean>;
}

const AmountControls = (
  {
    control,
    touchedFields,
    errors,
    setValue,
    trigger,
    defaultMultiplierValue,
    betDetails,
    isDisable = false,
  }: Props) => {
  const { match } = useTypedSelector((state) => state.match.main);
  const { balance } = useTypedSelector((state) => state.account);
  const { minBetAmount, maxBetAmount } = useTypedSelector((state) => state.faro.bet);
  const selectedOutcome = control._formValues.outcome;
  const multiplier = control._formValues.multiplier;

  const getCurrentOdds = (): number => {
    if (!match?.latestOdds || selectedOutcome == null) return 0;
    const key = Outcome[selectedOutcome].toLowerCase() as OutcomeLabel;
    return match.latestOdds[key] ?? 0;
  };

  const getMaxValue = () => {
    const currentOdds = getCurrentOdds();
    const rate = multiplier * (100 / currentOdds);
    return ((maxBetAmount / rate) * 99) / 100;
  };

  const setMaxValue = () => {
    touchedFields.amount = true;
    const maxAllowed = getMaxValue();
    setValue('amount', String(maxAllowed), { shouldDirty: true, shouldValidate: true });
  };

  const onValidateInput = (value: any) => {
    if (balance && value > +balance) return 'Insufficient USDC balance';

    const currentOdds = getCurrentOdds();
    const maxPossibleAmount = getMaximumPossibleAmount({
      currentOdds: currentOdds,
      amount: value,
      multiplier,
    });

    if (maxPossibleAmount > maxBetAmount) {
      const maxAllowed = getMaxValue();

      return `Max bet is $${humanizeAmount(
        formatDecimal({ amount: maxAllowed, decimalPlaces: 2 }),
      )}`;
    }

    if (value < minBetAmount) return `Min bet is $${minBetAmount}`;

    return true;
  };

  const onOutcomeChange = (value: string) => {
    setValue('outcome', +value);
    trigger('amount');
  };

  const onMultiplierChange = (values: number[]) => {
    setValue('multiplier', values[0]);
    trigger('amount');
  };

  const { totalSize, liquidationPrice, selectedTeamOdds: entryPrice } = betDetails;
  const liquidationPriceText = ((liquidationPrice || 0) / 100).toFixed(2);
  const entryPriceText = ((entryPrice || 0) / 100).toFixed(2);

  const options = [
    {
      value: `${Outcome.Home}`,
      label: match?.homeTeam.name,
      logo: match?.homeTeam.logo,
      price: `$${((match?.latestOdds?.home ?? 0) / 100).toFixed(2)}`,
    },
    {
      value: `${Outcome.Draw}`,
      label: 'Draw',
      logo: '/images/draw.png',
      price: `$${((match?.latestOdds?.draw ?? 0) / 100).toFixed(2)}`,
    },
    {
      value: `${Outcome.Away}`,
      label: match?.awayTeam.name,
      logo: match?.awayTeam.logo,
      price: `$${((match?.latestOdds?.away ?? 0) / 100).toFixed(2)}`,
    },
  ];

  const details = [
    {
      id: '4',
      label: 'Entry price',
      value: entryPrice ? `$${entryPriceText}` : '$0.00',
    },
    {
      id: '3',
      label: 'Liquidation price',
      value: liquidationPrice ? `$${liquidationPriceText}` : '$0.00',
    },
    {
      id: '1',
      label: 'Position size',
      value: totalSize > 0 ? `$${totalSize.toFixed(2)}` : '0.00',
    },
  ];

  return (
    <>
      <Select
        defaultValue={`${Outcome.Home}`}
        onValueChange={onOutcomeChange}
        disabled={isDisable}
      >
        <SelectTrigger className='w-full'>
          <SelectValue placeholder='Select a option' />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {options.map(({ value, label, logo, price }) => (
              <SelectItem key={value} value={value}>
                <div className='flex items-center gap-1'>
                  <Image
                    width={0}
                    height={0}
                    sizes='100vw'
                    className='h-6 w-auto'
                    src={logo ?? '/images/draw.png'}
                    alt={label ?? ''}
                  />
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
          min={1}
          max={30}
          step={1}
          className='my-5'
          disabled={isDisable}
          onValueChange={onMultiplierChange}
        />
      </div>
      <AmountDetails details={details} />
    </>
  );
};

export default AmountControls;
