import type { MotionProps } from 'framer-motion';
import type { StackProps } from '@mui/material/Stack';
import type { Theme, SxProps } from '@mui/material/styles';

import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { varAlpha, textGradient } from 'src/theme/styles';

import { varFade } from 'src/components/animate';

// ----------------------------------------------------------------------

type TextProps = {
  sx?: SxProps<Theme>;
  title: React.ReactNode;
  variants?: MotionProps['variants'];
};

type Props = StackProps & {
  txtGradient?: string;
  title: React.ReactNode;
  caption?: React.ReactNode;
  description?: React.ReactNode;
  slotProps?: {
    title?: Omit<TextProps, 'title'>;
    caption?: Omit<TextProps, 'title'>;
    description?: Omit<TextProps, 'title'>;
  };
};

export function SectionTitle({
  title,
  caption,
  slotProps,
  txtGradient,
  description,
  ...other
}: Props) {
  return (
    <Stack spacing={3} {...other}>
      {caption && (
        <SectionCaption
          title={caption}
          variants={slotProps?.caption?.variants}
          sx={slotProps?.caption?.sx}
        />
      )}

      <SectionText
        title={title}
        variants={slotProps?.title?.variants}
        sx={{ typography: 'h2', ...slotProps?.title?.sx }}
      />

      {description && (
        <SectionDescription
          title={description}
          txtGradient={txtGradient}
          variants={slotProps?.description?.variants}
          sx={slotProps?.description?.sx}
        />
      )}
    </Stack>
  );
}

// ----------------------------------------------------------------------

export function SectionCaption({ title, variants, sx }: TextProps) {
  return (
    <Box
      component={m.div}
      variants={variants ?? varFade({ distance: 24 }).inUp}
      sx={{ typography: 'overline', color: 'text.disabled', ...sx }}
    >
      {title}
    </Box>
  );
}

// ----------------------------------------------------------------------

export function SectionText({ title, variants, sx }: TextProps) {
  return (
    <Box
      component={m.h2}
      variants={variants ?? varFade({ distance: 24 }).inUp}
      sx={{ typography: 'h3', ...sx }}
    >
      {title}
    </Box>
  );
}

// ----------------------------------------------------------------------

type SectionDescriptionProps = TextProps & {
  txtGradient?: string;
};

export function SectionDescription({ title, variants, txtGradient, sx }: SectionDescriptionProps) {
  return (
    <Box
      component={m.p}
      variants={variants ?? varFade({ distance: 24 }).inUp}
      sx={{
        typography: 'h5',
        ...sx,
        ...(!!txtGradient && {
          ...textGradient(
            `to right, ${txtGradient}, ${varAlpha(txtGradient, 0.2)} 50%, ${txtGradient}`
          ),
        }),
      }}
    >
      {title}
    </Box>
  );
}

