import { UseFormSetValue } from 'react-hook-form';
import { useEffect, useState } from 'react';

import { Key, RevealKey } from './Keys';
import { BetData } from '../.';

export interface KeyType {
  value: string;
  weight: number;
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

const KeyBoard = ({ setValue }: { setValue: UseFormSetValue<BetData> }) => {
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  const onClickKey = (value: string) => {
    const index = selectedKeys.indexOf(value);
    if (index !== -1) {
      setSelectedKeys((prevValues) => prevValues.filter((item) => item !== value));
    } else {
      setSelectedKeys((prevValues) => [...prevValues, value]);
    }
  };

  useEffect(() => {
    setValue('keys', selectedKeys);
  }, [selectedKeys]);

  return (
    <div className="grid grid-cols-5 gap-2">
      {keys.map((key) => (
        <Key
          key={key.value}
          value={key.value}
          weight={key.weight}
          isSelected={selectedKeys.includes(key.value)}
          onClick={() => onClickKey(key.value)}
        />
      ))}
      <RevealKey />
    </div>
  );
};

export default KeyBoard;
