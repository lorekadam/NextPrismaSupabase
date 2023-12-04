import { Stack, Title } from '@mantine/core';
import { CategoryForm } from '@/lib/categories/components';

export default async function Albums() {
  return (
    <Stack>
      <Title>New Category</Title>
      <CategoryForm />
    </Stack>
  );
}
