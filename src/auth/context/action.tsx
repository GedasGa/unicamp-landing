'use client';

import type {
  AuthError,
  AuthResponse,
  UserResponse,
  AuthTokenResponsePassword,
  SignInWithPasswordCredentials,
  SignUpWithPasswordCredentials,
} from '@supabase/supabase-js';

import { paths } from 'src/routes/paths';

import { supabase } from 'src/lib/supabase';

// ----------------------------------------------------------------------

export type SignInParams = {
  email: string;
  password: string;
  options?: SignInWithPasswordCredentials['options'];
};

export type SignUpParams = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  options?: SignUpWithPasswordCredentials['options'];
};

export type ResetPasswordParams = {
  email: string;
  options?: {
    redirectTo?: string;
    captchaToken?: string;
  };
};

export type UpdatePasswordParams = {
  password: string;
  options?: {
    emailRedirectTo?: string | undefined;
  };
};

/** **************************************
 * Sign in
 *************************************** */
export const signInWithPassword = async ({
  email,
  password,
}: SignInParams): Promise<AuthTokenResponsePassword> => {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    console.error(error);
    throw error;
  }

  return { data, error };
};

/** **************************************
 * Sign up
 *************************************** */
export const signUp = async ({
  email,
  password,
  firstName,
  lastName,
}: SignUpParams): Promise<AuthResponse> => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${window.location.origin}${paths.auth.verify}`,
      data: { 
        first_name: firstName,
        last_name: lastName,
      },
    },
  });

  if (error) {
    console.error(error);
    throw error;
  }

  if (!data?.user?.identities?.length) {
    throw new Error('This user already exists');
  }

  return { data, error };
};

/** **************************************
 * Sign out
 *************************************** */
export const signOut = async (): Promise<{
  error: AuthError | null;
}> => {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error(error);
    throw error;
  }

  return { error };
};

/** **************************************
 * Reset password
 *************************************** */
export const resetPassword = async ({
  email,
}: ResetPasswordParams): Promise<{ data: {}; error: null } | { data: null; error: AuthError }> => {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}${paths.auth.updatePassword}`,
  });

  if (error) {
    console.error(error);
    throw error;
  }

  return { data, error };
};

/** **************************************
 * Update password
 *************************************** */
export const updatePassword = async ({ password }: UpdatePasswordParams): Promise<UserResponse> => {
  const { data, error } = await supabase.auth.updateUser({ password });

  if (error) {
    console.error(error);
    throw error;
  }

  return { data, error };
};

/** **************************************
 * Sign in with OAuth (Google, GitHub, etc.)
 *************************************** */
export const signInWithOAuth = async (provider: 'google' | 'github' | 'twitter') => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
      // Enable automatic account linking by email
      queryParams: {
        access_type: 'offline',
        prompt: 'consent',
      },
      // Request additional scopes to get profile picture
      scopes: 'profile email https://www.googleapis.com/auth/userinfo.profile',
    },
  });

  if (error) {
    console.error(error);
    throw error;
  }

  return { data, error };
};
