import clsx from 'clsx';

interface Detail {
  id: string;
  label: string;
  value: string;
}

interface Props {
  details: Detail[];
  className?: string;
  isDesktopView?: boolean;
}

const AmountDetails = ({ details, className, isDesktopView = true }: Props) => {
  return (
    <ul className={clsx('flex flex-col gap-3', className)}>
      {details.map((detail) => (
        <li key={detail.id} className='font-medium flex-between'>
          <span className={isDesktopView ? 'text-white text-sm' : 'text-white text-base'}>
            {detail.label}
          </span>
          <span className={isDesktopView ? 'text-neutral-400 text-sm' : 'text-white text-base'}>
           {detail.value}
          </span>
        </li>
      ))}
    </ul>
  );
};

export default AmountDetails;
