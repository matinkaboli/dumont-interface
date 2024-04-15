// Follow these steps to add a new icon:
// 1. Add a new SVG component in the 'svgs' folder.
// 2. Make sure to include all necessary SVG props in the component. (Do not forget to add the class name 'path' to a <path> element that has the main color.)
// 3. Add the icon name to the 'IconName' union type.
// 4. Finally, add the new SVG component to the 'iconMap' record.
//    Example: 'new-icon': <NewIconComponent />,

import { ReactElement } from 'react';
import XMark from './svgs/XMark';
import Twitter from './svgs/Twitter';
import Telegram from './svgs/Telegram';
import AngleRight from './svgs/AngleRight';

export interface SvgProps {
  width?: string;
  height?: string;
  viewBox?: string;
  color?: string;
  className?: string;
}

// Define a union type for icon names
export type IconName =
  | 'xmark'
  | 'telegram'
  | 'twitter'
  | 'angle-right';

// Create a map of icon names to their respective ReactElements
export const iconMap: Record<IconName, ReactElement> = {
  xmark: <XMark />,
  telegram: <Telegram />,
  twitter: <Twitter />,
  'angle-right': <AngleRight />
};
