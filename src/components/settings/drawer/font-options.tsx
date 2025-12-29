import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';

import { CONFIG } from 'src/config-global';
import { setFont } from 'src/theme/styles';

import { Iconify } from '../../iconify';
import { SvgColor } from '../../svg-color';
import { Block, BlockOption } from './styles';

// ----------------------------------------------------------------------

type FontOptionType = {
  name: string;
  tooltip: string;
};

type Props = {
  value: string;
  options: FontOptionType[];
  onClickOption: (newValue: string) => void;
};

export function FontOptions({ value, options, onClickOption }: Props) {
  return (
    <Block title="Font">
      <Box component="ul" gap={1.5} display="grid" gridTemplateColumns="repeat(2, 1fr)">
        {options.map((option) => {
          const selected = value === option.name;
          const displayName = option.name.endsWith('Variable')
            ? option.name.replace(' Variable', '')
            : option.name;

          return (
            <Box component="li" key={option.name} sx={{ display: 'inline-flex', position: 'relative' }}>
              <BlockOption
                selected={selected}
                onClick={() => onClickOption(option.name)}
                icon={
                  <SvgColor
                    width={28}
                    src={`${CONFIG.assetsDir}/assets/icons/settings/ic-font.svg`}
                    sx={{ color: 'currentColor' }}
                  />
                }
                label={displayName}
                sx={{
                  py: 2,
                  gap: 0.75,
                  flexDirection: 'column',
                  fontFamily: setFont(option.name),
                  fontSize: (theme) => theme.typography.pxToRem(12),
                }}
              />
              <Tooltip
                title={option.tooltip}
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
