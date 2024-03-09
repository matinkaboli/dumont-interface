import { SvgProps } from '../iconConfig';

function EyeRainbow({ width = '40', height = '40', className, viewBox = '0 0 40 40' }: SvgProps) {
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
        fill="url(#paint0_linear_2950_2788)"
        className="path"
        fillRule="evenodd"
        d="M20 10.064c-5.316 0-10.915 4.327-14.05 9.63v.002a.396.396 0 000 .394l-1.103.654 1.104-.652c3.134 5.302 8.733 9.63 14.05 9.63 5.316 0 10.913-4.328 14.048-9.627a.405.405 0 000-.402C30.915 14.39 25.317 10.064 20 10.064zM3.743 21.396a2.96 2.96 0 01.001-3.008C7.123 12.673 13.42 7.5 20 7.5c6.581 0 12.877 5.173 16.256 10.887a2.969 2.969 0 010 3.013C32.877 27.112 26.58 32.286 20 32.286c-6.58 0-12.878-5.174-16.257-10.89z"
        clipRule="evenodd"
      ></path>
      <path
        fill="url(#paint1_linear_2950_2788)"
        className="path"
        fillRule="evenodd"
        d="M22.762 17.13a3.906 3.906 0 00-5.525 0 3.906 3.906 0 000 5.527 3.907 3.907 0 105.526-5.526zm1.727-1.726a6.349 6.349 0 00-8.98 0 6.349 6.349 0 000 8.98 6.348 6.348 0 008.98 0 6.349 6.349 0 000-8.98z"
        clipRule="evenodd"
      ></path>
      <defs>
        <linearGradient
          id="paint0_linear_2950_2788"
          x1="20"
          x2="20"
          y1="7.5"
          y2="32.286"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FAFE03"></stop>
          <stop offset="0.48" stopColor="#DD71A8"></stop>
          <stop offset="1" stopColor="#8238F9"></stop>
        </linearGradient>
        <linearGradient
          id="paint1_linear_2950_2788"
          x1="20"
          x2="20"
          y1="7.5"
          y2="32.286"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FAFE03"></stop>
          <stop offset="0.48" stopColor="#DD71A8"></stop>
          <stop offset="1" stopColor="#8238F9"></stop>
        </linearGradient>
      </defs>
    </svg>
  );
}

export default EyeRainbow;
