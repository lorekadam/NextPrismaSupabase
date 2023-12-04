'use client';

import { useForm, zodResolver } from '@mantine/form';
import { TextInput, Button, Flex } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { Category } from '@prisma/client';
import { getErrorMessage } from '@/helpers/getErrorMessage';
import { Routes } from '@/routes';
import { CategoryFormSchema, CategoryFormType } from '@/types/schema/categories';
import { createCategory, updateCategory } from '../../actions';

type CategoryFormProps = {
  category?: Category;
};

const initialCategoryFormData: CategoryFormType = {
  name: '',
};

export function CategoryForm({ category }: CategoryFormProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const form = useForm({
    validateInputOnChange: true,
    initialValues: category || initialCategoryFormData,
    validate: zodResolver(CategoryFormSchema),
  });

  const handleCategory = form.onSubmit((values) => {
    startTransition(async () => {
      try {
        if (category) {
          await updateCategory(category.id, values);
          router.refresh();
        } else {
          await createCategory(values);
          router.push(Routes.categories);
        }
      } catch (error) {
        notifications.show({ title: 'Error', message: getErrorMessage(error), color: 'red' });
      }
    });
  });

  return (
    <form onSubmit={handleCategory}>
      <TextInput required label="Name" radius="md" {...form.getInputProps('name')} />

      <Flex justify="flex-end" mt="xl">
        <Button
          type="submit"
          radius="xl"
          color="black"
          disabled={!form.isValid()}
          loading={isPending}
        >
          {category ? 'Update category' : 'Create category'}
        </Button>
      </Flex>
    </form>
  );
}
