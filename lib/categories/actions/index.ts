'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '@/prisma';
import { Routes } from '@/routes';
import { CategoryFormType } from '@/types/schema/categories';

export const getAllCategories = async () => {
  try {
    const categories = await prisma.category.findMany();
    return categories;
  } catch (error) {
    console.log(error);
    throw new Error('Could not get categories');
  }
};

export const createCategory = async ({ name }: CategoryFormType) => {
  try {
    const category = await prisma.category.create({
      data: {
        name,
      },
    });
    revalidatePath(Routes.categories);
    return category;
  } catch (error) {
    console.log(error);
    throw new Error('Could not create category');
  }
};

export const updateCategory = async (categoryId: string, { name }: CategoryFormType) => {
  try {
    const category = await prisma.category.update({
      where: {
        id: categoryId,
      },
      data: {
        name,
      },
    });
    return category;
  } catch (error) {
    console.log(error);
    throw new Error('Could not update category');
  }
};
