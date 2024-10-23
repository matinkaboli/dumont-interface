import React from 'react';
import { Icon } from '@/components';

const AirdropButton = () => {
  return (
    <div className="border-primary-gradiant rounded-lg">
      <button
        type="button"
        className="flex-center bg-primary-800 rounded-lg w-10 h-10"
      >
        <Icon name="air-balloon-rainbow" />
      </button>
    </div>
  );
};

export default AirdropButton;
