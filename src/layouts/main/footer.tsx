import type { Theme, SxProps, Breakpoint } from '@mui/material/styles';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import { useTheme } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { Logo } from 'src/components/logo';
import { Iconify } from 'src/components/iconify';

import { useTranslate } from '../../locales';

// ----------------------------------------------------------------------

const SOCIAL_ICONS: Record<string, string> = {
  facebook: 'mdi:facebook',
  instagram: 'mdi:instagram',
  linkedin: 'mdi:linkedin',
};

// ----------------------------------------------------------------------

const LINKS = [
  {
    headline: 'links.legal.headline',
    children: [
      { name: 'links.legal.children.terms', href: paths.termsOfService },
      { name: 'links.legal.children.privacy', href: paths.privacyPolicy },
    ],
  },
  {
    headline: 'links.contact.headline',
    children: [
      { name: 'info@unicamp.lt', href: 'mailto:info@unicamp.lt' },
      { name: '+370 610 08080', href: 'tel:+37061008080' },
    ],
  },
];

const SOCIALS = [
  {
    value: 'facebook',
    label: 'Facebook',
    link: 'https://www.facebook.com/profile.php?id=61568514785007',
  },
  {
    value: 'instagram',
    label: 'Instagram',
    link: 'https://www.instagram.com/unicamplt',
  },
  {
    value: 'linkedin',
    label: 'Linkedin',
    link: 'https://www.linkedin.com/company/105553068',
  },
];

// ----------------------------------------------------------------------

export type FooterProps = {
  layoutQuery: Breakpoint;
  sx?: SxProps<Theme>;
};

export function Footer({ layoutQuery, sx }: FooterProps) {
  const theme = useTheme();
  const { t } = useTranslate('footer');

  return (
    <Box component="footer" sx={{ position: 'relative', bgcolor: 'background.default', ...sx }}>
      <Container
        sx={{
          pb: 5,
          textAlign: 'center',
          [theme.breakpoints.up(layoutQuery)]: { textAlign: 'unset' },
        }}
      >
        {/* Divider sits inside the container so it lines up with the content width. */}
        <Divider sx={{ mb: 10 }} />

        {/* Same logo and size as the header. */}
        <Logo onlyLogo={false} width={160} />

        <Grid
          container
          sx={{
            mt: 3,
            justifyContent: 'center',
            [theme.breakpoints.up(layoutQuery)]: { justifyContent: 'space-between' },
          }}
        >
          <Grid {...{ xs: 12, [layoutQuery]: 3 }}>
            <Typography
              variant="body2"
              sx={{
                mx: 'auto',
                maxWidth: 280,
                [theme.breakpoints.up(layoutQuery)]: { mx: 'unset' },
              }}
            >
              {t('description')}
            </Typography>

            <Stack
              direction="row"
              sx={{
                mt: 3,
                mb: 5,
                justifyContent: 'center',
                [theme.breakpoints.up(layoutQuery)]: { mb: 0, justifyContent: 'flex-start' },
              }}
            >
              {SOCIALS.map((social) => (
                <IconButton
                  key={social.label}
                  href={social.link}
                  color="inherit"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                >
                  {/* Monochrome icons that follow the text colour, like the rest of the page. */}
                  <Iconify icon={SOCIAL_ICONS[social.value]} width={22} />
                </IconButton>
              ))}
            </Stack>
          </Grid>

          <Grid {...{ xs: 12, [layoutQuery]: 6 }}>
            <Stack
              spacing={5}
              sx={{
                flexDirection: 'column',
                [theme.breakpoints.up(layoutQuery)]: { flexDirection: 'row' },
              }}
            >
              {LINKS.map((list) => (
                <Stack
                  key={list.headline}
                  spacing={2}
                  sx={{
                    width: 1,
                    alignItems: 'center',
                    [theme.breakpoints.up(layoutQuery)]: { alignItems: 'flex-start' },
                  }}
                >
                  <Typography component="div" variant="overline">
                    {t(list.headline)}
                  </Typography>

                  {list.children.map((link) => (
                    <Link
                      key={link.name}
                      component={RouterLink}
                      href={link.href}
                      color="inherit"
                      variant="body2"
                    >
                      {t(link.name)}
                    </Link>
                  ))}
                </Stack>
              ))}
            </Stack>
          </Grid>
        </Grid>

        <Typography variant="body2" sx={{ mt: 10 }}>
          © {t('allRightsReserved')}
        </Typography>
      </Container>
    </Box>
  );
}

// ----------------------------------------------------------------------

export type HomeFooterProps = {
  sx?: SxProps<Theme>;
};

export function HomeFooter({ sx }: HomeFooterProps) {
  const { t } = useTranslate('footer');

  return (
    <Box
      component="footer"
      sx={{
        py: 5,
        textAlign: 'center',
        position: 'relative',
        bgcolor: 'background.default',
        ...sx,
      }}
    >
      <Container>
        <Logo />
        <Box sx={{ mt: 1, typography: 'caption' }}>© {t('allRightsReserved')}</Box>
      </Container>
    </Box>
  );
}
