import {SvgProps} from '../Icon.types';

function HomeFill({ width = 24, height = 24, color = '#000' }: SvgProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="none"
      viewBox="0 0 24 24"
    >
      <path fill="transparent" d="M0 0H24V24H0z"></path>
      <g>
        <path fill="transparent" d="M0 0H1497V955H0z" transform="translate(-760 -328)"></path>
        <g>
          <g>
            <g>
              <path
                fill={color}
                className="path"
                fillRule="evenodd"
                d="M14.556 15.88h-5.11a.727.727 0 010-1.453h5.11a.727.727 0 010 1.454zm5.118-8.674l-5.401-4.399a3.605 3.605 0 00-4.546 0l-5.4 4.398A3.569 3.569 0 003 9.989v6.957a3.95 3.95 0 003.946 3.944h10.108A3.95 3.95 0 0021 16.947V9.99a3.57 3.57 0 00-1.326-2.783z"
                clipRule="evenodd"
              ></path>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}

export default HomeFill;
