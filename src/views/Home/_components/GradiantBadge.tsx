import { cva, VariantProps } from 'class-variance-authority';

import { Icon } from '@/components';
import { IconName } from '@/components/Icon/iconConfig';


const badgeVariants = cva(
  'border rounded-full px-2 h-6 flex items-center gap-1.5 font-medium text-xs bg-gradiant-label-text text-transparent bg-clip-text',
  {
    variants: {
      variant: {
        default:
          'border-neutral-600',
        secondary:
          'border-primary-300',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

interface Props extends VariantProps<typeof badgeVariants> {
  icon: IconName;
  label: string;
  className?: string;
}

const GradiantBadge = ({ icon, label, className = '', variant }: Props) => {
  return (
    <div
      className={badgeVariants({ variant, className })}>
      <Icon name={icon} />
      {label}
    </div>
  );
};

export default GradiantBadge;
