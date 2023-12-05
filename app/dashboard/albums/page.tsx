import { Stack, Title } from '@mantine/core';
import { getAlbumsWithAuthorsAndCategories } from '@/lib/albums/actions';
import { AlbumTile } from '@/lib/albums/components';

export default async function Albums() {
  const albums = await getAlbumsWithAuthorsAndCategories();
  return (
    <Stack>
      <Title>Albums</Title>
      <Stack>
        {albums.map((album) => (
          <AlbumTile key={album.id} album={album} />
        ))}
      </Stack>
    </Stack>
  );
}
