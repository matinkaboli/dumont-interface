'use client';

import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { getDiscardedCards } from '@/redux/features/discardedSlice';
import { AppDispatch } from '@/redux/store';

import Activities from './Activities';
import Discarded from './Discarded';
import Stats from './Stats';
import clsx from 'clsx';

const ActivityTab = ({ className = '' }: { className?: string }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { data: game } = useTypedSelector((state) => state.game);
  const { cards } = useTypedSelector((state) => state.discarded);
  const [activeTab, setActiveTab] = useState('');

  useEffect(() => {
    if (game?.id) dispatch(getDiscardedCards(game.id));
  }, [game]);

  return (
    <Tabs
      defaultValue="activity"
      className={className}
      onChange={(e) => e.preventDefault()}
      onValueChange={(value) => setActiveTab(value)}
    >
      <TabsList>
        <TabsTrigger value="activity">Activity</TabsTrigger>
        <TabsTrigger value="discarded">
          Discarded
          <span
            className={clsx(
              'font-medium text-sm inline-flex items-center justify-center w-6 h-6 rounded-full ml-1',
              activeTab === 'discarded' ? 'bg-primary-800' : 'bg-neutral-750 !text-neutral-500',
            )}
          >
            {cards?.length}
          </span>
        </TabsTrigger>
        <TabsTrigger value="stats">Stats</TabsTrigger>
      </TabsList>
      <TabsContent value="activity">
        <Activities />
      </TabsContent>
      <TabsContent value="discarded">
        <Discarded />
      </TabsContent>
      <TabsContent value="stats">
        <Stats />
      </TabsContent>
    </Tabs>
  );
};

export default ActivityTab;
