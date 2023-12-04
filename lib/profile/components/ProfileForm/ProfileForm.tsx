'use client';

import { useForm, zodResolver } from '@mantine/form';
import { TextInput, Button, Stack, Select, Flex } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { Role, profiles } from '@prisma/client';
import { ProfileFormSchema, ProfileFormType } from '@/types/schema/profile';
import { generateDataListFromEnum } from '@/helpers/generateDataListFromEnum';
import { createProfile, updateProfile } from '../../actions';
import { getErrorMessage } from '@/helpers/getErrorMessage';

type ProfileFormProps = {
  profile?: profiles;
};

const initialLoginFormData: ProfileFormType = {
  name: '',
  role: Role.BAND,
};

export function ProfileForm({ profile }: ProfileFormProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const form = useForm({
    validateInputOnChange: true,
    initialValues: profile || initialLoginFormData,
    validate: zodResolver(ProfileFormSchema),
  });

  const handleProfile = form.onSubmit((values) => {
    startTransition(async () => {
      const submitAction = profile ? updateProfile : createProfile;
      try {
        await submitAction(values);
        router.refresh();
      } catch (error) {
        notifications.show({ title: 'Error', message: getErrorMessage(error), color: 'red' });
      }
    });
  });

  //   console.log(form.errors, form.isValid(), form.validate());

  return (
    <form onSubmit={handleProfile}>
      <Stack>
        <TextInput required label="Name" radius="md" {...form.getInputProps('name')} />

        <Select
          required
          label="Who are you?"
          data={generateDataListFromEnum(Role)}
          {...form.getInputProps('role')}
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
          {profile ? 'Update profile' : 'Create profile'}
        </Button>
      </Flex>
    </form>
  );
}
