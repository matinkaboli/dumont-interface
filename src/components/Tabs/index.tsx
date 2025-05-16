'use client';

import { ComponentPropsWithRef } from 'react';
import clsx from 'clsx';
import { motion } from 'motion/react';
import * as TabsPrimitive from '@radix-ui/react-tabs';

const Tabs = TabsPrimitive.Root;

const TabsList = ({ ref, className, ...props }: ComponentPropsWithRef<typeof TabsPrimitive.List>) => (
  <TabsPrimitive.List
    ref={ref}
    className={clsx(
      'inline-flex sm:gap-1 gap-4 items-center justify-center border-b-2 border-primary-800',
      className,
    )}
    {...props}
  />
);
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = ({ ref, className, children, ...props }: ComponentPropsWithRef<typeof TabsPrimitive.Trigger>) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={clsx(
      'text-md text-center text-neutral-300 transition ease-in duration-200 sm:min-w-[120px] min-w-max disabled:pointer-events-none disabled:opacity-50 data-[state=active]:text-primary-400 [&_.border-active]:data-[state=active]:bg-primary-400 [&_.border-active]:data-[state=inactive]:bg-transparent',
      className,
    )}
    {...props}
  >
    {children}
    <div className='h-0.5 bg-neutral-800 border-active mt-1.5 -mb-0.5 rounded-3xl transition ease-in duration-200' />
  </TabsPrimitive.Trigger>
);
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = ({ ref, className, children, ...props }: ComponentPropsWithRef<typeof TabsPrimitive.Content>) => (
  <TabsPrimitive.Content ref={ref} className={clsx('mt-6', className)} {...props}>
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 0.3 } }}
      exit={{ opacity: 0, y: 10, transition: { duration: 0.4 } }}
    >
      {children}
    </motion.div>
  </TabsPrimitive.Content>
);
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
