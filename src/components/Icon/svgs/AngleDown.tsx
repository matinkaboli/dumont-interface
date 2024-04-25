import { SvgProps } from '../iconConfig';

function AngleDown({ width = '16', height = '9', color = '#75757C', className, viewBox = '0 0 16 9' }: SvgProps) {
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
        fillRule='evenodd'
        d='M.227.227a.774.774 0 011.095 0L8 6.905 14.678.227a.774.774 0 111.095 1.095L8.547 8.547a.774.774 0 01-1.094 0L.227 1.322a.774.774 0 010-1.095z'
        clipRule='evenodd'
      ></path>
    </svg>
  );
}

export default AngleDown;
