import { SvgProps } from '../iconConfig';

function Twitter({ width = '18', height = '19', color = '#DAA7FE', className, viewBox = '0 0 18 19' }: SvgProps) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className={className}
      width={width}
      height={height}
      fill='none'
      viewBox={viewBox}
    >
      <path
        fill={color}
        className='path'
        d='M10.712 7.79L17.413 0h-1.588l-5.818 6.763L5.36 0H0l7.027 10.227L0 18.395h1.588l6.144-7.142 4.908 7.142H18L10.712 7.79zm-2.175 2.527L7.825 9.3 2.16 1.195H4.6l4.571 6.54.712 1.019 5.943 8.5h-2.439l-4.85-6.936z'
      ></path>
    </svg>
  );
}

export default Twitter;
