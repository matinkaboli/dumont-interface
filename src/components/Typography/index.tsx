import { ReactNode } from 'react';
import { cva, VariantProps } from 'class-variance-authority';

const typographyVariant = cva('',
  {
    variants: {
      variant: {
        'title1': 'font-bold md:text-5xl text-4xl text-white',
        'title2': 'font-bold md:text-5xl text-3xl text-white',
        'title3': 'font-bold md:text-4xl text-3xl text-white',
        'title4': 'font-bold md:text-3xl text-xl text-white',
        'subTitle1': 'md:text-2xl text-lg text-neutral-300',
        'subTitle2': 'md:text-2xl text-lg text-neutral-400',
        'body1': 'md:text-md text-base text-neutral-300',
      },
    },
    defaultVariants: {
      variant: 'body1',
    },
  });

interface Props extends VariantProps<typeof typographyVariant> {
  className?: string;
  tag?: keyof JSX.IntrinsicElements;
  children: ReactNode;
}

const Typography = ({ tag: Tag = 'div', variant, className, children }: Props) => {
  return (
    <Tag className={typographyVariant({ variant, className })}>
      {children}
    </Tag>
  );
};

export default Typography;
