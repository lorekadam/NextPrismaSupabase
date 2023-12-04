'use client';

import { useForm, zodResolver } from '@mantine/form';
import { TextInput, Button, Stack, Flex, NumberInput } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { Album } from '@prisma/client';
import { getErrorMessage } from '@/helpers/getErrorMessage';
import { AlbumFormSchema, AlbumFormType, MAX_YEAR, MIN_YEAR } from '@/types/schema/albums';
import { createAlbum, updateAlbum } from '../../actions';
import { buildLink } from '@/helpers/buildLink';
import { Routes } from '@/routes';

type AlbumFormProps = {
  album?: Album;
};

const initialAlbumFormData: AlbumFormType = {
  name: '',
  tracks: 10,
  year: 2020,
};

export function AlbumForm({ album }: AlbumFormProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const form = useForm({
    validateInputOnChange: true,
    initialValues: album || initialAlbumFormData,
    validate: zodResolver(AlbumFormSchema),
  });

  const handleAlbum = form.onSubmit((values) => {
    startTransition(async () => {
      try {
        if (album) {
          await updateAlbum(album.id, values);
          router.refresh();
        } else {
          const newAlbum = await createAlbum(values);
          router.push(buildLink(Routes.album, newAlbum.id));
        }
      } catch (error) {
        notifications.show({ title: 'Error', message: getErrorMessage(error), color: 'red' });
      }
    });
  });

  return (
    <form onSubmit={handleAlbum}>
      <Stack>
        <TextInput required label="Name" radius="md" {...form.getInputProps('name')} />
        <NumberInput required label="Tracks" min={1} max={100} {...form.getInputProps('tracks')} />
        <NumberInput
          required
          label="Release year"
          min={MIN_YEAR}
          max={MAX_YEAR}
          {...form.getInputProps('year')}
        />
      </Stack>

      <Flex justify="flex-end" mt="xl">
        <Button
          type="submit"
          radius="xl"
          color="black"
          disabled={!form.isValid()}
          loading={isPending}
        >
          {album ? 'Update album' : 'Create album'}
        </Button>
      </Flex>
    </form>
  );
}
