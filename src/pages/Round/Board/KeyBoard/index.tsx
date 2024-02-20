import { UseFormSetValue } from 'react-hook-form';
import { useState } from 'react';

import Key from './Key';
import { AmountForm } from '../.';

export interface KeyType {
  value: string;
  weight?: number;
}

const keys: KeyType[] = [
  { value: '1', weight: 2 },
  { value: '2', weight: 3.1 },
  { value: '3', weight: 6.4 },
  { value: '4', weight: 2 },
  { value: '5', weight: 5.8 },
  { value: '6', weight: 1.6 },
  { value: '7', weight: 2 },
  { value: '8', weight: 2.6 },
  { value: '9', weight: 3.7 },
  { value: '10', weight: 2 },
  { value: 'J', weight: 6.3 },
  { value: 'Q', weight: 2.6 },
  { value: 'K', weight: 3.4 },
];

const KeyBoard = ({ setValue }: { setValue: UseFormSetValue<AmountForm> }) => {
  const [values, setValues] = useState<string[]>([]);

  const handleClick = (value: string) => {
    const index = values.indexOf(value);
    if (index !== -1) {
      setValues((prevValues) => prevValues.filter((item) => item !== value));
    } else {
      setValues((prevValues) => [...prevValues, value]);
    }

    setValue('keys', values);
  };

  return (
    <div className="grid grid-cols-5 gap-2">
      {keys.map((key) => (
        <Key
          key={key.value}
          value={key.value}
          weight={key.weight}
          className={values.includes(key.value) ? '!border-primary-250' : ''}
          onClick={() => handleClick(key.value)}
        />
      ))}
      <Key isSkip value="" className="col-span-2" />
    </div>
  );
};

export default KeyBoard;
