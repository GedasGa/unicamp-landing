'use client';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Badge from '@mui/material/Badge';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Drawer, { drawerClasses } from '@mui/material/Drawer';
import { useTheme, useColorScheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';

import COLORS from 'src/theme/core/colors.json';
import { paper, varAlpha } from 'src/theme/styles';
import { defaultFont } from 'src/theme/core/typography';
import PRIMARY_COLOR from 'src/theme/with-settings/primary-color.json';

import { Iconify } from '../../iconify';
import { BaseOption } from './base-option';
import { Scrollbar } from '../../scrollbar';
import { FontOptions } from './font-options';
import { useSettingsContext } from '../context';
import { PresetsOptions } from './presets-options';
import { defaultSettings } from '../config-settings';
import { FontSizeOptions } from './font-size-options';
import { FullScreenButton } from './fullscreen-button';

import type { SettingsDrawerProps } from '../types';

// ----------------------------------------------------------------------

export function SettingsDrawer({
  sx,
  hideFont,
  hideCompact,
  hidePresets,
  hideContrast,
  hideColorScheme,
}: SettingsDrawerProps) {
  const theme = useTheme();
  const settings = useSettingsContext();
  const { mode, setMode } = useColorScheme();
  const { t } = useTranslation('app');

  const renderHead = (
    <Box display="flex" alignItems="center" sx={{ py: 2, pr: 1, pl: 2.5 }}>
      <Typography variant="h6" sx={{ flexGrow: 1 }}>
        {t('settings.title')}
      </Typography>
      <FullScreenButton />
      <Tooltip title={t('settings.reset')}>
        <IconButton
          onClick={() => {
            settings.onReset();
            setMode(defaultSettings.colorScheme);
          }}
        >
          <Badge color="error" variant="dot" invisible={!settings.canReset}>
            <Iconify icon="solar:restart-bold" />
          </Badge>
        </IconButton>
      </Tooltip>
      <Tooltip title={t('settings.close')}>
        <IconButton onClick={settings.onCloseDrawer}>
          <Iconify icon="mingcute:close-line" />
        </IconButton>
      </Tooltip>
    </Box>
  );

  const renderMode = (
    <BaseOption
      label={t('settings.darkMode')}
      icon="moon"
      selected={settings.colorScheme === 'dark'}
      onClick={() => {
        settings.onUpdateField('colorScheme', mode === 'light' ? 'dark' : 'light');
        setMode(mode === 'light' ? 'dark' : 'light');
      }}
    />
  );

  const renderContrast = (
    <BaseOption
      label={t('settings.contrast')}
      icon="contrast"
      selected={settings.contrast === 'hight'}
      onClick={() =>
        settings.onUpdateField('contrast', settings.contrast === 'default' ? 'hight' : 'default')
      }
    />
  );

  const renderCompact = (
    <BaseOption
      tooltip={t('settings.compactTooltip')}
      label={t('settings.compact')}
      icon="autofit-width"
      selected={settings.compactLayout}
      onClick={() => settings.onUpdateField('compactLayout', !settings.compactLayout)}
    />
  );

  const renderPresets = (
    <PresetsOptions
      value={settings.primaryColor}
      onClickOption={(newValue) => settings.onUpdateField('primaryColor', newValue)}
      options={[
        { name: 'default', value: COLORS.primary.main },
        { name: 'black', value: PRIMARY_COLOR.black.main },
        { name: 'daltonism', value: PRIMARY_COLOR.cyan.main },
      ]}
    />
  );

  const renderFont = (
    <FontOptions
      value={settings.fontFamily}
      onClickOption={(newValue) => settings.onUpdateField('fontFamily', newValue)}
      options={[
        { 
          name: defaultFont, 
          tooltip: t('settings.fontTooltips.default')
        },
        { 
          name: 'Lexend Variable', 
          tooltip: t('settings.fontTooltips.lexend')
        },
        { 
          name: 'Atkinson Hyperlegible', 
          tooltip: t('settings.fontTooltips.atkinson')
        },
        { 
          name: 'OpenDyslexic', 
          tooltip: t('settings.fontTooltips.openDyslexic')
        },
      ]}
    />
  );

  const renderFontSize = (
    <FontSizeOptions
      value={settings.fontSize}
      onClickOption={(newValue) => settings.onUpdateField('fontSize', newValue)}
      options={['small', 'normal', 'large']}
    />
  );

  return (
    <Drawer
      anchor="right"
      open={settings.openDrawer}
      onClose={settings.onCloseDrawer}
      slotProps={{ backdrop: { invisible: true } }}
      sx={{
        [`& .${drawerClasses.paper}`]: {
          ...paper({
            theme,
            color: varAlpha(theme.vars.palette.background.defaultChannel, 0.9),
          }),
          width: 360,
          ...sx,
        },
      }}
    >
      {renderHead}

      <Scrollbar>
        <Stack spacing={6} sx={{ px: 2.5, pb: 5 }}>
          <Box gap={2} display="grid" gridTemplateColumns="repeat(2, 1fr)">
            {!hideColorScheme && renderMode}
            {!hideContrast && renderContrast}
            {!hideCompact && renderCompact}
          </Box>

          {!hidePresets && renderPresets}
          {!hideFont && renderFont}
          {renderFontSize}
        </Stack>
      </Scrollbar>
    </Drawer>
  );
}
