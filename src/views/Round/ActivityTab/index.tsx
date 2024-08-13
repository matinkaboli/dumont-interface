'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components';

import Activities from './Activities';
import Discarded from './Discarded';

const ActivityTab = ({ className = '' }: { className?: string }) => {
  return (
    <Tabs defaultValue="activity" className={className} onChange={(e) => e.preventDefault()}>
      <TabsList>
        <TabsTrigger value="activity">Activity</TabsTrigger>
        <TabsTrigger value="discarded">Discarded</TabsTrigger>
      </TabsList>
      <TabsContent value="activity">
        <Activities />
      </TabsContent>
      <TabsContent value="discarded">
        <Discarded />
      </TabsContent>
    </Tabs>
  );
};

export default ActivityTab;
