import Link from 'next/link';

const menues = [
  { label: 'Activity', href: '/' },
  { label: 'Tutorial', href: '/' },
];

const Menus = () => {
  return (
    <ul className="flex-center-v gap-8">
      {menues.map((menu, index) => (
        <li key={index} className="font-medium text-neutral-200 hover:text-primary-250 text-sm transition ease-in-out">
          <Link href={menu.href}>{menu.label}</Link>
        </li>
      ))}
    </ul>
  );
};

export default Menus;
