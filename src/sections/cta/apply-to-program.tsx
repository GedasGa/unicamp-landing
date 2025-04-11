import { z as zod } from 'zod';
import { useTranslate } from '../../locales';
import { ConfirmDialog } from '../../components/custom-dialog';
import { ConfirmDialogProps } from '../../components/custom-dialog/types';
import { Form, Field } from 'src/components/hook-form';
import { Box, Link } from '@mui/material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import LoadingButton from '@mui/lab/LoadingButton';
import { useEffect, useMemo, useState } from 'react';
import Alert from '@mui/material/Alert';
import { paths } from '../../routes/paths';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { sendGAEvent, sendGTMEvent } from '@next/third-parties/google';

// ----------------------------------------------------------------------

export type ApplyToProgramProps = Omit<ConfirmDialogProps, 'title' | 'action' | 'content'> & {
  course?: string;
};

// ----------------------------------------------------------------------

export type ApplyToProgramSchemaType = zod.infer<typeof ApplyToProgramSchema>;

export const ApplyToProgramSchema = zod.object({
  course: zod.string().optional(),
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
    if (isSubmitted) {
      const timer = setTimeout(() => {
        // Reset form and close the modal after 5 seconds
        onClose();
        setIsSubmitted(false);
        reset();
      }, 6000);

      return () => clearTimeout(timer); // Cleanup timeout if component unmounts
    }
  }, [isSubmitted, onClose]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await fetch('https://www.formbackend.com/f/1606cadb8b273519', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.status === 422) {
        throw new Error(t('validation_error'));
      } else if (!response.ok) {
        throw new Error(t('something_went_wrong'));
      }

      const responseData = await response.json();
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

      <Form id="apply-program-form" methods={methods} onSubmit={onSubmit}>
        <Box gap={3} display="flex" flexDirection="column" sx={{ mt: 3 }}>
          <Field.Select name="course" label={t('course')}>
            {COURSES.map((course) => (
              <MenuItem key={course} value={course}>
                {t(course)}
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
            placeholder={'61008080'}
            InputLabelProps={{ shrink: true }}
            country={'LT'}
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
      form={'apply-program-form'}
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
