import type { CSSProperties } from 'react';

export type NavItem = {
  label: string;
  href?: string;
  children?: NavItem[];
  type?: 'title';
  open?: string;
  hide?: string;
  className?: string;
  style?: CSSProperties;
};

export const HEADER_NAV_ITEMS: NavItem[] = [
  { label: 'HOME', href: '#visual' },
  { label: '평면', href: '#unit' },
  { label: '혜택', href: '#schedule' },
  { label: '조경', href: '#landscape' },
  { label: '커뮤니티', href: '#greenery' },
  { label: '프리미엄', href: '#premium' },
  { label: '입지/개요', href: '#overview' },
  { label: '브랜드', href: '#brand' },
];

export const HAMBURGER_NAV_ITEMS: NavItem[] = [
  { label: 'HOME', href: '#visual' },
  { label: '평면', href: '#unit' },
  { label: '혜택', href: '#schedule' },
  { label: '조경', href: '#landscape' },
  { label: '커뮤니티', href: '#greenery' },
  { label: '프리미엄', href: '#premium' },
  { label: '입지/개요', href: '#overview' },
  { label: '브랜드', href: '#brand' },
];
