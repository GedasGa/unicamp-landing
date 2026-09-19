import { z as zod } from 'zod';
import posthog from 'posthog-js';
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

import { submitSaveSpot } from 'src/actions/save-spot';

import { Form, Field } from 'src/components/hook-form';

import { paths } from '../../routes/paths';
import { useTranslate } from '../../locales';
import { ConfirmDialog } from '../../components/custom-dialog';

// ----------------------------------------------------------------------

type SaveSpotSchemaType = zod.infer<typeof SaveSpotSchema>;

const SaveSpotSchema = zod.object({
  email: zod
    .string()
    .min(1, { message: 'apply-form:email_required' })
    .email({ message: 'apply-form:email_invalid' }),
});

type Props = {
  open: boolean;
  onClose: () => void;
};

// ----------------------------------------------------------------------

export function SaveSpotDialog({ open, onClose }: Props) {
  const { t } = useTranslate('apply-form');

  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const methods = useForm<SaveSpotSchemaType>({
    resolver: zodResolver(SaveSpotSchema),
    defaultValues: { email: '' },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = methods;

  // Close automatically a few seconds after a successful sign-up.
  useEffect(() => {
    if (!isSubmitted) return undefined;

    const timer = setTimeout(() => {
      onClose();
      setIsSubmitted(false);
      reset();
    }, 6000);

    return () => clearTimeout(timer);
  }, [isSubmitted, onClose, reset]);

  const onSubmit = handleSubmit(async ({ email }) => {
    setErrorMsg('');

    const result = await submitSaveSpot(email);

    if (!result.success) {
      setErrorMsg(result.error || t('something_went_wrong'));
      return;
    }

    posthog.capture('save_spot_submitted');
    setIsSubmitted(true);
  });

  const content = isSubmitted ? (
    <Typography sx={{ my: 3 }}>{t('saveSpot.submitted.description')}</Typography>
  ) : (
    <>
      <Typography sx={{ mt: 1, color: 'text.secondary' }}>{t('saveSpot.description')}</Typography>

      {!!errorMsg && (
        <Alert severity="error" sx={{ mt: 3 }}>
          {errorMsg}
        </Alert>
      )}

      <Form id="save-spot-form" methods={methods} onSubmit={onSubmit}>
        <Box sx={{ mt: 3 }}>
          <Field.Text
            name="email"
            type="email"
            autoComplete="email"
            placeholder=" "
            label={t('email')}
            InputLabelProps={{ shrink: true }}
            required
            autoFocus
          />
        </Box>
      </Form>

      <Box
        component="span"
        sx={{
          mt: 3,
          display: 'block',
          textAlign: 'center',
          typography: 'caption',
          color: 'text.secondary',
        }}
      >
        {t('disclaimer_start')}{' '}
        <Link underline="always" color="text.primary" href={paths.privacyPolicy} target="_blank">
          {t('privacy_policy')}
        </Link>
        .
      </Box>
    </>
  );

  const action = (
    <LoadingButton
      form="save-spot-form"
      fullWidth
      color="inherit"
      type="submit"
      variant="contained"
      loading={isSubmitting}
      loadingIndicator={t('loading')}
    >
      {t('saveSpot.submit')}
    </LoadingButton>
  );

  return (
    <ConfirmDialog
      open={open}
      title={isSubmitted ? t('saveSpot.submitted.title') : t('saveSpot.title')}
      onClose={onClose}
      content={content}
      action={action}
      showActions={!isSubmitted}
    />
  );
}
