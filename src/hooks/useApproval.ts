import { useContractRead, useContractWrite, useWaitForTransaction } from 'wagmi';

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

  const { data: allowanceData } = useContractRead({
    address: details?.usdt,
    abi: ERC20_ABI,
    functionName: 'allowance',
    args: [address, contractAddress],
  });

  const {
    write: writeApprove,
    data: approveData,
    isLoading: isApproveLoading,
  } = useContractWrite({
    address: details?.usdt,
    abi: ERC20_ABI,
    functionName: 'approve',
    onError: onError,
  });

  useWaitForTransaction({
    chainId: details?.networkId,
    hash: approveData?.hash,
    onSuccess: onApproveSuccess,
    onError: onError,
  });

  const onApprove = (value: any) => {
    const approveValue = formatUnits(value, 6).toString();
    writeApprove?.({ args: [contractAddress, approveValue] });
  };

  return {
    onApprove,
    isApproveLoading,
    allowanceData,
  };
};
