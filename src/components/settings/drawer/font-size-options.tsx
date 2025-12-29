import Box from '@mui/material/Box';

import { Block, BlockOption } from './styles';

import type { SettingsState } from '../types';

// ----------------------------------------------------------------------

type Props = {
  value: SettingsState['fontSize'];
  onClickOption: (newValue: SettingsState['fontSize']) => void;
  options: SettingsState['fontSize'][];
};

export function FontSizeOptions({ value, options, onClickOption }: Props) {
  return (
    <Block title="Font size">
      <Box component="ul" gap={1.5} display="grid" gridTemplateColumns="repeat(3, 1fr)">
        {options.map((option) => {
          const selected = value === option;

          return (
            <Box component="li" key={option} sx={{ display: 'inline-flex' }}>
              <BlockOption
                selected={selected}
                onClick={() => onClickOption(option)}
                icon={
                  <Box
                    component="span"
                    sx={{
                      fontSize: option === 'small' ? 16 : option === 'large' ? 24 : 20,
                      fontWeight: 'fontWeightBold',
                      lineHeight: 1,
                    }}
                  >
                    A
                  </Box>
                }
                label={option.charAt(0).toUpperCase() + option.slice(1)}
                sx={{
                  py: 2,
                  gap: 0.75,
                  flexDirection: 'column',
                  fontSize: (theme) => theme.typography.pxToRem(12),
                }}
              />
            </Box>
          );
        })}
      </Box>
    </Block>
  );
}
