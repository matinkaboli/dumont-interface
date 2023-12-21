import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import clsx from 'clsx';

const QRCode = React.forwardRef<
  React.ElementRef<typeof QRCodeSVG>,
  React.ComponentPropsWithoutRef<typeof QRCodeSVG>
>(({ className, ...props }, ref) => (
  <QRCodeSVG className={clsx('bg-white p-3 rounded-xl', className)} ref={ref} {...props} />
));
QRCode.displayName = 'QRCode';
export default QRCode;
