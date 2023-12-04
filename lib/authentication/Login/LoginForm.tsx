'use client';

import { useForm, zodResolver } from '@mantine/form';
import { TextInput, PasswordInput, Group, Button, Anchor, Stack } from '@mantine/core';
import Link from 'next/link';
import { notifications } from '@mantine/notifications';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { LoginFormSchema, LoginFormType } from '@/types/schema/authentication';
import { Routes } from '@/routes';
import { signInWithEmailAndPassword } from '../actions';

const initialLoginFormData: LoginFormType = {
  email: '',
  password: '',
};

export function LoginForm() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const form = useForm({
    validateInputOnChange: true,
    initialValues: initialLoginFormData,
    validate: zodResolver(LoginFormSchema),
  });

  const logIn = form.onSubmit((values) => {
    startTransition(async () => {
      const { error } = await signInWithEmailAndPassword(values);
      if (error) {
        notifications.show({ title: 'Error', message: error.message, color: 'red' });
      } else {
        router.push(Routes.dashboard);
      }
    });
  });

  return (
    <form onSubmit={logIn}>
      <Stack>
        <TextInput
          required
          label="Email"
          placeholder="hello@mantine.dev"
          radius="md"
          {...form.getInputProps('email')}
        />

        <PasswordInput
          required
          label="Password"
          placeholder="Your password"
          radius="md"
          {...form.getInputProps('password')}
        />
      </Stack>

      <Group justify="space-between" mt="xl">
        <Anchor component={Link} href={Routes.register} type="button" c="dimmed" size="xs">
          Don't have an account? Sign up!
        </Anchor>
        <Button
          type="submit"
          radius="xl"
          color="black"
          disabled={!form.isValid()}
          loading={isPending}
        >
          Log in
        </Button>
      </Group>
    </form>
  );
}
