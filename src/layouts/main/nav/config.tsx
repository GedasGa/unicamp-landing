import { paths } from '../../../routes/paths';
import { Iconify } from '../../../components/iconify';

// ----------------------------------------------------------------------

// TODO: update icons
export const defaultNavData = [
  { title: 'paths.home', path: '/', icon: <Iconify width={22} icon="solar:home-2-bold-duotone" /> },
  {
    title: 'paths.courses',
    path: paths.programs.root,
    icon: <Iconify width={22} icon="solar:notebook-bold-duotone" />,
    children: [
      { title: 'paths.uxProgram', path: paths.programs.ux },
      { title: 'paths.feProgram', path: paths.programs.fe },
    ],
  },
];
