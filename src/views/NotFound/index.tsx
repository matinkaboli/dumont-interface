import Link from 'next/link';

import { Button } from '@/components';
import Routes from '@/constants/routes';

const NotFound = () => {
  return (
    <div className="md:pt-52 md:pb-72 py-20">
      <div className="text-center max-w-[578px] mx-auto">
        <h1 className="font-bold lg:text-4xl text-3xl text-white">Oops! Page Not Found</h1>
        <p className="text-base text-neutral-400 mt-4">
          The page you&apos;re looking for might have been moved or doesn’t exist. Double-check the
          URL or head back home.
        </p>
        <Button asChild radius="lg" size="sm" className="mt-8 w-fit mx-auto text-sm">
          <Link href={Routes.HOME} target="_blank">
            Back to home
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
