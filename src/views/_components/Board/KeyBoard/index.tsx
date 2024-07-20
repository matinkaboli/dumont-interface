import { memo } from 'react';
import { UseFormSetValue } from 'react-hook-form';

import formatDecimal from '@/helpers/formatDecimal';

import Key from './Keys/Key';
import RevealKey from './Keys/RevealKey';
import { BetData, TOTAL_CARDS_LENGTH } from '../index';

export interface KeyType {
  value: string;
  number: string;
}

const keys: KeyType[] = [
  { value: '1', number: '0' },
  { value: '2', number: '1' },
  { value: '3', number: '2' },
  { value: '4', number: '3' },
  { value: '5', number: '4' },
  { value: '6', number: '5' },
  { value: '7', number: '6' },
  { value: '8', number: '7' },
  { value: '9', number: '8' },
  { value: '10', number: '9' },
  { value: 'J', number: '10' },
  { value: 'Q', number: '11' },
  { value: 'K', number: '12' },
];

interface Props {
  values: string[];
  setValue: UseFormSetValue<BetData>;
  validCardNumbersLength: number;
  cardOccurrences: { [key: string]: number };
}

const KeyBoard = ({ values, setValue, validCardNumbersLength, cardOccurrences }: Props) => {
  const calcWeight = (keyNumber: string) =>
    (TOTAL_CARDS_LENGTH - validCardNumbersLength) / cardOccurrences[keyNumber];

  const onClickKey = (value: string) => {
    const isSelected = values.includes(value);
    let newSelectedKeys: string[];

    if (isSelected) {
      newSelectedKeys = values.filter((key) => key !== value);
    } else if (values.length < keys.length - 1) {
      newSelectedKeys = [...values, value];
    } else {
      newSelectedKeys = values;
    }

    setValue('keys', newSelectedKeys);
  };

  return (
    <div className="grid grid-cols-5 gap-2">
      {keys.map((key) => (
        <Key
          key={key.value}
          value={key.value}
          weight={formatDecimal({ amount: calcWeight(key.number), decimalPlaces: 2 })}
          isSelected={values.includes(key.value)}
          onClick={() => onClickKey(key.value)}
        />
      ))}
      <RevealKey />
    </div>
  );
};

export default memo(KeyBoard);
