import type { BoxProps } from '@mui/material/Box';

import { m, useReducedMotion } from 'framer-motion';

import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import Container from '@mui/material/Container';

import { RADIUS } from 'src/theme/styles';

import { varFade, MotionViewport } from 'src/components/animate';

import { useTranslate } from '../../locales';
import { CONFIG } from '../../config-global';
import { SectionTitle } from './components/section-title';
import { SECTION_PADDING } from './components/section-spacing';

// ----------------------------------------------------------------------

type Tool = {
  id: string;
  name: string;
  logo?: string;
  // The logo is a full app icon (with its own background) and fills the tile.
  fill?: boolean;
  // Desktop position around the heading, in % of the section (centre of the tile).
  x: number;
  y: number;
};

const TOOLS_DIR = `${CONFIG.assetsDir}/assets/images/home/tools`;

// Tools without `logo` show their initials until an image is added.
const TOOLS: Tool[] = [
  // Top row
  {
    id: 'cursor',
    name: 'Cursor',
    logo: `${TOOLS_DIR}/cursor.png`,
    fill: true,
    x: 5,
    y: 10,
  },
  {
    id: 'lovable',
    name: 'Lovable',
    logo: `${TOOLS_DIR}/lovable.png`,
    fill: true,
    x: 23,
    y: 3,
  },
  {
    id: 'figma',
    name: 'Figma',
    logo: `${TOOLS_DIR}/figma.svg`,
    x: 41,
    y: 8,
  },
  {
    id: 'claude',
    name: 'Claude',
    logo: `${TOOLS_DIR}/claude.png`,
    fill: true,
    x: 59,
    y: 8,
  },
  {
    id: 'openai',
    name: 'OpenAI',
    logo: `${TOOLS_DIR}/openai.jpg`,
    x: 77,
    y: 3,
  },
  {
    id: 'github',
    name: 'GitHub',
    logo: `${TOOLS_DIR}/github.png`,
    x: 95,
    y: 10,
  },
  // Left side
  {
    id: 'google',
    name: 'Google',
    logo: `${TOOLS_DIR}/google.png`,
    x: 13,
    y: 32,
  },
  {
    id: 'slack',
    name: 'Slack',
    logo: `${TOOLS_DIR}/slack.webp`,
    x: 4,
    y: 52,
  },
  {
    id: 'n8n',
    name: 'n8n',
    logo: `${TOOLS_DIR}/n8n.png`,
    x: 15,
    y: 70,
  },
  // Right side
  {
    id: 'supabase',
    name: 'Supabase',
    logo: `${TOOLS_DIR}/supabase.jpeg`,
    x: 87,
    y: 32,
  },
  {
    id: 'zapier',
    name: 'Zapier',
    logo: `${TOOLS_DIR}/zapier.png`,
    x: 96,
    y: 52,
  },
  {
    id: 'canva',
    name: 'Canva',
    logo: `${TOOLS_DIR}/canva.jpeg`,
    x: 85,
    y: 70,
  },
  // Bottom row
  {
    id: 'hostinger',
    name: 'Hostinger',
    logo: `${TOOLS_DIR}/hostinger.svg`,
    x: 7,
    y: 92,
  },
  {
    id: 'openclaw',
    name: 'OpenClaw',
    logo: `${TOOLS_DIR}/openclaw.png`,
    x: 24,
    y: 97,
  },
  {
    id: 'unicampLearning',
    name: 'Unicamp Learning',
    logo: `${TOOLS_DIR}/unicampplatform.png`,
    x: 41,
    y: 90,
  },
  {
    id: 'hermes',
    name: 'Hermes',
    logo: `${TOOLS_DIR}/hermes.png`,
    x: 59,
    y: 97,
  },
  {
    id: 'elevenlabs',
    name: 'ElevenLabs',
    logo: `${TOOLS_DIR}/elevenlabs.png`,
    x: 76,
    y: 90,
  },
  {
    id: 'speechify',
    name: 'Speechify',
    logo: `${TOOLS_DIR}/speechify.png`,
    fill: true,
    x: 93,
    y: 96,
  },
];

// ----------------------------------------------------------------------

export function HomeTools({ sx, ...other }: BoxProps) {
  const { t } = useTranslate('home');

  return (
    <Box component="section" sx={{ py: SECTION_PADDING, overflow: 'hidden', ...sx }} {...other}>
      <Container component={MotionViewport}>
        <Box
          sx={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: { md: 640 },
            // Tiles are centred on their positions, so the outer rows stick out top and bottom.
            my: { md: 3 },
          }}
        >
          <SectionTitle
            title={t('tools.title')}
            description={t('tools.description')}
            sx={{ textAlign: 'center', maxWidth: 480, mx: 'auto', position: 'relative' }}
          />

          {/* Desktop: logos float around the heading */}
          <Box sx={{ display: { xs: 'none', md: 'block' } }}>
            {TOOLS.map((tool, index) => (
              <Box
                key={tool.id}
                sx={{
                  position: 'absolute',
                  left: `${tool.x}%`,
                  top: `${tool.y}%`,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                <ToolTile tool={tool} index={index} />
              </Box>
            ))}
          </Box>
        </Box>

        {/* Mobile: logos wrap below the text */}
        <Box
          sx={{
            mt: 6,
            gap: { xs: 1, sm: 2 },
            display: { xs: 'grid', md: 'none' },
            // 6 per row keeps the 18 logos in full rows; tiles shrink on narrow phones.
            gridTemplateColumns: 'repeat(6, minmax(0, 56px))',
            justifyContent: 'center',
          }}
        >
          {TOOLS.map((tool, index) => (
            <ToolTile key={tool.id} tool={tool} index={index} />
          ))}
        </Box>
      </Container>
    </Box>
  );
}

// ----------------------------------------------------------------------

function ToolTile({ tool, index }: { tool: Tool; index: number }) {
  const { t } = useTranslate('home');
  const reduceMotion = useReducedMotion();

  const initials = tool.name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .slice(0, 2);

  return (
    <m.div variants={varFade().in}>
      <m.div
        animate={reduceMotion ? undefined : { y: [0, -10, 0] }}
        transition={{
          duration: 4 + (index % 4),
          delay: (index % 5) * 0.4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <Tooltip
          enterTouchDelay={0}
          title={
            <Box sx={{ p: 0.5, textAlign: 'center' }}>
              <Box sx={{ typography: 'subtitle2' }}>{tool.name}</Box>
              <Box sx={{ typography: 'caption', opacity: 0.8 }}>{t(`tools.items.${tool.id}`)}</Box>
            </Box>
          }
        >
          <Box
            tabIndex={0}
            role="img"
            aria-label={tool.name}
            sx={(theme) => ({
              width: { xs: 1, md: 80 },
              aspectRatio: '1 / 1',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: RADIUS.lg,
              overflow: 'hidden',
              bgcolor: 'background.paper',
              boxShadow: theme.customShadows.card,
              cursor: 'default',
              transition: theme.transitions.create(['transform', 'box-shadow']),
              '&:hover, &:focus-visible': {
                transform: 'scale(1.08)',
                boxShadow: theme.customShadows.z12,
              },
              '&:focus-visible': {
                outline: `2px solid ${theme.vars.palette.primary.main}`,
                outlineOffset: 2,
              },
            })}
          >
            {tool.logo ? (
              <Box
                component="img"
                src={tool.logo}
                alt=""
                sx={
                  tool.fill
                    ? { width: 1, height: 1, objectFit: 'cover' }
                    : { width: '60%', height: '60%', objectFit: 'contain' }
                }
              />
            ) : (
              <Box
                component="span"
                sx={{ typography: { xs: 'subtitle1', md: 'h5' }, color: 'text.primary' }}
              >
                {initials}
              </Box>
            )}
          </Box>
        </Tooltip>
      </m.div>
    </m.div>
  );
}
