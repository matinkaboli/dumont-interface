import { Button, DialogDescription, DialogIcon, DialogTitle } from '@/components';

interface Props {
  title?: string;
  onClick?: () => void;
}

const ErrorContent = ({ title, onClick }: Props) => {
  return (
    <>
      <DialogIcon name="triangle-exclamation" variant="error" />
      <DialogTitle className="text-center mt-5">{title}</DialogTitle>
      <DialogDescription className="text-neutral-300 text-base text-center mt-1">
        Please try again later
      </DialogDescription>
      <Button fullWidth size="md" radius="lg" className="mt-6" onClick={onClick}>
        Retry
      </Button>
    </>
  );
};

export default ErrorContent;
