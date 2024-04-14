import React from 'react';
import { SvgProps } from '../iconConfig';

function XMark({ width = '24', height = '24', color = '#000', className, viewBox = '0 0 24 24' }: SvgProps) {
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
        fill={color}
        className="path"
        fillRule="evenodd"
        d="M5.517 4.26A.889.889 0 004.26 5.517L10.743 12 4.26 18.483a.889.889 0 101.257 1.257L12 13.257l6.483 6.483a.889.889 0 101.257-1.257L13.257 12l6.483-6.483a.889.889 0 10-1.257-1.257L12 10.743 5.517 4.26z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
}

export default XMark;
