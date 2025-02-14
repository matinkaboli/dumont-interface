import dayjs from 'dayjs';

const isClaimable = (requestedAt: number, claimableAfter?: string) => {
  const claimable = parseInt(claimableAfter ?? '0', 10);
  const claimableTime = dayjs.unix(requestedAt + claimable);
  const currentTime = dayjs();

  return currentTime.isAfter(claimableTime);
};

export default isClaimable;
