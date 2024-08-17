import { useEffect, useState } from 'react';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { useWaitForTransactionReceipt, useWriteContract } from 'wagmi';
import BN from 'bignumber.js';

import { Button } from '@/components';
import { closeDialog, openDialog, updateDialogContent } from '@/redux/features/dialogSlice';
import { AppDispatch } from '@/redux/store';
import { postGame } from '@/redux/features/gameSlice';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { useApproval } from '@/hooks/useApproval';
import extractGameId from '@/helpers/extractGameId';
import GAME_FACTORY_ABI from '@/abis/GAME_FACTORY_ABI.json';
import formatUnits from '@/helpers/formatUnits';
import axios from '@/lib/axios';
import Routes from '@/constants/routes';

import AnimatedDialogContent from '@/views/_components/AnimatedDialogContent';
import LoadingContent from '@/views/_components/Dialog/LoadingContent';
import LongLoadingContent from '@/views/_components/Dialog/LongLoadingContent';
import ErrorContent from '@/views/_components/Dialog/ErrorContent';
import ApproveAllowance from '@/views/_components/Dialog/ApproveAllowance';

import Confirm from './Confirm';

const approveValue = '1';
const defaultAddress = '0x0000000000000000000000000000000000000000';

const ConfirmRound = () => {
  const router = useRouter();
  const params = useParams();
  const pathname = usePathname();
  const dispatch = useDispatch<AppDispatch>();
  const { details } = useTypedSelector((state) => state.config);
  const { address } = useTypedSelector((state) => state.account.profile);
  const [redirectId, setRedirectId] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0); // The active index corresponds to the index in the long loading array.
  const [referralAddress, setReferralAddress] = useState<`0x${string}`>();
  const { allowanceData, sendApprove, isApproveLoading } = useApproval(
    details?.gameFactory,
    onApproveSuccess,
    onApproveError,
  );

  const {
    writeContract: writeCreateGame,
    data: hash,
    isPending: isCreateGameLoading,
    isError: isWriteGameError,
  } = useWriteContract();

  const {
    data: receiptData,
    isSuccess: isConfirmed,
    isError: isWaitGameError,
  } = useWaitForTransactionReceipt({
    hash,
  });

  useEffect(() => {
    const hasReferralId = params?.id && pathname.includes('/i/');
    const getReferral = async () => {
      if (hasReferralId) {
        try {
          const response = await axios.get(`referrals/${params.id}`);
          const referralAddress = response?.data?.result?.address;
          if (referralAddress === address) {
            setReferralAddress(defaultAddress);
          } else {
            setReferralAddress(referralAddress);
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    };

    getReferral();
  }, [params.id, pathname]);

  useEffect(() => {
    if (isApproveLoading || isCreateGameLoading) {
      dispatch(
        openDialog({
          dialogProps: { showCloseButton: false, disableEvents: true },
          content: (
            <AnimatedDialogContent key="loading">
              {isApproveLoading ? (
                <LoadingContent title="Waiting for the network" desc="It will take a few seconds" />
              ) : (
                <LongLoadingContent activeIndex={activeIndex} />
              )}
            </AnimatedDialogContent>
          ),
        }),
      );
    }
  }, [isApproveLoading, isCreateGameLoading]);

  useEffect(() => {
    dispatch(
      updateDialogContent(
        <AnimatedDialogContent key="loading">
          <LongLoadingContent activeIndex={activeIndex} />
        </AnimatedDialogContent>,
      ),
    );

    if (activeIndex === 3) {
      const timer = setTimeout(() => {
        setActiveIndex(4);
      }, 2000);

      return () => clearTimeout(timer);
    } else if (activeIndex === 4) {
      const redirectTimer = setTimeout(() => {
        dispatch(closeDialog());
        router.push(`${Routes.ROUND}/${redirectId}`);
      }, 1000);

      return () => clearTimeout(redirectTimer);
    }
  }, [activeIndex]);

  useEffect(() => {
    if (isConfirmed && receiptData) {
      const id = extractGameId(receiptData.logs);
      setRedirectId(id);
      onCreateGameSuccess(id);
    }
  }, [isConfirmed, receiptData]);

  useEffect(() => {
    if (isWriteGameError || isWaitGameError) {
      onError('Creating was unsuccessful', onCreateGame);
    }
  }, [isWriteGameError, isWaitGameError]);

  function onApproveSuccess() {
    dispatch(
      openDialog({
        dialogProps: { showCloseButton: false, disableEvents: true },
        content: (
          <AnimatedDialogContent key="confirm">
            <Confirm onCreateGame={onCreateGame} />
          </AnimatedDialogContent>
        ),
      }),
    );
  }

  function onCreateGameSuccess(id: number) {
    setActiveIndex(2);

    const timer = setTimeout(() => {
      dispatch(postGame({ id }))
        .unwrap()
        .then(() => setActiveIndex(3))
        .catch(() => onError('Game creation was unsuccessful', onCreateGame));
    }, 5000);

    return () => clearTimeout(timer);
  }

  function onError(title: string, func: () => void) {
    dispatch(
      openDialog({
        content: (
          <AnimatedDialogContent key="error">
            <ErrorContent title={title} onClick={func} />
          </AnimatedDialogContent>
        ),
      }),
    );
  }

  function onApproveError() {
    onError('Approve was unsuccessful', () => sendApprove(approveValue));
  }

  const onCreateGame = () => {
    writeCreateGame?.(
      {
        address: details!.gameFactory,
        abi: GAME_FACTORY_ABI,
        functionName: 'createGame',
        args: [referralAddress ?? defaultAddress],
      },
      {
        onSuccess: () => setActiveIndex(1),
      },
    );
  };

  const onCreateRound = () => {
    const isApproved = new BN(allowanceData as string).isGreaterThanOrEqualTo(
      formatUnits(approveValue, 6),
    );

    dispatch(
      openDialog({
        content: isApproved ? (
          <Confirm onCreateGame={onCreateGame} />
        ) : (
          <ApproveAllowance onApprove={() => sendApprove(approveValue)} />
        ),
      }),
    );
  };

  return (
    <Button
      variant="primary"
      size="sm"
      radius="lg"
      onClick={onCreateRound}
      className="mt-4 mx-auto !font-bold md:w-auto w-full"
    >
      Create Round
    </Button>
  );
};

export default ConfirmRound;
