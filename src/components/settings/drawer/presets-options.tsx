import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import ButtonBase from '@mui/material/ButtonBase';
import { alpha as hexAlpha } from '@mui/material/styles';

import { CONFIG } from 'src/config-global';

import { Block } from './styles';
import { Iconify } from '../../iconify';
import { SvgColor } from '../../svg-color';

import type { SettingsState } from '../types';

// ----------------------------------------------------------------------

type Value = SettingsState['primaryColor'];

type Props = {
  value: Value;
  options: { name: Value; value: string }[];
  onClickOption: (newValue: Value) => void;
};

const COLOR_TOOLTIPS = {
  default: 'Brand blue color with excellent contrast',
  black: 'High contrast monochrome for maximum accessibility',
  daltonism: 'Optimized cyan palette for color blindness (deuteranopia, protanopia)',
};

export function PresetsOptions({ value, options, onClickOption }: Props) {
  return (
    <Block title="Presets">
      <Box component="ul" gap={1.5} display="grid" gridTemplateColumns="repeat(3, 1fr)">
        {options.map((option) => {
          const selected = value === option.name;

          return (
            <Box component="li" key={option.name} sx={{ display: 'flex', position: 'relative' }}>
              <ButtonBase
                onClick={() => onClickOption(option.name)}
                sx={{
                  width: 1,
                  height: 64,
                  borderRadius: 1.5,
                  color: option.value,
                  ...(selected && {
                    bgcolor: hexAlpha(option.value, 0.08),
                  }),
                }}
              >
                <SvgColor
                  width={28}
                  src={`${CONFIG.assetsDir}/assets/icons/settings/ic-siderbar-duotone.svg`}
                  sx={{ color: 'currentColor' }}
                />
              </ButtonBase>
              <Tooltip
                title={COLOR_TOOLTIPS[option.name]}
                placement="top"
                arrow
                slotProps={{
                  tooltip: { sx: { maxWidth: 240 } },
                }}
              >
                <Box
                  sx={{
                    position: 'absolute',
                    top: 4,
                    right: 4,
                    zIndex: 1,
                  }}
                >
                  <Iconify
                    width={14}
                    icon="eva:info-outline"
                    sx={{
                      cursor: 'pointer',
                      color: 'text.disabled',
                      '&:hover': { color: 'text.primary' },
                    }}
                  />
                </Box>
              </Tooltip>
            </Box>
          );
        })}
      </Box>
    </Block>
  );
}
