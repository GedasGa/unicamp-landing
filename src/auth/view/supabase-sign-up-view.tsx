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
import { useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { useBoolean } from 'src/hooks/use-boolean';

import { useTranslate } from 'src/locales';

import { Iconify } from 'src/components/iconify';
import { Form, Field } from 'src/components/hook-form';

import { authErrorMessage } from '../auth-error';
import { FormHead } from '../components/form-head';
import { signUp, signInWithOAuth } from '../context';
import { FormDivider } from '../components/form-divider';
import { FormSocials } from '../components/form-socials';
import { SignUpTerms } from '../components/sign-up-terms';

// ----------------------------------------------------------------------

export type SignUpSchemaType = zod.infer<typeof SignUpSchema>;

export const SignUpSchema = zod.object({
  firstName: zod.string().min(1, { message: 'auth:errors.firstNameRequired' }),
  lastName: zod.string().min(1, { message: 'auth:errors.lastNameRequired' }),
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

export function SupabaseSignUpView() {
  const { t } = useTranslate('auth');

  const [errorMsg, setErrorMsg] = useState('');

  const router = useRouter();

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
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  };

  const methods = useForm<SignUpSchemaType>({
    resolver: zodResolver(SignUpSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await signUp({
        email: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
      });

      router.push(paths.auth.verify);
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
      <Box display="flex" gap={{ xs: 3, sm: 2 }} flexDirection={{ xs: 'column', sm: 'row' }}>
        <Field.Text
          name="firstName"
          label={t('fields.firstName')}
          InputLabelProps={{ shrink: true }}
        />
        <Field.Text
          name="lastName"
          label={t('fields.lastName')}
          InputLabelProps={{ shrink: true }}
        />
      </Box>

      <Field.Text name="email" label={t('fields.email')} InputLabelProps={{ shrink: true }} />

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
                <Iconify
                  icon={
                    password.value
                      ? 'iconmind:observability-outline-thin'
                      : 'iconmind:eye-off-outline-thin'
                  }
                />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <LoadingButton
        fullWidth
        color="inherit"
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
        loadingIndicator={t('signUp.submitting')}
      >
        {t('signUp.submit')}
      </LoadingButton>
    </Box>
  );

  return (
    <>
      <FormHead
        title={t('signUp.title')}
        description={
          <>
            {`${t('signUp.haveAccount')} `}
            <Link component={RouterLink} href={paths.auth.signIn} variant="subtitle2">
              {t('signUp.signIn')}
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

      <SignUpTerms />
    </>
  );
}
