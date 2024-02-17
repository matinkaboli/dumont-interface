import { BetInfo } from '.';

const ListItem = ({ label, value }: BetInfo) => {
  return (
    <li className="flex justify-between">
      <div className="text-base text-white font-medium">{label}</div>
      <div className="text-base text-white font-medium">{value}</div>
    </li>
  );
};

export default ListItem;
