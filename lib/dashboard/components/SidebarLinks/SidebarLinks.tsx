'use client';

import {
  IconCategory2,
  IconCategoryPlus,
  IconCirclePlus,
  IconDashboard,
  IconDisc,
  IconUser,
} from '@tabler/icons-react';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Routes } from '@/routes';
import classes from './SidebarLinks.module.css';

const links = [
  { href: Routes.dashboard, label: 'Dashboard', icon: IconDashboard },
  { href: Routes.profile, label: 'Profile', icon: IconUser },
  { href: Routes.albums, label: 'Albums', icon: IconDisc },
  { href: Routes.new_album, label: 'New album', icon: IconCirclePlus },
  { href: Routes.categories, label: 'Categories', icon: IconCategory2 },
  { href: Routes.new_category, label: 'New category', icon: IconCategoryPlus },
];

export const SidebarLinks = () => {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => (
        <Link
          className={classes.link}
          href={link.href}
          key={link.label}
          data-active={link.href === pathname || undefined}
        >
          <link.icon className={classes.linkIcon} stroke={1.5} />
          <span>{link.label}</span>
        </Link>
      ))}
    </>
  );
};
