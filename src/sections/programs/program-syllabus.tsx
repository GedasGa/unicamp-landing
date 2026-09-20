import type { BoxProps } from '@mui/material/Box';

import { useState } from 'react';

import Box from '@mui/material/Box';
import { Chip, Stack } from '@mui/material';
import Container from '@mui/material/Container';
import Accordion from '@mui/material/Accordion';
import Typography from '@mui/material/Typography';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';

import { SECTION_PADDING } from 'src/theme/styles';

import { useTranslate } from '../../locales';
import { Iconify } from '../../components/iconify';
import { renderEmphasis } from '../home/components/section-title';

// ----------------------------------------------------------------------

// One icon per module, in the order the translations list them.
const MODULE_ICONS: Record<string, string[]> = {
  productDesign: [
    'iconmind:pen-outline-thin',
    'iconmind:search-outline-thin',
    'iconmind:palette-outline-thin',
    'iconmind:rocket-outline-thin',
  ],
  webDevelopment: [
    'iconmind:cpu-outline-thin',
    'iconmind:code-outline-thin',
    'iconmind:tablet-outline-thin',
    'iconmind:users-outline-thin',
    'iconmind:terminal-outline-thin',
    'iconmind:share-outline-thin',
    'iconmind:atom-outline-thin',
    'iconmind:layers-outline-thin',
    'iconmind:server-outline-thin',
    'iconmind:rocket-outline-thin',
  ],
};

// How many skill keys each module lists; the copy itself lives in the translations.
const MODULE_SKILLS: Record<string, number[]> = {
  productDesign: [2, 3, 3, 2],
  webDevelopment: [4, 4, 4, 2, 4, 4, 4, 4, 4, 4],
};

type Module = {
  icon: string;
  title: string;
  description: string;
  skills: string[];
};

function getModules(programId: string): Module[] {
  const icons = MODULE_ICONS[programId] ?? [];
  const skillCounts = MODULE_SKILLS[programId] ?? [];

  return icons.map((icon, index) => ({
    icon,
    title: `modules.${index}.title`,
    description: `modules.${index}.description`,
    skills: Array.from(
      { length: skillCounts[index] ?? 0 },
      (_, skill) => `modules.${index}.skills.${skill}`
    ),
  }));
}

// ----------------------------------------------------------------------
interface ProgramSyllabusProps extends BoxProps {
  programId: string;
}

export function ProgramSyllabus({ programId, sx, ...other }: ProgramSyllabusProps) {
  const { t } = useTranslate(programId);

  const modules = getModules(programId);

  // The first module is open, so the section shows what a module holds.
  const [expanded, setExpanded] = useState<string | false>(modules[0]?.title ?? false);

  const handleToggle = (title: string) => (_: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? title : false);
  };

  return (
    <Box
      component="section"
      sx={{ py: SECTION_PADDING, backgroundColor: 'grey.100', ...sx }}
      {...other}
    >
      <Container>
        <Stack spacing={{ xs: 2, md: 7 }}>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            alignItems={{ xs: 'flex-start', sm: 'center' }}
            justifyContent="space-between"
            spacing={2}
          >
            <Stack spacing={2} sx={{ maxWidth: 760 }}>
              <Typography component="h2" variant="h2">
                {renderEmphasis(t('syllabus.title'))}
              </Typography>
              {/* The intro can run to more than one paragraph; blank lines split it. */}
              {t('syllabus.description')
                .split('\n\n')
                .map((paragraph) => (
                  <Typography key={paragraph} sx={{ color: 'text.secondary' }}>
                    {paragraph}
                  </Typography>
                ))}
            </Stack>
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={2}
              sx={{ width: { xs: '100%', sm: 'inherit' } }}
            >
              {/* TODO: Re-enable once ready */}
              {/* <Button */}
              {/*  variant="outlined" */}
              {/*  size="large" */}
              {/*  startIcon={<Iconify icon="solar:download-bold" />} */}
              {/*  sx={{ px: 4 }} */}
              {/* > */}
              {/*  {t('syllabus.cta.download')} */}
              {/* </Button> */}
              {/* <Button variant="contained" size="large" sx={{ px: 4 }}> */}
              {/*  {t('syllabus.cta.register')} */}
              {/* </Button> */}
            </Stack>
          </Stack>
          <Stack spacing={2}>
            {modules.map((module) => (
              <ModuleItem
                key={module.title}
                module={module}
                programId={programId}
                expanded={expanded === module.title}
                onToggle={handleToggle(module.title)}
              />
            ))}
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}

// ----------------------------------------------------------------------

type ModuleItemProps = {
  module: Module;
  programId: string;
  expanded: boolean;
  onToggle: (event: React.SyntheticEvent, isExpanded: boolean) => void;
};

const ModuleItem = ({ module, programId, expanded, onToggle }: ModuleItemProps) => {
  const { t } = useTranslate(programId);

  return (
    <Accordion expanded={expanded} onChange={onToggle}>
      <AccordionSummary
        expandIcon={
          <Iconify
            width={20}
            icon={expanded ? 'iconmind:minus-outline-thin' : 'iconmind:plus-outline-thin'}
          />
        }
      >
        <Stack direction="row" spacing={2} alignItems="center">
          <Iconify icon={module.icon} width={28} sx={{ flexShrink: 0 }} />
          <Typography variant="h6">{t(module.title)}</Typography>
        </Stack>
      </AccordionSummary>

      <AccordionDetails>
        <Stack spacing={2}>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {t(module.description)}
          </Typography>

          {module.skills.length > 0 && (
            <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
              {module.skills.map((skill) => (
                <Chip key={skill} size="small" label={t(skill)} variant="outlined" />
              ))}
            </Stack>
          )}
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
};
