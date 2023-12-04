'use server';

import { Prisma } from '@prisma/client';
import { prisma } from '@/prisma';
import { AlbumFormType } from '@/types/schema/albums';
import { getProfile } from '@/lib/profile/actions';

export const createAlbum = async (albumDetails: AlbumFormType) => {
  const profile = await getProfile();
  if (profile) {
    try {
      const album = await prisma.album.create({
        data: {
          ...albumDetails,
          author_id: profile.id,
        },
      });
      return album;
    } catch (error) {
      console.log(error);
      throw new Error('Could not create album');
    }
  }
  throw new Error('Profile not found');
};

export const updateAlbum = async (albumId: string, albumDetails: AlbumFormType) => {
  const profile = await getProfile();
  if (profile) {
    try {
      const album = await prisma.album.update({
        where: {
          id: albumId,
        },
        data: {
          ...albumDetails,
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

export const getAlbumsWithAuthors = async () => {
  try {
    const albums = await prisma.album.findMany({ include: { author: true } });
    return albums;
  } catch (error) {
    console.log(error);
    throw new Error('Could not get albums');
  }
};

export type AlbumsWithAuthor = Prisma.PromiseReturnType<typeof getAlbumsWithAuthors>;
export type AlbumWithAuthor = AlbumsWithAuthor[0];
