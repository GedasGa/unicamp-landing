'use client';

import { m } from 'framer-motion';

import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { RouterLink } from 'src/routes/components';

import { useTranslate } from 'src/locales';
import { SimpleLayout } from 'src/layouts/simple';

import { varBounce, MotionContainer } from 'src/components/animate';

// ----------------------------------------------------------------------

export function NotFoundView() {
  const { t } = useTranslate('common', { keyPrefix: 'notFound' });

  return (
    <SimpleLayout content={{ compact: true }}>
      <Container component={MotionContainer}>
        <m.div variants={varBounce().in}>
          <Typography variant="h3" sx={{ mb: 2 }}>
            {t('heading')}
          </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <Typography sx={{ color: 'text.secondary' }}>{t('description')}</Typography>
        </m.div>

        {/* <m.div variants={varBounce().in}> */}
        {/*  <PageNotFoundIllustration sx={{ my: { xs: 5, sm: 10 } }} /> */}
        {/* </m.div> */}

        <Button
          component={RouterLink}
          href="/"
          size="large"
          variant="contained"
          sx={{ mt: { xs: 5, sm: 10 } }}
        >
          {t('cta')}
        </Button>
      </Container>
    </SimpleLayout>
  );
}
