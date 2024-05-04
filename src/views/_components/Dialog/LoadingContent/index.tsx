import { DialogDescription, Loading } from '@/components';

interface Props {
  title: string;
  desc: string;
}

const LoadingContent = ({ title, desc }: Props) => {
  return (
    <div className="text-center py-2">
      <Loading />
      <h2 className="text-md text-white font-semibold mt-4 mb-3">{title}</h2>
      <DialogDescription>{desc}</DialogDescription>
    </div>
  );
};

export default LoadingContent;
