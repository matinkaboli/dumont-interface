import { cloneElement } from 'react';
import { iconMap, type IconName, type SvgProps } from './iconConfig';

export interface IconProps extends SvgProps {
  name: IconName;
}

const SvgIcon = ({ name, width, height, viewBox, color, className }: IconProps) => {
  const selectedIcon = iconMap[name];

  if (!selectedIcon) return null;

  return cloneElement(selectedIcon, {
    width,
    height,
    viewBox,
    color,
    className,
  });
};

export default SvgIcon;
