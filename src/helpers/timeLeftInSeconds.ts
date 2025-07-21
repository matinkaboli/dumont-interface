import dayjs from 'dayjs';

function timeLeftInSeconds(pastTime: number): number {
  const currentTime = dayjs();
  const pastDate = dayjs.unix(pastTime);

  return currentTime.diff(pastDate, 'second');
}

export default timeLeftInSeconds;
