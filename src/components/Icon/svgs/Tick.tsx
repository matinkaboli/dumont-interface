import { SvgProps } from '../iconConfig';

function Tick({
  width = '12',
  height = '12',
  color = '#fff',
  className,
  viewBox = '0 0 12 12',
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
        d="M4.738 11.705c.524 0 .919-.2 1.187-.603l5.793-8.73c.096-.142.167-.282.213-.42.046-.142.069-.278.069-.408 0-.36-.126-.657-.377-.891a1.267 1.267 0 00-.916-.358c-.25 0-.464.05-.64.15-.172.097-.335.264-.49.503L4.713 8.586 2.278 5.667a1.255 1.255 0 00-.991-.458c-.373 0-.68.12-.923.358A1.206 1.206 0 000 6.464c0 .164.025.318.075.465.055.142.153.29.295.445l3.233 3.81c.297.347.675.521 1.135.521z"
      ></path>
    </svg>
  );
}

export default Tick;
