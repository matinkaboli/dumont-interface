'use client';

import * as React from 'react';
import clsx from 'clsx';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import Icon from '../Icon';


function Accordion(
  {
    ...props
  }: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return <AccordionPrimitive.Root data-slot='accordion' {...props} />;
}

function AccordionItem(
  {
    className,
    ...props
  }: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot='accordion-item'
      className={clsx('border-b border-neutral-600 [&[data-state=open]]:border-primary-400', className)}
      {...props}
    />
  );
}

function AccordionTrigger(
  {
    className,
    children,
    ...props
  }: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className='flex'>
      <AccordionPrimitive.Trigger
        data-slot='accordion-trigger'
        className={clsx(
          'text-white focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-start justify-between gap-4 rounded-md py-6 text-left text-lg transition-all outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180 [&[data-state=open]>svg>path]:fill-primary-400',
          className,
        )}
        {...props}
      >
        {children}
        <Icon
          name='angle-down'
          color='#75757C'
          width="16"
          className='text-muted-foreground pointer-events-none size-4 shrink-0 translate-y-0.5 transition-transform duration-200' />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

function AccordionContent(
  {
    className,
    children,
    ...props
  }: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot='accordion-content'
      className='data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-base text-neutral-200'
      {...props}
    >
      <div className={clsx('pt-0 pb-6', className)}>{children}</div>
    </AccordionPrimitive.Content>
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
