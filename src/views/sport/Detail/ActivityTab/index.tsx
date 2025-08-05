'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components';

import OpenPositions from './OpenPositions';
import ClosedPositions from './ClosedPositions';

const ActivityTab = ({ className = '' }: { className?: string }) => {
  return (
    <Tabs defaultValue="open" className={className} onChange={(e) => e.preventDefault()}>
      <TabsList className="sm:w-fit w-full">
        <TabsTrigger value="open" className="sm:!min-w-[160px] sm:w-auto w-1/2">
          Open Positions
        </TabsTrigger>
        <TabsTrigger value="closed" className="sm:w-auto w-1/2">Closed Positions</TabsTrigger>
      </TabsList>
      <TabsContent value="open">
        <OpenPositions />
      </TabsContent>
      <TabsContent value="closed">
        <ClosedPositions />
      </TabsContent>
    </Tabs>
  );
};

export default ActivityTab;
