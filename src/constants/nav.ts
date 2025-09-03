import { IconName } from '@/components/Icon/iconConfig';
import Routes from '@/constants/routes';
import links from '@/constants/links';

interface IconImage {
  type: 'image';
  src: string;
  width: number;
  height: number;
  alt: string;
}

interface IconComponent {
  type: 'icon';
  name: string;
}

export type IconType = IconImage | IconComponent;

export interface NavigationItem {
  id: string;
  label: string;
  link: string;
  targetLink: string;
  icon: IconType;
  disabled: boolean;
}

export interface FooterItem {
  id: string;
  link: string;
  icon: IconName;
  label: string;
}

export const NAVIGATION_ITEMS: NavigationItem[] = [
  {
    id: 'home',
    label: '',
    link: Routes.HOME,
    targetLink: Routes.HOME,
    icon: {
      type: 'image',
      src: '/images/logo.svg',
      width: 32,
      height: 28,
      alt: 'dumont',
    },
    disabled: false,
  },
  {
    id: 'sport',
    label: 'Sport',
    link: Routes.SPORTS,
    targetLink: Routes.SPORTS,
    icon: {
      type: 'icon',
      name: 'ball',
    },
    disabled: false,
  },
  {
    id: 'card',
    label: 'Card',
    link: Routes.CARDS,
    targetLink: Routes.CARDS,
    icon: {
      type: 'icon',
      name: 'game-card',
    },
    disabled: false,
  },
];

export const FOOTER_ITEMS: FooterItem[] = [
  { id: 'faq', link: Routes.FAQ, icon: 'circle-question', label: 'FAQ' },
  { id: 'white-paper', link: links.APP_DOC, icon: 'memo', label: 'Whitepaper' },
  { id: 'twitter', link: links.TWITTER, icon: 'twitter', label: 'Follow on X' },
];
