import type { BoxProps } from '@mui/material/Box';

import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import { TwitterIcon, FacebookIcon, LinkedinIcon, InstagramIcon } from 'src/assets/icons';

import { Image } from 'src/components/image';
import { varFade, MotionViewport } from 'src/components/animate';
import { Carousel, useCarousel, CarouselArrowFloatButtons } from 'src/components/carousel';
import { useTranslate } from '../../locales';
import { CONFIG } from '../../config-global';
import { Logo } from '../../components/logo';
import { Label } from '../../components/label';

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

  const carousel = useCarousel({
    align: 'start',
    slideSpacing: '24px',
    slidesToShow: { xs: 1, sm: 2, md: 3, lg: 4 },
  });

  return (
    <Box component="section" sx={{ overflow: 'hidden', ...sx }} {...other}>
      <Container component={MotionViewport} sx={{ textAlign: 'center', pt: { xs: 10, md: 0 } }}>
        <m.div variants={varFade().inDown}>
          <Logo />
        </m.div>
        <m.div variants={varFade().inUp}>
          <Typography variant="h2" sx={{ my: 3 }}>
            {t('team.heading')}
          </Typography>
        </m.div>

        <m.div variants={varFade().inUp}>
          <Typography sx={{ mx: 'auto', maxWidth: 640, color: 'text.secondary' }}>
            {t('team.description')}
          </Typography>
        </m.div>

        <Box sx={{ position: 'relative' }}>
          <CarouselArrowFloatButtons {...carousel.arrows} options={carousel.options} />

          <Carousel carousel={carousel} sx={{ px: 0.5 }}>
            {MEMBERS.map((member) => (
              <Box
                key={member.name}
                component={m.div}
                variants={varFade().in}
                sx={{ py: { xs: 8, md: 10 } }}
              >
                <MemberCard member={member} />
              </Box>
            ))}
          </Carousel>
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
      <Typography variant="subtitle1" sx={{ mt: 2.5, mb: 0.5 }}>
        {t(member.name)}
      </Typography>

      <Typography variant="body2" sx={{ mb: 2.5, color: 'text.secondary' }}>
        {t(member.role)}
      </Typography>

      <Box sx={{ position: 'relative', px: 1 }}>
        {member.isMentor && (
          <Label
            sx={{
              position: 'absolute',
              top: 10,
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
          sx={{ borderRadius: 2 }}
        />
      </Box>

      <Box display="flex" alignItems="center" justifyContent="center" sx={{ p: 2 }}>
        {member.socials.map((social) => (
          <IconButton
            key={social.label}
            href={social.link}
            color="inherit"
            target="_blank"
            rel="noopener noreferrer"
          >
            {social.value === 'facebook' && <FacebookIcon />}
            {social.value === 'instagram' && <InstagramIcon />}
            {social.value === 'linkedin' && <LinkedinIcon />}
            {social.value === 'twitter' && <TwitterIcon />}
          </IconButton>
        ))}
      </Box>
    </Card>
  );
};
