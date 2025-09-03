import { SvgProps } from '../iconConfig';

const ShieldCheck = (
  {
    width = '16',
    height = '20',
    color = '#CD3FCD',
    className,
    viewBox = '0 0 16 20',
  }: SvgProps) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={width}
    height={height}
    className={className}
    fill='none'
    viewBox={viewBox}
  >
    <path
      fill={color}
      className='path'
      fillRule='evenodd'
      d='m11.576 8.33-3.722 3.72a.75.75 0 0 1-1.06-.001l-1.806-1.81A.749.749 0 1 1 6.05 9.181l1.275 1.277 3.19-3.189a.75.75 0 1 1 1.061 1.061m3.781-5.193C14.654 2.431 9.027.5 8 .5 6.974.5 1.347 2.431.643 3.137c-.56.562-.552.996-.508 3.397.018.974.042 2.3.042 4.136 0 6.407 7.601 8.785 7.678 8.808a.48.48 0 0 0 .29 0c.077-.023 7.68-2.401 7.68-8.808 0-1.831.023-3.155.041-4.128.043-2.407.05-2.842-.509-3.405'
      clipRule='evenodd'
    ></path>
  </svg>
);

export default ShieldCheck;
