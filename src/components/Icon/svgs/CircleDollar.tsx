import React from 'react';
import { SvgProps } from '@/components/Icon/iconConfig';

function CircleDollar({ width = '14', height = '14', color = '#EA00FF', className, viewBox = '0 0 14 14' }: SvgProps) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className={className}
      width={width}
      height={height}
      fill='none'
      viewBox={viewBox}
    >
      <path
        fill={color}
        className='path'
        fillRule='evenodd'
        d='M1.5 6.647a5.5 5.5 0 1111 0 5.5 5.5 0 01-11 0zM7 .147a6.5 6.5 0 100 13 6.5 6.5 0 000-13zm-.5 2.5v.833h-.167a1.833 1.833 0 000 3.667H6.5v1.667H5v1h1.5v.833h1v-.833h.167a1.833 1.833 0 000-3.667H7.5V4.48H9v-1H7.5v-.833h-1zm1 4.5v1.667h.167a.833.833 0 000-1.667H7.5zM6.333 4.48H6.5v1.667h-.167a.833.833 0 010-1.667z'
        clipRule='evenodd'
      ></path>
    </svg>
  );
}

export default CircleDollar;
