import CreateRound from './Create';
import KeyBoard from './KeyBoard';
import Amount from './Amount';

const Round = () => {
  return (
    <div className="flex flex-col gap-4">
      <CreateRound />

      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2">
          <KeyBoard />
        </div>
        <div className="col-span-1">
          <Amount />
        </div>
      </div>
    </div>
  );
};

export default Round;
