import { SvgProps } from '../iconConfig';

const Share = ({
  width = '18',
  height = '21',
  color = '#ADADB6',
  className = '',
  viewBox = '0 0 18 21',
}: SvgProps) => (
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
      d="M12.508 3.905a1.983 1.983 0 1 1 3.966-.001 1.983 1.983 0 0 1-3.966.001m-1.36 1.066a3.508 3.508 0 1 1 .769 1.318L6.851 9.244a3.5 3.5 0 0 1 0 2.134l5.068 2.954a3.508 3.508 0 1 1-.77 1.316l-5.067-2.953a3.508 3.508 0 1 1-.001-4.769zM5.19 9.259a1.983 1.983 0 1 0-3.363 2.105A1.983 1.983 0 0 0 5.19 9.258m7.539 6.55a1.983 1.983 0 1 0 .106-.18.8.8 0 0 1-.106.18"
      clipRule="evenodd"
    ></path>
  </svg>
);

export default Share;
