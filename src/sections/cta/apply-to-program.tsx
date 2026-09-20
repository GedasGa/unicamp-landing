import { z as zod } from 'zod';
import { useForm } from 'react-hook-form';
import { useMemo, useState, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { sendGAEvent } from '@next/third-parties/google';

import Alert from '@mui/material/Alert';
import { Box, Link } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

import { RADIUS, varAlpha } from 'src/theme/styles';
import { submitProgramApplication } from 'src/actions/program-application';

import { Form, Field } from 'src/components/hook-form';

import { paths } from '../../routes/paths';
import { useTranslate } from '../../locales';
import { ConfirmDialog } from '../../components/custom-dialog';

import type { ConfirmDialogProps } from '../../components/custom-dialog/types';

// ----------------------------------------------------------------------

export type ApplyToProgramProps = Omit<ConfirmDialogProps, 'title' | 'action' | 'content'> & {
  course?: string;
};

// ----------------------------------------------------------------------

export type ApplyToProgramSchemaType = zod.infer<typeof ApplyToProgramSchema>;

export const ApplyToProgramSchema = zod.object({
  course: zod.string().min(1, { message: 'Course is required' }),
  name: zod.string().min(2, { message: 'apply-form:name_required' }),
  email: zod
    .string()
    .min(1, { message: 'apply-form:email_required' })
    .email({ message: 'apply-form:email_invalid' }),
  phone: zod.string().optional(),
  message: zod.string().optional(),
});

const COURSES = ['webDevelopment', 'productDesign'];

// ----------------------------------------------------------------------

export function ApplyToProgram({ open, onClose, course, ...other }: ApplyToProgramProps) {
  const { t } = useTranslate('apply-form');

  const nextSteps = (t('next_steps.items', { returnObjects: true, defaultValue: [] }) ??
    []) as string[];

  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const defaultValues = useMemo(
    () => ({
      course: course || 'webDevelopment',
      name: '',
      email: '',
      password: '',
      phone: '',
      message: '',
    }),
    [course]
  );

  const methods = useForm<ApplyToProgramSchemaType>({
    resolver: zodResolver(ApplyToProgramSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = methods;

  useEffect(() => {
    if (!isSubmitted) {
      return undefined;
    }

    const timer = setTimeout(() => {
      // Close the dialog and clear the form once the confirmation has been read.
      onClose();
      setIsSubmitted(false);
      reset();
    }, 6000);

    return () => clearTimeout(timer);
  }, [isSubmitted, onClose, reset]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      const result = await submitProgramApplication(data);

      if (!result.success) {
        throw new Error(result.error || t('something_went_wrong'));
      }

      setIsSubmitted(true);
      sendGAEvent('event', 'conversion', {
        send_to: 'AW-16969899641/8LsECNyz1rIaEPm88Js_',
        value: 1.0,
        currency: 'EUR',
      });
    } catch (error) {
      console.error('Error:', error);
      setErrorMsg(typeof error === 'string' ? error : error.message);
    }
  });

  const content = isSubmitted ? (
    <Box display="flex" flexDirection="column" sx={{ my: 3 }} gap={2}>
      <Typography variant="body1">{t('form_submitted.description')}</Typography>
    </Box>
  ) : (
    <>
      {!!errorMsg && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {errorMsg}
        </Alert>
      )}

      {/* Say what happens after sending, so the form is not a black box. */}
      {nextSteps.length > 0 && (
        <Box
          sx={(theme) => ({
            p: 2,
            mt: 3,
            borderRadius: RADIUS.md,
            bgcolor: varAlpha(theme.vars.palette.grey['500Channel'], 0.08),
          })}
        >
          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            {t('next_steps.title')}
          </Typography>

          <Box component="ol" sx={{ m: 0, pl: 2.5, typography: 'body2', color: 'text.secondary' }}>
            {nextSteps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </Box>
        </Box>
      )}

      <Form id="apply-program-form" methods={methods} onSubmit={onSubmit}>
        <Box gap={3} display="flex" flexDirection="column" sx={{ mt: 3 }}>
          <Field.Select name="course" label={t('course')}>
            {COURSES.map((option) => (
              <MenuItem key={option} value={option}>
                {t(option)}
              </MenuItem>
            ))}
          </Field.Select>
          <Box display="flex" gap={{ xs: 3, sm: 2 }} flexDirection={{ xs: 'column', sm: 'row' }}>
            <Field.Text name="name" label={t('name')} InputLabelProps={{ shrink: true }} required />
          </Box>

          <Field.Text
            name="email"
            placeholder={' '}
            label={t('email')}
            InputLabelProps={{ shrink: true }}
            required
          />

          <Field.Phone
            name="phone"
            label={t('phone')}
            placeholder="61008080"
            InputLabelProps={{ shrink: true }}
            country="LT"
          />

          <Field.Text
            name="message"
            label={t('message')}
            multiline
            minRows={4}
            InputLabelProps={{ shrink: true }}
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
      form="apply-program-form"
      fullWidth
      color="inherit"
      type="submit"
      variant="contained"
      loading={isSubmitting}
      loadingIndicator={t('loading')}
    >
      {t('apply')}
    </LoadingButton>
  );

  return (
    <ConfirmDialog
      open={open}
      title={isSubmitted ? t('form_submitted.title') : t('title')}
      onClose={onClose}
      content={content}
      action={action}
      showActions={!isSubmitted}
      {...other}
    />
  );
}
