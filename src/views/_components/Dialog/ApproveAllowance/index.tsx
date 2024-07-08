import { Button, DialogDescription, DialogIcon, DialogTitle } from '@/components';

interface Props {
  onApprove: () => void;
}

const ApproveAllowance = ({ onApprove }: Props) => {
  return (
    <>
      <DialogIcon name="badge-check-rainbow" variant="default" />
      <DialogTitle className="text-center mt-4">USDT Approval</DialogTitle>
      <div className="mx-auto text-xs font-medium text-primary-100 px-4 py-1 rounded-full bg-gradiant-blur backdrop-blur-[25px] shadow-label w-fit mt-1 mb-2">
        One Time Approval
      </div>
      <DialogDescription className="text-neutral-300 text-base text-center">
        To create a round, you need to approve the “round creation” contract.
      </DialogDescription>
      <Button fullWidth size="md" radius="lg" className="mt-6" onClick={onApprove}>
        Approve
      </Button>
    </>
  );
};

export default ApproveAllowance;
