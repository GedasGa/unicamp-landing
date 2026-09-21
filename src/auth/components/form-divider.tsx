import type { Theme, SxProps } from '@mui/material/styles';

import Divider from '@mui/material/Divider';

import { useTranslate } from 'src/locales';

// ----------------------------------------------------------------------

type FormDividerProps = {
  sx?: SxProps<Theme>;
  label?: React.ReactNode;
};

export function FormDivider({ sx, label }: FormDividerProps) {
  const { t } = useTranslate('auth');

  return (
    <Divider
      sx={{
        my: 3,
        typography: 'overline',
        color: 'text.disabled',
        '&::before, :after': { borderTopStyle: 'dashed' },
        ...sx,
      }}
    >
      {label ?? t('common.or')}
    </Divider>
  );
}
