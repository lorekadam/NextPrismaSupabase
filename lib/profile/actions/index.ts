'use server';

import { redirect } from 'next/navigation';
import { getUserId } from '@/lib/authentication/actions';
import { prisma } from '@/prisma';
import { Routes } from '@/routes';
import { ProfileFormType } from '@/types/schema/profile';

export const getProfile = async () => {
  const user_id = await getUserId();
  const profile = await prisma.profile.findUnique({ where: { user_id } });
  return profile;
};

export const checkProfileAndRedirectIfNot = async () => {
  const profile = await getProfile();
  if (!profile) {
    redirect(Routes.profile);
  }
};

export const createProfile = async (profile: ProfileFormType) => {
  const user_id = await getUserId();
  try {
    await prisma.profile.create({ data: { ...profile, user_id } });
  } catch (error) {
    console.log(error);
    throw new Error("Couldn't create profile");
  }
};

export const updateProfile = async (profile: ProfileFormType) => {
  const user_id = await getUserId();
  try {
    await prisma.profile.update({
      where: { user_id },
      data: profile,
    });
  } catch (error) {
    console.log(error);
    throw new Error("Couldn't update profile");
  }
};
