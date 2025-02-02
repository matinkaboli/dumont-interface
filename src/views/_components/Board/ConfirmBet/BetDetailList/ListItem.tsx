import InfoTooltip from '@/views/_components/InfoTooltip';
import { BetInfo } from './index';

const ListItem = ({ label, value, tooltip }: BetInfo) => {
  return (
    <li className="flex justify-between border-b border-neutral-600 pt-6 pb-4 last:!border-b-0">
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
