'use client';

import type { ButtonBaseProps } from '@mui/material/ButtonBase';

import { useCallback } from 'react';

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ButtonBase from '@mui/material/ButtonBase';
import CircularProgress from '@mui/material/CircularProgress';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { usePopover, CustomPopover } from 'src/components/custom-popover';
import { useGroupContext } from 'src/contexts/group-context';

// ----------------------------------------------------------------------

export type WorkspacesPopoverProps = ButtonBaseProps & {
  sx?: any;
};

export function WorkspacesPopover({ sx, ...other }: WorkspacesPopoverProps) {
  const popover = usePopover();
  const { groups, selectedGroup, setSelectedGroup, loading } = useGroupContext();

  const mediaQuery = 'sm';

  const handleChangeWorkspace = useCallback(
    (newValue: typeof selectedGroup) => {
      setSelectedGroup(newValue);
      popover.onClose();
    },
    [popover, setSelectedGroup]
  );

  if (loading) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <CircularProgress size={20} />
      </Box>
    );
  }

  if (groups.length === 0) {
    return null;
  }

  return (
    <>
      <ButtonBase
        disableRipple
        onClick={popover.onOpen}
        sx={{
          py: 0.5,
          gap: { xs: 0.5, [mediaQuery]: 1 },
          ...sx,
        }}
        {...other}
      >
        <Avatar
          sx={{
            width: 24,
            height: 24,
            bgcolor: 'primary.main',
            fontSize: 12,
            fontWeight: 'bold',
          }}
        >
          {selectedGroup?.name?.charAt(0)?.toUpperCase() || 'G'}
        </Avatar>

        <Box
          component="span"
          sx={{
            typography: 'subtitle2',
            display: { xs: 'none', [mediaQuery]: 'inline-flex' },
          }}
        >
          {selectedGroup?.name}
        </Box>

        <Label
          color="default"
          sx={{
            height: 22,
            display: { xs: 'none', [mediaQuery]: 'inline-flex' },
          }}
        >
          Group
        </Label>

        <Iconify width={16} icon="carbon:chevron-sort" sx={{ color: 'text.disabled' }} />
      </ButtonBase>

      <CustomPopover
        open={popover.open}
        anchorEl={popover.anchorEl}
        onClose={popover.onClose}
        slotProps={{ arrow: { hide: true } }}
      >
        <MenuList sx={{ width: 240 }}>
          {groups.map((option) => (
            <MenuItem
              key={option.id}
              selected={option.id === selectedGroup?.id}
              onClick={() => handleChangeWorkspace(option)}
              sx={{ height: 48 }}
            >
              <Avatar
                sx={{
                  width: 24,
                  height: 24,
                  bgcolor: 'primary.main',
                  fontSize: 12,
                  fontWeight: 'bold',
                }}
              >
                {option.name?.charAt(0)?.toUpperCase() || 'G'}
              </Avatar>

              <Box component="span" sx={{ flexGrow: 1 }}>
                {option.name}
              </Box>

              <Label color="default">Group</Label>
            </MenuItem>
          ))}
        </MenuList>
      </CustomPopover>
    </>
  );
}
