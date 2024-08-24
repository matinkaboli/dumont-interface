import InfoTooltip from '@/views/_components/InfoTooltip';
import { BetInfo } from './index';

const ListItem = ({ label, value, tooltip }: BetInfo) => {
  return (
    <li className="flex justify-between">
      {tooltip ? (
        <InfoTooltip
          label={label}
          tooltipText={tooltip}
          className="text-base text-white font-medium"
        />
      ) : (
        <div className="text-base text-white font-medium">{label}</div>
      )}

      <div className="text-base text-white font-medium">{value}</div>
    </li>
  );
};

export default ListItem;
