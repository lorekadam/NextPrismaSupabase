'use server';

import { Prisma } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { prisma } from '@/prisma';
import { AlbumFormType } from '@/types/schema/albums';
import { getProfile } from '@/lib/profile/actions';
import { Routes } from '@/routes';

export const createAlbum = async ({ categories, ...rest }: AlbumFormType) => {
  const profile = await getProfile();
  if (profile) {
    try {
      const album = await prisma.album.create({
        data: {
          ...rest,
          categories: {
            connect: categories.map((category) => ({ id: category })),
          },
          author_id: profile.id,
        },
      });
      revalidatePath(Routes.albums);
      return album;
    } catch (error) {
      console.log(error);
      throw new Error('Could not create album');
    }
  }
  throw new Error('Profile not found');
};

export const updateAlbum = async (albumId: string, { categories, ...rest }: AlbumFormType) => {
  const profile = await getProfile();
  if (profile) {
    try {
      const album = await prisma.album.update({
        where: {
          id: albumId,
        },
        data: {
          ...rest,
          categories: {
            connect: categories.map((category) => ({ id: category })),
          },
          author_id: profile.id,
        },
      });
      return album;
    } catch (error) {
      console.log(error);
      throw new Error('Could not update album');
    }
  }
  throw new Error('Profile not found');
};

export const getAlbumDetails = async (albumId: string) => {
  try {
    const album = await prisma.album.findUnique({
      where: {
        id: albumId,
      },
      include: {
        author: true,
      },
    });
    return album;
  } catch (error) {
    console.log(error);
    throw new Error('Could not get album details');
  }
};

export const getAlbumsWithAuthorsAndCategories = async () => {
  try {
    const albums = await prisma.album.findMany({ include: { author: true, categories: true } });
    return albums;
  } catch (error) {
    console.log(error);
    throw new Error('Could not get albums');
  }
};

export const getAlbumWithAuthorsAndCategories = async (id: string) => {
  try {
    const albums = await prisma.album.findUnique({
      where: {
        id,
      },
      include: {
        author: true,
        categories: true,
      },
    });
    return albums;
  } catch (error) {
    console.log(error);
    throw new Error('Could not get albums');
  }
};

export type AlbumsWithAuthorAndCategories = Prisma.PromiseReturnType<
  typeof getAlbumsWithAuthorsAndCategories
>;
export type AlbumWithAuthorAndCategories = Prisma.PromiseReturnType<
  typeof getAlbumWithAuthorsAndCategories
>;

export const deleteAlbum = async (id: string) => {
  try {
    await prisma.album.delete({
      where: {
        id,
      },
    });
    revalidatePath(Routes.albums);
  } catch (error) {
    console.log(error);
    throw new Error('Could not delete album');
  }
  redirect(Routes.albums);
};
