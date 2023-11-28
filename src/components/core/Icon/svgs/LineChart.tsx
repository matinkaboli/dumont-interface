import { SvgProps } from '../iconConfig';

function LineChart({ width = '24', height = '24', color = '#000', className, viewBox }: SvgProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="none"
      viewBox={viewBox}
    >
      <path
        fill={color}
        className="path"
        fillRule="evenodd"
        d="M15.362 8.08c1.18-.137 1.984-.23 2.582-.213l.168.008-6.187 5.794-2.578-2.826-6.377 6.378 1.06 1.06 5.267-5.267 2.544 2.788 7.33-6.864.008.164c.016.597-.076 1.401-.213 2.582l-.227 1.954 1.49.174.234-2.013c.129-1.108.235-2.02.215-2.738-.02-.75-.18-1.439-.717-1.976-.537-.537-1.226-.697-1.976-.717-.718-.02-1.63.086-2.738.215l-.058.007-1.955.227.174 1.49 1.954-.227z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
}

export default LineChart;
