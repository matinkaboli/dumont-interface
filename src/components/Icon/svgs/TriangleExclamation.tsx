import { SvgProps } from '../iconConfig';

function TriangleExclamation({
  width = '34',
  height = '31',
  color = '#DF1642',
  className,
  viewBox = '0 0 34 31',
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
        fillRule="evenodd"
        d="M12.946 2.355c1.8-3.142 6.33-3.14 8.126.002l11.969 20.928c1.785 3.122-.47 7.006-4.064 7.006H5.02c-3.596 0-5.85-3.887-4.064-7.008L12.946 2.355zm5.957 1.243c-.838-1.466-2.95-1.466-3.79-.001L3.127 24.524c-.833 1.456.218 3.269 1.895 3.269h23.956c1.676 0 2.727-1.812 1.895-3.267L18.903 3.598zm-1.91 7.336c.69 0 1.25.56 1.25 1.25v5.162a1.25 1.25 0 11-2.498 0v-5.163c0-.69.559-1.249 1.249-1.249zm-.012 9.886a1.666 1.666 0 100 3.33h.017a1.666 1.666 0 100-3.33h-.017z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
}

export default TriangleExclamation;
