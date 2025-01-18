import { SvgProps } from '../iconConfig';

const Twitter = ({
  width = '19',
  height = '19',
  color = '#fff',
  className = '',
  viewBox = '0 0 19 19',
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
      d="M11.212 7.79 17.913 0h-1.588l-5.818 6.763L5.86 0H.5l7.027 10.227L.5 18.395h1.588l6.144-7.142 4.908 7.142h5.36zm-2.175 2.527L8.325 9.3 2.66 1.195H5.1l4.571 6.54.712 1.019 5.943 8.5h-2.439z"
    ></path>
  </svg>
);

export default Twitter;
