import { Stack, Title } from '@mantine/core';
import { getAllCategories } from '@/lib/categories/actions';
import { CategoryTile } from '@/lib/categories/components';

export default async function Albums() {
  const categories = await getAllCategories();
  return (
    <Stack>
      <Title>Categories</Title>
      <Stack>
        {categories.map((category) => (
          <CategoryTile key={category.id} category={category} />
        ))}
      </Stack>
    </Stack>
  );
}
