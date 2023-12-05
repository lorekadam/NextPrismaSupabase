import { Stack, Title } from '@mantine/core';
import { AlbumForm } from '@/lib/albums/components';
import { getAllCategories } from '@/lib/categories/actions';

export default async function Albums() {
  const categories = await getAllCategories();
  return (
    <Stack>
      <Title>New album</Title>
      <AlbumForm categories={categories} />
    </Stack>
  );
}
