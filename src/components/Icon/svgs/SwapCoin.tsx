import { SvgProps } from '../iconConfig';

function SwapCoin({
  width = '24',
  height = '24',
  color = '#DBDBE2',
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
        d="M7.252 2.47a.75.75 0 011.06 0l1.381 1.38a.75.75 0 010 1.061l-1.38 1.38a.75.75 0 01-1.06-1.061l.849-.85-.85-.85a.75.75 0 010-1.06z"
        clipRule="evenodd"
      ></path>
      <path
        fill={color}
        className="path"
        fillRule="evenodd"
        d="M2.799 7.831a4.2 4.2 0 014.2-4.2h2.083a.75.75 0 010 1.5H7a2.7 2.7 0 00-2.7 2.7.75.75 0 01-1.5 0zM17.249 17.71a.75.75 0 010 1.06l-.85.85.85.85a.75.75 0 01-1.06 1.061l-1.381-1.38a.75.75 0 010-1.06l1.38-1.381a.75.75 0 011.06 0z"
        clipRule="evenodd"
      ></path>
      <path
        fill={color}
        className="path"
        fillRule="evenodd"
        d="M20.95 15.42a.75.75 0 01.75.75 4.2 4.2 0 01-4.2 4.2h-2.084a.75.75 0 010-1.5h2.083a2.7 2.7 0 002.7-2.7.75.75 0 01.75-.75zM10.06 10.121a4.068 4.068 0 100 8.136 4.068 4.068 0 000-8.136zM4.492 14.19a5.568 5.568 0 1111.136 0 5.568 5.568 0 01-11.136 0z"
        clipRule="evenodd"
      ></path>
      <path
        fill={color}
        className="path"
        fillRule="evenodd"
        d="M14.441 5.742a4.068 4.068 0 100 8.136 4.068 4.068 0 000-8.136zM8.873 9.81a5.568 5.568 0 1111.136 0 5.568 5.568 0 01-11.136 0z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
}

export default SwapCoin;
