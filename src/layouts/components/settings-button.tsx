'use client';

import type { IconButtonProps } from '@mui/material/IconButton';

import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';

import { Iconify } from 'src/components/iconify';
import { useSettingsContext } from 'src/components/settings/context';

// ----------------------------------------------------------------------

export type SettingsButtonProps = IconButtonProps;

export function SettingsButton({ sx, ...other }: SettingsButtonProps) {
  const settings = useSettingsContext();

  return (
    <IconButton
      aria-label="settings"
      onClick={settings.onToggleDrawer}
      sx={{ p: 0, width: 40, height: 40, ...sx }}
      {...other}
    >
      <Badge color="error" variant="dot" invisible={!settings.canReset}>
        <Iconify icon="iconmind:settings-outline-thin" width={24} />
      </Badge>
    </IconButton>
  );
}
