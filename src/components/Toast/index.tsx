import React from 'react';
import clsx from 'clsx';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './styles.css';

const contextClass = {
  success: 'bg-blue-600',
  error: 'bg-red-600',
  info: 'bg-gray-600',
  warning: 'bg-orange-400',
  default: 'bg-neutral-600',
};

interface Props extends React.ComponentPropsWithoutRef<typeof ToastContainer> {
  title?: string;
  description?: string;
  variant?: 'neutral' | 'error' | 'success';
}

const Toast = React.forwardRef<React.ElementRef<typeof ToastContainer>, Props>(
  ({ theme = 'dark', bodyClassName, toastClassName, ...props }, ref) => {
    const notify = () =>
      toast(
        <div className="flex flex-col gap-1">
          <h6 className="text-sm font-bold">Wow so easy!</h6>
          <p className="text-xs text-nutreal-300">extra info</p>
        </div>,
        { type: 'default' },
      );

    return (
      <>
        <button onClick={notify}>Notify!</button>
        <ToastContainer
          {...props}
          theme={theme}
          bodyClassName={clsx('!px-0', bodyClassName)}
          toastClassName={(context) =>
            clsx(
              toastClassName,
              contextClass[context?.type || 'default'],
              'relative flex py-3 px-4 min-h-10 rounded justify-between overflow-hidden',
            )
          }
        />
      </>
    );
  },
);
Toast.displayName = 'Toast';

export default Toast;
