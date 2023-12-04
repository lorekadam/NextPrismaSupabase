import { Stack, Title } from '@mantine/core';
import React from 'react';
import { getProfile } from '@/lib/profile/actions';
import { ProfileForm } from '@/lib/profile/components';

export default async function Profile() {
  const profile = await getProfile();
  if (!profile) {
    return (
      <Stack>
        <Title>Create Profile</Title>
        <ProfileForm />
      </Stack>
    );
  }
  return (
    <Stack>
      <Title>Profile</Title>
      <ProfileForm profile={profile} />
    </Stack>
  );
}
