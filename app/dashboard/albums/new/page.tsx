import { Stack, Title } from '@mantine/core';
import { AlbumForm } from '@/lib/albums/components';

export default async function Albums() {
  return (
    <Stack>
      <Title>New album</Title>
      <AlbumForm />
    </Stack>
  );
}
