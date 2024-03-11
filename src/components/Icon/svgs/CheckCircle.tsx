import { SvgProps } from '../iconConfig';

function CheckCircle({
  width = '24',
  height = '24',
  color = '#fff',
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
        d="M12 2C6.477 2 2 6.477 2 12c0 5.522 4.477 10 10 10s10-4.478 10-10c0-5.523-4.477-10-10-10zM3.538 12A8.461 8.461 0 0112 3.538 8.462 8.462 0 113.538 12zm12.557-1.824a.77.77 0 10-1.087-1.088l-4.193 4.193-1.825-1.825a.77.77 0 10-1.087 1.088l2.369 2.368c.3.3.787.3 1.087 0l4.736-4.736z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
}

export default CheckCircle;
