import { SvgProps } from '../iconConfig';

function ArrowUpRight({ width = '13', height = '14', className, viewBox = '0 0 13 14' }: SvgProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      width={width}
      height={height}
      viewBox={viewBox}
    >
      <path
        className="path"
        fillRule="evenodd"
        d="M2.492 3.035l5.409-.63c1.082-.126 1.82-.21 2.368-.195.099.003.187.01.265.018L.381 12.38l.973.973L11.401 3.307l.001.037c.015.548-.069 1.285-.195 2.368l-.629 5.41 1.367.158.636-5.462c.118-1.016.215-1.853.197-2.512-.019-.689-.165-1.32-.658-1.813-.493-.493-1.124-.64-1.813-.658-.66-.019-1.496.079-2.512.197l-5.462.635.159 1.368zm8.766-.422A.65.65 0 0011 2.355l.258.258z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
}

export default ArrowUpRight;
