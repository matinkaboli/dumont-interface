import { useEffect } from 'react';
import { useReadContract, useWaitForTransactionReceipt, useWriteContract } from 'wagmi';

import { useTypedSelector } from '@/hooks/useTypedSelector';
import formatUnits from '@/helpers/formatUnits';
import ERC20_ABI from '@/abis/ERC20_ABI.json';

export const useApproval = (
  contractAddress: `0x${string}` | undefined,
  onApproveSuccess: () => void,
  onError: () => void,
) => {
  const { address } = useTypedSelector((state) => state.account.profile);
  const { details } = useTypedSelector((state) => state.config);

  const { data: allowanceData, refetch: refetchAllowance } = useReadContract({
    address: details?.usdt,
    abi: ERC20_ABI,
    functionName: 'allowance',
    args: [address, contractAddress],
  });

  const {
    writeContract: writeApprove,
    data: hash,
    isPending: isApproveLoading,
    isError: isWriteApproveError,
  } = useWriteContract();

  const {
    isError: isWaitApproveError,
    isSuccess: isConfirmed,
    error,
  } = useWaitForTransactionReceipt({
    hash,
  });

  const sendApprove = (value: string) => {
    const approveValue = formatUnits(value, 6).toString();
    writeApprove?.({
      address: details!.usdt,
      abi: ERC20_ABI,
      functionName: 'approve',
      args: [contractAddress, approveValue],
    });
  };

  useEffect(() => {
    if (isWriteApproveError || isWaitApproveError) onError();
  }, [isWriteApproveError, isWaitApproveError]);

  useEffect(() => {
    if (isConfirmed) onApproveSuccess();
  }, [isConfirmed]);

  return {
    sendApprove,
    refetchAllowance,
    isApproveLoading,
    allowanceData,
  };
};
