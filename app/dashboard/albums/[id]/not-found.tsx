import { Button, Center, Stack, Text, Title } from '@mantine/core';
import Link from 'next/link';
import { Routes } from '@/routes';

export default function NotFound() {
  return (
    <Center h="calc(100vh - 32px)">
      <Stack align="center">
        <Title>Not Found</Title>
        <Text>There is no album with given ID</Text>
        <Button component={Link} href={Routes.dashboard}>
          Dashboard
        </Button>
      </Stack>
    </Center>
  );
}
