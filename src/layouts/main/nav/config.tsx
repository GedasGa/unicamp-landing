import { paths } from '../../../routes/paths';
import { Iconify } from '../../../components/iconify';

// ----------------------------------------------------------------------

// TODO: update icons
export const defaultNavData = [
  { title: 'Home', path: '/', icon: <Iconify width={22} icon="solar:home-2-bold-duotone" /> },
  {
    title: 'Courses',
    path: paths.program.root,
    icon: <Iconify width={22} icon="solar:notebook-bold-duotone" />,
    children: [
      { title: 'UX Design', path: paths.program.ux },
      { title: 'FE', path: paths.program.fe },
    ],
  },
];
