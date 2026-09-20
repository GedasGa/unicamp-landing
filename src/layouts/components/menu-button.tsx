import type { IconButtonProps } from '@mui/material/IconButton';

import IconButton from '@mui/material/IconButton';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export type MenuButtonProps = IconButtonProps;

export function MenuButton({ sx, ...other }: IconButtonProps) {
  return (
    <IconButton sx={sx} {...other}>
      <Iconify icon="iconmind:menu-outline-thin" width={24} />
    </IconButton>
  );
}
