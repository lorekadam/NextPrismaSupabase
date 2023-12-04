'use client';

import { Card, Title } from '@mantine/core';
import React from 'react';
import { Category } from '@prisma/client';

type CategoryTileProps = {
  category: Category;
};

export const CategoryTile = ({ category: { name } }: CategoryTileProps) => (
  <Card shadow="md">
    <Title order={3}>{name}</Title>
  </Card>
);
