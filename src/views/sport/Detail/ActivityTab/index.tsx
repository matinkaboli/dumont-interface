'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components';

import Positions from './Positions';
import History from './History';

const ActivityTab = ({ className = '' }: { className?: string }) => {
  return (
    <Tabs defaultValue="positions" className={className} onChange={(e) => e.preventDefault()}>
      <TabsList className="sm:w-fit w-full">
        <TabsTrigger value="positions" className="sm:!min-w-[160px] sm:w-auto w-1/2">
          Active positions
        </TabsTrigger>
        <TabsTrigger value="history" className="sm:w-auto w-1/2">History</TabsTrigger>
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
