import { UseFormSetValue } from 'react-hook-form';
import { useEffect, useState } from 'react';

import { swiperRef } from '@/components/Carousel';
import { useTypedSelector } from '@/hooks/useTypedSelector';

import Key from './Key';
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
  const isConfirmed = useTypedSelector((state) => state.createRound.isConfirmed);
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

  const onSlideNext = () => {
    if (isConfirmed && swiperRef?.current) {
      // @ts-ignore
      swiperRef.current.slideNext();
    }
  };

  return (
    <div className="grid grid-cols-5 gap-2">
      {keys.map((key) => (
        <Key
          key={key.value}
          value={key.value}
          weight={key.weight}
          className={selectedKeys.includes(key.value) ? '!border-primary-250' : ''}
          onClick={() => onClickKey(key.value)}
        />
      ))}
      <Key isSkip onClick={onSlideNext} className="col-span-2" />
    </div>
  );
};

export default KeyBoard;
