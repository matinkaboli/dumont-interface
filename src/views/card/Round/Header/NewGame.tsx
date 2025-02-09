'use client';

import { usePrivy } from '@privy-io/react-auth';

import { useNewRound } from '@/hooks/useNewRound';
import { Button } from '@/components';

const NewGame = () => {
  const { onCreateRound } = useNewRound();
  const { ready, authenticated } = usePrivy();

  if (ready && authenticated) {
    return (
      <Button variant="neutral" size="sm" radius="lg" onClick={onCreateRound}>
        New game
      </Button>
    );
  }
};

export default NewGame;
