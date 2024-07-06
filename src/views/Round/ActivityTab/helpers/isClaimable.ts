import dayjs from 'dayjs';

const isClaimable = (requestedAt: string, claimableAfter?: string) => {
  const requested = parseInt(requestedAt, 10); // Convert to number
  const claimable = parseInt(claimableAfter ?? '0', 10);
  const claimableTime = dayjs.unix(requested + claimable);
  const currentTime = dayjs();

  return currentTime.isAfter(claimableTime);
};

export default isClaimable;
