import React from 'react';
import Key from './Key';

const keys = [
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

const KeyBoard = () => {
  return (
    <div className="grid grid-cols-5 gap-2">
      {keys.map((key) => (
        <Key key={key.value} value={key.value} weight={key.weight} />
      ))}
      <Key isSkip />
    </div>
  );
};

export default KeyBoard;
