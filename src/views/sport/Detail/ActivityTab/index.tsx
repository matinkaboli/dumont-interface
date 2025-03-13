'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components';

import Positions from './Positions';
import History from './History';

const ActivityTab = ({ className = '' }: { className?: string }) => {
  return (
    <Tabs defaultValue="positions" className={className} onChange={(e) => e.preventDefault()}>
      <TabsList>
        <TabsTrigger value="positions" className="sm:!min-w-[160px]">
          Active positions
        </TabsTrigger>
        <TabsTrigger value="history">History</TabsTrigger>
      </TabsList>
      <TabsContent value="positions">
        <Positions />
      </TabsContent>
      <TabsContent value="history">
        <History />
      </TabsContent>
    </Tabs>
  );
};

export default ActivityTab;
