import KeyBoard from './KeyBoard';
import Amount from './Amount';

const Board = () => {
  return (
    <div className="grid md:grid-cols-3 grid-cols-1 md:gap-x-4 gap-x-0 md:gap-y-0 gap-y-4">
      <div className="col-span-2 md:order-1 order-2">
        <KeyBoard />
      </div>
      <div className="col-span-1 md:order-2 order-1">
        <Amount />
      </div>
    </div>
  );
};

export default Board;
