import { paths } from 'src/routes/paths';

import { CONFIG } from 'src/config-global';

import { SvgColor } from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor src={`${CONFIG.assetsDir}/assets/icons/navbar/${name}.svg`} />
);

const ICONS = {
  course: icon('ic-course'),
};

// ----------------------------------------------------------------------

// Navigation is now dynamically set by pages via NavigationProvider
// This default config is kept for fallback only
export const navData = [];
