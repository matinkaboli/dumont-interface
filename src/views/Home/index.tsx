'use client';

import { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { redirect, useParams, usePathname } from 'next/navigation';
import axios from 'axios';

import { getPlayerGames, redirectPlayer } from '@/redux/features/accountSlice';
import { AppDispatch } from '@/redux/store';
import timeLeftInSeconds from '@/helpers/timeLeftInSeconds';
import makeApiUrl from '@/helpers/makeApiUrl';
import { useTypedSelector } from '@/hooks/useTypedSelector';

import Board from '@/views/_components/Board';
import CardDeck from '@/views/_components/CardDeck';

import CreateRound from './Create';

const fetchReferrerAddress = async (id: string) => {
  try {
    const url = makeApiUrl(`referrals/${id}`);
    const response = await axios.get(url);
    console.log('Data:', response.data);
    // Add further processing or subsequent requests here
  } catch (error) {
    console.error('Error fetching referrer address:', error);
  }
};

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const params = useParams();
  const pathname = usePathname();
  const {
    profile: { isConnected, isConnecting, address },
    isRedirected,
    loading,
  } = useTypedSelector((state) => state.account);
  const [redirectId, setRedirectId] = useState<string>('');

  const hasReferralId = useMemo(() => params?.id && pathname.includes('/i/'), [params, pathname]);

  useEffect(() => {
    if (hasReferralId) {
      fetchReferrerAddress(params.id as string);
    }
  }, [hasReferralId]);

  useEffect(() => {
    if (address) {
      handlePlayerGames(address);
    }
  }, [address]);

  const handlePlayerGames = (addr: `0x${string}`) => {
    dispatch(getPlayerGames(addr))
      .unwrap()
      .then((result) => {
        const timeLeft = +result[0].duration - timeLeftInSeconds(result[0].createdAt);

        if (timeLeft > 0 && !isRedirected) {
          setRedirectId(result[0].id);
        } else {
          setRedirectId('');
        }
      })
      .finally(() => {
        dispatch(redirectPlayer(true));
      });
  };

  if (isConnecting || loading)
    return <div className="text-center text-white mt-16">Loading...</div>;

  if (redirectId) redirect(`/${redirectId}`);

  return (
    <div className="flex flex-col gap-4">
      {isConnected ? <CreateRound /> : <CardDeck />}

      <div className={isConnected ? 'md:block hidden' : ''}>
        <Board />
      </div>
    </div>
  );
};

export default Home;
