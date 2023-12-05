import { Stack, Title } from '@mantine/core';
import { notFound } from 'next/navigation';
import { getAlbumWithAuthorsAndCategories } from '@/lib/albums/actions';
import { AlbumForm } from '@/lib/albums/components';
import { getAllCategories } from '@/lib/categories/actions';

type AlbumProps = {
  params: {
    id: string;
  };
};

export default async function Album({ params: { id } }: AlbumProps) {
  const album = await getAlbumWithAuthorsAndCategories(id);
  const categories = await getAllCategories();
  if (!album) {
    notFound();
  }
  return (
    <Stack>
      <Title>Edit</Title>
      <AlbumForm album={album} categories={categories} />
    </Stack>
  );
}
