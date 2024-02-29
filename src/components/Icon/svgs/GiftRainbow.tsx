import { SvgProps } from '../iconConfig';

function GiftRainbow({ width = '24', height = '25', className, viewBox = '0 0 24 25' }: SvgProps) {
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
        fill="url(#paint0_linear_2837_150)"
        fillRule="evenodd"
        d="M17.91 7.06c2.063.45 3.025 2.33 3.087 4.289a.198.198 0 01-.2.203H3.203a.198.198 0 01-.2-.203C3.065 9.39 4.026 7.512 6.088 7.06a2.892 2.892 0 01-.547-1.696C5.54 3.79 6.8 2.5 8.335 2.5c1.89 0 3.017 1.382 3.667 2.672.65-1.29 1.778-2.672 3.657-2.672 1.544 0 2.794 1.29 2.794 2.865 0 .633-.202 1.22-.543 1.695zM7.065 5.365c0 .741.569 1.34 1.27 1.34h2.651C10.62 5.64 9.808 4.025 8.335 4.025c-.701 0-1.27.6-1.27 1.34zm5.943 1.34h2.651c.701 0 1.27-.599 1.27-1.34 0-.742-.569-1.341-1.27-1.341-1.453 0-2.275 1.615-2.651 2.682zm-9.805 6.37A.203.203 0 003 13.28v4.338c0 2.655 1.627 4.44 4.05 4.44h3.981a.203.203 0 00.203-.204V13.28a.203.203 0 00-.203-.203H3.203zm9.555.204c0-.112.091-.203.203-.203h7.836c.112 0 .203.09.203.203v4.338c0 2.655-1.628 4.44-4.05 4.44h-3.989a.203.203 0 01-.203-.204V13.28z"
        clipRule="evenodd"
      ></path>
      <defs>
        <linearGradient
          id="paint0_linear_2837_150"
          x1="12.01"
          x2="11.998"
          y1="3.966"
          y2="22.056"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FAFF00"></stop>
          <stop offset="0.54" stopColor="#FF5BCF"></stop>
          <stop offset="1" stopColor="#7331FF"></stop>
        </linearGradient>
      </defs>
    </svg>
  );
}

export default GiftRainbow;
