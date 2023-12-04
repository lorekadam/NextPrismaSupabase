'use server';

import { AuthResponse, AuthTokenResponse } from '@supabase/supabase-js';
import { unstable_noStore as noStore } from 'next/cache';
import { redirect } from 'next/navigation';
import { createSupabaseServerClient } from '@/supabase/server';
import { LoginFormType, RegisterFormType } from '@/types/schema/authentication';
import { Routes } from '@/routes';

export async function readUserSession() {
  noStore();
  return createSupabaseServerClient().auth.getSession();
}

// eslint-disable-next-line consistent-return
export async function getUserId() {
  noStore();
  const session = await createSupabaseServerClient().auth.getSession();
  const user_id = session.data.session?.user.id;
  if (user_id) {
    return user_id;
  }
  redirect(Routes.login);
}

export const signUpWithEmailAndPassword = async ({
  email,
  password,
  confirmPassword,
}: RegisterFormType) => {
  if (password === confirmPassword) {
    const result = await createSupabaseServerClient().auth.signUp({ email, password });
    return JSON.parse(JSON.stringify(result)) as AuthResponse;
  }
  throw new Error("Passwords don't match");
};

export const signInWithEmailAndPassword = async ({ email, password }: LoginFormType) => {
  const result = await createSupabaseServerClient().auth.signInWithPassword({ email, password });
  return JSON.parse(JSON.stringify(result)) as AuthTokenResponse;
};

export const signOut = async () => {
  await createSupabaseServerClient().auth.signOut();
  redirect('/');
};
