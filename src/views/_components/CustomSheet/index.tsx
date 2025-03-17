import { ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import clsx from 'clsx';

interface Props {
  children: ReactNode;
  isExpanded: boolean;
  onClose: () => void;
  buttonElement?: ReactNode;
}

const CustomSheet = ({ children, isExpanded, onClose, buttonElement }: Props) => {
  return (
    <>
      {isExpanded && <div className="fixed inset-0 bg-black opacity-75 z-40" onClick={onClose} />}

      <div
        onClick={(e) => e.stopPropagation()}
        className={clsx(
          isExpanded ? 'pt-3.5' : 'pt-6',
          'bg-primary-900 px-5 pb-6 fixed md:-bottom-px bottom-[76px] right-0 left-0 rounded-t-3xl z-50',
        )}
      >
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0, y: 20 }}
              animate={{ height: 'auto', opacity: 1, y: 0 }}
              exit={{ height: 0, opacity: 0, y: 20 }}
              transition={{
                type: 'spring',
                stiffness: 500,
                damping: 30,
                opacity: { duration: 0.2 },
              }}
              className="overflow-hidden"
            >
              <button
                type="button"
                onClick={onClose}
                className="h-[5px] w-14 block mx-auto bg-primary-700 rounded-full"
              />
              {children}
            </motion.div>
          )}
        </AnimatePresence>
        {buttonElement}
      </div>
    </>
  );
};

export default CustomSheet;
