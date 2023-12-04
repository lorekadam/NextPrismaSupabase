'use client';

import { IconDashboard, IconUser } from '@tabler/icons-react';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Routes } from '@/routes';
import classes from './SidebarLinks.module.css';

const links = [
  { href: Routes.dashboard, label: 'Dashboard', icon: IconDashboard },
  { href: Routes.profile, label: 'Profile', icon: IconUser },
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
