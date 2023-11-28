import { SvgProps } from '../iconConfig';

function ArrowLeft({ width = '24', height = '24', color = '#000', className, viewBox }: SvgProps) {
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
        d="M20.225 12.713a.775.775 0 000-1.55H6.323l4.858-4.839a.775.775 0 00-1.093-1.098L3.836 11.45a.775.775 0 000 1.099l6.252 6.224a.775.775 0 001.093-1.098l-4.984-4.963h14.028z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
}

export default ArrowLeft;
