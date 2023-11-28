import { cloneElement } from 'react';
import { iconMap, type IconName, type SvgProps } from './iconConfig';

interface Props extends SvgProps {
  name: IconName;
}

const SvgIcon = ({ name, width, height, viewBox, color, className }: Props) => {
  const selectedIcon = iconMap[name];

  if (!selectedIcon) {
    console.error(`Icon "${name}" not found`);
    return null;
  }

  return cloneElement(selectedIcon, {
    width,
    height,
    viewBox,
    color,
    className,
  });
};

export default SvgIcon;
