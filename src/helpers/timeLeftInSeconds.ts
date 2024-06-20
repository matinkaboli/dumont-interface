import dayjs from 'dayjs';

function timeLeftInSeconds(pastTime: Date): number {
  const currentTime = dayjs();
  const pastDate = dayjs(pastTime);

  const differenceInMilliseconds = currentTime.diff(pastDate);
  const differenceInSeconds = Math.floor(differenceInMilliseconds / 1000);

  return differenceInSeconds;
}

export default timeLeftInSeconds;
