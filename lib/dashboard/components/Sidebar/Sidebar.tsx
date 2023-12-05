import { Group } from '@mantine/core';
import classes from './Sidebar.module.css';
import { SidebarLinks } from '../SidebarLinks/SidebarLinks';
import { SignOut } from '@/lib/authentication/components';
import { getProfile } from '@/lib/profile/actions';

export async function Sidebar() {
  const profile = await getProfile();
  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        <Group className={classes.header} justify="space-between">
          NextPrisma
        </Group>
        {profile && <SidebarLinks />}
      </div>
      <div className={classes.footer}>
        <SignOut />
      </div>
    </nav>
  );
}
