import { SvgProps } from '../iconConfig';

const EllipsisVertical = ({
  width = '32',
  height = '33',
  color = '#fff',
  className,
  viewBox = '0 0 32 33',
}: SvgProps) => {
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
        d="M14.585 24.167a1.667 1.667 0 103.334 0v-.014a1.667 1.667 0 10-3.334 0v.014zm1.667-6.347c-.92 0-1.667-.746-1.667-1.667v-.013a1.667 1.667 0 013.334 0v.013c0 .92-.747 1.667-1.667 1.667zm0-8.013c-.92 0-1.667-.746-1.667-1.667v-.013a1.667 1.667 0 013.334 0v.013c0 .92-.747 1.667-1.667 1.667z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
};

export default EllipsisVertical;
