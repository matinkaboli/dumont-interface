import { SvgProps } from '../iconConfig';

function ArrowDown({ width = '24', height = '24', color = '#000', className, viewBox }: SvgProps) {
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
        d="M11.287 4.383a.775.775 0 011.55 0v13.903l4.839-4.86a.775.775 0 011.098 1.095l-6.225 6.25a.775.775 0 01-1.099 0l-6.224-6.25a.775.775 0 011.098-1.094l4.963 4.984V4.383z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
}

export default ArrowDown;
