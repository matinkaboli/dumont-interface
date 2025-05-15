import { QRCodeSVG } from 'qrcode.react';
import clsx from 'clsx';
import { ComponentPropsWithRef } from 'react';

const QRCode = ({ ref, className, ...props }: ComponentPropsWithRef<typeof QRCodeSVG>) => (
  <QRCodeSVG className={clsx('bg-white p-3 rounded-xl', className)} ref={ref} {...props} />
);
QRCode.displayName = 'QRCode';
export default QRCode;
