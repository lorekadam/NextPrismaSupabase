import { ReactNode } from 'react';
import { Shell } from '@/lib/dashboard/components';

type DashboardLayoutProps = {
  children: ReactNode;
};

export default async function DashboardLayout({ children }: DashboardLayoutProps) {
  return <Shell>{children}</Shell>;
}
