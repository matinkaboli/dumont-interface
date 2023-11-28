import { SvgProps } from '../iconConfig';

function AngleLeft({ width = '24', height = '24', color = '#000', className, viewBox }: SvgProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      width={width}
      height={height}
      fill="none"
      viewBox={viewBox}
    >
      <path fill="transparent" d="M0 0H24V24H0z"></path>
      <g>
        <path fill="transparent" d="M0 0H1497V955H0z" transform="translate(-344 -384)"></path>
        <g>
          <g>
            <g>
              <path
                fill={color}
                className="path"
                fillRule="evenodd"
                d="M15.773 4.227a.774.774 0 010 1.095L9.095 12l6.678 6.678a.774.774 0 11-1.095 1.095l-7.225-7.226a.774.774 0 010-1.094l7.225-7.226a.774.774 0 011.095 0z"
                clipRule="evenodd"
              ></path>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}

export default AngleLeft;
