import { PropsWithChildren } from 'react';

const SelectedKey = ({ children }: PropsWithChildren) => {
  return (
    <div className="bg-neutral-700 text-white text-md font-bold rounded-lg w-16 h-16 flex justify-center items-center">
      {children}
    </div>
  );
};

export default SelectedKey;
