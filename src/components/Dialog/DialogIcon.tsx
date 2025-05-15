import { Ref } from 'react';
import { cva, VariantProps } from 'class-variance-authority';

import { IconProps } from '@/components/Icon';
import { Icon } from '@/components';

const dialogIconVariants = cva('flex-center w-14 h-14 rounded-full mx-auto', {
  variants: {
    variant: {
      default: 'bg-neutral-700',
      success: 'bg-success-100',
      error: 'bg-error-800',
    },
    defaultVariants: {
      variant: 'default',
    },
  },
});

interface Props extends VariantProps<typeof dialogIconVariants>, IconProps {
  className?: string;
  ref?: Ref<HTMLDivElement>;
}

const DialogIcon =
  ({ ref, className, name, variant, defaultVariants, ...props }: Props) => (
    <div ref={ref} className={dialogIconVariants({ variant, defaultVariants, className })}>
      <Icon name={name} {...props} />
    </div>
  );
DialogIcon.displayName = 'DialogIcon';

export default DialogIcon;
