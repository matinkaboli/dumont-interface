import Image from 'next/image';
import { encodeFunctionData, parseEther } from 'viem';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { useWaitForTransactionReceipt } from 'wagmi';
import { useSmartWallets } from '@privy-io/react-auth/smart-wallets';

import { Button, Icon } from '@/components';
import truncateString from '@/helpers/truncateString';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import ERC20_ABI from '@/abis/ERC20_ABI.json';
import formatUnits from '@/helpers/formatUnits';
import { openDialog } from '@/redux/features/dialogSlice';

import AnimatedDialogContent from '@/views/_components/AnimatedDialogContent';
import ErrorContent from '@/views/_components/Dialog/ErrorContent';

import SuccessModal from './SuccessModal';
import { SendData } from '../.';

const ConfirmSend = ({
  sendData,
  removeSlideTitle,
}: {
  sendData?: SendData;
  removeSlideTitle: () => void;
}) => {
  const dispatch = useDispatch();
  const { details } = useTypedSelector((state) => state.config);
  const { client } = useSmartWallets();
  const [isTransferLoading, setIsTransferLoading] = useState(false);
  const [transferTx, setTransferTx] = useState('');

  const { isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash: transferTx as `0x${string}`,
  });

  const onTransfer = async (args: any) => {
    setIsTransferLoading(true);
    setTransferTx('');

    if (!client) return;

    try {
      const tx = await client.sendTransaction(args);
      setTransferTx(tx);
    } catch (error) {
      dispatch(
        openDialog({
          content: (
            <AnimatedDialogContent key="error">
              <ErrorContent title="Something went wrong" />
            </AnimatedDialogContent>
          ),
        }),
      );
    }
    setIsTransferLoading(false);
  };

  const getTXArgs = () => {
    const amount = formatUnits(sendData!.amount, sendData!.token === 'USDC' ? 6 : 18).toFixed();
    const address = sendData!.token === 'USDC' ? details!.usdt : details!.mont;

    if (sendData!.token === 'ETH') {
      return {
        to: sendData!.address as `0x${string}`,
        value: parseEther(sendData!.amount),
      };
    }

    return {
      account: client!.account,
      calls: [
        {
          to: address,
          data: encodeFunctionData({
            abi: ERC20_ABI,
            functionName: 'transfer',
            args: [sendData?.address, amount],
          }),
        },
      ],
    };
  };

  const onConfirm = () => {
    removeSlideTitle();
    const txArgs = getTXArgs();
    onTransfer(txArgs);
  };

  if (isConfirmed) {
    return (
      <AnimatedDialogContent key="confirm">
        <SuccessModal sendData={sendData} />
      </AnimatedDialogContent>
    );
  }

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

      <Button
        fullWidth
        className="mt-6"
        radius="lg"
        onClick={onConfirm}
        disabled={isTransferLoading}
      >
        Confirm
      </Button>
    </div>
  );
};

export default ConfirmSend;
