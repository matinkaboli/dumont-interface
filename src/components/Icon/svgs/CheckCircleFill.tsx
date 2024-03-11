import { SvgProps } from '../iconConfig';

function CheckCircleFill({
  width = '24',
  height = '24',
  color = '#EA00FF',
  className,
  viewBox = '0 0 24 24',
}: SvgProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      width={width}
      height={height}
      fill="none"
      viewBox={viewBox}
    >
      <path
        fill={color}
        className="path"
        fillRule="evenodd"
        d="M16.203 10.128l-4.86 4.861a.785.785 0 01-1.118 0l-2.43-2.43a.79.79 0 011.116-1.117l1.873 1.873 4.302-4.303a.79.79 0 011.117 1.116zM12 2C6.486 2 2 6.486 2 12c0 5.515 4.486 10 10 10s10-4.485 10-10c0-5.514-4.486-10-10-10z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
}

export default CheckCircleFill;
