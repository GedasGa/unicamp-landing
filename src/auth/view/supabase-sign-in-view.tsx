'use client';

import { z as zod } from 'zod';
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
import { useRouter, useSearchParams } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/use-boolean';

import { useTranslate } from 'src/locales';

import { Iconify } from 'src/components/iconify';
import { Form, Field } from 'src/components/hook-form';

import { useAuthContext } from '../hooks';
import { authErrorMessage } from '../auth-error';
import { FormHead } from '../components/form-head';
import { FormDivider } from '../components/form-divider';
import { FormSocials } from '../components/form-socials';
import { signInWithOAuth, signInWithPassword } from '../context';

// ----------------------------------------------------------------------

export type SignInSchemaType = zod.infer<typeof SignInSchema>;

export const SignInSchema = zod.object({
  email: zod
    .string()
    .min(1, { message: 'auth:errors.emailRequired' })
    .email({ message: 'auth:errors.emailInvalid' }),
  password: zod
    .string()
    .min(1, { message: 'auth:errors.passwordRequired' })
    .min(6, { message: 'auth:errors.passwordMin' }),
});

// ----------------------------------------------------------------------

export function SupabaseSignInView() {
  const { t } = useTranslate('auth');

  const router = useRouter();

  const searchParams = useSearchParams();

  const { checkUserSession } = useAuthContext();

  const [errorMsg, setErrorMsg] = useState('');

  const password = useBoolean();

  // Parse error from URL hash (Supabase redirects with errors in hash)
  useEffect(() => {
    const { hash } = window.location;
    if (hash) {
      const params = new URLSearchParams(hash.substring(1));
      const error = params.get('error');
      const errorDescription = params.get('error_description');

      if (error) {
        const message = errorDescription
          ? decodeURIComponent(errorDescription.replace(/\+/g, ' '))
          : error;
        setErrorMsg(authErrorMessage(message, t));
      }
    }
  }, [t]);

  const defaultValues = {
    email: '',
    password: '',
  };

  const methods = useForm<SignInSchemaType>({
    resolver: zodResolver(SignInSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await signInWithPassword({ email: data.email, password: data.password });
      await checkUserSession?.();

      const returnTo = searchParams.get('returnTo') || paths.app.root;

      router.push(returnTo);
    } catch (error) {
      console.error(error);
      setErrorMsg(authErrorMessage(error, t));
    }
  });

  const handleGoogleSignIn = async () => {
    try {
      await signInWithOAuth('google');
    } catch (error) {
      console.error(error);
      setErrorMsg(authErrorMessage(error, t));
    }
  };

  const renderForm = (
    <Box gap={3} display="flex" flexDirection="column">
      <Field.Text name="email" label={t('fields.email')} InputLabelProps={{ shrink: true }} />

      <Box gap={1.5} display="flex" flexDirection="column">
        <Link
          component={RouterLink}
          href={paths.auth.resetPassword}
          variant="body2"
          color="inherit"
          sx={{ alignSelf: 'flex-end' }}
        >
          {t('signIn.forgotPassword')}
        </Link>

        <Field.Text
          name="password"
          label={t('fields.password')}
          placeholder={t('fields.passwordPlaceholder')}
          type={password.value ? 'text' : 'password'}
          InputLabelProps={{ shrink: true }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={password.onToggle} edge="end">
                  <Iconify icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <LoadingButton
        fullWidth
        color="inherit"
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
        loadingIndicator={t('signIn.submitting')}
      >
        {t('signIn.submit')}
      </LoadingButton>
    </Box>
  );

  return (
    <>
      <FormHead
        title={t('signIn.title')}
        description={
          <>
            {`${t('signIn.noAccount')} `}
            <Link component={RouterLink} href={paths.auth.signUp} variant="subtitle2">
              {t('signIn.register')}
            </Link>
          </>
        }
        sx={{ textAlign: { xs: 'center', md: 'left' } }}
      />

      {!!errorMsg && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {errorMsg}
        </Alert>
      )}

      <FormSocials signInWithGoogle={handleGoogleSignIn} />

      <FormDivider />

      <Form methods={methods} onSubmit={onSubmit}>
        {renderForm}
      </Form>
    </>
  );
}
