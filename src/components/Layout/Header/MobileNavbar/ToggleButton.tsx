import clsx from 'clsx';

const lineClass = 'block w-full h-[2.5px] rounded-[10px] transition-transform duration-200 ease-in bg-primary-250';

interface Props {
  isOpen: boolean,
  toggleMenu: () => void
}

function ToggleButton({ isOpen, toggleMenu }: Props) {
  return (
    <button
      type='button'
      className='relative pointer z-20 w-[30px] h-[30px]'
      onClick={toggleMenu}
    >
      <span className={clsx(' mb-[5.4px]', lineClass, isOpen && 'transform translate-y-[4px] rotate-45')} />
      <span className={clsx(lineClass, isOpen && 'transform -translate-y-[4px] -rotate-45')} />
    </button>
  );
}

export default ToggleButton;
