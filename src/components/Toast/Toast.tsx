'use client';

import 'react-toastify/dist/ReactToastify.css';
import './styles.css';

import React from 'react';
import clsx from 'clsx';
import { ToastContainer, ToastContainerProps } from 'react-toastify';

import { Icon } from '@/components';

const contextClass = {
  success: 'bg-success-600',
  error: 'bg-error-600',
  info: 'bg-secondary-600',
  warning: 'bg-warning-600',
  default: 'bg-neutral-750',
};

interface Props extends Omit<ToastContainerProps, 'closeButton'> {
  bodyClassName?: string;
}

const Toast = ({ theme = 'dark', bodyClassName, toastClassName, ...props }: Props) => {
  const CloseButton = ({ closeToast }: { closeToast: () => void }) => (
    <button className="p-0 h-fit w-fit absolute top-2 right-2" onClick={closeToast}>
      <Icon name="xmark" width="16" height="16" color="#C4C4CC" />
    </button>
  );

  return (
    <ToastContainer
      {...props}
      theme={theme}
      className={clsx('!px-0', bodyClassName)}
      closeButton={CloseButton}
      toastClassName={(context) =>
        clsx(
          toastClassName,
          contextClass[context?.type || 'default'],
          'relative flex py-3 px-4 min-h-10 rounded justify-between overflow-hidden',
        )
      }
    />
  );
};
Toast.displayName = 'Toast';

export default Toast;
