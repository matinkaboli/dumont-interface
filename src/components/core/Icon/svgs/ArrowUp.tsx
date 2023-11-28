import { SvgProps } from '../iconConfig';

function ArrowUp({ width = '24', height = '24', color = '#000', className, viewBox }: SvgProps) {
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
        d="M11.287 20.225a.775.775 0 001.55 0V6.323l4.839 4.858a.775.775 0 001.098-1.093L12.55 3.836a.775.775 0 00-1.099 0l-6.224 6.252a.775.775 0 001.098 1.093l4.963-4.984v14.028z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
}

export default ArrowUp;
