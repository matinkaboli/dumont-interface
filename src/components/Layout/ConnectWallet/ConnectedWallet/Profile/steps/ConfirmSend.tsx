import { useState } from 'react';
import Image from 'next/image';
import { encodeFunctionData } from 'viem';
import { useDispatch } from 'react-redux';
import { useWaitForTransactionReceipt } from 'wagmi';
import { useSmartWallets } from '@privy-io/react-auth/smart-wallets';

import { Button, CopyToClipboard, Icon } from '@/components';
import truncateString from '@/helpers/truncateString';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import ERC20_ABI from '@/abis/ERC20_ABI.json';
import formatUnits from '@/helpers/formatUnits';
import { openDialog } from '@/redux/features/dialogSlice';

import AnimatedDialogContent from '@/views/_components/AnimatedDialogContent';
import ErrorContent from '@/views/_components/Dialog/ErrorContent';
import LoadingContent from '@/views/_components/Dialog/LoadingContent';

import SuccessModal from './SuccessModal';
import { SendData } from '../index';

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

  const { isLoading: isWaitTXLoading, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
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
              <ErrorContent title="Something went wrong!" />
            </AnimatedDialogContent>
          ),
        }),
      );
    }
    setIsTransferLoading(false);
  };

  const onConfirm = () => {
    removeSlideTitle();

    const amount = formatUnits(sendData!.amount, sendData!.token === 'USDC' ? 6 : 18).toFixed();
    const address = sendData!.token === 'USDC' ? details!.usdt : details!.mont;

    onTransfer({
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
    });
  };

  if (isTransferLoading || isWaitTXLoading) {
    return (
      <AnimatedDialogContent key="loading">
        <LoadingContent title="Waiting for the network" desc="It will take a few seconds" />
      </AnimatedDialogContent>
    );
  }

  if (isConfirmed) {
    return (
      <AnimatedDialogContent key="confirm">
        <SuccessModal sendData={sendData} />
      </AnimatedDialogContent>
    );
  }

  return (
    <div>
      <div className="bg-neutral-700 rounded-xl p-4 mt-8">
        <div className="flex gap-2 bg-neutral-750 rounded-xl px-4 py-2.5 font-bold text-xl text-white w-fit mx-auto">
          <Image
            width={24}
            height={24}
            src={`/images/tokens/${sendData!.token.toLowerCase()}.svg`}
            alt=""
          />
          {sendData?.amount}
        </div>

        <Icon name="arrow-down" color="#ADADB6" className="mx-auto my-4" />

        <CopyToClipboard
          showIcon={false}
          copyText={sendData!.address}
          className="flex gap-2 bg-neutral-750 rounded-xl px-4 py-2.5 font-medium text-md text-white w-fit mx-auto"
        >
          <Image src="/images/account.svg" width={24} height={24} alt="account" />
          {truncateString(sendData!.address, { leftChars: 8, rightChars: 8 })}
        </CopyToClipboard>
      </div>

      <Button
        fullWidth
        className="mt-6"
        radius="lg"
        onClick={onConfirm}
        disabled={isTransferLoading || isWaitTXLoading}
      >
        Confirm
      </Button>
    </div>
  );
};

export default ConfirmSend;
