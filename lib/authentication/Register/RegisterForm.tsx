'use client';

import { useForm, zodResolver } from '@mantine/form';
import { TextInput, PasswordInput, Group, Button, Anchor, Stack } from '@mantine/core';
import Link from 'next/link';
import { notifications } from '@mantine/notifications';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { Routes } from '@/routes';
import { RegisterFormSchema, RegisterFormType } from '@/types/schema/authentication';
import { signUpWithEmailAndPassword } from '../actions';

const initialRegisterFormData: RegisterFormType = {
  email: '',
  password: '',
  confirmPassword: '',
};

export function RegisterForm() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const form = useForm({
    validateInputOnBlur: true,
    validateInputOnChange: true,
    initialValues: initialRegisterFormData,
    validate: zodResolver(RegisterFormSchema),
  });

  const signUp = form.onSubmit((values) => {
    startTransition(async () => {
      const { data, error } = await signUpWithEmailAndPassword(values);

      if (error) {
        notifications.show({ title: 'Error', message: error.message, color: 'red' });
      } else if (data) {
        router.push(Routes.dashboard);
      }
    });
  });

  return (
    <form onSubmit={signUp}>
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
        <PasswordInput
          required
          label="Confirm password"
          placeholder="Your password"
          radius="md"
          {...form.getInputProps('confirmPassword')}
        />
      </Stack>

      <Group justify="space-between" mt="xl">
        <Anchor component={Link} href={Routes.login} type="button" c="dimmed" size="xs">
          Already have an account? Log in!
        </Anchor>
        <Button
          type="submit"
          radius="xl"
          color="black"
          disabled={!form.isValid()}
          loading={isPending}
        >
          Sign up
        </Button>
      </Group>
    </form>
  );
}
