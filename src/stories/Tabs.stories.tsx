import type { Meta } from '@storybook/react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components';

const meta = {
  title: 'Tabs',
  component: Tabs,
  parameters: {
    layout: 'centered',
    inspectComponents: [Tabs],
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Tabs>;

export default meta;

export function Basic() {
  return (
    <Tabs defaultValue="account" className="text-white w-[400px]">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">Make changes to your account here.</TabsContent>
      <TabsContent value="password">Change your password here.</TabsContent>
    </Tabs>
  );
}
