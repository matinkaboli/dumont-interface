import React from 'react';
import { SvgProps } from '@/components/Icon/iconConfig';

function XMarkCircleFill({
  width = '20',
  height = '21',
  color = '#000',
  className = '',
  viewBox = '0 0 20 21',
}: SvgProps) {
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
        d="M13.711 12.924l-1.061 1.06-2.401-2.398-2.4 2.396-1.06-1.061 2.399-2.395-2.399-2.398L7.85 7.067l2.4 2.399 2.401-2.397 1.06 1.062-2.4 2.395 2.4 2.398zM10.25.784C4.874.785.5 5.16.5 10.535c0 5.377 4.374 9.75 9.75 9.75S20 15.912 20 10.535c0-5.375-4.374-9.75-9.75-9.75z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
}

export default XMarkCircleFill;
