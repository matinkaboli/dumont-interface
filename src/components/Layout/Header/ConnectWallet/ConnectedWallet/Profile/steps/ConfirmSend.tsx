import Image from 'next/image';
import { parseEther } from 'viem';
import { useDispatch } from 'react-redux';
import { useSendTransaction, useWaitForTransactionReceipt, useWriteContract } from 'wagmi';

import { Button, Icon } from '@/components';
import truncateString from '@/helpers/truncateString';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import ERC20_ABI from '@/abis/ERC20_ABI.json';
import formatUnits from '@/helpers/formatUnits';
import { closeDialog } from '@/redux/features/dialogSlice';

import AnimatedDialogContent from '@/views/_components/AnimatedDialogContent';
import LoadingContent from '@/views/_components/Dialog/LoadingContent';
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

  const {
    data: ethHash,
    isPending: isEthLoading,
    sendTransaction,
    isError: isEthError,
  } = useSendTransaction();

  const {
    isLoading: isWaitEthLoading,
    isSuccess: isEthConfirmed,
    isError: isWaitEthError,
  } = useWaitForTransactionReceipt({
    hash: ethHash,
  });

  const {
    writeContract: writeSend,
    data: hash,
    isPending: isSendLoading,
    isError: isSendError,
  } = useWriteContract();

  const {
    isLoading: isWaitSendLoading,
    isSuccess: isConfirmed,
    isError: isWaitSendError,
  } = useWaitForTransactionReceipt({
    hash,
  });

  const onConfirm = () => {
    removeSlideTitle();
    if (sendData!.token === 'USDC' || sendData!.token === 'MONT') {
      const amount = formatUnits(sendData!.amount, sendData!.token === 'USDC' ? 6 : 18).toString();
      const address = sendData!.token === 'USDC' ? details!.usdt : details!.mont;
      writeSend?.({
        address,
        abi: ERC20_ABI,
        functionName: 'transfer',
        args: [sendData?.address, amount],
      });
    }

    if (sendData!.token === 'ETH') {
      sendTransaction({
        to: sendData!.address as `0x${string}`,
        value: parseEther(sendData!.amount),
      });
    }
  };

  const onCloseDialog = () => dispatch(closeDialog());

  if (isSendLoading || isWaitSendLoading || isEthLoading || isWaitEthLoading) {
    return (
      <AnimatedDialogContent key="loading">
        <LoadingContent title="Waiting for the network" desc="It will take a few seconds" />
      </AnimatedDialogContent>
    );
  }

  if (isSendError || isWaitSendError || isEthError || isWaitEthError) {
    return (
      <AnimatedDialogContent key="error">
        <ErrorContent title="Send was unsuccessful" onClick={onCloseDialog} />
      </AnimatedDialogContent>
    );
  }

  if (isConfirmed || isEthConfirmed) {
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

      <Button fullWidth className="mt-6" radius="lg" onClick={onConfirm}>
        Confirm
      </Button>
    </div>
  );
};

export default ConfirmSend;
