import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

const formatDurationFromSeconds = (totalSeconds: number): string => {
  const durationObj = dayjs.duration(totalSeconds, 'seconds');
  const hours = durationObj.hours();
  const minutes = durationObj.minutes();
  const seconds = durationObj.seconds();

  let result = '';
  if (hours > 0) result += `${hours}h `;
  if (minutes > 0) result += `${minutes}m `;
  result += `${seconds}s`;

  return result.trim();
};

export default formatDurationFromSeconds;
