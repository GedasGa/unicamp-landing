import type { BoxProps } from '@mui/material/Box';

import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { RADIUS } from 'src/theme/styles';

import { Image } from 'src/components/image';
import { varFade, MotionViewport } from 'src/components/animate';

import { useTranslate } from '../../locales';
import { CONFIG } from '../../config-global';
import { Label } from '../../components/label';
import { SectionTitle } from './components/section-title';
import { SECTION_PADDING, SECTION_CONTENT_GAP } from './components/section-spacing';

// ----------------------------------------------------------------------

const SOCIAL_NAMES: Record<string, string> = {
  facebook: 'Facebook',
  instagram: 'Instagram',
  linkedin: 'LinkedIn',
  twitter: 'X',
};

// ----------------------------------------------------------------------

const MEMBERS = [
  {
    avatarUrl: `${CONFIG.assetsDir}/assets/images/home/team/Gedas.png`,
    name: 'team.members.0.name',
    role: 'team.members.0.role',
    isMentor: true,
    socials: [
      {
        label: 'Linkedin',
        value: 'linkedin',
        link: 'https://www.linkedin.com/in/gedas-gardauskas',
      },
    ],
  },
  {
    avatarUrl: `${CONFIG.assetsDir}/assets/images/home/team/Mindaugas.png`,
    name: 'team.members.1.name',
    role: 'team.members.1.role',
    isMentor: false,
    socials: [
      {
        label: 'Linkedin',
        value: 'linkedin',
        link: 'https://www.linkedin.com/in/mindaugas-pazereckas',
      },
    ],
  },
  {
    avatarUrl: `${CONFIG.assetsDir}/assets/images/home/team/Aiste.png`,
    name: 'team.members.2.name',
    role: 'team.members.2.role',
    isMentor: true,
    socials: [
      {
        label: 'Linkedin',
        value: 'linkedin',
        link: 'https://www.linkedin.com/in/aistegerd/',
      },
    ],
  },
  {
    avatarUrl: `${CONFIG.assetsDir}/assets/images/home/team/Toshi.png`,
    name: 'team.members.3.name',
    role: 'team.members.3.role',
    isMentor: false,
    socials: [
      {
        label: 'Instagram',
        value: 'instagram',
        link: 'https://www.instagram.com/',
      },
    ],
  },
];

// ----------------------------------------------------------------------

export function HomeTeam({ sx, ...other }: BoxProps) {
  const { t } = useTranslate('home');

  return (
    <Box component="section" sx={{ py: SECTION_PADDING, overflow: 'hidden', ...sx }} {...other}>
      <Container component={MotionViewport} sx={{ textAlign: 'center' }}>
        <SectionTitle
          title={t('team.heading')}
          description={t('team.description')}
          sx={{ maxWidth: 640, mx: 'auto' }}
        />

        {/* All members are always visible, so nobody is hidden behind a carousel. */}
        <Box
          sx={{
            mt: SECTION_CONTENT_GAP,
            gap: 3,
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
            maxWidth: { xs: 360, sm: 1 },
            mx: 'auto',
          }}
        >
          {MEMBERS.map((member) => (
            <Box key={member.name} component={m.div} variants={varFade().in}>
              <MemberCard member={member} />
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}

// ----------------------------------------------------------------------

type MemberCardProps = {
  member: (typeof MEMBERS)[number];
};

const MemberCard = ({ member }: MemberCardProps) => {
  const { t } = useTranslate('home');
  return (
    <Card>
      <Box sx={{ position: 'relative', px: 1, pt: 1 }}>
        {member.isMentor && (
          <Label
            sx={{
              position: 'absolute',
              top: 20,
              left: 20,
              zIndex: 1,
            }}
            variant="filled"
          >
            {t('team.mentor')}
          </Label>
        )}
        <Image
          alt={t(member.name)}
          src={member.avatarUrl}
          ratio="1/1.25"
          sx={{ borderRadius: RADIUS.md }}
        />
      </Box>

      <Typography variant="subtitle1" sx={{ mt: 2.5, mb: 0.5 }}>
        {t(member.name)}
      </Typography>

      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        {t(member.role)}
      </Typography>

      <Box display="flex" flexDirection="column" gap={1} sx={{ p: 2 }}>
        {member.socials.map((social) => (
          <Button
            key={social.label}
            fullWidth
            variant="outlined"
            color="inherit"
            href={social.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t('team.viewProfile', { network: SOCIAL_NAMES[social.value] ?? social.label })}
          </Button>
        ))}
      </Box>
    </Card>
  );
};
