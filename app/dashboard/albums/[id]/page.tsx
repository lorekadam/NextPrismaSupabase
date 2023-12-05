import { Button, Flex, Group, Stack, Title } from '@mantine/core';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { deleteAlbum, getAlbumDetails } from '@/lib/albums/actions';
import { getUserId } from '@/lib/authentication/actions';
import { buildLink } from '@/helpers/buildLink';
import { Routes } from '@/routes';

type AlbumProps = {
  params: {
    id: string;
  };
};

export default async function Album({ params: { id } }: AlbumProps) {
  const user_id = await getUserId();
  const album = await getAlbumDetails(id);

  if (!album) {
    notFound();
  }

  const { name, author, year, tracks } = album;
  const deleteAlbumWithId = deleteAlbum.bind(null, id);

  return (
    <Stack>
      <Flex justify="space-between">
        <Title>{name}</Title>
        {user_id === author.user_id && (
          <Group>
            <form action={deleteAlbumWithId}>
              <Button type="submit" color="red">
                Delete
              </Button>
            </form>
            <Button component={Link} href={buildLink(Routes.edit_album, id)}>
              Edit
            </Button>
          </Group>
        )}
      </Flex>
      <Stack gap={4}>
        <div>Author: {author.name}</div>
        <div>Year: {year}</div>
        <div>Tracks: {tracks}</div>
      </Stack>
    </Stack>
  );
}
