'use client';

import { useEffect, useMemo } from 'react';
import axios from 'axios';
import { useParams, usePathname } from 'next/navigation';

import { useTypedSelector } from '@/hooks/useTypedSelector';
import Board from '@/views/_components/Board';
import CardDeck from '@/views/_components/CardDeck';
import makeApiUrl from '@/helpers/makeApiUrl';

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
  const { isConnected, isConnecting } = useTypedSelector((state) => state.account.profile);
  const params = useParams();
  const pathname = usePathname();

  const hasReferralId = useMemo(() => params?.id && pathname.includes('/i/'), [params, pathname]);

  useEffect(() => {
    if (hasReferralId) {
      fetchReferrerAddress(params.id as string);
    }
  }, [hasReferralId]);

  if (isConnecting) return <div className="text-center text-white mt-16">Loading...</div>;

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
