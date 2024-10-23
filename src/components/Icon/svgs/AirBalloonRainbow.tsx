import { SvgProps } from '../iconConfig';

function AirBalloonRainbow({
  width = '18',
  height = '26',
  className,
  viewBox = '0 0 18 26',
}: SvgProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="none"
      className={className}
      viewBox={viewBox}
    >
      <g clipPath="url(#clip0_5285_2425)">
        <path
          fill="url(#paint0_linear_5285_2425)"
          fillRule="evenodd"
          d="M10.111 14.445c-.023.023-.035.058-.058.082h-.176v-4h4.761l-4.527 3.918zm.234 5.064H7.643a.876.876 0 110-1.754h2.702a.876.876 0 110 1.755zM3.34 10.526h4.784v4h-.2c-.022-.023-.022-.046-.046-.058L3.34 10.526zM17.972 8.27C17.293 3.882 13.445.572 9 .572 4.555.572.707 3.882.028 8.269c-.152 1.052.316 2.128 1.135 2.69l4.188 3.638c-1.696.269-2.831 1.649-2.831 3.532l.012 3.731c.011 2.106 1.427 3.568 3.45 3.568l6.048-.012c.982 0 1.824-.327 2.444-.947.644-.643.995-1.58.995-2.644l-.012-3.73c-.012-1.872-1.135-3.241-2.82-3.522l4.118-3.556a2.85 2.85 0 001.217-2.748z"
          clipRule="evenodd"
        ></path>
      </g>
      <defs>
        <linearGradient
          id="paint0_linear_5285_2425"
          x1="9.01"
          x2="8.991"
          y1="2.435"
          y2="25.428"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FAFF00"></stop>
          <stop offset="0.54" stopColor="#FF5BCF"></stop>
          <stop offset="1" stopColor="#7331FF"></stop>
        </linearGradient>
        <clipPath id="clip0_5285_2425">
          <path fill="#fff" d="M0 0H18V24.856H0z" transform="translate(0 .572)"></path>
        </clipPath>
      </defs>
    </svg>
  );
}

export default AirBalloonRainbow;
