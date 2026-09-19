// ----------------------------------------------------------------------
// Corner radius scale, in multiples of theme.shape.borderRadius (8px).
// Use these in `sx={{ borderRadius: RADIUS.md }}` instead of one-off values.
//
// - sm (8px):  small elements such as labels and chips
// - md (12px): elements nested inside a card (media, photos, icon tiles)
// - lg (16px): standalone surfaces (cards, tiles, panels)
// - pill:      fully rounded ends (buttons, the header bar)

export const RADIUS = {
  sm: 1,
  md: 1.5,
  lg: 2,
  pill: '500px',
} as const;
