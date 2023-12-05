'use client';

import { useForm, zodResolver } from '@mantine/form';
import { TextInput, Button, Stack, Flex, NumberInput, MultiSelect } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { Category } from '@prisma/client';
import { getErrorMessage } from '@/helpers/getErrorMessage';
import { AlbumFormSchema, AlbumFormType, MAX_YEAR, MIN_YEAR } from '@/types/schema/albums';
import { AlbumWithAuthorAndCategories, createAlbum, updateAlbum } from '../../actions';
import { buildLink } from '@/helpers/buildLink';
import { Routes } from '@/routes';

type AlbumFormProps = {
  album?: AlbumWithAuthorAndCategories;
  categories: Category[];
};

const initialAlbumFormData = (album?: AlbumFormProps['album']): AlbumFormType => ({
  name: album?.name || '',
  tracks: album?.tracks || 10,
  year: album?.year || 2020,
  categories: album?.categories.map((category) => category.id) || [],
});

export function AlbumForm({ album, categories }: AlbumFormProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const form = useForm({
    validateInputOnChange: true,
    initialValues: initialAlbumFormData(album),
    validate: zodResolver(AlbumFormSchema),
  });

  const handleAlbum = form.onSubmit((values) => {
    startTransition(async () => {
      try {
        if (album) {
          await updateAlbum(album.id, values);
          router.push(buildLink(Routes.album, album.id));
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
        <MultiSelect
          label="Categories"
          data={categories.map((category) => ({ value: category.id, label: category.name }))}
          {...form.getInputProps('categories')}
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
