import type { Theme } from '@mui/material/styles';
import type { BoxProps } from '@mui/material/Box';
import type { CardProps } from '@mui/material/Card';

import { useState } from 'react';
import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';

import { RADIUS, varAlpha, SECTION_PADDING, SECTION_CONTENT_GAP } from 'src/theme/styles';

import { Iconify } from 'src/components/iconify';
import { ProgramVideo } from 'src/components/program-video';
import { varFade, MotionViewport } from 'src/components/animate';

import { paths } from '../../routes/paths';
import { useTranslate } from '../../locales';
import { CONFIG } from '../../config-global';
import { ConsultationCard } from './consultation-card';
import { SectionTitle } from './components/section-title';

// ----------------------------------------------------------------------

type Tool = {
  name: string;
  logo: string;
  // Shown until the card-specific logo is uploaded, or if it fails to load.
  fallback?: string;
  // The logo is a full app icon (with its own background) and fills the tile.
  fill?: boolean;
};

type Program = {
  id: 'webDevelopment' | 'productDesign';
  link: string;
  // Card media; a placeholder is shown until one is added.
  video?: string;
  image?: string;
  // Background of the media itself, so the frame blends with it when the media is letterboxed.
  mediaBackground?: string;
  // A few of the tools taught, shown as overlapping tiles.
  tools?: Tool[];
  // Ends the row with a "+" tile, for programmes that cover more than the tiles show.
  moreTools?: boolean;
};

const VIDEOS_DIR = `${CONFIG.assetsDir}/assets/videos/programs`;
// Card tiles have their own logos, sized for 32px, separate from the tools section's.
const PROGRAM_TOOLS_DIR = `${CONFIG.assetsDir}/assets/images/home/program-tools`;
const TOOLS_DIR = `${CONFIG.assetsDir}/assets/images/home/tools`;

export const PROGRAMS: Program[] = [
  {
    id: 'webDevelopment',
    link: paths.programs.fe,
    video: `${VIDEOS_DIR}/web-development.mp4`,
    mediaBackground: '#FFFFFF',
    tools: [
      {
        name: 'Cursor',
        logo: `${PROGRAM_TOOLS_DIR}/cursor.png`,
        fallback: `${TOOLS_DIR}/cursor.png`,
      },
      {
        name: 'Lovable',
        logo: `${PROGRAM_TOOLS_DIR}/lovable.png`,
        fallback: `${TOOLS_DIR}/lovable.png`,
      },
      {
        name: 'Supabase',
        logo: `${PROGRAM_TOOLS_DIR}/supabase.png`,
        fallback: `${TOOLS_DIR}/supabase.jpeg`,
      },
      { name: 'n8n', logo: `${PROGRAM_TOOLS_DIR}/n8n.png`, fallback: `${TOOLS_DIR}/n8n.png` },
    ],
    moreTools: true,
  },
  {
    id: 'productDesign',
    link: paths.programs.ux,
    video: `${VIDEOS_DIR}/product-design.mp4`,
    mediaBackground: '#E7E9ED',
    tools: [
      { name: 'Figma', logo: `${PROGRAM_TOOLS_DIR}/figma.png`, fallback: `${TOOLS_DIR}/figma.svg` },
      {
        name: 'Claude',
        logo: `${PROGRAM_TOOLS_DIR}/claude.png`,
        fallback: `${TOOLS_DIR}/claude.png`,
      },
      {
        name: 'Lovable',
        logo: `${PROGRAM_TOOLS_DIR}/lovable.png`,
        fallback: `${TOOLS_DIR}/lovable.png`,
      },
      {
        name: 'Cursor',
        logo: `${PROGRAM_TOOLS_DIR}/cursor.png`,
        fallback: `${TOOLS_DIR}/cursor.png`,
      },
    ],
    moreTools: true,
  },
];

// ----------------------------------------------------------------------

export function HomePrograms({ sx, ...other }: BoxProps) {
  const { t } = useTranslate('home');

  return (
    <Box component="section" sx={{ py: SECTION_PADDING, position: 'relative', ...sx }} {...other}>
      <MotionViewport>
        <Container>
          <Stack gap={SECTION_CONTENT_GAP}>
            <SectionTitle
              title={t('programs.title')}
              description={t('programs.description')}
              sx={{ textAlign: 'center' }}
            />

            <Stack gap={3}>
              {PROGRAMS.map((program) => (
                <ProgramCard key={program.id} program={program} />
              ))}
            </Stack>

            <ConsultationCard />
          </Stack>
        </Container>
      </MotionViewport>
    </Box>
  );
}

// ----------------------------------------------------------------------

type ProgramCardProps = CardProps & {
  program: Program;
};

export function ProgramCard({ program, sx, ...other }: ProgramCardProps) {
  const { t } = useTranslate('home');

  const { id, link, video, image, mediaBackground, tools, moreTools } = program;

  const renderImage = (
    <Box
      sx={(theme) => ({
        flexShrink: 0,
        width: { xs: 1, sm: 200, md: 240 },
        aspectRatio: '4 / 3',
        borderRadius: RADIUS.md,
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'text.disabled',
        border: `1px solid ${theme.vars.palette.divider}`,
        bgcolor: mediaBackground ?? varAlpha(theme.vars.palette.grey['500Channel'], 0.08),
      })}
    >
      {video ? (
        <ProgramVideo src={video} />
      ) : image ? (
        <Box component="img" src={image} alt="" sx={{ width: 1, height: 1, objectFit: 'cover' }} />
      ) : (
        <Iconify icon="iconmind:gallery-outline-thin" width={40} />
      )}
    </Box>
  );

  const renderContent = (
    <Stack spacing={1} sx={{ flex: '1 1 auto', minWidth: 0 }}>
      <Typography variant="overline" sx={{ color: 'text.disabled' }}>
        {[t('programs.meta.duration'), t('programs.meta.format'), t('programs.meta.group')].join(
          ' · '
        )}
      </Typography>

      <Typography variant="h4" component="h3">
        {t(`programs.programs.${id}.outcome`)}
      </Typography>

      <Stack
        direction="row"
        spacing={1}
        alignItems="center"
        sx={{ typography: 'body2', color: 'text.secondary' }}
      >
        <Iconify icon="iconmind:check-outline-thin" width={20} sx={{ color: 'text.primary' }} />
        <span>{t('programs.pricing.financing')}</span>
      </Stack>

      {tools && <ProgramTools tools={tools} more={moreTools} />}
    </Stack>
  );

  return (
    <Card component={m.div} variants={varFade({ distance: 24 }).inUp} sx={sx} {...other}>
      <CardActionArea
        href={link}
        sx={{
          p: { xs: 2, md: 2.5 },
          gap: { xs: 2, sm: 3 },
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: { xs: 'stretch', sm: 'center' },
          '&:hover .program-card-arrow': { transform: 'translateX(4px)' },
        }}
      >
        {renderImage}
        {renderContent}

        {/* Decorative: the whole card is the link */}
        <Fab
          component="span"
          color="inherit"
          size="medium"
          tabIndex={-1}
          aria-hidden
          className="program-card-arrow"
          sx={(theme) => ({
            flexShrink: 0,
            alignSelf: { xs: 'flex-end', sm: 'center' },
            transition: theme.transitions.create('transform'),
          })}
        >
          <Iconify icon="iconmind:arrow-right-outline-thin" width={22} />
        </Fab>
      </CardActionArea>
    </Card>
  );
}

// ----------------------------------------------------------------------

const TOOL_TILE_SIZE = 32;

// Tilts cycle so neighbouring tiles lean opposite ways, like a loose pile.
const TOOL_TILE_ANGLES = [-6, 4, -3, 6, -5];

// Overlapping tiles, each ringed in the card colour so they read as a stack.
function ProgramTools({ tools, more }: { tools: Tool[]; more?: boolean }) {
  const tileSx = (index: number) => ({
    width: TOOL_TILE_SIZE,
    height: TOOL_TILE_SIZE,
    flexShrink: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderRadius: RADIUS.sm,
    bgcolor: 'background.paper',
    zIndex: index,
    ml: index === 0 ? 0 : -0.75,
    transform: `rotate(${TOOL_TILE_ANGLES[index % TOOL_TILE_ANGLES.length]}deg)`,
    border: (theme: Theme) => `1px solid ${theme.vars.palette.divider}`,
    // A ring in the card colour keeps the tiles apart where they overlap.
    boxShadow: (theme: Theme) => `0 0 0 2px ${theme.vars.palette.background.paper}`,
  });

  return (
    <Stack direction="row" alignItems="center" sx={{ py: 0.5 }}>
      {tools.map((tool, index) => (
        <Box key={tool.name} sx={tileSx(index)}>
          <ToolLogo tool={tool} />
        </Box>
      ))}

      {more && (
        <Box
          aria-hidden
          sx={(theme) => ({
            ...tileSx(tools.length),
            color: 'text.secondary',
            bgcolor: varAlpha(theme.vars.palette.grey['500Channel'], 0.12),
          })}
        >
          <Iconify icon="iconmind:plus-outline-thin" width={16} />
        </Box>
      )}
    </Stack>
  );
}

// ----------------------------------------------------------------------

function ToolLogo({ tool }: { tool: Tool }) {
  // Falls back to the tools section's logo until a card-specific one is uploaded.
  const [src, setSrc] = useState(tool.logo);

  return (
    <Box
      component="img"
      src={src}
      alt={tool.name}
      loading="lazy"
      onError={() => tool.fallback && src !== tool.fallback && setSrc(tool.fallback)}
      sx={
        tool.fill
          ? { width: 1, height: 1, objectFit: 'cover' }
          : { width: '68%', height: '68%', objectFit: 'contain' }
      }
    />
  );
}
