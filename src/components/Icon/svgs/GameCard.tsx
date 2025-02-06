import { SvgProps } from '../iconConfig';

const SvgIcon = ({
  width = '25',
  height = '25',
  color = '#fff',
  className = '',
  viewBox = '0 0 25 25',
}: SvgProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    width={width}
    height={height}
    fill="none"
    viewBox={viewBox}
  >
    <g fillRule="evenodd" clipPath="url(#clip0_6326_2881)" clipRule="evenodd">
      <path
        fill={color}
        d="M16.263.64H8.684A5.69 5.69 0 0 0 3 6.323v12.631a5.69 5.69 0 0 0 5.684 5.684h7.58a5.69 5.69 0 0 0 5.683-5.684V6.324A5.69 5.69 0 0 0 16.263.639"
      ></path>
      <path
        fill="#000"
        d="M17.653 6.022a.95.95 0 0 0 .947-.948v-.012a.94.94 0 0 0-.947-.941.953.953 0 0 0-.948.953c0 .523.425.948.948.948m-3.329 11.617 2.965-3.587a2.236 2.236 0 0 0-.007-2.858l-2.963-3.56a2.236 2.236 0 0 0-3.438.002l-2.964 3.557a2.24 2.24 0 0 0-.007 2.86l2.964 3.586a2.23 2.23 0 0 0 1.727.812c.67 0 1.297-.297 1.723-.812m-6.777 3.54a.95.95 0 0 0 .948-.947v-.012a.94.94 0 0 0-.948-.941.953.953 0 0 0-.947.953c0 .523.424.948.947.948M12.6 8.724c.06 0 .175.016.265.124l2.965 3.56a.34.34 0 0 1 0 .436l-2.965 3.588a.342.342 0 0 1-.53-.002L9.37 12.845a.345.345 0 0 1 .001-.44l2.965-3.558a.34.34 0 0 1 .263-.124"
      ></path>
    </g>
    <defs>
      <clipPath id="clip0_6326_2881">
        <path fill="#fff" d="M.5.64h24v24H.5z"></path>
      </clipPath>
    </defs>
  </svg>
);

export default SvgIcon;
