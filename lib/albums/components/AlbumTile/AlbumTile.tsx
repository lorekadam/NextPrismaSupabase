'use client';

import { Avatar, Button, Card, Flex, Group, Stack, Text, Title } from '@mantine/core';
import React from 'react';
import Link from 'next/link';
import { AlbumWithAuthor } from '../../actions';
import { buildLink } from '@/helpers/buildLink';
import { Routes } from '@/routes';

type AlbumTileProps = {
  album: AlbumWithAuthor;
};

export const AlbumTile = ({ album: { id, name, tracks, year, author } }: AlbumTileProps) => (
  <Card shadow="md">
    <Stack>
      <Group>
        <Avatar color="black" tt="uppercase">
          {name.substring(0, 2)}
        </Avatar>
        <Title order={3}>{name}</Title>
      </Group>
      <Flex justify="space-between">
        <Stack gap={4}>
          <Group>
            <Text fw="bold">Author:</Text>
            <Text>{author.name}</Text>
          </Group>
          <Group>
            <Text fw="bold">Tracks:</Text>
            <Text>{tracks}</Text>
          </Group>
          <Group>
            <Text fw="bold">Release year</Text>
            <Text>{year}</Text>
          </Group>
        </Stack>
        <Flex align="flex-end">
          <Button component={Link} href={buildLink(Routes.album, id)}>
            Preview
          </Button>
        </Flex>
      </Flex>
    </Stack>
  </Card>
);
