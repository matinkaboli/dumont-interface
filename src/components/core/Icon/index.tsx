import { cloneElement, ReactElement } from 'react';
import { SvgProps } from './Icon.types';

import Home from './svgs/Home';
import LineChart from './svgs/LineChart';
import HomeFill from './svgs/HomeFill';

const iconMap: Record<string, ReactElement> = {
  home: <Home />,
  'home-fill': <HomeFill />,
  'line-chart': <LineChart />,
};

type IconName = 'home' | 'line-chart' | 'home-fill';

interface Props extends SvgProps {
  name: IconName;
}

const SvgIcon = ({ name, width, height, color }: Props) => {
  const selectedIcon = iconMap[name];

  if (!selectedIcon) {
    console.error(`Icon "${name}" not found`);
    return null;
  }

  return cloneElement(selectedIcon, {
    width,
    height,
    color,
    className: 'svg-icon',
  });
};

export default SvgIcon;
