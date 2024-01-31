import { ReactNode } from 'react';

interface Props {
  position: 'left' | 'right';
  section: ReactNode;
  className?: string;
}

const InputSection = ({ position, section, className }: Props) => {
  const positionClassName = position === 'right' ? 'right-0 pr-3' : 'left-0 pl-3';

  if (!section) return null;

  return (
    <div className={`${positionClassName} absolute inset-y-0 flex items-center ${className}`}>
      {section}
    </div>
  );
};

export default InputSection;
