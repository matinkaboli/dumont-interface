import { AnimatePresence, motion } from 'framer-motion';

import { Icon } from '@/components';

const transition = { duration: 0.3 };

interface Props {
  idx: number;
  activeIndex: number;
  item: { id: string, title: string; body: string };
  handleClick: (n: number) => void;
}

const AccordionItem = ({ item, idx, activeIndex, handleClick }: Props) => {
  const active = idx === activeIndex;
  const buttonId = `button-${idx}`;
  const panelId = `panel-${idx}`;

  return (
    <li className='border-b border-neutral-600'>
      <button
        id={buttonId}
        aria-controls={panelId}
        aria-expanded={active}
        onClick={() => handleClick(idx)}
        className='py-6 w-full flex items-center justify-between'
      >
        <span className='text-lg text-white'>{item.title}</span>

        <motion.span
          variants={{ rest: { rotate: 0 }, open: { rotate: -180 } }}
          animate={active ? 'open' : 'rest'}
          transition={transition}>
          <Icon
            name='angle-down'
            color={active ? 'white' : '#75757C'}
            className='-mb-0.5 transition ease-in-out duration-300'
          />
        </motion.span>
      </button>

      <AnimatePresence>
        {active && (
          <motion.div
            id={panelId}
            aria-labelledby={buttonId}
            initial='inactive'
            animate='active'
            exit='inactive'
            variants={{ active: { height: 'auto' }, inactive: { height: 0 } }}
            transition={transition}
            className='overflow-hidden'
          >
            <p className='text-base text-neutral-200 pb-6'>{item.body}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
};

export default AccordionItem;
