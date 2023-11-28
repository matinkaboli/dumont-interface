import { SvgProps } from '../iconConfig';

function ArrowRight({ width = '24', height = '24', color = '#000', className, viewBox }: SvgProps) {
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
        d="M3.775 12.713a.775.775 0 010-1.55h13.902L12.82 6.324a.775.775 0 011.093-1.098l6.252 6.225a.775.775 0 010 1.099l-6.252 6.224a.775.775 0 01-1.093-1.098l4.984-4.963H3.775z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
}

export default ArrowRight;
