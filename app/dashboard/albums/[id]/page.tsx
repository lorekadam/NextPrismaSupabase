import { Stack, Title } from '@mantine/core';
import { notFound } from 'next/navigation';
import { getAlbumDetails } from '@/lib/albums/actions';

type AlbumProps = {
  params: {
    id: string;
  };
};

export default async function Album({ params: { id } }: AlbumProps) {
  const album = await getAlbumDetails(id);
  if (!album) {
    notFound();
  }
  const { name, author, year, tracks } = album;
  return (
    <Stack>
      <Title>{name}</Title>
      <Stack gap={4}>
        <div>Author: {author.name}</div>
        <div>Year: {year}</div>
        <div>Tracks: {tracks}</div>
      </Stack>
    </Stack>
  );
}
