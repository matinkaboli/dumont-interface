import Link from 'next/link';

import Routes from '@/constants/routes';

const menus = [
  { label: 'Activity', href: Routes.ACTIVITY },
  { label: 'Tutorial', href: Routes.TUTORIAL },
];

const Menus = () => {
  return (
    <ul className="flex-center-v gap-8">
      {menus.map((menu, index) => (
        <li key={index} className="font-medium text-neutral-200 hover:text-primary-250 text-sm transition ease-in-out">
          <Link href={menu.href}>{menu.label}</Link>
        </li>
      ))}
    </ul>
  );
};

export default Menus;
