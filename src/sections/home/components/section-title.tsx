import type { MotionProps } from 'framer-motion';
import type { StackProps } from '@mui/material/Stack';
import type { Theme, SxProps } from '@mui/material/styles';

import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { varAlpha, textEmphasis, textGradient } from 'src/theme/styles';

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

/**
 * Renders text with words wrapped in *asterisks* in the italic serif emphasis style,
 * e.g. "Unicamp *programos*". Used for every heading so emphasis works the same everywhere.
 */
export function renderEmphasis(text: string) {
  return text.split(/\*([^*]+)\*/).map((part, index) =>
    index % 2 === 1 ? (
      <Box key={index} component="span" sx={textEmphasis}>
        {part}
      </Box>
    ) : (
      part
    )
  );
}

// ----------------------------------------------------------------------

// TODO: Move to root components/
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

      <Typography
        component={m.h2}
        variant="h2"
        variants={slotProps?.title?.variants ?? varFade({ distance: 24 }).inUp}
        sx={slotProps?.title?.sx}
      >
        {typeof title === 'string' ? renderEmphasis(title) : title}
        <Box
          component="span"
          sx={(theme) => ({
            opacity: 0.4,
            display: 'inline-block',
            ...textGradient(
              `to right, ${theme.vars.palette.text.primary}, ${varAlpha(theme.vars.palette.text.primaryChannel, 0.2)}`
            ),
          })}
        >
          {txtGradient}
        </Box>
      </Typography>

      {description && (
        <Typography
          component={m.p}
          variants={slotProps?.description?.variants ?? varFade({ distance: 24 }).inUp}
          sx={{ color: 'text.secondary', ...slotProps?.description?.sx }}
        >
          {description}
        </Typography>
      )}
    </Stack>
  );
}

// ----------------------------------------------------------------------

export function SectionCaption({ title, variants, sx }: TextProps) {
  return (
    <Stack
      component={m.span}
      variants={variants ?? varFade({ distance: 24 }).inUp}
      sx={{ typography: 'overline', color: 'text.disabled', ...sx }}
    >
      {title}
    </Stack>
  );
}
