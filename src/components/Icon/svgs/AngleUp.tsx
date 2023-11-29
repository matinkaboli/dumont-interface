import { SvgProps } from '../iconConfig';

function AngleUp({ width = '24', height = '24', color = '#000', className, viewBox }: SvgProps) {
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
        d="M19.773 15.773a.774.774 0 01-1.095 0L12 9.095l-6.678 6.678a.774.774 0 11-1.095-1.095l7.226-7.225a.774.774 0 011.094 0l7.226 7.225a.774.774 0 010 1.095z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
}

export default AngleUp;
