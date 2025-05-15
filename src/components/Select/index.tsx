'use client';

import { ComponentPropsWithRef } from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';
import clsx from 'clsx';

import { Icon } from '@/components';

const Select = SelectPrimitive.Root;

const SelectGroup = SelectPrimitive.Group;

const SelectValue = SelectPrimitive.Value;

const SelectTrigger = (
  {
    ref,
    className,
    children,
    ...props
  }: ComponentPropsWithRef<typeof SelectPrimitive.Trigger>) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={clsx(
      'flex-between h-10 rounded-lg cursor-pointer border border-primary-400 bg-primary-900 px-2.5 py-2 text-sm text-white data-[placeholder]:text-muted-foreground focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1',
      className,
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <Icon name='angle-down' width='16' height='16' color='#fff' />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
);
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

const SelectScrollUpButton = (
  {
    ref,
    className,
    ...props
  }: ComponentPropsWithRef<typeof SelectPrimitive.ScrollUpButton>) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={clsx('flex cursor-default items-center justify-center py-1', className)}
    {...props}
  >
    <Icon name='angle-up' width='16' height='16' color='#fff' />
  </SelectPrimitive.ScrollUpButton>
);
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;

const SelectScrollDownButton = (
  {
    ref,
    className,
    ...props
  }: ComponentPropsWithRef<typeof SelectPrimitive.ScrollDownButton>) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={clsx('flex cursor-default items-center justify-center py-1', className)}
    {...props}
  >
    <Icon name='angle-down' width='16' height='16' color='#fff' />
  </SelectPrimitive.ScrollDownButton>
);
SelectScrollDownButton.displayName = SelectPrimitive.ScrollDownButton.displayName;

const SelectContent = (
  {
    ref,
    className,
    children,
    position = 'popper',
    ...props
  }: ComponentPropsWithRef<typeof SelectPrimitive.Content>) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={clsx(
        'relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-lg border border-primary-400 bg-primary-900 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
        position === 'popper' &&
        'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
        className,
      )}
      position={position}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={clsx(
          'p-1',
          position === 'popper' &&
          'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]',
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
);
SelectContent.displayName = SelectPrimitive.Content.displayName;

const SelectLabel = ({ ref, className, ...props }: ComponentPropsWithRef<typeof SelectPrimitive.Label>) => (
  <SelectPrimitive.Label
    ref={ref}
    className={clsx('py-1.5 pl-8 pr-2 text-sm text-white font-semibold', className)}
    {...props}
  />
);
SelectLabel.displayName = SelectPrimitive.Label.displayName;

const SelectItem = ({ ref, className, children, ...props }: ComponentPropsWithRef<typeof SelectPrimitive.Item>) => (
  <SelectPrimitive.Item
    ref={ref}
    className={clsx(
      'relative flex w-full cursor-pointer select-none items-center rounded-sm py-1.5 px-2 text-sm text-white outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      className,
    )}
    {...props}
  >
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
);
SelectItem.displayName = SelectPrimitive.Item.displayName;

const SelectSeparator = ({ ref, className, ...props }: ComponentPropsWithRef<typeof SelectPrimitive.Separator>) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={clsx('-mx-1 my-1 h-px bg-muted', className)}
    {...props}
  />
);
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
};
