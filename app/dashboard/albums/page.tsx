import { Stack, Title } from '@mantine/core';
import { getAlbumsWithAuthors } from '@/lib/albums/actions';
import { AlbumTile } from '@/lib/albums/components';

export default async function Albums() {
  const albums = await getAlbumsWithAuthors();
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
