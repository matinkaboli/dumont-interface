import clsx from 'clsx';

const cornerClassName = 'absolute w-5 h-5';
const cornerTriangleClassName = 'absolute w-0 h-0 border-solid';
const width = '20px';
const color = '#111117';

const FoldedCorners = () => {
  return (
    <>
      {/*top right*/}
      <div className={clsx(cornerClassName, 'top-0 right-0')}>
        <div
          className={cornerTriangleClassName}
          style={{
            borderWidth: `0 ${width} ${width} 0`,
            borderColor: `transparent ${color} transparent transparent`,
          }}
        />
      </div>

      {/*top left*/}
      <div className={clsx(cornerClassName, 'top-0 left-0')}>
        <div
          className={cornerTriangleClassName}
          style={{
            borderWidth: `0 0 ${width} ${width}`,
            borderColor: `transparent transparent transparent ${color}`,
          }}
        />
      </div>

      {/*bottom right*/}
      <div className={clsx(cornerClassName, 'bottom-0 right-0')}>
        <div
          className={cornerTriangleClassName}
          style={{
            borderWidth: `${width} ${width} 0 0 `,
            borderColor: `transparent ${color} transparent transparent`,
          }}
        />
      </div>

      {/*bottom left*/}
      <div className={clsx(cornerClassName, 'bottom-0 left-0')}>
        <div
          className={cornerTriangleClassName}
          style={{
            borderWidth: `${width} 0 0 ${width}`,
            borderColor: `transparent transparent transparent ${color}`,
          }}
        />
      </div>
    </>
  );
};

export default FoldedCorners;
