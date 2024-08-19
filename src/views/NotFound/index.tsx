import Link from 'next/link';

import { Button } from '@/components';
import Routes from '@/constants/routes';

const NotFound = () => {
  return (
    <div className="md:pt-52 md:pb-72 py-20">
      <div className="text-center max-w-[578px] mx-auto">
        <h1 className="font-bold lg:text-4xl text-3xl text-white">Oops! Page Not Found</h1>
        <p className="text-base text-neutral-400 mt-4">
          The page you&apos;re looking for might have been moved or doesn’t exist. Double-check the URL
          or head back home.
        </p>
        <Button
          asChild
          variant="link"
          radius="lg"
          className="w-fit !h-10 mx-auto mt-8 text-sm text-primary-250 font-bold bg-primary-500 hover:bg-primary-400 flex items-center justify-center transition duration-75 ease-in-out"
        >
          <Link href={Routes.HOME} target="_blank">
            Back to home
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
