import { Center, Paper, Text } from '@mantine/core';
import { LoginForm } from '@/lib/authentication';

export default async function LoginPage() {
  return (
    <Center>
      <Paper radius="md" p="xl" withBorder maw={500} w="100%" shadow="lg">
        <Text size="lg" fw={500} mb={16}>
          Log in
        </Text>

        <LoginForm />
      </Paper>
    </Center>
  );
}
