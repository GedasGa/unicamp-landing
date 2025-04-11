import type { TextFieldProps } from '@mui/material/TextField';

import { Controller, useFormContext } from 'react-hook-form';

import TextField from '@mui/material/TextField';
import { useTranslate } from '../../locales';

// ----------------------------------------------------------------------

type Props = TextFieldProps & {
  name: string;
};

export function RHFTextField({ name, helperText, type, ...other }: Props) {
  const { control } = useFormContext();
  const { t } = useTranslate();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const translatedError = typeof error?.message === 'string' ? t(error.message) : undefined;

        return (
          <TextField
            {...field}
            fullWidth
            type={type}
            value={type === 'number' && field.value === 0 ? '' : field.value}
            onChange={(event) => {
              const value = type === 'number' ? Number(event.target.value) : event.target.value;
              field.onChange(value);
            }}
            error={!!translatedError}
            helperText={translatedError ?? helperText}
            inputProps={{ autoComplete: 'off' }}
            {...other}
          />
        );
      }}
    />
  );
}
