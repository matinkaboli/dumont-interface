import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { usePrivy } from '@privy-io/react-auth';
import { encodeFunctionData, parseEther } from 'viem';

import { Button, Icon } from '@/components';
import truncateString from '@/helpers/truncateString';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import ERC20_ABI from '@/abis/ERC20_ABI.json';
import formatUnits from '@/helpers/formatUnits';
import { closeDialog } from '@/redux/features/dialogSlice';

import { SendData } from '../.';

const ConfirmSend = ({ sendData }: { sendData?: SendData }) => {
  const { sendTransaction, user } = usePrivy();
  const dispatch = useDispatch();
  const { details } = useTypedSelector((state) => state.config);
  console.log(sendData);

  const onConfirm = async () => {
    if (sendData!.token === 'USDC' || sendData!.token === 'MONT') {
      const amount = formatUnits(sendData!.amount, sendData!.token === 'USDC' ? 6 : 18).toString();
      const tx = await sendTransaction({
        to: details?.usdt,
        data: encodeFunctionData({
          abi: ERC20_ABI,
          functionName: 'transfer',
          args: [sendData?.address, amount],
        }),
      });

      console.log(tx);

      if (tx) dispatch(closeDialog());
    }

    if (sendData!.token === 'ETH') {
      const tx = await sendTransaction({
        to: sendData!.address,
        value: parseEther(sendData!.amount),
      });

      console.log(tx);

      if (tx) dispatch(closeDialog());
    }
  };

  return (
    <div>
      <div className="bg-neutral-600 rounded-xl p-4 mt-8">
        <div className="flex gap-2 bg-neutral-700 rounded-xl px-4 py-2.5 font-bold text-xl text-white w-fit mx-auto">
          <Image
            width={24}
            height={24}
            src={`/images/tokens/${sendData!.token.toLowerCase()}.svg`}
            alt=""
          />
          {sendData?.amount}
        </div>

        <Icon name="arrow-down" color="#ADADB6" className="mx-auto my-4" />

        <div className="flex gap-2 bg-neutral-700 rounded-xl px-4 py-2.5 font-medium text-md text-white w-fit mx-auto">
          <Image src="/images/account.svg" width={24} height={24} alt="account" />
          {truncateString(sendData!.address, { leftChars: 8, rightChars: 8 })}
        </div>
      </div>

      <div className="flex-between px-4 py-2 mt-3 text-base text-neutral-300 font-medium bg-neutral-600 rounded-xl">
        <div>Fee</div>
        <div>$0.3</div>
      </div>
      <Button fullWidth className="mt-6" radius="lg" onClick={onConfirm}>
        Confirm
      </Button>
    </div>
  );
};

export default ConfirmSend;
