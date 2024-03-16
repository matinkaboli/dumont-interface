import 'react-toastify/dist/ReactToastify.css';
import './styles.css';

import React from 'react';
import clsx from 'clsx';
import { ToastContainer, ToastContainerProps } from 'react-toastify';

import ToastContent from './ToastContent';

const contextClass = {
  success: 'bg-success-600',
  error: 'bg-error-600',
  info: 'bg-secondary-600',
  warning: 'bg-warning-600',
  default: 'bg-neutral-600',
};

const Toast = ({
  theme = 'dark',
  bodyClassName,
  toastClassName,
  ...props
}: ToastContainerProps) => {
  return (
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
  );
};
Toast.displayName = 'Toast';

export { Toast, ToastContent };
