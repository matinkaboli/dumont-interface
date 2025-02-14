import { SvgProps } from '../iconConfig';

const GraduationCap = ({
  width = '16',
  color = '#C319C3',
  height = '16',
  className = '',
  viewBox = '0 0 16 16',
}: SvgProps) => (
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
      d="M8.823 2.337a1.89 1.89 0 0 0-1.661 0l-5.28 2.58a.975.975 0 0 0 .001 1.75l5.419 2.65a1.9 1.9 0 0 0 1.524-.065l5.283-2.581a.975.975 0 0 0 0-1.752zM6.81 10.424l.068.033a.6.6 0 0 0 .174.055c.756.24 1.582.182 2.306-.171l2.357-1.152v2.992c0 .454-.268.862-.668 1.03-2.071.867-4.136.858-6.232-.007a1.12 1.12 0 0 1-.674-1.032V9.127l2.484 1.214q.091.045.185.083M2.93 8.527v3.645c0 .927.548 1.79 1.423 2.152 2.386.985 4.786 1 7.162.004a2.33 2.33 0 0 0 1.412-2.147V8.597l1.714-.838.01-.005-.014 2.401a.606.606 0 1 0 1.211.008l.027-4.373a.6.6 0 0 0-.012-.123 2.16 2.16 0 0 0-1.222-1.836L9.356 1.248a3.1 3.1 0 0 0-2.727 0l-5.278 2.58c-1.635.8-1.635 3.13 0 3.928z"
      clipRule="evenodd"
    ></path>
  </svg>
);

export default GraduationCap;
