import { ReactQRCode } from '@lglab/react-qr-code';
import clsx from 'clsx';

interface Props {
  size?: number;
  className?: string;
  value: string;
  imageSrc: string;
}

const QRCode = ({ value, size, imageSrc, className }: Props) => (
  <div className={clsx('w-fit rounded-3xl overflow-hidden', className)}>
    <ReactQRCode
      value={value}
      size={size}
      background={'#FFFFFF'}
      dataModulesSettings={{ style: 'diamond' }}
      finderPatternOuterSettings={{ style: 'inpoint-sm' }}
      finderPatternInnerSettings={{ style: 'rounded-sm' }}
      marginSize={2}
      level='Q'
      imageSettings={{
        src: imageSrc,
        width: 23,
        height: 23,
        excavate: true,
      }}
    />
  </div>
);
QRCode.displayName = 'QRCode';
export default QRCode;
