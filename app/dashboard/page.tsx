import { Stack, Title } from '@mantine/core';
import { checkProfileAndRedirectIfNot } from '@/lib/profile/actions';

export default async function Dashboard() {
  await checkProfileAndRedirectIfNot();
  return (
    <Stack>
      <Title>Dashboard</Title>
    </Stack>
  );
}
