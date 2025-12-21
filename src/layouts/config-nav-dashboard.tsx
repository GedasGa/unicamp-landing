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

export const navData = [
  /**
   * Learning
   */
  {
    subheader: 'Learning',
    items: [
      { title: 'Courses', path: paths.app.root, icon: ICONS.course },
    ],
  },
];
