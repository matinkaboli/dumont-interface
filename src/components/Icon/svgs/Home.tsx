import { SvgProps } from '../iconConfig';

function Home({ width = '24', height = '24', color = '#000', className, viewBox }: SvgProps) {
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
        d="M10.011 2.691a3.207 3.207 0 013.978 0l7.72 6.11a.77.77 0 11-.956 1.207l-.288-.228v7.311a3.912 3.912 0 01-3.912 3.912H7.446a3.912 3.912 0 01-3.912-3.912v-7.31l-.287.227a.77.77 0 11-.955-1.206l7.72-6.11zm3.024 1.207l5.891 4.664v8.53a2.373 2.373 0 01-2.373 2.373H7.446a2.373 2.373 0 01-2.373-2.374V8.562l5.892-4.664a1.669 1.669 0 012.07 0zM9.722 14.44a.77.77 0 000 1.538h4.557a.77.77 0 100-1.538H9.722z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
}

export default Home;
