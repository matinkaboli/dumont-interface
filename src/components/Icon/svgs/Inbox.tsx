import { SvgProps } from '../iconConfig';

function Inbox({
  width = '28',
  height = '28',
  color = '#C4C4CC',
  viewBox = '0 0 28 28',
  className,
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
        d="M18.63 2.59c3.877 0 6.454 2.777 6.454 6.758v9.304c0 3.982-2.577 6.758-6.456 6.758h-9.84c-3.877 0-6.455-2.777-6.455-6.758V9.348c0-3.977 2.585-6.759 6.456-6.759h9.84zM4.083 18.651c0 3.043 1.824 5.008 4.705 5.008h9.84c2.88 0 4.704-1.965 4.704-5.008v-3.255h-4.127c-.702 0-1.343.4-1.655 1.032a4.282 4.282 0 01-7.68 0 1.846 1.846 0 00-1.655-1.031H4.084v3.254zM18.629 4.339H8.79c-2.875 0-4.705 1.97-4.705 5.01v4.298h4.132c1.368 0 2.616.778 3.223 2.006a2.532 2.532 0 004.543 0 3.596 3.596 0 013.224-2.005h4.128v-4.3c0-3.043-1.824-5.009-4.705-5.009zm-1.37 3.974a.875.875 0 110 1.75h-7.098a.875.875 0 110-1.75h7.099z"
      ></path>
    </svg>
  );
}

export default Inbox;
