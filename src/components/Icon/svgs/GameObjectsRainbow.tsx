import { SvgProps } from '../iconConfig';

function GameObjectsRainbow({
  width = '40',
  height = '40',
  className,
  viewBox = '0 0 40 40',
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
        fill="url(#paint0_linear_3157_265)"
        className="path"
        fillRule="evenodd"
        d="M18.445 13.818L13.862 5.88c-1.143-1.98-4.001-1.98-5.144 0l-4.582 7.937c-1.145 1.98.287 4.455 2.571 4.455h9.165c2.285 0 3.715-2.475 2.573-4.455zM10.883 7.13a.47.47 0 01.813 0l4.584 7.937a.47.47 0 01-.408.705H6.707a.47.47 0 01-.405-.705l4.581-7.937zm18.36-2.644a7.024 7.024 0 100 14.047 7.024 7.024 0 000-14.047zm-4.523 7.024a4.524 4.524 0 119.047 0 4.524 4.524 0 01-9.047 0zm-2.178 13.807a3.298 3.298 0 013.299-3.298h6.986a3.298 3.298 0 013.299 3.298v6.987a3.298 3.298 0 01-3.299 3.298h-6.986a3.298 3.298 0 01-3.299-3.298v-6.987zm3.299-.798a.798.798 0 00-.799.798v6.987c0 .441.357.798.799.798h6.986a.798.798 0 00.799-.798v-6.987a.798.798 0 00-.799-.798h-6.986zM6.906 22.933A1.25 1.25 0 005.138 24.7l4.223 4.222-4.222 4.222a1.25 1.25 0 001.768 1.767l4.221-4.221 4.222 4.221a1.25 1.25 0 001.768-1.767l-4.222-4.222L17.12 24.7a1.25 1.25 0 00-1.768-1.768l-4.223 4.222-4.222-4.222z"
        clipRule="evenodd"
      ></path>
      <defs>
        <linearGradient
          id="paint0_linear_3157_265"
          x1="20.019"
          x2="20.002"
          y1="6.736"
          y2="35.603"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FAFF00"></stop>
          <stop offset="0.355" stopColor="#E59979"></stop>
          <stop offset="0.72" stopColor="#D95EBD"></stop>
          <stop offset="1" stopColor="#8238F9"></stop>
        </linearGradient>
      </defs>
    </svg>
  );
}

export default GameObjectsRainbow;
