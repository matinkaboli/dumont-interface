import React from 'react';
import Link from 'next/link';

const Menus = () => {
  return (
    <ul className="flex items-center gap-8">
      <li className="font-medium text-white text-sm">
        <Link href="/">Activity</Link>
      </li>
      <li className="font-medium text-white text-sm">
        <Link href="/">Tutorial</Link>
      </li>
    </ul>
  );
};

export default Menus;
