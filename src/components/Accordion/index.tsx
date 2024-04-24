'use client';

import { useState } from 'react';
import clsx from 'clsx';

import AccordionItem from './AccordionItem';

interface Props {
  className?: string;
  defaultIndex?: number;
  sections: Array<{ id: string; title: string; body: string }>;
}

const Accordion = ({ defaultIndex = -1, sections = [], className }: Props) => {
  const [activeIndex, setActiveIndex] = useState(defaultIndex);

  const handleSetActiveIndex = (n: number) => {
    if (n === activeIndex) setActiveIndex(-1);
    else setActiveIndex(n);
  };

  return (
    <ul className={clsx('accordion', className)}>
      {sections.map((section, idx) => (
        <AccordionItem
          key={section.id}
          item={section}
          idx={idx}
          activeIndex={activeIndex}
          handleClick={handleSetActiveIndex}
        />
      ))}
    </ul>
  );
};

export default Accordion;
