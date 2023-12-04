import { Group } from '@mantine/core';
import classes from './Sidebar.module.css';
import { SidebarLinks } from '../SidebarLinks/SidebarLinks';
import { SignOut } from '@/lib/authentication/components';

export async function Sidebar() {
  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        <Group className={classes.header} justify="space-between">
          NextPrisma
        </Group>
        <SidebarLinks />
      </div>
      <div className={classes.footer}>
        <SignOut />
      </div>
    </nav>
  );
}
