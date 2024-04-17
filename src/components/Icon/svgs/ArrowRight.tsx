import { SvgProps } from '../iconConfig';

function ArrowRight({ width = '12', height = '10', color = '#EA00FF', className, viewBox = '0 0 12 10' }: SvgProps) {
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
        d='M.517 5.475a.517.517 0 010-1.033h9.268l-3.24-3.226a.517.517 0 01.73-.732l4.167 4.15a.517.517 0 010 .732l-4.167 4.15a.517.517 0 01-.73-.732L9.87 5.475H.517z'
        clipRule='evenodd'
      ></path>
    </svg>
  );
}

export default ArrowRight;
