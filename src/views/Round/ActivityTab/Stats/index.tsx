import React from 'react';

const Stats = () => {
  return (
    <div className="bg-neutral-750 md:px-6 px-4 md:pt-6 pt-4 md:pb-10 pb-8 rounded-lg">
      <div className="border border-neutral-600 px-4 py-3 rounded-lg w-fit">
        <div>
          <span className="text-base text-white">PNL</span>
          <span className="text-neutral-300 text-xs pl-1">(Profit and Loss)</span>
        </div>
        <div className="font-bold text-white mt-2">+$70</div>
      </div>

      <div className="flex mt-6 rounded-xl h-[70px] max-w-[473px] w-full overflow-hidden">
        <div className="bg-success-700 flex flex-col justify-center w-[80%] p-2">
          <div className="font-semibold text-white text-md text-center">+ $80</div>
          <div className="font-semibold text-white text-sm text-center">WIN</div>
        </div>
        <div className="bg-error-800 flex flex-col justify-cente w-[20%] p-2 text-center">
          <div className="font-semibold text-white text-md text-center">- $10</div>
          <div className="font-semibold text-white text-sm text-center">Lost</div>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default Stats;
