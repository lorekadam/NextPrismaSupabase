import { Button, Flex, Title } from '@mantine/core';
import Link from 'next/link';
import { Routes } from '@/routes';
import { createSupabaseServerClient } from '@/supabase/server';

export const Navbar = async () => {
  const {
    data: { session },
  } = await createSupabaseServerClient().auth.getSession();
  return (
    <Flex
      px={20}
      py={10}
      align="center"
      justify="space-between"
      style={{ borderBottom: '2px solid', borderColor: 'black' }}
    >
      <Link href={Routes.home} style={{ color: 'black', textDecoration: 'none' }}>
        <Title>NextPrisma</Title>
      </Link>
      <Flex gap={16}>
        {session ? (
          <Button color="gray" component={Link} href={Routes.dashboard}>
            Dashboard
          </Button>
        ) : (
          <>
            <Button variant="outline" color="black" component={Link} href={Routes.register}>
              Register
            </Button>
            <Button component={Link} color="black" href={Routes.login}>
              Log in
            </Button>
          </>
        )}
      </Flex>
    </Flex>
  );
};
