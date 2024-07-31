import { SvgProps } from '../iconConfig';

function ArrowUp({
width = '13',
height = '15',
color = '#28D025',
className,
viewBox = '0 0 13 15'
}: SvgProps) {
  return (
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
        className="path"
        fillRule='evenodd'
        d='M5.905 13.854a.646.646 0 101.292 0V2.27l4.032 4.049a.646.646 0 00.915-.912L6.956.197a.646.646 0 00-.915 0L.854 5.407a.646.646 0 00.915.91l4.136-4.154v11.691z'
        clipRule='evenodd'
      ></path>
    </svg>
  );
}

export default ArrowUp;
