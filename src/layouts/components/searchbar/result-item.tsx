import Box from '@mui/material/Box';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';

import { varAlpha } from 'src/theme/styles';

import { Label } from 'src/components/label';

// ----------------------------------------------------------------------

type Props = {
  title: {
    text: string;
    highlight: boolean;
  }[];
  path: {
    text: string;
    highlight: boolean;
  }[];
  groupLabel: string;
  onClickItem: () => void;
};

export function ResultItem({ title, path, groupLabel, onClickItem }: Props) {
  return (
    <ListItemButton
      onClick={onClickItem}
      sx={{
        gap: 2,
        borderWidth: 1,
        borderStyle: 'dashed',
        borderColor: 'transparent',
        borderBottomColor: (theme) => theme.vars.palette.divider,
        '&:hover': {
          borderRadius: 1,
          borderColor: (theme) => theme.vars.palette.primary.main,
          backgroundColor: (theme) =>
            varAlpha(
              theme.vars.palette.primary.mainChannel,
              theme.vars.palette.action.hoverOpacity
            ),
        },
      }}
    >
      <ListItemText
        primaryTypographyProps={{ typography: 'subtitle2', sx: { textTransform: 'capitalize' } }}
        primary={title.map((part, index) => (
          <Box
            key={index}
            component="span"
            sx={{ color: part.highlight ? 'primary.main' : 'text.primary' }}
          >
            {part.text}
          </Box>
        ))}
      />

      {groupLabel && (
        <Label color="info" sx={{ flexShrink: 0 }}>
          {groupLabel}
        </Label>
      )}
    </ListItemButton>
  );
}
