// Follow these steps to add a new icon:
// 1. Add a new SVG component in the 'svgs' folder.
// 2. Make sure to include all necessary SVG props in the component. (Do not forget to add the class name 'path' to a <path> element that has the main color.)
// 3. Add the icon name to the 'IconName' union type.
// 4. Finally, add the new SVG component to the 'iconMap' record.
//    Example: 'new-icon': <NewIconComponent />,

import { ReactElement } from 'react';

import Home from './svgs/Home';
import LineChart from './svgs/LineChart';
import HomeFill from './svgs/HomeFill';
import AngleUp from './svgs/AngleUp';
import AngleRight from './svgs/AngleRight';
import AngleLeft from './svgs/AngleLeft';
import AngleDown from './svgs/AngleDown';
import ArrowUp from './svgs/ArrowUp';
import ArrowLeft from './svgs/ArrowLeft';
import ArrowRight from './svgs/ArrowRight';
import ArrowDown from './svgs/ArrowDown';
import XMark from './svgs/XMark';
import Dash from './svgs/Dash';
import Tick from './svgs/Tick';
import VolumeLow from './svgs/VolumeLow';
import GiftFill from './svgs/GiftFill';
import Copy from './svgs/Copy';
import CreditCard from './svgs/CreditCard';
import SwapCoin from './svgs/SwapCoin';
import ArrowRightFromBracket from './svgs/ArrowRightFromBracket';
import Link from './svgs/Link';
import EllipsisVertical from './svgs/EllipsisVertical';
import CaretUp from './svgs/CaretUp';
import Check from './svgs/Check';

export interface SvgProps {
  width?: string;
  height?: string;
  viewBox?: string;
  color?: string;
  className?: string;
}

// Define a union type for icon names
export type IconName =
  | 'home'
  | 'line-chart'
  | 'home-fill'
  | 'angle-up'
  | 'angle-right'
  | 'angle-left'
  | 'angle-down'
  | 'arrow-up'
  | 'arrow-left'
  | 'arrow-right'
  | 'arrow-down'
  | 'xmark'
  | 'dash'
  | 'tick'
  | 'volume-low'
  | 'gift-fill'
  | 'copy'
  | 'credit-card'
  | 'swap-coin'
  | 'arrow-right-from-bracket'
  | 'link'
  | 'ellipsis-vertical'
  | 'caret-up'
  | 'check';

// Create a map of icon names to their respective ReactElements
export const iconMap: Record<IconName, ReactElement> = {
  home: <Home />,
  'home-fill': <HomeFill />,
  'line-chart': <LineChart />,
  'angle-up': <AngleUp />,
  'angle-right': <AngleRight />,
  'angle-left': <AngleLeft />,
  'angle-down': <AngleDown />,
  'arrow-up': <ArrowUp />,
  'arrow-left': <ArrowLeft />,
  'arrow-right': <ArrowRight />,
  'arrow-down': <ArrowDown />,
  xmark: <XMark />,
  dash: <Dash />,
  tick: <Tick />,
  'volume-low': <VolumeLow />,
  'gift-fill': <GiftFill />,
  copy: <Copy />,
  'credit-card': <CreditCard />,
  'swap-coin': <SwapCoin />,
  'arrow-right-from-bracket': <ArrowRightFromBracket />,
  link: <Link />,
  'ellipsis-vertical': <EllipsisVertical />,
  'caret-up': <CaretUp />,
  check: <Check />,
};
