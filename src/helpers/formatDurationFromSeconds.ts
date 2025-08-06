import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

const formatDurationFromSeconds = (totalSeconds: number): string => {
  const durationObj = dayjs.duration(totalSeconds, 'seconds');
  const hours = durationObj.hours();
  const minutes = durationObj.minutes();
  // const seconds = durationObj.seconds();

  // show hh:mm with leading zeros
  const paddedHours = String(hours > 0 ? hours : 0).padStart(2, '0');
  const paddedMinutes = String(minutes).padStart(2, '0');

  return `${paddedHours}:${paddedMinutes}`;
};

export default formatDurationFromSeconds;
